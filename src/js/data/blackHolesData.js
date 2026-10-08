// ASTRAVERSE 2.0 - Black Holes & Relativistic Phenomena Catalog
// Authoritative relativistic astrophysics entries: Supermassive, Intermediate-Mass, Stellar-Mass, and Mergers

export const blackHolesData = [
  // ==========================================
  // 1. SUPERMASSIVE BLACK HOLES (SMBHs)
  // ==========================================
  {
    id: "sagittarius-a",
    name: "Sagittarius A* (Sgr A*)",
    type: "Supermassive Black Hole",
    category: "black-hole",
    subtitle: "The gravitational anchor at the heart of the Milky Way",
    parentId: "milky-way",
    parentName: "Milky Way Galaxy",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "44 million km (~0.3 AU, Event Horizon)",
    diameterKm: 44000000,
    distance: "26,673 ± 42 light-years (8.18 kpc from Earth)",
    mass: "4.154 ± 0.014 million Solar Masses (~8.26 × 10³⁶ kg)",
    massRelative: "4.15 Million M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Hawking Temperature: ~1.5 × 10⁻¹⁴ K",
    age: "~13.5 billion years",
    orbitalPeriod: "Central anchor of the Milky Way",
    rotationPeriod: "Near-extremal spin (a* ~ 0.90 ± 0.06)",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#a855f7" }
    ],
    image: "/images/sagittarius-a.jpg",
    imageMeta: {
      imageUrl: "/images/sagittarius-a.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "Event Horizon Telescope (EHT) Collaboration",
      imageSource: "First direct submillimeter interferometric image of Sgr A* (2022)",
      altText: "Glowing orange synchrotron ring surrounding the central dark shadow of Sagittarius A*"
    },
    color: "#a855f7",
    tagline: "The supermassive black hole at the center of our galaxy, directly imaged by the Event Horizon Telescope.",
    description: "Sagittarius A* is the supermassive black hole residing at the exact dynamical center of the Milky Way. Its presence was conclusively proven by tracking the tight relativistic orbits of the S-stars (notably star S2) over three decades, earning Reinhard Genzel and Andrea Ghez the 2020 Nobel Prize in Physics. In May 2022, the Event Horizon Telescope published the first direct image of Sgr A*, revealing a glowing ring of magnetized plasma orbiting the shadow at nearly the speed of light.",
    facts: [
      "The Schwarzschild radius of Sgr A* is approximately 12.3 million kilometers — smaller than the orbit of Mercury around the Sun.",
      "The star S2 orbits Sgr A* once every 16 years, reaching a pericenter velocity of ~7,700 km/s (nearly 3% the speed of light), displaying gravitational redshift and Schwarzschild precession predicted by General Relativity.",
      "Sgr A* currently consumes matter at a very quiescent rate (under 10⁻⁸ solar masses per year), releasing far less radiation than active quasars.",
      "Recent polarized EHT images revealed strong, spiraling magnetic field lines around Sgr A*, matching the polarization pattern seen in M87*."
    ],
    missions: ["Event Horizon Telescope (EHT)", "Chandra X-ray Observatory", "VLT (GRAVITY)", "Keck Observatory"]
  },
  {
    id: "m87-blackhole",
    name: "Messier 87* (M87*)",
    type: "Supermassive Black Hole",
    category: "black-hole",
    subtitle: "The cosmic titan: First black hole directly imaged in human history",
    parentId: "m87-galaxy",
    parentName: "Messier 87 (Virgo A)",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "38 billion km (~250 AU, Event Horizon)",
    diameterKm: 38000000000,
    distance: "53.5 million light-years (16.4 Mpc)",
    mass: "6.5 ± 0.7 billion Solar Masses (~1.3 × 10⁴⁰ kg)",
    massRelative: "6.5 Billion M☉ (1,500× larger than Sgr A*)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Hawking Temperature: ~1.0 × 10⁻¹⁷ K",
    age: "~13.2 billion years",
    orbitalPeriod: "Central anchor of galaxy Messier 87",
    rotationPeriod: "High Kerr spin parameter (a* > 0.9)",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#a855f7" }
    ],
    image: "/images/m87-blackhole.jpg",
    imageMeta: {
      imageUrl: "/images/m87-blackhole.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "Event Horizon Telescope (EHT) Collaboration / ESO",
      imageSource: "Historic 2019 direct interferometric image of M87*",
      altText: "Asymmetric bright orange crescent of relativistic plasma encircling the shadow of M87*"
    },
    color: "#f59e0b",
    tagline: "A 6.5-billion-solar-mass monster driving a 5,000-light-year relativistic jet across the Virgo Cluster.",
    description: "On April 10, 2019, the Event Horizon Telescope made scientific history by unveiling the first-ever direct image of a black hole: M87*, located at the core of giant elliptical galaxy Messier 87. Spanning 38 billion kilometers across its event horizon — larger than the entire orbit of Pluto — M87* is an ultramassive gravitational engine powering a relativistic plasma jet that shoots 5,000 light-years into intergalactic space.",
    facts: [
      "The shadow of M87* is approximately 2.6 times larger than its Schwarzschild radius due to extreme gravitational light bending.",
      "The event horizon alone is roughly 250 times the distance from the Sun to the Earth.",
      "The relativistic jet launched by M87* travels at over 99% the speed of light and appears to move at ~5 times the speed of light due to relativistic projection geometry.",
      "In 2021, polarized EHT images revealed the magnetic field structure at the edge of the event horizon, demonstrating how magnetic fields launch the jet."
    ],
    missions: ["Event Horizon Telescope (EHT)", "Hubble Space Telescope", "Chandra X-ray Observatory", "Very Large Array (VLA)"]
  },
  {
    id: "ton-618",
    name: "TON 618",
    type: "Ultramassive Black Hole & Hyperluminous Quasar",
    category: "quasars",
    subcategory: "Ultramassive Black Hole & Hyperluminous Quasar",
    subtitle: "One of the most massive single physical objects in the known universe",
    constellation: "Canes Venatici",
    parentId: "universe",
    parentName: "Canes Venatici",
    discoveryYear: 1957,
    discoveryMethod: "Tonantzintla Faint Blue Star Survey (Brault & Chavira)",
    source: "Sloan Digital Sky Survey (SDSS) / Tonantzintla",
    references: ["Astrophysical Journal", "SDSS Quasar Catalog", "NASA ADS"],
    childrenLevel: "none",
    childrenIds: [],
    diameter: "390 billion km (~2,600 AU / ~15 light-days)",
    diameterKm: 390000000000,
    distance: "18.2 billion light-years (comoving) / 10.8 Gly (light-travel)",
    mass: "66 billion Solar Masses (~1.3 × 10⁴¹ kg)",
    massRelative: "66 Billion M☉ (15,000× larger than Sgr A*)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Accretion Disk: Millions of Kelvin; Hawking Temp: ~10⁻¹⁸ K",
    age: "Light emitted 10.8 billion years ago (z = 2.219)",
    orbitalPeriod: "Central engine of hyperluminous quasar",
    rotationPeriod: "High relativistic spin rate",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#9333ea" }
    ],
    image: "/images/ton-618.png",
    imageMeta: {
      imageUrl: "/images/ton-618.png",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "Astronomical Relativistic Modeling",
      imageSource: "TON 618 Ultramassive Black Hole & Quasar Accretion Disk Model",
      altText: "Blinding relativistic quasar accretion disk swirling around ultramassive black hole TON 618"
    },
    color: "#9333ea",
    tagline: "Containing 66 billion times the mass of the Sun, its event horizon could swallow 40 solar systems side-by-side.",
    description: "TON 618 is a hyperluminous, broad-absorption-line, radio-loud quasar situated on the border of Canes Venatici and Coma Berenices. At its gravitational center lurks an ultramassive black hole with a calculated mass of 66 billion solar masses. Shining with a bolometric luminosity of 4 × 10⁴⁰ Watts — roughly 140 trillion times brighter than the Sun — it easily outshines all stars in the Milky Way combined by hundreds of times.",
    facts: [
      "The event horizon of TON 618 is so vast (390 billion kilometers across) that a beam of light traveling at 300,000 km/s would take over 15 days just to cross its diameter.",
      "The entire orbit of Neptune could fit inside its event horizon over 40 times side by side.",
      "Its mass was measured using Doppler broadening of the H-beta emission line from gas orbiting at thousands of kilometers per second in its broad-line region.",
      "It represents the theoretical upper physical mass limit for black holes (~50 to 100 billion M☉) before accretion self-regulates and cuts off."
    ],
    missions: ["Sloan Digital Sky Survey (SDSS)", "Hubble Space Telescope", "Chandra X-ray Observatory"]
  },
  {
    id: "oj-287",
    name: "OJ 287 (Binary SMBH)",
    type: "Binary Supermassive Black Hole BL Lac Object",
    category: "active-galactic-nuclei",
    subcategory: "Binary Supermassive Black Hole BL Lac Object",
    subtitle: "18.3-billion-solar-mass titan orbited by a 150-million-solar-mass companion",
    constellation: "Cancer",
    parentId: "universe",
    parentName: "Cancer",
    discoveryYear: 1891,
    discoveryMethod: "Photographic Optical Variability",
    source: "NASA Spitzer / Tuorla Observatory",
    references: ["Astrophysical Journal Letters", "Nature"],
    childrenLevel: "none",
    childrenIds: [],
    diameter: "108 billion km (Primary Event Horizon)",
    diameterKm: 108000000000,
    distance: "3.5 billion light-years (z = 0.306)",
    mass: "Primary: 18.3 Billion M☉; Secondary: 150 Million M☉",
    massRelative: "18.3 Billion M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Blazar emission: Millions of K",
    age: "~10 billion years",
    orbitalPeriod: "12-year precessing binary orbital resonance",
    rotationPeriod: "Primary Kerr spin: a* ~ 0.38",
    composition: [
      { name: "Binary Gravitational Singularity", percentage: 100, color: "#ec4899" }
    ],
    image: "/images/oj-287.jpg",
    imageMeta: {
      imageUrl: "/images/oj-287.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "NASA / JPL-Caltech / Spitzer Space Telescope",
      imageSource: "NASA Spitzer Space Telescope OJ 287 Binary Black Hole Flare Model (PIA23687)",
      altText: "Secondary black hole piercing through the colossal accretion disk of primary black hole OJ 287 creating a blinding flare"
    },
    color: "#ec4899",
    tagline: "A 12-year relativistic cosmic clock where a companion black hole punctures the main accretion disk twice per orbit.",
    description: "OJ 287 is one of the most famous binary supermassive black hole systems known. The primary black hole contains 18.3 billion solar masses, while a secondary 150-million-solar-mass black hole orbits it in an eccentric 12-year path. Twice per orbit, the secondary punches directly through the primary's massive accretion disk at relativistic velocities, producing colossal periodic double-peak thermal optical flares that confirm General Relativity's periastron precession to 39 degrees per orbit.",
    facts: [
      "The secondary black hole's orbit precesses by 39 degrees per cycle — compared to Mercury's precession of only 43 arcseconds per century!",
      "In 2019, NASA's Spitzer Space Telescope timed an OJ 287 impact flare to within 4 hours of theoretical General Relativity predictions.",
      "The collision heats disk plasma to hundreds of thousands of degrees, releasing flashes brighter than a trillion stars.",
      "The pair will merge in approximately 10,000 years, generating a cataclysmic flood of low-frequency gravitational waves."
    ],
    missions: ["Spitzer Space Telescope", "Swift Gamma-Ray Burst Mission", "Event Horizon Telescope (EHT)"]
  },
  {
    id: "centaurus-a-bh",
    name: "Centaurus A* (NGC 5128)",
    type: "Supermassive Black Hole & Radio Galaxy Core",
    category: "active-galactic-nuclei",
    subcategory: "Supermassive Black Hole & Radio Galaxy Core",
    subtitle: "Powerhouse launching 1.5-million-light-year giant radio lobes",
    constellation: "Centaurus",
    parentId: "universe",
    parentName: "Centaurus",
    discoveryYear: 1826,
    discoveryMethod: "Optical & Radio Astronomy (James Dunlop / Bolton et al.)",
    source: "ESO / Event Horizon Telescope Collaboration / Chandra",
    references: ["ESO Science Releases", "EHT Collaboration"],
    childrenLevel: "none",
    childrenIds: [],
    diameter: "330 million km (Event Horizon)",
    diameterKm: 330000000,
    distance: "12 million light-years (3.7 Mpc)",
    mass: "55 million Solar Masses (~1.1 × 10³⁸ kg)",
    massRelative: "55 Million M☉ (13× larger than Sgr A*)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "X-ray coronal plasma: > 10,000,000 K",
    age: "~12 billion years",
    orbitalPeriod: "Core of peculiar giant elliptical/spiral merger",
    rotationPeriod: "High relativistic spin rate",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#38bdf8" }
    ],
    image: "/images/centaurus-a.jpg",
    imageMeta: {
      imageUrl: "/images/centaurus-a.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "ESO / WFI / MPIfR / APEX / A. Weiss et al.",
      imageSource: "ESO Submillimeter and Visible Composite of Centaurus A",
      altText: "Spectacular orange submillimeter radio lobes billowing from the core of Centaurus A"
    },
    color: "#38bdf8",
    tagline: "The closest active radio galaxy to Earth, powering giant plasma lobes spanning over 1.5 million light-years.",
    description: "Centaurus A is the nearest active galaxy hosting a giant supermassive black hole. At 55 million solar masses, its active accretion disk powers colossal relativistic plasma jets that shoot into space, inflating giant radio lobes that span over 1.5 million light-years — more than 15 times the diameter of the Milky Way. In Earth's night sky, if these radio lobes were visible to human eyes, they would appear 20 times wider than the full Moon.",
    facts: [
      "Centaurus A is one of the strongest radio sources in the sky and an energetic source of ultra-high-energy cosmic rays.",
      "The central engine is hidden behind an immense, warped equatorial lane of dark dust created by a past galactic merger.",
      "Chandra X-ray observations show dynamic shock waves where the jet plows into surrounding gas clouds.",
      "Event Horizon Telescope observations have mapped the base of the jet down to a distance of just 0.6 light-days from the black hole."
    ],
    missions: ["Chandra X-ray Observatory", "Hubble Space Telescope", "ALMA", "EHT Collaboration"]
  },
  {
    id: "m106-bh",
    name: "Messier 106* (NGC 4258)",
    type: "Supermassive Black Hole & Water Megamaser",
    category: "black-hole",
    subtitle: "The gold-standard geometric anchor of extra-galactic distances",
    parentId: "universe",
    parentName: "Canes Venatici",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "240 million km (Event Horizon)",
    diameterKm: 240000000,
    distance: "23.5 million light-years (7.2 Mpc)",
    mass: "40 million Solar Masses (~8.0 × 10³⁷ kg)",
    massRelative: "40 Million M☉ (10× larger than Sgr A*)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Accretion Disk: 10⁶ K",
    age: "~12.5 billion years",
    orbitalPeriod: "Core of Seyfert II spiral galaxy",
    rotationPeriod: "Warped thin disk rotation",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#00f0ff" }
    ],
    image: "/images/m106-blackhole.jpg",
    imageMeta: {
      imageUrl: "/images/m106-blackhole.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / CXC / STScI / JPL-Caltech",
      imageSource: "Hubble / Chandra / Spitzer Multiwavelength Composite",
      altText: "Messier 106 showing anomalous curved ghost arms heated by X-rays from the central black hole"
    },
    color: "#00f0ff",
    tagline: "Features natural water-vapor lasers (megamasers) allowing astronomers to measure its mass and distance with textbook precision.",
    description: "Messier 106 contains a 40-million-solar-mass black hole renowned for its thin, warped molecular accretion disk containing natural water-vapor masers. These water molecules emit intense microwaves at 22 GHz (acting like natural cosmic lasers). By tracking the Keplerian orbits of these water clouds with radio interferometry, astronomers measured the mass of the black hole and the geometric distance to the galaxy with unrivaled 1% precision, serving as a vital rung on the cosmic distance ladder.",
    facts: [
      "M106 has two 'anomalous arms' that glow intensely in X-rays and radio waves, shooting out of the galaxy plane like purple lightning.",
      "The water masers orbit the black hole at velocities ranging from 700 to 1,100 km/s.",
      "Because the distance was determined geometrically without standard candles, M106 serves as a foundational calibrator for the Hubble Constant.",
      "The accretion disk is warped by relativistic Lense-Thirring precession caused by the frame-dragging of spinning spacetime."
    ],
    missions: ["Chandra X-ray Observatory", "Hubble Space Telescope", "Very Long Baseline Array (VLBA)", "Spitzer"]
  },
  {
    id: "holmberg-15a",
    name: "Holmberg 15A*",
    type: "Ultramassive Black Hole",
    category: "black-hole",
    subtitle: "A 40-billion-solar-mass monster in a core-depleted giant elliptical galaxy",
    parentId: "universe",
    parentName: "Cetus (Abell 85)",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "236 billion km (~1,580 AU / ~9 light-days)",
    diameterKm: 236000000000,
    distance: "700 million light-years (215 Mpc)",
    mass: "40 ± 8 billion Solar Masses (~8.0 × 10⁴⁰ kg)",
    massRelative: "40 Billion M☉ (10,000× larger than Sgr A*)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Hawking Temp: ~1.5 × 10⁻¹⁸ K",
    age: "~13 billion years",
    orbitalPeriod: "Brightest Cluster Galaxy (BCG) of Abell 85",
    rotationPeriod: "Kerr metric",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#6366f1" }
    ],
    image: "/images/holmberg-15a.jpg",
    imageMeta: {
      imageUrl: "/images/holmberg-15a.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / CXC / SAO / SDSS",
      imageSource: "Chandra X-ray Observatory and SDSS Composite of Abell 85 Centered on Holmberg 15A",
      altText: "Glowing core and diffuse X-ray halo of giant elliptical galaxy Holmberg 15A harboring a 40-billion solar mass black hole"
    },
    color: "#6366f1",
    tagline: "One of the largest directly measured black holes in the local universe, with an event horizon 1,580 times Earth's orbit.",
    description: "Holmberg 15A* is an ultramassive black hole located at the heart of the central Brightest Cluster Galaxy of galaxy cluster Abell 85. In 2019, astronomers using the MUSE instrument on the ESO Very Large Telescope measured its mass directly from the stellar velocity dispersion of orbiting stars: 40 billion solar masses. Its event horizon spans roughly 1,580 AU, meaning it would take light over 9 days to travel from one side of the shadow to the other.",
    facts: [
      "Holmberg 15A has an enormous 'scoured' core: billions of stars were ejected over eons during repeated binary black hole mergers, creating a dim, hollowed-out center.",
      "Its mass accounts for nearly 2% of the entire stellar mass of its host galaxy.",
      "The event horizon diameter is large enough to engulf 50 solar systems placed edge-to-edge.",
      "It represents one of the largest black hole masses ever verified through direct dynamical stellar kinematics rather than gas scaling relations."
    ],
    missions: ["ESO Very Large Telescope (VLT)", "Hubble Space Telescope", "Chandra X-ray Observatory"]
  },
  {
    id: "ngc-1277-bh",
    name: "NGC 1277*",
    type: "Disproportionate Supermassive Black Hole",
    category: "black-hole",
    subtitle: "A 17-billion-solar-mass black hole holding 14% of its galaxy's entire mass",
    parentId: "universe",
    parentName: "Perseus Cluster",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "100 billion km (~660 AU, Event Horizon)",
    diameterKm: 100000000000,
    distance: "220 million light-years (73 Mpc)",
    mass: "17 ± 3 billion Solar Masses (~3.4 × 10⁴⁰ kg)",
    massRelative: "17 Billion M☉ (4,000× larger than Sgr A*)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Hawking Temp: ~3.5 × 10⁻¹⁸ K",
    age: "~12 billion years (Relic galaxy with ancient stars)",
    orbitalPeriod: "Core of compact lenticular galaxy",
    rotationPeriod: "High spin",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#a855f7" }
    ],
    image: "/images/ngc-1277.jpg",
    imageMeta: {
      imageUrl: "/images/ngc-1277.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / Hubble Space Telescope",
      imageSource: "Hubble Space Telescope Deep Imaging of Perseus Cluster Relic NGC 1277",
      altText: "Compact red lenticular galaxy NGC 1277 hosting an overwhelmingly massive black hole"
    },
    color: "#a855f7",
    tagline: "An astrophysical anomaly: a black hole so monstrous it defies standard models of galaxy-black hole co-evolution.",
    description: "In almost all galaxies, the central supermassive black hole contains approximately 0.1% to 0.2% of the galaxy's total stellar mass. NGC 1277 in the Perseus Cluster completely shatters this rule: its black hole contains 17 billion solar masses, accounting for a staggering 14% of the galaxy's entire mass. Astronomers categorize NGC 1277 as an un-evolved 'relic galaxy' whose black hole grew rapidly in the early universe before star formation completely ceased 10 billion years ago.",
    facts: [
      "Its event horizon is roughly four times larger than the orbit of Neptune.",
      "Stars near the core whip around the black hole at breakneck speeds exceeding 500 km/s.",
      "The galaxy contains zero young stars; it is essentially a frozen relic from the infant universe with an overgrown central black hole.",
      "Studying NGC 1277 provides critical insights into whether supermassive black holes formed before or after their host galaxies."
    ],
    missions: ["Hubble Space Telescope", "Hobby-Eberly Telescope (HET)", "Keck Observatory"]
  },

  // ==========================================
  // 2. STELLAR-MASS BLACK HOLES & MICROQUASARS
  // ==========================================
  {
    id: "cygnus-x1",
    name: "Cygnus X-1 (Cyg X-1)",
    type: "Stellar-Mass Black Hole X-ray Binary",
    category: "black-hole",
    subtitle: "The first confirmed black hole in astronomical history",
    parentId: "milky-way",
    parentName: "Milky Way Galaxy",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "124 km (Event Horizon)",
    diameterKm: 124,
    distance: "7,200 light-years (2.22 kpc from Earth)",
    mass: "21.2 ± 2.2 Solar Masses",
    massRelative: "21.2 M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Accretion Disk: 1,000,000 to 10,000,000 K (Intense X-rays)",
    age: "~5 million years (since progenitor supernova)",
    orbitalPeriod: "Binary orbital period: 5.6 days around blue supergiant HDE 226868",
    rotationPeriod: "Near-extremal spin: a* > 0.95 (Spins > 800 times per second)",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#38bdf8" }
    ],
    image: "/images/cygnus-x1.jpg",
    imageMeta: {
      imageUrl: "/images/cygnus-x1.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "NASA / CXC / M. Weiss",
      imageSource: "Chandra X-ray Observatory High-Energy Astrophysics Archive",
      altText: "Cygnus X-1 pulling stellar gas from companion blue supergiant into a blinding X-ray accretion disk"
    },
    color: "#38bdf8",
    tagline: "The historic first confirmed black hole, subject of the famous friendly scientific wager between Stephen Hawking and Kip Thorne.",
    description: "Discovered in 1964 as a blazing X-ray source, Cygnus X-1 was the first object widely accepted by the scientific community as a genuine black hole. It forms a high-mass X-ray binary with HDE 226868, a luminous blue supergiant star. The black hole's gravitational pull siphons massive streams of stellar wind from the supergiant, heating the material in an accretion disk to millions of degrees and releasing torrential X-rays before plunging past the event horizon.",
    facts: [
      "In 1974, Stephen Hawking bet Kip Thorne that Cygnus X-1 was NOT a black hole as an 'insurance policy'. Hawking conceded the bet in 1990.",
      "The black hole spins at over 95% of the theoretical maximum Kerr rate, dragging spacetime around itself at near-light speeds.",
      "Its event horizon has a radius of merely ~62 km — small enough to fit comfortably inside the metropolitan boundaries of a city like London or New York.",
      "In 2021, revised radio parallax measurements upgraded its mass from 15 to 21.2 solar masses, challenging stellar wind mass-loss models."
    ],
    missions: ["Chandra X-ray Observatory", "NuSTAR", "NICER (ISS)", "Swift Mission"]
  },
  {
    id: "gaia-bh1",
    name: "Gaia BH1",
    type: "Dormant Stellar-Mass Black Hole Binary",
    category: "black-hole",
    subtitle: "The closest known black hole to Earth (1,560 light-years)",
    parentId: "milky-way",
    parentName: "Milky Way Galaxy",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "57 km (Event Horizon)",
    diameterKm: 57,
    distance: "1,560 light-years (478 pc, in Ophiuchus)",
    mass: "9.62 ± 0.18 Solar Masses",
    massRelative: "9.6 M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Quiescent (Virtually no accretion emission)",
    age: "~5 to 7 billion years",
    orbitalPeriod: "Orbital period: 185.6 days around a Sun-like G-dwarf companion",
    rotationPeriod: "Under investigation",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#34d399" }
    ],
    image: "/images/gaia-bh1.jpg",
    imageMeta: {
      imageUrl: "/images/gaia-bh1.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "NOIRLab / NSF / AURA / J. da Silva",
      imageSource: "Gemini Observatory Confirmation of Gaia BH1",
      altText: "Artist impression of dormant black hole Gaia BH1 orbited by a Sun-like star at 1 AU distance"
    },
    color: "#34d399",
    tagline: "Discovered in 2022 by ESA's Gaia astrometry spacecraft: a dormant black hole orbiting a Sun-like star in our cosmic backyard.",
    description: "Discovered in 2022 from precise astrometric wobble data collected by the European Space Agency's Gaia space observatory, Gaia BH1 is the closest known black hole to Earth. Unlike Cygnus X-1, Gaia BH1 is completely 'dormant': its Sun-like companion orbits at a comfortable distance of 1.4 AU (similar to Mars's orbit around the Sun), so it does not transfer gas or produce bright X-rays, making it purely detectable via gravitational astrometry.",
    facts: [
      "At 1,560 light-years away, Gaia BH1 is roughly three times closer to Earth than Cygnus X-1.",
      "The companion star is an ordinary G-type dwarf virtually identical to our own Sun.",
      "Its discovery proved that the Milky Way hosts an enormous unseen population of dormant black holes in wide binaries.",
      "Standard binary evolution models struggle to explain how the companion star survived the massive progenitor's red supergiant phase without being swallowed."
    ],
    missions: ["Gaia Space Observatory (ESA)", "Gemini North Observatory", "Keck Observatory"]
  },
  {
    id: "gaia-bh3",
    name: "Gaia BH3",
    type: "Massive Stellar Black Hole (Milky Way Record)",
    category: "black-hole",
    subtitle: "The most massive stellar-origin black hole ever discovered in the Milky Way (33 M☉)",
    parentId: "milky-way",
    parentName: "Milky Way Galaxy (Aquila)",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "193 km (Event Horizon)",
    diameterKm: 193,
    distance: "1,926 light-years (590 pc, in Aquila)",
    mass: "32.7 ± 0.82 Solar Masses",
    massRelative: "32.7 M☉ (Milky Way Record Holder)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Dormant (undetectable X-ray emission)",
    age: "~12 billion years (ancient metal-poor halo population)",
    orbitalPeriod: "11.6 years around a metal-poor giant star",
    rotationPeriod: "Under investigation",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#f59e0b" }
    ],
    image: "/images/gaia-bh3.jpg",
    imageMeta: {
      imageUrl: "/images/gaia-bh3.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "ESO / L. Calçada",
      imageSource: "Historic April 2024 ESO / Gaia Breakthrough Announcement",
      altText: "Stellar black hole Gaia BH3 distorting background stars as its companion giant star orbits"
    },
    color: "#f59e0b",
    tagline: "A historic 2024 discovery shattering previous records: an extraordinary 33-solar-mass black hole lurking right in our galactic neighborhood.",
    description: "Announced in April 2024 by an international team analyzing data from ESA's Gaia telescope, Gaia BH3 is the most massive stellar-origin black hole ever discovered within the Milky Way. Weighing in at an astounding 32.7 solar masses — far exceeding the previous galactic record of ~21 M☉ (Cygnus X-1) — it is the second-closest known black hole to Earth at just 1,926 light-years. It was formed from an ancient, metal-poor star that lost minimal mass to stellar winds before collapsing.",
    facts: [
      "Before Gaia BH3, stellar black holes above 30 solar masses had only ever been detected in distant galaxies via gravitational wave mergers.",
      "The companion star is an extremely metal-poor ancient red giant, with less than 1% the heavy element content of our Sun, confirming that high-mass black holes form in low-metallicity environments.",
      "The pair orbits in a loose 11.6-year period at an average separation of 16 AU — similar to Uranus's distance from the Sun.",
      "Verified independently using radial velocity spectroscopy from the UVES spectrograph on ESO's Very Large Telescope in Chile."
    ],
    missions: ["Gaia Space Observatory (ESA)", "ESO Very Large Telescope (VLT)", "Keck Observatory"]
  },
  {
    id: "v404-cygni",
    name: "V404 Cygni",
    type: "Flaring Microquasar Black Hole",
    category: "black-hole",
    subtitle: "Microquasar exhibiting ultra-rapid relativistic jet wobbling",
    parentId: "milky-way",
    parentName: "Milky Way Galaxy",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "53 km (Event Horizon)",
    diameterKm: 53,
    distance: "7,800 light-years (2.39 kpc)",
    mass: "9.0 ± 0.6 Solar Masses",
    massRelative: "9.0 M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Accretion flare state: > 10,000,000 K",
    age: "~10 million years",
    orbitalPeriod: "6.5 days around a K-dwarf companion",
    rotationPeriod: "Rapid precession (minutes-scale jet axis wobble)",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#ec4899" }
    ],
    image: "/images/v404-cygni.jpg",
    imageMeta: {
      imageUrl: "/images/v404-cygni.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / CXC / SAO",
      imageSource: "Chandra X-ray Observatory Giant Dust Echo Rings",
      altText: "Concentric glowing X-ray rings echoing through interstellar dust clouds from V404 Cygni"
    },
    color: "#ec4899",
    tagline: "A volatile microquasar whose intense relativistic jets precess on timescales of minutes due to frame-dragging.",
    description: "V404 Cygni is a stellar-mass black hole in an X-ray binary with an early K-type companion star. Renowned for dramatic outburst cycles where it suddenly brightens by thousands of times across the electromagnetic spectrum, V404 Cygni's intense gravitational pull tears matter from its companion into an unstable accretion disk. During its 2015 outburst, astronomers discovered that its relativistic plasma jets precess rapidly on timescales of minutes — the first direct demonstration of frame-dragging (Lense-Thirring effect) wobbling a black hole jet in real time.",
    facts: [
      "During the 2015 outburst, NASA's Swift and Chandra telescopes captured spectacular expanding concentric 'dust echo rings' around V404 Cygni as X-rays bounced off interstellar clouds.",
      "The relativistic jets shoot matter into space at over 60% the speed of light.",
      "Lense-Thirring frame dragging twists the inner accretion disk out of alignment with the black hole's spin axis, causing the jet to wobble like a spinning top.",
      "The system remains in quiet hibernation for decades between violent flaring episodes."
    ],
    missions: ["Chandra X-ray Observatory", "Swift Gamma-Ray Burst Mission", "INTEGRAL (ESA)", "VLBA"]
  },

  // ==========================================
  // 3. INTERMEDIATE-MASS BLACK HOLES & MERGERS
  // ==========================================
  {
    id: "gw150914",
    name: "GW150914 (Historic Merger Remnant)",
    type: "Gravitational-Wave Binary Merger Remnant",
    category: "black-hole",
    subtitle: "The historic first direct detection of gravitational waves in human history",
    parentId: "universe",
    parentName: "Distant Universe",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "367 km (Remnant Event Horizon)",
    diameterKm: 367,
    distance: "1.3 billion light-years (410 Mpc)",
    mass: "62.2 Solar Masses (Formed from 36 M☉ + 29 M☉)",
    massRelative: "62.2 M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Hawking Temp: ~1.0 × 10⁻⁹ K",
    age: "Merger occurred 1.3 billion years ago",
    orbitalPeriod: "Final orbital frequency: 250 Hz (250 orbits/sec before collision)",
    rotationPeriod: "Kerr spin parameter: a* = 0.68",
    composition: [
      { name: "Kerr Gravitational Singularity", percentage: 100, color: "#00f0ff" }
    ],
    image: "/images/gw150914.jpg",
    imageMeta: {
      imageUrl: "/images/gw150914.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "SXS Collaboration / LIGO / Caltech-MIT",
      imageSource: "SXS Numerical Relativity Simulation of GW150914 Binary Black Hole Coalescence and Gravitational Lensing",
      altText: "Two merging black holes warping the background starlight through gravitational lensing during the historic GW150914 coalescence"
    },
    color: "#00f0ff",
    tagline: "On Sept 14, 2015, LIGO detected spacetime ripples from two black holes colliding 1.3 billion light-years away.",
    description: "On September 14, 2015, the Laser Interferometer Gravitational-Wave Observatory (LIGO) made one of the greatest scientific discoveries of the 21st century: the first direct detection of gravitational waves. Two black holes of 36 and 29 solar masses spiraled together and coalesced into a single 62-solar-mass rotating Kerr black hole. In the final fraction of a second, 3 solar masses of pure matter were converted into gravitational wave radiation — releasing more power than all stars in the observable universe combined.",
    facts: [
      "In the final 0.2 seconds before the merger, the collision radiated 50 times more peak power than all the luminous stars in the entire observable universe combined.",
      "The distortion in spacetime measured at the LIGO Hanford and Livingston detectors moved mirrors by only 1/10,000th the width of a single proton (10⁻¹⁸ meters).",
      "The discovery earned Rainer Weiss, Barry Barish, and Kip Thorne the 2017 Nobel Prize in Physics.",
      "It proved the physical existence of binary stellar black hole systems and confirmed Einstein's 1916 prediction of gravitational waves."
    ],
    missions: ["LIGO (Hanford & Livingston)", "Virgo Interferometer", "GEO600", "KAGRA"]
  },
  {
    id: "gw190521",
    name: "GW190521 (Intermediate-Mass Remnant)",
    type: "Intermediate-Mass Black Hole (IMBH) Remnant",
    category: "black-hole",
    subtitle: "Direct proof of the elusive Intermediate-Mass Black Hole class (142 M☉)",
    parentId: "universe",
    parentName: "Distant Universe (z = 0.82)",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "840 km (Remnant Event Horizon)",
    diameterKm: 840,
    distance: "17 billion light-years (comoving) / 7.1 Gly (light-travel)",
    mass: "142 Solar Masses (Formed from 85 M☉ + 66 M☉)",
    massRelative: "142 M☉ (Pair-Instability Gap Defier)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Hawking Temp: ~4.3 × 10⁻¹⁰ K",
    age: "Light emitted 7.1 billion years ago",
    orbitalPeriod: "Merger signal lasted merely 0.1 seconds (4 gravitational cycles)",
    rotationPeriod: "Kerr spin parameter: a* = 0.72",
    composition: [
      { name: "Kerr Gravitational Singularity", percentage: 100, color: "#a855f7" }
    ],
    image: "/images/gw190521.jpg",
    imageMeta: {
      imageUrl: "/images/gw190521.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "LIGO / Virgo / Swinburne University / Mark Myers",
      imageSource: "GW190521 Discovery Publication Simulation",
      altText: "Direct gravitational merger of two heavy black holes in the pair-instability mass gap"
    },
    color: "#a855f7",
    tagline: "The heaviest gravitational wave merger ever observed, creating the first confirmed intermediate-mass black hole (142 M☉).",
    description: "Detected on May 21, 2019 by LIGO and Virgo, GW190521 generated shockwaves through the astrophysics community. The collision merged two black holes of 85 and 66 solar masses into a 142-solar-mass remnant. The 85-solar-mass progenitor black hole sits squarely inside the 'pair-instability mass gap' (65–130 M☉), where supernova theory predicts that dying stars must be completely obliterated by thermonuclear runaway with zero remnant. Its existence suggests black holes can grow through hierarchical mergers in dense star clusters.",
    facts: [
      "GW190521 provided the first clear, indisputable direct detection of an Intermediate-Mass Black Hole (100–100,000 M☉).",
      "During the collision, 8 solar masses of matter were converted into pure gravitational wave energy within 0.1 seconds.",
      "The progenitor black hole of 85 M☉ could not have formed from an ordinary isolated star, proving hierarchical black hole collisions occur in nature.",
      "Zwicky Transient Facility (ZTF) observed a possible optical counterpart flare caused by the newly merged black hole recoiling through an active galactic nucleus accretion disk."
    ],
    missions: ["LIGO (USA)", "Virgo (Italy)", "KAGRA (Japan)", "Zwicky Transient Facility (ZTF)"]
  },
  {
    id: "hlx-1",
    name: "HLX-1 (Hyper-Luminous X-ray Source 1)",
    type: "Intermediate-Mass Black Hole Candidate",
    category: "black-hole",
    subtitle: "Premier 20,000-solar-mass intermediate-mass black hole in galaxy ESO 243-49",
    parentId: "universe",
    parentName: "Phoenix (ESO 243-49)",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "118,000 km (~0.85 × Jupiter diameter)",
    diameterKm: 118000,
    distance: "290 million light-years (89 Mpc)",
    mass: "20,000 Solar Masses (~4.0 × 10³⁴ kg)",
    massRelative: "20,000 M☉",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Accretion Disk: 1,000,000 K",
    age: "~10 billion years",
    orbitalPeriod: "Offset by 12,000 light-years from host galaxy center",
    rotationPeriod: "Under investigation",
    composition: [
      { name: "Gravitational Singularity", percentage: 100, color: "#6366f1" }
    ],
    image: "/images/hlx-1.jpg",
    imageMeta: {
      imageUrl: "/images/hlx-1.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / STScI / Chandra (ESO 243-49)",
      imageSource: "Hubble and Chandra High-Energy Discovery of HLX-1 in ESO 243-49",
      altText: "Chandra X-ray source HLX-1 offset from the edge of lenticular galaxy ESO 243-49"
    },
    color: "#6366f1",
    tagline: "The premier candidate for the 'missing link' between stellar and supermassive black holes, likely the stripped core of a cannibalized dwarf galaxy.",
    description: "Located on the outskirts of lenticular galaxy ESO 243-49, Hyper-Luminous X-ray source 1 (HLX-1) shines with an X-ray luminosity of over 10⁴² erg/s — roughly 100 times brighter than any possible stellar-mass black hole. With a calculated mass of ~20,000 solar masses, it represents the leading observational candidate for an intermediate-mass black hole. Astronomers believe it is the ancient stripped core of a dwarf galaxy that was cannibalized by ESO 243-49 billions of years ago.",
    facts: [
      "Its X-ray luminosity exceeds the Eddington limit for a 20-solar-mass black hole by more than a factor of 400, requiring a black hole of at least thousands of solar masses.",
      "Hubble imagery revealed a young cluster of blue stars surrounding HLX-1, sparked by tidal compression during the galactic collision.",
      "Intermediate-mass black holes like HLX-1 are considered the vital evolutionary 'seeds' that grew to become the supermassive giants anchoring galaxies today.",
      "The X-ray emission undergoes regular outbursts similar to stellar-mass microquasars, but scaled up by thousands of times."
    ],
    missions: ["Chandra X-ray Observatory", "XMM-Newton (ESA)", "Hubble Space Telescope", "Swift Mission"]
  },

  // ==========================================
  // 4. RELATIVISTIC ASTROPHYSICS MECHANISMS
  // ==========================================
  {
    id: "bh-accretion-disks",
    name: "Relativistic Accretion Disks",
    type: "Astrophysical High-Energy Structure",
    category: "black-hole",
    subtitle: "The most efficient energy-conversion engines in the cosmos",
    parentId: "universe",
    parentName: "The Observable Universe",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "Variable (sub-AU to light-years across)",
    diameterKm: 1e8,
    distance: "Present in all actively accreting black holes",
    mass: "Plasma & gas mass",
    massRelative: "Converts up to 42% of rest mass into energy (E = mc²)",
    gravity: 0,
    gravityRatio: 0,
    temperature: "100,000 K to > 10,000,000 K (Thermal UV & X-ray emission)",
    age: "Dynamic structure",
    orbitalPeriod: "Differential Keplerian rotation",
    rotationPeriod: "Spiraling inward along geodesic trajectories",
    composition: [
      { name: "Ionized Relativistic Plasma", percentage: 90, color: "#f59e0b" },
      { name: "Magnetic Flux Tubes", percentage: 10, color: "#00f0ff" }
    ],
    image: "/images/black-hole-accretion.jpg",
    imageMeta: {
      imageUrl: "/images/black-hole-accretion.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "NASA's Goddard Space Flight Center / Jeremy Schnittman",
      imageSource: "NASA Ray-Traced Relativistic Black Hole Accretion Disk Simulation with Photon Ring & Doppler Beaming",
      altText: "NASA ray-traced relativistic accretion disk warped by extreme gravity, showing photon ring, shadow, and Doppler beaming"
    },
    color: "#f59e0b",
    tagline: "Converting rest mass into radiant energy with up to 42% efficiency — over 50 times more efficient than hydrogen nuclear fusion.",
    description: "An accretion disk is a flattened structure of gas and plasma spiraling into a compact central gravitational body. As matter spirals inward toward the event horizon, gravitational potential energy is converted into kinetic energy and then dissipated into intense heat via magnetic turbulence (the Magnetorotational Instability, or MRI). For a maximally spinning Kerr black hole, the innermost stable circular orbit (ISCO) lies right at the horizon, allowing up to 42% of the infalling matter's rest mass to be radiated away as photons.",
    facts: [
      "Nuclear fusion in stars converts only 0.7% of mass into energy; a spinning black hole accretion disk converts up to 42%, making it the universe's ultimate power generator.",
      "The friction within the disk is driven by the Magnetorotational Instability (MRI), where magnetic field lines act like elastic rubber bands connecting shearing gas layers.",
      "Because plasma orbits at substantial fractions of light speed, the side of the disk moving toward the observer appears blindingly bright due to Doppler boosting.",
      "Disk radiation spans the entire spectrum, from infrared in the outer reaches to extreme ultraviolet, X-rays, and gamma rays near the ISCO."
    ],
    missions: ["Chandra X-ray Observatory", "XMM-Newton", "NuSTAR", "NICER (ISS)"]
  },
  {
    id: "relativistic-jets",
    name: "Relativistic Plasma Jets",
    type: "Magnetohydrodynamic Beam Phenomenon",
    category: "black-hole",
    subtitle: "Synchrotron plasma beams blasted at 99% the speed of light",
    parentId: "universe",
    parentName: "The Observable Universe",
    childrenLevel: "none",
    childrenIds: [],
    diameter: "Length: Thousands to millions of light-years",
    diameterKm: 5e16,
    distance: "Emanates from spinning black holes and microquasars",
    mass: "Relativistic electron-positron/proton beam",
    massRelative: "Blandford-Znajek mechanism power",
    gravity: 0,
    gravityRatio: 0,
    temperature: "Synchrotron radiation non-thermal spectrum",
    age: "Active during accretion episodes",
    orbitalPeriod: "Collimated along rotational spin axis",
    rotationPeriod: "Helical magnetic confinement",
    composition: [
      { name: "Relativistic Electrons & Positrons", percentage: 80, color: "#38bdf8" },
      { name: "Magnetic Helical Flux", percentage: 20, color: "#6366f1" }
    ],
    image: "/images/relativistic-jets.jpg",
    imageMeta: {
      imageUrl: "/images/relativistic-jets.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / Hubble Heritage Team",
      imageSource: "Hubble Space Telescope image of M87's 5,000-light-year relativistic jet",
      altText: "Brilliant blue synchrotron plasma jet shooting from the core of Messier 87"
    },
    color: "#38bdf8",
    tagline: "Colossal collimated beams of magnetized plasma blasting across intergalactic voids at 0.99c.",
    description: "Relativistic jets are narrow beams of ionized matter accelerated to speeds exceeding 99% the speed of light (Lorentz factors Γ > 10). Emitted along the rotational axis of spinning black holes, they are powered by the Blandford-Znajek mechanism: magnetic field lines anchored in the accretion disk thread the black hole's ergosphere, extracting rotational energy directly from spacetime itself. In Active Galactic Nuclei like M87, these jets puncture through host galaxies to inflate massive radio lobes spanning millions of light-years.",
    facts: [
      "The relativistic jet in Messier 87 extends over 5,000 light-years into space and glows blue from synchrotron radiation emitted by electrons spiraling in magnetic fields.",
      "When a relativistic jet happens to point directly at Earth, it is called a Blazar; relativistic beaming magnifies its apparent luminosity by thousands of times.",
      "Jets transport kinetic energy and enriched heavy elements from galactic cores into the intergalactic medium, preventing runaway cooling and regulating star formation.",
      "Due to optical illusions caused by light-travel time effects when jets travel toward us at near-light speeds, knots within the jet appear to move across the sky at superluminal speeds (up to 6c)."
    ],
    missions: ["Hubble Space Telescope", "Chandra X-ray Observatory", "Fermi Gamma-ray Space Telescope", "Very Large Array (VLA)"]
  }
];

export function getBlackHoleById(id) {
  return blackHolesData.find(b => b.id === id) || null;
}
