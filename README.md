# 🌌 ASTRAVERSE 2.0 — Interactive Astronomy Exploration Website

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla%20Glassmorphism-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An interactive, educational astronomy exploration web application inspired by **Stellarium** and modern celestial visualization tools. Explore the cosmos through an interactive hierarchical visual interface from **Galaxies → Solar Systems → Stars → Planets → Moons**, along with a dedicated **Constellation Sky Chart** section.

---

## ✨ Features

- 🌌 **Cosmic Hierarchy Explorer**:
  - Drill down & up through the universe: `Universe → Galaxies → Solar Systems → Stars → Planets → Moons`.
  - Dynamic interactive breadcrumbs (`The Universe > Milky Way > Solar System > Jupiter > Europa`).
  - Direct level switcher for instant scale jumping.
- 🃏 **Interactive Flashcards with 3D Tilt**:
  - Realistic 3D perspective rotation on cursor movement with dynamic starlight glare.
  - Quick metrics: Equatorial Diameter, Distance from Sun/Parent, and Type Badges.
  - Nested entity shortcuts and favorite/bookmarking system.
- 🔭 **Expanded Deep-Dive Detail Inspector Modal**:
  - **Live Procedural 3D Visualizer**: Continuous rotation, spherical day/night shading, atmospheric limb glow, planetary surface features (Earth's continents & clouds, Mars' polar ice caps, Jupiter's Great Red Spot, Saturn's rings with Cassini division, Europa's lineae, solar flares, and rotating spiral galaxies).
  - **Tabbed Deep-Dive Data**: Overview & Missions, Physical & Orbital Specifications, Composition Progress Bars, and Curated Facts.
  - ⚖️ **Interactive "Your Weight on this World" Calculator**: Calculates your exact weight on any celestial body based on surface gravity with intuitive physical sensation descriptions.
  - 🎧 **Audio Guide**: Integrated Web Speech API narrator that reads entity details and facts aloud.
- ⭐ **Dedicated Constellations Sky Chart Section**:
  - 11+ classic & zodiac constellations (Orion, Ursa Major, Cassiopeia, Scorpius, Taurus, Cygnus, Canis Major, Aries, Gemini, Cancer, Leo, Sagittarius, Pegasus).
  - Interactive constellation star chart canvas with connecting luminous lines and hoverable star nodes.
  - Sky coordinates (Right Ascension & Declination), principal stars table, Greek/Babylonian mythology lore, and best viewing seasons.
- ⚖️ **Cosmic Scale Comparator**:
  - Side-by-side comparative visualizer for comparing relative physical sizes of any two celestial bodies with calculated ratio metrics.
- 🔊 **Ambient Space Drone Synthesizer**:
  - Built-in multi-oscillator Web Audio API cosmic soundscape (zero external MP3 assets needed).
- 🔍 **Global Real-Time Fuzzy Search**:
  - Search across all celestial objects and constellations instantly.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HARISHLOKESH/ASTRAVERSE-2.0.git
   cd ASTRAVERSE-2.0
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
ASTRAVERSE-2.0/
├── index.html                  # Main application structure & dialogs
├── package.json                # Project scripts & dependencies
├── vite.config.js              # Vite configuration
├── src/
│   ├── css/
│   │   ├── main.css            # Base styles, variables, typography, reset
│   │   ├── cards.css           # 3D tilt flashcards, type badges, layout
│   │   ├── constellations.css  # Specialized celestial star chart styles
│   │   ├── modal.css           # Expanded deep-dive inspector & tabs
│   │   └── scale.css           # Cosmic scale comparator styles
│   └── js/
│       ├── data/
│       │   ├── hierarchyData.js       # Catalog: Universe, Galaxies, Systems, Stars, Planets, Moons
│       │   └── constellationsData.js  # Constellations with star coordinates & mythology
│       ├── components/
│       │   ├── starfieldCanvas.js     # Animated background: stars, meteors, nebulae
│       │   ├── celestialCanvas.js     # 2D/3D procedural planetary & star chart renderer
│       │   ├── cardRenderer.js        # Flashcard generator with tilt & badge logic
│       │   ├── modalInspector.js      # Deep-dive modal, weight calculator, audio guide
│       │   └── scaleComparator.js     # Side-by-side scale comparator
│       ├── utils/
│       │   ├── audioSynthesizer.js    # Web Audio API space drone & sound effects
│       │   └── storage.js             # LocalStorage bookmarks & favorites
│       └── app.js                     # Master coordinator & event routing
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
