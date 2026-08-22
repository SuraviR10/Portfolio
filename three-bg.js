/**
 * three-bg.js — Premium 3D particle constellation & floating wireframe geometry background.
 * Uses Three.js to render glowing particles, connecting lines, and interactive 3D shapes.
 */
(function () {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    particleCount: window.innerWidth <= 768 ? 60 : 130,
    connectionDistance: 130,
    mouseInfluenceRadius: 200,
    mouseStrength: 0.03,
    driftSpeed: 0.2,
    particleSize: 2.5,
    colorPrimary: 0x8b5cf6,   // Cyber Violet
    colorSecondary: 0x06b6d4, // Neon Cyan
    colorAccent: 0xec4899,    // Pink Glow
    lineOpacity: 0.15,
    particleOpacity: 0.85,
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Setup ---
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  let isVisible = true;
  let animationId = null;
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 320;

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

  // 1. TorusKnot wireframe in background
  const knotGeo = new THREE.TorusKnotGeometry(45, 12, 100, 16);
  const knotMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorPrimary,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  const knotMesh = new THREE.Mesh(knotGeo, knotMat);
  knotMesh.position.set(160, 40, -100);
  shapeGroup.add(knotMesh);

  // 2. Icosahedron wireframe
  const icoGeo = new THREE.IcosahedronGeometry(35, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorSecondary,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  icoMesh.position.set(-180, -50, -80);
  shapeGroup.add(icoMesh);

  // 3. Small Octahedrons
  const octMat = new THREE.MeshBasicMaterial({
    color: CONFIG.colorAccent,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  const oct1 = new THREE.Mesh(new THREE.OctahedronGeometry(18), octMat);
  oct1.position.set(-120, 120, -50);
  shapeGroup.add(oct1);

  const oct2 = new THREE.Mesh(new THREE.OctahedronGeometry(22), knotMat);
  oct2.position.set(200, -110, -60);
  shapeGroup.add(oct2);

  // --- Particles ---
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
    positions[i3 + 2] = (Math.random() - 0.5) * 80;

    velocities[i3] = (Math.random() - 0.5) * CONFIG.driftSpeed;
    velocities[i3 + 1] = (Math.random() - 0.5) * CONFIG.driftSpeed;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

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

  // --- Lines (connections) ---
  const maxLines = particleCount * 7;
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

  // --- Resize Handler ---
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

  // --- Mouse Tracking ---
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

  // --- Visibility Observer ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) {
          animate();
        }
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(heroSection);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else if (isVisible) {
      animate();
    }
  });

  // --- Animation Loop ---
  function animate() {
    if (!isVisible || document.hidden) {
      animationId = null;
      return;
    }

    animationId = requestAnimationFrame(animate);

    // Smooth lerp mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Rotate 3D wireframe shapes smoothly
    knotMesh.rotation.x += 0.003;
    knotMesh.rotation.y += 0.005;

    icoMesh.rotation.x -= 0.004;
    icoMesh.rotation.y += 0.006;

    oct1.rotation.y += 0.008;
    oct2.rotation.x += 0.007;

    // Parallax shape group with mouse
    shapeGroup.position.x = mouse.x * 0.08;
    shapeGroup.position.y = mouse.y * 0.08;

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
          pos[i3] += (dx / dist) * force * 12;
          pos[i3 + 1] += (dy / dist) * force * 12;
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
    }

    // Update connection lines
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
        const distSq = dx * dx + dy * dy;

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

