// ASTRAVERSE 2.0 - Expanded Deep-Dive Modal Inspector
// Renders the comprehensive detail view for Astronomical Objects and Constellations

import { CelestialCanvas } from './celestialCanvas.js';
import { audioEngine } from '../utils/audioSynthesizer.js';
import { isFavorite, toggleFavorite } from '../utils/storage.js';

export class ModalInspector {
  constructor(modalContainer) {
    this.modal = modalContainer;
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

  // --- RENDER ASTRONOMICAL ENTITY MODAL ---
  renderAstronomicalModal(item) {
    const isFav = isFavorite(item.id);
    const parentText = item.parentName ? (item.category === 'moon' ? `Orbits: ${item.parentName}` : `Part of: ${item.parentName}`) : 'The Cosmos';

    this.contentContainer.innerHTML = `
      <div class="modal-header-bar">
        <div class="m-title-group">
          <span class="m-badge category-${item.category}">${item.type}</span>
          <h2 class="m-title">${item.name}</h2>
          <span class="m-parent">${parentText}</span>
        </div>
        <div class="m-header-actions">
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
            <div class="visual-controls">
              <span class="visual-label">Real-Time Procedural Simulation</span>
              <span class="visual-sub">Live Shading & Rotation</span>
            </div>
          </div>

          <div class="visual-photo-card">
            <img src="${item.image}" alt="${item.name}" class="visual-photo-img" />
            <span class="photo-badge">NASA / ESA Deep Sky Imagery</span>
          </div>
        </div>

        <!-- Details & Data Column -->
        <div class="modal-info-column">
          <!-- Tab Navigation -->
          <div class="modal-tab-nav">
            <button class="tab-btn active" data-tab="overview">Overview</button>
            <button class="tab-btn" data-tab="specs">Physical & Orbit</button>
            <button class="tab-btn" data-tab="composition">Composition</button>
            <button class="tab-btn" data-tab="facts">Curiosities & Lore</button>
          </div>

          <!-- Tab 1: Overview -->
          <div class="modal-tab-content active" id="tab-overview">
            <p class="overview-description">${item.description}</p>

            <div class="data-matrix">
              <div class="data-item">
                <span class="d-label">Classification</span>
                <span class="d-value">${item.type}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Parent Celestial Body</span>
                <span class="d-value">${item.parentName || 'The Cosmos'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Estimated Age</span>
                <span class="d-value">${item.age || '4.5 Billion Years'}</span>
              </div>
              <div class="data-item">
                <span class="d-label">Average Temperature</span>
                <span class="d-value">${item.temperature || 'N/A'}</span>
              </div>
            </div>

            ${item.missions && item.missions.length > 0 ? `
              <div class="missions-section">
                <h4 class="section-subtitle">Pioneering Exploration Missions</h4>
                <div class="mission-tags">
                  ${item.missions.map(m => `<span class="mission-tag">🚀 ${m}</span>`).join('')}
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
              ${item.facts.map(f => `
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

    // Start Procedural Canvas
    const canvasEl = this.contentContainer.querySelector('#modalCelestialCanvas');
    if (canvasEl) {
      let renderType = 'planet';
      if (item.category === 'star') renderType = 'star';
      if (item.category === 'galaxy') renderType = 'galaxy';
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
