// ASTRAVERSE 2.0 - Main Application Controller
// Orchestrates cosmic hierarchy navigation, constellation star charts, dedicated explorers, search, audio, and modals

import { 
  hierarchyData, 
  getAstronomicalObject, 
  getChildrenOf, 
  getLevelForCategory, 
  getObjectsByLevel, 
  getAllAstronomicalObjects,
  searchObjects,
  filterObjects,
  normalizeCategory,
  matchesCategory
} from './data/hierarchyData.js';
import { constellationsData } from './data/constellationsData.js';
import { spaceMissions } from './data/missionsData.js';
import { StarfieldCanvas } from './components/starfieldCanvas.js';
import { createAstronomicalCard, createConstellationCard } from './components/cardRenderer.js';
import { ModalInspector } from './components/modalInspector.js';
import { ScaleComparator } from './components/scaleComparator.js';
import { MilkyWayExplorer } from './components/milkyWayExplorer.js';
import { BlackHoleExplorer } from './components/blackHoleExplorer.js';
import { NebulaExplorer } from './components/nebulaExplorer.js';
import { ExoplanetExplorer } from './components/exoplanetExplorer.js';
import { KnowledgeSection } from './components/knowledgeSection.js';
import { TimelineScaleExplorer } from './components/timelineScaleExplorer.js';
import { MissionExplorer } from './components/missionExplorer.js';
import { audioEngine } from './utils/audioSynthesizer.js';
import { getFavorites, toggleFavorite } from './utils/storage.js';

class AstraverseApp {
  constructor() {
    this.currentMode = 'hierarchy'; // 'hierarchy' | 'milkyway' | 'blackholes' | 'exoplanets' | 'knowledge' | 'timeline' | 'missions' | 'constellations'
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
    // Nav & Mode Buttons
    this.brandHomeBtn = document.getElementById('brandHomeBtn');
    this.modeButtons = {
      hierarchy: document.getElementById('btnModeHierarchy'),
      milkyway: document.getElementById('btnModeMilkyWay'),
      blackholes: document.getElementById('btnModeBlackHoles'),
      nebulae: document.getElementById('btnModeNebulae'),
      exoplanets: document.getElementById('btnModeExoplanets'),
      knowledge: document.getElementById('btnModeKnowledge'),
      timeline: document.getElementById('btnModeTimeline'),
      missions: document.getElementById('btnModeMissions'),
      constellations: document.getElementById('btnModeConstellations')
    };

    // Sections
    this.sections = {
      hierarchy: document.getElementById('hierarchyExplorerSection'),
      milkyway: document.getElementById('milkyWaySection'),
      blackholes: document.getElementById('blackHoleSection'),
      nebulae: document.getElementById('nebulaeSection'),
      exoplanets: document.getElementById('exoplanetSection'),
      knowledge: document.getElementById('knowledgeSection'),
      timeline: document.getElementById('timelineScaleSection'),
      missions: document.getElementById('missionsSection'),
      constellations: document.getElementById('constellationsSection')
    };

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
    // Dynamic Starfield Background
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

    // Dedicated Explorers
    if (this.sections.milkyway) {
      this.milkyWayExplorer = new MilkyWayExplorer(
        this.sections.milkyway, 
        (item) => this.modalInspector.open(item, false)
      );
    }

    if (this.sections.blackholes) {
      this.blackHoleExplorer = new BlackHoleExplorer(
        this.sections.blackholes, 
        (item) => this.modalInspector.open(item, false)
      );
    }

    if (this.sections.nebulae) {
      this.nebulaExplorer = new NebulaExplorer(
        this.sections.nebulae,
        (item) => this.modalInspector.open(item, false)
      );
    }

    if (this.sections.exoplanets) {
      this.exoplanetExplorer = new ExoplanetExplorer(
        this.sections.exoplanets, 
        (item) => this.modalInspector.open(item, false)
      );
    }

    if (this.sections.knowledge) {
      this.knowledgeSection = new KnowledgeSection(
        this.sections.knowledge, 
        (item) => this.modalInspector.open(item, false)
      );
    }

    if (this.sections.timeline) {
      this.timelineScaleExplorer = new TimelineScaleExplorer(
        this.sections.timeline
      );
    }

    if (this.sections.missions) {
      this.missionExplorer = new MissionExplorer(
        this.sections.missions, 
        (item) => this.modalInspector.open(item, false)
      );
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

    // Mode Switcher Buttons
    Object.keys(this.modeButtons).forEach(modeKey => {
      const btn = this.modeButtons[modeKey];
      if (btn) {
        btn.addEventListener('click', () => this.switchMode(modeKey));
      }
    });

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

    // Global Search Input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      if (this.searchQuery && this.currentMode !== 'hierarchy') {
        this.switchMode('hierarchy');
      } else {
        this.render();
      }
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
    if (!this.sections[mode]) return;
    this.currentMode = mode;
    audioEngine.playLevelTransition();

    // Toggle active state on mode buttons and sections
    Object.keys(this.modeButtons).forEach(key => {
      const btn = this.modeButtons[key];
      if (btn) {
        const isActive = (key === mode);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      }
    });

    Object.keys(this.sections).forEach(key => {
      const sec = this.sections[key];
      if (sec) {
        sec.classList.toggle('active', key === mode);
      }
    });

    this.renderBreadcrumbs();

    if (mode === 'hierarchy') {
      this.render();
    } else if (mode === 'constellations') {
      this.renderConstellations();
    }
  }

  handleFilterSelect(filter) {
    audioEngine.playChime(480, 'sine', 0.04, 0.2);
    this.activeCategoryFilter = filter;

    if (this.currentMode !== 'hierarchy') {
      this.switchMode('hierarchy');
    }

    if (filter === 'all') {
      if (this.currentParentId.startsWith('scale-') || this.currentParentId.startsWith('category-')) {
        this.currentParentId = 'universe';
        this.breadcrumbs = [{ id: 'universe', name: 'The Universe', level: 'universe' }];
      }
      this.render();
      return;
    }

    if (this.searchQuery) {
      this.render();
      return;
    }

    // At top-level Universe (or when already browsing by category/scale),
    // selecting a category filter should display the full catalog across the cosmos!
    if (this.currentParentId === 'universe' || this.currentParentId.startsWith('category-') || this.currentParentId.startsWith('scale-')) {
      this.currentParentId = `category-${filter}`;
      const filterLabel = this.getCategoryLabel(filter);
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: `category-${filter}`, name: filterLabel, level: filter }
      ];
      this.render();
      return;
    }

    // When drilled into a specific entity (e.g. Milky Way, Solar System):
    // Check if the current scoped children contain entities of this category
    const currentChildren = this.getItemsForCurrentContext();
    const hasCategory = currentChildren.some(item => matchesCategory(item.category, filter));

    if (hasCategory) {
      this.render();
    } else {
      // Direct jump to this category across the cosmos
      this.currentParentId = `category-${filter}`;
      const filterLabel = this.getCategoryLabel(filter);
      this.breadcrumbs = [
        { id: 'universe', name: 'The Universe', level: 'universe' },
        { id: `category-${filter}`, name: filterLabel, level: filter }
      ];
      this.render();
    }
  }

  getCategoryLabel(filter) {
    const labels = {
      'galaxy': 'Galaxies',
      'galaxies': 'Galaxies',
      'black-hole': 'Black Holes',
      'black-holes': 'Black Holes',
      'system': 'Solar & Planetary Systems',
      'systems': 'Solar & Planetary Systems',
      'star': 'Stars & Remnants',
      'stars': 'Stars & Remnants',
      'nebula': 'Nebulae',
      'nebulae': 'Nebulae',
      'planet': 'Planets & Dwarf Planets',
      'planets': 'Planets & Dwarf Planets',
      'exoplanet': 'Exoplanets',
      'exoplanets': 'Exoplanets',
      'moon': 'Moons & Satellites',
      'moons': 'Moons & Satellites',
      'phenomenon': 'Space Phenomena',
      'phenomena': 'Space Phenomena'
    };
    return labels[filter] || filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getItemsForCurrentContext() {
    if (this.currentParentId.startsWith('category-')) {
      const cat = this.currentParentId.replace('category-', '');
      return getAllAstronomicalObjects().filter(o => matchesCategory(o.category, cat));
    }
    if (this.currentParentId === 'scale-galaxies') return hierarchyData.galaxies;
    if (this.currentParentId === 'scale-systems') return hierarchyData.systems;
    if (this.currentParentId === 'scale-stars') return hierarchyData.stars;
    if (this.currentParentId === 'scale-planets') return hierarchyData.planets;
    if (this.currentParentId === 'scale-moons') return hierarchyData.moons;
    return getChildrenOf(this.currentParentId);
  }

  jumpToLevel(level) {
    audioEngine.playLevelTransition();

    if (this.currentMode !== 'hierarchy') {
      this.switchMode('hierarchy');
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

    if (this.currentParentId.startsWith('scale-') || this.currentParentId.startsWith('category-')) {
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
    else if (this.currentParentId.startsWith('category-')) this.activeCategoryFilter = this.currentParentId.replace('category-', '');
    else this.activeCategoryFilter = 'all';

    this.render();
  }

  renderBreadcrumbs() {
    this.breadcrumbContainer.innerHTML = '';

    const modeTitles = {
      milkyway: 'Milky Way Observatory',
      blackholes: 'Black Hole Explorer',
      nebulae: 'Nebulae Stellar Nurseries',
      exoplanets: 'Exoplanet Systems',
      knowledge: 'Astrophysics Knowledge Base',
      timeline: 'Cosmic Timeline & Powers of 10',
      missions: 'Space Missions Fleet',
      constellations: 'Constellations Sky Chart'
    };

    if (this.currentMode !== 'hierarchy') {
      // In specialized explorer modes, show Home link + Current Mode title
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

      const modeEl = document.createElement('div');
      modeEl.className = 'breadcrumb-item active';
      modeEl.innerHTML = `
        <button class="breadcrumb-btn" disabled>${modeTitles[this.currentMode] || 'Cosmic Explorer'}</button>
      `;
      this.breadcrumbContainer.appendChild(modeEl);

      this.levelButtons.forEach(btn => btn.classList.remove('active'));
      return;
    }

    // In Hierarchy mode, render each crumb
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

    // Update quick level buttons indicator
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
        if (parentObj.childrenLevel === 'systems' || matchesCategory(parentObj.category, 'galaxy')) activeLevelKey = 'systems';
        else if (parentObj.childrenLevel === 'stars-planets' || matchesCategory(parentObj.category, 'system')) activeLevelKey = 'planets';
        else if (parentObj.childrenLevel === 'moons' || matchesCategory(parentObj.category, 'planet')) activeLevelKey = 'moons';
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
    // Category jump
    else if (this.currentParentId.startsWith('category-')) {
      const cat = this.currentParentId.replace('category-', '');
      items = getAllAstronomicalObjects().filter(o => matchesCategory(o.category, cat));
      const catLabel = this.getCategoryLabel(cat);
      this.currentLevelTitle.textContent = `${catLabel} of the Cosmos`;
      this.currentLevelCount.textContent = `${items.length} celestial objects`;
    }
    // Scale jumps
    else if (this.currentParentId === 'scale-galaxies') {
      items = hierarchyData.galaxies;
      this.currentLevelTitle.textContent = "Galaxies of the Universe";
      this.currentLevelCount.textContent = `${items.length} major galaxies in the Local Universe`;
    } else if (this.currentParentId === 'scale-systems') {
      items = hierarchyData.systems;
      this.currentLevelTitle.textContent = "Star & Planetary Systems";
      this.currentLevelCount.textContent = `${items.length} stellar & planetary systems`;
    } else if (this.currentParentId === 'scale-stars') {
      items = hierarchyData.stars;
      this.currentLevelTitle.textContent = "Stars & Stellar Remnants";
      this.currentLevelCount.textContent = `${items.length} stellar luminaries and compact remnants`;
    } else if (this.currentParentId === 'scale-planets') {
      items = hierarchyData.planets;
      this.currentLevelTitle.textContent = "Planets & Exoplanets";
      this.currentLevelCount.textContent = `${items.length} planetary bodies`;
    } else if (this.currentParentId === 'scale-moons') {
      items = hierarchyData.moons;
      this.currentLevelTitle.textContent = "Moons & Natural Satellites";
      this.currentLevelCount.textContent = `${items.length} celestial moons`;
    } 
    // Hierarchical navigation
    else {
      items = getChildrenOf(this.currentParentId);
      const parentObj = getAstronomicalObject(this.currentParentId);
      const parentName = parentObj ? parentObj.name : 'The Observable Universe';
      this.currentLevelTitle.textContent = `Exploring: ${parentName}`;
      this.currentLevelCount.textContent = `${items.length} astronomical entities`;
    }

    // Apply category filter if active and not in dedicated category view
    if (this.activeCategoryFilter !== 'all' && !this.currentParentId.startsWith('scale-') && !this.currentParentId.startsWith('category-')) {
      const filtered = items.filter(item => matchesCategory(item.category, this.activeCategoryFilter));
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
    return searchObjects(query);
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
    const all = getAllAstronomicalObjects();
    const randomIndex = Math.floor(Math.random() * all.length);
    const item = all[randomIndex];
    if (item) {
      this.modalInspector.open(item, false);
    }
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
