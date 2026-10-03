// ASTRAVERSE 2.0 - Cosmic Timeline & Powers of 10 Scale Explorer
// Interactive deep-time chronological timeline and interactive Powers of 10 logarithmic scale journey

import { cosmicTimelineEvents, cosmicScaleSteps } from '../data/timelineData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';

export class TimelineScaleExplorer {
  constructor(containerElement) {
    this.container = containerElement;
    this.activeSubView = 'timeline'; // 'timeline' | 'scale'
    this.timelineFilter = 'all';
    this.currentScaleIndex = 0; // 0 to 10
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(245, 158, 11, 0.25);">
          <span class="banner-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--gold-glow); border-color: rgba(245, 158, 11, 0.3);">
            ⏳ Cosmic Deep Time & Scale
          </span>
          <h2 class="banner-title">Cosmic Timeline & Scale Journey</h2>
          <p class="banner-subtitle">
            Traverse 13.8 billion years of cosmic evolution from the Big Bang singularity to the distant Heat Death,
            or journey across 27 orders of magnitude from human scale to the edge of the observable universe.
          </p>
        </div>

        <!-- Mode Toggle Bar -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
          <button class="mode-tab-btn ${this.activeSubView === 'timeline' ? 'active' : ''}" id="btnSubTimeline" style="padding: 0.65rem 1.5rem; font-size: 0.95rem;">
            <span>📅</span> 13.8-Billion-Year Cosmic Timeline
          </button>
          <button class="mode-tab-btn ${this.activeSubView === 'scale' ? 'active' : ''}" id="btnSubScale" style="padding: 0.65rem 1.5rem; font-size: 0.95rem;">
            <span>📏</span> Powers of 10 Scale Journey
          </button>
        </div>

        <!-- Sub-View 1: Cosmic Timeline -->
        <div id="subviewTimeline" style="display: ${this.activeSubView === 'timeline' ? 'block' : 'none'};">
          <!-- Timeline Category Filters -->
          <div class="filter-chips-wrap" style="justify-content: center; margin-bottom: 2rem;">
            <button class="filter-chip ${this.timelineFilter === 'all' ? 'active' : ''}" data-t-cat="all">All Epochs (16)</button>
            <button class="filter-chip ${this.timelineFilter === 'origins' ? 'active' : ''}" data-t-cat="origins">Big Bang & Origins</button>
            <button class="filter-chip ${this.timelineFilter === 'cosmic dawn' ? 'active' : ''}" data-t-cat="cosmic dawn">Cosmic Dawn & First Stars</button>
            <button class="filter-chip ${this.timelineFilter === 'galactic evolution' ? 'active' : ''}" data-t-cat="galactic evolution">Galactic Evolution</button>
            <button class="filter-chip ${this.timelineFilter === 'solar system' ? 'active' : ''}" data-t-cat="solar system">Solar System & Earth</button>
            <button class="filter-chip ${this.timelineFilter === 'future cosmos' ? 'active' : ''}" data-t-cat="future cosmos">Future Cosmos</button>
          </div>

          <!-- Vertical Timeline -->
          <div class="timeline-wrap">
            ${this.getFilteredEvents().map(ev => `
              <div class="timeline-node">
                <div class="timeline-dot"></div>
                <div class="timeline-box">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <div>
                      <span class="timeline-epoch-badge">${ev.epoch}</span>
                      <span class="timeline-time-ago">${ev.timeAgo}</span>
                    </div>
                    <span style="font-size: 1.5rem;">${ev.icon}</span>
                  </div>
                  <h3 style="font-family: var(--font-heading); font-size: 1.3rem; color: #fff; margin-bottom: 0.4rem;">
                    ${ev.title}
                  </h3>
                  <p style="font-size: 0.95rem; color: var(--cyan-glow); font-weight: 500; margin-bottom: 0.75rem;">
                    ${ev.summary}
                  </p>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    ${ev.description}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Sub-View 2: Powers of 10 Scale Journey -->
        <div id="subviewScale" style="display: ${this.activeSubView === 'scale' ? 'block' : 'none'};">
          <div class="scale-slider-card">
            <!-- Current Step Details -->
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="banner-badge" style="background: rgba(0, 240, 255, 0.15); color: var(--cyan-glow); border-color: rgba(0, 240, 255, 0.3); margin: 0;">
                Step ${this.currentScaleIndex + 1} of ${cosmicScaleSteps.length}
              </span>
              <span style="font-family: var(--font-brand); font-size: 1.1rem; color: #ffd700;">
                Magnitude: ${cosmicScaleSteps[this.currentScaleIndex].sizeScientific}
              </span>
            </div>

            <h3 style="font-family: var(--font-brand); font-size: 2rem; color: #fff; margin: 0.25rem 0;">
              ${cosmicScaleSteps[this.currentScaleIndex].icon} ${cosmicScaleSteps[this.currentScaleIndex].name}
            </h3>

            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; font-size: 0.95rem;">
              <div><span style="color: var(--text-muted);">Span:</span> <strong style="color: var(--cyan-glow);">${cosmicScaleSteps[this.currentScaleIndex].readableSize}</strong></div>
              <div><span style="color: var(--text-muted);">Relative Scale:</span> <strong style="color: #fff;">${cosmicScaleSteps[this.currentScaleIndex].factorComparison}</strong></div>
            </div>

            <!-- Dynamic Viewport Visual -->
            <div class="scale-viewport-box">
              <div style="font-size: 4rem; filter: drop-shadow(0 0 15px rgba(0,240,255,0.4));">
                ${cosmicScaleSteps[this.currentScaleIndex].icon}
              </div>
              <strong style="color: #f8fafc; font-size: 1.15rem;">
                ${cosmicScaleSteps[this.currentScaleIndex].object}
              </strong>
            </div>

            <p style="font-size: 1rem; color: var(--text-secondary); max-width: 650px; line-height: 1.6;">
              ${cosmicScaleSteps[this.currentScaleIndex].description}
            </p>

            <!-- Range Slider -->
            <input type="range" class="scale-range-input" id="scaleRangeSlider" 
                   min="0" max="${cosmicScaleSteps.length - 1}" value="${this.currentScaleIndex}" step="1" 
                   aria-label="Cosmic Scale Powers of Ten Slider" />

            <!-- Stepper Buttons -->
            <div class="scale-stepper-btn-row">
              ${cosmicScaleSteps.map((s, idx) => `
                <button class="scale-step-chip ${idx === this.currentScaleIndex ? 'active' : ''}" data-scale-step="${idx}">
                  ${s.icon} ${s.name.split(':')[0]}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  getFilteredEvents() {
    if (this.timelineFilter === 'all') return cosmicTimelineEvents;
    return cosmicTimelineEvents.filter(ev => ev.category.toLowerCase().includes(this.timelineFilter));
  }

  initEventListeners() {
    // Mode toggles
    const btnTimeline = this.container.querySelector('#btnSubTimeline');
    const btnScale = this.container.querySelector('#btnSubScale');

    if (btnTimeline) {
      btnTimeline.addEventListener('click', () => {
        this.activeSubView = 'timeline';
        audioEngine.playChime(500, 'sine', 0.04, 0.2);
        this.render();
      });
    }

    if (btnScale) {
      btnScale.addEventListener('click', () => {
        this.activeSubView = 'scale';
        audioEngine.playChime(540, 'sine', 0.04, 0.2);
        this.render();
      });
    }

    // Timeline category filters
    const filterChips = this.container.querySelectorAll('[data-t-cat]');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.timelineFilter = chip.dataset.tCat;
        audioEngine.playChime(480, 'sine', 0.04, 0.2);
        this.render();
      });
    });

    // Scale range slider
    const slider = this.container.querySelector('#scaleRangeSlider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.currentScaleIndex = parseInt(e.target.value, 10);
        audioEngine.playChime(300 + this.currentScaleIndex * 50, 'sine', 0.03, 0.15);
        this.render();
      });
    }

    // Scale chips
    const scaleChips = this.container.querySelectorAll('[data-scale-step]');
    scaleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.currentScaleIndex = parseInt(chip.dataset.scaleStep, 10);
        audioEngine.playChime(300 + this.currentScaleIndex * 50, 'sine', 0.04, 0.2);
        this.render();
      });
    });
  }
}
