// ASTRAVERSE 2.0 - Celestial Canvas Engine
// Renders procedural rotating 3D planets/stars & interactive constellation star charts

export class CelestialCanvas {
  constructor(canvasElement, type = 'planet') {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.type = type; // 'planet' | 'constellation' | 'galaxy'
    this.rotation = 0;
    this.animationId = null;
    this.currentData = null;
    this.hoveredStar = null;
    this.width = canvasElement.clientWidth || 400;
    this.height = canvasElement.clientHeight || 400;

    this.initEvents();
  }

  initEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.type !== 'constellation' || !this.currentData || !this.currentData.stars) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      for (const star of this.currentData.stars) {
        const sx = (star.x / 100) * this.width;
        const sy = (star.y / 100) * this.height;
        const dist = Math.hypot(mouseX - sx, mouseY - sy);
        if (dist < 18) {
          found = star;
          break;
        }
      }
      if (this.hoveredStar !== found) {
        this.hoveredStar = found;
        this.canvas.style.cursor = found ? 'pointer' : 'default';
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredStar = null;
    });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || 400;
    this.height = rect.height || 400;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  start(data, type = 'planet') {
    this.stop();
    this.currentData = data;
    this.type = type;
    this.resize();
    this.rotation = 0;

    const renderLoop = () => {
      this.rotation += 0.008;
      this.render();
      this.animationId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.type === 'constellation') {
      this.renderConstellation();
    } else if (this.type === 'star') {
      this.renderStar();
    } else if (this.type === 'galaxy') {
      this.renderGalaxy();
    } else {
      this.renderPlanet();
    }
  }

  // --- RENDER PLANET SPHERE ---
  renderPlanet() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.36;
    const id = this.currentData ? this.currentData.id : 'earth';

    this.ctx.save();

    // Outer atmospheric glow
    const glowGrad = this.ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.35);
    const glowColor = this.currentData?.color || '#38bdf8';
    glowGrad.addColorStop(0, `${glowColor}55`);
    glowGrad.addColorStop(0.5, `${glowColor}20`);
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    this.ctx.fillStyle = glowGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
    this.ctx.fill();

    // If Saturn, draw back half of rings
    if (id === 'saturn') {
      this.drawSaturnRings(cx, cy, radius, true);
    }

    // Clip to spherical disc
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.clip();

    // Base planetary fill
    this.drawPlanetSurface(cx, cy, radius, id);

    // Day/Night 3D spherical shadow terminator
    const shadowGrad = this.ctx.createRadialGradient(
      cx - radius * 0.35, cy - radius * 0.35, radius * 0.1,
      cx + radius * 0.25, cy + radius * 0.25, radius * 1.1
    );
    shadowGrad.addColorStop(0, 'rgba(255,255,255,0.18)');
    shadowGrad.addColorStop(0.45, 'rgba(0,0,0,0)');
    shadowGrad.addColorStop(0.75, 'rgba(0,0,0,0.55)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0.92)');

    this.ctx.fillStyle = shadowGrad;
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    this.ctx.restore();

    // If Saturn, draw front half of rings
    if (id === 'saturn') {
      this.drawSaturnRings(cx, cy, radius, false);
    }
  }

  drawPlanetSurface(cx, cy, radius, id) {
    if (id === 'earth') {
      // Ocean base
      this.ctx.fillStyle = '#0f3d6c';
      this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Rotating continents
      this.ctx.fillStyle = '#15803d';
      for (let i = -2; i < 4; i++) {
        const ox = cx + Math.sin(this.rotation + i * 1.4) * (radius * 0.85);
        this.ctx.beginPath();
        this.ctx.arc(ox, cy + i * 20, radius * 0.45, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Swirling cloud layer
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = -2; i < 4; i++) {
        const ox = cx + Math.sin(this.rotation * 1.25 + i * 1.1) * (radius * 0.9);
        this.ctx.beginPath();
        this.ctx.ellipse(ox, cy + i * 28, radius * 0.6, radius * 0.15, 0.2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } else if (id === 'mars') {
      this.ctx.fillStyle = '#c2410c';
      this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Dark volcanic basalt patches
      this.ctx.fillStyle = '#7c2d12';
      for (let i = -1; i < 3; i++) {
        const ox = cx + Math.sin(this.rotation + i * 1.6) * (radius * 0.7);
        this.ctx.beginPath();
        this.ctx.arc(ox, cy + i * 30, radius * 0.35, 0, Math.PI * 2);
        this.ctx.fill();
      }
      // White polar ice cap
      this.ctx.fillStyle = '#f8fafc';
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy - radius * 0.82, radius * 0.35, radius * 0.12, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (id === 'jupiter') {
      // Banded gas giant
      const bands = ['#d97706', '#fed7aa', '#b45309', '#fde68a', '#c2410c', '#ffedd5', '#9a3412'];
      const sliceH = (radius * 2) / bands.length;
      for (let b = 0; b < bands.length; b++) {
        this.ctx.fillStyle = bands[b];
        this.ctx.fillRect(cx - radius, (cy - radius) + b * sliceH, radius * 2, sliceH + 1);
      }
      // Great Red Spot
      const grsX = cx + Math.sin(this.rotation) * (radius * 0.75);
      const grsY = cy + radius * 0.25;
      this.ctx.fillStyle = '#b91c1c';
      this.ctx.beginPath();
      this.ctx.ellipse(grsX, grsY, radius * 0.22, radius * 0.12, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (id === 'saturn') {
      const bands = ['#eab308', '#fef08a', '#ca8a04', '#fef9c3', '#a16207'];
      const sliceH = (radius * 2) / bands.length;
      for (let b = 0; b < bands.length; b++) {
        this.ctx.fillStyle = bands[b];
        this.ctx.fillRect(cx - radius, (cy - radius) + b * sliceH, radius * 2, sliceH + 1);
      }
    } else if (id === 'venus') {
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      this.ctx.fillStyle = 'rgba(254, 243, 199, 0.4)';
      for (let i = -2; i < 3; i++) {
        const ox = cx + Math.sin(this.rotation * 0.8 + i) * (radius * 0.8);
        this.ctx.beginPath();
        this.ctx.ellipse(ox, cy + i * 35, radius * 0.7, radius * 0.2, -0.3, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } else if (id === 'europa') {
      // Ice world with red/brown lineae fractures
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      this.ctx.strokeStyle = 'rgba(154, 52, 18, 0.6)';
      this.ctx.lineWidth = 2;
      for (let i = -2; i < 3; i++) {
        const ox = cx + Math.sin(this.rotation + i) * (radius * 0.8);
        this.ctx.beginPath();
        this.ctx.moveTo(ox - radius * 0.5, cy + i * 30 - 20);
        this.ctx.bezierCurveTo(ox, cy + i * 30 + 10, ox + 30, cy + i * 30 - 30, ox + radius * 0.5, cy + i * 30 + 20);
        this.ctx.stroke();
      }
    } else {
      // General procedural sphere
      const baseGrad = this.ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      baseGrad.addColorStop(0, this.currentData?.color || '#38bdf8');
      baseGrad.addColorStop(1, '#1e293b');
      this.ctx.fillStyle = baseGrad;
      this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    }
  }

  drawSaturnRings(cx, cy, radius, isBack) {
    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(-0.35); // 20 degree tilt

    // Clip half if back vs front
    this.ctx.beginPath();
    if (isBack) {
      this.ctx.rect(-radius * 2.6, -radius * 2.6, radius * 5.2, radius * 2.6);
    } else {
      this.ctx.rect(-radius * 2.6, 0, radius * 5.2, radius * 2.6);
    }
    this.ctx.clip();

    // Ring A & B with Cassini division
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, radius * 2.2, radius * 0.55, 0, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
    this.ctx.lineWidth = radius * 0.45;
    this.ctx.stroke();

    // Cassini Division dark line
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, radius * 2.05, radius * 0.51, 0, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(10, 13, 30, 0.9)';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    this.ctx.restore();
  }

  // --- RENDER STAR ---
  renderStar() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.32;
    const color = this.currentData?.color || '#ffd700';

    this.ctx.save();

    // Corona rays pulsating
    const rayCount = 16;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2 + this.rotation * 0.5;
      const rayLen = radius * (1.3 + Math.sin(this.rotation * 3 + i) * 0.18);
      const grad = this.ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, rayLen);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.arc(cx, cy, rayLen, angle - 0.12, angle + 0.12);
      this.ctx.closePath();
      this.ctx.fill();
    }

    // Fiery body
    const bodyGrad = this.ctx.createRadialGradient(
      cx - radius * 0.2, cy - radius * 0.2, radius * 0.1,
      cx, cy, radius
    );
    bodyGrad.addColorStop(0, '#ffffff');
    bodyGrad.addColorStop(0.4, color);
    bodyGrad.addColorStop(0.85, '#ea580c');
    bodyGrad.addColorStop(1, '#9a3412');

    this.ctx.fillStyle = bodyGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Solar flares
    for (let f = 0; f < 4; f++) {
      const fAngle = this.rotation * 1.5 + (f * Math.PI / 2);
      const fx = cx + Math.cos(fAngle) * radius;
      const fy = cy + Math.sin(fAngle) * radius;
      const fH = 15 + Math.sin(this.rotation * 4 + f) * 8;

      this.ctx.fillStyle = '#ffedd5';
      this.ctx.beginPath();
      this.ctx.arc(fx + Math.cos(fAngle) * fH * 0.5, fy + Math.sin(fAngle) * fH * 0.5, fH * 0.4, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  // --- RENDER GALAXY ---
  renderGalaxy() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxR = Math.min(this.width, this.height) * 0.42;
    const color = this.currentData?.color || '#a855f7';

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(this.rotation * 0.3);

    // Glowing Core
    const coreGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, maxR * 0.35);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.3, '#fef08a');
    coreGrad.addColorStop(0.7, color);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    this.ctx.fillStyle = coreGrad;
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, maxR * 0.38, maxR * 0.25, 0.4, 0, Math.PI * 2);
    this.ctx.fill();

    // Spiral Arms particles
    const arms = 2;
    const particlesPerArm = 180;
    for (let a = 0; a < arms; a++) {
      const armOffset = (a * Math.PI * 2) / arms;
      for (let p = 0; p < particlesPerArm; p++) {
        const dist = (p / particlesPerArm) * maxR;
        const theta = armOffset + (p * 0.045);
        const px = Math.cos(theta) * dist + (Math.sin(p * 2) * 6);
        const py = Math.sin(theta) * dist * 0.65 + (Math.cos(p * 3) * 6);
        const alpha = Math.max(0.1, 1 - (p / particlesPerArm) * 0.85);

        this.ctx.fillStyle = p % 3 === 0 ? '#ffffff' : color;
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(px, py, Math.random() * 1.5 + 0.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    this.ctx.restore();
  }

  // --- RENDER CONSTELLATION CHART ---
  renderConstellation() {
    if (!this.currentData || !this.currentData.stars) return;

    this.ctx.save();

    // Celestial Grid background rings
    const cx = this.width / 2;
    const cy = this.height / 2;
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, this.width * 0.4, 0, Math.PI * 2);
    this.ctx.arc(cx, cy, this.width * 0.25, 0, Math.PI * 2);
    this.ctx.stroke();

    // Map stars to coordinate lookup
    const starMap = {};
    for (const star of this.currentData.stars) {
      starMap[star.id] = {
        ...star,
        px: (star.x / 100) * this.width,
        py: (star.y / 100) * this.height
      };
    }

    // 1. Draw glowing constellation lines
    if (this.currentData.lines) {
      for (const line of this.currentData.lines) {
        const s1 = starMap[line[0]];
        const s2 = starMap[line[1]];
        if (!s1 || !s2) continue;

        // Outer glow
        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        this.ctx.lineWidth = 3.5;
        this.ctx.beginPath();
        this.ctx.moveTo(s1.px, s1.py);
        this.ctx.lineTo(s2.px, s2.py);
        this.ctx.stroke();

        // Inner sharp starlight line
        this.ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
        this.ctx.lineWidth = 1.4;
        this.ctx.beginPath();
        this.ctx.moveTo(s1.px, s1.py);
        this.ctx.lineTo(s2.px, s2.py);
        this.ctx.stroke();
      }
    }

    // 2. Draw stars
    for (const s of Object.values(starMap)) {
      const isHovered = this.hoveredStar && this.hoveredStar.id === s.id;
      const baseR = Math.max(2.5, 6 - s.mag * 0.8);
      const r = isHovered ? baseR * 1.8 : baseR;

      // Glow halo
      this.ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.45)' : 'rgba(56, 189, 248, 0.35)';
      this.ctx.beginPath();
      this.ctx.arc(s.px, s.py, r * 2.6, 0, Math.PI * 2);
      this.ctx.fill();

      // Star core
      this.ctx.fillStyle = s.color || '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(s.px, s.py, r, 0, Math.PI * 2);
      this.ctx.fill();

      // Diffraction cross spike on bright stars or hovered
      if (s.mag < 2.0 || isHovered) {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.lineWidth = 1;
        const spikeLen = r * 3;
        this.ctx.beginPath();
        this.ctx.moveTo(s.px - spikeLen, s.py);
        this.ctx.lineTo(s.px + spikeLen, s.py);
        this.ctx.moveTo(s.px, s.py - spikeLen);
        this.ctx.lineTo(s.px, s.py + spikeLen);
        this.ctx.stroke();
      }

      // Star label
      this.ctx.font = isHovered ? 'bold 12px "Inter", sans-serif' : '10px "Inter", sans-serif';
      this.ctx.fillStyle = isHovered ? '#00f0ff' : 'rgba(226, 232, 240, 0.75)';
      this.ctx.fillText(s.name, s.px + r + 6, s.py + 3);
    }

    // Hover tooltip
    if (this.hoveredStar) {
      const s = starMap[this.hoveredStar.id];
      if (s) {
        const ttText = `${s.name} (Mag: ${s.mag})`;
        this.ctx.font = '11px "Inter", sans-serif';
        const tw = this.ctx.measureText(ttText).width;

        this.ctx.fillStyle = 'rgba(6, 8, 20, 0.9)';
        this.ctx.strokeStyle = '#00f0ff';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.roundRect(s.px - tw / 2 - 8, s.py - 34, tw + 16, 22, 4);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(ttText, s.px - tw / 2, s.py - 19);
      }
    }

    this.ctx.restore();
  }
}
