// ASTRAVERSE 2.0 - Unified Cosmic Hierarchy Catalog & Scalable Registry
// Seamlessly integrates all 27 astronomy categories: Galaxies, Black Holes, Stars, Stellar Remnants,
// Nebulae, Solar System, Exoplanets, Space Phenomena, Missions, Constellations, and Concepts.

import { galaxiesData } from './galaxiesData.js';
import { blackHolesData } from './blackHolesData.js';
import { starsData } from './starsData.js';
import { nebulaeData } from './nebulaeData.js';
import { solarSystemData } from './solarSystemData.js';
import { exoplanetSystemsData } from './exoplanetsData.js';
import { phenomenaData } from './phenomenaData.js';
import { spaceMissions } from './missionsData.js';
import { constellationsData } from './constellationsData.js';
import { knowledgeTopics } from './knowledgeData.js';

import {
  ASTRONOMY_CATEGORIES,
  ASTRONOMY_SOURCES,
  IMAGE_TYPES,
  IMAGE_TYPE_LABELS,
  CATEGORY_GROUPS,
  createAstronomyObject,
  createImageMetadata,
  normalizeCategory,
  matchesCategory,
  deduceDistanceUnit
} from './astronomySchema.js';

import {
  astronomyRegistry,
  findObject,
  findObjectByName,
  filterObjects,
  searchObjects,
  resolveParent,
  resolveChildren,
  getAncestors,
  getRelatedObjects,
  getImageMeta,
  getAllObjects,
  getObjectsByCategory
} from './astronomyRegistry.js';

// Re-export Schema and Registry Helpers for global accessibility
export {
  ASTRONOMY_CATEGORIES,
  ASTRONOMY_SOURCES,
  IMAGE_TYPES,
  IMAGE_TYPE_LABELS,
  CATEGORY_GROUPS,
  createAstronomyObject,
  createImageMetadata,
  normalizeCategory,
  matchesCategory,
  deduceDistanceUnit,
  astronomyRegistry,
  findObject,
  findObjectByName,
  filterObjects,
  searchObjects,
  resolveParent,
  resolveChildren,
  getAncestors,
  getRelatedObjects,
  getImageMeta,
  getAllObjects,
  getObjectsByCategory
};

// 1. The Root Universe Entity (Migrated to Canonical Schema)
export const universeEntity = createAstronomyObject({
  id: "universe",
  name: "The Observable Universe",
  aliases: ["The Cosmos", "Observable Universe", "Hubble Volume"],
  type: "Cosmic Horizon",
  subcategory: "Cosmic Horizon",
  category: "universe",
  subtitle: "The totality of space, time, matter, and cosmic structure",
  shortDescription: "Home to an estimated 2 trillion galaxies and over 1 septillion stars across 93 billion light-years.",
  tagline: "Home to an estimated 2 trillion galaxies and over 1 septillion stars across 93 billion light-years.",
  parentObject: null,
  parentId: null,
  parentName: "The Cosmos",
  childrenLevel: "galaxies",
  childObjects: [
    "milky-way", "andromeda", "triangulum", "lmc", "smc",
    "sombrero", "whirlpool", "m87-galaxy", "pinwheel", "cigar-galaxy",
    "sagittarius-a", "orion-nebula", "pillars-of-creation",
    "supernova", "gravitational-waves-phenom", "cmb-phenom", "quasars-phenom"
  ],
  childrenIds: [
    "milky-way", "andromeda", "triangulum", "lmc", "smc",
    "sombrero", "whirlpool", "m87-galaxy", "pinwheel", "cigar-galaxy",
    "sagittarius-a", "orion-nebula", "pillars-of-creation",
    "supernova", "gravitational-waves-phenom", "cmb-phenom", "quasars-phenom"
  ],
  location: "Cosmic Web",
  diameter: "93.016 billion light-years (~8.8 × 10²⁶ m)",
  diameterKm: 8.8e23,
  distance: "0 ly (We are at the center of our observable sphere)",
  distanceUnit: "light-years",
  mass: "~1.5 × 10⁵³ kg (Ordinary baryonic matter)",
  massRelative: "2 Trillion+ Galaxies",
  gravity: 0,
  gravityRatio: 1,
  temperature: "2.725 K (-270.425 °C) [Cosmic Microwave Background]",
  age: "13.787 ± 0.020 billion years",
  orbitalPeriod: "N/A (Expanding at ~70 km/s/Mpc)",
  rotationPeriod: "Zero net cosmic rotation",
  status: "Observable Limit",
  source: "ESA Planck Observatory / NASA WMAP / Hubble",
  references: ["Hubble Space Telescope", "James Webb Space Telescope (JWST)", "Planck Observatory", "COBE", "WMAP", "Euclid Space Telescope"],
  missions: ["Hubble Space Telescope", "James Webb Space Telescope (JWST)", "Planck Observatory", "COBE", "WMAP", "Euclid Space Telescope"],
  composition: [
    { name: "Dark Energy (Cosmological Constant)", percentage: 68.3, color: "#9333ea" },
    { name: "Cold Dark Matter", percentage: 26.8, color: "#3b82f6" },
    { name: "Ordinary Atomic Matter (Atoms)", percentage: 4.9, color: "#00f0ff" }
  ],
  image: "/images/universe.jpg",
  imageMeta: {
    imageUrl: "/images/universe.jpg",
    url: "/images/universe.jpg",
    imageType: "TELESCOPE_IMAGE",
    type: "TELESCOPE_IMAGE",
    imageCredit: "NASA / ESA / Hubble Heritage Team",
    credit: "NASA / ESA / Hubble Heritage Team",
    imageSource: "Hubble Ultra Deep Field (HUDF)",
    source: "Hubble Ultra Deep Field (HUDF)",
    altText: "Thousands of ancient galaxies scattered across the deep space observable universe"
  },
  color: "#6366f1",
  description: "The observable universe is a spherical volume of spacetime extending 46.5 billion light-years in every direction from Earth. Light from beyond this horizon has not had sufficient time to reach us since the Big Bang 13.8 billion years ago. Dominated dynamically by Dark Energy and Dark Matter, the universe is woven into a gargantuan cosmic web of galaxy filaments and cosmic voids.",
  scientificFacts: [
    "The universe has no known center or physical boundary; every observer sits at the center of their own cosmic horizon.",
    "The oldest light in the cosmos, the Cosmic Microwave Background (CMB), was emitted when the universe was just 380,000 years old.",
    "Accelerating cosmic expansion is driven by Dark Energy, which accounts for approximately 68.3% of the total cosmic energy density.",
    "The observable universe contains roughly 2 trillion galaxies bound in giant gravitational superclusters and filaments."
  ],
  tags: ["universe", "cosmology", "big-bang", "cmb", "dark-energy", "dark-matter"]
});

// 2. Register all astronomical entities into the central scalable registry
astronomyRegistry.register(universeEntity);
astronomyRegistry.registerBatch(galaxiesData);
astronomyRegistry.registerBatch(blackHolesData);
astronomyRegistry.registerBatch(starsData);
astronomyRegistry.registerBatch(nebulaeData);
astronomyRegistry.registerBatch(solarSystemData);
astronomyRegistry.registerBatch(exoplanetSystemsData);
astronomyRegistry.registerBatch(phenomenaData);

// Also register Space Missions into Registry
if (Array.isArray(spaceMissions)) {
  spaceMissions.forEach(m => {
    astronomyRegistry.register(createAstronomyObject({
      id: m.id,
      name: m.name,
      category: "space-missions",
      subcategory: m.type || "Space Mission",
      agency: m.agency,
      source: m.agency || "NASA / ESA",
      launchYear: m.launchYear,
      status: m.status,
      target: m.target,
      orbit: m.orbit,
      description: m.purpose || "Pioneering astronomical exploration mission.",
      shortDescription: `${m.name} (${m.launchYear}) — ${m.status}`,
      scientificFacts: m.discoveries || [],
      references: [m.agency].filter(Boolean),
      image: m.image,
      imageMeta: m.imageMeta,
      tags: ["mission", "spacecraft", m.id, (m.agency || "").toLowerCase()]
    }));
  });
}

// Also register Constellations into Registry
if (Array.isArray(constellationsData)) {
  constellationsData.forEach(c => {
    astronomyRegistry.register(createAstronomyObject({
      id: c.id,
      name: c.name,
      aliases: [c.latinName, c.englishName].filter(Boolean),
      category: "constellations",
      subcategory: "Constellation",
      description: c.description || "IAU recognized constellation.",
      shortDescription: c.tagline || `${c.name} — ${c.englishName || c.family}`,
      scientificFacts: c.facts || [],
      constellation: c.name,
      location: c.hemisphere,
      coordinates: { ra: c.rightAscension, dec: c.declination },
      source: "International Astronomical Union (IAU)",
      references: ["IAU 88 Constellations Catalog"],
      image: c.image,
      imageMeta: {
        url: c.image,
        type: "TELESCOPE_IMAGE",
        credit: "ASTRAVERSE Sky Survey",
        source: "Deep Space Astrophotography",
        altText: `Constellation ${c.name} star chart`
      },
      tags: ["constellation", c.id, c.name.toLowerCase(), (c.hemisphere || "").toLowerCase()],
      majorStars: c.majorStars,
      stars: c.stars,
      lines: c.lines,
      mythology: c.mythology,
      deepSkyObjects: c.deepSkyObjects
    }));
  });
}

// Also register Cosmic Knowledge Topics into Registry
if (Array.isArray(knowledgeTopics)) {
  knowledgeTopics.forEach(k => {
    const topicId = k.id === "universe" ? "concept-observable-universe" : (k.id === "solar-system" ? "concept-solar-system" : k.id);
    astronomyRegistry.register(createAstronomyObject({
      id: topicId,
      name: k.title,
      aliases: [k.title, k.id].filter(Boolean),
      category: "astronomy-concepts",
      subcategory: k.category || "Cosmic Knowledge",
      description: k.explanation || k.intro || "Foundational astrophysical topic.",
      shortDescription: k.tagline || k.intro,
      scientificFacts: k.keyFacts || [],
      relatedObjects: k.relatedObjects || [],
      source: "NASA Science / Astrophysics Data System",
      references: ["Astrophysical Journal", "NASA Science Directorate"],
      image: k.image,
      imageMeta: k.imageMeta,
      tags: ["concept", "knowledge", topicId, (k.category || "").toLowerCase()]
    }));
  });
}

// Backward-Compatible Filtered Arrays for Classic Views
const solarPlanets = solarSystemData.filter(item => 
  ['planet', 'planets', 'dwarf-planets', 'asteroids', 'comets'].includes(item.category)
);
const solarMoons = solarSystemData.filter(item => 
  ['moon', 'moons'].includes(item.category)
);
const solarSystems = solarSystemData.filter(item => 
  ['system', 'systems', 'solar-system', 'kuiper-belt', 'oort-cloud'].includes(item.category)
);

const exoplanetSystems = exoplanetSystemsData.filter(item => 
  ['system', 'systems', 'exoplanet-systems'].includes(item.category)
);
const exoplanetPlanets = exoplanetSystemsData.filter(item => 
  ['exoplanet', 'exoplanets'].includes(item.category)
);
const exoplanetStars = exoplanetSystemsData.filter(item => 
  ['star', 'stars'].includes(item.category)
);

const combinedSystems = [...solarSystems, ...exoplanetSystems];
const combinedStars = [...starsData, ...exoplanetStars];
const combinedPlanets = [...solarPlanets, ...exoplanetPlanets];
const combinedMoons = [...solarMoons];

// High-level catalog object (backward compatibility)
export const hierarchyData = {
  universe: universeEntity,
  galaxies: galaxiesData,
  systems: combinedSystems,
  stars: combinedStars,
  planets: combinedPlanets,
  moons: combinedMoons,
  blackHoles: blackHolesData,
  nebulae: nebulaeData,
  phenomena: phenomenaData,
  missions: spaceMissions,
  constellations: constellationsData,
  concepts: knowledgeTopics
};

/**
 * Retrieve any astronomical object by ID in O(1) time
 */
export function getAstronomicalObject(id) {
  if (!id) return null;
  return astronomyRegistry.get(id);
}

/**
 * Retrieve all child entities for a given parent ID
 */
export function getChildrenOf(parentId) {
  if (!parentId || parentId === "universe") {
    return [
      ...galaxiesData,
      astronomyRegistry.get('sagittarius-a') || blackHolesData[0],
      astronomyRegistry.get('m87-blackhole') || blackHolesData[1],
      astronomyRegistry.get('orion-nebula') || nebulaeData[0],
      astronomyRegistry.get('crab-nebula') || nebulaeData[3],
      astronomyRegistry.get('supernova') || phenomenaData[0],
      astronomyRegistry.get('gravitational-waves-phenom') || phenomenaData[2]
    ].filter(Boolean);
  }

  const parent = getAstronomicalObject(parentId);
  if (!parent) return [];

  const children = astronomyRegistry.resolveChildren(parent);
  if (children.length > 0) return children;

  if (parent.childrenIds && parent.childrenIds.length > 0) {
    return parent.childrenIds.map(id => getAstronomicalObject(id)).filter(Boolean);
  }

  return [];
}

/**
 * Human-readable label for any category
 */
export function getLevelForCategory(category) {
  if (!category) return "Cosmic Entities";
  const norm = normalizeCategory(category);
  for (const cat of Object.values(ASTRONOMY_CATEGORIES)) {
    if (cat.id === norm || cat.legacyKey === category) {
      return cat.name;
    }
  }
  return "Cosmic Entities";
}

/**
 * Returns all entities belonging to a specific scale level or category
 */
export function getObjectsByLevel(level) {
  if (!level) return galaxiesData;
  const norm = normalizeCategory(level);

  switch (norm) {
    case "universe":
      return [universeEntity];
    case "galaxies":
      return galaxiesData;
    case "systems":
    case "solar-system":
    case "exoplanet-systems":
      return combinedSystems;
    case "stars":
    case "stellar-evolution":
    case "neutron-stars":
    case "pulsars":
    case "magnetars":
      return combinedStars;
    case "planets":
    case "dwarf-planets":
    case "asteroids":
    case "comets":
      return combinedPlanets;
    case "moons":
      return combinedMoons;
    case "black-holes":
      return blackHolesData;
    case "nebulae":
    case "supernova-remnants":
      return nebulaeData;
    case "exoplanets":
      return exoplanetPlanets;
    case "space-phenomena":
    case "quasars":
    case "active-galactic-nuclei":
      return phenomenaData;
    case "space-missions":
      return spaceMissions;
    case "constellations":
      return constellationsData;
    case "astronomy-concepts":
      return knowledgeTopics;
    default:
      return galaxiesData;
  }
}

/**
 * Returns an un-nested flat array of every astronomical entity in the catalog
 */
export function getAllAstronomicalObjects() {
  return astronomyRegistry.getAll();
}
