// ASTRAVERSE 2.0 - Cosmic Knowledge / Learn Section
// Interactive 19-topic educational library with deep scientific explanations, key facts, and related object inspection

import { knowledgeTopics, getKnowledgeTopic, getKnowledgeByCategory } from '../data/knowledgeData.js';
import { getAstronomicalObject } from '../data/hierarchyData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';
import { attachImageFallback, IMAGE_TYPE_LABELS } from '../utils/imageHelper.js';

export class KnowledgeSection {
  constructor(containerElement, onInspectObject) {
    this.container = containerElement;
    this.onInspect = onInspectObject;
    this.activeCategory = 'all';
    this.activeArticle = null;
    this.render();
  }

  render() {
    const categories = [
      { id: 'all', label: 'All Topics (19)' },
      { id: 'cosmology', label: 'Cosmology & Universe' },
      { id: 'galactic astronomy', label: 'Galaxies' },
      { id: 'stellar astrophysics', label: 'Stars & Supernovae' },
      { id: 'relativistic astrophysics', label: 'Black Holes & Waves' },
      { id: 'interstellar medium', label: 'Nebulae' },
      { id: 'compact objects', label: 'Neutron Stars & Pulsars' },
      { id: 'exoplanetary science', label: 'Exoplanets' },
      { id: 'planetary science', label: 'Solar System & Moons' },
      { id: 'small solar system bodies', label: 'Comets & Asteroids' },
      { id: 'astronautics & exploration', label: 'Space Missions' }
    ];

    const topics = getKnowledgeByCategory(this.activeCategory);

    this.container.innerHTML = `
      <div class="explorer-container">
        <!-- Hero Banner -->
        <div class="explorer-hero-banner" style="--banner-accent: rgba(0, 240, 255, 0.2);">
          <span class="banner-badge">📚 Cosmic Knowledge & Learn</span>
          <h2 class="banner-title">Astrophysics Knowledge Base</h2>
          <p class="banner-subtitle">
            An interactive encyclopedia exploring 19 foundational domains of cosmology, astrophysics, and space exploration.
            Dive deep into the physics of the Big Bang, stellar evolution, black holes, and the search for habitable worlds.
          </p>
        </div>

        <!-- Category Filter Pills -->
        <div class="filter-chips-wrap" style="margin-bottom: 0.5rem;" aria-label="Filter knowledge topics by domain">
          ${categories.map(c => `
            <button class="filter-chip ${c.id === this.activeCategory ? 'active' : ''}" data-knowledge-cat="${c.id}">
              ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- Topics Grid -->
        <div class="knowledge-grid" id="knowledgeCardsGrid">
          ${topics.map(t => {
            const typeInfo = IMAGE_TYPE_LABELS[t.imageMeta?.imageType] || IMAGE_TYPE_LABELS.TELESCOPE_IMAGE;
            return `
              <div class="knowledge-card" data-topic-id="${t.id}">
                <div class="knowledge-card-media">
                  <img src="${t.image}" alt="${t.title}" loading="lazy" class="knowledge-card-img" />
                  <span class="image-type-badge ${typeInfo.badgeClass}" style="position: absolute; top: 0.75rem; right: 0.75rem; z-index: 2;">
                    ${typeInfo.icon} ${typeInfo.label}
                  </span>
                </div>
                <div class="knowledge-card-body">
                  <span class="knowledge-tag">${t.category}</span>
                  <h3 class="knowledge-title">${t.title}</h3>
                  <p class="knowledge-intro">${t.intro}</p>
                  <div class="knowledge-footer">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">✦ ${t.keyFacts ? t.keyFacts.length : 4} Key Facts</span>
                    <button class="btn-read-knowledge">
                      <span>Read Topic</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Knowledge Article Reader Modal -->
      <div class="cosmic-modal-overlay" id="knowledgeArticleModal" role="dialog" aria-modal="true">
        <div class="modal-backdrop"></div>
        <div class="modal-dialog" style="max-width: 880px;">
          <button class="modal-close-btn" id="btnCloseKnowledgeArticle" aria-label="Close article">✕</button>
          <div class="modal-body-wrapper" id="knowledgeArticleContent"></div>
        </div>
      </div>
    `;

    this.initEventListeners();
  }

  initEventListeners() {
    // Category chips
    const chips = this.container.querySelectorAll('[data-knowledge-cat]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.activeCategory = chip.dataset.knowledgeCat;
        audioEngine.playChime(460, 'sine', 0.04, 0.2);
        this.render();
      });
    });

    // Topic card clicks
    const cards = this.container.querySelectorAll('.knowledge-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const topicId = card.dataset.topicId;
        const topic = getKnowledgeTopic(topicId);
        if (topic) {
          this.openArticleModal(topic);
        }
      });
    });

    // Attach image fallbacks
    this.container.querySelectorAll('.knowledge-card-img').forEach(img => {
      const card = img.closest('.knowledge-card');
      const topicId = card ? card.dataset.topicId : null;
      const topic = getKnowledgeTopic(topicId);
      attachImageFallback(img, topic);
    });

    // Article modal close handlers
    const modal = this.container.querySelector('#knowledgeArticleModal');
    const closeBtn = this.container.querySelector('#btnCloseKnowledgeArticle');
    const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeArticleModal());
    if (backdrop) backdrop.addEventListener('click', () => this.closeArticleModal());
  }

  openArticleModal(topic) {
    this.activeArticle = topic;
    audioEngine.playModalOpen();

    const modal = this.container.querySelector('#knowledgeArticleModal');
    const content = this.container.querySelector('#knowledgeArticleContent');
    const typeInfo = IMAGE_TYPE_LABELS[topic.imageMeta?.imageType] || IMAGE_TYPE_LABELS.TELESCOPE_IMAGE;

    const relatedObjList = (topic.relatedObjects || [])
      .map(id => getAstronomicalObject(id))
      .filter(Boolean);

    content.innerHTML = `
      <div class="modal-header-bar">
        <div class="m-title-group">
          <span class="m-badge" style="background: rgba(0, 240, 255, 0.15); color: var(--cyan-glow); border-color: rgba(0, 240, 255, 0.3);">
            ${topic.category}
          </span>
          <h2 class="m-title" style="font-size: 1.75rem;">${topic.title}</h2>
          <span class="m-parent">${topic.tagline}</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem 0 1rem;">
        <!-- Hero Visual Banner -->
        <div style="position: relative; width: 100%; height: 260px; border-radius: 16px; overflow: hidden; background: #03050c; border: 1px solid rgba(255,255,255,0.1);">
          <img src="${topic.image}" alt="${topic.title}" class="article-hero-img" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 1.5rem; background: linear-gradient(180deg, transparent 0%, rgba(3,5,12,0.9) 100%); display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 0.5rem;">
            <span class="image-type-badge ${typeInfo.badgeClass}">
              ${typeInfo.icon} ${typeInfo.label}
            </span>
            <span style="font-size: 0.75rem; color: #94a3b8; background: rgba(0,0,0,0.5); padding: 0.2rem 0.6rem; border-radius: 6px;">
              Credit: ${topic.imageMeta?.imageCredit || 'NASA / ESA / STScI'}
            </span>
          </div>
        </div>

        <!-- Introduction -->
        <div style="background: rgba(0, 240, 255, 0.05); border-left: 3px solid var(--cyan-glow); padding: 1rem 1.25rem; border-radius: 0 10px 10px 0;">
          <p style="font-size: 1.05rem; font-weight: 500; color: #f8fafc; line-height: 1.6;">
            ${topic.intro}
          </p>
        </div>

        <!-- Deeper Explanation -->
        <div>
          <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: #fff; margin-bottom: 0.75rem;">
            Scientific Deep-Dive
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">
            ${topic.explanation}
          </p>
        </div>

        <!-- Key Facts List -->
        ${topic.keyFacts && topic.keyFacts.length > 0 ? `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--cyan-glow); margin-bottom: 0.85rem;">
              ✦ Key Scientific Takeaways
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem;">
              ${topic.keyFacts.map(f => `
                <li style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; position: relative; padding-left: 1.25rem;">
                  <span style="position: absolute; left: 0; color: var(--cyan-glow);">✦</span>
                  ${f}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Related Astronomical Entities -->
        ${relatedObjList.length > 0 ? `
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 0.85rem;">
              🔭 Related Celestial Objects
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem;">
              ${relatedObjList.map(obj => `
                <div class="favorite-item-row btn-open-related-obj" data-obj-id="${obj.id}" style="cursor: pointer; padding: 0.6rem 0.85rem; border-radius: 10px;">
                  <img src="${obj.image}" alt="${obj.name}" class="fav-thumb" style="width: 38px; height: 38px;" />
                  <div class="fav-info">
                    <h5 class="fav-name" style="font-size: 0.85rem;">${obj.name}</h5>
                    <span class="fav-type" style="font-size: 0.75rem;">${obj.type}</span>
                  </div>
                  <button class="btn-fav-inspect" style="font-size: 0.75rem;">↗</button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Sources Section -->
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
          <span>Scientific Archive Source: <strong>${topic.imageMeta?.imageSource || 'NASA Science & ESA Space Science'}</strong></span>
          <span>Image Credit: <strong>${topic.imageMeta?.imageCredit || 'NASA / ESA / STScI'}</strong></span>
        </div>
      </div>
    `;

    // Attach fallback to hero image
    const heroImg = content.querySelector('.article-hero-img');
    if (heroImg) attachImageFallback(heroImg, topic);

    // Click handler on related objects to open in main detail modal
    content.querySelectorAll('.btn-open-related-obj').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.objId;
        const obj = getAstronomicalObject(id);
        if (obj && this.onInspect) {
          this.closeArticleModal();
          this.onInspect(obj);
        }
      });
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeArticleModal() {
    const modal = this.container.querySelector('#knowledgeArticleModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
