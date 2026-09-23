// ASTRAVERSE 2.0 - Main Application Controller
// Orchestrates cosmic hierarchy navigation, constellation star charts, search, audio, and modals

import { hierarchyData, getAstronomicalObject, getChildrenOf, getLevelForCategory, getObjectsByLevel } from './data/hierarchyData.js';
import { constellationsData } from './data/constellationsData.js';
import { StarfieldCanvas } from './components/starfieldCanvas.js';
import { createAstronomicalCard, createConstellationCard } from './components/cardRenderer.js';
import { ModalInspector } from './components/modalInspector.js';
import { ScaleComparator } from './components/scaleComparator.js';
import { audioEngine } from './utils/audioSynthesizer.js';
import { getFavorites, toggleFavorite } from './utils/storage.js';

class AstraverseApp {
  constructor() {
    this.currentMode = 'hierarchy'; // 'hierarchy' | 'constellations'
    this.currentParentId = 'universe';
    this.breadcrumbs = [{ id: 'universe', name: 'The Universe', level: 'universe' }];
    this.searchQuery = '';
    this.activeCategoryFilter = 'all';
    this.constellationHemisphereFilter = 'all';

    this.initDOM();
    this.initEngines();
    this.initEventListeners();
    this.render();
  }

  initDOM() {
    // Nav & Mode
    this.brandHomeBtn = document.getElementById('brandHomeBtn');
    this.modeHierarchyBtn = document.getElementById('btnModeHierarchy');
    this.modeConstellationsBtn = document.getElementById('btnModeConstellations');
    this.hierarchySection = document.getElementById('hierarchyExplorerSection');
    this.constellationsSection = document.getElementById('constellationsSection');

    // Breadcrumbs & Level Switcher
    this.breadcrumbContainer = document.getElementById('breadcrumbNav');
    this.levelButtons = document.querySelectorAll('.level-step-btn');

    // Search & Filter
    this.searchInput = document.getElementById('globalSearchInput');
    this.filterChips = document.querySelectorAll('.filter-chip');
    this.cardsGrid = document.getElementById('cosmicCardsGrid');
    this.currentLevelTitle = document.getElementById('currentLevelTitle');
    this.currentLevelCount = document.getElementById('currentLevelCount');

    // Constellations Grid & Filters
    this.constellationsGrid = document.getElementById('constellationsGrid');
    this.constellationFilterChips = document.querySelectorAll('.c-filter-chip');

    // Modals
    this.detailModalEl = document.getElementById('detailInspectorModal');
    this.scaleModalEl = document.getElementById('scaleComparatorModal');
    this.favoritesModalEl = document.getElementById('favoritesModal');

    // Buttons
    this.audioToggleBtn = document.getElementById('btnToggleAudio');
    this.randomObjectBtn = document.getElementById('btnRandomObject');
    this.scaleCompareBtn = document.getElementById('btnScaleCompare');
    this.favoritesBtn = document.getElementById('btnOpenFavorites');
    this.closeFavoritesBtn = document.getElementById('btnCloseFavorites');
    this.closeScaleBtn = document.getElementById('btnCloseScale');
  }

  initEngines() {
    // Starfield dynamic background
    const bgCanvas = document.getElementById('starfieldCanvas');
    if (bgCanvas) {
      this.starfield = new StarfieldCanvas(bgCanvas);
    }

    // Detail Modal Inspector with Drilldown and Parent Jump navigation
    this.modalInspector = new ModalInspector(
      this.detailModalEl,
      (drillItem) => this.drillDown(drillItem),
      (parentId) => this.navigateToEntity(parentId)
    );

    // Scale Comparator
    const scaleContainer = document.getElementById('scaleComparatorContainer');
    if (scaleContainer) {
      this.scaleComparator = new ScaleComparator(scaleContainer);
    }
  }

  initEventListeners() {
    // Brand Logo/Title click -> Go Home (The Universe)
    if (this.brandHomeBtn) {
      this.brandHomeBtn.addEventListener('click', () => this.goHome());
      this.brandHomeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goHome();
        }
      });
    }

    // Mode Switcher: Cosmic Hierarchy vs Constellations
    this.modeHierarchyBtn.addEventListener('click', () => this.switchMode('hierarchy'));
    this.modeConstellationsBtn.addEventListener('click', () => this.switchMode('constellations'));

    // Audio Drone Toggle
    this.audioToggleBtn.addEventListener('click', () => {
      const isMuted = audioEngine.toggleSound();
      this.audioToggleBtn.classList.toggle('active', !isMuted);
      const label = this.audioToggleBtn.querySelector('.btn-label');
      const icon = this.audioToggleBtn.querySelector('.audio-icon-sym');
      if (label) label.textContent = isMuted ? 'Sound: OFF' : 'Sound: ON';
      if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
    });

    // Random Discovery Button
    this.randomObjectBtn.addEventListener('click', () => this.openRandomObject());

    // Scale Comparator Modal Toggle
    this.scaleCompareBtn.addEventListener('click', () => {
      this.scaleModalEl.classList.add('active');
      audioEngine.playChime(500, 'sine', 0.05, 0.3);
    });
    this.closeScaleBtn.addEventListener('click', () => {
      this.scaleModalEl.classList.remove('active');
    });

    // Favorites Drawer Toggle
    this.favoritesBtn.addEventListener('click', () => this.openFavoritesModal());
    this.closeFavoritesBtn.addEventListener('click', () => {
      this.favoritesModalEl.classList.remove('active');
    });

    // Search Input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    // Category Filter Chips (Hierarchy)
    this.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.handleFilterSelect(chip.dataset.filter);
      });
    });

    // Constellation Hemisphere Filter Chips
    this.constellationFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.constellationFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.constellationHemisphereFilter = chip.dataset.filter;
        this.renderConstellations();
      });
    });

    // Level Step Buttons (Universe, Galaxies, Systems, Stars, Planets, Moons)
    this.levelButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLevel = btn.dataset.level;
        this.jumpToLevel(targetLevel);
      });
    });
  }

  goHome() {
    audioEngine.playLevelTransition();
    this.searchQuery = '';
    if (this.searchInput) this.searchInput.value = '';
    this.activeCategoryFilter = 'all';
    this.currentParentId = 'universe';
    this.breadcrumbs = [{ id: 'universe', name: 'The Universe', level: 'universe' }];
    this.switchMode('hierarchy');
  }

  switchMode(mode) {
    this.currentMode = mode;
    audioEngine.playLevelTransition();

    if (mode === 'hierarchy') {
      this.modeHierarchyBtn.classList.add('active');
      this.modeHierarchyBtn.setAttribute('aria-pressed', 'true');
      this.modeConstellationsBtn.classList.remove('active');
      this.modeConstellationsBtn.setAttribute('aria-pressed', 'false');
      this.hierarchySection.classList.add('active');
      this.constellationsSection.classList.remove('active');
      this.render();
    } else {
      this.modeConstellationsBtn.classList.add('active');
      this.modeConstellationsBtn.setAttribute('aria-pressed', 'true');
      this.modeHierarchyBtn.classList.remove('active');
      this.modeHierarchyBtn.setAttribute('aria-pressed', 'false');
      this.constellationsSection.classList.add('active');
      this.hierarchySection.classList.remove('active');
      this.renderBreadcrumbs();
      this.renderConstellations();
    }
  }

  handleFilterSelect(filter) {
    audioEngine.playChime(480, 'sine', 0.04, 0.2);

    if (filter === 'all') {
      this.activeCategoryFilter = 'all';
      if (this.currentParentId.startsWith('scale-')) {
        this.currentParentId = 'universe';
        this.breadcrumbs = [{ id: 'universe', name: 'The Universe', level: 'universe' }];
      }
      this.render();
      return;
    }

    const filterToLevel = {
      galaxy: 'galaxies',
      system: 'systems',
      star: 'stars',
      planet: 'planets',
      moon: 'moons'
    };

    if (this.searchQuery) {
      this.activeCategoryFilter = filter;
      this.render();
      return;
    }

    // Check if the current parent's children contain entities of this category
    const currentChildren = this.getItemsForCurrentContext();
    const hasCategory = currentChildren.some(item => item.category === filter);

    if (hasCategory) {
      this.activeCategoryFilter = filter;
      this.render();
    } else {
      // Directly jump to that scale level so the user gets what they asked for!
      const targetLevel = filterToLevel[filter] || 'universe';
      this.jumpToLevel(targetLevel);
    }
  }

  getItemsForCurrentContext() {
    if (this.currentParentId === 'scale-galaxies') return hierarchyData.galaxies;
    if (this.currentParentId === 'scale-systems') return hierarchyData.systems;
    if (this.currentParentId === 'scale-stars') return hierarchyData.stars;
    if (this.currentParentId === 'scale-planets') return hierarchyData.planets;
    if (this.currentParentId === 'scale-moons') return hierarchyData.moons;
    return getChildrenOf(this.currentParentId);
  }

  jumpToLevel(level) {
    audioEngine.playLevelTransition();

    // Switch back to hierarchy mode if in constellations
    if (this.currentMode !== 'hierarchy') {
      this.currentMode = 'hierarchy';
      this.modeHierarchyBtn.classList.add('active');
      this.modeHierarchyBtn.setAttribute('aria-pressed', 'true');
      this.modeConstellationsBtn.classList.remove('active');
      this.modeConstellationsBtn.setAttribute('aria-pressed', 'false');
      this.hierarchySection.classList.add('active');
      this.constellationsSection.classList.remove('active');
    }

    this.searchQuery = '';
    if (this.searchInput) this.searchInput.value = '';

    if (level === 'universe') {
      this.currentParentId = 'universe';
      this.breadcrumbs = [{ id: 'universe', name: 'The Universe', level: 'universe' }];
      this.activeCategoryFilter = 'all';
    } else if (level === 'galaxies') {
      this.currentParentId = 'scale-galaxies';
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: 'scale-galaxies', name: 'Galaxies', level: 'galaxies' }
      ];
      this.activeCategoryFilter = 'galaxy';
    } else if (level === 'systems') {
      this.currentParentId = 'scale-systems';
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: 'scale-systems', name: 'Solar Systems', level: 'systems' }
      ];
      this.activeCategoryFilter = 'system';
    } else if (level === 'stars') {
      this.currentParentId = 'scale-stars';
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: 'scale-stars', name: 'Stars', level: 'stars' }
      ];
      this.activeCategoryFilter = 'star';
    } else if (level === 'planets') {
      this.currentParentId = 'scale-planets';
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: 'scale-planets', name: 'Planets', level: 'planets' }
      ];
      this.activeCategoryFilter = 'planet';
    } else if (level === 'moons') {
      this.currentParentId = 'scale-moons';
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: 'scale-moons', name: 'Moons', level: 'moons' }
      ];
      this.activeCategoryFilter = 'moon';
    }

    this.render();
  }

  drillDown(item) {
    audioEngine.playLevelTransition();

    if (this.currentParentId.startsWith('scale-')) {
      this.navigateToEntity(item.id);
      return;
    }

    this.breadcrumbs.push({
      id: item.id,
      name: item.name,
      level: item.category
    });
    this.currentParentId = item.id;
    this.searchQuery = '';
    if (this.searchInput) this.searchInput.value = '';
    this.activeCategoryFilter = 'all';
    this.render();
  }

  navigateToEntity(id) {
    audioEngine.playLevelTransition();

    if (id === 'universe' || !id) {
      this.goHome();
      return;
    }

    const targetObj = getAstronomicalObject(id);
    if (!targetObj) return;

    // Build ancestor chain
    const chain = [targetObj];
    let curr = targetObj;
    while (curr && curr.parentId && curr.parentId !== 'universe') {
      curr = getAstronomicalObject(curr.parentId);
      if (curr) chain.unshift(curr);
    }

    this.breadcrumbs = [
      { id: 'universe', name: 'The Universe', level: 'universe' },
      ...chain.map(obj => ({
        id: obj.id,
        name: obj.name,
        level: obj.category
      }))
    ];

    this.currentParentId = id;
    this.searchQuery = '';
    if (this.searchInput) this.searchInput.value = '';
    this.activeCategoryFilter = 'all';
    this.switchMode('hierarchy');
  }

  navigateToBreadcrumb(index) {
    audioEngine.playLevelTransition();

    if (this.currentMode !== 'hierarchy') {
      this.switchMode('hierarchy');
    }

    this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    const targetCrumb = this.breadcrumbs[this.breadcrumbs.length - 1];
    this.currentParentId = targetCrumb.id;
    this.searchQuery = '';
    if (this.searchInput) this.searchInput.value = '';

    if (this.currentParentId === 'scale-galaxies') this.activeCategoryFilter = 'galaxy';
    else if (this.currentParentId === 'scale-systems') this.activeCategoryFilter = 'system';
    else if (this.currentParentId === 'scale-stars') this.activeCategoryFilter = 'star';
    else if (this.currentParentId === 'scale-planets') this.activeCategoryFilter = 'planet';
    else if (this.currentParentId === 'scale-moons') this.activeCategoryFilter = 'moon';
    else this.activeCategoryFilter = 'all';

    this.render();
  }

  renderBreadcrumbs() {
    this.breadcrumbContainer.innerHTML = '';

    if (this.currentMode === 'constellations') {
      // In Constellations mode, show path with Home link
      const homeEl = document.createElement('div');
      homeEl.className = 'breadcrumb-item';
      homeEl.innerHTML = `
        <button class="breadcrumb-btn" title="Return to Cosmic Home">The Universe</button>
        <span class="breadcrumb-separator">›</span>
      `;
      homeEl.querySelector('.breadcrumb-btn').addEventListener('click', () => {
        this.goHome();
      });
      this.breadcrumbContainer.appendChild(homeEl);

      const constEl = document.createElement('div');
      constEl.className = 'breadcrumb-item active';
      constEl.innerHTML = `
        <button class="breadcrumb-btn" disabled>Constellations Sky Chart</button>
      `;
      this.breadcrumbContainer.appendChild(constEl);

      this.levelButtons.forEach(btn => btn.classList.remove('active'));
      return;
    }

    // In Hierarchy mode, render each level
    this.breadcrumbs.forEach((crumb, idx) => {
      const isLast = idx === this.breadcrumbs.length - 1;
      const itemEl = document.createElement('div');
      itemEl.className = `breadcrumb-item ${isLast ? 'active' : ''}`;

      itemEl.innerHTML = `
        <button class="breadcrumb-btn" title="Go to ${crumb.name}">${crumb.name}</button>
        ${!isLast ? '<span class="breadcrumb-separator">›</span>' : ''}
      `;

      itemEl.querySelector('.breadcrumb-btn').addEventListener('click', () => {
        this.navigateToBreadcrumb(idx);
      });

      this.breadcrumbContainer.appendChild(itemEl);
    });

    // Update level buttons indicator
    let activeLevelKey = 'universe';
    if (this.currentParentId === 'scale-galaxies') activeLevelKey = 'galaxies';
    else if (this.currentParentId === 'scale-systems') activeLevelKey = 'systems';
    else if (this.currentParentId === 'scale-stars') activeLevelKey = 'stars';
    else if (this.currentParentId === 'scale-planets') activeLevelKey = 'planets';
    else if (this.currentParentId === 'scale-moons') activeLevelKey = 'moons';
    else if (this.currentParentId === 'universe') {
      activeLevelKey = 'universe';
    } else {
      const parentObj = getAstronomicalObject(this.currentParentId);
      if (parentObj) {
        if (parentObj.childrenLevel === 'systems' || parentObj.category === 'galaxy') activeLevelKey = 'systems';
        else if (parentObj.childrenLevel === 'stars-planets' || parentObj.category === 'system') activeLevelKey = 'planets';
        else if (parentObj.childrenLevel === 'moons' || parentObj.category === 'planet') activeLevelKey = 'moons';
        else activeLevelKey = parentObj.category;
      }
    }

    this.levelButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === activeLevelKey);
    });

    // Keep filter chips visual state synchronized
    this.filterChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === this.activeCategoryFilter);
    });
  }

  render() {
    if (this.currentMode !== 'hierarchy') return;

    this.renderBreadcrumbs();
    this.cardsGrid.innerHTML = '';

    let items = [];

    // If search active, search globally across all categories
    if (this.searchQuery) {
      items = this.searchAcrossCatalog(this.searchQuery);
      this.currentLevelTitle.textContent = `Search Results for "${this.searchQuery}"`;
      this.currentLevelCount.textContent = `${items.length} celestial objects found`;
    } 
    // Scale jumps
    else if (this.currentParentId === 'scale-galaxies') {
      items = hierarchyData.galaxies;
      this.currentLevelTitle.textContent = "Galaxies of the Universe";
      this.currentLevelCount.textContent = "6 major galaxies in the Local Universe";
    } else if (this.currentParentId === 'scale-systems') {
      items = hierarchyData.systems;
      this.currentLevelTitle.textContent = "Star & Planetary Systems";
      this.currentLevelCount.textContent = "5 stellar & planetary systems";
    } else if (this.currentParentId === 'scale-stars') {
      items = hierarchyData.stars;
      this.currentLevelTitle.textContent = "Stars & Stellar Luminaries";
      this.currentLevelCount.textContent = "5 stellar objects";
    } else if (this.currentParentId === 'scale-planets') {
      items = hierarchyData.planets;
      this.currentLevelTitle.textContent = "Planets & Exoplanets";
      this.currentLevelCount.textContent = "12 planetary bodies";
    } else if (this.currentParentId === 'scale-moons') {
      items = hierarchyData.moons;
      this.currentLevelTitle.textContent = "Moons & Natural Satellites";
      this.currentLevelCount.textContent = "10 celestial moons";
    } 
    // Hierarchical navigation
    else {
      items = getChildrenOf(this.currentParentId);
      const parentObj = getAstronomicalObject(this.currentParentId);
      const parentName = parentObj ? parentObj.name : 'The Observable Universe';
      this.currentLevelTitle.textContent = `Exploring: ${parentName}`;
      this.currentLevelCount.textContent = `${items.length} astronomical entities`;
    }

    // Apply category filter if active and not in dedicated scale view
    if (this.activeCategoryFilter !== 'all' && !this.currentParentId.startsWith('scale-')) {
      const filtered = items.filter(item => item.category === this.activeCategoryFilter);
      if (filtered.length > 0) {
        items = filtered;
        this.currentLevelCount.textContent = `${items.length} filtered entities`;
      }
    }

    if (items.length === 0) {
      this.cardsGrid.innerHTML = `
        <div class="empty-results-box">
          <span class="empty-icon">🔭</span>
          <h3>No Astronomical Entities Found</h3>
          <p>No objects match your current search or category filter. Try clearing your filters or navigating up the hierarchy.</p>
          <button class="btn-clear-search" id="btnClearSearch">Clear Search & Return Home</button>
        </div>
      `;
      const btn = document.getElementById('btnClearSearch');
      if (btn) {
        btn.addEventListener('click', () => {
          this.goHome();
        });
      }
      return;
    }

    // Render cards
    items.forEach(item => {
      const card = createAstronomicalCard(
        item,
        (selected) => this.modalInspector.open(selected, false),
        (drillItem) => this.drillDown(drillItem),
        (id) => toggleFavorite(id),
        (parentId) => this.navigateToEntity(parentId)
      );
      this.cardsGrid.appendChild(card);
    });
  }

  searchAcrossCatalog(query) {
    const all = [
      hierarchyData.universe,
      ...hierarchyData.galaxies,
      ...hierarchyData.systems,
      ...hierarchyData.stars,
      ...hierarchyData.planets,
      ...hierarchyData.moons
    ];

    return all.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(query);
      const typeMatch = item.type.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);
      const factMatch = item.facts ? item.facts.some(f => f.toLowerCase().includes(query)) : false;
      return nameMatch || typeMatch || descMatch || factMatch;
    });
  }

  // --- RENDER CONSTELLATIONS ---
  renderConstellations() {
    this.constellationsGrid.innerHTML = '';

    let list = constellationsData;
    if (this.constellationHemisphereFilter === 'northern') {
      list = list.filter(c => c.hemisphere.includes('Northern'));
    } else if (this.constellationHemisphereFilter === 'southern') {
      list = list.filter(c => c.hemisphere.includes('Southern'));
    } else if (this.constellationHemisphereFilter === 'zodiac') {
      list = list.filter(c => c.family === 'Zodiac');
    }

    list.forEach(c => {
      const card = createConstellationCard(c, (selected) => {
        this.modalInspector.open(selected, true);
      });
      this.constellationsGrid.appendChild(card);
    });
  }

  openRandomObject() {
    const all = [
      ...hierarchyData.galaxies,
      ...hierarchyData.systems,
      ...hierarchyData.stars,
      ...hierarchyData.planets,
      ...hierarchyData.moons
    ];
    const randomIndex = Math.floor(Math.random() * all.length);
    const item = all[randomIndex];
    this.modalInspector.open(item, false);
  }

  openFavoritesModal() {
    const favIds = getFavorites();
    const favListContainer = document.getElementById('favoritesListContainer');
    favListContainer.innerHTML = '';

    if (favIds.length === 0) {
      favListContainer.innerHTML = `
        <div class="empty-favs">
          <span class="empty-icon">⭐</span>
          <p>You haven't bookmarked any celestial objects yet.</p>
          <span class="sub-hint">Click the heart icon on any flashcard or inspector to save it here!</span>
        </div>
      `;
    } else {
      favIds.forEach(id => {
        const item = getAstronomicalObject(id);
        if (!item) return;

        const row = document.createElement('div');
        row.className = 'favorite-item-row';
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="fav-thumb" />
          <div class="fav-info">
            <h4 class="fav-name">${item.name}</h4>
            <span class="fav-type">${item.type}</span>
          </div>
          <div class="fav-row-actions">
            <button class="btn-fav-inspect" title="Inspect">🔭</button>
            <button class="btn-fav-remove" title="Remove bookmark">✕</button>
          </div>
        `;

        row.querySelector('.btn-fav-inspect').addEventListener('click', () => {
          this.favoritesModalEl.classList.remove('active');
          this.modalInspector.open(item, false);
        });

        row.querySelector('.btn-fav-remove').addEventListener('click', () => {
          toggleFavorite(item.id);
          this.openFavoritesModal();
          this.render(); // update card hearts
        });

        favListContainer.appendChild(row);
      });
    }

    this.favoritesModalEl.classList.add('active');
    audioEngine.playChime(520, 'sine', 0.05, 0.3);
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.astraverse = new AstraverseApp();
});
