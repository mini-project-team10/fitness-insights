"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let renderer: any;
    let scene: any;
    let camera: any;
    let meshes: any[] = [];
    let particles: any;
    let clock: any;

    async function init() {
      const THREE = await import("three");

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      clock = new THREE.Clock();

      // ─── Color Palette ───
      const colors = [
        new THREE.Color("#ff5a00"), // Orange
        new THREE.Color("#ccff00"), // Lime
        new THREE.Color("#00e5ff"), // Cyan
        new THREE.Color("#ff3cac"), // Pink
        new THREE.Color("#784ba0"), // Purple
        new THREE.Color("#2b86c5"), // Blue
        new THREE.Color("#ff6b6b"), // Coral
        new THREE.Color("#feca57"), // Gold
        new THREE.Color("#48dbfb"), // Sky
        new THREE.Color("#0abde3"), // Teal
      ];

      // ─── 1. Floating Gradient Spheres ───
      for (let i = 0; i < 8; i++) {
        const radius = Math.random() * 1.5 + 0.8;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshPhysicalMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.35,
          roughness: 0.1,
          metalness: 0.3,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          emissive: colors[i % colors.length],
          emissiveIntensity: 0.4,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20 - 5
        );
        mesh.userData = {
          basePosition: mesh.position.clone(),
          speed: Math.random() * 0.5 + 0.2,
          amplitude: Math.random() * 3 + 2,
          phase: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: "sphere",
        };
        scene.add(mesh);
        meshes.push(mesh);
      }

      // ─── 2. Torus Knots ───
      for (let i = 0; i < 4; i++) {
        const geometry = new THREE.TorusKnotGeometry(
          1.2 + Math.random() * 0.8,
          0.3 + Math.random() * 0.2,
          128,
          16,
          2 + Math.floor(Math.random() * 3),
          3 + Math.floor(Math.random() * 4)
        );
        const material = new THREE.MeshPhysicalMaterial({
          color: colors[(i + 3) % colors.length],
          transparent: true,
          opacity: 0.3,
          roughness: 0.05,
          metalness: 0.6,
          clearcoat: 1,
          emissive: colors[(i + 3) % colors.length],
          emissiveIntensity: 0.3,
          wireframe: i % 2 === 0,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 25,
          -10 - Math.random() * 10
        );
        mesh.userData = {
          basePosition: mesh.position.clone(),
          speed: Math.random() * 0.3 + 0.15,
          amplitude: Math.random() * 4 + 2,
          phase: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          type: "torusKnot",
        };
        scene.add(mesh);
        meshes.push(mesh);
      }

      // ─── 3. Icosahedrons (Crystal shapes) ───
      for (let i = 0; i < 5; i++) {
        const geometry = new THREE.IcosahedronGeometry(
          0.8 + Math.random() * 1.2,
          i % 2 === 0 ? 0 : 1
        );
        const material = new THREE.MeshPhysicalMaterial({
          color: colors[(i + 6) % colors.length],
          transparent: true,
          opacity: 0.3,
          roughness: 0.0,
          metalness: 0.8,
          clearcoat: 1,
          emissive: colors[(i + 6) % colors.length],
          emissiveIntensity: 0.5,
          wireframe: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 30,
          -5 - Math.random() * 15
        );
        mesh.userData = {
          basePosition: mesh.position.clone(),
          speed: Math.random() * 0.4 + 0.1,
          amplitude: Math.random() * 5 + 2,
          phase: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.025,
          type: "icosahedron",
        };
        scene.add(mesh);
        meshes.push(mesh);
      }

      // ─── 4. Octahedrons ───
      for (let i = 0; i < 4; i++) {
        const geometry = new THREE.OctahedronGeometry(
          0.6 + Math.random() * 0.8,
          0
        );
        const material = new THREE.MeshPhysicalMaterial({
          color: colors[(i + 2) % colors.length],
          transparent: true,
          opacity: 0.35,
          roughness: 0.0,
          metalness: 1.0,
          clearcoat: 1,
          emissive: colors[(i + 2) % colors.length],
          emissiveIntensity: 0.6,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 28,
          -3 - Math.random() * 12
        );
        mesh.userData = {
          basePosition: mesh.position.clone(),
          speed: Math.random() * 0.35 + 0.2,
          amplitude: Math.random() * 3.5 + 1.5,
          phase: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          type: "octahedron",
        };
        scene.add(mesh);
        meshes.push(mesh);
      }

      // ─── 5. Particle Field (Colorful stars) ───
      const particleCount = 600;
      const positions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;

        const color = colors[Math.floor(Math.random() * colors.length)];
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(particleColors, 3)
      );
      particleGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes, 1)
      );

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.7,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // ─── 6. Ring geometries ───
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.TorusGeometry(
          2 + Math.random() * 2,
          0.05 + Math.random() * 0.1,
          16,
          100
        );
        const material = new THREE.MeshPhysicalMaterial({
          color: colors[(i + 5) % colors.length],
          transparent: true,
          opacity: 0.25,
          emissive: colors[(i + 5) % colors.length],
          emissiveIntensity: 0.8,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          -8 - Math.random() * 10
        );
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.userData = {
          basePosition: mesh.position.clone(),
          speed: Math.random() * 0.2 + 0.1,
          amplitude: Math.random() * 4 + 2,
          phase: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: "ring",
        };
        scene.add(mesh);
        meshes.push(mesh);
      }

      // ─── Lighting ───
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0xff5a00, 2, 50);
      pointLight1.position.set(15, 10, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x00e5ff, 2, 50);
      pointLight2.position.set(-15, -10, 10);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0xccff00, 1.5, 50);
      pointLight3.position.set(0, 15, 5);
      scene.add(pointLight3);

      const pointLight4 = new THREE.PointLight(0xff3cac, 1.5, 50);
      pointLight4.position.set(-10, -15, 5);
      scene.add(pointLight4);

      setIsReady(true);

      // ─── Animation Loop ───
      function animate() {
        animationRef.current = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Animate meshes
        meshes.forEach((mesh) => {
          const { basePosition, speed, amplitude, phase, rotationSpeed, type } =
            mesh.userData;

          // Floating motion
          mesh.position.x =
            basePosition.x + Math.sin(elapsed * speed + phase) * amplitude;
          mesh.position.y =
            basePosition.y +
            Math.cos(elapsed * speed * 0.7 + phase) * amplitude * 0.6;
          mesh.position.z =
            basePosition.z +
            Math.sin(elapsed * speed * 0.3 + phase * 2) * 2;

          // Rotation
          mesh.rotation.x += rotationSpeed;
          mesh.rotation.y += rotationSpeed * 0.7;

          if (type === "ring") {
            mesh.rotation.z += rotationSpeed * 1.5;
          }

          // Pulsing scale
          const scale = 1 + Math.sin(elapsed * speed * 2 + phase) * 0.1;
          mesh.scale.setScalar(scale);
        });

        // Animate particles
        if (particles) {
          particles.rotation.y = elapsed * 0.02;
          particles.rotation.x = Math.sin(elapsed * 0.01) * 0.1;
          
          const posArray = particles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < posArray.length; i += 3) {
            posArray[i + 1] += Math.sin(elapsed + posArray[i]) * 0.003;
          }
          particles.geometry.attributes.position.needsUpdate = true;
        }

        // Gentle camera sway
        camera.position.x = Math.sin(elapsed * 0.15) * 2;
        camera.position.y = Math.cos(elapsed * 0.1) * 1.5;
        camera.lookAt(0, 0, -5);

        // Animate lights
        pointLight1.position.x = Math.sin(elapsed * 0.3) * 20;
        pointLight1.position.y = Math.cos(elapsed * 0.2) * 15;
        pointLight2.position.x = Math.cos(elapsed * 0.25) * 20;
        pointLight2.position.y = Math.sin(elapsed * 0.35) * 15;

        renderer.render(scene, camera);
      }

      animate();

      // ─── Resize ───
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    init();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
          pointerEvents: "none",
          opacity: isReady ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      />
      {/* Colorful gradient overlay for extra vibrancy */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -9,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(255, 90, 0, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(204, 255, 0, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 70%, rgba(255, 60, 172, 0.06) 0%, transparent 50%)
          `,
          opacity: isReady ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      />
    </>
  );
}
