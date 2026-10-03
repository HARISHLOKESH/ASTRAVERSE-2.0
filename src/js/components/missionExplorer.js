// ASTRAVERSE 2.0 - Space Mission Explorer
// Interactive fleet gallery of flagship astronomical observatories and planetary probes

import { spaceMissions, getMissionById, getMissionsByType } from '../data/missionsData.js';
import { getAstronomicalObject } from '../data/hierarchyData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';
import { attachImageFallback, IMAGE_TYPE_LABELS } from '../utils/imageHelper.js';

export class MissionExplorer {
  constructor(containerElement, onInspectObject) {
    this.container = containerElement;
    this.onInspect = onInspectObject;
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.selectedMission = null;
    this.render();
  }

  getFilteredMissions() {
    let list = [...spaceMissions];

    if (this.activeFilter === 'telescope') {
      list = list.filter(m => m.type.toLowerCase().includes('telescope') || m.type.toLowerCase().includes('observatory'));
    } else if (this.activeFilter === 'interplanetary') {
      list = list.filter(m => m.type.toLowerCase().includes('probe') || m.type.toLowerCase().includes('orbiter') || m.type.toLowerCase().includes('sample'));
    } else if (this.activeFilter === 'mars') {
      list = list.filter(m => m.target.toLowerCase().includes('mars'));
    } else if (this.activeFilter === 'interstellar') {
      list = list.filter(m => m.status.toLowerCase().includes('interstellar') || m.target.toLowerCase().includes('interstellar'));
    } else if (this.activeFilter === 'active') {
      list = list.filter(m => m.status.toLowerCase().includes('active'));
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.agency.toLowerCase().includes(q) ||
        m.target.toLowerCase().includes(q) ||
        m.purpose.toLowerCase().includes(q) ||
        (m.discoveries && m.discoveries.some(d => d.toLowerCase().includes(q)))
      );
    }

    return list;
  }

  render() {
    const filters = [
      { id: 'all', label: `All Missions (${spaceMissions.length})` },
      { id: 'telescope', label: 'Space Telescopes' },
      { id: 'interplanetary', label: 'Planetary Probes' },
      { id: 'mars', label: 'Mars Rovers' },
      { id: 'interstellar', label: 'Interstellar Pioneers' },
      { id: 'active', label: 'Active Fleet' }
    ];

    const missions = this.getFilteredMissions();

    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(56, 189, 248, 0.25);">
          <span class="banner-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: rgba(56, 189, 248, 0.3);">
            🚀 Humanity's Fleet
          </span>
          <h2 class="banner-title">Space Missions & Deep Space Observatories</h2>
          <p class="banner-subtitle">
            Explore the flagship telescopes and interplanetary robotic explorers that have mapped the cosmos,
            penetrated alien atmospheres, touched the Sun, and crossed into interstellar space.
          </p>
        </div>

        <!-- Filter Chips & Search Bar -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div class="filter-chips-wrap" aria-label="Filter space missions">
            ${filters.map(f => `
              <button class="filter-chip ${this.activeFilter === f.id ? 'active' : ''}" data-filter="${f.id}">
                ${f.label}
              </button>
            `).join('')}
          </div>

          <div style="min-width: 260px; max-width: 380px; flex-grow: 1;">
            <input 
              type="text" 
              id="missionSearchInput" 
              class="cosmic-search-input" 
              placeholder="Search missions, targets, discoveries..." 
              value="${this.searchQuery}" 
              style="padding: 0.6rem 1rem; font-size: 0.9rem;"
            />
          </div>
        </div>

        <!-- Missions Fleet Grid -->
        <div class="missions-grid">
          ${missions.map(m => {
            const isActive = m.status.toLowerCase().includes('active');
            const statusClass = isActive ? 'status-active' : 'status-completed';
            const imgMeta = m.imageMeta || {
              imageType: 'SPACECRAFT_IMAGE',
              imageCredit: m.agency,
              altText: m.name
            };

            const typeLabel = IMAGE_TYPE_LABELS[imgMeta.imageType] || { label: 'Spacecraft', icon: '🛰️', class: 'badge-spacecraft' };

            return `
              <div class="mission-card" data-id="${m.id}">
                <div class="mission-media">
                  <img src="${m.image}" alt="${m.name}" loading="lazy" class="mission-img" />
                  <div class="card-gradient-overlay"></div>
                  <span class="mission-status-pill ${statusClass}">
                    ${isActive ? '🟢 Active' : '⚪ Concluded'}
                  </span>
                  <span class="image-type-badge ${typeLabel.class}" style="position: absolute; bottom: 0.75rem; left: 0.75rem;">
                    <span>${typeLabel.icon}</span> ${typeLabel.label}
                  </span>
                </div>

                <div class="mission-body">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                    <h3 class="mission-title">${m.name}</h3>
                    <span style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; background: rgba(255,255,255,0.06); padding: 0.2rem 0.5rem; border-radius: 6px; white-space: nowrap;">
                      ${m.launchYear}
                    </span>
                  </div>

                  <div class="mission-meta-row">
                    <span>🏢 ${m.agency}</span>
                    <span>📡 ${m.type}</span>
                  </div>

                  <div style="font-size: 0.85rem; color: var(--cyan-glow); background: rgba(0, 240, 255, 0.05); padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid rgba(0, 240, 255, 0.15);">
                    🎯 <strong>Target:</strong> ${m.target}
                  </div>

                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-top: 0.25rem;">
                    ${m.purpose}
                  </p>

                  <div style="margin-top: auto; padding-top: 0.75rem;">
                    <h4 style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 0.35rem;">
                      Landmark Breakthroughs
                    </h4>
                    <ul class="mission-discoveries-list">
                      ${m.discoveries.slice(0, 2).map(d => `
                        <li class="mission-discovery-item">${d}</li>
                      `).join('')}
                    </ul>
                  </div>

                  <div style="display: flex; gap: 0.5rem; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.85rem;">
                    <button class="btn-dossier" data-id="${m.id}" style="flex-grow: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.65rem 1rem; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease;">
                      <span>Full Dossier & Targets</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                    <button class="btn-audio-mission" data-id="${m.id}" title="Narrate mission summary" style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">
                      🎧
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Mission Dossier Modal -->
      <div class="cosmic-modal-overlay" id="missionDossierModal" role="dialog" aria-modal="true">
        <div class="modal-backdrop"></div>
        <div class="modal-dialog" style="max-width: 800px;">
          <button class="modal-close-btn" id="btnCloseMissionDossier" aria-label="Close dossier">✕</button>
          <div class="modal-body-wrapper" id="missionDossierContent"></div>
        </div>
      </div>
    `;

    // Attach image fallbacks
    this.container.querySelectorAll('.mission-img').forEach(img => {
      attachImageFallback(img, img.alt, 'mission');
    });

    this.bindEvents();
  }

  bindEvents() {
    // Filter chips
    this.container.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.activeFilter = chip.dataset.filter;
        audioEngine.playChime(460, 'sine', 0.04, 0.2);
        this.render();
      });
    });

    // Search input
    const searchInput = this.container.querySelector('#missionSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const missions = this.getFilteredMissions();
        const grid = this.container.querySelector('.missions-grid');
        if (grid) {
          // Re-render only grid to keep input focus
          this.renderGridOnly(grid, missions);
        }
      });
    }

    // Dossier buttons
    this.container.querySelectorAll('.btn-dossier').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        this.openDossier(id);
      });
    });

    // Audio narration
    this.container.querySelectorAll('.btn-audio-mission').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const mission = getMissionById(id);
        if (!mission) return;
        if (audioEngine.isSpeaking()) {
          audioEngine.stopSpeaking();
          btn.textContent = '🎧';
        } else {
          btn.textContent = '⏹';
          const text = `${mission.name}. Operated by ${mission.agency}. Launched in ${mission.launchYear}. ${mission.purpose} Key discovery: ${mission.discoveries[0]}`;
          audioEngine.speak(text, () => {
            btn.textContent = '🎧';
          });
        }
      });
    });

    // Modal close
    const dossierModal = this.container.querySelector('#missionDossierModal');
    const closeBtn = this.container.querySelector('#btnCloseMissionDossier');
    const backdrop = dossierModal ? dossierModal.querySelector('.modal-backdrop') : null;

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDossier());
    if (backdrop) backdrop.addEventListener('click', () => this.closeDossier());
  }

  renderGridOnly(grid, missions) {
    if (missions.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; background: rgba(15, 23, 42, 0.5); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.15);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.75rem;">🛰️</span>
          <h3 style="font-family: var(--font-heading); color: #fff;">No Space Missions Match</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting your query or filter category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = missions.map(m => {
      const isActive = m.status.toLowerCase().includes('active');
      const statusClass = isActive ? 'status-active' : 'status-completed';
      const imgMeta = m.imageMeta || {
        imageType: 'SPACECRAFT_IMAGE',
        imageCredit: m.agency,
        altText: m.name
      };
      const typeLabel = IMAGE_TYPE_LABELS[imgMeta.imageType] || { label: 'Spacecraft', icon: '🛰️', class: 'badge-spacecraft' };

      return `
        <div class="mission-card" data-id="${m.id}">
          <div class="mission-media">
            <img src="${m.image}" alt="${m.name}" loading="lazy" class="mission-img" />
            <div class="card-gradient-overlay"></div>
            <span class="mission-status-pill ${statusClass}">
              ${isActive ? '🟢 Active' : '⚪ Concluded'}
            </span>
            <span class="image-type-badge ${typeLabel.class}" style="position: absolute; bottom: 0.75rem; left: 0.75rem;">
              <span>${typeLabel.icon}</span> ${typeLabel.label}
            </span>
          </div>

          <div class="mission-body">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
              <h3 class="mission-title">${m.name}</h3>
              <span style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; background: rgba(255,255,255,0.06); padding: 0.2rem 0.5rem; border-radius: 6px; white-space: nowrap;">
                ${m.launchYear}
              </span>
            </div>

            <div class="mission-meta-row">
              <span>🏢 ${m.agency}</span>
              <span>📡 ${m.type}</span>
            </div>

            <div style="font-size: 0.85rem; color: var(--cyan-glow); background: rgba(0, 240, 255, 0.05); padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid rgba(0, 240, 255, 0.15);">
              🎯 <strong>Target:</strong> ${m.target}
            </div>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-top: 0.25rem;">
              ${m.purpose}
            </p>

            <div style="margin-top: auto; padding-top: 0.75rem;">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 0.35rem;">
                Landmark Breakthroughs
              </h4>
              <ul class="mission-discoveries-list">
                ${m.discoveries.slice(0, 2).map(d => `
                  <li class="mission-discovery-item">${d}</li>
                `).join('')}
              </ul>
            </div>

            <div style="display: flex; gap: 0.5rem; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.85rem;">
              <button class="btn-dossier" data-id="${m.id}" style="flex-grow: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.65rem 1rem; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease;">
                <span>Full Dossier & Targets</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button class="btn-audio-mission" data-id="${m.id}" title="Narrate mission summary" style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">
                🎧
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.mission-img').forEach(img => {
      attachImageFallback(img, img.alt, 'mission');
    });

    grid.querySelectorAll('.btn-dossier').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openDossier(btn.dataset.id);
      });
    });

    grid.querySelectorAll('.btn-audio-mission').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const mission = getMissionById(id);
        if (!mission) return;
        if (audioEngine.isSpeaking()) {
          audioEngine.stopSpeaking();
          btn.textContent = '🎧';
        } else {
          btn.textContent = '⏹';
          const text = `${mission.name}. Operated by ${mission.agency}. Launched in ${mission.launchYear}. ${mission.purpose} Key discovery: ${mission.discoveries[0]}`;
          audioEngine.speak(text, () => {
            btn.textContent = '🎧';
          });
        }
      });
    });
  }

  openDossier(missionId) {
    const m = getMissionById(missionId);
    if (!m) return;
    this.selectedMission = m;

    const modal = this.container.querySelector('#missionDossierModal');
    const content = this.container.querySelector('#missionDossierContent');
    if (!modal || !content) return;

    audioEngine.playModalOpen();

    const imgMeta = m.imageMeta || {
      imageType: 'SPACECRAFT_IMAGE',
      imageCredit: m.agency,
      imageSource: m.agency,
      altText: m.name
    };

    const typeLabel = IMAGE_TYPE_LABELS[imgMeta.imageType] || { label: 'Spacecraft', icon: '🛰️', class: 'badge-spacecraft' };

    content.innerHTML = `
      <div class="modal-header-bar">
        <div class="m-title-group">
          <span class="m-badge" style="background: rgba(56, 189, 248, 0.2); color: #7dd3fc; border-color: rgba(56, 189, 248, 0.4);">
            🚀 Space Mission Dossier
          </span>
          <h2 class="m-title">${m.name}</h2>
          <span class="m-parent">${m.agency} • Launched ${m.launchYear} • ${m.status}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
        <div>
          <div style="position: relative; border-radius: 12px; overflow: hidden; height: 260px; background: #03050c; border: 1px solid rgba(255,255,255,0.12);">
            <img src="${m.image}" alt="${m.name}" id="dossierImg" style="width: 100%; height: 100%; object-fit: cover;" />
            <span class="image-type-badge ${typeLabel.class}" style="position: absolute; bottom: 0.75rem; left: 0.75rem;">
              <span>${typeLabel.icon}</span> ${typeLabel.label}
            </span>
          </div>

          <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.25rem;">
            <span>📸 <strong>Credit:</strong> ${imgMeta.imageCredit || m.agency}</span>
            <span>🏛️ <strong>Source:</strong> ${imgMeta.imageSource || m.agency}</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div class="data-matrix">
            <div class="data-item">
              <span class="d-label">Mission Status</span>
              <span class="d-value" style="color: ${m.status.toLowerCase().includes('active') ? '#34d399' : '#94a3b8'};">${m.status}</span>
            </div>
            <div class="data-item">
              <span class="d-label">Spacecraft Type</span>
              <span class="d-value">${m.type}</span>
            </div>
            <div class="data-item">
              <span class="d-label">Operational Orbit / Path</span>
              <span class="d-value">${m.orbit}</span>
            </div>
            <div class="data-item">
              <span class="d-label">Primary Exploration Target</span>
              <span class="d-value">${m.target}</span>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem;">
            <h4 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--cyan-glow); margin-bottom: 0.35rem;">
              Primary Mission Purpose
            </h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
              ${m.purpose}
            </p>
          </div>
        </div>
      </div>

      <div style="margin-top: 1.5rem;">
        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>🌟</span> Major Scientific Breakthroughs & Discoveries
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${m.discoveries.map(d => `
            <div style="padding: 0.85rem 1rem; border-radius: 10px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; display: flex; align-items: flex-start; gap: 0.75rem;">
              <span style="color: var(--cyan-glow); font-size: 1rem; margin-top: -0.1rem;">✦</span>
              <span>${d}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const dossierImg = content.querySelector('#dossierImg');
    if (dossierImg) {
      attachImageFallback(dossierImg, m.name, 'mission');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDossier() {
    const modal = this.container.querySelector('#missionDossierModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}
