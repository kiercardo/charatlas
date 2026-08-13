/* CharAtlas — schematic 3D amorphous carbon network (ball-and-stick),
   after the classic molecular-model renders. Slow rotation, drag to spin.
   Registers <biochar-3d>. three.js fetched at runtime (no bare imports). */
const THREE_URL = 'https://unpkg.com/three@0.170.0/build/three.module.js';
const loadThree = () => import(/* @vite-ignore */ (window.__resources && window.__resources.threeJs) || THREE_URL);

const INK = 0x2a2a26, GREEN = 0x1e7d3a;
let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

class Biochar3D extends HTMLElement {
  async connectedCallback() {
    if (this._up) return;
    this._up = true;
    let THREE;
    try { THREE = await loadThree(); } catch (e) { return; }
    if (!this.isConnected) return;
    const w = this.clientWidth || 520, h = this.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.domElement.style.cursor = 'grab';
    this.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    /* --- atoms: blue-noise fill of an irregular blob ---------------------- */
    seed = 7;
    const atoms = [];
    const MIN_D = 0.62, R_BLOB = 3.2;
    let tries = 0;
    while (atoms.length < 252 && tries < 30000) {
      tries++;
      const v = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1);
      if (v.lengthSq() > 1) continue;
      /* irregular boundary: radius modulated by direction */
      const d = v.clone().normalize();
      const wob = 1 + 0.22 * Math.sin(d.x * 5.1) * Math.cos(d.y * 4.3) + 0.16 * Math.sin(d.z * 6.2);
      v.multiplyScalar(R_BLOB * wob);
      let ok = true;
      for (const a of atoms) { if (a.distanceToSquared(v) < MIN_D * MIN_D) { ok = false; break; } }
      if (ok) atoms.push(v);
    }

    /* --- bonds: nearest neighbours within cutoff, max 4 per atom ---------- */
    const CUT = 1.05;
    const bondCount = new Array(atoms.length).fill(0);
    const bondPts = [];
    for (let i = 0; i < atoms.length; i++) {
      /* collect candidates sorted by distance so short bonds win */
      const cands = [];
      for (let j = i + 1; j < atoms.length; j++) {
        const d2 = atoms[i].distanceToSquared(atoms[j]);
        if (d2 < CUT * CUT) cands.push([d2, j]);
      }
      cands.sort((a, b) => a[0] - b[0]);
      for (const [, j] of cands) {
        if (bondCount[i] >= 4) break;
        if (bondCount[j] >= 4) continue;
        bondPts.push(atoms[i], atoms[j]);
        bondCount[i]++; bondCount[j]++;
      }
    }
    root.add(new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(bondPts),
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.55 })));

    /* --- atom spheres (instanced), a scatter of brand-green ones ---------- */
    const greenIdx = new Set();
    while (greenIdx.size < 26) greenIdx.add(Math.floor(rnd() * atoms.length));
    const sph = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.075, 10, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      atoms.length);
    const m4 = new THREE.Matrix4();
    const cInk = new THREE.Color(INK), cGreen = new THREE.Color(GREEN);
    atoms.forEach((a, i) => {
      m4.makeTranslation(a.x, a.y, a.z);
      sph.setMatrixAt(i, m4);
      sph.setColorAt(i, greenIdx.has(i) ? cGreen : cInk);
    });
    root.add(sph);

    /* --- camera + drag ----------------------------------------------------- */
    const RADIUS = 13.5;
    let yaw = 0.9, pitch = 0.3;
    let dragging = false, lastX = 0, lastY = 0, vYaw = 0, lastInteract = 0;
    const applyCam = () => {
      pitch = Math.max(-1.3, Math.min(1.3, pitch));
      camera.position.set(
        RADIUS * Math.cos(pitch) * Math.sin(yaw),
        RADIUS * Math.sin(pitch),
        RADIUS * Math.cos(pitch) * Math.cos(yaw));
      camera.lookAt(0, 0, 0);
    };
    const cv = renderer.domElement;
    cv.addEventListener('pointerdown', (e) => {
      dragging = true; lastInteract = performance.now();
      lastX = e.clientX; lastY = e.clientY;
      cv.style.cursor = 'grabbing'; cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      lastInteract = performance.now();
      vYaw = (e.clientX - lastX) * 0.0075;
      yaw += vYaw;
      pitch += (e.clientY - lastY) * 0.006;
      lastX = e.clientX; lastY = e.clientY;
      applyCam();
    });
    const endDrag = () => { dragging = false; lastInteract = performance.now(); cv.style.cursor = 'grab'; };
    cv.addEventListener('pointerup', endDrag);
    cv.addEventListener('pointercancel', endDrag);

    let szW = w, szH = h;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        const nw = this.clientWidth, nh = this.clientHeight;
        if (!nw || !nh || (nw === szW && nh === szH)) return;
        szW = nw; szH = nh;
        camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh);
      });
    });
    ro.observe(this);

    let vis = true;
    new IntersectionObserver((e) => { vis = e[0].isIntersecting; }, { threshold: 0 }).observe(this);
    applyCam();
    renderer.setAnimationLoop(() => {
      if (!vis) return;
      if (!dragging) {
        if (Math.abs(vYaw) > 0.0004) { vYaw *= 0.94; yaw += vYaw; }
        else if (performance.now() - lastInteract > 2500) yaw += 0.0011; /* gentle idle spin */
        applyCam();
      }
      renderer.render(scene, camera);
    });
  }
}
customElements.define('biochar-3d', Biochar3D);
