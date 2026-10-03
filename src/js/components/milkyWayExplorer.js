// ASTRAVERSE 2.0 - Dedicated Milky Way Explorer
// Interactive visual galactic map, spiral structure, Solar System location, and scientific breakdown

import { getAstronomicalObject } from '../data/hierarchyData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';

export class MilkyWayExplorer {
  constructor(containerElement, onInspectObject) {
    this.container = containerElement;
    this.onInspect = onInspectObject;
    this.selectedPoi = 'solar-system';
    this.activeTab = 'structure';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(0, 240, 255, 0.2);">
          <span class="banner-badge">🌌 Galactic Observatory</span>
          <h2 class="banner-title">The Milky Way Galaxy</h2>
          <p class="banner-subtitle">
            Our cosmic sanctuary in the Local Group: a barred spiral galaxy spanning over 100,000 light-years,
            hosting 100–400 billion stars, and rotating around the supermassive black hole Sagittarius A*.
          </p>
        </div>

        <!-- Interactive Layout Grid -->
        <div class="mw-grid-layout">
          <!-- Left: Interactive Galactic Map Diagram -->
          <div class="mw-diagram-card">
            <div class="mw-diagram-header">
              <h3 class="mw-diagram-title">Interactive Galactic Map</h3>
              <span class="banner-badge" style="margin: 0; font-size: 0.7rem;">Face-On Schematic</span>
            </div>

            <!-- SVG Galactic Map -->
            <div style="position: relative; width: 100%; aspect-ratio: 1; max-width: 580px; margin: 0 auto;">
              <svg viewBox="-300 -300 600 600" width="100%" height="100%" style="border-radius: 16px; background: #03050c; border: 1px solid rgba(255,255,255,0.08);">
                <defs>
                  <!-- Central Core Glow -->
                  <radialGradient id="mwCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
                    <stop offset="15%" stop-color="#ffd700" stop-opacity="0.9"/>
                    <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                  </radialGradient>

                  <!-- Dark Matter Halo Gradient -->
                  <radialGradient id="mwHaloGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#6366f1" stop-opacity="0.08"/>
                    <stop offset="70%" stop-color="#3b82f6" stop-opacity="0.03"/>
                    <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                  </radialGradient>
                </defs>

                <!-- Dark Matter Halo -->
                <circle cx="0" cy="0" r="280" fill="url(#mwHaloGlow)"/>

                <!-- Distance Scale Rings (10k, 25k, 50k ly) -->
                <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.1)" stroke-dasharray="3,3"/>
                <text x="5" y="-65" fill="#64748b" font-size="10" font-family="'Inter', sans-serif">10,000 ly</text>

                <circle cx="0" cy="0" r="150" fill="none" stroke="rgba(0, 240, 255, 0.25)" stroke-dasharray="4,4"/>
                <text x="5" y="-155" fill="var(--cyan-glow)" font-size="10" font-family="'Inter', sans-serif">Solar Orbit (~26,600 ly)</text>

                <circle cx="0" cy="0" r="240" fill="none" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3"/>
                <text x="5" y="-245" fill="#64748b" font-size="10" font-family="'Inter', sans-serif">50,000 ly (Galactic Rim)</text>

                <!-- Spiral Arms (Mathematically plotted logarithmic spirals) -->
                <!-- 1. Perseus Arm (Blue) -->
                <path d="M 0 0 C 40 -20, 80 -80, 70 -160 C 60 -210, -10 -250, -90 -240 C -170 -230, -230 -160, -220 -80" 
                      fill="none" stroke="#3b82f6" stroke-width="12" stroke-linecap="round" opacity="0.35" filter="blur(3px)"/>
                <path d="M 0 0 C 40 -20, 80 -80, 70 -160 C 60 -210, -10 -250, -90 -240 C -170 -230, -230 -160, -220 -80" 
                      fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" opacity="0.8"/>

                <!-- 2. Scutum-Centaurus Arm (Purple) -->
                <path d="M 0 0 C -40 20, -80 80, -70 160 C -60 210, 10 250, 90 240 C 170 230, 230 160, 220 80" 
                      fill="none" stroke="#a855f7" stroke-width="12" stroke-linecap="round" opacity="0.35" filter="blur(3px)"/>
                <path d="M 0 0 C -40 20, -80 80, -70 160 C -60 210, 10 250, 90 240 C 170 230, 230 160, 220 80" 
                      fill="none" stroke="#c084fc" stroke-width="3" stroke-linecap="round" opacity="0.8"/>

                <!-- 3. Sagittarius Arm (Orange) -->
                <path d="M 0 0 C -30 -30, -80 -40, -130 -10 C -180 20, -190 100, -160 160 C -120 220, -30 250, 40 240" 
                      fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round" opacity="0.3" filter="blur(3px)"/>
                <path d="M 0 0 C -30 -30, -80 -40, -130 -10 C -180 20, -190 100, -160 160 C -120 220, -30 250, 40 240" 
                      fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>

                <!-- 4. Orion-Cygnus Spur (Cyan Highlight) -->
                <path d="M -80 -120 C -40 -140, 20 -150, 60 -145" 
                      fill="none" stroke="var(--cyan-glow)" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
                <path d="M -80 -120 C -40 -140, 20 -150, 60 -145" 
                      fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.9"/>

                <!-- Galactic Central Bar & Bulge -->
                <ellipse cx="0" cy="0" rx="45" ry="18" transform="rotate(-30)" fill="#ffd700" opacity="0.4" filter="blur(2px)"/>
                <circle cx="0" cy="0" r="30" fill="url(#mwCoreGlow)"/>

                <!-- Interactive Points of Interest (POIs) -->
                <!-- Galactic Center (Sgr A*) -->
                <g class="mw-poi-marker" data-id="sagittarius-a" transform="translate(0, 0)">
                  <circle cx="0" cy="0" r="8" fill="#a855f7" stroke="#fff" stroke-width="2"/>
                  <text x="12" y="4" fill="#f8fafc" font-size="11" font-weight="700" font-family="'Orbitron', sans-serif">Sgr A* (Center)</text>
                </g>

                <!-- Solar System (Orion Spur) -->
                <g class="mw-poi-marker active" data-id="solar-system" transform="translate(10, -148)">
                  <circle cx="0" cy="0" r="16" fill="none" stroke="var(--cyan-glow)" stroke-width="1.5" opacity="0.7">
                    <animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="0" cy="0" r="7" fill="#00f0ff" stroke="#fff" stroke-width="2"/>
                  <text x="12" y="4" fill="var(--cyan-glow)" font-size="11" font-weight="700" font-family="'Orbitron', sans-serif">☉ Solar System</text>
                </g>

                <!-- Orion Nebula -->
                <g class="mw-poi-marker" data-id="orion-nebula" transform="translate(25, -140)">
                  <circle cx="0" cy="0" r="5" fill="#ec4899" stroke="#fff" stroke-width="1"/>
                  <text x="9" y="3" fill="#f472b6" font-size="9" font-family="'Inter', sans-serif">Orion Nebula</text>
                </g>

                <!-- Carina Nebula -->
                <g class="mw-poi-marker" data-id="carina-nebula" transform="translate(-60, -90)">
                  <circle cx="0" cy="0" r="5" fill="#f59e0b" stroke="#fff" stroke-width="1"/>
                  <text x="9" y="3" fill="#fbbf24" font-size="9" font-family="'Inter', sans-serif">Carina Nebula</text>
                </g>

                <!-- Crab Nebula Remnant -->
                <g class="mw-poi-marker" data-id="crab-nebula" transform="translate(45, -170)">
                  <circle cx="0" cy="0" r="5" fill="#10b981" stroke="#fff" stroke-width="1"/>
                  <text x="9" y="3" fill="#6ee7b7" font-size="9" font-family="'Inter', sans-serif">Crab Nebula</text>
                </g>
              </svg>
            </div>

            <!-- Legend Pills -->
            <div class="mw-legend-pills">
              <span class="mw-legend-pill"><span class="mw-legend-dot" style="background:#38bdf8;"></span> Perseus Arm</span>
              <span class="mw-legend-pill"><span class="mw-legend-dot" style="background:#c084fc;"></span> Scutum-Centaurus Arm</span>
              <span class="mw-legend-pill"><span class="mw-legend-dot" style="background:#fbbf24;"></span> Sagittarius Arm</span>
              <span class="mw-legend-pill"><span class="mw-legend-dot" style="background:var(--cyan-glow);"></span> Orion Spur (Sun's Home)</span>
              <span class="mw-legend-pill"><span class="mw-legend-dot" style="background:#a855f7;"></span> Sgr A* Core</span>
            </div>
          </div>

          <!-- Right: Scientific Details & Interactive Panels -->
          <div class="mw-info-card">
            <div class="mw-tabs-bar">
              <button class="mw-tab-btn active" data-tab="structure">Structure & Disk</button>
              <button class="mw-tab-btn" data-tab="solarsystem">Our Solar Location</button>
              <button class="mw-tab-btn" data-tab="rotation">Galactic Dynamics</button>
              <button class="mw-tab-btn" data-tab="satellites">Satellites & Destiny</button>
            </div>

            <!-- Panel 1: Structure -->
            <div class="mw-detail-panel active" id="mw-panel-structure">
              <div class="mw-poi-highlight-box" id="mwPoiBox">
                <h4 class="mw-poi-highlight-title" id="mwPoiTitle">☉ Selected: Solar System (Orion-Cygnus Spur)</h4>
                <p id="mwPoiDesc" style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
                  Located approximately 26,600 light-years (8.18 kpc) from the Galactic Center, our Solar System
                  orbits on the inner edge of the Orion-Cygnus Spur between the Sagittarius and Perseus arms.
                </p>
                <button class="btn-read-knowledge" id="btnInspectPoi" style="margin-top: 0.75rem;">Inspect Celestial Entity ↗</button>
              </div>

              <div>
                <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.5rem;">Anatomy of the Milky Way</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                  The Milky Way is classified as a barred spiral galaxy (SBbc). It consists of five major morphological zones:
                </p>
                <ul style="list-style: none; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                  <li style="font-size: 0.85rem; color: var(--text-secondary);"><strong style="color: #fff;">1. Central Bar & Bulge:</strong> A peanut-shaped bar of ancient stars spanning 27,000 light-years, anchoring Sagittarius A*.</li>
                  <li style="font-size: 0.85rem; color: var(--text-secondary);"><strong style="color: #fff;">2. Thin Disk:</strong> A 1,000-light-year-thick disk housing 85% of the galaxy's stars, gas, and active star-forming dust lanes.</li>
                  <li style="font-size: 0.85rem; color: var(--text-secondary);"><strong style="color: #fff;">3. Thick Disk:</strong> An older, 3,000-light-year-thick stellar component with lower heavy-element metallicity.</li>
                  <li style="font-size: 0.85rem; color: var(--text-secondary);"><strong style="color: #fff;">4. Stellar Halo:</strong> A spherical swarm of over 150 ancient globular clusters containing the oldest stars in the universe.</li>
                  <li style="font-size: 0.85rem; color: var(--text-secondary);"><strong style="color: #fff;">5. Dark Matter Halo:</strong> An invisible, massive halo extending out to at least 300 kiloparsecs, comprising 90% of the total gravitational mass.</li>
                </ul>
              </div>
            </div>

            <!-- Panel 2: Solar Location -->
            <div class="mw-detail-panel" id="mw-panel-solarsystem">
              <h4 style="font-size: 1.1rem; color: #fff;">Our Place in the Galaxy</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                The Sun sits approximately 26,670 ± 40 light-years from the galactic core, currently positioned about 55 light-years above the exact galactic mid-plane.
                We reside within the Orion-Cygnus Spur, a bridge of stars and gas linking the major Sagittarius and Perseus spiral arms.
              </p>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: var(--text-muted);">Distance to Center:</span><strong style="color: #fff;">26,670 ly (8.18 kpc)</strong></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: var(--text-muted);">Galactic Orbital Velocity:</span><strong style="color: var(--cyan-glow);">~220 km/s (~492,000 mph)</strong></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: var(--text-muted);">Galactic Year (Period):</span><strong style="color: #fff;">230 Million Earth Years</strong></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: var(--text-muted);">Total Orbits since Solar Birth:</span><strong style="color: #fff;">Roughly 20 Cosmic Years</strong></div>
              </div>
            </div>

            <!-- Panel 3: Galactic Dynamics -->
            <div class="mw-detail-panel" id="mw-panel-rotation">
              <h4 style="font-size: 1.1rem; color: #fff;">Differential Rotation & Dark Matter</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                According to Newtonian gravity, stars orbiting far from the galactic center should move much slower than inner stars (similar to outer planets in the Solar System).
                However, measurements of the 21-cm hydrogen line reveal a 'flat rotation curve': outer stars maintain a constant velocity of ~220 km/s out to the observable edge.
              </p>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                This flat rotation curve proved the existence of an immense spherical Dark Matter Halo weighing 1.5 × 10¹² solar masses, anchoring the galaxy against rotational centrifugal disruption.
              </p>
            </div>

            <!-- Panel 4: Satellites & Destiny -->
            <div class="mw-detail-panel" id="mw-panel-satellites">
              <h4 style="font-size: 1.1rem; color: #fff;">Milky Way Satellites & The Great Collision</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                The Milky Way reigns as the second-largest member of the Local Group, surrounded by a swarm of over 50 dwarf satellite galaxies, including the Large and Small Magellanic Clouds, Sagittarius Dwarf Spheroidal, Fornax, and Sculptor.
              </p>
              <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; padding: 1.25rem;">
                <h5 style="color: #fca5a5; font-size: 0.95rem; margin-bottom: 0.4rem;">💥 Future Collision with Andromeda (M31)</h5>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                  Andromeda and the Milky Way are approaching each other at ~110 km/s. In approximately 4.5 billion years,
                  the two giants will collide and merge, transforming their spiral disks into an immense giant elliptical galaxy dubbed 'Milkomeda'.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  initEventListeners() {
    // POI Clicks
    const markers = this.container.querySelectorAll('.mw-poi-marker');
    const poiTitle = this.container.querySelector('#mwPoiTitle');
    const poiDesc = this.container.querySelector('#mwPoiDesc');
    const btnInspect = this.container.querySelector('#btnInspectPoi');

    const poiData = {
      'solar-system': {
        title: "☉ Solar System (Orion-Cygnus Spur)",
        desc: "Located approximately 26,600 light-years (8.18 kpc) from the Galactic Center, our Solar System orbits on the inner edge of the Orion-Cygnus Spur between the Sagittarius and Perseus arms.",
        id: "solar-system"
      },
      'sagittarius-a': {
        title: "🕳️ Sagittarius A* (Galactic Center)",
        desc: "A supermassive black hole containing 4.15 million solar masses. Direct EHT imaging in 2022 confirmed its glowing accretion shadow at the exact dynamical heart of the Milky Way.",
        id: "sagittarius-a"
      },
      'orion-nebula': {
        title: "🌫️ Orion Nebula (M42)",
        desc: "The closest massive stellar nursery to Earth (1,344 ly), located directly along our local Orion Spur where hundreds of protoplanetary disks and new stars are actively condensing.",
        id: "orion-nebula"
      },
      'carina-nebula': {
        title: "✨ Carina Nebula (NGC 3372)",
        desc: "A colossal starburst engine in the Sagittarius Arm (~7,500 ly), hosting the hypergiant Eta Carinae and JWST's iconic 'Cosmic Cliffs'.",
        id: "carina-nebula"
      },
      'crab-nebula': {
        title: "⚡ Crab Nebula (Supernova Remnant M1)",
        desc: "Expanding at 1,500 km/s in the Perseus Arm (~6,500 ly), powered by the rapidly rotating Crab Pulsar (spinning 30 times a second).",
        id: "crab-nebula"
      }
    };

    markers.forEach(m => {
      m.addEventListener('click', () => {
        markers.forEach(mk => mk.classList.remove('active'));
        m.classList.add('active');
        const id = m.dataset.id;
        this.selectedPoi = id;
        audioEngine.playChime(520, 'sine', 0.04, 0.2);

        if (poiData[id]) {
          poiTitle.textContent = poiData[id].title;
          poiDesc.textContent = poiData[id].desc;
        }

        // Switch to structure tab so box is visible
        this.switchTab('structure');
      });
    });

    btnInspect.addEventListener('click', () => {
      if (this.onInspect && this.selectedPoi) {
        const obj = getAstronomicalObject(this.selectedPoi);
        if (obj) this.onInspect(obj);
      }
    });

    // Tab switching
    const tabBtns = this.container.querySelectorAll('.mw-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    const tabBtns = this.container.querySelectorAll('.mw-tab-btn');
    const panels = this.container.querySelectorAll('.mw-detail-panel');

    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    panels.forEach(p => p.classList.toggle('active', p.id === `mw-panel-${tabId}`));
  }
}
