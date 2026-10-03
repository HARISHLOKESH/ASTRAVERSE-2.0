// ASTRAVERSE 2.0 - Image Metadata & Fallback System
// Standardizes authoritative astronomy imagery and ensures rock-solid fallbacks

export const IMAGE_TYPES = {
  REAL_OBSERVATION: 'REAL_OBSERVATION',
  SPACECRAFT_IMAGE: 'SPACECRAFT_IMAGE',
  TELESCOPE_IMAGE: 'TELESCOPE_IMAGE',
  ARTIST_CONCEPT: 'ARTIST_CONCEPT',
  SCIENTIFIC_ILLUSTRATION: 'SCIENTIFIC_ILLUSTRATION',
  DIAGRAM: 'DIAGRAM',
  CONCEPT_VISUALIZATION: 'CONCEPT_VISUALIZATION'
};

export const IMAGE_TYPE_LABELS = {
  REAL_OBSERVATION: { label: 'Real Observation', icon: '🔭', badgeClass: 'badge-real-obs' },
  SPACECRAFT_IMAGE: { label: 'Spacecraft Image', icon: '🛰️', badgeClass: 'badge-spacecraft' },
  TELESCOPE_IMAGE: { label: 'Telescope Image', icon: '🌌', badgeClass: 'badge-telescope' },
  ARTIST_CONCEPT: { label: "Artist's Concept", icon: '🎨', badgeClass: 'badge-artist-concept' },
  SCIENTIFIC_ILLUSTRATION: { label: 'Scientific Illustration', icon: '📐', badgeClass: 'badge-illustration' },
  DIAGRAM: { label: 'Diagram / Model', icon: '📊', badgeClass: 'badge-diagram' },
  CONCEPT_VISUALIZATION: { label: 'Visualization', icon: '✨', badgeClass: 'badge-visualization' }
};

/**
 * Returns standardized image metadata for any object, supporting both new
 * { url, type, credit, source, altText } and legacy { imageUrl, imageType, imageCredit, imageSource, altText }
 */
export function resolveImageMeta(item) {
  if (!item) {
    const fallbackSvg = generateCosmicFallbackSvg('Cosmos', 'universe');
    return {
      url: fallbackSvg,
      imageUrl: fallbackSvg,
      type: IMAGE_TYPES.CONCEPT_VISUALIZATION,
      imageType: IMAGE_TYPES.CONCEPT_VISUALIZATION,
      credit: 'ASTRAVERSE Space Engine',
      imageCredit: 'ASTRAVERSE Space Engine',
      source: 'NASA / STScI / ESA Archive',
      imageSource: 'NASA / STScI / ESA Archive',
      altText: 'Deep space cosmic entity'
    };
  }

  // If already has explicit imageMeta
  if (item.imageMeta) {
    const url = item.imageMeta.url || item.imageMeta.imageUrl || item.image || generateCosmicFallbackSvg(item.name, item.category);
    const type = item.imageMeta.type || item.imageMeta.imageType || deduceImageType(item);
    const credit = item.imageMeta.credit || item.imageMeta.imageCredit || deduceImageCredit(item);
    const source = item.imageMeta.source || item.imageMeta.imageSource || deduceImageSource(item);
    const altText = item.imageMeta.altText || `${item.name} (${item.subcategory || item.type || 'Celestial Entity'})`;
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

  // Deduce metadata from object properties
  const deducedType = deduceImageType(item);
  const credit = deduceImageCredit(item);
  const source = deduceImageSource(item);
  const url = item.image || generateCosmicFallbackSvg(item.name, item.category);

  return {
    url,
    imageUrl: url,
    type: deducedType,
    imageType: deducedType,
    credit,
    imageCredit: credit,
    source,
    imageSource: source,
    altText: `${item.name} — ${item.subcategory || item.type || 'Cosmic Body'}`
  };
}

function deduceImageType(item) {
  if (!item) return IMAGE_TYPES.CONCEPT_VISUALIZATION;

  // Exoplanet artist concepts
  if (item.category === 'exoplanet' || item.id?.includes('trappist-1') || item.id?.includes('kepler-') || item.id?.includes('toi-') || item.id?.includes('wasp-') || item.id?.includes('k2-')) {
    if (item.id === 'trappist-1-star') return IMAGE_TYPES.SCIENTIFIC_ILLUSTRATION;
    return IMAGE_TYPES.ARTIST_CONCEPT;
  }

  // Black hole event horizon images vs illustrations
  if (item.id === 'sagittarius-a' || item.id === 'm87-blackhole') {
    return IMAGE_TYPES.REAL_OBSERVATION;
  }
  if (item.category === 'black-hole' || item.category === 'blackHole') {
    return IMAGE_TYPES.SCIENTIFIC_ILLUSTRATION;
  }

  // Solar system bodies
  if (['earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'mercury', 'venus', 'pluto', 'europa', 'titan', 'io', 'ganymede', 'enceladus', 'mimas', 'triton', 'phobos', 'ceres', 'vesta', 'bennu'].includes(item.id)) {
    return IMAGE_TYPES.SPACECRAFT_IMAGE;
  }

  // Telescopic deep sky
  if (['galaxy', 'galaxies', 'galaxy-structures', 'nebula', 'nebulae', 'supernova-remnants', 'quasar', 'quasars', 'star', 'stars', 'pulsars', 'constellation', 'constellations'].includes(item.category)) {
    return IMAGE_TYPES.TELESCOPE_IMAGE;
  }

  if (['phenomenon', 'space-phenomena', 'active-galactic-nuclei', 'concept', 'astronomy-concepts', 'magnetars'].includes(item.category)) {
    return IMAGE_TYPES.SCIENTIFIC_ILLUSTRATION;
  }

  return IMAGE_TYPES.REAL_OBSERVATION;
}

function deduceImageCredit(item) {
  if (item.imageCredit) return item.imageCredit;
  if (item.id === 'sagittarius-a' || item.id === 'm87-blackhole') return 'EHT Collaboration / ALMA / ESO';
  if (item.id?.includes('trappist-1')) return 'NASA / JPL-Caltech';
  if (item.id?.includes('kepler-')) return 'NASA / Ames / JPL-Caltech';
  if (item.id?.includes('wasp-') || item.id?.includes('toi-')) return 'NASA / ESA / CSA / STScI';
  if (['earth', 'moon'].includes(item.id)) return 'NASA / Apollo & DSCOVR';
  if (['mars', 'phobos', 'deimos'].includes(item.id)) return 'NASA / JPL-Caltech / University of Arizona';
  if (['jupiter', 'io', 'europa', 'ganymede', 'callisto'].includes(item.id)) return 'NASA / JPL / Juno / Galileo';
  if (['saturn', 'titan', 'enceladus', 'mimas'].includes(item.id)) return 'NASA / JPL-Caltech / Space Science Institute (Cassini)';
  if (['pluto', 'charon'].includes(item.id)) return 'NASA / Johns Hopkins APL / SwRI (New Horizons)';
  if (['ceres', 'vesta'].includes(item.id)) return 'NASA / JPL-Caltech / UCLA / MPS / DLR / IDA (Dawn)';
  if (['galaxy', 'galaxies', 'nebula', 'nebulae', 'supernova-remnants'].includes(item.category)) return 'NASA / ESA / CSA / STScI (Hubble / JWST)';
  return 'NASA / ESA / Mission Science Team';
}

function deduceImageSource(item) {
  if (item.imageSource) return item.imageSource;
  if (item.category === 'exoplanet') return 'NASA Exoplanet Archive & Science Discovery';
  if (item.category === 'black-hole') return 'Event Horizon Telescope & NASA Chandra Archive';
  if (['earth', 'mars', 'jupiter', 'saturn', 'neptune', 'uranus'].includes(item.id)) return 'NASA Planetary Data System (PDS)';
  return 'NASA Images & STScI Deep Space Archive';
}

/**
 * Generates an astronomy-themed SVG data URI fallback
 */
export function generateCosmicFallbackSvg(title, category = 'cosmos') {
  const safeTitle = (title || 'Cosmic Entity').replace(/[<>&"]/g, '');
  const colors = {
    galaxy: ['#3b82f6', '#8b5cf6', '🌀'],
    star: ['#f59e0b', '#ef4444', '✨'],
    planet: ['#06b6d4', '#3b82f6', '🪐'],
    moon: ['#94a3b8', '#64748b', '🌙'],
    'black-hole': ['#a855f7', '#0f172a', '🕳️'],
    nebula: ['#ec4899', '#8b5cf6', '🌫️'],
    pulsar: ['#00f0ff', '#6366f1', '⚡'],
    quasar: ['#f97316', '#a855f7', '💫'],
    exoplanet: ['#10b981', '#06b6d4', '🌍'],
    phenomenon: ['#e11d48', '#9333ea', '⚡'],
    mission: ['#38bdf8', '#1e293b', '🛰️']
  };

  const [c1, c2, icon] = colors[category] || ['#00f0ff', '#4f46e5', '🌌'];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.35"/>
        <stop offset="60%" stop-color="${c2}" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#050814" stop-opacity="0.95"/>
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#03050c"/>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <circle cx="400" cy="270" r="140" fill="none" stroke="${c1}" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.4"/>
    <circle cx="400" cy="270" r="180" fill="none" stroke="${c2}" stroke-width="1" opacity="0.25"/>
    <text x="400" y="270" font-family="'Orbitron', -apple-system, sans-serif" font-size="72" text-anchor="middle" dominant-baseline="middle" filter="url(#glow)">${icon}</text>
    <text x="400" y="420" font-family="'Outfit', -apple-system, sans-serif" font-size="28" font-weight="700" fill="#f8fafc" text-anchor="middle">${safeTitle}</text>
    <text x="400" y="460" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#94a3b8" letter-spacing="2" text-anchor="middle">${(category || 'CELESTIAL').toUpperCase()} • ASTRAVERSE ARCHIVE</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Attaches a robust error listener to any image element to fallback gracefully
 */
export function attachImageFallback(imgElement, item) {
  if (!imgElement) return;

  const fallbackUrl = generateCosmicFallbackSvg(item?.name, item?.category);

  imgElement.addEventListener('error', function onImgError() {
    imgElement.removeEventListener('error', onImgError);
    imgElement.src = fallbackUrl;
    imgElement.classList.add('img-fallback-active');
  }, { once: true });
}
