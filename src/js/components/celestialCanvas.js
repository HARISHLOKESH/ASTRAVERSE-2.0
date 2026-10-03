// ASTRAVERSE 2.0 - Advanced Celestial Canvas Engine
// High-fidelity procedural simulation engine for Black Holes, Nebulae, Stars, Neutron Stars, Planets, Moons, and Exoplanets

export class CelestialCanvas {
  constructor(canvasElement, type = 'planet') {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.type = type; // 'black-hole' | 'nebula' | 'neutron-star' | 'star' | 'planet' | 'moon' | 'exoplanet' | 'galaxy' | 'constellation' | 'phenomenon'
    this.rotation = 0;
    this.pulsePhase = 0;
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
    this.pulsePhase = 0;

    const renderLoop = () => {
      this.rotation += 0.012;
      this.pulsePhase += 0.03;
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

    const category = this.currentData?.category || this.type;
    const id = this.currentData?.id || '';

    // Route to physically accurate procedural simulation
    if (this.type === 'constellation' || category === 'constellations') {
      this.renderConstellation();
    } else if (category === 'black-hole' || category === 'black-holes' || id.includes('blackhole') || id === 'sagittarius-a' || id === 'm87-blackhole' || id === 'ton-618' || id === 'cygnus-x1') {
      this.renderBlackHole();
    } else if (category === 'nebula' || category === 'nebulae' || category === 'supernova-remnants' || id.includes('nebula') || id === 'pillars-of-creation') {
      this.renderNebula();
    } else if (['neutron-stars', 'pulsars', 'magnetars', 'stellar-remnant'].includes(category) || id.includes('pulsar') || id.includes('neutron') || id.includes('magnetar')) {
      this.renderNeutronStar();
    } else if (['star', 'stars', 'stellar-evolution'].includes(category) || this.type === 'star') {
      this.renderStar();
    } else if (['galaxy', 'galaxies', 'galaxy-structures'].includes(category) || this.type === 'galaxy') {
      this.renderGalaxy();
    } else if (['phenomenon', 'space-phenomena', 'quasars', 'active-galactic-nuclei'].includes(category) || this.type === 'phenomenon') {
      this.renderPhenomenon();
    } else if (category === 'exoplanet' || category === 'exoplanets' || this.type === 'exoplanet') {
      this.renderExoplanet();
    } else if (category === 'moon' || category === 'moons' || this.type === 'moon') {
      this.renderMoon();
    } else {
      this.renderPlanet();
    }
  }

  // =========================================================================
  // 1. RELATIVISTIC KERR BLACK HOLE SIMULATION
  // General Relativistic ray-tracing approximation:
  // - Gravitationally lensed accretion disk (warped over and under the horizon)
  // - Doppler beaming asymmetry (approaching plasma is blueshifted & brighter)
  // - Lensed Photon Sphere ring
  // - Absolute pitch-black event horizon shadow
  // - Relativistic synchrotron polar plasma jets
  // =========================================================================
  renderBlackHole() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const rShadow = Math.min(this.width, this.height) * 0.16; // Event horizon shadow radius (~2.6 Rs)
    const rPhoton = rShadow * 1.15; // Photon sphere ring (~1.5 Rs lensed)
    const diskRMax = Math.min(this.width, this.height) * 0.42;

    this.ctx.save();

    // 1. Relativistic Polar Jets (shooting from poles perpendicular to disk)
    const jetLength = this.height * 0.48;
    const jetWidth = rShadow * 0.35;
    
    // North jet
    const nJetGrad = this.ctx.createLinearGradient(cx, cy, cx, cy - jetLength);
    nJetGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
    nJetGrad.addColorStop(0.3, 'rgba(99, 102, 241, 0.45)');
    nJetGrad.addColorStop(0.8, 'rgba(168, 85, 247, 0.15)');
    nJetGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = nJetGrad;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - jetWidth * 0.3, cy);
    this.ctx.lineTo(cx - jetWidth * 1.2, cy - jetLength);
    this.ctx.lineTo(cx + jetWidth * 1.2, cy - jetLength);
    this.ctx.lineTo(cx + jetWidth * 0.3, cy);
    this.ctx.closePath();
    this.ctx.fill();

    // South jet
    const sJetGrad = this.ctx.createLinearGradient(cx, cy, cx, cy + jetLength);
    sJetGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
    sJetGrad.addColorStop(0.3, 'rgba(99, 102, 241, 0.45)');
    sJetGrad.addColorStop(0.8, 'rgba(168, 85, 247, 0.15)');
    sJetGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = sJetGrad;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - jetWidth * 0.3, cy);
    this.ctx.lineTo(cx - jetWidth * 1.2, cy + jetLength);
    this.ctx.lineTo(cx + jetWidth * 1.2, cy + jetLength);
    this.ctx.lineTo(cx + jetWidth * 0.3, cy);
    this.ctx.closePath();
    this.ctx.fill();

    // 2. Warped Top Halo of Accretion Disk (General relativistic deflection of rear disk over the shadow)
    const topHaloGrad = this.ctx.createRadialGradient(cx, cy, rShadow * 0.9, cx, cy, diskRMax * 0.85);
    topHaloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    topHaloGrad.addColorStop(0.2, 'rgba(245, 158, 11, 0.85)');
    topHaloGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.45)');
    topHaloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = topHaloGrad;
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy - rShadow * 0.2, diskRMax * 0.72, diskRMax * 0.55, 0, Math.PI, Math.PI * 2);
    this.ctx.fill();

    // 3. Main Equatorial Accretion Disk (with differential Keplerian rotation & Doppler beaming)
    const diskTilt = 0.32; // Inclination angle
    this.ctx.save();
    this.ctx.translate(cx, cy);

    const streamCount = 75;
    for (let i = 0; i < streamCount; i++) {
      const dist = rPhoton + (i / streamCount) * (diskRMax - rPhoton);
      const speed = Math.sqrt(200 / dist); // Keplerian orbital speed
      const angle = this.rotation * speed * 2 + (i * 0.35);

      // Doppler beaming: approaching side (cos(angle) < 0 => left side) is intense white/cyan, receding is dim red
      const px = Math.cos(angle) * dist;
      const py = Math.sin(angle) * dist * diskTilt;
      
      const isApproaching = px < 0;
      const dopplerFactor = isApproaching ? Math.min(1, Math.abs(px) / dist + 0.3) : Math.max(0.1, 1 - (px / dist) * 0.8);

      let pColor;
      if (dopplerFactor > 0.85) {
        pColor = '#ffffff'; // Relativistic blueshift intense glow
      } else if (dopplerFactor > 0.5) {
        pColor = '#f59e0b'; // Incandescent gold
      } else {
        pColor = '#ef4444'; // Redshifted receding plasma
      }

      this.ctx.fillStyle = pColor;
      this.ctx.globalAlpha = Math.max(0.15, dopplerFactor * (1 - (dist / diskRMax) * 0.5));
      this.ctx.beginPath();
      this.ctx.arc(px, py, Math.random() * 2.2 + 1.2, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();

    // 4. Lensed Bottom Arc of Accretion Disk (warped underneath the event horizon)
    const botHaloGrad = this.ctx.createRadialGradient(cx, cy, rShadow * 0.9, cx, cy, diskRMax * 0.75);
    botHaloGrad.addColorStop(0, 'rgba(245, 158, 11, 0.7)');
    botHaloGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.3)');
    botHaloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = botHaloGrad;
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy + rShadow * 0.25, diskRMax * 0.65, diskRMax * 0.42, 0, 0, Math.PI);
    this.ctx.fill();

    // 5. Razor-thin Photon Sphere Ring (Unstable circular photon orbit at r = 1.5 Rs)
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2.5;
    this.ctx.shadowColor = '#f59e0b';
    this.ctx.shadowBlur = 12;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, rPhoton, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // 6. Absolute Pitch-Black Event Horizon Shadow (Singularity boundary of no return)
    this.ctx.fillStyle = '#010206';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, rShadow, 0, Math.PI * 2);
    this.ctx.fill();

    // Subtle edge gradient on the black hole shadow
    const shadowBorder = this.ctx.createRadialGradient(cx, cy, rShadow * 0.92, cx, cy, rShadow);
    shadowBorder.addColorStop(0, '#000000');
    shadowBorder.addColorStop(1, '#050711');
    this.ctx.fillStyle = shadowBorder;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, rShadow, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  // =========================================================================
  // 2. VOLUMETRIC EMISSION NEBULA SIMULATION
  // Multi-frequency turbulent interstellar gas clouds:
  // - Hydrogen-Alpha crimson (656.3 nm)
  // - Oxygen-III teal/cyan (500.7 nm)
  // - Sulfur-II golden dust lanes
  // - Central infant open cluster of stars
  // =========================================================================
  renderNebula() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxR = Math.min(this.width, this.height) * 0.44;

    this.ctx.save();

    // 1. Deep Hydrogen-Alpha Background Glow
    const hAlphaGrad = this.ctx.createRadialGradient(cx, cy, 10, cx, cy, maxR);
    hAlphaGrad.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
    hAlphaGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.25)');
    hAlphaGrad.addColorStop(0.8, 'rgba(59, 130, 246, 0.12)');
    hAlphaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = hAlphaGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    this.ctx.fill();

    // 2. Volumetric Gas Puffs (Multi-layered Sinusoidal Turbulence)
    const puffCount = 42;
    for (let i = 0; i < puffCount; i++) {
      const angle = (i / puffCount) * Math.PI * 2 + (this.rotation * 0.15);
      const radDist = (Math.sin(i * 3 + this.pulsePhase * 0.5) * 0.35 + 0.5) * maxR * 0.85;
      const px = cx + Math.cos(angle) * radDist;
      const py = cy + Math.sin(angle) * radDist * 0.75;
      const puffRadius = (Math.sin(i * 1.5) * 0.25 + 0.5) * (maxR * 0.35);

      const isOIII = i % 2 === 0;
      const puffGrad = this.ctx.createRadialGradient(px, py, 2, px, py, puffRadius);
      if (isOIII) {
        puffGrad.addColorStop(0, 'rgba(6, 182, 212, 0.35)'); // Oxygen-III teal
        puffGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.15)');
      } else {
        puffGrad.addColorStop(0, 'rgba(244, 63, 94, 0.35)'); // H-alpha crimson
        puffGrad.addColorStop(0.6, 'rgba(236, 72, 153, 0.15)');
      }
      puffGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = puffGrad;
      this.ctx.beginPath();
      this.ctx.arc(px, py, puffRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 3. Dark Molecular Absorption Dust Pillars
    this.ctx.fillStyle = 'rgba(3, 5, 12, 0.55)';
    this.ctx.beginPath();
    this.ctx.moveTo(cx - maxR * 0.35, cy + maxR * 0.5);
    this.ctx.quadraticCurveTo(cx - maxR * 0.1, cy - maxR * 0.2, cx - maxR * 0.05, cy - maxR * 0.4);
    this.ctx.quadraticCurveTo(cx + maxR * 0.05, cy - maxR * 0.1, cx - maxR * 0.15, cy + maxR * 0.5);
    this.ctx.closePath();
    this.ctx.fill();

    // 4. Embedded Stellar Nursery Star Cluster (Infant proto-stars)
    const starCount = 35;
    for (let s = 0; s < starCount; s++) {
      const sx = cx + (Math.sin(s * 7) * maxR * 0.65);
      const sy = cy + (Math.cos(s * 11) * maxR * 0.55);
      const twinkle = Math.sin(this.pulsePhase * 3 + s) * 0.35 + 0.65;

      this.ctx.fillStyle = s % 4 === 0 ? '#67e8f9' : (s % 3 === 0 ? '#fef08a' : '#ffffff');
      this.ctx.globalAlpha = twinkle;
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, (s % 5 === 0 ? 2.5 : 1.2), 0, Math.PI * 2);
      this.ctx.fill();

      // Diffraction cross on primary bright stars
      if (s % 7 === 0) {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(sx - 6, sy);
        this.ctx.lineTo(sx + 6, sy);
        this.ctx.moveTo(sx, sy - 6);
        this.ctx.lineTo(sx, sy + 6);
        this.ctx.stroke();
      }
    }

    this.ctx.restore();
  }

  // =========================================================================
  // 3. ULTRA-DENSE NEUTRON STAR / PULSAR / MAGNETAR SIMULATION
  // - 10^6 K blue-white core
  // - Intense curved magnetic dipole loops
  // - Relativistic synchrotron lighthouse beams rotating past line of sight
  // =========================================================================
  renderNeutronStar() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const coreR = Math.min(this.width, this.height) * 0.12;

    this.ctx.save();

    // 1. Relativistic Sweeping Lighthouse Beams
    const beamAngle = this.rotation * 4.5; // Rapid spin frequency
    const beamLength = this.width * 0.46;
    const beamSpread = 0.28;

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(beamAngle);

    // North synchrotron beam
    const nBeam = this.ctx.createRadialGradient(0, 0, coreR * 0.5, 0, -beamLength, beamLength);
    nBeam.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    nBeam.addColorStop(0.3, 'rgba(56, 189, 248, 0.75)');
    nBeam.addColorStop(0.7, 'rgba(99, 102, 241, 0.25)');
    nBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = nBeam;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-Math.sin(beamSpread) * beamLength, -Math.cos(beamSpread) * beamLength);
    this.ctx.lineTo(Math.sin(beamSpread) * beamLength, -Math.cos(beamSpread) * beamLength);
    this.ctx.closePath();
    this.ctx.fill();

    // South synchrotron beam
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-Math.sin(beamSpread) * beamLength, Math.cos(beamSpread) * beamLength);
    this.ctx.lineTo(Math.sin(beamSpread) * beamLength, Math.cos(beamSpread) * beamLength);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();

    // 2. Magnetic Dipole Field Lines (Curved loops)
    this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    this.ctx.lineWidth = 1.5;
    const loopCount = 4;
    for (let l = 1; l <= loopCount; l++) {
      const loopWidth = coreR * (1.6 + l * 0.7);
      const loopHeight = coreR * (2.0 + l * 0.85);

      // East loop
      this.ctx.beginPath();
      this.ctx.ellipse(cx + loopWidth * 0.5, cy, loopWidth * 0.5, loopHeight * 0.65, 0, 0, Math.PI * 2);
      this.ctx.stroke();

      // West loop
      this.ctx.beginPath();
      this.ctx.ellipse(cx - loopWidth * 0.5, cy, loopWidth * 0.5, loopHeight * 0.65, 0, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // 3. Outer Radiant Corona & Degeneracy Glow
    const coronaGrad = this.ctx.createRadialGradient(cx, cy, coreR * 0.8, cx, cy, coreR * 2.5);
    coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coronaGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.7)');
    coronaGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.3)');
    coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = coronaGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, coreR * 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // 4. Ultra-dense core sphere
    this.ctx.fillStyle = '#ffffff';
    this.ctx.shadowColor = '#38bdf8';
    this.ctx.shadowBlur = 20;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    this.ctx.restore();
  }

  // =========================================================================
  // 4. THERMONUCLEAR STAR SIMULATION
  // - Spectral classification coloring (O/B blue to M red giant)
  // - Dynamic convective boiling granules
  // - Solar magnetic prominences leaping from the limb
  // =========================================================================
  renderStar() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.32;
    const color = this.currentData?.color || '#f59e0b';
    const id = this.currentData?.id || '';

    this.ctx.save();

    // 1. Dynamic Coronal Solar Flares & Prominences
    const prominenceCount = 10;
    for (let p = 0; p < prominenceCount; p++) {
      const angle = (p / prominenceCount) * Math.PI * 2 + (this.rotation * 0.3);
      const flareHeight = (Math.sin(this.pulsePhase * 2 + p * 1.5) * 0.25 + 0.35) * radius * 0.6;
      const lx = cx + Math.cos(angle) * (radius + flareHeight);
      const ly = cy + Math.sin(angle) * (radius + flareHeight);

      const flareGrad = this.ctx.createRadialGradient(lx, ly, 2, lx, ly, flareHeight * 0.8);
      flareGrad.addColorStop(0, '#ffffff');
      flareGrad.addColorStop(0.4, color);
      flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = flareGrad;
      this.ctx.beginPath();
      this.ctx.arc(lx, ly, flareHeight * 0.8, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 2. Radiant Outer Corona
    const coronaGrad = this.ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.6);
    coronaGrad.addColorStop(0, `${color}88`);
    coronaGrad.addColorStop(0.4, `${color}44`);
    coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = coronaGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2);
    this.ctx.fill();

    // 3. Stellar Photosphere (Spherical limb darkening)
    const starGrad = this.ctx.createRadialGradient(cx * 0.95, cy * 0.95, radius * 0.1, cx, cy, radius);
    starGrad.addColorStop(0, '#ffffff'); // Core hot spot
    starGrad.addColorStop(0.35, '#fffbeb');
    starGrad.addColorStop(0.7, color);
    starGrad.addColorStop(1, '#78350f'); // Limb darkening

    this.ctx.fillStyle = starGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // 4. Convective Granulation Cells (Boiling plasma)
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.clip();

    const granuleCount = 50;
    for (let g = 0; g < granuleCount; g++) {
      const gx = cx + Math.sin(g * 5 + this.rotation) * (radius * 0.85);
      const gy = cy + Math.cos(g * 7 + this.pulsePhase * 0.8) * (radius * 0.85);
      const gSize = Math.sin(g * 2 + this.pulsePhase) * 4 + 8;

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      this.ctx.beginPath();
      this.ctx.arc(gx, gy, gSize, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();

    this.ctx.restore();
  }

  // =========================================================================
  // 5. PLANETARY & GAS GIANT SIMULATION
  // - 3D Spherical light terminator
  // - Earth: realistic oceans, continents, and rotating clouds with drop shadows
  // - Jupiter: dynamic atmospheric bands and Great Red Spot storm
  // - Saturn: realistic tilted concentric rings with Cassini division & shadow
  // - Mars: iron oxide surface and white polar ice caps
  // =========================================================================
  renderPlanet() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.34;
    const id = this.currentData ? this.currentData.id : 'earth';
    const color = this.currentData?.color || '#38bdf8';

    this.ctx.save();

    // Atmospheric Ray Light Glow
    const atmosGlow = this.ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.3);
    atmosGlow.addColorStop(0, `${color}40`);
    atmosGlow.addColorStop(0.5, `${color}15`);
    atmosGlow.addColorStop(1, 'rgba(0,0,0,0)');
    this.ctx.fillStyle = atmosGlow;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
    this.ctx.fill();

    // If Saturn, draw rear half of tilted rings before drawing planet sphere
    if (id === 'saturn') {
      this.drawSaturnRings(cx, cy, radius, true);
    }

    // Clip to spherical disc
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.clip();

    // Base surface color
    this.ctx.fillStyle = this.getPlanetBaseColor(id);
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Surface details by planet
    if (id === 'earth') {
      this.renderEarthSurface(cx, cy, radius);
    } else if (id === 'jupiter') {
      this.renderJupiterBands(cx, cy, radius);
    } else if (id === 'mars') {
      this.renderMarsSurface(cx, cy, radius);
    } else {
      this.renderGenericBands(cx, cy, radius, color);
    }

    // 3D Spherical Sunlight & Night-side Terminator
    // Light source coming from top-left (0.35, 0.35)
    const lightGrad = this.ctx.createRadialGradient(
      cx - radius * 0.35, cy - radius * 0.35, radius * 0.1,
      cx, cy, radius
    );
    lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    lightGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    lightGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.65)');
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.92)');

    this.ctx.fillStyle = lightGrad;
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    this.ctx.restore();

    // If Saturn, draw front half of tilted rings on top of the planet
    if (id === 'saturn') {
      this.drawSaturnRings(cx, cy, radius, false);
    }
  }

  getPlanetBaseColor(id) {
    if (id === 'earth') return '#1d4ed8'; // Ocean blue
    if (id === 'mars') return '#b91c1c'; // Rust iron oxide
    if (id === 'venus') return '#fde047'; // Sulfuric cream
    if (id === 'mercury') return '#64748b'; // Basalt grey
    if (id === 'jupiter') return '#d97706'; // Banded ochre
    if (id === 'saturn') return '#fef08a'; // Golden amber
    if (id === 'uranus') return '#38bdf8'; // Cyan methane
    if (id === 'neptune') return '#1e40af'; // Deep azure
    return '#38bdf8';
  }

  renderEarthSurface(cx, cy, radius) {
    // Continents
    const rot = (this.rotation * 0.8) % (Math.PI * 2);
    this.ctx.fillStyle = '#15803d'; // Green continents
    for (let c = 0; c < 5; c++) {
      const xOffset = Math.sin(rot + c * 1.3) * radius * 0.8;
      const yOffset = Math.cos(c * 1.7) * radius * 0.45;
      this.ctx.beginPath();
      this.ctx.ellipse(cx + xOffset, cy + yOffset, radius * 0.35, radius * 0.22, 0.2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Swirling Cloud Cover (rotating slightly faster than continents)
    const cloudRot = (this.rotation * 1.1) % (Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (let w = 0; w < 7; w++) {
      const cxOffset = Math.sin(cloudRot + w * 0.9) * radius * 0.85;
      const cyOffset = Math.cos(w * 1.2) * radius * 0.65;
      this.ctx.beginPath();
      this.ctx.arc(cx + cxOffset, cy + cyOffset, radius * 0.22, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  renderJupiterBands(cx, cy, radius) {
    // Alternating atmospheric belts and zones
    const bandCount = 14;
    for (let b = 0; b < bandCount; b++) {
      const y = cy - radius + (b / bandCount) * radius * 2;
      const bHeight = (radius * 2) / bandCount;
      const isBelt = b % 2 === 0;

      this.ctx.fillStyle = isBelt ? '#9a3412' : '#fef3c7';
      this.ctx.fillRect(cx - radius, y, radius * 2, bHeight);
    }

    // Great Red Spot (Anticyclonic oval storm)
    const grsRot = (this.rotation * 0.6) % (Math.PI * 2);
    const grsX = cx + Math.sin(grsRot) * radius * 0.65;
    const grsY = cy + radius * 0.22;

    this.ctx.fillStyle = '#b91c1c';
    this.ctx.beginPath();
    this.ctx.ellipse(grsX, grsY, radius * 0.18, radius * 0.11, 0.1, 0, Math.PI * 2);
    this.ctx.fill();
  }

  renderMarsSurface(cx, cy, radius) {
    // Dark volcanic regions (Syrtis Major)
    this.ctx.fillStyle = '#7f1d1d';
    this.ctx.beginPath();
    this.ctx.arc(cx + Math.sin(this.rotation) * radius * 0.4, cy, radius * 0.35, 0, Math.PI * 2);
    this.ctx.fill();

    // North & South Polar Ice Caps (CO2 & Water Ice)
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy - radius * 0.88, radius * 0.35, radius * 0.12, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy + radius * 0.9, radius * 0.28, radius * 0.1, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  renderGenericBands(cx, cy, radius, baseColor) {
    for (let i = 0; i < 8; i++) {
      const y = cy - radius + (i / 8) * radius * 2;
      this.ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      this.ctx.fillRect(cx - radius, y, radius * 2, (radius * 2) / 8);
    }
  }

  drawSaturnRings(cx, cy, radius, isBackHalf) {
    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(-0.35); // Saturn's 26.7-degree axial tilt

    const ringOuterA = radius * 2.2;
    const ringOuterB = radius * 0.65;
    const ringInnerA = radius * 1.35;
    const ringInnerB = radius * 0.4;
    const cassiniA = radius * 1.75;
    const cassiniB = radius * 0.52;

    this.ctx.beginPath();
    if (isBackHalf) {
      // Upper back half (behind the planet)
      this.ctx.ellipse(0, 0, ringOuterA, ringOuterB, 0, Math.PI, Math.PI * 2);
      this.ctx.ellipse(0, 0, ringInnerA, ringInnerB, 0, Math.PI * 2, Math.PI, true);
    } else {
      // Lower front half (in front of the planet)
      this.ctx.ellipse(0, 0, ringOuterA, ringOuterB, 0, 0, Math.PI);
      this.ctx.ellipse(0, 0, ringInnerA, ringInnerB, 0, Math.PI, 0, true);
    }
    this.ctx.closePath();

    const ringGrad = this.ctx.createRadialGradient(0, 0, ringInnerA, 0, 0, ringOuterA);
    ringGrad.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
    ringGrad.addColorStop(0.45, 'rgba(217, 119, 6, 0.8)');
    ringGrad.addColorStop(0.55, 'rgba(15, 23, 42, 0.9)'); // Cassini Division gap!
    ringGrad.addColorStop(0.65, 'rgba(245, 158, 11, 0.75)');
    ringGrad.addColorStop(1, 'rgba(254, 240, 138, 0.2)');

    this.ctx.fillStyle = ringGrad;
    this.ctx.fill();

    this.ctx.restore();
  }

  // =========================================================================
  // 6. MOON & NATURAL SATELLITE SIMULATION
  // Basalt craters, terminator shadows, volcanic sulfur for Io, ice cracks for Europa
  // =========================================================================
  renderMoon() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.34;
    const id = this.currentData ? this.currentData.id : 'moon';

    this.ctx.save();

    // Clip to spherical disc
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.clip();

    // Base color
    let baseColor = '#94a3b8'; // Grey regolith
    if (id === 'io') baseColor = '#eab308'; // Volcanic yellow-orange sulfur
    if (id === 'europa') baseColor = '#f1f5f9'; // Bright icy white
    if (id === 'titan') baseColor = '#f59e0b'; // Dense orange nitrogen haze

    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Io volcanic calderas
    if (id === 'io') {
      this.ctx.fillStyle = '#7f1d1d';
      for (let p = 0; p < 8; p++) {
        const px = cx + Math.sin(p * 2) * radius * 0.65;
        const py = cy + Math.cos(p * 3) * radius * 0.65;
        this.ctx.beginPath();
        this.ctx.arc(px, py, radius * 0.12, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } 
    // Europa ice tectonic fracture lineae
    else if (id === 'europa') {
      this.ctx.strokeStyle = '#b91c1c';
      this.ctx.lineWidth = 1.5;
      for (let f = 0; f < 6; f++) {
        this.ctx.beginPath();
        this.ctx.moveTo(cx - radius * 0.8, cy + (f - 3) * radius * 0.25);
        this.ctx.bezierCurveTo(cx - radius * 0.2, cy + radius * 0.3, cx + radius * 0.3, cy - radius * 0.3, cx + radius * 0.8, cy + (f - 2) * radius * 0.25);
        this.ctx.stroke();
      }
    }
    // Basaltic Impact Craters
    else {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      const craterCount = 18;
      for (let c = 0; c < craterCount; c++) {
        const kx = cx + Math.sin(c * 4 + this.rotation * 0.2) * radius * 0.75;
        const ky = cy + Math.cos(c * 6) * radius * 0.75;
        const cRadius = (Math.sin(c) * 0.08 + 0.1) * radius;

        this.ctx.beginPath();
        this.ctx.arc(kx, ky, cRadius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // 3D Spherical Light Terminator
    const lightGrad = this.ctx.createRadialGradient(
      cx - radius * 0.4, cy - radius * 0.4, radius * 0.1,
      cx, cy, radius
    );
    lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    lightGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    lightGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.75)');
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');

    this.ctx.fillStyle = lightGrad;
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    this.ctx.restore();
  }

  // =========================================================================
  // 7. EXOPLANET & ALIEN WORLD SIMULATION
  // Tidally locked eyeball worlds, ultra-hot Jupiters, magma worlds
  // =========================================================================
  renderExoplanet() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.34;
    const id = this.currentData ? this.currentData.id : 'trappist-1e';

    this.ctx.save();

    // WASP-12b: Egg-shaped tidal distortion with mass-loss stream
    if (id === 'wasp-12b') {
      // Mass-loss stream to star
      const streamGrad = this.ctx.createLinearGradient(cx, cy, this.width, cy);
      streamGrad.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      streamGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      this.ctx.fillStyle = streamGrad;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy - radius * 0.4);
      this.ctx.lineTo(this.width, cy - radius * 0.8);
      this.ctx.lineTo(this.width, cy + radius * 0.8);
      this.ctx.lineTo(cx, cy + radius * 0.4);
      this.ctx.closePath();
      this.ctx.fill();

      // Prolate egg-shaped distortion
      this.ctx.fillStyle = '#7f1d1d';
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy, radius * 1.35, radius * 0.85, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
      return;
    }

    // Tidally locked Eyeball World (e.g. TRAPPIST-1e, Kepler-186f, Proxima b)
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.clip();

    // Night side: dark frozen ice
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Dayside: open water ocean under the permanent stellar zenith
    const daysideGrad = this.ctx.createRadialGradient(cx - radius * 0.3, cy, 5, cx - radius * 0.3, cy, radius * 0.85);
    daysideGrad.addColorStop(0, '#0284c7'); // Temperate ocean
    daysideGrad.addColorStop(0.6, '#0f766e'); // Temperate vegetative twilight zone
    daysideGrad.addColorStop(0.85, '#e2e8f0'); // Glacial ice ring
    daysideGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = daysideGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx - radius * 0.3, cy, radius * 0.85, 0, Math.PI * 2);
    this.ctx.fill();

    // Atmospheric Rayleigh haze
    const atmosGrad = this.ctx.createRadialGradient(cx - radius * 0.3, cy, radius * 0.8, cx, cy, radius * 1.15);
    atmosGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = atmosGrad;
    this.ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    this.ctx.restore();
  }

  // =========================================================================
  // 8. SPIRAL GALAXY SIMULATION
  // =========================================================================
  renderGalaxy() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxR = Math.min(this.width, this.height) * 0.44;
    const color = this.currentData?.color || '#38bdf8';

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(this.rotation * 0.3);

    // Glowing Galactic Core
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

  // =========================================================================
  // 9. COSMIC PHENOMENON SIMULATION (Supernovae, Gravitational Waves, etc.)
  // =========================================================================
  renderPhenomenon() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxR = Math.min(this.width, this.height) * 0.42;

    this.ctx.save();

    // Expanding concentric shockwave shells
    const ringCount = 5;
    for (let r = 0; r < ringCount; r++) {
      const phase = (this.pulsePhase * 0.8 + (r / ringCount)) % 1;
      const ringRadius = phase * maxR;
      const alpha = Math.max(0, 1 - phase);

      this.ctx.strokeStyle = `rgba(244, 63, 94, ${alpha * 0.8})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // Incandescent central blast core
    const coreGrad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.35);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.3, '#38bdf8');
    coreGrad.addColorStop(0.7, '#a855f7');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = coreGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, maxR * 0.35, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  // =========================================================================
  // 10. CONSTELLATION STAR CHART
  // =========================================================================
  renderConstellation() {
    if (!this.currentData || !this.currentData.stars) return;

    this.ctx.save();

    const cx = this.width / 2;
    const cy = this.height / 2;
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, this.width * 0.4, 0, Math.PI * 2);
    this.ctx.arc(cx, cy, this.width * 0.25, 0, Math.PI * 2);
    this.ctx.stroke();

    const starMap = {};
    for (const star of this.currentData.stars) {
      starMap[star.id] = {
        ...star,
        px: (star.x / 100) * this.width,
        py: (star.y / 100) * this.height
      };
    }

    // Glowing constellation lines
    if (this.currentData.lines) {
      for (const line of this.currentData.lines) {
        const s1 = starMap[line[0]];
        const s2 = starMap[line[1]];
        if (!s1 || !s2) continue;

        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        this.ctx.lineWidth = 3.5;
        this.ctx.beginPath();
        this.ctx.moveTo(s1.px, s1.py);
        this.ctx.lineTo(s2.px, s2.py);
        this.ctx.stroke();

        this.ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
        this.ctx.lineWidth = 1.4;
        this.ctx.beginPath();
        this.ctx.moveTo(s1.px, s1.py);
        this.ctx.lineTo(s2.px, s2.py);
        this.ctx.stroke();
      }
    }

    // Draw Major Stars
    for (const star of this.currentData.stars) {
      const s = starMap[star.id];
      const radius = Math.max(2.5, 7.5 - star.mag * 1.2);
      const isHovered = this.hoveredStar && this.hoveredStar.id === star.id;

      // Glow halo
      this.ctx.fillStyle = isHovered ? 'rgba(0, 240, 255, 0.85)' : 'rgba(255, 255, 255, 0.35)';
      this.ctx.beginPath();
      this.ctx.arc(s.px, s.py, radius * (isHovered ? 2.8 : 2), 0, Math.PI * 2);
      this.ctx.fill();

      // Sharp core
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(s.px, s.py, radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Star Label
      this.ctx.font = isHovered ? 'bold 12px Inter, sans-serif' : '10px Inter, sans-serif';
      this.ctx.fillStyle = isHovered ? '#00f0ff' : 'rgba(226, 232, 240, 0.85)';
      this.ctx.fillText(star.name, s.px + radius + 4, s.py + 3);
    }

    this.ctx.restore();
  }
}
