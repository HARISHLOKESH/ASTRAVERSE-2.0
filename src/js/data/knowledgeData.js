// ASTRAVERSE 2.0 - Cosmic Knowledge Base
// 19 authoritative, deeply researched astrophysics and cosmology domains

export const knowledgeTopics = [
  {
    id: "concept-observable-universe",
    title: "The Observable Universe & Cosmology",
    category: "Cosmology",
    tagline: "The 93-billion-light-year cosmic tapestry born from the Big Bang",
    image: "/images/universe.jpg",
    imageMeta: {
      imageUrl: "/images/universe.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / Hubble Heritage Team",
      imageSource: "Hubble Ultra Deep Field (HUDF 2014)",
      altText: "Hubble Ultra Deep Field showing thousands of ancient galaxies"
    },
    intro: "The observable universe encompasses a spherical bubble of spacetime spanning approximately 93 billion light-years in diameter, containing an estimated 2 trillion galaxies and over 10²⁴ stars.",
    explanation: "Cosmology rests on Einstein's General Relativity and the standard ΛCDM (Lambda Cold Dark Matter) model. The universe originated approximately 13.787 ± 0.020 billion years ago from an extremely hot, dense singularity. Space itself underwent an epoch of hyper-rapid exponential expansion known as Cosmic Inflation within the first fraction of a second (10⁻³⁶ to 10⁻³² s). As the primordial plasma cooled to ~3,000 K at t = 380,000 years, electrons combined with protons to form neutral hydrogen (Recombination), allowing photons to decouple and free-stream through space — this primordial glow is preserved today as the Cosmic Microwave Background (CMB). Contemporary observations demonstrate that cosmic expansion is accelerating, propelled by mysterious Dark Energy (~68.3% of cosmic energy density), while Cold Dark Matter (~26.8%) weaves the gravitational scaffolding upon which normal baryonic matter (~4.9%) forms galaxies, stars, and life.",
    keyFacts: [
      "The universe has no known center or physical boundary; every vantage point observes its own spherical horizon.",
      "Due to the continuous expansion of space during light transit, the edge of the observable horizon is currently ~46.5 billion light-years away in every direction.",
      "The overall spatial geometry of the universe is flat to within an observational margin of 0.4% according to ESA Planck satellite measurements.",
      "Ordinary atomic matter (quarks, leptons) constitutes only ~4.9% of the universe's total energy density."
    ],
    relatedObjects: ["universe", "milky-way", "andromeda", "cmb"],
    relatedTopics: ["dark-energy", "dark-matter", "cosmic-microwave-background", "galaxies"]
  },
  {
    id: "galaxies",
    title: "Galaxies & Cosmic Structures",
    category: "Galactic Astronomy",
    tagline: "Vast gravitating islands of stars, gas, dust, and dark matter halos",
    image: "/images/andromeda.jpg",
    imageMeta: {
      imageUrl: "/images/andromeda.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / Digitized Sky Survey",
      imageSource: "Andromeda M31 Deep Sky Mosaic",
      altText: "Spiral arms and bright galactic core of the Andromeda Galaxy"
    },
    intro: "Galaxies are gravitationally bound systems consisting of tens of millions to over a trillion stars, stellar remnants, interstellar gas, dust, and pervasive dark matter halos.",
    explanation: "Galaxies are classified according to the Hubble Sequence: Spirals (like the Milky Way and Andromeda), Barred Spirals, Ellipticals (ranging from spherical E0 to elongated E7), and Irregulars. Spiral galaxies feature thin, rotating disks with density waves that compress interstellar gas and trigger active star formation along distinct arms. Elliptical galaxies, often the remnants of multiple galactic mergers, are dominated by older, low-mass stars with little cool gas remaining for new star birth. At the core of virtually every massive galaxy resides a supermassive black hole (SMBH), whose feedback through relativistic jets and radiation regulates galactic growth and star formation over cosmological timescales.",
    keyFacts: [
      "The Local Group consists of over 80 galaxies, dominated by Andromeda (M31), the Milky Way, and the Triangulum Galaxy (M33).",
      "Galactic rotation curves do not drop off with distance from the center, which provided the first compelling observational evidence for Dark Matter halos.",
      "Spiral arms are not rigid structures but dynamic density waves, analogous to traffic congestion waves on a highway.",
      "In approximately 4.5 billion years, the Milky Way and Andromeda will merge into a giant elliptical galaxy dubbed 'Milkomeda'."
    ],
    relatedObjects: ["milky-way", "andromeda", "triangulum", "sombrero", "whirlpool", "m87-galaxy"],
    relatedTopics: ["universe", "black-holes", "dark-matter"]
  },
  {
    id: "stars",
    title: "Stars: Nuclear Furnaces of the Cosmos",
    category: "Stellar Astrophysics",
    tagline: "Self-luminous plasma spheres governed by hydrostatic equilibrium",
    image: "/images/sun.jpg",
    imageMeta: {
      imageUrl: "/images/sun.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / SDO (Solar Dynamics Observatory)",
      imageSource: "AIA 304 Extreme Ultraviolet Channel",
      altText: "The Sun exhibiting solar coronal loops and prominence plumes"
    },
    intro: "Stars are massive luminous spheres of plasma held together by their own gravity, generating light and heat through nuclear fusion in their cores.",
    explanation: "A star maintains Hydrostatic Equilibrium throughout its active lifetime: inward gravitational pressure is precisely counterbalanced by outward radiative and thermal pressure produced by nuclear fusion. On the Main Sequence, stars fuse hydrogen into helium via the Proton-Proton (p-p) chain (in stars like our Sun) or the CNO (Carbon-Nitrogen-Oxygen) catalytic cycle (in stars heavier than ~1.3 solar masses). Stars are categorized by the Morgan-Keenan spectral classification (O, B, A, F, G, K, M), sequenced from hottest and bluest (O-type, >30,000 K) to coolest and reddest (M-type red dwarfs, ~2,400–3,700 K). A star's birth mass is the single most decisive variable determining its surface temperature, luminosity, spectral properties, and ultimate evolutionary demise.",
    keyFacts: [
      "Over 75% of all stars in the Milky Way are red dwarfs (M-class), which burn fuel so frugally they can survive for trillions of years.",
      "The core temperature of the Sun is ~15.7 million Kelvin, where it converts 600 million tons of hydrogen into helium every single second.",
      "Every element in the Periodic Table heavier than lithium was synthesized inside stars or during stellar catastrophic mergers (stellar nucleosynthesis).",
      "Luminous O-type stars have lifetimes of only a few million years, whereas our G-type Sun lives for ~10 billion years."
    ],
    relatedObjects: ["sun", "sirius-a", "betelgeuse", "proxima-centauri", "vega", "rigel", "antares", "polaris"],
    relatedTopics: ["stellar-evolution", "nebulae", "neutron-stars", "black-holes"]
  },
  {
    id: "stellar-evolution",
    title: "Stellar Evolution & Supernovae",
    category: "Stellar Astrophysics",
    tagline: "The lifecycle of stars from nebular birth to catastrophic cosmic demise",
    image: "/images/supernova.jpg",
    imageMeta: {
      imageUrl: "/images/supernova.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / STScI / Chandra / Hubble",
      imageSource: "Supernova Remnant M1 Deep Imaging",
      altText: "Intricate expanding shockwaves of a supernova blast"
    },
    intro: "Stellar evolution describes the sequence of structural changes a star undergoes during its lifetime as its nuclear fuel sources are exhausted.",
    explanation: "Stars begin life as collapsing fragments in cold molecular clouds (stellar nurseries). Once core hydrogen is consumed, low- to intermediate-mass stars (0.5 to 8 M☉) expand into Red Giants, begin helium fusion in their cores, expel their outer envelopes as iridescent Planetary Nebulae, and leave behind an ultra-dense, non-fusing White Dwarf supported by electron degeneracy pressure. Massive stars (>8 M☉) fuse progressively heavier elements in concentric shells (hydrogen, helium, carbon, neon, oxygen, silicon) until forming an inert Iron (Fe-56) core. Because fusing iron absorbs energy rather than releasing it, core support vanishes in milliseconds. The core catastrophically collapses under gravity, triggering a Type II (Core-Collapse) Supernova that blasts out heavy elements at 10,000 km/s and leaves behind either a Neutron Star or a Stellar-Mass Black Hole.",
    keyFacts: [
      "Stars with initial masses above ~20 M☉ collapse beyond neutron degeneracy, creating a stellar-mass black hole.",
      "Type Ia supernovae occur in binary systems when a carbon-oxygen white dwarf accretes matter beyond the Chandrasekhar limit (1.44 M☉), providing critical standard candles for cosmic distance measurement.",
      "A core-collapse supernova releases 99% of its enormous gravitational energy in the form of an intense burst of neutrinos.",
      "All gold, platinum, and uranium on Earth were forged during catastrophic r-process neutron-star mergers or rare magnetorotational supernovae."
    ],
    relatedObjects: ["betelgeuse", "rigel", "crab-nebula", "crab-pulsar", "cygnus-x1"],
    relatedTopics: ["stars", "nebulae", "neutron-stars", "black-holes"]
  },
  {
    id: "black-holes",
    title: "Black Holes & Spacetime Singularities",
    category: "Relativistic Astrophysics",
    tagline: "Regions where gravitational curvature traps all matter and light",
    image: "/images/sagittarius-a.jpg",
    imageMeta: {
      imageUrl: "/images/sagittarius-a.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "Event Horizon Telescope (EHT) Collaboration",
      imageSource: "First direct submillimeter interferometric image of Sagittarius A*",
      altText: "Glowing orange ring of hot synchrotron emission surrounding the dark shadow of Sagittarius A*"
    },
    intro: "A black hole is a region of spacetime exhibiting gravitational acceleration so extreme that nothing — neither particles nor electromagnetic radiation — can escape from inside its event horizon.",
    explanation: "Predicted by Albert Einstein's General Relativity and solved mathematically by Karl Schwarzschild in 1916, black holes represent the ultimate triumph of gravity over quantum degeneracy pressures. The boundary of no return is the Event Horizon, whose radius is given by the Schwarzschild radius: Rs = 2GM/c². At the center lies a gravitational singularity, where matter is crushed to zero volume and infinite density according to classical theory. Spinning (Kerr) black holes drag spacetime with them in an effect called Frame-Dragging, creating an Ergosphere outside the event horizon where energy can be extracted via the Penrose process. Matter spiraling into black holes forms friction-heated Accretion Disks glowing in X-rays at millions of Kelvin, and magnetic fields channel relativistic jets of ionized particles along the spin axis at over 99% the speed of light.",
    keyFacts: [
      "The Event Horizon Telescope (EHT) produced the first-ever direct image of a black hole shadow: M87* in 2019, followed by Sagittarius A* in 2022.",
      "According to Stephen Hawking's 1974 quantum field theory prediction, black holes slowly radiate thermal energy (Hawking Radiation) and will eventually evaporate over immense cosmic epochs.",
      "Stellar-mass black holes typically span 10 to 100 solar masses, whereas Supermassive Black Holes at galactic centers exceed millions to billions of solar masses.",
      "Time dilation near an event horizon is infinite relative to a distant observer: a falling clock appears to freeze permanently at the horizon."
    ],
    relatedObjects: ["sagittarius-a", "m87-blackhole", "cygnus-x1", "ton-618", "gaia-bh1"],
    relatedTopics: ["galaxies", "stellar-evolution", "gravitational-waves", "quasars"]
  },
  {
    id: "nebulae",
    title: "Nebulae: Stellar Nurseries & Cosmic Shrouds",
    category: "Interstellar Medium",
    tagline: "Vast glowing interstellar clouds of ionized gas, molecular hydrogen, and dust",
    image: "/images/pillars-of-creation.jpg",
    imageMeta: {
      imageUrl: "/images/pillars-of-creation.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA, ESA, CSA, STScI",
      imageSource: "JWST NIRCam / MIRI Composite Image (2022)",
      altText: "Towering gas and dust pillars of the Eagle Nebula glowing in infrared"
    },
    intro: "Nebulae are immense clouds of gas (predominantly hydrogen and helium) and microscopic dust grains occupying the interstellar medium of galaxies.",
    explanation: "Nebulae are categorized into five fundamental astronomical classes: Emission Nebulae (H II regions like the Orion Nebula, where energetic ultraviolet photons from young O and B stars ionize surrounding hydrogen gas, causing it to fluoresce with distinctive red H-alpha emission at 656.3 nm); Reflection Nebulae (where blue starlight is scattered by fine interstellar dust particles, as seen around the Pleiades); Dark Nebulae (dense molecular clouds that completely attenuate background starlight, such as the Horsehead Nebula); Planetary Nebulae (expanding fluorescent gas shells cast off by dying asymptotic giant branch stars); and Supernova Remnants (turbulent, shock-heated debris fields enriched with heavy elements from stellar explosions, like the Crab Nebula).",
    keyFacts: [
      "The Orion Nebula (M42) is the closest massive star-forming region to Earth, located ~1,344 light-years away in the constellation Orion.",
      "The term 'Planetary Nebula' is an 18th-century observational misnomer coined by William Herschel because their greenish circular disks resembled Uranus in early telescopes.",
      "The famous 'Pillars of Creation' inside the Eagle Nebula (M16) are monumental columns of cold molecular hydrogen being actively eroded by photoevaporation from nearby young stellar clusters.",
      "Infrared telescopes like JWST pierce through obscure nebular dust lanes to image protostars forming deep inside dense gravitational cores."
    ],
    relatedObjects: ["orion-nebula", "pillars-of-creation", "carina-nebula", "crab-nebula", "helix-nebula", "ring-nebula", "horsehead-nebula"],
    relatedTopics: ["stars", "stellar-evolution", "solar-system"]
  },
  {
    id: "neutron-stars",
    title: "Neutron Stars: Extreme Matter Laboratories",
    category: "Compact Objects",
    tagline: "City-sized atomic nuclei packed with the mass of entire stars",
    image: "/images/neutron-star.jpg",
    imageMeta: {
      imageUrl: "/images/neutron-star.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "NASA / Goddard Space Flight Center / NICER",
      imageSource: "NASA Neutron Star Interior Composition Explorer (NICER) Archive",
      altText: "Compact neutron star with hot magnetic polar emission spots"
    },
    intro: "A neutron star is the ultra-dense collapsed core of a massive supergiant star (10 to 25 M☉) remaining after a catastrophic supernova explosion.",
    explanation: "Compressing 1.4 to 2.1 solar masses into a sphere merely ~20 kilometers (12 miles) in diameter, neutron stars represent the densest observable macroscopic objects in the universe. Matter within is subjected to gravitational pressures so fierce that atomic electrons are forced into atomic nuclei via inverse beta decay (p + e⁻ → n + νₑ), resulting in a degenerate fluid composed almost entirely of neutrons. The internal structure comprises a crystalline iron crust, a mantle of exotic deformed nuclear pasta configurations, and a superfluid/superconducting neutron-proton core that may dissolve into a deconfined quark-gluon plasma at the center. Surface gravity is approximately 2 × 10¹¹ times greater than Earth's, giving neutron stars an escape velocity reaching ~0.5c (half the speed of light).",
    keyFacts: [
      "A single teaspoon of neutron-star matter would weigh over 1 billion metric tons on Earth (equivalent to Mount Everest).",
      "Neutron stars are supported against total gravitational collapse exclusively by Neutron Degeneracy Pressure and strong nuclear force repulsion.",
      "The Tolman-Oppenheimer-Volkoff (TOV) limit defines the maximum possible mass for a non-rotating neutron star (~2.17 M☉); beyond this threshold, complete collapse into a black hole is unavoidable.",
      "Light passing near a neutron star is bent so severely by gravitational lensing that observers can see more than half of its spherical surface at once."
    ],
    relatedObjects: ["crab-pulsar", "crab-nebula"],
    relatedTopics: ["pulsars", "stellar-evolution", "gravitational-waves", "black-holes"]
  },
  {
    id: "pulsars",
    title: "Pulsars & Magnetars: Cosmic Beacons",
    category: "Compact Objects",
    tagline: "Rapidly spinning relativistic lighthouses with quadrillion-Gauss magnetic fields",
    image: "/images/crab-pulsar.jpg",
    imageMeta: {
      imageUrl: "/images/crab-pulsar.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / CXC / SAO / STScI",
      imageSource: "Chandra X-ray and Hubble optical composite of Crab Pulsar",
      altText: "Rings of high-energy relativistic particles expanding from the spinning Crab Pulsar"
    },
    intro: "Pulsars are highly magnetized, rapidly rotating neutron stars that emit focused beams of electromagnetic radiation out of their magnetic poles.",
    explanation: "Because a pulsar's magnetic axis is misaligned with its rotational axis, its radiation beams sweep through space like a lighthouse beam. When these beams intersect Earth's line of sight, radio telescopes detect extraordinarily regular periodic pulses. Due to conservation of angular momentum during core collapse, pulsars spin with remarkable rapidity: millisecond pulsars rotate up to 716 times per second (e.g. PSR J1748-2446ad). Magnetars represent an extreme subclass possessing magnetic fields exceeding 10¹⁴ to 10¹⁵ Gauss (trillions of times stronger than Earth's geomagnetic field). When a magnetar's crystalline crust cracks under extreme magnetic stress ('starquake'), it releases cataclysmic bursts of high-energy gamma-rays and X-rays detectable across entire galaxies.",
    keyFacts: [
      "Jocelyn Bell Burnell discovered the first pulsar (CP 1919) in 1967, initially labeled 'LGM-1' (Little Green Men) due to its uncanny clockwork precision.",
      "Pulsar timing arrays are so astoundingly stable that they rival atomic clocks and are used as galaxy-scale detectors for low-frequency Gravitational Waves (NANOGrav).",
      "A magnetar magnetic field is strong enough to dissolve atomic electron orbitals into needle-like cylinders, rendering ordinary chemistry impossible.",
      "The Crab Pulsar at the heart of the Crab Nebula rotates approximately 30 times every single second, pumping energy into the surrounding nebula."
    ],
    relatedObjects: ["crab-pulsar", "crab-nebula"],
    relatedTopics: ["neutron-stars", "stellar-evolution", "gravitational-waves"]
  },
  {
    id: "quasars",
    title: "Quasars & Active Galactic Nuclei (AGN)",
    category: "High-Energy Astrophysics",
    tagline: "Cosmic dynamos outshining hundreds of galaxies from the hearts of infant galaxies",
    image: "/images/quasar-3c273.jpg",
    imageMeta: {
      imageUrl: "/images/quasar-3c273.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / Hubble Space Telescope",
      imageSource: "Hubble ACS view of Quasar 3C 273 and its relativistic optical jet",
      altText: "Dazzling starlike core of Quasar 3C 273 with an elongated jet"
    },
    intro: "Quasars (quasi-stellar radio sources) are the most luminous class of Active Galactic Nuclei (AGN), powered by supermassive black holes accreting matter in the early universe.",
    explanation: "Quasars inhabit the nuclei of distant galaxies and can radiate luminosities exceeding 10¹² to 10¹⁴ times that of our Sun — outshining all the combined stars of their host galaxy from a region no larger than our Solar System. As colossal amounts of interstellar gas, dust, and disrupted stars plunge toward a central supermassive black hole (ranging from 100 million to tens of billions of solar masses), gravitational potential energy is converted into kinetic energy and viscous thermal friction. Accretion disk temperatures soar to hundreds of thousands of Kelvin, emitting intense ultraviolet, optical, and X-ray radiation. Magnetic twisting collimates opposing beams of ionized plasma into Relativistic Jets traveling at over 0.99c. When such a jet happens to point directly along Earth's line of sight, the object is classified as a Blazar, displaying dramatic relativistic beaming and extreme time variability.",
    keyFacts: [
      "Quasar 3C 273 was the first quasar identified (by Maarten Schmidt in 1963), located 2.4 billion light-years away with a redshift z = 0.158.",
      "Quasars are primarily observed at high cosmological redshifts (z > 2), indicating they were widespread when the universe was young and galaxies possessed abundant cold gas to fuel their central engines.",
      "The most luminous known quasar, J0529-4351 (discovered with the VLT), is powered by a 17-billion-solar-mass black hole that swallows the equivalent of one entire Sun every single day.",
      "Quasar absorption lines serve as vital cosmic probes, illuminating intervening filaments of the cosmic web and intergalactic gas clouds."
    ],
    relatedObjects: ["ton-618", "m87-galaxy", "m87-blackhole", "sagittarius-a"],
    relatedTopics: ["black-holes", "galaxies", "universe"]
  },
  {
    id: "exoplanets",
    title: "Exoplanets & Comparative Planetology",
    category: "Exoplanetary Science",
    tagline: "Alien worlds orbiting distant suns across the galactic disk",
    image: "/images/trappist-1-system.jpg",
    imageMeta: {
      imageUrl: "/images/trappist-1-system.jpg",
      imageType: "ARTIST_CONCEPT",
      imageCredit: "NASA / JPL-Caltech",
      imageSource: "NASA Exoplanet Exploration Program",
      altText: "Artist concept of the seven Earth-sized worlds of the TRAPPIST-1 system"
    },
    intro: "Exoplanets are planets that orbit stars beyond our Solar System. Astronomers have confirmed over 5,600 exoplanets in thousands of planetary systems.",
    explanation: "The exoplanet revolution was ignited in 1995 with the discovery of 51 Pegasi b, the first confirmed planet orbiting a Sun-like star. Exoplanets are detected primarily through the Transit Method (monitoring periodic dips in stellar brightness as a planet passes in front of its star, pioneered by Kepler and TESS) and the Radial Velocity / Doppler Method (measuring the spectral wobble induced by a planet's gravitational pull). Discoveries have revealed an astonishing architectural diversity: Hot Jupiters (gas giants in blisteringly close multi-day orbits), Super-Earths (rocky worlds 1.2 to 2 times Earth's radius, unknown in our Solar System), Mini-Neptunes, and tidally locked terrestrial worlds orbiting cool red dwarfs. The Habitable Zone ('Goldilocks Zone') defines the orbital range where liquid water can stably exist on a planet's surface under appropriate atmospheric pressure.",
    keyFacts: [
      "The TRAPPIST-1 system contains seven Earth-sized rocky planets orbiting an ultra-cool red dwarf 40 light-years away, with three (e, f, g) in the habitable zone.",
      "Proxima Centauri b is the closest known exoplanet to Earth, located just 4.24 light-years away in the constellation Centaurus.",
      "Transmission spectroscopy with the James Webb Space Telescope (JWST) can detect molecules such as carbon dioxide, water vapor, methane, and sulfur dioxide in exoplanet atmospheres.",
      "Statistical extrapolations from NASA's Kepler mission indicate that our Milky Way contains more planets than stars — numbering in the hundreds of billions."
    ],
    relatedObjects: ["trappist-1-star", "trappist-1e", "proxima-centauri-b", "kepler-90-system", "kepler-186f", "55-cancri-e", "wasp-12b"],
    relatedTopics: ["stars", "solar-system"]
  },
  {
    id: "concept-solar-system",
    title: "The Solar System & Planetary Architecture",
    category: "Planetary Science",
    tagline: "Our sun-centered cosmic family of planets, moons, asteroids, and comets",
    image: "/images/solar-system.jpg",
    imageMeta: {
      imageUrl: "/images/solar-system.jpg",
      imageType: "CONCEPT_VISUALIZATION",
      imageCredit: "NASA / JPL-Caltech",
      imageSource: "NASA Planetary Photojournal",
      altText: "Composite montage of the Sun and the eight major planets of our Solar System"
    },
    intro: "Our Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular gas and dust cloud.",
    explanation: "The Solar System is structured into distinct thermodynamic and dynamical zones. Near the Sun inside the Frost Line (~2.7 AU), high temperatures allowed only metals and silicate minerals to condense, giving rise to four Terrestrial Planets: Mercury, Venus, Earth, and Mars. Beyond the Main Asteroid Belt lies the realm of the Gas Giants (Jupiter and Saturn, composed predominantly of hydrogen and helium) and the Ice Giants (Uranus and Neptune, rich in volatile water, ammonia, and methane ices). Orbiting past Neptune is the Kuiper Belt, home to icy dwarf planets including Pluto, Haumea, and Makemake. The outermost boundary is the Oort Cloud, a colossal spherical swarm of trillions of icy cometesimals extending up to 100,000 AU (~1.6 light-years) — nearly halfway to the nearest star.",
    keyFacts: [
      "The Sun contains 99.86% of the total mass of the entire Solar System, with Jupiter accounting for most of the remaining fraction.",
      "All eight major planets orbit the Sun in nearly the same ecliptic plane, moving in a counterclockwise direction as viewed from above the Sun's north pole.",
      "The solar wind carved out the Heliosphere, a vast protective magnetic bubble shielding the Solar System from galactic cosmic rays.",
      "Voyager 1 officially crossed the Heliopause into true interstellar space in August 2012, at a distance of ~121 AU from the Sun."
    ],
    relatedObjects: ["sun", "earth", "jupiter", "saturn", "mars", "venus", "mercury", "uranus", "neptune", "pluto", "ceres"],
    relatedTopics: ["moons", "comets", "asteroids", "exoplanets"]
  },
  {
    id: "moons",
    title: "Moons: Ocean Worlds & Dynamic Satellites",
    category: "Planetary Science",
    tagline: "Diverse natural satellites harboring subsurface oceans, active cryovolcanoes, and thick atmospheres",
    image: "/images/europa.jpg",
    imageMeta: {
      imageUrl: "/images/europa.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JPL-Caltech / SETI Institute",
      imageSource: "Galileo spacecraft high-resolution mosaic of Europa's cracked ice crust",
      altText: "Tectonic lineae fractures crisscrossing Europa's bright water-ice surface"
    },
    intro: "Moons are natural satellites orbiting planets and dwarf planets. The Solar System hosts over 290 recognized planetary moons displaying extraordinary geological diversity.",
    explanation: "Far from being inert barren rocks, many moons in the outer Solar System are geologically dynamic worlds sustained by Tidal Heating — gravitational flexing caused by orbital resonance and eccentricity. Jupiter's moon Io is the most volcanically active body in the Solar System, erupting sulfurous lava fountains across its surface. Europa (Jupiter) and Enceladus (Saturn) harbor global liquid water oceans concealed beneath outer ice shells, heated by tidal friction and potential hydrothermal vents at their rocky seafloors. Enceladus expels saline water-ice plumes directly into space through 'tiger stripe' fissures, feeding Saturn's E-ring. Titan (Saturn) is the only moon in the Solar System with a dense nitrogen-rich atmosphere, complete with clouds, methane rain cycles, and sprawling lakes of liquid ethane and methane.",
    keyFacts: [
      "Europa's subsurface ocean is estimated to contain more than twice the volume of all of Earth's oceans combined.",
      "Saturn's moon Titan is larger than planet Mercury and possesses a surface atmospheric pressure 50% greater than Earth's sea level.",
      "Jupiter's Ganymede is the largest moon in the Solar System and the only moon known to generate its own intrinsic magnetic dipole field.",
      "NASA's Europa Clipper mission (launched 2024) is en route to investigate Europa's habitability and ice shell thickness."
    ],
    relatedObjects: ["moon", "europa", "titan", "io", "ganymede", "enceladus", "mimas", "triton", "callisto", "charon"],
    relatedTopics: ["solar-system", "space-missions"]
  },
  {
    id: "comets",
    title: "Comets: Icy Messengers from the Deep Freeze",
    category: "Small Solar System Bodies",
    tagline: "Primordial 'dirty snowballs' preserving the chemical recipe of the infant Solar System",
    image: "/images/comet-neowise.jpg",
    imageMeta: {
      imageUrl: "/images/comet-neowise.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "NASA / Bill Dunford / NEOWISE",
      imageSource: "Comet C/2020 F3 (NEOWISE) over Earth horizon",
      altText: "Comet NEOWISE displaying a brilliant blue ion tail and sweeping white dust tail"
    },
    intro: "Comets are cosmic snowballs of frozen gases, rock, and dust that orbit the Sun in highly elliptical trajectories.",
    explanation: "When a comet approaches perihelion (closest approach to the Sun), solar radiant heating sublimates volatile ices (water, carbon monoxide, methane, and ammonia). The escaping gas drags dust particles along, forming an immense glowing envelope called a Coma, which can swell to the size of Jupiter or larger. Radiation pressure from solar photons pushes microscopic dust particles outward into a gently curved, whitish Dust Tail, while the magnetized Solar Wind ionizes gases and sweeps them directly away from the Sun into a narrow, bluish Ion Tail (Gas Tail). Short-period comets (orbital periods < 200 years, like Halley's Comet) originate primarily in the Kuiper Belt and Scattered Disc, while long-period comets (periods of thousands to millions of years) originate in the distant, spherical Oort Cloud.",
    keyFacts: [
      "Halley's Comet (1P/Halley) is the most famous periodic comet, returning to the inner Solar System every 75–76 years (next perihelion in mid-2061).",
      "ESA's Rosetta mission (2014–2016) orbited comet 67P/Churyumov–Gerasimenko and deployed the Philae lander directly onto its surface, detecting complex organic molecules.",
      "Meteor showers on Earth (such as the Perseids and Leonids) occur when our planet sweeps through dusty debris streams left behind along historic cometary orbits.",
      "A comet's ion tail always points directly away from the Sun regardless of the comet's direction of motion, driven by the outward pressure of the solar wind."
    ],
    relatedObjects: ["comet-halley", "comet-neowise", "oumuamua", "kuiper-belt", "oort-cloud"],
    relatedTopics: ["solar-system", "asteroids"]
  },
  {
    id: "asteroids",
    title: "Asteroids & Near-Earth Objects",
    category: "Small Solar System Bodies",
    tagline: "Rocky relics of planetary accretion that never coalesced into a full world",
    image: "/images/bennu.jpg",
    imageMeta: {
      imageUrl: "/images/bennu.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / Goddard / University of Arizona",
      imageSource: "OSIRIS-REx mosaic of near-Earth asteroid Bennu",
      altText: "Rugged boulder-strewn surface of rubble-pile asteroid Bennu"
    },
    intro: "Asteroids are rocky, metallic, or carbonaceous remnants left over from the early formation of our Solar System approximately 4.6 billion years ago.",
    explanation: "The vast majority of known asteroids reside in the Main Asteroid Belt between Mars and Jupiter (~2.2 to 3.2 AU). Jupiter's powerful gravitational resonances (Kirkwood gaps) stirred up orbital velocities and prevented these planetesimals from coalescing into a single planetary body. Asteroids are classified taxonomically based on spectral reflectance: C-type (carbonaceous, ~75% of known asteroids, rich in dark carbon compounds and clays); S-type (silicate/stony, ~17%, composed of iron- and magnesium-silicates); and M-type (metallic, nickel-iron cores of disrupted differentiated proto-worlds, such as 16 Psyche). Near-Earth Asteroids (NEAs) have orbits that bring them within 1.3 AU of the Sun; planetary defense surveys continually monitor Potentially Hazardous Asteroids (PHAs).",
    keyFacts: [
      "The total mass of all asteroids in the Main Asteroid Belt combined is less than 4% the mass of Earth's Moon, with dwarf planet Ceres accounting for roughly one-third of that total.",
      "Many small asteroids (like Bennu and Ryugu) are not monolithic solid rocks, but gravitationally bound 'rubble piles' with up to 50% internal void porosity.",
      "NASA's OSIRIS-REx successfully collected a pristine 121.6-gram sample from carbon-rich asteroid Bennu and returned it to Earth in September 2023.",
      "NASA's DART (Double Asteroid Redirection Test) mission in 2022 successfully demonstrated kinetic impact planetary defense by altering the orbit of asteroid Dimorphos."
    ],
    relatedObjects: ["ceres", "vesta", "bennu", "asteroid-belt"],
    relatedTopics: ["solar-system", "comets", "space-missions"]
  },
  {
    id: "space-missions",
    title: "Space Missions & Humanity's Fleet",
    category: "Astronautics & Exploration",
    tagline: "Robotic emissaries, space telescopes, and interstellar probes charting the deep cosmos",
    image: "/images/jwst.jpg",
    imageMeta: {
      imageUrl: "/images/jwst.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / Chris Gunn",
      imageSource: "James Webb Space Telescope fully unfolded mirror array",
      altText: "JWST 18 gold-coated beryllium hexagonal primary mirror segments"
    },
    intro: "Space exploration utilizes sophisticated robotic spacecraft, rovers, and space observatories to probe worlds across our Solar System and peer across cosmic deep time.",
    explanation: "From the launch of Sputnik in 1957 to contemporary multi-agency deep-space observatories, robotic missions have transformed astronomy from a passive skyward gaze into an active exploratory science. Great Observatories like the Hubble Space Telescope and the James Webb Space Telescope (JWST) operate above the distorting blanket of Earth's atmosphere, capturing ultra-sharp infrared, optical, and ultraviolet photons from the cosmic dawn. Planetary rovers (Curiosity, Perseverance) conduct robotic field geology on the Martian surface, searching for biosignatures in ancient lake beds. Outer-planet flagships (Voyager 1 and 2, Cassini-Huygens, New Horizons) have traversed billions of kilometers to reveal ring dynamics, hydrocarbon lakes, and geysers across the outer solar system.",
    keyFacts: [
      "The James Webb Space Telescope operates at the Sun-Earth Lagrange Point 2 (L2), approximately 1.5 million kilometers (1 million miles) from Earth.",
      "Voyager 1 is the most distant human-made object in history, traveling at ~17 km/s at a distance exceeding 160 AU (over 24 billion kilometers) from Earth.",
      "NASA's Parker Solar Probe travels through the Sun's outer corona at speeds exceeding 690,000 km/h (430,000 mph), making it the fastest human artifact ever created.",
      "The Hubble Space Telescope has conducted over 1.6 million scientific observations since its historic deployment in 1990."
    ],
    relatedObjects: ["hubble", "jwst", "voyager", "cassini", "perseverance", "parker-solar-probe"],
    relatedTopics: ["solar-system", "universe", "exoplanets"]
  },
  {
    id: "dark-matter",
    title: "Dark Matter: The Invisible Cosmic Scaffolding",
    category: "Cosmology & Particle Physics",
    tagline: "Non-luminous mass that gravitationally binds galaxies and weaves the cosmic web",
    image: "/images/universe.jpg",
    imageMeta: {
      imageUrl: "/images/universe.jpg",
      imageType: "CONCEPT_VISUALIZATION",
      imageCredit: "Millennium Simulation / Max Planck Institute for Astrophysics",
      imageSource: "Cosmic web dark matter filament simulation",
      altText: "Cosmic web filaments of dark matter connecting glowing galaxy clusters"
    },
    intro: "Dark matter is an elusive, hypothetical form of matter that does not absorb, reflect, or emit light, yet exerts gravitational influence on cosmic scales.",
    explanation: "Dark matter accounts for approximately 85% of all matter in the universe and 26.8% of the total cosmic mass-energy density. Its existence was first inferred in the 1930s by Fritz Zwicky (observing the velocity dispersion of galaxies in the Coma Cluster) and solidified in the 1970s by Vera Rubin and Kent Ford through galactic rotation curves, which revealed that stars at galaxy outskirts orbit much faster than can be accounted for by visible luminous matter alone. Gravitational Lensing provides definitive proof: mass bends light rays, allowing astronomers to map dark matter distributions directly in galaxy clusters. In the famous Bullet Cluster (1E 0657-558), hot X-ray-emitting baryonic gas collided and slowed down via electromagnetic drag, while the gravitational mass (mapped via lensing) passed straight through without friction, cleanly separating dark matter from ordinary atomic gas.",
    keyFacts: [
      "Dark matter does not interact with the electromagnetic force, meaning it is completely transparent and cannot form ordinary atoms.",
      "Leading candidates for dark matter particles include WIMPs (Weakly Interacting Massive Particles), Axions, and Sterile Neutrinos.",
      "Without dark matter halos, galaxies would lack sufficient gravitational pull to hold themselves together and would fly apart at their measured rotation velocities.",
      "The cosmic web of dark matter filaments serves as the gravitational foundation where primordial hydrogen pooled to form the very first stars and galaxies."
    ],
    relatedObjects: ["universe", "milky-way", "andromeda"],
    relatedTopics: ["dark-energy", "universe", "galaxies", "cosmic-microwave-background"]
  },
  {
    id: "dark-energy",
    title: "Dark Energy & Cosmic Acceleration",
    category: "Cosmology & Fundamental Physics",
    tagline: "The enigmatic force driving the accelerating expansion of the universe",
    image: "/images/universe.jpg",
    imageMeta: {
      imageUrl: "/images/universe.jpg",
      imageType: "DIAGRAM",
      imageCredit: "NASA / STScI / Ann Feild",
      imageSource: "Cosmic Expansion Timeline Graph",
      altText: "Diagram illustrating the accelerating expansion rate of spacetime"
    },
    intro: "Dark Energy is the unknown, pervasive form of energy that permeates all of space and accelerates the expansion of the universe.",
    explanation: "Discovered unexpectedly in 1998 by the Supernova Cosmology Project and the High-Z Supernova Search Team using Type Ia supernovae as cosmic standard candles (awarded the 2011 Nobel Prize in Physics), cosmic expansion was shown to be speeding up rather than slowing down under gravity. Dark Energy constitutes approximately 68.3% of the universe's total energy density. In Einstein's field equations of General Relativity, it can be modeled as the Cosmological Constant (Λ), representing an intrinsic, non-diluting vacuum energy density with negative pressure (w = -1). As spacetime expands, the density of matter and radiation steadily decreases, but the density of dark energy remains constant per unit volume, making it increasingly dominant over cosmological time.",
    keyFacts: [
      "Dark energy became gravitationally dominant over matter approximately 5 billion years ago, initiating the current epoch of accelerated expansion.",
      "If dark energy continues to act as a cosmological constant, the universe will culminate in the 'Big Freeze' (Heat Death): galaxies will slip beyond our causal event horizon, stars will exhaust their fuel, and entropy will reach maximum.",
      "Quantum field theory's naive prediction for vacuum energy density exceeds the observed value of dark energy by roughly 120 orders of magnitude — the 'worst prediction in theoretical physics' (Cosmological Constant Problem).",
      "Next-generation observatories like the Nancy Grace Roman Space Telescope and ESA's Euclid mission are specifically designed to measure dark energy's equation of state across billions of light-years."
    ],
    relatedObjects: ["universe"],
    relatedTopics: ["universe", "dark-matter", "cosmic-microwave-background"]
  },
  {
    id: "gravitational-waves",
    title: "Gravitational Waves: Ripples in Spacetime",
    category: "Relativistic Astrophysics",
    tagline: "Distortions of spacetime fabric radiating outward from cataclysmic cosmic collisions",
    image: "/images/gravitational-waves.jpg",
    imageMeta: {
      imageUrl: "/images/gravitational-waves.jpg",
      imageType: "SCIENTIFIC_ILLUSTRATION",
      imageCredit: "LIGO / Caltech / MIT / Sonoma State University",
      imageSource: "LIGO Gravitational Wave Binary Merger Simulation",
      altText: "Concentric spacetime distortion waves radiating from two merging black holes"
    },
    intro: "Gravitational waves are ripples in the fabric of spacetime produced by accelerating massive celestial objects, propagating at the speed of light.",
    explanation: "Predicted by Albert Einstein in 1916 as a consequence of General Relativity, gravitational waves carry energy away from energetic cosmic events as quadrupole radiation. On September 14, 2015, the Laser Interferometer Gravitational-Wave Observatory (LIGO) made the historic first-ever direct detection (GW150914): the inspiral and merger of two stellar-mass black holes (36 and 29 M☉) located 1.3 billion light-years away, radiating 3 solar masses of pure gravitational energy in a fraction of a second. Laser interferometers measure infinitesimal spacetime strains on the order of 10⁻²¹ — equivalent to measuring a change in the 4-kilometer arm length of less than one ten-thousandth the diameter of a proton.",
    keyFacts: [
      "Gravitational waves travel at precisely the speed of light (c), as verified to within one part in 10¹⁵ during the simultaneous 2017 detection of GW170817 and gamma-ray burst GRB 170817A.",
      "The detection of binary neutron star merger GW170817 marked the dawn of Multi-Messenger Astronomy, observed simultaneously across gravitational waves, gamma-rays, X-rays, optical, and radio waves.",
      "LISA (Laser Interferometer Space Antenna), an ESA-led mission launching in the 2030s, will place three spacecraft in a triangular orbit spanning 2.5 million kilometers to detect low-frequency gravitational waves from supermassive black hole mergers.",
      "Pulsar Timing Arrays (such as NANOGrav) detected an all-sky stochastic background of nanohertz gravitational waves in 2023, likely generated by millions of inspiraling supermassive black hole pairs across cosmic time."
    ],
    relatedObjects: ["sagittarius-a", "m87-blackhole", "neutron-star", "crab-pulsar"],
    relatedTopics: ["black-holes", "neutron-stars", "stellar-evolution"]
  },
  {
    id: "cosmic-microwave-background",
    title: "The Cosmic Microwave Background (CMB)",
    category: "Cosmology",
    tagline: "The thermal afterglow of the Big Bang, frozen into the sky when the universe was 380,000 years old",
    image: "/images/cmb.jpg",
    imageMeta: {
      imageUrl: "/images/cmb.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "ESA / Planck Collaboration",
      imageSource: "Planck All-Sky CMB Temperature Anisotropy Map",
      altText: "Mottled temperature fluctuations of the early universe mapped by the Planck satellite"
    },
    intro: "The Cosmic Microwave Background (CMB) is the oldest electromagnetic radiation in the universe, filling all of space with an almost uniform thermal glow.",
    explanation: "For the first 380,000 years after the Big Bang, the universe was an opaque, ionized plasma of photons, protons, electrons, and helium nuclei in thermal equilibrium. Photons could not travel freely because they constantly scattered off free electrons (Thomson scattering). As the universe expanded and cooled to ~3,000 Kelvin (about 0.3 eV), electrons combined with protons to form the first neutral hydrogen atoms — an epoch termed Recombination. With free electrons bound into atoms, the universe suddenly became transparent, and photons began to free-stream across space (Photon Decoupling). Over 13.8 billion years of cosmic expansion, these photons have been redshifted by a factor of ~1,100 from visible orange light down to the microwave spectrum, exhibiting an exquisitely precise blackbody spectrum at 2.7255 Kelvin.",
    keyFacts: [
      "The CMB was discovered accidentally in 1964 by radio astronomers Arno Penzias and Robert Wilson using the Holmdel Horn Antenna, earning them the 1978 Nobel Prize in Physics.",
      "The temperature of the CMB is uniform across the entire sky to one part in 100,000, with minute microkelvin anisotropies that represent the quantum density fluctuations that seeded all galaxies and cosmic filaments.",
      "The angular power spectrum of the CMB anisotropies provides cosmologists with precise measurements of the age of the universe (13.787 Gyr), the curvature of space, and the exact ratios of dark energy, dark matter, and atomic matter.",
      "If you tuned an old analog television to an empty channel between broadcasts, roughly 1% of the static 'snow' on the screen was caused by antenna interactions with CMB photons."
    ],
    relatedObjects: ["universe"],
    relatedTopics: ["universe", "dark-energy", "dark-matter"]
  }
];

export function getKnowledgeTopic(id) {
  if (!id) return null;
  return knowledgeTopics.find(t => 
    t.id === id || 
    (id === 'universe' && t.id === 'concept-observable-universe') || 
    (id === 'solar-system' && t.id === 'concept-solar-system')
  ) || null;
}

export function getKnowledgeByCategory(category) {
  if (!category || category === 'all') return knowledgeTopics;
  return knowledgeTopics.filter(t => t.category.toLowerCase() === category.toLowerCase());
}
