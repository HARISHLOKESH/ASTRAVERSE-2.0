// ASTRAVERSE 2.0 - Interactive Flashcard Renderer
// Generates responsive, 3D-tilt glassmorphic flashcards with quick metrics and drill-down shortcuts

import { isFavorite } from '../utils/storage.js';

export function createAstronomicalCard(item, onExplore, onDrillDown, onToggleFavorite) {
  const card = document.createElement('div');
  card.className = 'cosmic-card';
  card.dataset.id = item.id;
  card.dataset.category = item.category;

  const isFav = isFavorite(item.id);
  const parentTag = item.parentName ? (item.category === 'moon' ? `Orbits: ${item.parentName}` : `In: ${item.parentName}`) : 'The Cosmos';

  // Category Icon
  let icon = '🪐';
  if (item.category === 'universe') icon = '🌌';
  if (item.category === 'galaxy') icon = '🌀';
  if (item.category === 'system') icon = '☀️';
  if (item.category === 'star') icon = '✨';
  if (item.category === 'planet') icon = item.id === 'earth' ? '🌍' : '🪐';
  if (item.category === 'moon') icon = '🌙';

  const hasChildren = item.childrenIds && item.childrenIds.length > 0;
  const childrenCount = item.childrenIds ? item.childrenIds.length : 0;

  card.innerHTML = `
    <div class="card-glass-layer"></div>
    <div class="card-glare"></div>

    <div class="card-media">
      <img src="${item.image}" alt="${item.name}" loading="lazy" class="card-img" />
      <div class="card-gradient-overlay"></div>
      <span class="card-badge category-${item.category}">
        <span class="badge-icon">${icon}</span> ${item.type}
      </span>
      <button class="card-fav-btn ${isFav ? 'active' : ''}" title="${isFav ? 'Remove from favorites' : 'Save to favorites'}" aria-label="Favorite">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="${isFav ? '#ef4444' : 'none'}" stroke="${isFav ? '#ef4444' : '#e2e8f0'}" stroke-width="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
    </div>

    <div class="card-content">
      <div class="card-parent-tag">
        <span class="parent-dot" style="background-color: ${item.color || '#00f0ff'}"></span>
        <span class="parent-label">${parentTag}</span>
      </div>

      <h3 class="card-title">${item.name}</h3>
      <p class="card-tagline">${item.tagline || item.subtitle || ''}</p>

      <div class="card-quick-metrics">
        <div class="metric-chip">
          <span class="metric-label">Diameter</span>
          <span class="metric-value">${item.diameter ? item.diameter.split('(')[0].trim() : 'N/A'}</span>
        </div>
        <div class="metric-chip">
          <span class="metric-label">Distance</span>
          <span class="metric-value">${item.distance ? item.distance.split('(')[0].trim() : 'N/A'}</span>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn-explore" aria-label="View Details for ${item.name}">
          <span>View Details</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        ${hasChildren ? `
          <button class="btn-drilldown" title="Explore ${childrenCount} nested entities" aria-label="Explore nested entities of ${item.name}">
            <span>Enter (${childrenCount})</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </button>
        ` : ''}
      </div>
    </div>
  `;

  // 3D Tilt Interaction
  const handleMouseMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`;
    }
  };

  const handleMouseLeave = () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = 'transparent';
    }
  };

  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);

  // Click card or Explore button opens details
  card.addEventListener('click', (e) => {
    // Avoid triggering if clicked favorite or drilldown button
    if (e.target.closest('.card-fav-btn')) {
      e.stopPropagation();
      const favBtn = card.querySelector('.card-fav-btn');
      const newState = onToggleFavorite(item.id);
      favBtn.classList.toggle('active', newState);
      const svg = favBtn.querySelector('svg');
      svg.setAttribute('fill', newState ? '#ef4444' : 'none');
      svg.setAttribute('stroke', newState ? '#ef4444' : '#e2e8f0');
      favBtn.setAttribute('title', newState ? 'Remove from favorites' : 'Save to favorites');
      return;
    }

    if (e.target.closest('.btn-drilldown')) {
      e.stopPropagation();
      if (onDrillDown && hasChildren) {
        onDrillDown(item);
      }
      return;
    }

    if (onExplore) {
      onExplore(item);
    }
  });

  return card;
}

// Specialized Constellation Card
export function createConstellationCard(constellation, onSelect) {
  const card = document.createElement('div');
  card.className = 'constellation-card';
  card.dataset.id = constellation.id;

  const topStars = constellation.majorStars.slice(0, 3).map(s => s.name).join(', ');

  card.innerHTML = `
    <div class="card-glass-layer"></div>
    <div class="card-glare"></div>

    <div class="constellation-media">
      <img src="${constellation.image}" alt="${constellation.name} star field" loading="lazy" class="constellation-img" />
      <div class="constellation-gradient-overlay"></div>
      <span class="constellation-badge-top">
        <span class="c-symbol-icon">${constellation.symbol}</span> ${constellation.family || 'Constellation'}
      </span>
      <span class="constellation-stars-count">✨ ${constellation.stars ? constellation.stars.length : 7} Stars</span>
    </div>

    <div class="constellation-card-inner">
      <div class="constellation-symbol-halo">${constellation.symbol}</div>
      <div class="constellation-card-header">
        <span class="constellation-symbol">${constellation.symbol}</span>
        <div class="constellation-titles">
          <h3 class="constellation-name">${constellation.name}</h3>
          <span class="constellation-latin">${constellation.latinName} • "${constellation.englishName}"</span>
        </div>
      </div>

      <p class="constellation-desc">${constellation.tagline}</p>

      <div class="constellation-stars-preview">
        <span class="c-stars-label">🌟 Main Stars:</span>
        <span class="c-stars-list">${topStars}</span>
      </div>

      <div class="constellation-meta-row">
        <div class="c-meta-item">
          <span class="c-label">Best Season</span>
          <span class="c-val">${constellation.bestViewing.months.split(' ')[0]}</span>
        </div>
        <div class="c-meta-item">
          <span class="c-label">Location</span>
          <span class="c-val">${constellation.hemisphere.split(' ')[0]}</span>
        </div>
      </div>

      <div class="constellation-card-footer">
        <button class="btn-explore-constellation" aria-label="Explore star chart of ${constellation.name}">
          <span>Inspect Star Chart</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  // 3D Tilt Interaction for Constellation Cards
  const handleMouseMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.2) 0%, rgba(255,255,255,0) 65%)`;
    }
  };

  const handleMouseLeave = () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = 'transparent';
    }
  };

  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);

  card.addEventListener('click', () => {
    if (onSelect) onSelect(constellation);
  });

  return card;
}
