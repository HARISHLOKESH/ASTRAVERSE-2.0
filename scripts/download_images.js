// scripts/download_images.js
// Downloads authentic NASA / Wikimedia / Astronomy pictures to public/images/

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const images = [
  // Galaxies & Universe
  {
    path: 'public/images/universe.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg',
      'https://images-assets.nasa.gov/image/PIA12348/PIA12348~orig.jpg',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/milky-way.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Full-Array.jpg/1280px-ESO-VLT-Full-Array.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/09/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/andromeda.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/M31_09-01-2011_%28cropped%29.jpg/1280px-M31_09-01-2011_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c2/M31_09-01-2011_%28cropped%29.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/triangulum.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/VST_snaps_a_very_detailed_view_of_the_Triangulum_Galaxy.jpg/1280px-VST_snaps_a_very_detailed_view_of_the_Triangulum_Galaxy.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/whirlpool.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Messier51_sRGB.jpg/1280px-Messier51_sRGB.jpg',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/sombrero.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg/1280px-M104_ngc4594_sombrero_galaxy_hi-res.jpg',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/lmc.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Large.mc.arp.750pix.jpg/1280px-Large.mc.arp.750pix.jpg',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // Systems
  {
    path: 'public/images/solar-system.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Planets2013.svg/1280px-Planets2013.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solar_sys8.jpg/1280px-Solar_sys8.jpg',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/trappist-1-system.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/PIA21422_-_TRAPPIST-1_Mass_%26_Diameter.jpg/1280px-PIA21422_-_TRAPPIST-1_Mass_%26_Diameter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/PIA21424_-_TRAPPIST-1_Illustration.jpg/1280px-PIA21424_-_TRAPPIST-1_Illustration.jpg',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/alpha-centauri-system.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Alpha_Centauri_system_illustration.jpg/1280px-Alpha_Centauri_system_illustration.jpg',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/kepler-90-system.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kepler-90_System_Comparison.jpg/1280px-Kepler-90_System_Comparison.jpg',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/55-cancri-system.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Artist%E2%80%99s_impression_of_55_Cancri_e.jpg/1280px-Artist%E2%80%99s_impression_of_55_Cancri_e.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // Stars
  {
    path: 'public/images/sun.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1280px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg'
    ]
  },
  {
    path: 'public/images/proxima-centauri.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/New_shot_of_Proxima_Centauri%2C_our_nearest_neighbour.jpg/1280px-New_shot_of_Proxima_Centauri%2C_our_nearest_neighbour.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/82/New_shot_of_Proxima_Centauri%2C_our_nearest_neighbour.jpg'
    ]
  },
  {
    path: 'public/images/sirius-a.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Hubble_portrait_of_Sirius_A_and_B.jpg/1280px-Hubble_portrait_of_Sirius_A_and_B.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f3/Hubble_portrait_of_Sirius_A_and_B.jpg'
    ]
  },
  {
    path: 'public/images/betelgeuse.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Betelgeuse_pulsating.jpg/1280px-Betelgeuse_pulsating.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/57/Betelgeuse_pulsating.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1-star.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/PIA21425_-_TRAPPIST-1_Comparison.jpg/1280px-PIA21425_-_TRAPPIST-1_Comparison.jpg'
    ]
  },

  // Planets
  {
    path: 'public/images/mercury.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/1280px-Mercury_in_true_color.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg'
    ]
  },
  {
    path: 'public/images/venus.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/1280px-Venus_from_Mariner_10.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg'
    ]
  },
  {
    path: 'public/images/earth.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1280px-The_Earth_seen_from_Apollo_17.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
    ]
  },
  {
    path: 'public/images/mars.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1280px-OSIRIS_Mars_true_color.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'
    ]
  },
  {
    path: 'public/images/jupiter.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/1280px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg'
    ]
  },
  {
    path: 'public/images/saturn.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1280px-Saturn_during_Equinox.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg'
    ]
  },
  {
    path: 'public/images/uranus.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1280px-Uranus2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg'
    ]
  },
  {
    path: 'public/images/neptune.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Neptune.jpg/1280px-Neptune.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune.jpg'
    ]
  },
  {
    path: 'public/images/pluto.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/1280px-Pluto_in_True_Color_-_High-Res.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1e.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/PIA21427_-_TRAPPIST-1e_Illustration.jpg/1280px-PIA21427_-_TRAPPIST-1e_Illustration.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/cb/PIA21427_-_TRAPPIST-1e_Illustration.jpg'
    ]
  },
  {
    path: 'public/images/proxima-centauri-b.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Artist%27s_impression_of_Proxima_Centauri_b_shown_hypothetically_as_an_arid_rocky_planet.jpg/1280px-Artist%27s_impression_of_Proxima_Centauri_b_shown_hypothetically_as_an_arid_rocky_planet.jpg'
    ]
  },
  {
    path: 'public/images/55-cancri-e.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Artist%E2%80%99s_impression_of_55_Cancri_e.jpg/1280px-Artist%E2%80%99s_impression_of_55_Cancri_e.jpg'
    ]
  },

  // Moons
  {
    path: 'public/images/moon.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1280px-FullMoon2010.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg'
    ]
  },
  {
    path: 'public/images/europa.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon-with-margins.jpg/1280px-Europa-moon-with-margins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/54/Europa-moon-with-margins.jpg'
    ]
  },
  {
    path: 'public/images/titan.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Titan_in_true_color.jpg/1280px-Titan_in_true_color.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Titan_in_true_color.jpg'
    ]
  },
  {
    path: 'public/images/enceladus.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Enceladus_stripes_PIA07724.jpg/1280px-Enceladus_stripes_PIA07724.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/00/Enceladus_stripes_PIA07724.jpg'
    ]
  },
  {
    path: 'public/images/ganymede.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ganymede_g1_true-edit1.jpg/1280px-Ganymede_g1_true-edit1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Ganymede_g1_true-edit1.jpg'
    ]
  },
  {
    path: 'public/images/io.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/1280px-Io_highest_resolution_true_color.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Io_highest_resolution_true_color.jpg'
    ]
  },
  {
    path: 'public/images/triton.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/1280px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a6/Triton_moon_mosaic_Voyager_2_%28large%29.jpg'
    ]
  },
  {
    path: 'public/images/charon.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Charon_in_True_Color_-_High-Res.jpg/1280px-Charon_in_True_Color_-_High-Res.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c6/Charon_in_True_Color_-_High-Res.jpg'
    ]
  },
  {
    path: 'public/images/phobos.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phobos_colour_2008.jpg/1280px-Phobos_colour_2008.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg'
    ]
  },
  {
    path: 'public/images/mimas.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mimas_Cassini.jpg/1280px-Mimas_Cassini.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/b/bc/Mimas_Cassini.jpg'
    ]
  },

  // Constellations (Deep Sky Astrophotography)
  {
    path: 'public/images/constellations/orion.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Orion_Head_to_Toe.jpg/1280px-Orion_Head_to_Toe.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Orion_3008_pixels.jpg/1280px-Orion_3008_pixels.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/ursa-major.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ursa_Major_constellation_PP3_map.svg/1280px-Ursa_Major_constellation_PP3_map.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ursa_Major_-_Star_field.jpg/1280px-Ursa_Major_-_Star_field.jpg',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/cassiopeia.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Cassiopeia_constellation_PP3_map.svg/1280px-Cassiopeia_constellation_PP3_map.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Cassiopeia_star_field.jpg/1280px-Cassiopeia_star_field.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/scorpius.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Scorpius_constellation_PP3_map.svg/1280px-Scorpius_constellation_PP3_map.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Scorpius_star_field.jpg/1280px-Scorpius_star_field.jpg',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/taurus.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Taurus_constellation_PP3_map.svg/1280px-Taurus_constellation_PP3_map.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Taurus_star_field.jpg/1280px-Taurus_star_field.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/cygnus.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Cygnus_constellation_PP3_map.svg/1280px-Cygnus_constellation_PP3_map.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Cygnus_star_field.jpg/1280px-Cygnus_star_field.jpg',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/canis-major.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Canis_Major_constellation_PP3_map.svg/1280px-Canis_Major_constellation_PP3_map.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Canis_Major_star_field.jpg/1280px-Canis_Major_star_field.jpg',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/aries.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Aries_constellation_PP3_map.svg/1280px-Aries_constellation_PP3_map.svg.png',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/gemini.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Gemini_constellation_PP3_map.svg/1280px-Gemini_constellation_PP3_map.svg.png',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/cancer.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cancer_constellation_PP3_map.svg/1280px-Cancer_constellation_PP3_map.svg.png',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/leo.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Leo_constellation_PP3_map.svg/1280px-Leo_constellation_PP3_map.svg.png',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/sagittarius.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sagittarius_constellation_PP3_map.svg/1280px-Sagittarius_constellation_PP3_map.svg.png',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/constellations/pegasus.jpg',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Pegasus_constellation_PP3_map.svg/1280px-Pegasus_constellation_PP3_map.svg.png',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Astraverse/2.0'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadUrl(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  fs.mkdirSync('public/images/constellations', { recursive: true });

  for (const item of images) {
    const dest = path.resolve(item.path);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already exists: ${item.path}`);
      continue;
    }

    let success = false;
    for (const url of item.urls) {
      try {
        console.log(`Downloading ${item.path} from ${url}...`);
        await downloadUrl(url, dest);
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
          console.log(`✓ Saved ${item.path} (${fs.statSync(dest).size} bytes)`);
          success = true;
          break;
        }
      } catch (err) {
        console.warn(`Error with ${url}: ${err.message}`);
      }
    }
    if (!success) {
      console.error(`✗ Failed all sources for ${item.path}`);
    }
  }
}

run();
