/**
 * three-bg.js — Premium 3D particle constellation & floating wireframe geometry.
 * Refined for smoother visuals, reduced intensity, and better depth.
 */
(function () {
  'use strict';

  const CONFIG = {
    particleCount: window.innerWidth <= 768 ? 50 : 110,
    connectionDistance: 120,
    mouseInfluenceRadius: 180,
    mouseStrength: 0.025,
    driftSpeed: 0.15,
    particleSize: 2.2,
    colorPrimary: 0x8b5cf6,
    colorSecondary: 0x06b6d4,
    colorAccent: 0xec4899,
    lineOpacity: 0.1,
    particleOpacity: 0.7,
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  let isVisible = true;
  let animationId = null;
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Scene
  const scene = new THREE.Scene();

  // Camera with slightly wider FOV for more depth
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.z = 350;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // --- 3D Wireframe Floating Objects ---
  const shapeGroup = new THREE.Group();
  scene.add(shapeGroup);

  // TorusKnot — softer, more subtle
  const knotGeo = new THREE.TorusKnotGeometry(40, 10, 80, 14);
  const knotMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorPrimary,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const knotMesh = new THREE.Mesh(knotGeo, knotMat);
  knotMesh.position.set(180, 50, -140);
  shapeGroup.add(knotMesh);

  // Icosahedron — deeper in background
  const icoGeo = new THREE.IcosahedronGeometry(30, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorSecondary,
    wireframe: true,
    transparent: true,
    opacity: 0.14,
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  icoMesh.position.set(-200, -60, -120);
  shapeGroup.add(icoMesh);

  // Smaller shapes with depth variation
  const octMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorAccent,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const oct1 = new THREE.Mesh(new THREE.OctahedronGeometry(15), octMat);
  oct1.position.set(-140, 130, -70);
  shapeGroup.add(oct1);

  const oct2 = new THREE.Mesh(new THREE.OctahedronGeometry(18), knotMat.clone());
  oct2.material.opacity = 0.1;
  oct2.position.set(220, -120, -90);
  shapeGroup.add(oct2);

  // Extra depth: small dodecahedron far back
  const dodGeo = new THREE.DodecahedronGeometry(12, 0);
  const dodMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorSecondary,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const dodMesh = new THREE.Mesh(dodGeo, dodMat);
  dodMesh.position.set(50, 150, -180);
  shapeGroup.add(dodMesh);

  // --- Particles with z-depth variation ---
  const particleCount = CONFIG.particleCount;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const primaryColor = new THREE.Color(CONFIG.colorPrimary);
  const secondaryColor = new THREE.Color(CONFIG.colorSecondary);

  let boundsX = 420;
  let boundsY = 300;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * boundsX * 2;
    positions[i3 + 1] = (Math.random() - 0.5) * boundsY * 2;
    positions[i3 + 2] = (Math.random() - 0.5) * 150; // Deeper z-range

    velocities[i3] = (Math.random() - 0.5) * CONFIG.driftSpeed;
    velocities[i3 + 1] = (Math.random() - 0.5) * CONFIG.driftSpeed;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.04;

    const t = Math.random();
    const color = primaryColor.clone().lerp(secondaryColor, t);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: CONFIG.particleSize,
    vertexColors: true,
    transparent: true,
    opacity: CONFIG.particleOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(points);

  // --- Connection Lines ---
  const maxLines = particleCount * 6;
  const linePositions = new Float32Array(maxLines * 6);
  const lineColors = new Float32Array(maxLines * 6);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
  lineGeometry.setDrawRange(0, 0);

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: CONFIG.lineOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // --- Resize ---
  function resize() {
    const rect = heroSection.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    boundsX = width * 0.55;
    boundsY = height * 0.55;
  }

  resize();
  window.addEventListener('resize', resize);

  // --- Mouse ---
  function onMouseMove(e) {
    const rect = heroSection.getBoundingClientRect();
    mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * boundsX * 2;
    mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * boundsY * 2;
  }

  function onMouseLeave() {
    mouse.targetX = 0;
    mouse.targetY = 0;
  }

  if (!prefersReducedMotion) {
    heroSection.addEventListener('mousemove', onMouseMove);
    heroSection.addEventListener('mouseleave', onMouseLeave);
  }

  // --- Visibility ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) animate();
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(heroSection);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    } else if (isVisible) {
      animate();
    }
  });

  // --- Time tracking for pulsing effects ---
  let time = 0;

  // --- Animation ---
  function animate() {
    if (!isVisible || document.hidden) { animationId = null; return; }
    animationId = requestAnimationFrame(animate);

    time += 0.008;

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Rotate shapes slowly
    knotMesh.rotation.x += 0.002;
    knotMesh.rotation.y += 0.003;
    icoMesh.rotation.x -= 0.003;
    icoMesh.rotation.y += 0.004;
    oct1.rotation.y += 0.005;
    oct2.rotation.x += 0.004;
    dodMesh.rotation.x += 0.002;
    dodMesh.rotation.z += 0.003;

    // Subtle pulsing on wireframes
    knotMat.opacity = 0.12 + Math.sin(time) * 0.02;
    icoMat.opacity = 0.14 + Math.sin(time + 1) * 0.02;

    // Parallax shapes with mouse
    shapeGroup.position.x = mouse.x * 0.06;
    shapeGroup.position.y = mouse.y * 0.06;

    const pos = particleGeometry.attributes.position.array;

    if (!prefersReducedMotion) {
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i3];
        pos[i3 + 1] += velocities[i3 + 1];

        if (pos[i3] > boundsX) pos[i3] = -boundsX;
        else if (pos[i3] < -boundsX) pos[i3] = boundsX;
        if (pos[i3 + 1] > boundsY) pos[i3 + 1] = -boundsY;
        else if (pos[i3 + 1] < -boundsY) pos[i3 + 1] = boundsY;

        const dx = pos[i3] - mouse.x;
        const dy = pos[i3 + 1] - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseInfluenceRadius && dist > 0) {
          const force = (1 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseStrength;
          pos[i3] += (dx / dist) * force * 10;
          pos[i3 + 1] += (dy / dist) * force * 10;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
    }

    // Connection lines
    let lineIndex = 0;
    const linePos = lineGeometry.attributes.position.array;
    const lineCol = lineGeometry.attributes.color.array;
    const connDist = CONFIG.connectionDistance;
    const connDistSq = connDist * connDist;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < particleCount; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connDistSq && lineIndex < maxLines) {
          const li = lineIndex * 6;
          linePos[li] = pos[i3];
          linePos[li + 1] = pos[i3 + 1];
          linePos[li + 2] = pos[i3 + 2];
          linePos[li + 3] = pos[j3];
          linePos[li + 4] = pos[j3 + 1];
          linePos[li + 5] = pos[j3 + 2];

          const alpha = 1 - distSq / connDistSq;
          lineCol[li] = primaryColor.r * alpha;
          lineCol[li + 1] = primaryColor.g * alpha;
          lineCol[li + 2] = primaryColor.b * alpha;
          lineCol[li + 3] = secondaryColor.r * alpha;
          lineCol[li + 4] = secondaryColor.g * alpha;
          lineCol[li + 5] = secondaryColor.b * alpha;

          lineIndex++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  if (!prefersReducedMotion) {
    animate();
  } else {
    renderer.render(scene, camera);
  }
})();
