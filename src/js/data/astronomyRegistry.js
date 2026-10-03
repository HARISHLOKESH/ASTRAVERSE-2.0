// ASTRAVERSE 2.0 - Central Astronomy Catalog Registry & Scalable Query Engine
// High-performance indexed store with reusable finding, searching, filtering, and relational helpers

import { 
  createAstronomyObject, 
  createImageMetadata, 
  normalizeCategory,
  matchesCategory,
  ASTRONOMY_CATEGORIES 
} from './astronomySchema.js';

class AstronomyCatalogRegistry {
  constructor() {
    this.objectsById = new Map();
    this.objectsByCanonicalCategory = new Map();
    this.objectsByParent = new Map();
    this.nameAndAliasIndex = new Map(); // lowercase name/alias -> id
  }

  /**
   * Register a single astronomy object into the catalog
   */
  register(item) {
    if (!item || !item.id) return null;

    // Normalize into the scalable schema if not already normalized
    const normalized = item instanceof Object && item.__isNormalized 
      ? item 
      : createAstronomyObject(item);
    
    Object.defineProperty(normalized, '__isNormalized', { value: true, enumerable: false });

    // Store in primary ID index
    this.objectsById.set(normalized.id, normalized);

    // Index by canonical category
    const cat = normalized.category;
    if (!this.objectsByCanonicalCategory.has(cat)) {
      this.objectsByCanonicalCategory.set(cat, []);
    }
    const catList = this.objectsByCanonicalCategory.get(cat);
    if (!catList.some(o => o.id === normalized.id)) {
      catList.push(normalized);
    }

    // Index by parent relationship
    if (normalized.parentObject) {
      if (!this.objectsByParent.has(normalized.parentObject)) {
        this.objectsByParent.set(normalized.parentObject, []);
      }
      const parentList = this.objectsByParent.get(normalized.parentObject);
      if (!parentList.some(o => o.id === normalized.id)) {
        parentList.push(normalized);
      }
    }

    // Index by name and aliases for ultra-fast lookup
    this.nameAndAliasIndex.set(normalized.name.toLowerCase(), normalized.id);
    if (Array.isArray(normalized.aliases)) {
      normalized.aliases.forEach(alias => {
        this.nameAndAliasIndex.set(String(alias).toLowerCase(), normalized.id);
      });
    }

    return normalized;
  }

  /**
   * Register a collection of items
   */
  registerBatch(items) {
    if (!Array.isArray(items)) return [];
    return items.map(item => this.register(item)).filter(Boolean);
  }

  /**
   * O(1) Lookup by ID
   */
  get(id) {
    if (!id) return null;
    return this.objectsById.get(String(id).trim()) || null;
  }

  /**
   * Lookup by exact name or alias (case-insensitive)
   */
  getByName(name) {
    if (!name) return null;
    const clean = String(name).toLowerCase().trim();
    const id = this.nameAndAliasIndex.get(clean);
    return id ? this.get(id) : null;
  }

  /**
   * Get all registered objects
   */
  getAll() {
    return Array.from(this.objectsById.values());
  }

  /**
   * Get all objects belonging to a category (supports canonical or legacy key)
   */
  getByCategory(categoryKey) {
    const canonical = normalizeCategory(categoryKey);
    return this.objectsByCanonicalCategory.get(canonical) || [];
  }

  /**
   * Multi-criteria filtering
   */
  filter(criteria = {}) {
    let results = this.getAll();

    // Category filter using matchesCategory
    if (criteria.category && criteria.category !== 'all') {
      results = results.filter(item => matchesCategory(item.category, criteria.category));
    }

    // Subcategory filter
    if (criteria.subcategory) {
      const sub = criteria.subcategory.toLowerCase();
      results = results.filter(item => item.subcategory && item.subcategory.toLowerCase().includes(sub));
    }

    // Parent filter
    if (criteria.parentObject !== undefined) {
      results = results.filter(item => item.parentObject === criteria.parentObject || item.parentId === criteria.parentObject);
    }

    // Host star filter
    if (criteria.hostStar !== undefined) {
      const hs = String(criteria.hostStar).toLowerCase();
      results = results.filter(item => (item.hostStar && item.hostStar.toLowerCase().includes(hs)) || (item.hostStarName && item.hostStarName.toLowerCase().includes(hs)));
    }

    // Constellation filter
    if (criteria.constellation) {
      const con = criteria.constellation.toLowerCase();
      results = results.filter(item => item.constellation && item.constellation.toLowerCase().includes(con));
    }

    // Status filter
    if (criteria.status) {
      results = results.filter(item => item.status && item.status.toLowerCase() === criteria.status.toLowerCase());
    }

    // Source filter
    if (criteria.source) {
      const src = criteria.source.toLowerCase();
      results = results.filter(item => item.source && item.source.toLowerCase().includes(src));
    }

    // Tag filter
    if (criteria.tag) {
      const t = criteria.tag.toLowerCase();
      results = results.filter(item => item.tags && item.tags.includes(t));
    }

    // Image type filter
    if (criteria.imageType) {
      results = results.filter(item => item.imageType === criteria.imageType);
    }

    // Has children filter
    if (criteria.hasChildren !== undefined) {
      results = results.filter(item => {
        const has = Array.isArray(item.childObjects) && item.childObjects.length > 0;
        return criteria.hasChildren ? has : !has;
      });
    }

    // Custom predicate
    if (typeof criteria.predicate === 'function') {
      results = results.filter(criteria.predicate);
    }

    return results;
  }

  /**
   * Deep, relevance-weighted search across all entity fields
   */
  search(query, options = {}) {
    if (!query || !query.trim()) {
      return options.returnAllOnEmpty ? this.getAll() : [];
    }

    const q = query.toLowerCase().trim();
    const scored = [];

    for (const item of this.objectsById.values()) {
      let score = 0;

      // Exact name match
      if (item.name.toLowerCase() === q) {
        score += 100;
      } else if (item.name.toLowerCase().startsWith(q)) {
        score += 60;
      } else if (item.name.toLowerCase().includes(q)) {
        score += 40;
      }

      // Aliases match
      if (item.aliases && item.aliases.some(a => a.toLowerCase().includes(q))) {
        score += 35;
      }

      // ID match
      if (item.id === q) {
        score += 50;
      } else if (item.id.includes(q)) {
        score += 25;
      }

      // Subcategory / Classification match
      if (item.subcategory && item.subcategory.toLowerCase().includes(q)) {
        score += 30;
      }

      // Category match
      if (item.category && item.category.toLowerCase().includes(q)) {
        score += 20;
      }

      // Constellation / Location
      if (item.constellation && item.constellation.toLowerCase().includes(q)) {
        score += 20;
      }
      if (item.location && item.location.toLowerCase().includes(q)) {
        score += 15;
      }

      // Tags match
      if (item.tags && item.tags.some(t => t.includes(q))) {
        score += 20;
      }

      // Descriptions
      if (item.shortDescription && item.shortDescription.toLowerCase().includes(q)) {
        score += 15;
      } else if (item.description && item.description.toLowerCase().includes(q)) {
        score += 10;
      }

      // Scientific facts
      if (item.scientificFacts && item.scientificFacts.some(f => f.toLowerCase().includes(q))) {
        score += 8;
      }

      // Host star or parent
      if (item.hostStar && item.hostStar.toLowerCase().includes(q)) {
        score += 15;
      }
      if (item.parentName && item.parentName.toLowerCase().includes(q)) {
        score += 10;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    }

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Limit if requested
    if (options.limit && options.limit > 0) {
      return scored.slice(0, options.limit).map(s => s.item);
    }

    return scored.map(s => s.item);
  }

  /**
   * Resolves parent entity object
   */
  resolveParent(itemOrId) {
    const item = typeof itemOrId === 'string' ? this.get(itemOrId) : itemOrId;
    if (!item || !item.parentObject) return null;
    return this.get(item.parentObject);
  }

  /**
   * Resolves all child entity objects
   */
  resolveChildren(itemOrId) {
    const item = typeof itemOrId === 'string' ? this.get(itemOrId) : itemOrId;
    if (!item) return [];

    // First check childObjects array
    if (Array.isArray(item.childObjects) && item.childObjects.length > 0) {
      return item.childObjects.map(cid => this.get(cid)).filter(Boolean);
    }

    // Fall back to reverse parent index
    return this.objectsByParent.get(item.id) || [];
  }

  /**
   * Gets ancestor chain from root down to entity
   */
  getAncestors(itemOrId) {
    const item = typeof itemOrId === 'string' ? this.get(itemOrId) : itemOrId;
    if (!item) return [];

    const chain = [];
    let curr = item;
    const visited = new Set();

    while (curr && curr.parentObject && !visited.has(curr.id)) {
      visited.add(curr.id);
      const parent = this.get(curr.parentObject);
      if (parent) {
        chain.unshift(parent);
        curr = parent;
      } else {
        break;
      }
    }

    return chain;
  }

  /**
   * Resolves related objects across categories (with intelligent contextual fallback)
   */
  resolveRelatedObjects(itemOrId) {
    const item = typeof itemOrId === 'string' ? this.get(itemOrId) : itemOrId;
    if (!item) return [];

    // 1. Explicit relatedObjects
    if (Array.isArray(item.relatedObjects) && item.relatedObjects.length > 0) {
      const explicit = item.relatedObjects.map(rid => this.get(rid)).filter(Boolean);
      if (explicit.length > 0) return explicit;
    }

    // 2. Contextual fallback: siblings under same parentObject
    const parentId = item.parentObject || item.parentId;
    if (parentId && parentId !== 'universe') {
      const siblings = (this.objectsByParent.get(parentId) || [])
        .filter(o => o.id !== item.id)
        .slice(0, 6);
      if (siblings.length > 0) return siblings;
    }

    // 3. Contextual fallback: objects in the same constellation
    if (item.constellation) {
      const sameConstellation = this.getAll()
        .filter(o => o.id !== item.id && o.constellation === item.constellation)
        .slice(0, 4);
      if (sameConstellation.length > 0) return sameConstellation;
    }

    return [];
  }

  /**
   * Retrieves normalized image metadata
   */
  getImageMeta(itemOrId) {
    const item = typeof itemOrId === 'string' ? this.get(itemOrId) : itemOrId;
    if (!item) return createImageMetadata({}, {});
    return createImageMetadata(item.imageMeta, item);
  }
}

// Global Singleton Registry Instance
export const astronomyRegistry = new AstronomyCatalogRegistry();

// Export Top-Level Helper Functions
export const findObject = (id) => astronomyRegistry.get(id);
export const findObjectByName = (name) => astronomyRegistry.getByName(name);
export const filterObjects = (criteria) => astronomyRegistry.filter(criteria);
export const searchObjects = (query, options) => astronomyRegistry.search(query, options);
export const resolveParent = (itemOrId) => astronomyRegistry.resolveParent(itemOrId);
export const resolveChildren = (itemOrId) => astronomyRegistry.resolveChildren(itemOrId);
export const getAncestors = (itemOrId) => astronomyRegistry.getAncestors(itemOrId);
export const getRelatedObjects = (itemOrId) => astronomyRegistry.resolveRelatedObjects(itemOrId);
export const getImageMeta = (itemOrId) => astronomyRegistry.getImageMeta(itemOrId);
export const getAllObjects = () => astronomyRegistry.getAll();
export const getObjectsByCategory = (cat) => astronomyRegistry.getByCategory(cat);
