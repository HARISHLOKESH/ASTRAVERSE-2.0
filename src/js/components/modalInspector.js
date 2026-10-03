// ASTRAVERSE 2.0 - Expanded Deep-Dive Modal Inspector
// Renders the comprehensive detail view for Astronomical Objects and Constellations

import { CelestialCanvas } from './celestialCanvas.js';
import { audioEngine } from '../utils/audioSynthesizer.js';
import { isFavorite, toggleFavorite } from '../utils/storage.js';
import { resolveImageMeta, attachImageFallback, IMAGE_TYPE_LABELS } from '../utils/imageHelper.js';
import { getAstronomicalObject } from '../data/hierarchyData.js';

export class ModalInspector {
  constructor(modalContainer, onDrillDown = null, onNavigateToParent = null) {
    this.modal = modalContainer;
    this.onDrillDown = onDrillDown;
    this.onNavigateToParent = onNavigateToParent;
    this.canvasInstance = null;
    this.currentData = null;
    this.isConstellation = false;
    this.activeTab = 'overview';
    this.userWeightKg = 70;

    this.initElements();
  }

  initElements() {
    this.closeBtn = this.modal.querySelector('.modal-close-btn');
    this.backdrop = this.modal.querySelector('.modal-backdrop');
    this.contentContainer = this.modal.querySelector('.modal-body-wrapper');

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Escape key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(data, isConstellation = false) {
    this.currentData = data;
    this.isConstellation = isConstellation;
    this.activeTab = 'overview';

    audioEngine.playModalOpen();

    if (isConstellation) {
      this.renderConstellationModal(data);
    } else {
      this.renderAstronomicalModal(data);
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    audioEngine.stopSpeaking();

    if (this.canvasInstance) {
      this.canvasInstance.stop();
      this.canvasInstance = null;
    }
  }

  getSimulationPhysicsExplanation(item) {
  const cat = item.category || 'planet';
  const id = item.id || '';
  if (cat === 'black-hole' || id.includes('blackhole') || id === 'sagittarius-a' || id === 'm87-blackhole' || id === 'ton-618' || id === 'cygnus-x1') {
    return {
      title: 'General Relativistic Kerr Metric',
      subtitle: 'Shadow (2.6 Rs), photon ring, warped disk & Doppler beaming',
      detail: 'Simulates spacetime distortion around a spinning singularity. Deflected photons create the dark central shadow ($r \\approx 2.6 R_s$) bounded by the bright photon ring ($1.5 R_s$). The accretion disk behind the hole is gravitationally warped above and below, and material orbiting toward the viewer is strongly Doppler-beamed.'
    };
  }
  if (cat === 'nebula' || id.includes('nebula') || id === 'pillars-of-creation') {
    return {
      title: 'Multi-Band Ionization Gas Dynamics',
      subtitle: 'H-alpha (656 nm crimson) + [O III] (500 nm teal) + photo-evaporation',
      detail: 'Simulates high-energy ultraviolet radiation from embedded newborn stars photo-evaporating gas clouds, illuminating hydrogen emission fronts and oxygen ionization bubbles intertwined with dense dark silicates.'
    };
  }
  if (cat === 'stellar-remnant' || id.includes('pulsar') || id.includes('magnetar')) {
    return {
      title: 'Relativistic Synchrotron Engine',
      subtitle: '10¹² Gauss dipole field & sweeping lighthouse beam',
      detail: 'Simulates a degenerate neutron core rotating at millisecond intervals, funneling ultra-relativistic charged particles along extreme magnetic dipole lines to create sweeping collimated beams.'
    };
  }
  if (cat === 'star') {
    return {
      title: 'Magnetohydrodynamic Convective Model',
      subtitle: 'Plasma granulation cells, limb darkening & coronal loops',
      detail: 'Simulates thermal convection cells rising from the radiative zone, Eddington limb darkening toward the edge of the photosphere, and twisting magnetic flux lines erupting into coronal loops.'
    };
  }
  if (cat === 'moon') {
    return {
      title: 'Tidal Mechanics & Surface Regolith',
      subtitle: 'Phase-angle terminator, impact crater relief & tidal heating',
      detail: 'Simulates solar phase illumination, tidally locked synchronous rotation, and morphological surface geology ranging from volcanic sulfur plains to fractured subsurface ocean ice shells.'
    };
  }
  if (cat === 'exoplanet') {
    return {
      title: 'Exoplanetary Atmospheric Simulation',
      subtitle: 'Tidally locked eyeball circulation & Roche tidal distortion',
      detail: 'Simulates extreme exoplanet environments, including synchronous tidally locked eyeball worlds with twilight habitable rings, superheated magma oceans, and egg-shaped gravitational mass transfer.'
    };
  }
  if (cat === 'galaxy') {
    return {
      title: 'Density Wave Theory & Galactic Bulge',
      subtitle: 'Differential Keplerian spiral arms & central nucleus',
      detail: 'Simulates Lin-Shu density waves compressing interstellar gas into spiral starburst arms revolving around a dense nuclear stellar bulge.'
    };
  }
  return {
    title: '3D Spherical Solar Lighting',
    subtitle: 'Rayleigh atmospheric scattering, axial tilt & planetary bands',
    detail: 'Simulates realistic physical illumination based on sunlight direction, terminator shadow gradation, axial rotation, and distinct atmospheric cloud and surface compositions.'
  };
}

  // --- RENDER ASTRONOMICAL ENTITY MODAL ---
  renderAstronomicalModal(item) {
    const isFav = isFavorite(item.id);
    const parentText = item.parentName ? (['moon', 'moons'].includes(item.category) ? `Orbits: ${item.parentName}` : `Part of: ${item.parentName}`) : 'The Cosmos';

    const hasChildren = item.childrenIds && item.childrenIds.length > 0;
    const childrenCount = item.childrenIds ? item.childrenIds.length : 0;
    const canNavigateParent = Boolean(this.onNavigateToParent && item.parentId);

    const imgMeta = resolveImageMeta(item);
    const typeConfig = IMAGE_TYPE_LABELS[imgMeta.imageType] || { label: 'Observation', icon: '📷', class: 'badge-real-obs' };
    const simPhysics = this.getSimulationPhysicsExplanation(item);

    this.contentContainer.innerHTML = `
      <div class="modal-header-bar">
        <div class="m-title-group">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span class="m-badge category-${item.category}">${item.subcategory || item.type}</span>
            <span class="image-type-badge ${typeConfig.class}">
              <span>${typeConfig.icon}</span> ${typeConfig.label}
            </span>
            ${item.source ? `
              <span style="font-size: 0.72rem; padding: 0.2rem 0.55rem; border-radius: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: #cbd5e1; font-weight: 500;">
                🏛️ ${item.source}
              </span>
            ` : ''}
          </div>
          <h2 class="m-title">${item.name}</h2>
          ${item.aliases && item.aliases.length > 0 ? `
            <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.15rem;">
              Also cataloged as: <strong style="color: #cbd5e1;">${item.aliases.join(', ')}</strong>
            </div>
          ` : ''}
          ${canNavigateParent ? `
            <button class="m-parent-btn" id="btnModalParent" title="Navigate to ${item.parentName || 'parent'}">
              <span>${parentText}</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </button>
          ` : `<span class="m-parent">${parentText}</span>`}
        </div>
        <div class="m-header-actions">
          ${hasChildren ? `
            <button class="btn-modal-explore-children" id="btnModalExploreChildren" title="Explore ${childrenCount} nested celestial entities">
              <span>Explore (${childrenCount})</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          ` : ''}
          <button class="btn-audio-guide" id="btnAudioGuide" title="Listen to audio overview">
            <span class="audio-icon">🎧</span>
            <span class="audio-text">Audio Guide</span>
          </button>
          <button class="btn-fav-toggle ${isFav ? 'active' : ''}" id="btnModalFav" title="Bookmark object">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="${isFav ? '#ef4444' : 'none'}" stroke="${isFav ? '#ef4444' : '#e2e8f0'}" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="modal-grid-layout">
        <!-- Visual Column -->
        <div class="modal-visual-column">
          <div class="visual-canvas-card">
            <div class="visual-canvas-container">
              <canvas id="modalCelestialCanvas" class="celestial-render-canvas"></canvas>
            </div>
            <div class="visual-controls" style="padding: 0.85rem 1rem; background: rgba(0,0,0,0.5); border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 0.35rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                <span class="visual-label" style="font-size: 0.72rem; letter-spacing: 0.08em; font-weight: 700; color: #38bdf8;">PROCEDURAL SIMULATION</span>
                <span style="font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 4px; background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-weight: 600;">Live Physics Engine</span>
              </div>
              <span class="visual-sub" style="font-size: 0.8rem; font-weight: 600; color: #f8fafc; line-height: 1.3;">
                ${simPhysics.title}: ${simPhysics.subtitle}
              </span>
              <p style="font-size: 0.73rem; color: #94a3b8; line-height: 1.4; margin: 0;">
                ${simPhysics.detail}
              </p>
            </div>
          </div>

          <div class="visual-photo-card">
            <div style="position: relative; width: 100%; height: 180px; overflow: hidden; border-radius: 12px; background: #03050c;">
              <img src="${imgMeta.imageUrl}" alt="${imgMeta.altText}" class="visual-photo-img" style="width: 100%; height: 100%; object-fit: cover;" />
              <span class="image-type-badge ${typeConfig.class}" style="position: absolute; bottom: 0.5rem; left: 0.5rem;">
                <span>${typeConfig.icon}</span> ${typeConfig.label}
              </span>
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.15rem;">
              <span>📸 <strong>Credit:</strong> ${imgMeta.imageCredit || 'NASA / ESA Heritage'}</span>
              ${imgMeta.imageSource ? `<span>🏛️ <strong>Source:</strong> ${imgMeta.imageSource}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Details & Data Column -->
        <div class="modal-info-column">
          <!-- Tab Navigation -->
          <div class="modal-tab-nav">
            <button class="tab-btn active" data-tab="overview">Overview</button>
            <button class="tab-btn" data-tab="specs">Astrophysical Metrics</button>
            <button class="tab-btn" data-tab="composition">Composition & Env</button>
            <button class="tab-btn" data-tab="facts">Curiosities & Lore</button>
          </div>

          <!-- Tab 1: Overview -->
          <div class="modal-tab-content active" id="tab-overview">
            <p class="overview-description">${item.description}</p>

            <div class="data-matrix">
              <div class="data-item">
                <span class="d-label">Classification</span>
                <span class="d-value">${item.subcategory || item.type}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Parent Celestial Body</span>
                <span class="d-value">${item.parentName || 'The Cosmos'}</span>
              </div>
              ${item.location ? `
                <div class="data-item">
                  <span class="d-label">Cosmic Location</span>
                  <span class="d-value">${item.location}</span>
                </div>
              ` : ''}
              <div class="data-item">
                <span class="d-label">Estimated Age</span>
                <span class="d-value">${item.age || 'N/A'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Average Temperature</span>
                <span class="d-value">${item.temperature || item.equilibriumTemp || 'N/A'}</span>
              </div>
              ${item.habitableZone !== undefined ? `
                <div class="data-item">
                  <span class="d-label">Habitable Zone</span>
                  <span class="d-value" style="color: ${item.habitableZone ? '#34d399' : '#f59e0b'};">
                    ${item.habitableZone ? '🌿 Within Habitable Zone' : '❄️ Outside Habitable Zone'}
                  </span>
                </div>
              ` : ''}
              ${item.hostStar ? `
                <div class="data-item">
                  <span class="d-label">Host Star</span>
                  <span class="d-value">${item.hostStar}</span>
                </div>
              ` : ''}
              ${item.discoveryYear ? `
                <div class="data-item">
                  <span class="d-label">Discovery Year</span>
                  <span class="d-value">${item.discoveryYear} (${item.discoveryMethod || 'Telescopic'})</span>
                </div>
              ` : ''}
              ${item.constellation ? `
                <div class="data-item">
                  <span class="d-label">Constellation</span>
                  <span class="d-value">${item.constellation}</span>
                </div>
              ` : ''}
              ${item.nebulaType ? `
                <div class="data-item">
                  <span class="d-label">Nebula Class</span>
                  <span class="d-value">${item.nebulaType}</span>
                </div>
              ` : ''}
              ${item.source ? `
                <div class="data-item">
                  <span class="d-label">Authoritative Source</span>
                  <span class="d-value">${item.source}</span>
                </div>
              ` : ''}
            </div>

            ${((item.references && item.references.length > 0) || (item.missions && item.missions.length > 0)) ? `
              <div class="missions-section" style="margin-top: 1rem;">
                <h4 class="section-subtitle">Pioneering Exploration & Scientific Citations</h4>
                <div class="mission-tags">
                  ${(item.references || item.missions).map(m => `<span class="mission-tag">🚀 ${m}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${hasChildren ? `
              <div style="margin-top: 1.25rem; padding: 1rem; border-radius: 12px; background: rgba(56, 189, 248, 0.06); border: 1px solid rgba(56, 189, 248, 0.2);">
                <h4 style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
                  Nested Celestial Children (${childrenCount})
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  ${item.childrenIds.map(cid => {
                    const cObj = getAstronomicalObject(cid);
                    const name = cObj ? cObj.name : cid;
                    return `<button class="modal-child-jump-btn" data-id="${cid}" style="padding: 0.35rem 0.75rem; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; font-size: 0.8rem; cursor: pointer;">${name} ↗</button>`;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Tab 2: Specs & Weight Calculator -->
          <div class="modal-tab-content" id="tab-specs">
            <div class="data-matrix">
              <div class="data-item">
                <span class="d-label">Equatorial Diameter</span>
                <span class="d-value">${item.diameter || 'N/A'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Distance from Sun / Parent</span>
                <span class="d-value">${item.distance || 'N/A'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Mass</span>
                <span class="d-value">${item.mass || 'N/A'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Relative Mass</span>
                <span class="d-value">${item.massRelative || 'N/A'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Orbital Period (Year)</span>
                <span class="d-value">${item.orbitalPeriod || 'N/A'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Rotation Period (Day)</span>
                <span class="d-value">${item.rotationPeriod || 'N/A'}</span>
              </div>
              ${item.schwarzschildRadius ? `
                <div class="data-item">
                  <span class="d-label">Schwarzschild Radius</span>
                  <span class="d-value">${item.schwarzschildRadius}</span>
                </div>
              ` : ''}
              ${item.eventHorizonRadius ? `
                <div class="data-item">
                  <span class="d-label">Event Horizon Radius</span>
                  <span class="d-value">${item.eventHorizonRadius}</span>
                </div>
              ` : ''}
              ${item.spinParameter ? `
                <div class="data-item">
                  <span class="d-label">Spin Parameter (a*)</span>
                  <span class="d-value">${item.spinParameter}</span>
                </div>
              ` : ''}
              ${item.spectralType ? `
                <div class="data-item">
                  <span class="d-label">Spectral Class</span>
                  <span class="d-value">${item.spectralType}</span>
                </div>
              ` : ''}
              ${item.luminosity ? `
                <div class="data-item">
                  <span class="d-label">Luminosity</span>
                  <span class="d-value">${item.luminosity}</span>
                </div>
              ` : ''}
              <div class="data-item">
                <span class="d-label">Surface Gravity</span>
                <span class="d-value">${item.gravity !== undefined ? `${item.gravity} m/s² (${item.gravityRatio}x Earth)` : 'N/A'}</span>
              </div>
            </div>

            <!-- Interactive Gravity Weight Calculator -->
            ${item.gravityRatio !== undefined && item.gravityRatio > 0 ? `
              <div class="gravity-calculator-box">
                <div class="calc-header">
                  <h4>⚖️ Your Weight on ${item.name}</h4>
                  <span class="calc-hint">Based on surface gravity: ${item.gravityRatio}x Earth</span>
                </div>
                <div class="calc-controls">
                  <label for="userWeightInput">Earth Weight (kg):</label>
                  <input type="number" id="userWeightInput" value="${this.userWeightKg}" min="10" max="300" class="weight-input" />
                  <div class="calc-result-badge">
                    <span class="calc-res-num" id="calcResultWeight">${(this.userWeightKg * item.gravityRatio).toFixed(1)}</span>
                    <span class="calc-res-unit">kg</span>
                  </div>
                </div>
                <p class="calc-sensation" id="calcSensation">
                  ${this.getWeightSensation(item.gravityRatio)}
                </p>
              </div>
            ` : ''}
          </div>

          <!-- Tab 3: Composition -->
          <div class="modal-tab-content" id="tab-composition">
            <h4 class="section-subtitle">Chemical & Atmospheric Breakdown</h4>
            ${item.composition && item.composition.length > 0 ? `
              <div class="composition-bars">
                ${item.composition.map(c => `
                  <div class="comp-row">
                    <div class="comp-info">
                      <span class="comp-name">${c.name}</span>
                      <span class="comp-percent">${c.percentage}%</span>
                    </div>
                    <div class="comp-track">
                      <div class="comp-fill" style="width: ${c.percentage}%; background-color: ${c.color || '#00f0ff'};"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : '<p class="empty-state">No detailed chemical breakdown available.</p>'}
          </div>

          <!-- Tab 4: Facts & Curiosities -->
          <div class="modal-tab-content" id="tab-facts">
            <h4 class="section-subtitle">Fascinating Astronomical Curiosities</h4>
            <ul class="facts-list">
              ${(item.scientificFacts || item.facts || []).map(f => `
                <li class="fact-item">
                  <span class="fact-bullet">✦</span>
                  <span class="fact-text">${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    // Hook up tab switches
    const tabBtns = this.contentContainer.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.contentContainer.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        const targetContent = this.contentContainer.querySelector(`#tab-${tabId}`);
        if (targetContent) targetContent.classList.add('active');
      });
    });

    // Hook up Weight Calculator input
    const weightInput = this.contentContainer.querySelector('#userWeightInput');
    if (weightInput) {
      weightInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        this.userWeightKg = val;
        const resEl = this.contentContainer.querySelector('#calcResultWeight');
        const sensationEl = this.contentContainer.querySelector('#calcSensation');
        if (resEl) {
          resEl.textContent = (val * item.gravityRatio).toFixed(1);
        }
        if (sensationEl) {
          sensationEl.textContent = this.getWeightSensation(item.gravityRatio);
        }
      });
    }

    // Hook up Favorite button
    const favBtn = this.contentContainer.querySelector('#btnModalFav');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const newState = toggleFavorite(item.id);
        favBtn.classList.toggle('active', newState);
        const svg = favBtn.querySelector('svg');
        svg.setAttribute('fill', newState ? '#ef4444' : 'none');
        svg.setAttribute('stroke', newState ? '#ef4444' : '#e2e8f0');

        // Also update any matching card in DOM
        const cardFav = document.querySelector(`.cosmic-card[data-id="${item.id}"] .card-fav-btn`);
        if (cardFav) {
          cardFav.classList.toggle('active', newState);
          const cSvg = cardFav.querySelector('svg');
          cSvg.setAttribute('fill', newState ? '#ef4444' : 'none');
          cSvg.setAttribute('stroke', newState ? '#ef4444' : '#e2e8f0');
        }
      });
    }

    // Hook up Parent jump button
    const parentBtn = this.contentContainer.querySelector('#btnModalParent');
    if (parentBtn) {
      parentBtn.addEventListener('click', () => {
        this.close();
        if (this.onNavigateToParent && item.parentId) {
          this.onNavigateToParent(item.parentId);
        }
      });
    }

    // Hook up Explore sub-entities button
    const exploreChildrenBtn = this.contentContainer.querySelector('#btnModalExploreChildren');
    if (exploreChildrenBtn) {
      exploreChildrenBtn.addEventListener('click', () => {
        this.close();
        if (this.onDrillDown) {
          this.onDrillDown(item);
        }
      });
    }

    // Hook up Audio Guide
    const audioBtn = this.contentContainer.querySelector('#btnAudioGuide');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (audioEngine.isSpeaking()) {
          audioEngine.stopSpeaking();
          audioBtn.classList.remove('playing');
          audioBtn.querySelector('.audio-text').textContent = 'Audio Guide';
          audioBtn.querySelector('.audio-icon').textContent = '🎧';
        } else {
          audioBtn.classList.add('playing');
          audioBtn.querySelector('.audio-text').textContent = 'Stop Narration';
          audioBtn.querySelector('.audio-icon').textContent = '⏹';

          const narrationText = `${item.name}. ${item.type}. ${item.description} Here is a key fact: ${item.facts[0]}`;
          audioEngine.speak(narrationText, () => {
            audioBtn.classList.remove('playing');
            audioBtn.querySelector('.audio-text').textContent = 'Audio Guide';
            audioBtn.querySelector('.audio-icon').textContent = '🎧';
          });
        }
      });
    }

    // Hook up child jump buttons
    this.contentContainer.querySelectorAll('.modal-child-jump-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.dataset.id;
        const cObj = getAstronomicalObject(cid);
        if (cObj) {
          this.open(cObj, false);
        }
      });
    });

    // Image fallback handling
    const photoImg = this.contentContainer.querySelector('.visual-photo-img');
    if (photoImg) {
      attachImageFallback(photoImg, item.name, item.category);
    }

    // Start Procedural Canvas with accurate physics renderType
    const canvasEl = this.contentContainer.querySelector('#modalCelestialCanvas');
    if (canvasEl) {
      let renderType = item.category || 'planet';
      if (['stellar-remnant', 'neutron-stars', 'pulsars', 'magnetars'].includes(item.category) || item.id?.includes('pulsar') || item.id?.includes('magnetar')) renderType = 'neutron-star';
      else if (['phenomenon', 'space-phenomena', 'quasars', 'active-galactic-nuclei'].includes(item.category)) renderType = 'phenomenon';
      else if (['black-hole', 'black-holes'].includes(item.category) || item.id?.includes('blackhole') || item.id === 'sagittarius-a' || item.id === 'm87-blackhole' || item.id === 'ton-618' || item.id === 'cygnus-x1') renderType = 'black-hole';
      else if (['nebula', 'nebulae', 'supernova-remnants'].includes(item.category) || item.id?.includes('nebula') || item.id === 'pillars-of-creation') renderType = 'nebula';
      else if (['dwarf-planets', 'asteroids', 'comets', 'planet', 'planets', 'exoplanet', 'exoplanets'].includes(item.category)) renderType = 'planet';
      else if (['moon', 'moons'].includes(item.category)) renderType = 'moon';
      else if (['star', 'stars', 'stellar-evolution'].includes(item.category)) renderType = 'star';
      else if (['galaxy', 'galaxies', 'galaxy-structures'].includes(item.category)) renderType = 'galaxy';
      this.canvasInstance = new CelestialCanvas(canvasEl, renderType);
      this.canvasInstance.start(item, renderType);
    }
  }

  // --- RENDER CONSTELLATION MODAL ---
  renderConstellationModal(c) {
    this.contentContainer.innerHTML = `
      <div class="modal-header-bar constellation-header">
        <div class="m-title-group">
          <span class="m-badge constellation-badge">Constellation</span>
          <h2 class="m-title">${c.symbol} ${c.name}</h2>
          <span class="m-parent">${c.latinName} • "${c.englishName}"</span>
        </div>
        <div class="m-header-actions">
          <button class="btn-audio-guide" id="btnAudioGuide" title="Listen to constellation mythology">
            <span class="audio-icon">🎧</span>
            <span class="audio-text">Audio Lore</span>
          </button>
        </div>
      </div>

      <div class="modal-grid-layout">
        <!-- Left: Interactive Star Chart Canvas -->
        <div class="modal-visual-column">
          <div class="constellation-canvas-box">
            <canvas id="modalCelestialCanvas" class="constellation-render-canvas"></canvas>
            <div class="chart-legend">
              <span class="legend-hint">Hover over stars to view names & magnitudes</span>
            </div>
          </div>

          <div class="visual-photo-card">
            <img src="${c.image}" alt="${c.name}" class="visual-photo-img" />
            <span class="photo-badge">Deep Space Astrophotography</span>
          </div>
        </div>

        <!-- Right: Constellation Details -->
        <div class="modal-info-column">
          <div class="modal-tab-nav">
            <button class="tab-btn active" data-tab="c-overview">Sky Location & Lore</button>
            <button class="tab-btn" data-tab="c-stars">Major Stars</button>
            <button class="tab-btn" data-tab="c-viewing">Best Viewing</button>
            <button class="tab-btn" data-tab="c-deepsky">Deep Sky & Facts</button>
          </div>

          <!-- Tab 1: Sky Location & Lore -->
          <div class="modal-tab-content active" id="tab-c-overview">
            <div class="data-matrix">
              <div class="data-item">
                <span class="d-label">Sky Location (RA)</span>
                <span class="d-value">${c.rightAscension}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Sky Location (Dec)</span>
                <span class="d-value">${c.declination}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Celestial Hemisphere</span>
                <span class="d-value">${c.hemisphere}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Celestial Area</span>
                <span class="d-value">${c.area}</span>
              </div>
            </div>

            <h4 class="section-subtitle">Mythology & Cultural Origin</h4>
            <p class="mythology-narrative">${c.mythology}</p>
          </div>

          <!-- Tab 2: Major Stars -->
          <div class="modal-tab-content" id="tab-c-stars">
            <h4 class="section-subtitle">Principal Bright Stars</h4>
            <div class="stars-table-container">
              <table class="stars-table">
                <thead>
                  <tr>
                    <th>Star Name</th>
                    <th>Bayer</th>
                    <th>Magnitude</th>
                    <th>Spectral Class</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  ${c.majorStars.map(s => `
                    <tr>
                      <td class="star-name-cell"><strong>${s.name}</strong></td>
                      <td>${s.bayer}</td>
                      <td><span class="mag-badge">${s.magnitude}</span></td>
                      <td>${s.spectralType}</td>
                      <td>${s.distance}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Tab 3: Best Viewing -->
          <div class="modal-tab-content" id="tab-c-viewing">
            <h4 class="section-subtitle">Observation Guide</h4>
            <div class="viewing-guide-card">
              <div class="v-row">
                <span class="v-icon">📅</span>
                <div class="v-detail">
                  <strong>Best Months to Observe</strong>
                  <span>${c.bestViewing.months}</span>
                </div>
              </div>
              <div class="v-row">
                <span class="v-icon">⏰</span>
                <div class="v-detail">
                  <strong>Peak Viewing Hours</strong>
                  <span>${c.bestViewing.peakTime}</span>
                </div>
              </div>
              <div class="v-row">
                <span class="v-icon">🌐</span>
                <div class="v-detail">
                  <strong>Geographic Visibility</strong>
                  <span>Visible to observers ${c.bestViewing.latitudes}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 4: Deep Sky Objects & Facts -->
          <div class="modal-tab-content" id="tab-c-deepsky">
            <h4 class="section-subtitle">Notable Deep Sky Targets (Messier & Nebulae)</h4>
            <ul class="deepsky-list">
              ${c.deepSkyObjects.map(d => `
                <li class="deepsky-item">
                  <span class="ds-icon">🔭</span>
                  <span>${d}</span>
                </li>
              `).join('')}
            </ul>

            <h4 class="section-subtitle" style="margin-top: 1.5rem;">Fascinating Constellation Facts</h4>
            <ul class="facts-list">
              ${c.facts.map(f => `
                <li class="fact-item">
                  <span class="fact-bullet">✦</span>
                  <span class="fact-text">${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    // Hook up tab switches
    const tabBtns = this.contentContainer.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.contentContainer.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        const targetContent = this.contentContainer.querySelector(`#tab-${tabId}`);
        if (targetContent) targetContent.classList.add('active');
      });
    });

    // Hook up Audio Guide
    const audioBtn = this.contentContainer.querySelector('#btnAudioGuide');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (audioEngine.isSpeaking()) {
          audioEngine.stopSpeaking();
          audioBtn.classList.remove('playing');
          audioBtn.querySelector('.audio-text').textContent = 'Audio Lore';
          audioBtn.querySelector('.audio-icon').textContent = '🎧';
        } else {
          audioBtn.classList.add('playing');
          audioBtn.querySelector('.audio-text').textContent = 'Stop Narration';
          audioBtn.querySelector('.audio-icon').textContent = '⏹';

          const narrationText = `${c.name}, ${c.englishName}. ${c.description} Mythology: ${c.mythology}`;
          audioEngine.speak(narrationText, () => {
            audioBtn.classList.remove('playing');
            audioBtn.querySelector('.audio-text').textContent = 'Audio Lore';
            audioBtn.querySelector('.audio-icon').textContent = '🎧';
          });
        }
      });
    }

    // Image fallback handling
    const cPhotoImg = this.contentContainer.querySelector('.visual-photo-img');
    if (cPhotoImg) {
      attachImageFallback(cPhotoImg, c.name, 'constellation');
    }

    // Start Constellation Canvas
    const canvasEl = this.contentContainer.querySelector('#modalCelestialCanvas');
    if (canvasEl) {
      this.canvasInstance = new CelestialCanvas(canvasEl, 'constellation');
      this.canvasInstance.start(c, 'constellation');
    }
  }

  getWeightSensation(ratio) {
    if (ratio > 20) return "⚠️ Immense gravitational crush! Your body would be flattened instantly by superhuman pressure.";
    if (ratio > 2.0) return "🏋️ Severe heavy gravity! You would feel more than twice your normal weight; standing upright would require extreme physical effort.";
    if (ratio > 1.05) return "🏃 Slightly heavier than Earth! You would feel a noticeable tug, making running and jumping slightly more strenuous.";
    if (ratio > 0.8) return "🌍 Very close to Earth gravity! Walking and moving would feel almost indistinguishable from home.";
    if (ratio > 0.3) return "🦘 Low Martian gravity! You could effortlessly leap 3 times higher than on Earth and carry heavy equipment with ease.";
    if (ratio > 0.1) return "🌙 Bouncy lunar gravity! You would bound across the landscape in slow-motion buoyant giant leaps.";
    return "🚀 Near microgravity! You would float with the slightest push of a finger, requiring handrails to anchor yourself.";
  }
}
