// ASTRAVERSE 2.0 - Scalable Astronomy Data Foundation & Schema Engine
// Authoritative definitions for the 27 astronomical categories, authoritative sources, image metadata, and reusable object schema

/**
 * 1. THE 27 CANONICAL ASTRONOMY CATEGORIES
 */
export const ASTRONOMY_CATEGORIES = {
  UNIVERSE: {
    id: "universe",
    name: "Universe",
    singular: "Universe",
    icon: "🌌",
    level: "universe",
    description: "The totality of observable space, cosmic microwave background, large-scale structures, and cosmological horizon.",
    legacyKey: "universe"
  },
  GALAXIES: {
    id: "galaxies",
    name: "Galaxies",
    singular: "Galaxy",
    icon: "🌀",
    level: "galaxies",
    description: "Vast gravitationally bound systems of stars, gas, dust, dark matter halos, and central supermassive cores.",
    legacyKey: "galaxy"
  },
  GALAXY_STRUCTURES: {
    id: "galaxy-structures",
    name: "Galaxy Structures",
    singular: "Galaxy Structure",
    icon: "✨",
    level: "galaxies",
    description: "Internal galactic components including spiral arms, galactic bars, central bulges, stellar halos, and globular clusters.",
    legacyKey: "galaxy"
  },
  STARS: {
    id: "stars",
    name: "Stars",
    singular: "Star",
    icon: "⭐",
    level: "stars",
    description: "Self-luminous astronomical plasma spheres powered by core nuclear fusion across main-sequence, giant, and supergiant stages.",
    legacyKey: "star"
  },
  STELLAR_EVOLUTION: {
    id: "stellar-evolution",
    name: "Stellar Evolution",
    singular: "Stellar Evolution Stage",
    icon: "💫",
    level: "stars",
    description: "Transitional evolutionary phases including protostars, red giants, planetary nebula ejection phases, and white dwarfs.",
    legacyKey: "star"
  },
  BLACK_HOLES: {
    id: "black-holes",
    name: "Black Holes",
    singular: "Black Hole",
    icon: "🕳️",
    level: "stars",
    description: "Spacetime singularities bounded by event horizons, from stellar-mass to intermediate, supermassive, and ultramassive monsters.",
    legacyKey: "black-hole"
  },
  NEUTRON_STARS: {
    id: "neutron-stars",
    name: "Neutron Stars",
    singular: "Neutron Star",
    icon: "⚛️",
    level: "stars",
    description: "Ultra-dense degenerate stellar remnants supported by neutron degeneracy pressure following core-collapse supernovae.",
    legacyKey: "stellar-remnant"
  },
  PULSARS: {
    id: "pulsars",
    name: "Pulsars",
    singular: "Pulsar",
    icon: "⚡",
    level: "stars",
    description: "Rapidly rotating, highly magnetized neutron stars emitting beamed electromagnetic radiation like cosmic lighthouses.",
    legacyKey: "stellar-remnant"
  },
  MAGNETARS: {
    id: "magnetars",
    name: "Magnetars",
    singular: "Magnetar",
    icon: "🧲",
    level: "stars",
    description: "Extreme neutron stars characterized by magnetic fields exceeding 10¹¹ Tesla (10¹⁵ Gauss), driving violent high-energy flares.",
    legacyKey: "stellar-remnant"
  },
  NEBULAE: {
    id: "nebulae",
    name: "Nebulae",
    singular: "Nebula",
    icon: "🌫️",
    level: "galaxies",
    description: "Interstellar clouds of ionized, neutral, or molecular gas and cosmic dust, serving as stellar nurseries and chemical factories.",
    legacyKey: "nebula"
  },
  SUPERNOVA_REMNANTS: {
    id: "supernova-remnants",
    name: "Supernova Remnants",
    singular: "Supernova Remnant",
    icon: "💥",
    level: "galaxies",
    description: "Expanding shockwave shells and enriched filamentary debris clouds bounded by interstellar blastwaves from stellar detonations.",
    legacyKey: "nebula"
  },
  QUASARS: {
    id: "quasars",
    name: "Quasars",
    singular: "Quasar",
    icon: "🔮",
    level: "galaxies",
    description: "Extremely luminous active galactic nuclei powered by supermassive black hole accretion disks outshining their host galaxies.",
    legacyKey: "phenomenon"
  },
  ACTIVE_GALACTIC_NUCLEI: {
    id: "active-galactic-nuclei",
    name: "Active Galactic Nuclei",
    singular: "Active Galactic Nucleus (AGN)",
    icon: "🌟",
    level: "galaxies",
    description: "Compact central energetic regions of galaxies powered by accretion disks, blazars, radio galaxies, and relativistic jets.",
    legacyKey: "galaxy"
  },
  SOLAR_SYSTEM: {
    id: "solar-system",
    name: "Solar System",
    singular: "Solar System",
    icon: "☀️",
    level: "systems",
    description: "Our gravitationally bound planetary system anchored by the Sun, encompassing all inner and outer worlds, debris belts, and comets.",
    legacyKey: "system"
  },
  PLANETS: {
    id: "planets",
    name: "Planets",
    singular: "Planet",
    icon: "🪐",
    level: "planets",
    description: "Major celestial bodies orbiting the Sun with sufficient mass for hydrostatic equilibrium that have cleared their orbital neighborhoods.",
    legacyKey: "planet"
  },
  DWARF_PLANETS: {
    id: "dwarf-planets",
    name: "Dwarf Planets",
    singular: "Dwarf Planet",
    icon: "🌑",
    level: "planets",
    description: "Bodies in direct orbit around the Sun possessing hydrostatic roundness but having not cleared their orbital zones.",
    legacyKey: "planet"
  },
  MOONS: {
    id: "moons",
    name: "Moons",
    singular: "Moon",
    icon: "🌙",
    level: "moons",
    description: "Natural satellites orbiting planets, dwarf planets, or minor planets across terrestrial, ocean world, and captured ice classes.",
    legacyKey: "moon"
  },
  ASTEROIDS: {
    id: "asteroids",
    name: "Asteroids",
    singular: "Asteroid",
    icon: "☄️",
    level: "planets",
    description: "Rocky and metallic minor planets primarily inhabiting the Main Asteroid Belt, Trojan swarms, and Near-Earth orbits.",
    legacyKey: "planet"
  },
  COMETS: {
    id: "comets",
    name: "Comets",
    singular: "Comet",
    icon: "☄️",
    level: "planets",
    description: "Volatile-rich icy small Solar System bodies that outgas glowing comas and plasma tails when warmed by solar proximity.",
    legacyKey: "planet"
  },
  KUIPER_BELT: {
    id: "kuiper-belt",
    name: "Kuiper Belt",
    singular: "Kuiper Belt",
    icon: "🧊",
    level: "systems",
    description: "Circumstellar disc extending beyond Neptune (30 to 55 AU) populated by hundreds of thousands of icy trans-Neptunian bodies.",
    legacyKey: "system"
  },
  OORT_CLOUD: {
    id: "oort-cloud",
    name: "Oort Cloud",
    singular: "Oort Cloud",
    icon: "❄️",
    level: "systems",
    description: "Theoretical spherical outer reservoir of billions to trillions of icy planetesimals surrounding the Solar System up to ~2 light-years.",
    legacyKey: "system"
  },
  EXOPLANET_SYSTEMS: {
    id: "exoplanet-systems",
    name: "Exoplanet Systems",
    singular: "Exoplanetary System",
    icon: "🔭",
    level: "systems",
    description: "Alien multi-planet or single-planet architectures orbiting distant stars across diverse spectral classifications.",
    legacyKey: "system"
  },
  EXOPLANETS: {
    id: "exoplanets",
    name: "Exoplanets",
    singular: "Exoplanet",
    icon: "🪐",
    level: "planets",
    description: "Planets orbiting stars other than the Sun, including terrestrial rocky worlds, super-Earths, mini-Neptunes, hot Jupiters, and Hycean worlds.",
    legacyKey: "exoplanet"
  },
  SPACE_PHENOMENA: {
    id: "space-phenomena",
    name: "Space Phenomena",
    singular: "Space Phenomenon",
    icon: "⚡",
    level: "galaxies",
    description: "High-energy cosmic events and structures including gravitational waves, cosmic microwave background, gamma-ray bursts, and auroras.",
    legacyKey: "phenomenon"
  },
  SPACE_MISSIONS: {
    id: "space-missions",
    name: "Space Missions",
    singular: "Space Mission",
    icon: "🚀",
    level: "systems",
    description: "Humanity's robotic and human spacecraft, space telescopes, orbiters, landers, and interstellar explorers advancing astronomical discovery.",
    legacyKey: "mission"
  },
  CONSTELLATIONS: {
    id: "constellations",
    name: "Constellations",
    singular: "Constellation",
    icon: "✨",
    level: "stars",
    description: "The 88 officially recognized IAU celestial star patterns dividing the celestial sphere, connecting stellar astrophotography and lore.",
    legacyKey: "constellation"
  },
  ASTRONOMY_CONCEPTS: {
    id: "astronomy-concepts",
    name: "Astronomy Concepts",
    singular: "Astronomy Concept",
    icon: "📚",
    level: "universe",
    description: "Fundamental astrophysical and cosmological principles, theories, laws of physics, and scientific observational methodologies.",
    legacyKey: "concept"
  }
};

/**
 * 2. AUTHORITATIVE SOURCES ARCHITECTURE
 */
export const ASTRONOMY_SOURCES = {
  NASA: {
    id: "NASA",
    name: "National Aeronautics and Space Administration",
    shortName: "NASA",
    url: "https://www.nasa.gov",
    badge: "🏛️ NASA"
  },
  NASA_SCIENCE: {
    id: "NASA_SCIENCE",
    name: "NASA Science Mission Directorate",
    shortName: "NASA Science",
    url: "https://science.nasa.gov",
    badge: "🔬 NASA Science"
  },
  NASA_JPL: {
    id: "NASA_JPL",
    name: "NASA Jet Propulsion Laboratory / Caltech",
    shortName: "NASA / JPL-Caltech",
    url: "https://www.jpl.nasa.gov",
    badge: "🚀 NASA / JPL"
  },
  NASA_EXOPLANET_ARCHIVE: {
    id: "NASA_EXOPLANET_ARCHIVE",
    name: "NASA Exoplanet Archive / Caltech-IPAC",
    shortName: "NASA Exoplanet Archive",
    url: "https://exoplanetarchive.ipac.caltech.edu",
    badge: "🪐 NASA Exoplanet Archive"
  },
  ESA: {
    id: "ESA",
    name: "European Space Agency",
    shortName: "ESA",
    url: "https://www.esa.int",
    badge: "🇪🇺 ESA"
  },
  ESO: {
    id: "ESO",
    name: "European Southern Observatory",
    shortName: "ESO",
    url: "https://www.eso.org",
    badge: "🔭 ESO"
  },
  STSCI: {
    id: "STSCI",
    name: "Space Telescope Science Institute (Hubble / JWST)",
    shortName: "STScI",
    url: "https://www.stsci.edu",
    badge: "🛰️ STScI"
  },
  EHT: {
    id: "EHT",
    name: "Event Horizon Telescope Collaboration",
    shortName: "EHT Collaboration",
    url: "https://eventhorizontelescope.org",
    badge: "🕳️ EHT"
  },
  LIGO_VIRGO: {
    id: "LIGO_VIRGO",
    name: "LIGO-Virgo-KAGRA Collaboration",
    shortName: "LIGO / Virgo",
    url: "https://www.ligo.caltech.edu",
    badge: "〰️ LIGO"
  },
  OFFICIAL_ARCHIVE: {
    id: "OFFICIAL_ARCHIVE",
    name: "Official International Astronomical Mission Archives",
    shortName: "Mission Archives",
    url: "https://www.iau.org",
    badge: "🌌 Official Mission Archives"
  }
};

/**
 * 3. REUSABLE IMAGE ARCHITECTURE & 7 OFFICIAL METADATA TYPES
 */
export const IMAGE_TYPES = {
  REAL_OBSERVATION: "REAL_OBSERVATION",
  SPACECRAFT_IMAGE: "SPACECRAFT_IMAGE",
  TELESCOPE_IMAGE: "TELESCOPE_IMAGE",
  ARTIST_CONCEPT: "ARTIST_CONCEPT",
  SCIENTIFIC_ILLUSTRATION: "SCIENTIFIC_ILLUSTRATION",
  DIAGRAM: "DIAGRAM",
  CONCEPT_VISUALIZATION: "CONCEPT_VISUALIZATION"
};

export const IMAGE_TYPE_LABELS = {
  REAL_OBSERVATION: { label: "Real Observation", icon: "🔭", badgeClass: "badge-real-obs" },
  SPACECRAFT_IMAGE: { label: "Spacecraft Image", icon: "🛰️", badgeClass: "badge-spacecraft" },
  TELESCOPE_IMAGE: { label: "Telescope Image", icon: "🌌", badgeClass: "badge-telescope" },
  ARTIST_CONCEPT: { label: "Artist Concept", icon: "🎨", badgeClass: "badge-artist-concept" },
  SCIENTIFIC_ILLUSTRATION: { label: "Scientific Illustration", icon: "📐", badgeClass: "badge-illustration" },
  DIAGRAM: { label: "Diagram / Model", icon: "📊", badgeClass: "badge-diagram" },
  CONCEPT_VISUALIZATION: { label: "Visualization", icon: "✨", badgeClass: "badge-visualization" }
};

/**
 * Normalizes image metadata to guarantee both { url, type, credit, source, altText }
 * and legacy { imageUrl, imageType, imageCredit, imageSource, altText } properties.
 */
export function createImageMetadata(input = {}, fallbackItem = {}) {
  const url = input.url || input.imageUrl || fallbackItem.image || "/images/universe.jpg";
  const type = input.type || input.imageType || deduceDefaultImageType(fallbackItem);
  const credit = input.credit || input.imageCredit || fallbackItem.imageCredit || "NASA / ESA / Mission Science Team";
  const source = input.source || input.imageSource || fallbackItem.imageSource || "Official Mission Archives";
  const altText = input.altText || fallbackItem.altText || `${fallbackItem.name || "Celestial Entity"} (${fallbackItem.type || fallbackItem.subcategory || "Cosmic Body"})`;

  return {
    url,
    imageUrl: url,
    type,
    imageType: type,
    credit,
    imageCredit: credit,
    source,
    imageSource: source,
    altText
  };
}

function deduceDefaultImageType(item = {}) {
  const id = (item.id || "").toLowerCase();
  const cat = (item.category || "").toLowerCase();

  if (id === "sagittarius-a" || id === "m87-blackhole") return IMAGE_TYPES.REAL_OBSERVATION;
  if (cat === "exoplanet" || cat === "exoplanets" || id.includes("trappist-1") || id.includes("kepler-")) return IMAGE_TYPES.ARTIST_CONCEPT;
  if (["earth", "moon", "mars", "jupiter", "saturn", "titan", "europa", "ganymede", "io", "enceladus", "pluto"].includes(id)) {
    return IMAGE_TYPES.SPACECRAFT_IMAGE;
  }
  if (cat === "galaxy" || cat === "galaxies" || cat === "nebula" || cat === "nebulae" || cat === "star" || cat === "stars") {
    return IMAGE_TYPES.TELESCOPE_IMAGE;
  }
  return IMAGE_TYPES.SCIENTIFIC_ILLUSTRATION;
}

/**
 * High-level category groups mapping broad filters to their constituent canonical categories
 */
export const CATEGORY_GROUPS = {
  "universe": ["universe"],
  "galaxy": ["galaxies", "galaxy-structures", "active-galactic-nuclei"],
  "galaxies": ["galaxies", "galaxy-structures", "active-galactic-nuclei"],
  "galaxy-structures": ["galaxy-structures"],
  "star": ["stars", "stellar-evolution", "neutron-stars", "pulsars", "magnetars"],
  "stars": ["stars", "stellar-evolution", "neutron-stars", "pulsars", "magnetars"],
  "stellar-evolution": ["stellar-evolution"],
  "black-hole": ["black-holes", "quasars", "active-galactic-nuclei"],
  "black-holes": ["black-holes", "quasars", "active-galactic-nuclei"],
  "neutron-stars": ["neutron-stars"],
  "pulsars": ["pulsars"],
  "magnetars": ["magnetars"],
  "nebula": ["nebulae", "supernova-remnants"],
  "nebulae": ["nebulae", "supernova-remnants"],
  "supernova-remnants": ["supernova-remnants"],
  "quasars": ["quasars"],
  "active-galactic-nuclei": ["active-galactic-nuclei"],
  "system": ["solar-system", "exoplanet-systems", "kuiper-belt", "oort-cloud"],
  "systems": ["solar-system", "exoplanet-systems", "kuiper-belt", "oort-cloud"],
  "solar-system": ["solar-system", "kuiper-belt", "oort-cloud"],
  "planet": ["planets", "dwarf-planets", "asteroids", "comets"],
  "planets": ["planets", "dwarf-planets", "asteroids", "comets"],
  "dwarf-planets": ["dwarf-planets"],
  "moon": ["moons"],
  "moons": ["moons"],
  "asteroids": ["asteroids"],
  "comets": ["comets"],
  "kuiper-belt": ["kuiper-belt"],
  "oort-cloud": ["oort-cloud"],
  "exoplanet-systems": ["exoplanet-systems"],
  "exoplanet": ["exoplanets"],
  "exoplanets": ["exoplanets"],
  "phenomenon": ["space-phenomena", "quasars", "active-galactic-nuclei"],
  "phenomena": ["space-phenomena", "quasars", "active-galactic-nuclei"],
  "space-phenomena": ["space-phenomena", "quasars", "active-galactic-nuclei"],
  "mission": ["space-missions"],
  "missions": ["space-missions"],
  "space-missions": ["space-missions"],
  "constellation": ["constellations"],
  "constellations": ["constellations"],
  "concept": ["astronomy-concepts"],
  "concepts": ["astronomy-concepts"],
  "astronomy-concepts": ["astronomy-concepts"]
};

/**
 * Normalizes category string to canonical category key
 */
export function normalizeCategory(catStr) {
  if (!catStr) return "universe";
  const s = String(catStr).toLowerCase().trim();

  // 1. Direct match with canonical category ID
  for (const cat of Object.values(ASTRONOMY_CATEGORIES)) {
    if (cat.id === s) {
      return cat.id;
    }
  }

  // 2. Direct canonical name or singular match
  for (const cat of Object.values(ASTRONOMY_CATEGORIES)) {
    if (cat.name.toLowerCase() === s || cat.singular.toLowerCase() === s) {
      return cat.id;
    }
  }

  // 3. Primary category mappings (ensure primary categories take precedence over subcategories)
  if (s === "universe" || s === "cosmos") return "universe";
  if (s === "galaxy" || s === "galaxies") return "galaxies";
  if (s === "galaxy-structure" || s === "galaxy-structures") return "galaxy-structures";
  if (s === "star" || s === "stars") return "stars";
  if (s === "stellar-evolution") return "stellar-evolution";
  if (s === "black-hole" || s === "blackhole" || s === "blackholes" || s === "black-holes") return "black-holes";
  if (s === "neutron-star" || s === "neutron-stars") return "neutron-stars";
  if (s === "pulsar" || s === "pulsars") return "pulsars";
  if (s === "magnetar" || s === "magnetars") return "magnetars";
  if (s === "nebula" || s === "nebulae") return "nebulae";
  if (s === "supernova-remnant" || s === "supernova-remnants") return "supernova-remnants";
  if (s === "quasar" || s === "quasars") return "quasars";
  if (s === "active-galactic-nuclei" || s === "agn" || s === "active-galactic-nucleus") return "active-galactic-nuclei";
  if (s === "solar-system" || s === "system" || s === "systems") return "solar-system";
  if (s === "planet" || s === "planets") return "planets";
  if (s === "dwarf-planet" || s === "dwarf-planets") return "dwarf-planets";
  if (s === "moon" || s === "moons") return "moons";
  if (s === "asteroid" || s === "asteroids" || s === "asteroid-belt") return "asteroids";
  if (s === "comet" || s === "comets") return "comets";
  if (s === "kuiper-belt") return "kuiper-belt";
  if (s === "oort-cloud") return "oort-cloud";
  if (s === "exoplanet-system" || s === "exoplanet-systems") return "exoplanet-systems";
  if (s === "exoplanet" || s === "exoplanets") return "exoplanets";
  if (s === "phenomenon" || s === "phenomena" || s === "space-phenomenon" || s === "space-phenomena") return "space-phenomena";
  if (s === "mission" || s === "missions" || s === "space-mission" || s === "space-missions") return "space-missions";
  if (s === "constellation" || s === "constellations") return "constellations";
  if (s === "concept" || s === "concepts" || s === "astronomy-concept" || s === "astronomy-concepts") return "astronomy-concepts";

  // 4. Fallback legacyKey match (primary first)
  for (const cat of Object.values(ASTRONOMY_CATEGORIES)) {
    if (cat.legacyKey === s) {
      return cat.id;
    }
  }

  return s;
}

/**
 * Checks if an item's category matches a target filter, either directly or via category grouping
 */
export function matchesCategory(itemCategory, targetFilter) {
  if (!targetFilter || targetFilter === 'all') return true;
  const itemNorm = normalizeCategory(itemCategory);
  const filterNorm = normalizeCategory(targetFilter);

  if (itemNorm === filterNorm) return true;
  if (itemCategory === targetFilter) return true;

  const group = CATEGORY_GROUPS[targetFilter] || CATEGORY_GROUPS[filterNorm];
  if (group && group.includes(itemNorm)) return true;

  return false;
}

/**
 * Deduces distance unit from distance string
 */
export function deduceDistanceUnit(distanceStr) {
  if (!distanceStr || typeof distanceStr !== 'string') return "N/A";
  const s = distanceStr.toLowerCase();
  if (s.includes("light-year") || s.includes("ly")) return "light-years";
  if (s.includes("au") || s.includes("astronomical unit")) return "AU";
  if (s.includes("kpc") || s.includes("kiloparsec")) return "kiloparsecs";
  if (s.includes("mpc") || s.includes("megaparsec")) return "megaparsecs";
  if (s.includes("parsec") || s.includes("pc")) return "parsecs";
  if (s.includes("million km")) return "million km";
  if (s.includes("km") || s.includes("kilometer")) return "km";
  return "custom";
}

/**
 * 4. UNIVERSAL ASTRONOMY OBJECT FACTORY & SCHEMA NORMALIZER
 * 
 * Creates a fully validated, backward-compatible, scalable Astronomy Object.
 * Preserves every existing field while normalizing to the new canonical schema.
 * Prevents forcing irrelevant fields onto objects (e.g. no orbital periods on galaxies).
 */
export function createAstronomyObject(raw = {}) {
  if (!raw || !raw.id) {
    throw new Error("Astronomy object must have at least an 'id' property.");
  }

  const id = String(raw.id).trim();
  const name = String(raw.name || id).trim();
  const category = normalizeCategory(raw.category || "universe");
  const subcategory = raw.subcategory || raw.type || "Astronomical Body";

  // Aliases (alternative catalog names, e.g. ["M87*", "Virgo A", "NGC 4486*"])
  const extractedAliases = [];
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch && parenMatch[1]) {
    extractedAliases.push(parenMatch[1].trim());
    const stripped = name.replace(/\s*\([^)]+\)/, '').trim();
    if (stripped && stripped !== name) {
      extractedAliases.push(stripped);
    }
  }

  const rawAliases = Array.isArray(raw.aliases) 
    ? raw.aliases 
    : (raw.alias ? [raw.alias] : []);

  const aliases = Array.from(new Set([...rawAliases, ...extractedAliases].filter(Boolean)));

  // Descriptions
  const description = raw.description || "Authoritative deep-space profile in the ASTRAVERSE catalog.";
  const shortDescription = raw.shortDescription || raw.tagline || raw.subtitle || "";

  // Facts
  const scientificFacts = Array.isArray(raw.scientificFacts)
    ? raw.scientificFacts
    : (Array.isArray(raw.facts) ? raw.facts : []);

  // Relational IDs
  const parentObject = raw.parentObject || raw.parentId || null;
  const parentName = raw.parentName || (parentObject ? null : "The Cosmos");
  const childObjects = Array.isArray(raw.childObjects)
    ? raw.childObjects
    : (Array.isArray(raw.childrenIds) ? raw.childrenIds : []);
  const relatedObjects = Array.isArray(raw.relatedObjects) ? raw.relatedObjects : [];

  // References and Missions
  const references = Array.isArray(raw.references)
    ? raw.references
    : (Array.isArray(raw.missions) ? raw.missions : []);

  // Primary Source
  const source = raw.source || raw.agency || "NASA / ESA / International Astrophysics Archives";

  // Status
  const status = raw.status || "Confirmed";

  // Tags
  const baseTags = [
    category,
    id,
    name.toLowerCase(),
    ...aliases.map(a => a.toLowerCase()),
    subcategory.toLowerCase()
  ];
  if (raw.constellation) baseTags.push(raw.constellation.toLowerCase());
  const tags = Array.from(new Set([
    ...baseTags,
    ...(Array.isArray(raw.tags) ? raw.tags.map(t => String(t).toLowerCase()) : [])
  ]));

  // Image Metadata Architecture
  const rawImageMeta = raw.imageMeta || {};
  const image = raw.image || rawImageMeta.imageUrl || rawImageMeta.url || `/images/${id}.jpg`;
  const imageMeta = createImageMetadata(
    {
      url: image,
      imageUrl: image,
      type: raw.imageType || rawImageMeta.imageType || rawImageMeta.type,
      imageType: raw.imageType || rawImageMeta.imageType || rawImageMeta.type,
      credit: raw.imageCredit || rawImageMeta.imageCredit || rawImageMeta.credit,
      imageCredit: raw.imageCredit || rawImageMeta.imageCredit || rawImageMeta.credit,
      source: raw.imageSource || rawImageMeta.imageSource || rawImageMeta.source,
      imageSource: raw.imageSource || rawImageMeta.imageSource || rawImageMeta.source,
      altText: raw.altText || rawImageMeta.altText || `${name} — ${subcategory}`
    },
    { id, name, type: subcategory, category, image }
  );

  // Construct Base Object with both new and legacy field getters
  const obj = {
    // Canonical Identification
    id,
    name,
    aliases,
    category,
    subcategory,
    type: subcategory, // legacy alias

    // Authoritative Descriptions
    description,
    shortDescription,
    tagline: shortDescription, // legacy alias
    subtitle: raw.subtitle || shortDescription, // legacy alias
    scientificFacts,
    facts: scientificFacts, // legacy alias

    // Relationships
    parentObject,
    parentId: parentObject, // legacy alias
    parentName,
    childObjects,
    childrenIds: childObjects, // legacy alias
    childrenLevel: raw.childrenLevel || (childObjects.length > 0 ? "entities" : "none"),
    relatedObjects,

    // Provenance & Scientific Attribution
    source,
    references,
    missions: references, // legacy alias
    tags,
    status,

    // Visuals & Imagery
    image: imageMeta.url,
    imageType: imageMeta.type,
    imageCredit: imageMeta.credit,
    imageSource: imageMeta.source,
    imageMeta,
    color: raw.color || "#38bdf8",

    // Selective Physical & Spatial Attributes (Preserve all existing without forcing irrelevant ones)
    ...(raw.location !== undefined ? { location: raw.location } : {}),
    ...(raw.distance !== undefined ? { distance: raw.distance } : {}),
    ...(raw.distanceUnit !== undefined ? { distanceUnit: raw.distanceUnit } : (raw.distance ? { distanceUnit: deduceDistanceUnit(raw.distance) } : {})),
    ...(raw.diameter !== undefined ? { diameter: raw.diameter } : {}),
    ...(raw.diameterKm !== undefined ? { diameterKm: raw.diameterKm } : {}),
    ...(raw.mass !== undefined ? { mass: raw.mass } : {}),
    ...(raw.massRelative !== undefined ? { massRelative: raw.massRelative } : {}),
    ...(raw.temperature !== undefined ? { temperature: raw.temperature } : {}),
    ...(raw.age !== undefined ? { age: raw.age } : {}),
    ...(raw.constellation !== undefined ? { constellation: raw.constellation } : {}),
    ...(raw.coordinates !== undefined ? { coordinates: raw.coordinates } : {}),
    ...(raw.discoveryYear !== undefined ? { discoveryYear: raw.discoveryYear } : {}),
    ...(raw.discoveryMethod !== undefined ? { discoveryMethod: raw.discoveryMethod } : {}),

    // Selective Orbital & Kinematic Attributes (Only where relevant)
    ...(raw.orbitalPeriod !== undefined ? { orbitalPeriod: raw.orbitalPeriod } : {}),
    ...(raw.rotationPeriod !== undefined ? { rotationPeriod: raw.rotationPeriod } : {}),
    ...(raw.gravity !== undefined ? { gravity: raw.gravity } : {}),
    ...(raw.gravityRatio !== undefined ? { gravityRatio: raw.gravityRatio } : {}),
    ...(raw.hostStar !== undefined ? { hostStar: raw.hostStar, hostStarName: raw.hostStarName || raw.hostStar } : (raw.hostStarName !== undefined ? { hostStar: raw.hostStarName, hostStarName: raw.hostStarName } : {})),
    ...(raw.semiMajorAxis !== undefined ? { semiMajorAxis: raw.semiMajorAxis } : {}),
    ...(raw.radius !== undefined ? { radius: raw.radius } : {}),
    ...(raw.equilibriumTemp !== undefined ? { equilibriumTemp: raw.equilibriumTemp } : {}),
    ...(raw.habitableZone !== undefined ? { habitableZone: raw.habitableZone } : {}),
    ...(raw.atmosphere !== undefined ? { atmosphere: raw.atmosphere } : {}),
    ...(raw.moons !== undefined ? { moons: raw.moons } : {}),
    ...(raw.rings !== undefined ? { rings: raw.rings } : {}),
    ...(raw.composition !== undefined ? { composition: raw.composition } : {}),

    // Selective Relativistic & Stellar Attributes (Only where relevant)
    ...(raw.schwarzschildRadius !== undefined ? { schwarzschildRadius: raw.schwarzschildRadius } : {}),
    ...(raw.eventHorizonRadius !== undefined ? { eventHorizonRadius: raw.eventHorizonRadius } : {}),
    ...(raw.spinParameter !== undefined ? { spinParameter: raw.spinParameter } : {}),
    ...(raw.spectralType !== undefined ? { spectralType: raw.spectralType } : {}),
    ...(raw.spectralClass !== undefined ? { spectralClass: raw.spectralClass } : {}),
    ...(raw.luminosity !== undefined ? { luminosity: raw.luminosity } : {}),
    ...(raw.nebulaType !== undefined ? { nebulaType: raw.nebulaType } : {}),

    // Mission-specific fields (Only where relevant)
    ...(raw.agency !== undefined ? { agency: raw.agency } : {}),
    ...(raw.launchYear !== undefined ? { launchYear: raw.launchYear } : {}),
    ...(raw.missionStatus !== undefined ? { missionStatus: raw.missionStatus } : (raw.status !== undefined ? { missionStatus: raw.status } : {})),
    ...(raw.target !== undefined ? { target: raw.target } : {}),
    ...(raw.orbit !== undefined ? { orbit: raw.orbit } : {}),
    ...(raw.purpose !== undefined ? { purpose: raw.purpose } : {}),
    ...(raw.discoveries !== undefined ? { discoveries: raw.discoveries } : {}),

    // Constellation-specific fields (Only where relevant)
    ...(raw.symbol !== undefined ? { symbol: raw.symbol } : {}),
    ...(raw.latinName !== undefined ? { latinName: raw.latinName } : {}),
    ...(raw.englishName !== undefined ? { englishName: raw.englishName } : {}),
    ...(raw.family !== undefined ? { family: raw.family } : {}),
    ...(raw.hemisphere !== undefined ? { hemisphere: raw.hemisphere } : {}),
    ...(raw.area !== undefined ? { area: raw.area } : {}),
    ...(raw.bestViewing !== undefined ? { bestViewing: raw.bestViewing } : {}),
    ...(raw.mythology !== undefined ? { mythology: raw.mythology } : {}),
    ...(raw.majorStars !== undefined ? { majorStars: raw.majorStars } : {}),
    ...(raw.deepSkyObjects !== undefined ? { deepSkyObjects: raw.deepSkyObjects } : {}),
    ...(raw.stars !== undefined ? { stars: raw.stars } : {}),
    ...(raw.lines !== undefined ? { lines: raw.lines } : {})
  };

  return obj;
}
