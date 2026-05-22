import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const GalaxyBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1.0); // Black space background
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 5000);
    camera.position.set(0, 8.5, 17.5);
    camera.lookAt(0, 0, 0);

    // 3. Simulation Size Configuration
    const isDesktop = Math.min(window.innerWidth, window.innerHeight) > 500;
    const simSizeX = isDesktop ? 128 : 64;
    const simSizeY = isDesktop ? 128 : 64;
    const nParticles = simSizeX * simSizeY;

    // 4. GPU Computation Renderer Setup
    const gpuSimulator = new GPUComputationRenderer(simSizeX, simSizeY, renderer);

    // Initial textures
    const positionTexture = gpuSimulator.createTexture();
    const velocityTexture = gpuSimulator.createTexture();

    const galaxyMass = 0.00015;
    const galaxyHaloSize = 6;

    // Set Initial Conditions
    const setInitialConditions = (posTex: THREE.DataTexture, velTex: THREE.DataTexture) => {
      const position = posTex.image.data;
      const velocity = velTex.image.data;

      const nGalaxies = 2;
      const nTotalParticles = (position.length / 4) - nGalaxies;
      const galaxyParticles = [
        Math.round(nTotalParticles / 2),
        nTotalParticles - Math.round(nTotalParticles / 2)
      ];
      const galaxySizes = [0.7 * galaxyHaloSize, 0.7 * galaxyHaloSize];
      
      // Opposite inclinations for beautiful collision cross-section, with randomized second tilt
      const galaxyInclinations = [
        0.35 * Math.PI,
        Math.PI * (0.5 + 0.3 * Math.random())
      ];
      
      // Position galaxies on opposite sides
      const galaxyPositions = [
        new THREE.Vector3(-galaxyHaloSize, 0, 0),
        new THREE.Vector3(galaxyHaloSize, 0, 0)
      ];
      
      // Velocities heading towards each other for collision
      const galaxyVelocities = [
        new THREE.Vector3(0.0005, 0.0001, 0.001),
        new THREE.Vector3(-0.0005, -0.0001, -0.001)
      ];

      let startIndex = nGalaxies;

      for (let i = 0; i < nGalaxies; i++) {
        const galaxyIndex = 4 * i;
        position[galaxyIndex] = galaxyPositions[i].x;
        position[galaxyIndex + 1] = galaxyPositions[i].y;
        position[galaxyIndex + 2] = galaxyPositions[i].z;
        position[galaxyIndex + 3] = 1;

        velocity[galaxyIndex] = galaxyVelocities[i].x;
        velocity[galaxyIndex + 1] = galaxyVelocities[i].y;
        velocity[galaxyIndex + 2] = galaxyVelocities[i].z;
        velocity[galaxyIndex + 3] = 1;

        const sin = Math.sin(galaxyInclinations[i]);
        const cos = Math.cos(galaxyInclinations[i]);

        for (let j = startIndex; j < startIndex + galaxyParticles[i]; j++) {
          const distance = galaxySizes[i] * Math.sqrt(Math.random());
          const ang = 2 * Math.PI * Math.random();

          const massAtPosition = galaxyMass * Math.min(distance, galaxyHaloSize) / galaxyHaloSize;
          const vel = Math.sqrt(massAtPosition / Math.max(distance, 0.01));

          const x = distance * Math.cos(ang);
          const y = distance * Math.sin(ang);
          const velx = -vel * Math.sin(ang);
          const vely = vel * Math.cos(ang);

          // Add a 3D thickness (bulge in center, tapering at the edges)
          const bulge = Math.exp(-2.0 * (distance / galaxySizes[i]));
          const z_local = 0.8 * bulge * (Math.random() - 0.5) * galaxySizes[i] + 0.05 * (Math.random() - 0.5) * galaxySizes[i];

          const particleIndex = 4 * j;
          position[particleIndex] = x + galaxyPositions[i].x;
          position[particleIndex + 1] = cos * y + sin * z_local + galaxyPositions[i].y;
          position[particleIndex + 2] = -sin * y + cos * z_local + galaxyPositions[i].z;
          position[particleIndex + 3] = 1;

          velocity[particleIndex] = velx + galaxyVelocities[i].x;
          velocity[particleIndex + 1] = cos * vely + galaxyVelocities[i].y;
          velocity[particleIndex + 2] = -sin * vely + galaxyVelocities[i].z;
          velocity[particleIndex + 3] = 1;
        }

        startIndex += galaxyParticles[i];
      }
    };

    setInitialConditions(positionTexture, velocityTexture);

    // Shaders definition
    const positionShader = `
      uniform float u_dt;
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 position = texture2D(u_positionTexture, uv).xyz;
        vec3 velocity = texture2D(u_velocityTexture, uv).xyz;
        gl_FragColor = vec4(position + u_dt * velocity, 1.0);
      }
    `;

    const velocityShader = `
      uniform float u_dt;
      uniform float u_mass;
      uniform float u_haloSize;
      
      const float softening = 0.002;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 position = texture2D(u_positionTexture, uv).xyz;
        vec3 velocity = texture2D(u_velocityTexture, uv).xyz;
        
        vec3 totalForce = vec3(0.0);
        float width = resolution.x;

        // Loop over the 2 galaxy centers (indices 0 and 1)
        for (float i = 0.0; i < nGalaxies; i++) {
          vec2 particleUv = vec2(mod(i, width) + 0.5, floor(i / width) + 0.5) / resolution.xy;
          vec3 particlePosition = texture2D(u_positionTexture, particleUv).xyz;

          vec3 forceDirection = particlePosition - position;
          float distance = length(forceDirection);

          if (distance == 0.0) {
            continue;
          }

          float massAtPosition = u_mass * min(distance, u_haloSize) / u_haloSize;
          totalForce += massAtPosition * (forceDirection / distance) / pow(distance + softening, 2.0);
        }

        gl_FragColor = vec4(velocity + u_dt * totalForce, 1.0);
      }
    `;

    const positionVariable = gpuSimulator.addVariable("u_positionTexture", positionShader, positionTexture);
    const velocityVariable = gpuSimulator.addVariable("u_velocityTexture", velocityShader, velocityTexture);

    gpuSimulator.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);
    gpuSimulator.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);

    // Define number of galaxy attraction centers (2)
    velocityVariable.material.defines.nGalaxies = "2.0";

    positionVariable.material.uniforms.u_dt = { value: 0.2 };
    velocityVariable.material.uniforms.u_dt = { value: 0.2 };
    velocityVariable.material.uniforms.u_mass = { value: galaxyMass };
    velocityVariable.material.uniforms.u_haloSize = { value: galaxyHaloSize };

    const error = gpuSimulator.init();
    if (error !== null) {
      console.error("GPUComputationRenderer init error:", error);
    }

    // 5. Particles Setup
    const geometry = new THREE.BufferGeometry();
    const indices = new Float32Array(nParticles);
    const positions = new Float32Array(3 * nParticles);

    for (let i = 0; i < nParticles; i++) {
      indices[i] = i;
    }

    geometry.setAttribute("a_index", new THREE.BufferAttribute(indices, 1));
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle texture loading
    const particleTex = new THREE.TextureLoader().load("/particle.png");

    const vertexShader = `
      attribute float a_index;
      uniform float u_width;
      uniform float u_height;
      uniform float u_particleSize;
      uniform sampler2D u_positionTexture;
      varying vec3 v_color;

      void main() {
        vec2 uv = vec2((mod(a_index, u_width) + 0.5) / u_width, (floor(a_index / u_width) + 0.5) / u_height);
        vec4 pos = texture2D(u_positionTexture, uv);
        vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);

        // Color computation aligned with ASPEC brand (Deep Purple, Pink, Cyan)
        float isGalaxy2 = step(u_width * u_height / 2.0, a_index);
        
        // Galaxy 1: Deep Purple (#5B2EFF) to Cyan (#06B6D4)
        vec3 col1 = mix(vec3(0.357, 0.180, 1.0), vec3(0.024, 0.714, 0.831), fract(a_index * 13.73));
        // Galaxy 2: Pink (#D946EF) to Deep Purple (#5B2EFF)
        vec3 col2 = mix(vec3(0.851, 0.275, 0.937), vec3(0.357, 0.180, 1.0), fract(a_index * 7.19));
        
        v_color = mix(col1, col2, isGalaxy2);

        gl_PointSize = -u_particleSize / mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture;
      uniform float u_opacity;
      varying vec3 v_color;

      void main() {
        float alpha = texture2D(u_texture, gl_PointCoord).a;
        // Create a bright white-hot center core by mixing with white based on alpha intensity
        vec3 finalColor = mix(v_color, vec3(1.0), pow(alpha, 1.8));
        gl_FragColor = vec4(finalColor, alpha * u_opacity);
      }
    `;

    const uniforms = {
      u_width: { value: simSizeX },
      u_height: { value: simSizeY },
      u_particleSize: { value: 90.0 * window.devicePixelRatio },
      u_positionTexture: { value: null as THREE.Texture | null },
      u_texture: { value: particleTex },
      u_opacity: { value: 0.0 } // Start at 0 for initial fade-in
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      lights: false,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 6. Interactive & Render Loop variables
    let animationFrameId: number;
    let frameCount = 0;
    let resetCooldown = 0;
    let state: "fadein" | "running" | "fadeout" = "fadein";

    // Mouse movements for parallax drift
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 4.0;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2.0;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      frameCount++;

      // Handle Smooth State Machine for Sim Reset
      if (state === "fadein") {
        uniforms.u_opacity.value += 0.02;
        if (uniforms.u_opacity.value >= 1.0) {
          uniforms.u_opacity.value = 1.0;
          state = "running";
        }
      } else if (state === "running") {
        // Collide and merge for about 50 seconds (3000 frames)
        if (frameCount > 3000) {
          state = "fadeout";
        }
      } else if (state === "fadeout") {
        uniforms.u_opacity.value -= 0.02;
        if (uniforms.u_opacity.value <= 0.0) {
          uniforms.u_opacity.value = 0.0;
          
          // Reset simulator textures to initial state
          const newPosTex = gpuSimulator.createTexture();
          const newVelTex = gpuSimulator.createTexture();
          setInitialConditions(newPosTex, newVelTex);
          
          // Inject textures back into Variable render targets
          gpuSimulator.renderTexture(newPosTex, positionVariable.renderTargets[0]);
          gpuSimulator.renderTexture(newPosTex, positionVariable.renderTargets[1]);
          gpuSimulator.renderTexture(newVelTex, velocityVariable.renderTargets[0]);
          gpuSimulator.renderTexture(newVelTex, velocityVariable.renderTargets[1]);
          
          frameCount = 0;
          state = "fadein";
        }
      }

      // Compute 20 simulation steps per frame for smooth speed and dynamics matching the original
      if (state !== "fadeout" || uniforms.u_opacity.value > 0.1) {
        for (let i = 0; i < 20; i++) {
          gpuSimulator.compute();
        }
      }

      // Bind position texture
      const currentPosTexture = gpuSimulator.getCurrentRenderTarget(positionVariable).texture;
      uniforms.u_positionTexture.value = currentPosTexture;

      // Mouse Parallax drift logic
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Orbital camera rotation plus mouse parallax (slower, further back to fit viewport)
      const radius = 17.5;
      const angle = frameCount * 0.0004 + mouseRef.current.x;
      const heightOffset = 8.5 + mouseRef.current.y * 1.5;
      
      camera.position.x = radius * Math.sin(angle);
      camera.position.y = heightOffset;
      camera.position.z = radius * Math.cos(angle);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window Resize Handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // 8. Clean up
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTex.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
};

export default GalaxyBackground;
