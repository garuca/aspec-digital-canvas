import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const DeformMesh = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background for overlay blending
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 21.0; // Reduced perspective distortion (lens zoom effect)

    // 3. Orbit Controls Setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false; // Prevents page scrolling issues
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2; // Slow premium rotating visual

    // 4. Custom Shaders & Uniforms
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth-topology.png');
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    earthTexture.minFilter = THREE.LinearMipmapLinearFilter;
    earthTexture.magFilter = THREE.LinearFilter;

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio)
      },
      u_mouse: {
        value: new THREE.Vector2(0.7 * window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio)
      },
      u_texture: { value: earthTexture }
    };

    // GLSL ES 300 Vertex Shader: Static sphere mapping (no displacement)
    const vertexShader = `
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      out vec2 v_uv;
      out vec3 v_position;
      out vec3 v_normal;
      out vec3 v_tangent;
      out vec3 v_bitangent;

      void main() {
        v_uv = uv;
        vec4 mv_position = modelViewMatrix * vec4(position, 1.0);
        v_position = mv_position.xyz;
        
        // Calculate tangent basis in local space
        vec3 N = normalize(normal);
        vec3 crossVec = cross(vec3(0.0, 1.0, 0.0), N);
        vec3 T;
        if (length(crossVec) < 0.0001) {
          T = vec3(1.0, 0.0, 0.0);
        } else {
          T = normalize(crossVec);
        }
        vec3 B = cross(N, T);
        
        // Transform basis vectors to view space
        v_normal = normalize(normalMatrix * N);
        v_tangent = normalize(normalMatrix * T);
        v_bitangent = normalize(normalMatrix * B);
        
        gl_Position = projectionMatrix * mv_position;
      }
    `;

    // GLSL ES 300 Fragment Shader: Earth surface albedo + bump mapping + ASPEC premium multi-light Blinn-Phong shading
    const fragmentShader = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform sampler2D u_texture;

      in vec2 v_uv;
      in vec3 v_position;
      in vec3 v_normal;
      in vec3 v_tangent;
      in vec3 v_bitangent;

      // Declare output color variable for GLSL 3.00 ES
      out vec4 pc_fragColor;
      
      // Analytical normal, tangent, bitangent for a sphere to get crisp, noise-free topography reliefs
      vec3 perturbNormalSphere(vec3 N, vec3 T, vec3 B, vec2 uv, sampler2D tex, float bumpScale) {
        // Fixed offset in texture coordinate space to ensure crisp gradients
        float texelSize = 1.5 / 1024.0;
        
        float h = texture(tex, uv).r;
        float hU = texture(tex, uv + vec2(texelSize, 0.0)).r;
        float hV = texture(tex, uv + vec2(0.0, texelSize)).r;
        
        // Enhance height contrast for dramatic mountains and continents, guarding against negative bases (NaN)
        h = pow(max(h, 0.0), 1.3);
        hU = pow(max(hU, 0.0), 1.3);
        hV = pow(max(hV, 0.0), 1.3);
        
        float dh_du = (hU - h) * bumpScale;
        float dh_dv = (hV - h) * bumpScale;
        
        vec3 perturbedN = N - dh_du * T - dh_dv * B;
        return normalize(perturbedN);
      }

      // Soft diffuse wrapping to blend lighting and avoid harsh shadow borders
      float softDiffuse(vec3 normalVec, vec3 lightDir) {
        float df = dot(normalVec, lightDir);
        // Soft Half-Lambert wrapping for planet terminator
        return smoothstep(-0.2, 0.5, df);
      }

      // Horizon shadowing to simulate self-shadowing of topography near the terminator
      float horizonShadow(vec3 N, vec3 L, float height) {
        float dotNL = dot(N, L);
        return clamp(dotNL * 5.0 * (height + 0.15), 0.0, 1.0);
      }

      void main() {
        // Base normal, tangent, and bitangent of the sphere (unperturbed) in view space
        vec3 base_normal = normalize(v_normal);
        vec3 tangent = normalize(v_tangent);
        vec3 bitangent = normalize(v_bitangent);
        
        // Compute high-fidelity perturbed normal in view space
        float bumpScaleVal = 1.8;
        vec3 norm = perturbNormalSphere(base_normal, tangent, bitangent, v_uv, u_texture, bumpScaleVal);
        
        // Sample Earth texture albedo
        vec3 earthAlbedo = texture(u_texture, v_uv).rgb;
        float heightVal = texture(u_texture, v_uv).r;
        
        // Apply height-based Ambient Occlusion (AO) to darken deep oceans/valleys & add visual definition
        float ambientOcclusion = 0.55 + 0.45 * heightVal;
        vec3 detailedAlbedo = earthAlbedo * ambientOcclusion;

        // Enhance texture contrast and details slightly
        detailedAlbedo = mix(detailedAlbedo, detailedAlbedo * detailedAlbedo, 0.15);
        
        // --- ASPEC Brand Colors ---
        vec3 deepPurple = vec3(0.357, 0.180, 1.0); // #5B2EFF
        vec3 pink = vec3(0.851, 0.275, 0.937);       // #D946EF
        vec3 cyan = vec3(0.024, 0.714, 0.831);       // #06B6D4
        
        // --- Light 1: Interactive Mouse Light ---
        // Normalized screen coordinate for light direction
        float min_resolution = min(u_resolution.x, u_resolution.y);
        vec3 mouse_light_dir = vec3((u_mouse - 0.5 * u_resolution) / min_resolution, 0.8);
        vec3 lightDir1 = normalize(mouse_light_dir);
        // Softened multiplier (1.35 instead of 2.5) to avoid blowing out textures
        vec3 lightColor1 = mix(deepPurple, cyan, sin(u_time * 0.5) * 0.5 + 0.5) * 1.35;
        
        // --- Light 2: Cinematic Side/Back Pink Light ---
        // Positioned at the top-left-back to create a bright pink crescent accent on the rim
        vec3 lightDir2 = normalize(vec3(-1.2, 1.0, -0.4));
        // Softened multiplier (1.15 instead of 2.2)
        vec3 lightColor2 = pink * 1.15;
        
        // --- Light 3: Slow orbital fill light ---
        vec3 lightDir3 = normalize(vec3(cos(u_time * 0.3), sin(u_time * 0.3), 0.5));
        // Softened multiplier (0.5 instead of 1.5)
        vec3 lightColor3 = deepPurple * 0.5;
        
        // --- Lighting Calculations ---
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        
        // Diffuse contributions with Soft Wrapping & Horizon Shadowing
        float diff1 = softDiffuse(norm, lightDir1) * horizonShadow(base_normal, lightDir1, heightVal);
        float diff2 = softDiffuse(norm, lightDir2) * horizonShadow(base_normal, lightDir2, heightVal);
        float diff3 = softDiffuse(norm, lightDir3) * horizonShadow(base_normal, lightDir3, heightVal);
        
        // Specular contributions (Blinn-Phong) - lowered intensity to keep it subtle
        vec3 halfDir1 = normalize(lightDir1 + viewDir);
        float spec1 = pow(max(dot(norm, halfDir1), 0.0), 24.0) * 0.25 * heightVal;
        
        vec3 halfDir2 = normalize(lightDir2 + viewDir);
        float spec2 = pow(max(dot(norm, halfDir2), 0.0), 16.0) * 0.2 * heightVal;
        
        // Combine diffuse and specular (specular is scaled down to 0.4 to prevent harsh specular spots)
        vec3 diffuse = (diff1 * lightColor1 + diff2 * lightColor2 + diff3 * lightColor3) * detailedAlbedo;
        vec3 specular = (spec1 * lightColor1 + spec2 * lightColor2) * 0.4;
        
        // Ambient contribution: deep violet fill so the dark side has celestial depth
        vec3 ambient = vec3(0.03) * deepPurple * detailedAlbedo;
        
        // Atmospheric/Fresnel rim glow (color-shifting, softened to 0.4 to keep details on edge)
        float fresnel = pow(1.0 - max(dot(base_normal, viewDir), 0.0), 3.0);
        vec3 rimGlow = mix(pink, cyan, sin(u_time * 0.4) * 0.5 + 0.5) * fresnel * 0.4;
        
        // Combine all layers
        vec3 final_color = ambient + diffuse + specular + rimGlow;
        
        // Apply ACES Filmic Tone Mapping approximation to resolve overexposure and preserve HDR highlights
        vec3 x = final_color;
        vec3 acesColor = clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
        
        // Set fragment output using the declared output variable for GLSL 3.00 ES
        pc_fragColor = vec4(acesColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      glslVersion: THREE.GLSL3
    });

    // 5. Mesh Integration
    const geometry = new THREE.SphereGeometry(7.8, 128, 128);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 6. Interaction Event Handlers
    const onMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio;
      uniforms.u_mouse.value.set(e.clientX, window.innerHeight - e.clientY).multiplyScalar(dpr);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dpr = window.devicePixelRatio;
        uniforms.u_mouse.value.set(e.touches[0].clientX, window.innerHeight - e.touches[0].clientY).multiplyScalar(dpr);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    // 7. Responsive Observer setup
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth <= 0 || newHeight <= 0) continue;
        
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        const dpr = window.devicePixelRatio;
        uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight).multiplyScalar(dpr);
      }
    });
    resizeObserver.observe(container);

    // 8. Bounding Render Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      uniforms.u_time.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup Resource Handler
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();
      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default DeformMesh;
