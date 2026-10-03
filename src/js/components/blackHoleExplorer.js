// ASTRAVERSE 2.0 - Dedicated Black Hole Explorer
// Interactive relativistic physics, Schwarzschild calculator, Kerr anatomy diagram, and full catalog fleet

import { blackHolesData } from '../data/blackHolesData.js';
import { getAstronomicalObject } from '../data/hierarchyData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';

export class BlackHoleExplorer {
  constructor(containerElement, onInspectObject) {
    this.container = containerElement;
    this.onInspect = onInspectObject;
    this.calcMassSolar = 4.154e6; // Default to Sgr A*
    this.selectedPart = 'event-horizon';
    this.activeFilter = 'all';
    this.render();
  }

  render() {
    const filteredList = this.getFilteredList();

    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(168, 85, 247, 0.25);">
          <span class="banner-badge" style="background: rgba(168, 85, 247, 0.15); color: var(--purple-glow); border-color: rgba(168, 85, 247, 0.3);">🕳️ Relativistic Astrophysics</span>
          <h2 class="banner-title">Black Hole Explorer</h2>
          <p class="banner-subtitle">
            Journey beyond the Event Horizon into regions where spacetime curvature is so extreme that neither matter nor light can escape.
            Explore relativistic physics, accretion disks, gravitational waves, and the landmark observations of Sagittarius A* and M87*.
          </p>
        </div>

        <!-- 2-Column Physics & Calculator Section -->
        <div class="bh-layout-grid" style="margin-bottom: 3rem;">
          <!-- Left: Relativistic Anatomy & Interactive Diagram -->
          <div class="bh-physics-card">
            <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: #fff; margin-bottom: 0.5rem;">
              Anatomy of a Kerr (Spinning) Black Hole
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
              Click any region of the relativistic diagram to inspect its physical mechanics.
            </p>

            <!-- SVG Black Hole Anatomy Diagram -->
            <div class="bh-anatomy-diagram-wrap">
              <svg viewBox="-250 -250 500 500" width="100%" height="340" style="max-width: 480px; background: #03050c; border-radius: 16px; border: 1px solid rgba(168, 85, 247, 0.2);">
                <defs>
                  <linearGradient id="jetGradTop" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
                  </linearGradient>
                  <linearGradient id="jetGradBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
                  </linearGradient>
                  <radialGradient id="bhAccretionGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="25%" stop-color="#000" stop-opacity="1"/>
                    <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.8"/>
                    <stop offset="65%" stop-color="#ef4444" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
                  </radialGradient>
                </defs>

                <!-- Relativistic Jets -->
                <polygon points="0,-10 -25,-230 25,-230" fill="url(#jetGradTop)" opacity="0.8" class="bh-part-click" data-part="relativistic-jets" style="cursor: pointer;"/>
                <polygon points="0,10 -25,230 25,230" fill="url(#jetGradBottom)" opacity="0.8" class="bh-part-click" data-part="relativistic-jets" style="cursor: pointer;"/>

                <!-- Accretion Disk (Tilted Ellipse) -->
                <ellipse cx="0" cy="0" rx="200" ry="50" fill="url(#bhAccretionGrad)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1.5" class="bh-part-click" data-part="accretion-disk" style="cursor: pointer;"/>

                <!-- ISCO (Innermost Stable Circular Orbit: r = 3 Rs) -->
                <circle cx="0" cy="0" r="105" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,4" class="bh-part-click" data-part="isco" style="cursor: pointer;"/>

                <!-- Photon Sphere (r = 1.5 Rs) -->
                <circle cx="0" cy="0" r="65" fill="none" stroke="#f59e0b" stroke-width="2" class="bh-part-click" data-part="photon-sphere" style="cursor: pointer;"/>

                <!-- Ergosphere (Oblate Sphere for Kerr BH) -->
                <ellipse cx="0" cy="0" rx="55" ry="40" fill="rgba(168, 85, 247, 0.15)" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="3,3" class="bh-part-click" data-part="ergosphere" style="cursor: pointer;"/>

                <!-- Event Horizon (Shadow: r = Rs) -->
                <circle cx="0" cy="0" r="40" fill="#000" stroke="#fff" stroke-width="2" class="bh-part-click" data-part="event-horizon" style="cursor: pointer;"/>

                <!-- Singularity (Center) -->
                <circle cx="0" cy="0" r="4" fill="#a855f7" stroke="#fff" stroke-width="1" class="bh-part-click" data-part="singularity" style="cursor: pointer;"/>

                <!-- Labels on Diagram -->
                <text x="0" y="4" fill="#fff" font-size="9" font-family="'Orbitron', sans-serif" text-anchor="middle" pointer-events="none">Singularity</text>
                <text x="0" y="-75" fill="#f59e0b" font-size="10" font-family="'Inter', sans-serif" text-anchor="middle" pointer-events="none">Photon Sphere (1.5 Rs)</text>
                <text x="0" y="-115" fill="#60a5fa" font-size="10" font-family="'Inter', sans-serif" text-anchor="middle" pointer-events="none">ISCO (3 Rs)</text>
              </svg>
            </div>

            <!-- Active Part Details Card -->
            <div id="bhPartBox" style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 1.25rem;">
              <h4 id="bhPartTitle" style="color: var(--purple-glow); font-size: 1.05rem; margin-bottom: 0.4rem;">
                ✦ Event Horizon (Schwarzschild Radius)
              </h4>
              <p id="bhPartDesc" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                The boundary of no return where escape velocity equals the speed of light. Inside this radius, all timelike paths terminate at the central singularity. For a non-rotating black hole, Rs = 2GM/c².
              </p>
            </div>
          </div>

          <!-- Right: Calculator & Relativistic Taxonomies -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Schwarzschild Radius Calculator -->
            <div class="bh-physics-card" style="padding: 1.75rem;">
              <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: #fff; margin-bottom: 0.75rem;">
                Schwarzschild Radius (Rs) Calculator
              </h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                Calculate the theoretical Event Horizon size of any mass compressed into a singularity:
                <code style="display: block; margin-top: 0.4rem; padding: 0.4rem; background: rgba(0,0,0,0.4); border-radius: 6px; color: var(--purple-glow);">Rs = 2GM / c² ≈ 2.95 km × (M / M☉)</code>
              </p>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
                <label style="font-size: 0.85rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                  <span>Mass (Solar Masses M☉):</span>
                  <span id="calcMassDisplay" style="color: #fff; font-weight: 700;">4,154,000 M☉ (Sgr A*)</span>
                </label>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <button class="bh-preset-btn" data-mass="1" data-label="1 M☉ (The Sun)">Sun (1 M☉)</button>
                  <button class="bh-preset-btn" data-mass="0.000003" data-label="1 M⊕ (Earth)">Earth (1 M⊕)</button>
                  <button class="bh-preset-btn" data-mass="21.2" data-label="21.2 M☉ (Cygnus X-1)">Cygnus X-1</button>
                  <button class="bh-preset-btn" data-mass="4154000" data-label="4.15M M☉ (Sgr A*)">Sgr A*</button>
                  <button class="bh-preset-btn" data-mass="6500000000" data-label="6.5B M☉ (M87*)">M87*</button>
                  <button class="bh-preset-btn" data-mass="66000000000" data-label="66B M☉ (TON 618)">TON 618</button>
                </div>
              </div>

              <!-- Output Display -->
              <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 1.25rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.5rem;">
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Event Horizon Radius (Rs)</span>
                    <strong id="calcRsRadius" style="color: var(--purple-glow); font-size: 1.15rem; font-family: var(--font-heading);">
                      12,254,300 km
                    </strong>
                  </div>
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Event Horizon Diameter</span>
                    <strong id="calcRsDiameter" style="color: #fff; font-size: 1.15rem; font-family: var(--font-heading);">
                      24,508,600 km (~0.16 AU)
                    </strong>
                  </div>
                </div>
                <div id="calcComparison" style="font-size: 0.8rem; color: #38bdf8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem; margin-top: 0.5rem;">
                  Roughly 17.6 times the diameter of our Sun!
                </div>
              </div>
            </div>

            <!-- Mass Classes Overview -->
            <div class="bh-physics-card" style="padding: 1.5rem;">
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 0.75rem;">
                The 3 Mass Regimes of Black Holes
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.82rem;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 0.65rem;">
                  <strong style="color: #38bdf8;">1. Stellar-Mass (3 – 100 M☉):</strong> Core collapse of massive stars. (e.g., Gaia BH1, Gaia BH3, Cygnus X-1)
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 8px; padding: 0.65rem;">
                  <strong style="color: var(--purple-glow);">2. Intermediate-Mass (100 – 100,000 M☉):</strong> Mergers in globular clusters. (e.g., GW190521 remnant 142 M☉, HLX-1)
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 8px; padding: 0.65rem;">
                  <strong style="color: var(--gold-glow);">3. Supermassive & Ultramassive (10⁶ – 10¹¹ M☉):</strong> Anchors of galaxies. (e.g., Sgr A*, M87*, TON 618)
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Black Hole Fleet Gallery Header & Filters -->
        <div style="margin-top: 2rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin: 0 0 0.35rem 0;">
                The Cosmic Fleet of Black Holes
              </h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">
                Authoritative catalog of confirmed supermassive giants, nearby stellar-mass singularities, and intermediate gravitational mergers.
              </p>
            </div>
          </div>

          <!-- Filter Pills -->
          <div class="filter-chips-wrap" style="display: flex; flex-wrap: wrap; gap: 0.5rem;" aria-label="Filter black holes by class">
            <button class="filter-chip ${this.activeFilter === 'all' ? 'active' : ''}" data-bh-filter="all">
              🕳️ All Singularity Entities (${blackHolesData.length})
            </button>
            <button class="filter-chip ${this.activeFilter === 'smbh' ? 'active' : ''}" data-bh-filter="smbh">
              🌌 Supermassive (SMBH)
            </button>
            <button class="filter-chip ${this.activeFilter === 'stellar' ? 'active' : ''}" data-bh-filter="stellar">
              ⭐ Stellar-Mass
            </button>
            <button class="filter-chip ${this.activeFilter === 'imbh' ? 'active' : ''}" data-bh-filter="imbh">
              🌀 Intermediate (IMBH)
            </button>
            <button class="filter-chip ${this.activeFilter === 'mergers' ? 'active' : ''}" data-bh-filter="mergers">
              〰️ Mergers & Engines
            </button>
          </div>
        </div>

        <!-- Fleet Grid -->
        <div class="cards-grid" id="bhCardsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
          ${filteredList.map(bh => this.renderBlackHoleCard(bh)).join('')}
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  getFilteredList() {
    if (this.activeFilter === 'all') return blackHolesData;

    return blackHolesData.filter(bh => {
      const type = (bh.type || '').toLowerCase();
      const id = bh.id.toLowerCase();

      if (this.activeFilter === 'smbh') {
        return type.includes('supermassive') || type.includes('ultramassive') || id === 'sagittarius-a' || id === 'm87-blackhole' || id === 'ton-618' || id === 'oj-287' || id === 'centaurus-a' || id === 'm106-blackhole' || id === 'holmberg-15a' || id === 'ngc-1277';
      }
      if (this.activeFilter === 'stellar') {
        return type.includes('stellar-mass') || id === 'cygnus-x1' || id === 'gaia-bh1' || id === 'gaia-bh3' || id === 'v404-cygni';
      }
      if (this.activeFilter === 'imbh') {
        return type.includes('intermediate') || id === 'gw190521' || id === 'hlx-1';
      }
      if (this.activeFilter === 'mergers') {
        return id.includes('gw') || id.includes('merger') || id === 'accretion-disks' || id === 'relativistic-jets';
      }
      return true;
    });
  }

  renderBlackHoleCard(bh) {
    const isRealObs = bh.imageMeta?.imageType === 'REAL_OBSERVATION' || bh.imageMeta?.imageType === 'SPACECRAFT_IMAGE';

    return `
      <div class="cosmic-card" data-bh-id="${bh.id}" style="cursor: pointer; display: flex; flex-direction: column; overflow: hidden; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 16px; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;">
        <div style="position: relative; width: 100%; height: 210px; overflow: hidden; background: #000;">
          <img 
            src="${bh.image}" 
            alt="${bh.name}" 
            loading="lazy" 
            style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
            onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' viewBox=\\'0 0 400 250\\'><rect fill=\\'%23000000\\' width=\\'400\\' height=\\'250\\'/><circle cx=\\'200\\' cy=\\'125\\' r=\\'50\\' fill=\\'none\\' stroke=\\'%23a855f7\\' stroke-width=\\'4\\'/><circle cx=\\'200\\' cy=\\'125\\' r=\\'30\\' fill=\\'%23000\\'/><text fill=\\'%23fff\\' font-family=\\'sans-serif\\' font-size=\\'15\\' x=\\'50%\\' y=\\'80%\\' text-anchor=\\'middle\\'>${bh.name}</text></svg>';"
          />
          <span class="image-type-badge ${isRealObs ? 'badge-real-obs' : 'badge-artist-concept'}" style="position: absolute; top: 0.75rem; right: 0.75rem;">
            ${isRealObs ? '📷 Real Observation' : '🎨 Scientific Visualization'}
          </span>
          <span style="position: absolute; bottom: 0.75rem; left: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.72rem; font-weight: 700; background: rgba(0,0,0,0.8); color: var(--purple-glow); border: 1px solid rgba(168, 85, 247, 0.4); backdrop-filter: blur(4px);">
            ${bh.type}
          </span>
        </div>

        <div style="padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; margin: 0; line-height: 1.3;">
              ${bh.name}
            </h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap;">
              ${bh.constellation || (bh.parentName ? bh.parentName.split(' ')[0] : 'Cosmos')}
            </span>
          </div>

          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex-grow: 1;">
            ${bh.tagline || bh.subtitle || bh.description}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; padding: 0.75rem; background: rgba(255, 255, 255, 0.03); border-radius: 10px; margin-bottom: 1rem; font-size: 0.76rem;">
            <div>
              <span style="color: var(--text-muted); display: block;">Mass:</span>
              <strong style="color: var(--gold-glow);">${bh.massRelative || bh.mass || 'N/A'}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Distance:</span>
              <strong style="color: #38bdf8;">${bh.distance || 'N/A'}</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; pt-2;">
            <span style="font-size: 0.7rem; color: var(--text-muted);">
              🔭 ${bh.missions ? bh.missions[0] : 'EHT / Telescope'}
            </span>
            <button class="btn-explore" style="padding: 0.45rem 0.9rem; font-size: 0.8rem; font-weight: 600; border-color: rgba(168, 85, 247, 0.4);">
              Inspect ↗
            </button>
          </div>
        </div>
      </div>
    `;
  }

  initEventListeners() {
    // Filter chip clicks
    const filterChips = this.container.querySelectorAll('[data-bh-filter]');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        audioEngine.playChime(460, 'sine', 0.04, 0.2);
        this.activeFilter = chip.dataset.bhFilter;
        this.render();
      });
    });

    // Card click -> inspect
    const cards = this.container.querySelectorAll('[data-bh-id]');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.bhId;
        const bh = blackHolesData.find(b => b.id === id) || getAstronomicalObject(id);
        if (bh && this.onInspect) {
          audioEngine.playChime(620, 'triangle', 0.05, 0.3);
          this.onInspect(bh);
        }
      });
    });

    // Clickable diagram parts
    const parts = this.container.querySelectorAll('.bh-part-click');
    const partTitle = this.container.querySelector('#bhPartTitle');
    const partDesc = this.container.querySelector('#bhPartDesc');

    const partInfo = {
      'event-horizon': {
        title: "✦ Event Horizon (Schwarzschild Radius)",
        desc: "The boundary of no return where escape velocity equals the speed of light. Inside this radius, all timelike paths terminate at the central singularity. For a non-rotating black hole, Rs = 2GM/c²."
      },
      'singularity': {
        title: "✦ Gravitational Singularity",
        desc: "The zero-volume point of infinite spacetime curvature at the exact center. In a spinning Kerr black hole, the singularity forms a one-dimensional ring rather than a point."
      },
      'photon-sphere': {
        title: "✦ Photon Sphere (r = 1.5 Rs)",
        desc: "The unstable circular orbit where gravity bends photons into a complete 360-degree orbit. Any photon deflected inward falls into the horizon; any deflected outward escapes to infinity."
      },
      'ergosphere': {
        title: "✦ Ergosphere (Kerr Metric)",
        desc: "The oblate region outside the event horizon where spacetime itself is dragged in the direction of the black hole's rotation (frame dragging / Lense-Thirring effect). Energy can be extracted here via the Penrose process."
      },
      'isco': {
        title: "✦ Innermost Stable Circular Orbit (ISCO)",
        desc: "The closest distance (r = 3 Rs for Schwarzschild) that matter in an accretion disk can orbit stably. Beyond the ISCO, gas plunges dynamically into the event horizon."
      },
      'accretion-disk': {
        title: "✦ Relativistic Accretion Disk",
        desc: "Superheated plasma spiraling into the black hole at up to 30% the speed of light. Viscous shear heating converts gravitational potential energy into brilliant X-ray and UV radiation with up to 42% mass-to-energy efficiency."
      },
      'relativistic-jets': {
        title: "✦ Relativistic Synchrotron Jets",
        desc: "Collimated beams of relativistic electrons and positrons propelled along the spin axis at 99%+ the speed of light, powered by the Blandford-Znajek mechanism extracting rotational energy from the hole."
      }
    };

    parts.forEach(part => {
      part.addEventListener('click', (e) => {
        e.stopPropagation();
        const pKey = part.dataset.part;
        if (partInfo[pKey]) {
          audioEngine.playChime(520, 'sine', 0.05, 0.2);
          if (partTitle) partTitle.textContent = partInfo[pKey].title;
          if (partDesc) partDesc.textContent = partInfo[pKey].desc;
        }
      });
    });

    // Preset Buttons for Calculator
    const presetButtons = this.container.querySelectorAll('.bh-preset-btn');
    const calcMassDisplay = this.container.querySelector('#calcMassDisplay');
    const calcRsRadius = this.container.querySelector('#calcRsRadius');
    const calcRsDiameter = this.container.querySelector('#calcRsDiameter');
    const calcComparison = this.container.querySelector('#calcComparison');

    const updateCalculator = (massSolar, label) => {
      this.calcMassSolar = massSolar;
      if (calcMassDisplay) calcMassDisplay.textContent = label;

      const rsKm = 2.953 * massSolar;
      const diamKm = rsKm * 2;

      let radiusStr = rsKm < 1 ? `${(rsKm * 1000).toFixed(1)} meters` : `${rsKm.toLocaleString('en-US', { maximumFractionDigits: 1 })} km`;
      let diamStr = diamKm < 1 ? `${(diamKm * 1000).toFixed(1)} meters` : `${diamKm.toLocaleString('en-US', { maximumFractionDigits: 1 })} km`;

      if (diamKm > 1.496e8) {
        diamStr += ` (~${(diamKm / 1.496e8).toFixed(2)} AU)`;
      }

      if (calcRsRadius) calcRsRadius.textContent = radiusStr;
      if (calcRsDiameter) calcRsDiameter.textContent = diamStr;

      if (calcComparison) {
        if (massSolar === 0.000003) {
          calcComparison.textContent = "Earth compressed into a black hole would be the size of a coin (~1.8 cm across)!";
        } else if (massSolar === 1) {
          calcComparison.textContent = "The Sun compressed into a black hole would measure just 5.9 km across — fitting comfortably inside Manhattan.";
        } else if (massSolar >= 6.5e9) {
          calcComparison.textContent = "Larger than the entire Solar System — Pluto's orbit would be swallowed completely!";
        } else if (massSolar >= 4e6) {
          calcComparison.textContent = "Roughly 17.6 times the diameter of our Sun, but holds 4.15 million times its mass!";
        } else {
          calcComparison.textContent = `A stellar-mass event horizon spanning roughly ${diamStr}.`;
        }
      }
    };

    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        audioEngine.playChime(600, 'sine', 0.04, 0.25);
        const mass = parseFloat(btn.dataset.mass);
        const label = btn.dataset.label;
        updateCalculator(mass, label);
      });
    });
  }
}
