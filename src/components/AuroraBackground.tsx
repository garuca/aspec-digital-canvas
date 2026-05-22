import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useMotionTemplate, MotionValue } from "framer-motion";

interface AuroraBackgroundProps {
  color: MotionValue<string>;
}

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Safety check for WebGL2/WebGL support
    const canvasTest = document.createElement("canvas");
    const gl = canvasTest.getContext("webgl2") || canvasTest.getContext("webgl");
    if (!gl) {
      console.warn("WebGL is not supported. Skipping starfield background.");
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 1;

    // Create 2500 stars distributed inside a sphere
    const count = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 35 + 15 * Math.random(); // Distribute stars at a distance from camera

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Dynamic circular sprite canvas texture for smooth rendering
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let animationFrameId: number;
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Slowly rotate the stars on multiple axes for deep cosmic feel
      stars.rotation.y = time * 0.00003;
      stars.rotation.x = time * 0.00001;
      
      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ color }) => {
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 35%, ${color})`;

  return (
    <motion.div
      style={{ backgroundImage }}
      className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950"
    >
      <Starfield />
    </motion.div>
  );
};

export default AuroraBackground;
