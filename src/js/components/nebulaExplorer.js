// ASTRAVERSE 2.0 - Dedicated Nebulae Explorer
// Interactive deep-space explorer for emission nebulae, stellar nurseries, planetary nebulae, and supernova remnants

import { nebulaeData } from '../data/nebulaeData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';

export class NebulaExplorer {
  constructor(containerElement, onInspectObject) {
    this.container = containerElement;
    this.onInspect = onInspectObject;
    this.activeFilter = 'all';
    this.render();
  }

  render() {
    const filteredNebulae = this.getFilteredNebulae();

    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(16, 185, 129, 0.25);">
          <span class="banner-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3);">🌫️ Interstellar Gas Dynamics & Stellar Nurseries</span>
          <h2 class="banner-title">Nebulae Explorer</h2>
          <p class="banner-subtitle">
            Explore the vast cosmic clouds where stars are born and where dying stars return their enriched elements to the universe.
            From turbulent hydrogen H II ionization fronts to intricate planetary gas shells and relativistic supernova shockwaves.
          </p>
        </div>

        <!-- Filter Chips Bar -->
        <div class="filter-chips-wrap" style="margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 0.5rem;" aria-label="Filter nebulae by astronomical class">
          <button class="filter-chip ${this.activeFilter === 'all' ? 'active' : ''}" data-neb-filter="all">
            🌌 All Nebulae (${nebulaeData.length})
          </button>
          <button class="filter-chip ${this.activeFilter === 'emission' ? 'active' : ''}" data-neb-filter="emission">
            🌟 Stellar Nurseries & Emission (H II)
          </button>
          <button class="filter-chip ${this.activeFilter === 'planetary' ? 'active' : ''}" data-neb-filter="planetary">
            🪐 Planetary Nebulae
          </button>
          <button class="filter-chip ${this.activeFilter === 'supernova' ? 'active' : ''}" data-neb-filter="supernova">
            💥 Supernova Remnants
          </button>
          <button class="filter-chip ${this.activeFilter === 'dark' ? 'active' : ''}" data-neb-filter="dark">
            🌑 Dark & Reflection Clouds
          </button>
        </div>

        <!-- Nebulae Fleet Grid -->
        <div class="cards-grid" id="nebulaeCardsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
          ${filteredNebulae.map(nebula => this.renderNebulaCard(nebula)).join('')}
        </div>

        <!-- Astrophysical Guide Section -->
        <div style="margin-top: 3.5rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 2rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.6rem;">
            <span>🔬</span> Astrophysical Mechanisms of Nebulae
          </h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Nebulae are classified according to their physical emission mechanisms, excitation sources, and life-cycle stages:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 14px; padding: 1.25rem;">
              <div style="font-weight: 700; color: #34d399; font-size: 1rem; margin-bottom: 0.35rem;">1. Emission Nebulae (H II Regions)</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                Hot O and B-type young stars emit energetic ultraviolet photons (>13.6 eV) that ionize neutral hydrogen gas. When electrons recombine with protons, they emit Balmer alpha light at 656.3 nm, giving stellar nurseries their signature vivid crimson glow.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 14px; padding: 1.25rem;">
              <div style="font-weight: 700; color: #38bdf8; font-size: 1rem; margin-bottom: 0.35rem;">2. Planetary Nebulae</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                Intermediate stars (0.8 to 8 M☉) shed their outer envelopes during the Asymptotic Giant Branch (AGB) phase. The exposed white dwarf core (temperature >30,000 K) fluoresces the expanding shell, exciting doubly ionized oxygen [O III] to emit bright teal-cyan light at 500.7 nm.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 14px; padding: 1.25rem;">
              <div style="font-weight: 700; color: #f43f5e; font-size: 1rem; margin-bottom: 0.35rem;">3. Supernova Remnants</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                The explosive death of massive stars blasts heavy elements into the interstellar medium at speeds exceeding 10,000 km/s. Shockwaves compress gas and magnetic fields, producing non-thermal synchrotron radiation and tangled filamentary webs.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 14px; padding: 1.25rem;">
              <div style="font-weight: 700; color: #f59e0b; font-size: 1rem; margin-bottom: 0.35rem;">4. Dark & Reflection Clouds</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                Cold molecular clouds containing dense sub-micron carbon and silicate dust grains. Dark nebulae block background starlight through interstellar extinction, while reflection nebulae scatter blue light from nearby stars.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  getFilteredNebulae() {
    if (this.activeFilter === 'all') return nebulaeData;

    return nebulaeData.filter(neb => {
      const type = (neb.nebulaType || neb.type || '').toLowerCase();
      const id = neb.id.toLowerCase();

      if (this.activeFilter === 'emission') {
        return type.includes('emission') || type.includes('h ii') || type.includes('nursery') || type.includes('star-forming') || id === 'pillars-of-creation' || id === 'orion-nebula' || id === 'carina-nebula' || id === 'tarantula-nebula' || id === 'lagoon-nebula' || id === 'rosette-nebula';
      }
      if (this.activeFilter === 'planetary') {
        return type.includes('planetary') || id === 'ring-nebula' || id === 'helix-nebula' || id === 'southern-ring' || id === 'cats-eye-nebula' || id === 'butterfly-nebula' || id === 'dumbbell-nebula';
      }
      if (this.activeFilter === 'supernova') {
        return type.includes('supernova') || type.includes('remnant') || id === 'crab-nebula' || id === 'veil-nebula';
      }
      if (this.activeFilter === 'dark') {
        return type.includes('dark') || type.includes('reflection') || id === 'horsehead-nebula' || id === 'bubble-nebula';
      }
      return true;
    });
  }

  renderNebulaCard(nebula) {
    const isRealObs = nebula.imageMeta?.imageType === 'REAL_OBSERVATION' || nebula.imageMeta?.imageType === 'SPACECRAFT_IMAGE';

    return `
      <div class="cosmic-card" data-neb-id="${nebula.id}" style="cursor: pointer; display: flex; flex-direction: column; overflow: hidden; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;">
        <div style="position: relative; width: 100%; height: 210px; overflow: hidden; background: #03050c;">
          <img 
            src="${nebula.image}" 
            alt="${nebula.name}" 
            loading="lazy" 
            style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
            onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' viewBox=\\'0 0 400 250\\'><rect fill=\\'%23080d1a\\' width=\\'400\\' height=\\'250\\'/><circle cx=\\'200\\' cy=\\'125\\' r=\\'70\\' fill=\\'%2310b981\\' opacity=\\'0.4\\'/><text fill=\\'%23fff\\' font-family=\\'sans-serif\\' font-size=\\'16\\' x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\'>${nebula.name}</text></svg>';"
          />
          <span class="image-type-badge ${isRealObs ? 'badge-real-obs' : 'badge-artist-concept'}" style="position: absolute; top: 0.75rem; right: 0.75rem;">
            ${isRealObs ? '📷 Real Observation' : '🎨 Scientific Visualization'}
          </span>
          <span style="position: absolute; bottom: 0.75rem; left: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.72rem; font-weight: 700; background: rgba(0,0,0,0.75); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); backdrop-filter: blur(4px);">
            ${nebula.nebulaType || nebula.type}
          </span>
        </div>

        <div style="padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; margin: 0; line-height: 1.3;">
              ${nebula.name}
            </h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap;">
              ${nebula.constellation || 'Milky Way'}
            </span>
          </div>

          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex-grow: 1;">
            ${nebula.tagline || nebula.subtitle || nebula.description}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; padding: 0.75rem; background: rgba(255, 255, 255, 0.03); border-radius: 10px; margin-bottom: 1rem; font-size: 0.76rem;">
            <div>
              <span style="color: var(--text-muted); display: block;">Distance:</span>
              <strong style="color: #fff;">${nebula.distance || 'N/A'}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Diameter:</span>
              <strong style="color: #38bdf8;">${nebula.diameter || 'N/A'}</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; pt-2;">
            <span style="font-size: 0.7rem; color: var(--text-muted);">
              🔭 ${nebula.missions ? nebula.missions[0] : 'Space Telescope'}
            </span>
            <button class="btn-explore" style="padding: 0.45rem 0.9rem; font-size: 0.8rem; font-weight: 600;">
              Inspect Nebula ↗
            </button>
          </div>
        </div>
      </div>
    `;
  }

  initEventListeners() {
    // Filter chip clicks
    const chips = this.container.querySelectorAll('[data-neb-filter]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        audioEngine.playChime(460, 'sine', 0.04, 0.2);
        this.activeFilter = chip.dataset.nebFilter;
        this.render();
      });
    });

    // Card click -> inspect
    const cards = this.container.querySelectorAll('[data-neb-id]');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.nebId;
        const neb = nebulaeData.find(n => n.id === id);
        if (neb && this.onInspect) {
          audioEngine.playChime(580, 'triangle', 0.05, 0.3);
          this.onInspect(neb);
        }
      });
    });
  }
}
