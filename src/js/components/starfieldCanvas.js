// ASTRAVERSE 2.0 - Stellarium-inspired dynamic starfield background
// Features 3-layer parallax, twinkling stars, nebular ambient color washes, and periodic shooting stars

export class StarfieldCanvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.stars = [];
    this.meteors = [];
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.width = 0;
    this.height = 0;
    this.lastMeteorTime = Date.now();
    this.meteorInterval = 6000; // Average every 6s

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX - this.width / 2) * 0.05;
      this.mouse.targetY = (e.clientY - this.height / 2) * 0.05;
    });

    this.generateStars(650);
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);

    if (this.stars.length === 0) {
      this.generateStars(650);
    }
  }

  generateStars(count) {
    this.stars = [];
    const colors = ['#ffffff', '#e0f2fe', '#bae6fd', '#fed7aa', '#fef08a', '#c4b5fd'];

    for (let i = 0; i < count; i++) {
      const layer = Math.random() < 0.65 ? 1 : (Math.random() < 0.85 ? 2 : 3);
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        baseRadius: layer === 1 ? Math.random() * 0.8 + 0.3 : (layer === 2 ? Math.random() * 1.2 + 0.6 : Math.random() * 1.8 + 1.1),
        layer: layer, // 1: distant, 2: mid, 3: close
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  spawnMeteor() {
    const startX = Math.random() * this.width * 0.8;
    const startY = Math.random() * (this.height * 0.4);
    const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // ~45 degrees downward
    const speed = Math.random() * 10 + 12;

    this.meteors.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length: Math.random() * 90 + 70,
      life: 1.0,
      decay: Math.random() * 0.025 + 0.018,
      thickness: Math.random() * 1.5 + 1.2
    });
  }

  animate() {
    // Smooth mouse parallax easing
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw deep space background gradient
    const bgGrad = this.ctx.createRadialGradient(
      this.width * 0.5, this.height * 0.3, 100,
      this.width * 0.5, this.height * 0.5, Math.max(this.width, this.height) * 0.8
    );
    bgGrad.addColorStop(0, '#0a0d1e');
    bgGrad.addColorStop(0.5, '#050713');
    bgGrad.addColorStop(1, '#020308');
    this.ctx.fillStyle = bgGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw subtle nebula dust clouds
    this.drawNebulaGlow(this.width * 0.2, this.height * 0.3, 400, 'rgba(56, 189, 248, 0.035)');
    this.drawNebulaGlow(this.width * 0.8, this.height * 0.7, 500, 'rgba(168, 85, 247, 0.03)');
    this.drawNebulaGlow(this.width * 0.5, this.height * 0.8, 350, 'rgba(236, 72, 153, 0.025)');

    // Draw stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.twinklePhase += star.twinkleSpeed;
      const currentAlpha = Math.max(0.15, Math.min(1.0, star.alpha + Math.sin(star.twinklePhase) * 0.35));

      // Parallax offset based on star layer depth
      const parallaxFactor = star.layer * 0.3;
      let drawX = star.x - this.mouse.x * parallaxFactor;
      let drawY = star.y - this.mouse.y * parallaxFactor;

      // Wrap around bounds
      if (drawX < 0) drawX += this.width;
      if (drawX > this.width) drawX -= this.width;
      if (drawY < 0) drawY += this.height;
      if (drawY > this.height) drawY -= this.height;

      this.ctx.save();
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, star.baseRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Halo on brighter foreground stars
      if (star.layer === 3 && currentAlpha > 0.7) {
        this.ctx.globalAlpha = (currentAlpha - 0.6) * 0.5;
        this.ctx.beginPath();
        this.ctx.arc(drawX, drawY, star.baseRadius * 3, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // Spawn shooting stars periodically
    const now = Date.now();
    if (now - this.lastMeteorTime > this.meteorInterval) {
      if (Math.random() < 0.6) {
        this.spawnMeteor();
      }
      this.lastMeteorTime = now;
      this.meteorInterval = 4000 + Math.random() * 7000;
    }

    // Update and draw shooting stars
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.x += m.dx;
      m.y += m.dy;
      m.life -= m.decay;

      if (m.life <= 0 || m.x > this.width || m.y > this.height) {
        this.meteors.splice(i, 1);
        continue;
      }

      this.ctx.save();
      const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
      const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

      const grad = this.ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.6, `rgba(147, 197, 253, ${m.life * 0.4})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${m.life * 0.95})`);

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = m.thickness;
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(m.x, m.y);
      this.ctx.stroke();

      // Glowing meteor head
      this.ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
      this.ctx.beginPath();
      this.ctx.arc(m.x, m.y, m.thickness * 1.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }

  drawNebulaGlow(x, y, radius, color) {
    this.ctx.save();
    const grad = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
}
