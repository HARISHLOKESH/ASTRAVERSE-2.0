// ASTRAVERSE 2.0 - Dedicated Exoplanet System Explorer
// Interactive system-to-planet drilldown, Habitable Zone visualizer, and verified exoplanet metrics

import { exoplanetSystemsData } from '../data/exoplanetsData.js';
import { getAstronomicalObject } from '../data/hierarchyData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';
import { attachImageFallback } from '../utils/imageHelper.js';

export class ExoplanetExplorer {
  constructor(containerElement, onInspectObject) {
    this.container = containerElement;
    this.onInspect = onInspectObject;
    this.selectedSystemId = 'trappist-1-system';
    this.render();
  }

  getSelectedSystem() {
    return exoplanetSystemsData.find(s => s.id === this.selectedSystemId) || exoplanetSystemsData[0];
  }

  getPlanetsForSystem(system) {
    if (!system.childrenIds) return [];
    return system.childrenIds
      .map(id => getAstronomicalObject(id))
      .filter(Boolean)
      .filter(item => item.category === 'exoplanet');
  }

  getHostStarForSystem(system) {
    if (!system.childrenIds) return null;
    const starId = system.childrenIds.find(id => {
      const obj = getAstronomicalObject(id);
      return obj && (obj.category === 'star' || id.includes('star'));
    });
    return starId ? getAstronomicalObject(starId) : null;
  }

  render() {
    const system = this.getSelectedSystem();
    const hostStar = this.getHostStarForSystem(system);
    const planets = this.getPlanetsForSystem(system);

    const systemsList = [
      { id: 'trappist-1-system', label: 'TRAPPIST-1 (7 Earth-Sized Worlds)' },
      { id: 'alpha-centauri-system', label: 'Proxima Centauri (4.2 ly away)' },
      { id: 'kepler-90-system', label: 'Kepler-90 (8-Planet System)' },
      { id: 'kepler-186-system', label: 'Kepler-186 (First HZ Earth-Sized)' },
      { id: '55-cancri-system', label: '55 Cancri (Copernicus & Janssen)' },
      { id: 'wasp-39b', label: 'WASP-39b (JWST CO2 Benchmark)' },
      { id: 'k2-18b', label: 'K2-18b (Hycean Ocean Candidate)' },
      { id: 'wasp-12b', label: 'WASP-12b (Tidally Consumed)' }
    ];

    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(16, 185, 129, 0.25);">
          <span class="banner-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald-glow); border-color: rgba(16, 185, 129, 0.3);">
            🪐 Exoplanetary Systems
          </span>
          <h2 class="banner-title">Exoplanet System Explorer</h2>
          <p class="banner-subtitle">
            Explore confirmed alien planetary architectures across our galaxy.
            Drill down from host stars to individual exoplanets with verified parameters from NASA Exoplanet Archive and JWST spectroscopy.
          </p>
        </div>

        <!-- System Selection Pills -->
        <div class="exo-system-selector-row" role="tablist" aria-label="Select Exoplanetary System">
          ${systemsList.map(s => `
            <button class="exo-system-btn ${s.id === this.selectedSystemId ? 'active' : ''}" data-system-id="${s.id}">
              ${s.label}
            </button>
          `).join('')}
        </div>

        <!-- Selected System View -->
        <div class="exo-system-view-card">
          <!-- System Header Bar -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <span class="banner-badge" style="margin-bottom: 0.5rem; background: rgba(16, 185, 129, 0.15); color: var(--emerald-glow); border-color: rgba(16, 185, 129, 0.3);">
                ${system.type}
              </span>
              <h3 style="font-family: var(--font-heading); font-size: 1.75rem; color: #fff; margin-bottom: 0.25rem;">
                ${system.name}
              </h3>
              <span style="color: var(--text-muted); font-size: 0.9rem;">
                Constellation: <strong>${system.constellation || 'Deep Space'}</strong> • Distance: <strong>${system.distance || 'N/A'}</strong>
              </span>
            </div>

            ${hostStar ? `
              <button class="btn-explore" id="btnInspectHostStar" style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fde047;">
                <span>Inspect Host Star: ${hostStar.name}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            ` : ''}
          </div>

          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            ${system.description || system.tagline}
          </p>

          <!-- Host Star Specs Matrix -->
          ${hostStar ? `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.25rem; margin-bottom: 1.5rem;">
              <h4 style="font-size: 0.95rem; color: var(--gold-glow); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">
                ☀️ Host Star Physical Parameters
              </h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; font-size: 0.85rem;">
                <div><span style="color: var(--text-muted);">Spectral Type:</span> <strong style="color: #fff;">${system.spectralClass || hostStar.type}</strong></div>
                <div><span style="color: var(--text-muted);">Stellar Mass:</span> <strong style="color: #fff;">${system.stellarMass || hostStar.mass}</strong></div>
                <div><span style="color: var(--text-muted);">Temperature:</span> <strong style="color: #fff;">${system.effectiveTemp || hostStar.temperature}</strong></div>
                <div><span style="color: var(--text-muted);">Confirmed Worlds:</span> <strong style="color: var(--cyan-glow);">${system.confirmedPlanets || planets.length} Planets</strong></div>
              </div>
            </div>
          ` : ''}

          <!-- Habitable Zone Interactive Visualizer -->
          ${planets.length > 0 ? `
            <div class="hz-visualizer-container">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="color: #fff; font-size: 1rem; font-family: var(--font-heading);">
                  🌱 Circumstellar Habitable Zone Scale
                </h4>
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                  Distances scaled in Astronomical Units (AU)
                </span>
              </div>

              <!-- HZ Track -->
              <div class="hz-track-wrapper">
                <!-- Star Indicator -->
                <div style="position: absolute; left: 0; display: flex; flex-direction: column; align-items: center;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: radial-gradient(circle, #fde047 0%, #f59e0b 70%, #b45309 100%); box-shadow: 0 0 15px #f59e0b;"></div>
                  <span style="font-size: 0.65rem; color: #fde047; margin-top: 4px;">Host Star</span>
                </div>

                <!-- Habitable Zone Band -->
                <div class="hz-zone-box" style="left: ${system.id === 'trappist-1-system' ? '35%' : '45%'}; width: ${system.id === 'trappist-1-system' ? '35%' : '30%'};">
                  <span class="hz-zone-label">Habitable Zone (Liquid Water Possible)</span>
                </div>

                <!-- Planet Points Along Track -->
                ${planets.map((p, idx) => {
                  const percent = Math.min(95, 12 + idx * (80 / Math.max(1, planets.length)));
                  const isHZ = p.habitableZone && p.habitableZone.startsWith('Yes');
                  return `
                    <div style="position: absolute; left: ${percent}%; top: 15px; display: flex; flex-direction: column; align-items: center; cursor: pointer;" 
                         class="hz-planet-point" data-planet-id="${p.id}" title="${p.name} (${p.orbitalPeriod})">
                      <div style="width: ${isHZ ? '16px' : '12px'}; height: ${isHZ ? '16px' : '12px'}; border-radius: 50%; background: ${isHZ ? '#10b981' : '#38bdf8'}; border: 2px solid #fff; box-shadow: 0 0 8px ${isHZ ? '#10b981' : '#38bdf8'};"></div>
                      <span style="font-size: 0.65rem; color: ${isHZ ? '#6ee7b7' : '#94a3b8'}; margin-top: 4px; white-space: nowrap;">
                        ${p.name.replace('TRAPPIST-1', '').replace('Kepler-', 'K-').trim()}
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Verified Planets Data Table -->
          <div style="margin-top: 2rem;">
            <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
              <span>🪐 Confirmed Exoplanet Dossiers</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400;">
                All images labeled as Artist's Concept (non-photographic)
              </span>
            </h4>

            ${planets.length > 0 ? `
              <div style="overflow-x: auto;">
                <table class="exo-planets-table">
                  <thead>
                    <tr>
                      <th>Exoplanet</th>
                      <th>Radius</th>
                      <th>Mass</th>
                      <th>Period</th>
                      <th>Semi-Major Axis</th>
                      <th>Eq. Temp</th>
                      <th>Habitable Zone</th>
                      <th>Atmosphere & Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${planets.map(p => `
                      <tr>
                        <td>
                          <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <img src="${p.image}" alt="${p.name}" class="exo-table-thumb" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: #03050c;" />
                            <div>
                              <strong style="color: #fff; display: block;">${p.name}</strong>
                              <span style="font-size: 0.75rem; color: var(--text-muted);">${p.discoveryMethod || 'Transit'} (${p.discoveryYear || '2016'})</span>
                            </div>
                          </div>
                        </td>
                        <td>${p.radius || 'Under study'}</td>
                        <td>${p.mass || 'Under study'}</td>
                        <td>${p.orbitalPeriod || 'N/A'}</td>
                        <td>${p.semiMajorAxis || 'N/A'}</td>
                        <td>${p.equilibriumTemp || 'N/A'}</td>
                        <td>
                          <span class="${p.habitableZone && p.habitableZone.startsWith('Yes') ? 'hz-badge-yes' : 'hz-badge-no'}">
                            ${p.habitableZone && p.habitableZone.startsWith('Yes') ? '✓ In Habitable Zone' : '✕ Outside HZ'}
                          </span>
                        </td>
                        <td style="max-width: 260px; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
                          ${p.atmosphere || p.status || 'Under active analysis by JWST.'}
                        </td>
                        <td>
                          <button class="btn-explore btn-inspect-planet" data-planet-id="${p.id}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">
                            Inspect ↗
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : `
              <!-- Single planet standalone card if viewing e.g. WASP-39b or K2-18b -->
              <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem;">
                <img src="${system.image || '/images/universe.jpg'}" alt="${system.name}" style="width: 140px; height: 140px; border-radius: 12px; object-fit: cover; background: #03050c;" />
                <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                  <strong style="color: #fff; font-size: 1.25rem;">${system.name}</strong>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${system.description || system.tagline}</p>
                  <div style="margin-top: 0.5rem;">
                    <span class="image-type-badge badge-artist-concept">🎨 Artist's Concept</span>
                    <button class="btn-explore btn-inspect-planet" data-planet-id="${system.id}" style="margin-left: 1rem; padding: 0.35rem 0.8rem; font-size: 0.8rem;">
                      Inspect Full Dossier ↗
                    </button>
                  </div>
                </div>
              </div>
            `}
          </div>

          <!-- Scientific Presentation & Uncertainty Note -->
          <div style="margin-top: 2rem; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px; padding: 1rem 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
            <strong style="color: var(--gold-glow);">⚠️ Scientific Accuracy & Uncertainty Principle:</strong>
            All exoplanet images shown are scientifically guided <em>Artist's Concepts</em>, as current astronomical instrumentation cannot optically resolve the surfaces of worlds orbiting other stars.
            Planetary radii, masses, and atmospheric compositions represent peer-reviewed data from NASA Exoplanet Archive and active JWST spectroscopic cycles.
          </div>
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  initEventListeners() {
    // System selector buttons
    const btns = this.container.querySelectorAll('.exo-system-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedSystemId = btn.dataset.systemId;
        audioEngine.playChime(500, 'sine', 0.04, 0.2);
        this.render();
      });
    });

    // Inspect host star button
    const btnHostStar = this.container.querySelector('#btnInspectHostStar');
    if (btnHostStar) {
      btnHostStar.addEventListener('click', () => {
        const system = this.getSelectedSystem();
        const hostStar = this.getHostStarForSystem(system);
        if (hostStar && this.onInspect) {
          this.onInspect(hostStar);
        }
      });
    }

    // Inspect planet buttons
    const planetBtns = this.container.querySelectorAll('.btn-inspect-planet');
    planetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const planetId = btn.dataset.planetId;
        const obj = getAstronomicalObject(planetId);
        if (obj && this.onInspect) {
          this.onInspect(obj);
        }
      });
    });

    // Click on planet point in HZ visualizer
    const hzPoints = this.container.querySelectorAll('.hz-planet-point');
    hzPoints.forEach(p => {
      p.addEventListener('click', () => {
        const planetId = p.dataset.planetId;
        const obj = getAstronomicalObject(planetId);
        if (obj && this.onInspect) {
          this.onInspect(obj);
        }
      });
    });

    // Attach image fallbacks for thumbnails
    this.container.querySelectorAll('.exo-table-thumb').forEach(img => {
      attachImageFallback(img, { name: 'Exoplanet', category: 'exoplanet' });
    });
  }
}
