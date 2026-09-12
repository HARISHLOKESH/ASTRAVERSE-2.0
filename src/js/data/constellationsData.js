// ASTRAVERSE 2.0 - Constellations Celestial Catalog
// Specialized star charts, 2D connecting coordinates, mythology, and viewing data

export const constellationsData = [
  {
    id: "orion",
    name: "Orion",
    symbol: "🏹",
    latinName: "Orion",
    englishName: "The Great Hunter",
    family: "Orion",
    hemisphere: "Equatorial (Visible globally)",
    skyLocation: "Right Ascension: 05h 35m | Declination: +05° 00′",
    rightAscension: "05h 35m",
    declination: "+05° 00′",
    area: "594 sq deg (Ranked 26th)",
    bestViewing: {
      months: "December to March",
      peakTime: "January around 9:00 PM",
      latitudes: "Between +85° and −75°"
    },
    color: "#38bdf8",
    tagline: "The most iconic constellation in the night sky, brandishing his belt of three blue gems.",
    description: "Orion is one of the most recognizable and dazzling star patterns in the heavens. Straddling the celestial equator, its distinctive hourglass shape is crowned by the red supergiant Betelgeuse and grounded by the brilliant blue supergiant Rigel, centered by the famed three-star 'Belt of Orion'.",
    mythology: "In Greek mythology, Orion was a gigantic, handsome hunter of supernatural prowess, the son of the sea god Poseidon and the Gorgon Euryale. He boasted that he could defeat any beast on Earth. Offended by his hubris, the earth goddess Gaia dispatched a giant scorpion (Scorpius) to sting him. The gods placed both Orion and Scorpius in opposite sides of the heavens so they never appear in the night sky at the same time: as Orion sets in the west, Scorpius rises in the east.",
    majorStars: [
      { name: "Rigel", bayer: "β Ori", magnitude: 0.13, spectralType: "B8Ia (Blue Supergiant)", distance: "860 ly" },
      { name: "Betelgeuse", bayer: "α Ori", magnitude: 0.50, spectralType: "M1-M2Ia (Red Supergiant)", distance: "642 ly" },
      { name: "Bellatrix", bayer: "γ Ori", magnitude: 1.64, spectralType: "B2III (Blue Giant)", distance: "250 ly" },
      { name: "Alnilam", bayer: "ε Ori (Belt)", magnitude: 1.69, spectralType: "B0Ia (Blue Supergiant)", distance: "2,000 ly" },
      { name: "Alnitak", bayer: "ζ Ori (Belt)", magnitude: 1.77, spectralType: "O9.7Ib (Triple Star)", distance: "1,260 ly" },
      { name: "Mintaka", bayer: "δ Ori (Belt)", magnitude: 2.23, spectralType: "O9.5II (Multiple)", distance: "1,200 ly" },
      { name: "Saiph", bayer: "κ Ori", magnitude: 2.07, spectralType: "B0.5Ia", distance: "650 ly" }
    ],
    deepSkyObjects: [
      "Orion Nebula (M42) - One of the brightest stellar nurseries visible to the naked eye",
      "Horsehead Nebula (Barnard 33) - Dark nebula silhouette resembling a knight chess piece",
      "Flame Nebula (NGC 2024) - Emission nebula illuminated by Alnitak",
      "De Mairan's Nebula (M43) - Cometary diffuse nebula adjacent to M42"
    ],
    facts: [
      "Orion's Belt points directly toward Sirius (the brightest star) to the southeast and Aldebaran (the eye of Taurus) to the northwest.",
      "The sword hanging below Orion's belt is not a single star, but houses the great Orion Nebula (M42), where thousands of new stars are currently being born.",
      "Betelgeuse is nearing the end of its life and will detonate as a spectacular supernova within the next 100,000 years."
    ],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "betelgeuse", name: "Betelgeuse", x: 28, y: 22, mag: 1.2, color: "#f97316" },
      { id: "bellatrix", name: "Bellatrix", x: 72, y: 24, mag: 1.6, color: "#93c5fd" },
      { id: "alnitak", name: "Alnitak", x: 40, y: 48, mag: 1.7, color: "#67e8f9" },
      { id: "alnilam", name: "Alnilam", x: 50, y: 49, mag: 1.5, color: "#67e8f9" },
      { id: "mintaka", name: "Mintaka", x: 60, y: 50, mag: 1.8, color: "#67e8f9" },
      { id: "saiph", name: "Saiph", x: 33, y: 78, mag: 2.0, color: "#93c5fd" },
      { id: "rigel", name: "Rigel", x: 68, y: 76, mag: 0.8, color: "#bfdbfe" },
      { id: "meissa", name: "Meissa (Head)", x: 50, y: 12, mag: 3.3, color: "#e0f2fe" }
    ],
    lines: [
      ["betelgeuse", "meissa"],
      ["meissa", "bellatrix"],
      ["betelgeuse", "alnitak"],
      ["bellatrix", "mintaka"],
      ["alnitak", "alnilam"],
      ["alnilam", "mintaka"],
      ["alnitak", "saiph"],
      ["mintaka", "rigel"],
      ["saiph", "rigel"]
    ]
  },

  {
    id: "ursa-major",
    name: "Ursa Major",
    symbol: "🐻",
    latinName: "Ursa Major",
    englishName: "The Great Bear",
    family: "Ursa Major",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 11h 20m | Declination: +50° 40′",
    rightAscension: "11h 20m",
    declination: "+50° 40′",
    area: "1,280 sq deg (Ranked 3rd largest)",
    bestViewing: {
      months: "March to June (Circumpolar for many northern latitudes)",
      peakTime: "April around 10:00 PM",
      latitudes: "Between +90° and −30°"
    },
    color: "#f59e0b",
    tagline: "Contains the world-famous 'Big Dipper' asterism, the celestial guidepost to Polaris.",
    description: "Ursa Major is one of the oldest and most prominent constellations in the northern sky. It is best known for the Big Dipper (or the Plough), an asterism of seven bright stars that has guided navigators, explorers, and travelers across the globe for thousands of years.",
    mythology: "In Greek mythology, Callisto was a beautiful nymph of the goddess Artemis. Zeus fell in love with Callisto, provoking the intense jealousy of Hera. Hera transformed Callisto into a great bear forced to roam the wilderness. Years later, Callisto's son Arcas encountered the bear and drew his spear. To prevent tragedy, Zeus snatched both into the heavens, turning Arcas into Ursa Minor and Callisto into Ursa Major.",
    majorStars: [
      { name: "Alioth", bayer: "ε UMa", magnitude: 1.77, spectralType: "A1III-IVp", distance: "82 ly" },
      { name: "Dubhe", bayer: "α UMa", magnitude: 1.79, spectralType: "K0III (Orange Giant)", distance: "123 ly" },
      { name: "Alkaid", bayer: "η UMa", magnitude: 1.86, spectralType: "B3V (Blue Dwarf)", distance: "103 ly" },
      { name: "Mizar", bayer: "ζ UMa", magnitude: 2.23, spectralType: "A2V (Multiple Star)", distance: "83 ly" },
      { name: "Merak", bayer: "β UMa", magnitude: 2.37, spectralType: "A1V", distance: "79 ly" },
      { name: "Phecda", bayer: "γ UMa", magnitude: 2.44, spectralType: "A0V", distance: "83 ly" },
      { name: "Megrez", bayer: "δ UMa", magnitude: 3.31, spectralType: "A3V", distance: "80 ly" }
    ],
    deepSkyObjects: [
      "Bode's Galaxy (M81) - Grand spiral galaxy 12 million light years away",
      "Cigar Galaxy (M82) - Starburst galaxy with intense hydrogen outflow jets",
      "Owl Nebula (M97) - Striking planetary nebula with dark owl-eye spots",
      "Pinwheel Galaxy (M101) - Face-on spiral galaxy 21 million light years away"
    ],
    facts: [
      "Drawing an imaginary line through the pointer stars Merak and Dubhe leads straight to Polaris, the North Star.",
      "Mizar and its companion Alcor form a famous naked-eye optical double star used in ancient Persia and Arabia as an eye acuity test.",
      "Most stars of the Big Dipper belong to the Ursa Major Moving Group, moving together through space like a stellar stream."
    ],
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "dubhe", name: "Dubhe", x: 74, y: 28, mag: 1.8, color: "#fbbf24" },
      { id: "merak", name: "Merak", x: 73, y: 55, mag: 2.3, color: "#93c5fd" },
      { id: "phecda", name: "Phecda", x: 54, y: 60, mag: 2.4, color: "#93c5fd" },
      { id: "megrez", name: "Megrez", x: 53, y: 35, mag: 3.3, color: "#cbd5e1" },
      { id: "alioth", name: "Alioth", x: 38, y: 32, mag: 1.7, color: "#93c5fd" },
      { id: "mizar", name: "Mizar", x: 26, y: 28, mag: 2.2, color: "#93c5fd" },
      { id: "alkaid", name: "Alkaid", x: 12, y: 38, mag: 1.8, color: "#67e8f9" }
    ],
    lines: [
      ["alkaid", "mizar"],
      ["mizar", "alioth"],
      ["alioth", "megrez"],
      ["megrez", "dubhe"],
      ["dubhe", "merak"],
      ["merak", "phecda"],
      ["phecda", "megrez"]
    ]
  },

  {
    id: "cassiopeia",
    name: "Cassiopeia",
    symbol: "👑",
    latinName: "Cassiopeia",
    englishName: "The Vain Queen",
    family: "Perseus",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 01h 00m | Declination: +60° 00′",
    rightAscension: "01h 00m",
    declination: "+60° 00′",
    area: "598 sq deg (Ranked 25th)",
    bestViewing: {
      months: "October to December",
      peakTime: "November around 9:00 PM",
      latitudes: "Between +90° and −20°"
    },
    color: "#ec4899",
    tagline: "The striking 'W' (or 'M') shaped crown wheeling opposite the Big Dipper.",
    description: "Cassiopeia is a distinctive constellation in the deep northern sky, characterized by five luminous stars that form a bold 'W' or 'M' shape depending on the season and time of night. It resides in a dense, sparkling arm of the Milky Way packed with star clusters.",
    mythology: "Cassiopeia was the queen of Ethiopia and wife of King Cepheus. Renowned for her vanity, she bragged that both she and her daughter Andromeda were more radiant than the Nereids (sea nymphs). An enraged Poseidon sent the sea monster Cetus to ravage the kingdom. To punish her arrogance, the gods tied Cassiopeia to her celestial throne upside-down for half the year as she wheels around the North Celestial Pole.",
    majorStars: [
      { name: "Schedar", bayer: "α Cas", magnitude: 2.24, spectralType: "K0IIIa (Orange Giant)", distance: "228 ly" },
      { name: "Caph", bayer: "β Cas", magnitude: 2.28, spectralType: "F2III-IV (Delta Scuti)", distance: "54 ly" },
      { name: "Gamma Cassiopeiae (Navi)", bayer: "γ Cas", magnitude: 2.15, spectralType: "B0.5IVe (Eruptive Variable)", distance: "550 ly" },
      { name: "Ruchbah", bayer: "δ Cas", magnitude: 2.68, spectralType: "A5III-IV", distance: "99 ly" },
      { name: "Segin", bayer: "ε Cas", magnitude: 3.35, spectralType: "B3V", distance: "460 ly" }
    ],
    deepSkyObjects: [
      "Cassiopeia A - Supernova remnant and the brightest radio source in the sky outside the Sun",
      "Heart Nebula (IC 1805) & Soul Nebula (IC 1848) - Expansive glowing emission complex",
      "Pacman Nebula (NGC 281) - Bright emission nebula resembling the classic arcade character",
      "Messier 52 & Messier 103 - Brilliant open star clusters"
    ],
    facts: [
      "In 1572, Danish astronomer Tycho Brahe observed a 'guest star' in Cassiopeia that outshone Venus—the famous Tycho's Supernova (SN 1572).",
      "Gamma Cassiopeiae spins so fast (400 km/s) that it bulges at the equator and flings disks of glowing hydrogen gas into orbit.",
      "From Alpha Centauri, our Sun would appear as a bright magnitude 0.5 star located in the constellation of Cassiopeia!"
    ],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "caph", name: "Caph (β)", x: 16, y: 35, mag: 2.3, color: "#fef08a" },
      { id: "schedar", name: "Schedar (α)", x: 34, y: 56, mag: 2.2, color: "#fb923c" },
      { id: "gamma", name: "Navi (γ)", x: 50, y: 38, mag: 2.1, color: "#67e8f9" },
      { id: "ruchbah", name: "Ruchbah (δ)", x: 68, y: 62, mag: 2.7, color: "#93c5fd" },
      { id: "segin", name: "Segin (ε)", x: 84, y: 44, mag: 3.4, color: "#93c5fd" }
    ],
    lines: [
      ["caph", "schedar"],
      ["schedar", "gamma"],
      ["gamma", "ruchbah"],
      ["ruchbah", "segin"]
    ]
  },

  {
    id: "scorpius",
    name: "Scorpius",
    symbol: "♏",
    latinName: "Scorpius",
    englishName: "The Scorpion",
    family: "Zodiac",
    hemisphere: "Southern Celestial Hemisphere",
    skyLocation: "Right Ascension: 16h 53m | Declination: −30° 44′",
    rightAscension: "16h 53m",
    declination: "−30° 44′",
    area: "497 sq deg (Ranked 33rd)",
    bestViewing: {
      months: "June to August",
      peakTime: "July around 9:00 PM",
      latitudes: "Between +40° and −90°"
    },
    color: "#ef4444",
    tagline: "Anchored by Antares, the ruby 'Heart of the Scorpion', curving into a hooked stinger.",
    description: "Scorpius is a magnificent zodiac constellation lying close to the Milky Way's galactic core. With its graceful curving J-shaped body terminating in the menacing stinger stars Shaula and Lesath, it genuinely looks like the celestial creature it represents.",
    mythology: "The celestial scorpion was sent by Gaia (or Artemis) to punish the giant hunter Orion for his boastful arrogance. Following a ferocious battle, the scorpion inflicted a lethal sting. In honor of the battle, both adversaries were immortalized in the sky on opposing horizons, ensuring the Scorpion is perpetually chasing Orion across the cosmos.",
    majorStars: [
      { name: "Antares", bayer: "α Sco", magnitude: 1.06, spectralType: "M1.5Iab (Red Supergiant)", distance: "550 ly" },
      { name: "Shaula", bayer: "λ Sco (Stinger)", magnitude: 1.62, spectralType: "B1.5IV", distance: "570 ly" },
      { name: "Sargas", bayer: "θ Sco", magnitude: 1.86, spectralType: "F1II", distance: "300 ly" },
      { name: "Dschubba", bayer: "δ Sco", magnitude: 2.29, spectralType: "B0.2IV", distance: "490 ly" },
      { name: "Graffias", bayer: "β Sco", magnitude: 2.56, spectralType: "B0.5V", distance: "400 ly" },
      { name: "Lesath", bayer: "υ Sco", magnitude: 2.70, spectralType: "B2IV", distance: "580 ly" }
    ],
    deepSkyObjects: [
      "Ptolemy's Cluster (M7) - Sparkling open cluster known since 130 AD",
      "Butterfly Cluster (M6) - Open star cluster resembling a butterfly with outstretched wings",
      "Globular Cluster M4 - One of the closest globular clusters to Earth (7,200 ly)",
      "Cat's Paw Nebula (NGC 6334) - Vast red emission nebula and star nursery"
    ],
    facts: [
      "The name 'Antares' translates from ancient Greek as 'Rival to Ares (Mars)' due to its fiery blood-red color and brightness resembling the Red Planet.",
      "Antares is so colossal that if placed at the Sun's position, its outer atmosphere would engulf the orbits of Mercury, Venus, Earth, and Mars.",
      "Polynesian navigators revered Scorpius as 'The Magic Fishhook of Maui', used by demigod Maui to pull the Hawaiian Islands up from the ocean floor."
    ],
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "graffias", name: "Graffias", x: 25, y: 15, mag: 2.6, color: "#93c5fd" },
      { id: "dschubba", name: "Dschubba", x: 22, y: 28, mag: 2.3, color: "#93c5fd" },
      { id: "pi-sco", name: "Fang (π)", x: 20, y: 40, mag: 2.9, color: "#93c5fd" },
      { id: "antares", name: "Antares (Heart)", x: 38, y: 35, mag: 1.0, color: "#ef4444" },
      { id: "tau-sco", name: "Al Niyat", x: 44, y: 46, mag: 2.8, color: "#93c5fd" },
      { id: "epsilon-sco", name: "Larawag", x: 48, y: 60, mag: 2.3, color: "#fbbf24" },
      { id: "sargas", name: "Sargas", x: 60, y: 76, mag: 1.9, color: "#fef08a" },
      { id: "shaula", name: "Shaula (Stinger)", x: 78, y: 68, mag: 1.6, color: "#67e8f9" },
      { id: "lesath", name: "Lesath", x: 76, y: 60, mag: 2.7, color: "#67e8f9" }
    ],
    lines: [
      ["graffias", "dschubba"],
      ["dschubba", "pi-sco"],
      ["dschubba", "antares"],
      ["antares", "tau-sco"],
      ["tau-sco", "epsilon-sco"],
      ["epsilon-sco", "sargas"],
      ["sargas", "shaula"],
      ["shaula", "lesath"]
    ]
  },

  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    latinName: "Taurus",
    englishName: "The Bull",
    family: "Zodiac",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 04h 42m | Declination: +16° 30′",
    rightAscension: "04h 42m",
    declination: "+16° 30′",
    area: "797 sq deg (Ranked 17th)",
    bestViewing: {
      months: "December to February",
      peakTime: "January around 9:00 PM",
      latitudes: "Between +90° and −65°"
    },
    color: "#f59e0b",
    tagline: "The celestial bull charging through winter, bearing the Pleiades and Aldebaran.",
    description: "Taurus is one of the oldest cataloged constellations, dating back to the Bronze Age. Marked by the angry red-orange eye of Aldebaran in the V-shaped Hyades cluster and crowned by the Seven Sisters (Pleiades), Taurus dominates the winter skies.",
    mythology: "In Greek mythology, Zeus transformed himself into a gentle, snow-white bull with golden horns to seduce the Phoenician princess Europa. Enamored by the creature's docility, Europa climbed upon its back. The bull instantly leapt into the sea, swimming across the Mediterranean to Crete where he revealed his divine identity. The continent of Europe is named in her honor.",
    majorStars: [
      { name: "Aldebaran", bayer: "α Tau", magnitude: 0.85, spectralType: "K5III (Orange Giant)", distance: "65 ly" },
      { name: "Elnath", bayer: "β Tau", magnitude: 1.65, spectralType: "B7III", distance: "134 ly" },
      { name: "Tianguan (Zeta)", bayer: "ζ Tau", magnitude: 2.97, spectralType: "B2IV", distance: "440 ly" },
      { name: "Alcyone (Pleiades)", bayer: "η Tau", magnitude: 2.87, spectralType: "B7IIIe", distance: "440 ly" }
    ],
    deepSkyObjects: [
      "The Pleiades (M45) - The dazzling 'Seven Sisters' open star cluster",
      "The Hyades - The closest open star cluster to Earth (153 ly)",
      "Crab Nebula (M1) - The iconic supernova remnant from the explosion observed in 1054 AD",
      "Hind's Variable Nebula (NGC 1555) - Variable reflection nebula illuminated by T Tauri"
    ],
    facts: [
      "Cave paintings in Lascaux, France, dating back 17,000 years depict Taurus and the Pleiades cluster.",
      "The Crab Nebula (M1) contains a rapidly spinning pulsar at its core, rotating 30 times per second.",
      "Pioneer 10 is currently cruising in the direction of Aldebaran and will pass near it in roughly 2 million years."
    ],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "pleiades", name: "Pleiades (M45)", x: 22, y: 25, mag: 1.4, color: "#67e8f9" },
      { id: "aldebaran", name: "Aldebaran (Eye)", x: 50, y: 55, mag: 0.8, color: "#f97316" },
      { id: "hyades-top", name: "Ain (ε Tau)", x: 45, y: 42, mag: 3.5, color: "#fef08a" },
      { id: "elnath", name: "Elnath (Horn 1)", x: 80, y: 20, mag: 1.7, color: "#93c5fd" },
      { id: "tianguan", name: "Tianguan (Horn 2)", x: 82, y: 58, mag: 3.0, color: "#93c5fd" }
    ],
    lines: [
      ["pleiades", "hyades-top"],
      ["hyades-top", "aldebaran"],
      ["hyades-top", "elnath"],
      ["aldebaran", "tianguan"]
    ]
  },

  {
    id: "cygnus",
    name: "Cygnus",
    symbol: "🦢",
    latinName: "Cygnus",
    englishName: "The Swan (Northern Cross)",
    family: "Hercules",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 20h 37m | Declination: +42° 02′",
    rightAscension: "20h 37m",
    declination: "+42° 02′",
    area: "804 sq deg (Ranked 16th)",
    bestViewing: {
      months: "July to November",
      peakTime: "September around 9:00 PM",
      latitudes: "Between +90° and −40°"
    },
    color: "#00f0ff",
    tagline: "Gliding gracefully along the Milky Way with Deneb anchoring the Summer Triangle.",
    description: "Cygnus depicts a majestic swan with wings outstretched flying south along the star-dusted stream of the Milky Way. Its prominent cross-shaped asterism is known as the 'Northern Cross', marked by Deneb at the tail and the colorful double star Albireo at the beak.",
    mythology: "In classical mythology, Zeus disguised himself as a swan to visit Queen Leda of Sparta. From this union, Leda gave birth to Helen of Troy and the celestial twins Castor and Pollux (Gemini). Alternatively, Cygnus represents Cycnus, the devoted friend of Phaethon, who searched grief-stricken through the river Eridanus for his friend's body and was transformed into a swan.",
    majorStars: [
      { name: "Deneb", bayer: "α Cyg", magnitude: 1.25, spectralType: "A2Ia (White Supergiant)", distance: "2,600 ly" },
      { name: "Sadr", bayer: "γ Cyg (Chest)", magnitude: 2.23, spectralType: "F8Ib", distance: "1,800 ly" },
      { name: "Gienah", bayer: "ε Cyg (Wing)", magnitude: 2.48, spectralType: "K0III", distance: "73 ly" },
      { name: "Fawaris", bayer: "δ Cyg (Wing)", magnitude: 2.87, spectralType: "B9.5IV", distance: "165 ly" },
      { name: "Albireo", bayer: "β Cyg (Head)", magnitude: 3.05, spectralType: "K3II + B8Ve (Binary)", distance: "430 ly" }
    ],
    deepSkyObjects: [
      "Cygnus X-1 - The first widely accepted stellar-mass black hole discovered in astronomy",
      "North America Nebula (NGC 7000) - Huge emission cloud resembling the continent",
      "Veil Nebula (NGC 6960/6992) - Delicate filaments of an ancient supernova blast wave",
      "Blinking Planetary Nebula (NGC 6826) - Famous optical illusion planetary nebula"
    ],
    facts: [
      "Deneb is one of the most distant first-magnitude stars known; despite being 2,600 light years away, it shines brilliantly because it is 200,000 times more luminous than our Sun.",
      "Albireo is considered one of the most beautiful double stars in amateur astronomy, displaying vivid topaz-gold and sapphire-blue contrasting stellar components.",
      "Cygnus X-1 was the subject of a famous scientific wager between Stephen Hawking and Kip Thorne over whether it was truly a black hole."
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "deneb", name: "Deneb (Tail)", x: 50, y: 16, mag: 1.2, color: "#ffffff" },
      { id: "sadr", name: "Sadr (Heart)", x: 50, y: 42, mag: 2.2, color: "#fef08a" },
      { id: "albireo", name: "Albireo (Head)", x: 50, y: 82, mag: 3.1, color: "#38bdf8" },
      { id: "fawaris", name: "Fawaris (W-Wing)", x: 22, y: 38, mag: 2.9, color: "#93c5fd" },
      { id: "gienah", name: "Gienah (E-Wing)", x: 78, y: 46, mag: 2.5, color: "#fbbf24" }
    ],
    lines: [
      ["deneb", "sadr"],
      ["sadr", "albireo"],
      ["fawaris", "sadr"],
      ["sadr", "gienah"]
    ]
  },

  {
    id: "canis-major",
    name: "Canis Major",
    symbol: "🐕",
    latinName: "Canis Major",
    englishName: "The Greater Dog",
    family: "Orion",
    hemisphere: "Southern Celestial Hemisphere",
    skyLocation: "Right Ascension: 06h 49m | Declination: −22° 08′",
    rightAscension: "06h 49m",
    declination: "−22° 08′",
    area: "380 sq deg (Ranked 43rd)",
    bestViewing: {
      months: "December to March",
      peakTime: "February around 9:00 PM",
      latitudes: "Between +60° and −90°"
    },
    color: "#38bdf8",
    tagline: "The faithful hunting hound of Orion, boasting Sirius, the brightest star in the sky.",
    description: "Canis Major is a small but dazzling constellation representing the larger of Orion's two hunting dogs. Following faithfully at the hunter's heels, it commands immediate attention thanks to Sirius, a brilliant beacon flashing diamond colors through turbulent atmospheric air.",
    mythology: "In Greek mythology, Canis Major represents Laelaps, a hound so swift that no prey could ever escape it. Zeus set Laelaps to hunt the Teumessian Fox, a magical beast destined never to be caught. Perplexed by the paradox of an inescapable hound chasing an uncatchable fox, Zeus turned both into stone and cast the hound into the stars as Canis Major.",
    majorStars: [
      { name: "Sirius", bayer: "α CMa (Dog Star)", magnitude: -1.46, spectralType: "A1V + DA2", distance: "8.6 ly" },
      { name: "Adhara", bayer: "ε CMa", magnitude: 1.50, spectralType: "B2II (Bright in UV)", distance: "430 ly" },
      { name: "Wezen", bayer: "δ CMa", magnitude: 1.83, spectralType: "F8Ia (Yellow Supergiant)", distance: "1,600 ly" },
      { name: "Murzim", bayer: "β CMa", magnitude: 1.98, spectralType: "B1II-III", distance: "490 ly" },
      { name: "Aludra", bayer: "η CMa", magnitude: 2.45, spectralType: "B5Ia", distance: "2,000 ly" }
    ],
    deepSkyObjects: [
      "Messier 41 (M41) - Spectacular open cluster containing roughly 100 stars 2,300 ly away",
      "Thor's Helmet (NGC 2359) - Cosmic bubble emission nebula shaped like the Norse god's helmet",
      "Canis Major Dwarf Galaxy - Disrupted satellite galaxy being shredded by the Milky Way"
    ],
    facts: [
      "The phrase 'dog days of summer' refers to late summer when Sirius rises with the Sun, once believed to add extra heat to the day.",
      "Sirius B, orbiting Sirius A, was the very first white dwarf star discovered in astronomy (1862).",
      "Canis Major also contains VY Canis Majoris, an extreme red hypergiant star with a diameter 1,400 times that of the Sun."
    ],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "sirius", name: "Sirius (Nose)", x: 40, y: 22, mag: -1.4, color: "#67e8f9" },
      { id: "murzim", name: "Murzim (Paw)", x: 24, y: 30, mag: 2.0, color: "#93c5fd" },
      { id: "muliphein", name: "Muliphein", x: 55, y: 24, mag: 4.1, color: "#93c5fd" },
      { id: "wezen", name: "Wezen (Flank)", x: 58, y: 62, mag: 1.8, color: "#fef08a" },
      { id: "adhara", name: "Adhara (Foot)", x: 42, y: 78, mag: 1.5, color: "#67e8f9" },
      { id: "furud", name: "Furud", x: 30, y: 84, mag: 3.0, color: "#93c5fd" },
      { id: "aludra", name: "Aludra (Tail)", x: 74, y: 74, mag: 2.4, color: "#93c5fd" }
    ],
    lines: [
      ["murzim", "sirius"],
      ["sirius", "muliphein"],
      ["sirius", "wezen"],
      ["wezen", "adhara"],
      ["adhara", "furud"],
      ["wezen", "aludra"]
    ]
  },

  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    latinName: "Aries",
    englishName: "The Ram",
    family: "Zodiac",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 02h 38m | Declination: +20° 47′",
    rightAscension: "02h 38m",
    declination: "+20° 47′",
    area: "441 sq deg (Ranked 39th)",
    bestViewing: {
      months: "November to January",
      peakTime: "December around 9:00 PM",
      latitudes: "Between +90° and −60°"
    },
    color: "#ef4444",
    tagline: "The golden ram whose fleece launched the quest of Jason and the Argonauts.",
    description: "Aries is a compact zodiac constellation positioned between Pisces to the west and Taurus to the east. Though moderate in brightness, its curved hook of stars has held profound astrological and astronomical significance as the ancient marker of the vernal equinox.",
    mythology: "Aries represents the magical flying ram with golden fleece sent by the cloud nymph Nephele to rescue her children Phrixus and Helle from their scheming stepmother Ino. Flying across the sea, Helle fell into the waters (giving name to the Hellespont). Phrixus reached Colchis safely and sacrificed the ram to Zeus in gratitude, placing the Golden Fleece in a sacred grove guarded by a dragon until Jason and the Argonauts retrieved it.",
    majorStars: [
      { name: "Hamal", bayer: "α Ari", magnitude: 2.01, spectralType: "K2III (Orange Giant)", distance: "66 ly" },
      { name: "Sheratan", bayer: "β Ari", magnitude: 2.64, spectralType: "A5V (Binary)", distance: "59 ly" },
      { name: "Mesarthim", bayer: "γ Ari", magnitude: 3.88, spectralType: "A1pSi + A1p (Double)", distance: "164 ly" },
      { name: "Botein", bayer: "δ Ari", magnitude: 4.35, spectralType: "K2III", distance: "168 ly" }
    ],
    deepSkyObjects: [
      "NGC 772 - Unbarred spiral galaxy with an oversized asymmetric spiral arm",
      "NGC 1156 - Dwarf irregular galaxy undergoing vigorous bursts of star formation"
    ],
    facts: [
      "In classical antiquity, the vernal equinox occurred in Aries; because of this, the equinox point is still symbolically termed the 'First Point of Aries'.",
      "Due to axial precession of Earth over 2,000 years, the vernal equinox has actually drifted into Pisces.",
      "An exoplanet roughly 1.8 times the mass of Jupiter orbits the orange giant star Hamal."
    ],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "hamal", name: "Hamal (α)", x: 68, y: 32, mag: 2.0, color: "#fb923c" },
      { id: "sheratan", name: "Sheratan (β)", x: 48, y: 46, mag: 2.6, color: "#93c5fd" },
      { id: "mesarthim", name: "Mesarthim (γ)", x: 32, y: 60, mag: 3.9, color: "#93c5fd" },
      { id: "botein", name: "Botein (δ)", x: 82, y: 40, mag: 4.3, color: "#fb923c" }
    ],
    lines: [
      ["hamal", "sheratan"],
      ["sheratan", "mesarthim"],
      ["hamal", "botein"]
    ]
  },

  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    latinName: "Gemini",
    englishName: "The Twins",
    family: "Zodiac",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 07h 04m | Declination: +22° 36′",
    rightAscension: "07h 04m",
    declination: "+22° 36′",
    area: "514 sq deg (Ranked 30th)",
    bestViewing: {
      months: "January to May",
      peakTime: "February around 9:00 PM",
      latitudes: "Between +90° and −60°"
    },
    color: "#a855f7",
    tagline: "Marked by twin brother stars Castor and Pollux standing side by side in the cosmos.",
    description: "Gemini depicts the mythical twin brothers Castor and Pollux. Situated northeast of Orion and easily found by tracing Orion's shoulder, Gemini resembles two matchstick figures standing shoulder-to-shoulder with their feet dipped in the Milky Way.",
    mythology: "Castor and Pollux were twin brothers born to Leda. Pollux was the immortal son of Zeus, while Castor was the mortal son of King Tyndareus of Sparta. Inseparable heroes, they sailed with the Argonauts and fought in the Trojan War. When Castor was slain in battle, a heartbroken Pollux begged Zeus to let him share his immortality with his brother. Touched by their devotion, Zeus reunited them forever in the heavens.",
    majorStars: [
      { name: "Pollux", bayer: "β Gem", magnitude: 1.15, spectralType: "K0III (Orange Giant)", distance: "34 ly" },
      { name: "Castor", bayer: "α Gem", magnitude: 1.58, spectralType: "Sextuple Star System (6 stars!)", distance: "51 ly" },
      { name: "Alhena", bayer: "γ Gem", magnitude: 1.93, spectralType: "A1.5IV+", distance: "105 ly" },
      { name: "Wasat", bayer: "δ Gem", magnitude: 3.53, spectralType: "F0IV", distance: "60 ly" },
      { name: "Mebsuta", bayer: "ε Gem", magnitude: 3.06, spectralType: "G8Ib (Supergiant)", distance: "840 ly" }
    ],
    deepSkyObjects: [
      "Messier 35 (M35) - Rich open cluster containing over 400 stars",
      "Eskimo Nebula / Clown Face (NGC 2392) - Double-ring planetary nebula with central white dwarf",
      "Jellyfish Nebula (IC 443) - Supernova remnant interacting with a dense molecular cloud"
    ],
    facts: [
      "Although Alpha usually denotes the brightest star, Pollux (Beta) is noticeably brighter than Castor (Alpha).",
      "Castor is actually a complex gravitational sextuple system composed of three pairs of spectroscopic binary stars.",
      "The Geminid meteor shower radiates from Gemini every December, producing up to 120 multicolored meteors per hour."
    ],
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "castor", name: "Castor (Head 1)", x: 32, y: 18, mag: 1.6, color: "#93c5fd" },
      { id: "pollux", name: "Pollux (Head 2)", x: 50, y: 22, mag: 1.1, color: "#fb923c" },
      { id: "mebsuta", name: "Mebsuta", x: 26, y: 44, mag: 3.1, color: "#fef08a" },
      { id: "wasat", name: "Wasat", x: 48, y: 50, mag: 3.5, color: "#cbd5e1" },
      { id: "propus", name: "Propus (Foot)", x: 18, y: 72, mag: 3.3, color: "#ef4444" },
      { id: "alhena", name: "Alhena (Foot)", x: 52, y: 80, mag: 1.9, color: "#67e8f9" }
    ],
    lines: [
      ["castor", "mebsuta"],
      ["mebsuta", "propus"],
      ["pollux", "wasat"],
      ["wasat", "alhena"],
      ["castor", "pollux"],
      ["mebsuta", "wasat"]
    ]
  },

  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    latinName: "Cancer",
    englishName: "The Crab",
    family: "Zodiac",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 08h 38m | Declination: +19° 48′",
    rightAscension: "08h 38m",
    declination: "+19° 48′",
    area: "506 sq deg (Ranked 31st)",
    bestViewing: {
      months: "February to May",
      peakTime: "March around 9:00 PM",
      latitudes: "Between +90° and −60°"
    },
    color: "#06b6d4",
    tagline: "The dimmest zodiac constellation, guarding the famous Beehive Cluster (Praesepe).",
    description: "Cancer is the faintest of the twelve zodiac constellations, with no stars brighter than fourth magnitude. Despite its modest appearance, it sits between Gemini and Leo and contains the radiant open cluster Praesepe (the Beehive), easily visible to the naked eye under dark skies.",
    mythology: "During Heracles' second labor battling the multi-headed Lernaean Hydra, Hera—who despised Heracles—dispatched a giant crab named Karkinos to distract him by pinching his feet. Heracles crushed the crab beneath his heel, but Hera honored the creature's loyalty by placing its likeness among the stars.",
    majorStars: [
      { name: "Tarf", bayer: "β Cnc", magnitude: 3.53, spectralType: "K4III (Orange Giant)", distance: "290 ly" },
      { name: "Acubens", bayer: "α Cnc", magnitude: 4.26, spectralType: "A5m (Multiple Star)", distance: "174 ly" },
      { name: "Asellus Australis", bayer: "δ Cnc", magnitude: 3.94, spectralType: "K0III", distance: "136 ly" },
      { name: "Asellus Borealis", bayer: "γ Cnc", magnitude: 4.66, spectralType: "A1V", distance: "158 ly" }
    ],
    deepSkyObjects: [
      "The Beehive Cluster (M44 / Praesepe) - One of the nearest open clusters, holding ~1,000 stars",
      "Messier 67 (M67) - One of the oldest known open clusters in our galaxy (4 billion years old)"
    ],
    facts: [
      "The Tropic of Cancer was named because the Sun was once at its highest northern zenith in Cancer during the June solstice.",
      "The Beehive Cluster was recorded by Aratus in 260 BC as a meteorological indicator: if Praesepe was dimmed by haze, rain was imminent.",
      "In 2004, 55 Cancri e, an exoplanet orbiting within Cancer, became one of the first confirmed super-Earths."
    ],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "beehive", name: "Beehive Cluster (M44)", x: 50, y: 50, mag: 3.1, color: "#67e8f9" },
      { id: "asellus-bor", name: "Asellus Bor. (γ)", x: 52, y: 36, mag: 4.6, color: "#93c5fd" },
      { id: "asellus-aus", name: "Asellus Aus. (δ)", x: 54, y: 64, mag: 3.9, color: "#fb923c" },
      { id: "acubens", name: "Acubens (α)", x: 74, y: 76, mag: 4.3, color: "#93c5fd" },
      { id: "tarf", name: "Tarf (β)", x: 30, y: 82, mag: 3.5, color: "#fb923c" }
    ],
    lines: [
      ["asellus-bor", "asellus-aus"],
      ["asellus-aus", "acubens"],
      ["asellus-aus", "tarf"]
    ]
  },

  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    latinName: "Leo",
    englishName: "The Lion",
    family: "Zodiac",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 10h 40m | Declination: +15° 00′",
    rightAscension: "10h 40m",
    declination: "+15° 00′",
    area: "947 sq deg (Ranked 12th)",
    bestViewing: {
      months: "March to June",
      peakTime: "April around 9:00 PM",
      latitudes: "Between +90° and −65°"
    },
    color: "#eab308",
    tagline: "The regal king of beasts, crowned by the Sickle and the royal blue star Regulus.",
    description: "Leo is one of the most recognizable spring constellations. Its head and mane form a backwards question-mark pattern known as 'The Sickle', anchored by the glittering blue-white star Regulus ('The Little King'), tapering off to a triangular hindquarters and the tail star Denebola.",
    mythology: "In Greek mythology, Leo represents the vicious Nemean Lion whose impenetrable golden fur could deflect all mortal weapons of bronze, iron, and stone. As his first labor, Heracles wrestled the beast barehanded inside its cavern and choked it to death, afterward fashioning its invulnerable pelt into armor.",
    majorStars: [
      { name: "Regulus", bayer: "α Leo", magnitude: 1.36, spectralType: "B8IVn (Rapid Rotator)", distance: "79 ly" },
      { name: "Denebola", bayer: "β Leo (Tail)", magnitude: 2.14, spectralType: "A3V", distance: "36 ly" },
      { name: "Algieba", bayer: "γ Leo (Mane)", magnitude: 2.01, spectralType: "K0III + G7III (Stunning Double)", distance: "130 ly" },
      { name: "Zosma", bayer: "δ Leo", magnitude: 2.56, spectralType: "A4V", distance: "58 ly" },
      { name: "Algenubi", bayer: "ε Leo", magnitude: 2.98, spectralType: "G1II", distance: "247 ly" }
    ],
    deepSkyObjects: [
      "The Leo Triplet (M65, M66, NGC 3628) - Trio of interacting spiral galaxies",
      "Leo I & Leo II - Dwarf spheroidal galaxies orbiting the Milky Way",
      "Messier 96 & Messier 95 - Vibrant spiral galaxies in the M96 Group"
    ],
    facts: [
      "Regulus rotates once every 15.9 hours—so fast that its equatorial diameter is 32% wider than its polar diameter.",
      "The Leonid meteor shower radiates from Leo every November, historically producing storm outbursts with thousands of shooting stars per hour.",
      "Regulus lies virtually on the ecliptic; the Moon and planets regularly occult (pass in front of) it."
    ],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "regulus", name: "Regulus (α)", x: 28, y: 68, mag: 1.4, color: "#67e8f9" },
      { id: "algieba", name: "Algieba (γ)", x: 38, y: 44, mag: 2.0, color: "#fbbf24" },
      { id: "adhafera", name: "Adhafera (ζ)", x: 36, y: 30, mag: 3.4, color: "#fef08a" },
      { id: "rasalas", name: "Rasalas (μ)", x: 28, y: 22, mag: 3.9, color: "#fb923c" },
      { id: "algenubi", name: "Algenubi (ε)", x: 20, y: 32, mag: 3.0, color: "#fef08a" },
      { id: "zosma", name: "Zosma (δ)", x: 62, y: 40, mag: 2.6, color: "#93c5fd" },
      { id: "chertan", name: "Chertan (θ)", x: 60, y: 64, mag: 3.3, color: "#93c5fd" },
      { id: "denebola", name: "Denebola (β)", x: 82, y: 48, mag: 2.1, color: "#93c5fd" }
    ],
    lines: [
      ["regulus", "algieba"],
      ["algieba", "adhafera"],
      ["adhafera", "rasalas"],
      ["rasalas", "algenubi"],
      ["algieba", "zosma"],
      ["zosma", "chertan"],
      ["chertan", "regulus"],
      ["zosma", "denebola"],
      ["chertan", "denebola"]
    ]
  },

  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    latinName: "Sagittarius",
    englishName: "The Archer / Teapot",
    family: "Zodiac",
    hemisphere: "Southern Celestial Hemisphere",
    skyLocation: "Right Ascension: 19h 00m | Declination: −25° 00′",
    rightAscension: "19h 00m",
    declination: "−25° 00′",
    area: "867 sq deg (Ranked 15th)",
    bestViewing: {
      months: "July to September",
      peakTime: "August around 9:00 PM",
      latitudes: "Between +55° and −90°"
    },
    color: "#10b981",
    tagline: "The celestial archer pointing directly into the supermassive black hole at the center of the galaxy.",
    description: "Sagittarius is the grand celestial archer, famously containing the 'Teapot' asterism. Looking into Sagittarius means peering straight into the richest star clouds, dark dust rifts, and glowing nebulae of the Milky Way galaxy's central hub, Sagittarius A*.",
    mythology: "In Greek lore, Sagittarius is often identified as Chiron (or Crotus, son of Pan and Eupheme). Unlike uncivilized centaurs, Chiron was wise, gentle, and the mentor of heroes such as Achilles, Asclepius, and Hercules. Transfixed into the heavens with bow drawn, he aims his arrow toward the heart of Scorpius.",
    majorStars: [
      { name: "Kaus Australis", bayer: "ε Sgr", magnitude: 1.79, spectralType: "B9.5III", distance: "143 ly" },
      { name: "Nunki", bayer: "σ Sgr", magnitude: 2.05, spectralType: "B2.5V (Very luminous)", distance: "228 ly" },
      { name: "Ascella", bayer: "ζ Sgr", magnitude: 2.60, spectralType: "A2.5Va (Binary)", distance: "88 ly" },
      { name: "Kaus Media", bayer: "δ Sgr", magnitude: 2.72, spectralType: "K3III", distance: "348 ly" },
      { name: "Kaus Borealis", bayer: "λ Sgr", magnitude: 2.82, spectralType: "K0IV", distance: "78 ly" },
      { name: "Alnasl", bayer: "γ Sgr (Spout)", magnitude: 2.98, spectralType: "K0III", distance: "96 ly" }
    ],
    deepSkyObjects: [
      "Sagittarius A* - The supermassive black hole at the heart of our Milky Way (4.15 million solar masses)",
      "Lagoon Nebula (M8) - Giant interstellar star-forming nursery with an open cluster",
      "Trifid Nebula (M20) - Three-lobed emission and reflection nebula",
      "Omega / Swan Nebula (M17) - Highly illuminated ionized hydrogen gas cradle",
      "Sagittarius Star Cloud (M24) - Direct sightline into 10,000 light years of stars"
    ],
    facts: [
      "The 'steam' rising from the spout of the Teapot is the dense, luminous core of the Milky Way galaxy.",
      "Contains more Messier deep sky objects (15) than any other constellation in the sky.",
      "The famous 'Wow! Signal' received by the Big Ear radio telescope in 1977 originated from the direction of Sagittarius."
    ],
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "kaus-bor", name: "Kaus Bor. (Lid)", x: 48, y: 24, mag: 2.8, color: "#fbbf24" },
      { id: "kaus-med", name: "Kaus Med. (Spout)", x: 38, y: 46, mag: 2.7, color: "#fb923c" },
      { id: "alnasl", name: "Alnasl (Tip)", x: 22, y: 48, mag: 3.0, color: "#fb923c" },
      { id: "kaus-aus", name: "Kaus Aus. (Base)", x: 42, y: 72, mag: 1.8, color: "#93c5fd" },
      { id: "ascella", name: "Ascella (Base)", x: 62, y: 70, mag: 2.6, color: "#93c5fd" },
      { id: "nunki", name: "Nunki (Handle)", x: 74, y: 38, mag: 2.0, color: "#67e8f9" },
      { id: "tau-sgr", name: "Hecatebolus (τ)", x: 78, y: 56, mag: 3.3, color: "#fbbf24" }
    ],
    lines: [
      ["kaus-bor", "kaus-med"],
      ["kaus-med", "alnasl"],
      ["kaus-med", "kaus-aus"],
      ["kaus-aus", "ascella"],
      ["ascella", "tau-sgr"],
      ["tau-sgr", "nunki"],
      ["nunki", "kaus-bor"],
      ["kaus-bor", "ascella"]
    ]
  },

  {
    id: "pegasus",
    name: "Pegasus",
    symbol: "🐎",
    latinName: "Pegasus",
    englishName: "The Winged Horse",
    family: "Perseus",
    hemisphere: "Northern Celestial Hemisphere",
    skyLocation: "Right Ascension: 22h 40m | Declination: +15° 00′",
    rightAscension: "22h 40m",
    declination: "+15° 00′",
    area: "1,121 sq deg (Ranked 7th largest)",
    bestViewing: {
      months: "September to December",
      peakTime: "October around 9:00 PM",
      latitudes: "Between +90° and −60°"
    },
    color: "#818cf8",
    tagline: "Marked by the great celestial square leaping upside-down across autumn nights.",
    description: "Pegasus is a sprawling constellation famous for the 'Great Square of Pegasus', an asterism of four luminous stars of equal magnitude that forms the body of the mythical winged stallion. It borders Andromeda and serves as a springboard for locating nearby galaxies.",
    mythology: "Born from the neck of Medusa after Perseus beheaded her, the divine winged stallion Pegasus flew up to Mount Helicon, striking the ground with his hoof to create the magical Hippocrene fountain of poetic inspiration. Later tamed by hero Bellerophon with a golden bridle from Athena, Pegasus carried him to defeat the fire-breathing Chimera.",
    majorStars: [
      { name: "Enif", bayer: "ε Peg (Nose)", magnitude: 2.38, spectralType: "K2Ib (Orange Supergiant)", distance: "690 ly" },
      { name: "Scheat", bayer: "β Peg (Square)", magnitude: 2.44, spectralType: "M2.5II-III (Red Giant)", distance: "196 ly" },
      { name: "Markab", bayer: "α Peg (Square)", magnitude: 2.49, spectralType: "B9III", distance: "133 ly" },
      { name: "Algenib", bayer: "γ Peg (Square)", magnitude: 2.84, spectralType: "B2IV", distance: "390 ly" },
      { name: "51 Pegasi", bayer: "51 Peg", magnitude: 5.49, spectralType: "G2V (Solar Analog)", distance: "50 ly" }
    ],
    deepSkyObjects: [
      "51 Pegasi b (Dimidium) - The historic first exoplanet discovered orbiting a Sun-like star (1995)",
      "Messier 15 (M15) - Dense globular cluster with an intermediate-mass black hole candidate",
      "Stephan's Quintet - Compact group of five colliding galaxies famously imaged by JWST",
      "Einstein's Cross - Gravitationally lensed quasar forming four symmetrical images"
    ],
    facts: [
      "Swiss astronomers Michel Mayor and Didier Queloz won the 2019 Nobel Prize in Physics for discovering 51 Pegasi b in this constellation.",
      "The top-left corner star of the Great Square, Alpheratz, officially belongs to Andromeda (Alpha Andromedae).",
      "Enif has been observed undergoing dramatic eruptive flares that increase its luminosity fivefold within minutes."
    ],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    stars: [
      { id: "scheat", name: "Scheat (β)", x: 38, y: 30, mag: 2.4, color: "#f97316" },
      { id: "markab", name: "Markab (α)", x: 36, y: 64, mag: 2.5, color: "#93c5fd" },
      { id: "algenib", name: "Algenib (γ)", x: 74, y: 66, mag: 2.8, color: "#93c5fd" },
      { id: "alpheratz", name: "Alpheratz (α And)", x: 76, y: 32, mag: 2.1, color: "#93c5fd" },
      { id: "enif", name: "Enif (Nose)", x: 14, y: 78, mag: 2.4, color: "#fb923c" }
    ],
    lines: [
      ["scheat", "alpheratz"],
      ["alpheratz", "algenib"],
      ["algenib", "markab"],
      ["markab", "scheat"],
      ["markab", "enif"]
    ]
  }
];
