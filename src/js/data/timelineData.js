// ASTRAVERSE 2.0 - Cosmic Timeline & Powers of 10 Scale Data

export const cosmicTimelineEvents = [
  {
    id: "big-bang",
    epoch: "t = 0",
    timeAgo: "13.787 Billion Years Ago",
    title: "The Big Bang",
    category: "Origins",
    icon: "💥",
    summary: "The birth of spacetime, fundamental forces, and energy from an infinitesimally hot, dense singularity.",
    description: "The universe began as an extremely hot, dense point approximately 13.8 billion years ago. Space, time, and the fundamental interactions emerged. Within the first fraction of a second, Cosmic Inflation expanded the volume of space exponentially by a factor of at least 10²⁶, smoothing out spacetime curvature and setting the initial quantum seeds for all future cosmic structures."
  },
  {
    id: "nucleosynthesis",
    epoch: "t = 3 minutes",
    timeAgo: "13.787 Billion Years Ago",
    title: "Primordial Nucleosynthesis",
    category: "Origins",
    icon: "⚛️",
    summary: "Formation of the first atomic nuclei: hydrogen, helium, and trace amounts of lithium.",
    description: "As the expanding universe cooled to approximately 1 billion Kelvin, protons and neutrons condensed and fused into the earliest atomic nuclei: ~75% Hydrogen (¹H), ~25% Helium (⁴He), and trace quantities of Deuterium and Lithium-7. These precise primordial abundance ratios match modern spectroscopic measurements with extraordinary accuracy."
  },
  {
    id: "recombination",
    epoch: "t = 380,000 years",
    timeAgo: "13.786 Billion Years Ago",
    title: "Recombination & The Cosmic Microwave Background",
    category: "Cosmology",
    icon: "📡",
    summary: "The universe becomes transparent as electrons bind to nuclei, releasing the oldest light in the cosmos.",
    description: "The universe cooled below ~3,000 Kelvin, allowing free electrons to bind to protons and form neutral atomic hydrogen. Prior to this, free electrons scattered photons continuously. With electrons trapped in atoms, photons decoupled and began free-streaming through space. This primordial afterglow has stretched with cosmic expansion over 13.8 billion years to form the 2.725 K Cosmic Microwave Background (CMB)."
  },
  {
    id: "dark-ages",
    epoch: "t = 380,000 to 150 million years",
    timeAgo: "13.6 to 13.78 Billion Years Ago",
    title: "The Cosmic Dark Ages",
    category: "Cosmic Dawn",
    icon: "🌑",
    summary: "A starless epoch of pure darkness where gravity quietly gathered matter into massive clumps.",
    description: "Following recombination, no stars or luminous objects existed in the universe. Space was filled with cold neutral hydrogen and helium, expanding in total optical darkness. However, invisible dark matter halos exerted quiet gravitational tugs, steadily drawing baryonic gas into denser filaments and gravitational wells."
  },
  {
    id: "first-stars",
    epoch: "t = 100 to 400 million years",
    timeAgo: "13.4 to 13.6 Billion Years Ago",
    title: "First Stars (Population III) & Cosmic Reionization",
    category: "Cosmic Dawn",
    icon: "✨",
    summary: "The ignition of the universe's first pristine, metal-free hypermassive stars.",
    description: "In the dense gravitational nodes of the cosmic web, pristine hydrogen and helium gas collapsed to ignite the very first generation of stars (Population III). Containing zero heavy elements, these stars were colossal behemoths (100 to 300+ solar masses) burning with searing blue-white ferocity. Their intense ultraviolet emission ionized the surrounding intergalactic hydrogen gas — the Epoch of Reionization — making the universe transparent to UV radiation."
  },
  {
    id: "first-galaxies",
    epoch: "t = 400 to 600 million years",
    timeAgo: "13.2 to 13.4 Billion Years Ago",
    title: "Birth of the First Galaxies",
    category: "Galactic Evolution",
    icon: "🌀",
    summary: "Early protogalaxies coalesce from merging star clusters, imaged by the James Webb Space Telescope.",
    description: "Hundreds of thousands of early star clusters coalesced under mutual gravitation to forge the first dwarf galaxies. JWST observations (such as JADES-GS-z14-0) have demonstrated that early galaxies grew and assembled far more rapidly and possessed much higher luminosities than previously anticipated by classical cosmological models."
  },
  {
    id: "milky-way-birth",
    epoch: "t = ~800 million years",
    timeAgo: "13.6 Billion Years Ago",
    title: "Formation of the Milky Way",
    category: "Galactic Evolution",
    icon: "🌌",
    summary: "The ancestral proto-Milky Way begins assembly through hierarchical mergers of ancient star clusters.",
    description: "The ancestral core of our galaxy took shape through successive mergers of gas-rich dwarf galaxies and globular clusters. The oldest stars in our galaxy's spherical halo (such as HD 140283, the 'Methuselah Star') date back over 13.5 billion years. Subsequent accretion of gas formed the thin and thick rotating disks with spectacular spiral density wave arms."
  },
  {
    id: "cosmic-noon",
    epoch: "t = ~3 to 4 billion years",
    timeAgo: "10 Billion Years Ago",
    title: "Cosmic Noon: Peak Star Formation",
    category: "Galactic Evolution",
    icon: "☀️",
    summary: "The era when galaxies experienced their most frenzied rates of star birth and supermassive black hole growth.",
    description: "At a cosmological redshift of z ~ 2, the universe reached its energetic apex: galaxies were forming stars at rates dozens of times higher than today, and supermassive black holes were actively accreting matter as dazzling quasars. Since Cosmic Noon, the global star formation rate of the universe has steadily declined."
  },
  {
    id: "solar-system-birth",
    epoch: "t = 9.2 billion years",
    timeAgo: "4.57 Billion Years Ago",
    title: "Formation of the Solar System & Sun",
    category: "Solar System",
    icon: "🪐",
    summary: "A dense molecular cloud core collapses to form our Sun and the protoplanetary accretion disk.",
    description: "A localized perturbation in a molecular cloud (likely triggered by a nearby supernova shockwave) triggered gravitational collapse. Conservation of angular momentum flattened the gas and dust into a spinning protoplanetary disk. At the center, core fusion ignited Sol (our Sun), while dust grains accreted into pebbles, boulders, planetesimals, and finally the four rocky planets, asteroid belt, and four giant outer planets."
  },
  {
    id: "earth-oceans",
    epoch: "t = 9.3 billion years",
    timeAgo: "4.54 to 4.4 Billion Years Ago",
    title: "Formation of Earth, Moon, and Oceans",
    category: "Earth & Life",
    icon: "🌍",
    summary: "The Giant Impact hypothesis creates the Moon; cooling crust allows liquid water oceans to condense.",
    description: "Earth accreted from rocky planetesimals. Roughly 4.5 billion years ago, a Mars-sized protoplanet named Theia collided with the infant proto-Earth. The ejected mantle debris coalesced in orbit to create the Moon. As volcanic outgassing and icy cometary/asteroidal bombardment delivered water, the crust cooled sufficiently for the first liquid oceans to form."
  },
  {
    id: "life-origins",
    epoch: "t = 10.0 billion years",
    timeAgo: "3.8 Billion Years Ago",
    title: "Origin of Life on Earth",
    category: "Earth & Life",
    icon: "🧬",
    summary: "The first self-replicating microbial life emerges in hydrothermal vents and primordial tidal pools.",
    description: "Chemical evolution bridged into biological evolution. Complex organic molecules, amino acids, and RNA-based molecular machinery assembled near submarine alkaline hydrothermal vents, yielding the Last Universal Common Ancestor (LUCA). By 3.5 billion years ago, stromatolite-forming cyanobacteria had begun thriving in shallow seas."
  },
  {
    id: "great-oxidation",
    epoch: "t = 11.4 billion years",
    timeAgo: "2.4 Billion Years Ago",
    title: "The Great Oxidation Event",
    category: "Earth & Life",
    icon: "🌱",
    summary: "Oxygenic photosynthesis transforms Earth's atmosphere and establishes the ozone layer.",
    description: "Photosynthetic cyanobacteria began producing free molecular oxygen (O2) as a metabolic byproduct. Once oceanic iron sinks were saturated (forming banded iron formations), oxygen began accumulating in the atmosphere, creating the protective stratospheric ozone layer and driving the evolution of aerobic multicellular life."
  },
  {
    id: "present-day",
    epoch: "t = 13.787 billion years",
    timeAgo: "Present Day",
    title: "The Anthropocene & Space Age",
    category: "Modern Era",
    icon: "🚀",
    summary: "Conscious observers construct robotic probes and space telescopes to decipher the cosmos.",
    description: "Humanity steps into space. In the 20th and 21st centuries, humans land on the Moon, deploy robotic fleets across all major planets and their moons, launch infrared space telescopes to glimpse the edge of the universe, and construct detectors to feel gravitational waves ripple through spacetime."
  },
  {
    id: "future-andromeda",
    epoch: "t = ~18.3 billion years",
    timeAgo: "4.5 Billion Years into the Future",
    title: "Milky Way & Andromeda Galactic Collision",
    category: "Future Cosmos",
    icon: "🌀",
    summary: "The Milky Way and Andromeda merge into a colossal giant elliptical galaxy: 'Milkomeda'.",
    description: "Moving toward each other at ~110 km/s under mutual gravitation, the Milky Way and Andromeda will experience a series of close tidal passages before fully merging into an immense elliptical galaxy. Individual stellar collisions will be virtually non-existent due to vast interstellar distances, but gas clouds will compress, igniting a temporary burst of star formation."
  },
  {
    id: "future-sun-redgiant",
    epoch: "t = ~18.8 billion years",
    timeAgo: "5.0 Billion Years into the Future",
    title: "Death of the Sun: Red Giant Phase",
    category: "Future Cosmos",
    icon: "🔴",
    summary: "The Sun exhausts core hydrogen, engulfs Mercury and Venus, and casts off a planetary nebula.",
    description: "Having exhausted its core hydrogen, the Sun will expand over 200 times its current diameter into a Red Giant, engulfing Mercury and Venus and boiling away Earth's oceans and atmosphere. Eventually, the Sun will shed its outer layers as a colorful planetary nebula, leaving behind a cooling Earth-sized White Dwarf."
  },
  {
    id: "future-heat-death",
    epoch: "t = 10¹⁴ to 10¹⁰⁰ years",
    timeAgo: "Far Future (>100 Trillion Years)",
    title: "The Degenerate Era & Ultimate Heat Death (Big Freeze)",
    category: "Future Cosmos",
    icon: "❄️",
    summary: "Stars burn out, black holes evaporate via Hawking radiation, and the universe reaches thermodynamic equilibrium.",
    description: "By 100 trillion years, all interstellar gas will be exhausted and the last red dwarf stars will die. During the Degenerate Era, the universe will be populated solely by black dwarfs, neutron stars, and black holes. Over 10⁴⁰ to 10¹⁰⁰ years, even black holes will evaporate through Hawking radiation into a thin, uniform bath of photons and leptons at absolute zero — the Big Freeze."
  }
];

export const cosmicScaleSteps = [
  {
    level: 1,
    name: "Human Scale",
    object: "Human Being",
    sizeMeters: 1.7,
    sizeScientific: "1.7 × 10⁰ m",
    readableSize: "1.7 meters",
    factorComparison: "Baseline observation scale",
    icon: "🧍",
    image: "/images/earth.jpg",
    description: "The scale of everyday human biological experience on the surface of planet Earth."
  },
  {
    level: 2,
    name: "Planetary Scale: Earth",
    object: "Planet Earth",
    sizeMeters: 1.2742e7,
    sizeScientific: "1.27 × 10⁷ m",
    readableSize: "12,742 kilometers",
    factorComparison: "~7.5 million times wider than a human",
    icon: "🌍",
    image: "/images/earth.jpg",
    description: "A rocky terrestrial planet orbiting in Sol's habitable zone with liquid water oceans and a nitrogen-oxygen atmosphere."
  },
  {
    level: 3,
    name: "Giant Planet Scale: Jupiter",
    object: "Planet Jupiter",
    sizeMeters: 1.3982e8,
    sizeScientific: "1.40 × 10⁸ m",
    readableSize: "139,820 kilometers",
    factorComparison: "11 times the diameter of Earth (1,321 Earths could fit inside)",
    icon: "🪐",
    image: "/images/jupiter.jpg",
    description: "The King of Planets — a massive gas giant containing 2.5 times the mass of all other planets in the Solar System combined."
  },
  {
    level: 4,
    name: "Stellar Scale: The Sun",
    object: "The Sun (Sol)",
    sizeMeters: 1.3927e9,
    sizeScientific: "1.39 × 10⁹ m",
    readableSize: "1,392,700 kilometers",
    factorComparison: "109 times the diameter of Earth (1.3 million Earths could fit inside)",
    icon: "☀️",
    image: "/images/sun.jpg",
    description: "A G-type main-sequence star whose gravitational domain holds the entire Solar System in orbital lock."
  },
  {
    level: 5,
    name: "Planetary Orbit Scale: Solar System",
    object: "Neptune's Orbit (Inner Solar System)",
    sizeMeters: 9.0e12,
    sizeScientific: "9.0 × 10¹² m",
    readableSize: "~60 Astronomical Units (9 billion km)",
    factorComparison: "6,400 times wider than the Sun",
    icon: "🛰️",
    image: "/images/solar-system.jpg",
    description: "The orbital realm spanned by the eight major planets, terminating at the orbit of ice giant Neptune (~30 AU radius)."
  },
  {
    level: 6,
    name: "Trans-Neptunian Scale: Kuiper Belt",
    object: "The Kuiper Belt",
    sizeMeters: 1.5e13,
    sizeScientific: "1.5 × 10¹³ m",
    readableSize: "~100 Astronomical Units (15 billion km)",
    factorComparison: "Light takes ~14 hours to cross this expanse",
    icon: "☄️",
    image: "/images/kuiper-belt.jpg",
    description: "A ring-shaped circumstellar disc extending from Neptune's orbit out to 50 AU, populated by hundreds of thousands of icy bodies and dwarf planets."
  },
  {
    level: 7,
    name: "Interstellar Threshold: Oort Cloud",
    object: "The Oort Cloud",
    sizeMeters: 1.5e16,
    sizeScientific: "1.5 × 10¹⁶ m",
    readableSize: "~100,000 AU (~1.6 Light-Years)",
    factorComparison: "1,000 times larger than the Kuiper Belt (almost halfway to Proxima Centauri)",
    icon: "❄️",
    image: "/images/oort-cloud.jpg",
    description: "A vast theoretical spherical cloud of trillions of icy planetesimals enveloping the Solar System at the extreme gravitational boundary of the Sun."
  },
  {
    level: 8,
    name: "Interstellar Medium: Star-Forming Nebula",
    object: "Orion Nebula (M42)",
    sizeMeters: 2.27e17,
    sizeScientific: "2.3 × 10¹⁷ m",
    readableSize: "~24 Light-Years across",
    factorComparison: "15 times larger than the Oort Cloud",
    icon: "🌫️",
    image: "/images/orion-nebula.jpg",
    description: "A massive turbulent stellar nursery of ionized gas and dust glowing brightly as hundreds of young stars are actively born."
  },
  {
    level: 9,
    name: "Galactic Scale: Milky Way Galaxy",
    object: "Milky Way Galaxy",
    sizeMeters: 1.0e21,
    sizeScientific: "1.0 × 10²¹ m",
    readableSize: "~105,000 Light-Years across",
    factorComparison: "Over 4,300 times wider than the Orion Nebula (hosts 100–400 billion stars)",
    icon: "🌀",
    image: "/images/milky-way.jpg",
    description: "Our home barred spiral galaxy, rotating once every 230 million years around its central supermassive black hole, Sagittarius A*."
  },
  {
    level: 10,
    name: "Galactic Cluster Scale: Local Group",
    object: "The Local Group of Galaxies",
    sizeMeters: 9.5e22,
    sizeScientific: "9.5 × 10²² m",
    readableSize: "~10 Million Light-Years across",
    factorComparison: "100 times larger than the Milky Way (contains ~80 member galaxies)",
    icon: "🌌",
    image: "/images/andromeda.jpg",
    description: "A gravitationally bound cluster dominated by the Milky Way and Andromeda, bound together against the cosmic expansion."
  },
  {
    level: 11,
    name: "Cosmic Horizon: Observable Universe",
    object: "The Observable Universe",
    sizeMeters: 8.8e26,
    sizeScientific: "8.8 × 10²⁶ m",
    readableSize: "~93 Billion Light-Years across",
    factorComparison: "9,300 times larger than the Local Group (contains ~2 trillion galaxies)",
    icon: "🔭",
    image: "/images/universe.jpg",
    description: "The complete spherical horizon of spacetime from which light has had sufficient time to reach our telescopes since the Big Bang."
  }
];
