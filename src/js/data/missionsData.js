// ASTRAVERSE 2.0 - Space Missions Fleet Data
// Authoritative profiles of humanity's greatest astronomical observatories and interplanetary probes

export const spaceMissions = [
  {
    id: "jwst",
    name: "James Webb Space Telescope (JWST)",
    agency: "NASA / ESA / CSA",
    launchYear: 2021,
    status: "Active (Nominal Science)",
    target: "Deep Space / Early Universe / Exoplanet Atmospheres",
    type: "Space Telescope",
    orbit: "Sun-Earth Lagrange Point 2 (L2, ~1.5 million km from Earth)",
    purpose: "Study every phase of cosmic history: the first luminous glows after the Big Bang, formation of galaxies and stellar systems capable of supporting life, and exoplanet atmospheric compositions.",
    discoveries: [
      "Detected candidate galaxies forming just 300 million years after the Big Bang (e.g. JADES-GS-z14-0 at z = 14.32).",
      "First clear direct detection of carbon dioxide (CO2) and sulfur dioxide (SO2) in exoplanet atmospheres (WASP-39b).",
      "Captured unprecedented high-resolution infrared imagery of the Pillars of Creation and Carina Nebula Cosmic Cliffs.",
      "Identified carbon-bearing molecules in the atmosphere of habitable-zone sub-Neptune exoplanet K2-18b."
    ],
    image: "/images/jwst.jpg",
    imageMeta: {
      imageUrl: "/images/jwst.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / Chris Gunn",
      imageSource: "NASA Goddard Space Flight Center",
      altText: "James Webb Space Telescope showing its 6.5-meter gold-plated beryllium primary mirror array"
    }
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope (HST)",
    agency: "NASA / ESA",
    launchYear: 1990,
    status: "Active (Over 34 Years of Science)",
    target: "Low Earth Orbit (Optical / UV / Near-IR Deep Sky)",
    type: "Space Telescope",
    orbit: "Low Earth Orbit (~535 km altitude)",
    purpose: "Provide crystal-clear astronomical views free from Earth's atmospheric distortion across ultraviolet, visible, and near-infrared wavelengths.",
    discoveries: [
      "Constrained the Hubble Constant (cosmic expansion rate) to an unprecedented precision of ~10%.",
      "Provided crucial evidence that the expansion of the universe is accelerating under the influence of Dark Energy.",
      "Demonstrated that supermassive black holes reside at the centers of virtually all massive galaxies.",
      "Produced the iconic Hubble Deep Field (1995) and Ultra Deep Field (2004/2014), unveiling thousands of primordial infant galaxies."
    ],
    image: "/images/universe.jpg", // high quality backup image
    imageMeta: {
      imageUrl: "/images/universe.jpg",
      imageType: "TELESCOPE_IMAGE",
      imageCredit: "NASA / ESA / STScI",
      imageSource: "Hubble Space Telescope Heritage Archive",
      altText: "Hubble Space Telescope Ultra Deep Field view of thousands of galaxies"
    }
  },
  {
    id: "voyager-1",
    name: "Voyager 1",
    agency: "NASA / JPL",
    launchYear: 1977,
    status: "Active (Interstellar Mission)",
    target: "Jupiter, Saturn, Titan, & Interstellar Space",
    type: "Interstellar Probe",
    orbit: "Hyperbolic Solar Escape Trajectory (~162 AU from Earth)",
    purpose: "Explore the outer Gas Giant systems of Jupiter and Saturn, their major moons, rings, and journey into pristine interstellar space.",
    discoveries: [
      "First spacecraft to cross the Heliopause and enter true interstellar space (August 25, 2012).",
      "Discovered active volcanism on Jupiter's moon Io — the first active volcanoes discovered outside Earth.",
      "Captured the iconic 'Pale Blue Dot' photograph of Earth from 6 billion kilometers away in 1990.",
      "Revealed complex ringlet and spoke structures inside Saturn's ring system."
    ],
    image: "/images/voyager.jpg",
    imageMeta: {
      imageUrl: "/images/voyager.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JPL-Caltech",
      imageSource: "NASA Planetary Photojournal",
      altText: "Artist rendering of Voyager spacecraft traveling through interstellar space"
    }
  },
  {
    id: "voyager-2",
    name: "Voyager 2",
    agency: "NASA / JPL",
    launchYear: 1977,
    status: "Active (Interstellar Mission)",
    target: "Jupiter, Saturn, Uranus, Neptune, & Interstellar Space",
    type: "Interstellar Probe",
    orbit: "Hyperbolic Solar Escape Trajectory (~135 AU from Earth)",
    purpose: "Conduct the historic 'Grand Tour' of all four outer giant planets (Jupiter, Saturn, Uranus, Neptune) and explore the outer heliosphere.",
    discoveries: [
      "Only spacecraft in human history to have visited Uranus (1986) and Neptune (1989).",
      "Discovered active nitrogen geysers erupting from the sub-zero ice crust of Neptune's giant moon Triton.",
      "Discovered the Great Dark Spot on Neptune and 11 new moons around Uranus.",
      "Crossed into interstellar space on November 5, 2018, confirming Voyager 1's boundary measurements."
    ],
    image: "/images/voyager.jpg",
    imageMeta: {
      imageUrl: "/images/voyager.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JPL-Caltech",
      imageSource: "NASA Planetary Photojournal",
      altText: "Voyager 2 probe observing an outer planet system"
    }
  },
  {
    id: "cassini",
    name: "Cassini-Huygens",
    agency: "NASA / ESA / ASI",
    launchYear: 1997,
    status: "Completed (Grand Finale Plunge in 2017)",
    target: "Saturnian System (Saturn, Rings, & Moons)",
    type: "Planetary Orbiter & Atmospheric Probe",
    orbit: "Saturnian Orbit (Orbited Saturn 294 times over 13 years)",
    purpose: "Conduct a comprehensive multi-year orbital exploration of Saturn's atmosphere, magnetic environment, rings, and diverse moons.",
    discoveries: [
      "Successfully landed the ESA Huygens probe on the surface of Titan (January 2005), revealing river channels and liquid methane lakes.",
      "Discovered active cryovolcanic plumes of water vapor, organic molecules, and salts jetting from fractures on Enceladus, proving the existence of a global subsurface ocean.",
      "Discovered Saturn's North Polar Hexagon jet stream and monitored seasonal storms.",
      "Completed 22 daring Grand Finale dives between Saturn's cloud tops and innermost rings before burning up in Saturn's atmosphere."
    ],
    image: "/images/cassini.jpg",
    imageMeta: {
      imageUrl: "/images/cassini.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JPL-Caltech",
      imageSource: "Cassini Solstice Mission Archives",
      altText: "Cassini spacecraft orbiting high above Saturn's rings"
    }
  },
  {
    id: "juno",
    name: "Juno",
    agency: "NASA / JPL",
    launchYear: 2011,
    status: "Active (Extended Mission)",
    target: "Jupiter System (Atmosphere, Magnetosphere, & Galilean Moons)",
    type: "Planetary Orbiter",
    orbit: "Polar Jovian Elliptical Orbit",
    purpose: "Probe beneath Jupiter's dense cloud cover to determine the planet's origin, atmospheric composition, core mass, water abundance, and massive magnetosphere.",
    discoveries: [
      "Discovered that Jupiter's core is 'dilute' or 'fuzzy', consisting of heavy elements partially dissolved into metallic hydrogen rather than a compact rocky sphere.",
      "Mapped Jupiter's intense internal dynamo, revealing non-dipolar magnetic field patches like the 'Great Blue Spot'.",
      "Imaged polygonal clusters of long-lived cyclones circling both of Jupiter's poles.",
      "Conducted ultra-close flybys of Galilean moons Ganymede, Europa, and Io, measuring surface ice fractures and volcanic plumes."
    ],
    image: "/images/jupiter.jpg",
    imageMeta: {
      imageUrl: "/images/jupiter.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JPL-Caltech / SwRI / MSSS",
      imageSource: "JunoCam Jovian Atmospheric Images",
      altText: "Turbulent swirling clouds of Jupiter captured by the Juno spacecraft"
    }
  },
  {
    id: "new-horizons",
    name: "New Horizons",
    agency: "NASA / JHUAPL / SwRI",
    launchYear: 2006,
    status: "Active (Kuiper Belt Exploration)",
    target: "Pluto-Charon System & Kuiper Belt",
    type: "Flyby Probe",
    orbit: "Solar Escape Trajectory through the Kuiper Belt (~58 AU)",
    purpose: "Complete the initial reconnaissance of the classical Solar System by conducting the first close flyby of dwarf planet Pluto and primordial Kuiper Belt objects.",
    discoveries: [
      "Conducted the historic first close flyby of Pluto on July 14, 2015, revealing a geologically active world with nitrogen glaciers, towering water-ice mountains, and blue atmospheric haze.",
      "Discovered Sputnik Planitia, a 1,000-km-wide basin of actively convecting nitrogen-carbon monoxide ice.",
      "Encountered contact-binary Kuiper Belt Object 486958 Arrokoth on January 1, 2019, providing the best-preserved look at primordial planetesimal accretion.",
      "Demonstrated that Pluto harbors evidence of a present-day subsurface liquid water ocean insulated beneath ice."
    ],
    image: "/images/pluto.jpg",
    imageMeta: {
      imageUrl: "/images/pluto.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JHUAPL / SwRI",
      imageSource: "New Horizons LORRI / MVIC Pluto Flyby Mosaic",
      altText: "Pluto's heart-shaped Tombaugh Regio captured by New Horizons"
    }
  },
  {
    id: "parker-solar-probe",
    name: "Parker Solar Probe",
    agency: "NASA / JHUAPL",
    launchYear: 2018,
    status: "Active (Solar Encounters)",
    target: "The Sun's Outer Corona",
    type: "Solar Probe",
    orbit: "Heliocentric Elliptical Orbit using Venus Gravity Assists",
    purpose: "Trace the flow of energy and understand the heating of the solar corona and acceleration of the solar wind.",
    discoveries: [
      "Officially 'touched the Sun' on April 28, 2021, by flying directly inside the Sun's Alfvén critical surface into the solar corona.",
      "Discovered 'magnetic switchbacks' — rapid, zigzag magnetic field reversals in the solar wind that accelerate plasma particles.",
      "Achieved a record-shattering velocity of ~635,000 km/h (394,000 mph), becoming the fastest human-made object in history.",
      "Imaged the circumsolar dust-free zone predicted in 1929, where intense solar heat vaporizes cosmic dust grains."
    ],
    image: "/images/parker-solar-probe.jpg",
    imageMeta: {
      imageUrl: "/images/parker-solar-probe.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / Johns Hopkins APL / Steve Gribben",
      imageSource: "NASA Parker Solar Probe Mission Overview",
      altText: "Parker Solar Probe flying through the Sun's outer corona"
    }
  },
  {
    id: "kepler",
    name: "Kepler Space Telescope",
    agency: "NASA / Ames",
    launchYear: 2009,
    status: "Completed (Fuel Depleted in 2018)",
    target: "Cygnus-Lyra Starfield / Ecliptic Plane (K2)",
    type: "Exoplanet Transit Survey Telescope",
    orbit: "Earth-Trailing Heliocentric Orbit",
    purpose: "Survey our region of the Milky Way to determine the frequency and distribution of Earth-size and larger planets in or near the habitable zone of Sun-like stars.",
    discoveries: [
      "Discovered over 2,600 confirmed exoplanets, single-handedly proving that planets outnumber stars in our galaxy.",
      "Discovered the first validated Earth-size planet orbiting in the habitable zone of another star (Kepler-186f).",
      "Discovered compact multi-planet systems such as Kepler-90 (8 planets) and Kepler-11.",
      "Identified that small planets (super-Earths and sub-Neptunes) are the most common planet class in our galaxy."
    ],
    image: "/images/kepler-186-system.jpg",
    imageMeta: {
      imageUrl: "/images/kepler-186-system.jpg",
      imageType: "ARTIST_CONCEPT",
      imageCredit: "NASA / Ames / JPL-Caltech",
      imageSource: "NASA Kepler Mission Archive",
      altText: "Artist concept of exoplanets discovered by Kepler"
    }
  },
  {
    id: "tess",
    name: "TESS (Transiting Exoplanet Survey Satellite)",
    agency: "NASA / MIT",
    launchYear: 2018,
    status: "Active (Extended Mission)",
    target: "All-Sky Survey (Bright, Nearby Stars)",
    type: "Exoplanet Survey Spacecraft",
    orbit: "Highly Elliptical Lunar Resonance Orbit (P/2)",
    purpose: "Scan over 85% of the celestial sphere to discover transiting exoplanets around bright, nearby stars suitable for atmospheric characterization with JWST.",
    discoveries: [
      "Cataloged over 7,000 candidate exoplanets and over 400 confirmed worlds.",
      "Discovered the first Earth-size habitable-zone planet in a multi-planet system (TOI-700 d and TOI-700 e).",
      "Detected exocomets transiting around the young star Beta Pictoris.",
      "Monitored stellar flare activity on red dwarf stars to assess exoplanetary habitability."
    ],
    image: "/images/proxima-centauri-b.jpg",
    imageMeta: {
      imageUrl: "/images/proxima-centauri-b.jpg",
      imageType: "ARTIST_CONCEPT",
      imageCredit: "NASA / MIT / TESS Science Team",
      imageSource: "NASA Exoplanet Exploration",
      altText: "Artist concept of a terrestrial exoplanet discovered by TESS"
    }
  },
  {
    id: "gaia",
    name: "Gaia Space Observatory",
    agency: "ESA",
    launchYear: 2013,
    status: "Active (Nominal & Extended Operations)",
    target: "Milky Way Galaxy & Local Group",
    type: "Astrometric Space Observatory",
    orbit: "Sun-Earth Lagrange Point 2 (L2)",
    purpose: "Construct the largest, most precise three-dimensional astrometric map of over one billion stars in the Milky Way, charting stellar positions, distances, proper motions, and radial velocities.",
    discoveries: [
      "Measured ultra-precise 3D coordinates and velocities for ~1.8 billion stars, creating the definitive celestial census of the Milky Way.",
      "Discovered the 'Gaia Sausage' (Gaia-Enceladus) — the fossilized remnants of a major dwarf galaxy merger that occurred 10 billion years ago.",
      "Discovered Gaia BH1 and Gaia BH2, the closest known dormant stellar-mass black holes to Earth (1,560 ly away).",
      "Mapped the warp and kinematic ripples traversing the Milky Way's galactic disk."
    ],
    image: "/images/milky-way.jpg",
    imageMeta: {
      imageUrl: "/images/milky-way.jpg",
      imageType: "REAL_OBSERVATION",
      imageCredit: "ESA / Gaia / DPAC",
      imageSource: "Gaia All-Sky Stellar Density Map",
      altText: "All-sky stellar density map generated by the Gaia spacecraft"
    }
  },
  {
    id: "chandra",
    name: "Chandra X-ray Observatory",
    agency: "NASA / SAO",
    launchYear: 1999,
    status: "Active (Over 25 Years of High-Energy Astrophysics)",
    target: "High-Energy Universe (Black Holes, Supernovae, Galaxy Clusters)",
    type: "X-ray Space Observatory",
    orbit: "High Earth Elliptical Orbit (~140,000 km apogee)",
    purpose: "Capture high-resolution X-ray imagery and spectra of the hottest, most violent regions of the universe.",
    discoveries: [
      "Imaged the million-degree accretion disk and X-ray flares around Sagittarius A* at the galactic core.",
      "Provided crucial direct evidence for Dark Matter through X-ray observations of hot plasma in the colliding Bullet Cluster.",
      "Discovered rings and relativistic jets around the Crab Pulsar and Vela Pulsar.",
      "Mapped heavy element dispersion in supernova remnants like Cassiopeia A and Kepler's Supernova."
    ],
    image: "/images/chandra.jpg",
    imageMeta: {
      imageUrl: "/images/chandra.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / CXC / SAO",
      imageSource: "Chandra X-ray Center Archive",
      altText: "Chandra X-ray Observatory deployed in Earth orbit"
    }
  },
  {
    id: "rosetta",
    name: "Rosetta & Philae",
    agency: "ESA",
    launchYear: 2004,
    status: "Completed (Landed on Comet in 2016)",
    target: "Comet 67P/Churyumov–Gerasimenko",
    type: "Cometary Orbiter & Surface Lander",
    orbit: "Cometary Escort Orbit (Accompanied comet through perihelion)",
    purpose: "Escort a Jupiter-family comet through perihelion and deploy the first robotic lander onto a cometary nucleus to study volatile chemistry.",
    discoveries: [
      "First spacecraft in history to orbit a comet nucleus and soft-land a robotic probe (Philae on November 12, 2014).",
      "Detected the amino acid Glycine and phosphorus in the coma dust, confirming that comets contain the prebiotic building blocks of life.",
      "Measured the Deuterium-to-Hydrogen (D/H) ratio in 67P's water vapor, showing it is three times higher than Earth's ocean water, suggesting asteroids contributed more to Earth's oceans than comets.",
      "Observed cometary dust jets and surface cliff collapses in real-time as the comet approached solar heating."
    ],
    image: "/images/comet-halley.jpg",
    imageMeta: {
      imageUrl: "/images/comet-halley.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "ESA / Rosetta / MPS for OSIRIS Team",
      imageSource: "ESA Rosetta Comet 67P Archive",
      altText: "Bizarre double-lobed nucleus of Comet 67P imaged by Rosetta"
    }
  },
  {
    id: "osiris-rex",
    name: "OSIRIS-REx",
    agency: "NASA / University of Arizona / Lockheed Martin",
    launchYear: 2016,
    status: "Active (OSIRIS-APEX en route to Apophis)",
    target: "Near-Earth Asteroid (101955) Bennu & (99942) Apophis",
    type: "Asteroid Sample Return Probe",
    orbit: "Heliocentric Orbit",
    purpose: "Travel to carbonaceous near-Earth asteroid Bennu, map its geology, collect a pristine surface sample, and safely return it to Earth.",
    discoveries: [
      "Discovered that Bennu is a loosely bound 'rubble pile' asteroid with high void fraction that behaved almost like a fluid during touchdown.",
      "Successfully performed the TAG (Touch-And-Go) sample maneuver in October 2020, collecting 121.6 grams of material (over twice the mission requirement).",
      "Delivered the pristine sample capsule to the Utah desert on September 24, 2023.",
      "Laboratory analysis revealed high abundances of carbon, water-bearing clay minerals, and organic amino compounds originating from the infant solar system."
    ],
    image: "/images/bennu.jpg",
    imageMeta: {
      imageUrl: "/images/bennu.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / Goddard / University of Arizona",
      imageSource: "NASA OSIRIS-REx Mission Archive",
      altText: "Close-up mosaic of carbon-rich near-Earth asteroid Bennu"
    }
  },
  {
    id: "perseverance",
    name: "Perseverance & Curiosity Mars Rovers",
    agency: "NASA / JPL-Caltech",
    launchYear: 2020,
    status: "Active (Exploring Jezero Crater)",
    target: "Mars (Jezero Crater & Gale Crater)",
    type: "Planetary Surface Rover",
    orbit: "Martian Surface Roving Field Laboratory",
    purpose: "Seek signs of ancient microbial habitability, characterize Martian geology and paleoclimate, and collect hermetically sealed rock cores for Mars Sample Return.",
    discoveries: [
      "Curiosity confirmed that Gale Crater hosted a long-lived, neutral-pH freshwater lake system 3.5 billion years ago capable of supporting microbial life.",
      "Perseverance confirmed that Jezero Crater was an ancient river delta lake, discovering diverse organic molecules preserved within mudstones and sandstones.",
      "Deployed Ingenuity, the first powered, controlled heavier-than-air aircraft on another planet (completed 72 successful atmospheric flights).",
      "Generated pure breathable oxygen from the carbon-dioxide-rich Martian atmosphere using the MOXIE experimental payload."
    ],
    image: "/images/perseverance.jpg",
    imageMeta: {
      imageUrl: "/images/perseverance.jpg",
      imageType: "SPACECRAFT_IMAGE",
      imageCredit: "NASA / JPL-Caltech",
      imageSource: "Mars 2020 Perseverance Raw Images",
      altText: "Perseverance rover traversing the rocky landscape of Jezero Crater"
    }
  }
];

export function getMissionById(id) {
  return spaceMissions.find(m => m.id === id) || null;
}

export function getMissionsByType(type) {
  if (!type || type === 'all') return spaceMissions;
  return spaceMissions.filter(m => m.type.toLowerCase().includes(type.toLowerCase()));
}
