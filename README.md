# 🌌 ASTRAVERSE 2.0 — Interactive Astronomy Exploration Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-astraverse--2--0.vercel.app-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://astraverse-2-0.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Canvas-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla%20Glassmorphism-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🚀 **Live Application:** [https://astraverse-2-0.vercel.app](https://astraverse-2-0.vercel.app)

**ASTRAVERSE 2.0** is an interactive, educational astronomy exploration web application inspired by planetarium software like **Stellarium** and modern celestial visualization tools. Built from the ground up with high-performance vanilla web technologies, Astraverse allows users to travel across cosmic orders of magnitude—from the totality of the **Observable Universe**, through spiral and elliptical **Galaxies**, down into **Star & Planetary Systems**, across blazing **Stars** and diverse **Planets**, to battered icy **Moons**—paired with an interactive **Constellations Sky Chart**, live procedural canvas simulations, an interactive surface gravity weight calculator, and an ambient Web Audio synthesizer.

---

## 🌟 Key Features

### 1. 🌌 Hierarchical Cosmic Explorer & Scale Stepper
- **Seamless Drill-Down**: Navigate genealogically down through the universe: `Universe → Galaxies → Star Systems → Stars → Planets → Moons`.
- **Instant Cosmic Scale Navigation**: Direct quick-jump stepper at the top allows users to immediately isolate and inspect any cosmic order:
  - **Universe**: Observable Universe overview.
  - **Galaxies**: Milky Way, Andromeda (M31), Triangulum (M33), Whirlpool (M51a), Sombrero (M104), Large Magellanic Cloud (LMC).
  - **Systems**: The Solar System, TRAPPIST-1, Alpha Centauri, Kepler-90, 55 Cancri.
  - **Stars**: The Sun, Proxima Centauri, TRAPPIST-1 Star, Sirius A, Betelgeuse.
  - **Planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, TRAPPIST-1e, Proxima Centauri b, 55 Cancri e.
  - **Moons**: The Moon, Europa, Ganymede, Io, Titan, Enceladus, Triton, Phobos, Charon, Mimas.
- **Smart Adaptive Filtering**: Category filter pills intelligently filter objects in the current scope or automatically navigate to that level without dead-end blank states.
- **Interactive Breadcrumb Trail**: Multi-level clickable breadcrumbs allowing instant navigation back to any parent scope.

### 2. 🃏 3D-Tilt Interactive Cosmic Flashcards
- **Realistic 3D Perspective**: Interactive mouse-tracking parallax tilt with dynamic specular glare reflections.
- **Immediate Metrics**: Quick-glance cards showing equatorial diameter, distance from parent, and category badge.
- **Interactive Navigation Shortcuts**: Clickable parent tags (`Orbits: Jupiter ↗`, `In: Milky Way Galaxy ↗`) and drill-down shortcuts (`Enter (N)`) for rapid traversal.
- **Authentic NASA Imagery**: Powered by high-resolution deep sky photography from NASA, ESA, HST, and JWST.

### 3. 🔭 Deep-Dive Procedural Modal Inspector
- **Real-Time Procedural 3D Visualizer**: Custom HTML5 canvas engine rendering continuously rotating celestial bodies with spherical day/night terminator shading, atmospheric limb glow, and authentic procedural surface features:
  - Earth: Continental continents, oceans, and swirling cloud layers.
  - Jupiter: Atmospheric cloud bands with the Great Red Spot.
  - Saturn: Realistic planetary ring system with the Cassini Division gap.
  - Mars: Rust-red terrain with bright polar ice caps.
  - Stars: Pulsing stellar cores with dynamic coronal flares.
  - Galaxies: Multi-arm logarithmic spirals with bright galactic cores.
- **Four Tabbed Knowledge Compartments**:
  - **Overview**: Classification, parent celestial body, age, temperature, and historic exploration missions.
  - **Physical & Orbit**: Equatorial diameter, distance, mass, relative solar/earth mass, orbital period, rotational period, and surface gravity.
  - **Composition**: Chemical and atmospheric breakdown progress bars.
  - **Curiosities & Lore**: Verified astronomical facts and trivia.
- **⚖️ "Your Weight on this World" Calculator**: Enter your Earth weight (kg) to calculate your exact weight under each world's gravitational pull, with realistic physical sensation descriptions.
- **🎧 Speech Synthesis Audio Guide**: Built-in Web Speech API voice narrator that reads celestial overviews and facts aloud on demand.
- **Direct Sub-Entity & Parent Links**: One-click shortcuts to explore nested sub-entities (`Explore (N) ➔`) or jump to parent bodies directly from the modal.

### 4. ⭐ Interactive Constellations Sky Chart
- **13 Classic & Zodiac Constellations**: Orion, Ursa Major, Cassiopeia, Scorpius, Taurus, Cygnus, Canis Major, Aries, Gemini, Cancer, Leo, Sagittarius, and Pegasus.
- **Interactive Star Chart Canvas**: Custom coordinate-mapped canvas displaying glowing star nodes connected by luminous constellation asterisms with hoverable star data.
- **Hemisphere & Zodiac Filtering**: Easily filter constellations by Northern Sky, Southern Sky, or Zodiac family.
- **Astronomical Coordinates & Mythology**: Right Ascension (RA), Declination (Dec), brightest stars table, and mythological lore.

### 5. 📐 Cosmic Scale Comparator
- **Side-by-Side Size Visualizer**: Compare any two celestial objects in the catalog side-by-side on an interactive comparison canvas.
- **Relative Proportions**: Automatically calculates diameter multipliers and relative volume ratios (e.g., comparing Jupiter to Earth, or Betelgeuse to the Sun).

### 6. 🔊 Ambient Web Audio Synthesizer
- **Native Cosmic Soundscape**: Zero external audio files; uses the Web Audio API with multi-oscillator detuned sine/triangle waves, low-pass biquad filters, and stereo panning to generate an ethereal deep-space drone.
- **Interactive Chimes**: Harmonic UI chimes on level jumps, modal opens, and bookmarking.

### 7. 🔍 Global Real-Time Search & Bookmarks
- **Instant Search**: Search by name, classification, description, or facts across the entire celestial catalog and constellations.
- **Saved Favorites**: LocalStorage-persisted bookmarks drawer to collect your favorite worlds and stars.

---

## 📁 Repository Structure & File Directory

```
ASTRAVERSE-2.0/
├── index.html                           # Main HTML5 entry point & modal layouts
├── package.json                         # Project metadata, scripts & dependencies
├── vite.config.js                       # Vite dev server & build configuration
├── README.md                            # Comprehensive project documentation
├── public/                              # Static public assets served by Vite
│   └── images/                          # Authentic astronomical imagery
│       ├── universe.jpg                 # Hubble Ultra Deep Field
│       ├── milky-way.jpg                # ESO VLT Milky Way galaxy
│       ├── andromeda.jpg                # Andromeda Galaxy (M31)
│       ├── triangulum.jpg               # NASA GSFC Triangulum Galaxy (M33)
│       ├── whirlpool.jpg                # Whirlpool Galaxy (M51a)
│       ├── sombrero.jpg                 # Sombrero Galaxy (M104)
│       ├── lmc.jpg                      # Large Magellanic Cloud
│       ├── solar-system.jpg             # The Solar System
│       ├── sun.jpg                      # The Sun (SDO imagery)
│       ├── mercury.jpg                  # Mercury (MESSENGER imagery)
│       ├── venus.jpg                    # Venus (Magellan radar map)
│       ├── earth.jpg                    # Earth (Apollo 17 Blue Marble)
│       ├── moon.jpg                     # The Moon (LRO imagery)
│       ├── mars.jpg                     # Mars (Viking global mosaic)
│       ├── phobos.jpg                   # Phobos moon (MRO HiRISE)
│       ├── jupiter.jpg                  # Jupiter (Cassini imagery)
│       ├── io.jpg                       # Io volcanic moon (Galileo imagery)
│       ├── europa.jpg                   # Europa icy moon (Galileo imagery)
│       ├── ganymede.jpg                 # Ganymede moon (Juno imagery)
│       ├── saturn.jpg                   # Saturn (Cassini imagery)
│       ├── titan.jpg                    # Titan moon (Cassini imagery)
│       ├── enceladus.jpg                # Enceladus moon (Cassini imagery)
│       ├── mimas.jpg                    # Mimas moon (Cassini imagery)
│       ├── uranus.jpg                   # Uranus (Voyager 2 imagery)
│       ├── neptune.jpg                  # Neptune (Voyager 2 imagery)
│       ├── triton.jpg                   # Triton moon (Voyager 2 imagery)
│       ├── pluto.jpg                    # Pluto (New Horizons imagery)
│       ├── charon.jpg                   # Charon moon (New Horizons imagery)
│       ├── trappist-1-system.jpg        # TRAPPIST-1 system rendering
│       ├── trappist-1-star.jpg          # TRAPPIST-1 ultra-cool red dwarf
│       ├── trappist-1e.jpg              # TRAPPIST-1e habitable world
│       ├── alpha-centauri-system.jpg    # Alpha Centauri triple star system
│       ├── proxima-centauri.jpg         # Proxima Centauri flare star
│       ├── proxima-centauri-b.jpg       # Proxima Centauri b exoplanet
│       ├── kepler-90-system.jpg         # Kepler-90 8-planet system
│       ├── 55-cancri-system.jpg         # 55 Cancri binary system
│       ├── 55-cancri-e.jpg              # 55 Cancri e diamond planet
│       ├── sirius-a.jpg                 # Sirius A luminous star
│       ├── betelgeuse.jpg               # Betelgeuse red supergiant
│       └── constellations/              # Constellation astrophotography
├── src/                                 # Application source code
│   ├── css/                             # Stylesheets (Vanilla CSS3)
│   │   ├── main.css                     # Design system tokens, header, search, breadcrumbs, stepper
│   │   ├── cards.css                    # 3D-tilt flashcards, glare, parent shortcuts, metric chips
│   │   ├── modal.css                    # Deep-dive inspector modal, tabs, weight calculator, bookmarks
│   │   ├── constellations.css           # Constellation grid, hemisphere filter chips, star tables
│   │   └── scale.css                    # Scale comparator modal, selectors, comparison canvas
│   └── js/                              # JavaScript Modules (ES6+)
│       ├── app.js                       # Master controller: routing, scale navigation, search, filters
│       ├── data/                        # Astronomical datasets
│       │   ├── hierarchyData.js         # Cosmic catalog: Universe, Galaxies, Systems, Stars, Planets, Moons
│       │   └── constellationsData.js    # Constellation catalog with IAU coordinates & mythology
│       ├── components/                  # UI and Canvas components
│       │   ├── starfieldCanvas.js       # Dynamic procedural starfield, twinkling stars & meteors
│       │   ├── celestialCanvas.js       # Procedural 2D/3D planet/star renderer & constellation charts
│       │   ├── cardRenderer.js          # Interactive flashcard generator with 3D tilt & navigation
│       │   ├── modalInspector.js        # Deep-dive modal inspector, weight calculator & speech guide
│       │   └── scaleComparator.js       # Side-by-side relative cosmic scale comparison component
│       └── utils/                       # Utility helper modules
│           ├── audioSynthesizer.js      # Pure Web Audio API space drone & UI sound synthesizer
│           └── storage.js               # LocalStorage favorites bookmarking manager
└── scripts/                             # Asset management & automation scripts
    ├── download_images.js               # NASA/Wikimedia image download pipeline
    ├── download_new_assets.js           # Additional astronomical image downloader
    ├── download_remaining.js            # Supplemental asset verification script
    ├── fix_constellations_images.js     # Constellation image path sanitizer
    └── update_data_images.js            # Image link mapper script
```

---

## 🛠️ Detailed File & Module Breakdown

| File Path | Description |
| :--- | :--- |
| **`index.html`** | The main single-page application structure. Contains semantic markup for the header, mode switchers, global search bar, cosmic scale stepper, breadcrumb navigator, cosmic flashcard grid, constellation star chart section, and modal containers (Detail Inspector, Scale Comparator, and Saved Favorites drawer). |
| **`vite.config.js`** | Configures Vite development server settings (port 5173, host binding) and production bundle optimizations. |
| **`src/js/app.js`** | Master application coordinator. Manages application state (`currentMode`, `currentParentId`, `breadcrumbs`, `activeCategoryFilter`, `searchQuery`), routes scale jumps, synchronizes active button highlights across the stepper and filter chips, wires event listeners, and handles breadcrumb traversal. |
| **`src/js/data/hierarchyData.js`** | Complete astronomical catalog containing detailed scientific metadata (diameters, masses, orbital periods, rotational speeds, surface gravities, temperatures, compositions, exploration missions, and facts) for the Observable Universe, 6 Galaxies, 5 Star Systems, 5 Stars, 12 Planets, and 10 Moons. Exports lookup helpers `getAstronomicalObject`, `getChildrenOf`, `getLevelForCategory`, and `getObjectsByLevel`. |
| **`src/js/data/constellationsData.js`** | Curated catalog of 13 major constellations (both northern/southern hemispheres and zodiacs) with IAU sky coordinates (RA & Dec), brightest stars, mythological lore, and normalized 2D coordinates for star chart canvas rendering. |
| **`src/js/components/starfieldCanvas.js`** | Procedural background canvas rendering multiple layers of drifting stars with varied luminosities, periodic twinkling effects, randomized shooting meteors, and soft glowing interstellar gas nebulae. |
| **`src/js/components/celestialCanvas.js`** | High-fidelity canvas simulation engine. Procedurally draws rotating planets and stars with spherical day/night lighting, atmospheric rim scattering, Jupiter's cloud bands & Red Spot, Saturn's rings with the Cassini division, Mars' ice caps, Earth's continents and clouds, coronal solar flares, spiral galaxy arms, and interactive constellation star charts. |
| **`src/js/components/cardRenderer.js`** | Generates responsive glassmorphic cards with cursor-following 3D perspective tilt and radial glare. Implements clickable parent jump badges (`Orbits: Jupiter ↗`), drill-down buttons (`Enter (N)`), favorite heart toggles, and detail inspector openers. |
| **`src/js/components/modalInspector.js`** | Controls the full-screen deep-dive modal inspector. Manages tab switching (Overview, Physical Specs, Composition, Facts), links live `CelestialCanvas` simulations, operates the "Your Weight on this World" calculator, triggers speech synthesis audio narration, and provides direct links to parent and sub-entities. |
| **`src/js/components/scaleComparator.js`** | Controls the side-by-side celestial scale comparison modal. Renders both selected celestial bodies scaled relative to one another on a unified canvas and calculates exact diameter ratios. |
| **`src/js/utils/audioSynthesizer.js`** | Built-in sound engine powered by the native Web Audio API. Generates an ambient space drone using detuned oscillators with low-pass filters and handles UI chime sound effects without any external audio file downloads. |
| **`src/js/utils/storage.js`** | LocalStorage utility for managing bookmarked celestial bodies, allowing user favorites to persist across browser sessions. |
| **`src/css/main.css`** | Core design system tokens, color palettes, typography, glassmorphism filters, header controls, global search input, breadcrumbs, level stepper navigation, and responsive layout rules. |
| **`src/css/cards.css`** | 3D-tilt flashcard styles, media containers, glare animations, parent tag badges, quick metrics chips, and action button hover states. |
| **`src/css/modal.css`** | Deep-dive modal styles, glass backdrop filters, procedural canvas layout, tab navigation, data matrices, composition progress bars, gravity weight calculator, and favorites drawer. |
| **`src/css/constellations.css`** | Constellation sky chart cards, hemisphere filter pills, sky coordinate tags, star magnitude legends, and mythology text containers. |
| **`src/css/scale.css`** | Scale comparator modal styling, comparison canvas container, object selection dropdowns, and relative size multiplier indicator badges. |
| **`scripts/download_images.js`** | Automated Node.js pipeline for fetching public-domain space imagery from NASA GSFC, JPL, STScI, and Wikimedia Commons. |

---

## 💻 Tech Stack & Architecture

- **Core Logic**: Modern JavaScript (ES6+ Modules, Classes, Event Delegation)
- **Styling Architecture**: Pure Vanilla CSS3 (Custom Properties, Glassmorphism `backdrop-filter`, 3D CSS Perspectives `perspective(1000px) rotateX() rotateY()`)
- **Graphics & Rendering**: HTML5 2D Canvas API (Procedural lighting, day/night terminators, rings, solar flares, star charts)
- **Audio Synthesizer**: Native Web Audio API (`AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode`)
- **Voice Narration**: Native Web Speech API (`speechSynthesis`, `SpeechSynthesisUtterance`)
- **Build & Development Tool**: [Vite 6.x](https://vitejs.dev/)
- **Hosting & Deployment**: [Vercel](https://vercel.com)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (version 9.0 or higher)

### Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HARISHLOKESH/ASTRAVERSE-2.0.git
   cd ASTRAVERSE-2.0
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled, minified bundle will be output to the `dist/` directory.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

ASTRAVERSE 2.0 is deployed and hosted on **Vercel**:

- **Production URL**: [https://astraverse-2-0.vercel.app](https://astraverse-2-0.vercel.app)
- **Automatic CI/CD**: Changes pushed to the main branch automatically trigger optimized production deployments on Vercel.

---

## 🪐 Astronomical Data & Image Credits

- **Space Imagery**: NASA / JPL-Caltech / Goddard Space Flight Center (GSFC) / Space Telescope Science Institute (STScI) / European Southern Observatory (ESO) / Wikimedia Commons.
- **Physical & Orbital Data**: NASA Planetary Fact Sheets, Jet Propulsion Laboratory (JPL), and International Astronomical Union (IAU).
- **Constellation Coordinates**: IAU Constellation Boundaries and Bright Star Catalog.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.
