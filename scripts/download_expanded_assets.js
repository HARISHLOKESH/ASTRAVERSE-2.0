// scripts/download_expanded_assets.js
// Downloads authentic NASA / ESA / STScI imagery for expanded objects
import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  // Galaxies
  {
    path: 'public/images/smc.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA15254/PIA15254~orig.jpg'] // Small Magellanic Cloud NASA
  },
  {
    path: 'public/images/m87-galaxy.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA14447/PIA14447~orig.jpg'] // M87 galaxy & jet
  },
  {
    path: 'public/images/pinwheel.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA08012/PIA08012~orig.jpg'] // M101 Pinwheel
  },
  {
    path: 'public/images/cigar-galaxy.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA08035/PIA08035~orig.jpg'] // M82 Cigar
  },

  // Stellar Remnants & Pulsars
  {
    path: 'public/images/crab-pulsar.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA22566/PIA22566~orig.jpg'] // Chandra/Hubble Crab Pulsar
  },
  {
    path: 'public/images/neutron-star.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA21087/PIA21087~orig.jpg'] // NASA NICER Neutron Star
  },
  {
    path: 'public/images/magnetar.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA18464/PIA18464~orig.jpg'] // NASA Magnetar
  },

  // Quasars & Active Galaxies
  {
    path: 'public/images/quasar-3c273.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA04221/PIA04221~orig.jpg'] // Quasar 3C 273 Hubble/Chandra
  },
  {
    path: 'public/images/blazar.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA12832/PIA12832~orig.jpg'] // Fermi Blazar
  },

  // Nebulae
  {
    path: 'public/images/lagoon-nebula.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA22359/PIA22359~orig.jpg'] // Hubble 28th anniversary Lagoon
  },
  {
    path: 'public/images/cats-eye-nebula.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA07297/PIA07297~orig.jpg'] // Hubble Cat's Eye
  },
  {
    path: 'public/images/eagle-nebula.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA18905/PIA18905~orig.jpg'] // Hubble Eagle Nebula
  },

  // Stars
  {
    path: 'public/images/antares.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg'] // Spitzer Antares
  },

  // Solar System & Moons & Small Bodies
  {
    path: 'public/images/ceres.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA21924/PIA21924~orig.jpg'] // Dawn Ceres
  },
  {
    path: 'public/images/eris.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA03034/PIA03034~orig.jpg'] // Eris Hubble/Keck
  },
  {
    path: 'public/images/haumea.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA13518/PIA13518~orig.jpg'] // Haumea
  },
  {
    path: 'public/images/makemake.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA20525/PIA20525~orig.jpg'] // Hubble Makemake & moon
  },
  {
    path: 'public/images/callisto.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA03456/PIA03456~orig.jpg'] // Galileo Callisto
  },
  {
    path: 'public/images/deimos.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA11826/PIA11826~orig.jpg'] // HiRISE Deimos
  },
  {
    path: 'public/images/vesta.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA17255/PIA17255~orig.jpg'] // Dawn Vesta
  },
  {
    path: 'public/images/bennu.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA23357/PIA23357~orig.jpg'] // OSIRIS-REx Bennu
  },
  {
    path: 'public/images/comet-halley.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA00030/PIA00030~orig.jpg'] // Giotto / Halley
  },
  {
    path: 'public/images/comet-neowise.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA23871/PIA23871~orig.jpg'] // NEOWISE Comet
  },
  {
    path: 'public/images/oumuamua.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA22108/PIA22108~orig.jpg'] // ESO/NASA Oumuamua illustration
  },
  {
    path: 'public/images/asteroid-belt.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA00297/PIA00297~orig.jpg']
  },
  {
    path: 'public/images/kuiper-belt.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA19951/PIA19951~orig.jpg']
  },
  {
    path: 'public/images/oort-cloud.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA17079/PIA17079~orig.jpg']
  },

  // Space Missions
  {
    path: 'public/images/hubble.jpg',
    urls: ['https://images-assets.nasa.gov/image/STS109-703-037/STS109-703-037~orig.jpg'] // Hubble Space Telescope
  },
  {
    path: 'public/images/jwst.jpg',
    urls: ['https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000494/GSFC_20171208_Archive_e000494~orig.jpg', 'https://images-assets.nasa.gov/image/PIA25324/PIA25324~orig.jpg'] // JWST
  },
  {
    path: 'public/images/voyager.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA23862/PIA23862~orig.jpg'] // Voyager spacecraft
  },
  {
    path: 'public/images/cassini.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA03883/PIA03883~orig.jpg'] // Cassini spacecraft
  },
  {
    path: 'public/images/perseverance.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA24487/PIA24487~orig.jpg'] // Perseverance Mars Rover
  },
  {
    path: 'public/images/parker-solar-probe.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA22802/PIA22802~orig.jpg'] // Parker Solar Probe
  },
  {
    path: 'public/images/chandra.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA02374/PIA02374~orig.jpg'] // Chandra X-ray Observatory
  },
  {
    path: 'public/images/new-horizons.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA21024/PIA21024~orig.jpg'] // New Horizons
  },

  // Phenomena
  {
    path: 'public/images/supernova.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA03606/PIA03606~orig.jpg']
  },
  {
    path: 'public/images/gravitational-waves.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA20316/PIA20316~orig.jpg']
  },
  {
    path: 'public/images/aurora.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA20531/PIA20531~orig.jpg']
  },
  {
    path: 'public/images/cmb.jpg',
    urls: ['https://images-assets.nasa.gov/image/PIA16873/PIA16873~orig.jpg'] // Planck CMB map
  }
];

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Astraverse/2.0'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadUrl(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => { });
        reject(err);
      });
    });
    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  for (const item of assets) {
    const dest = path.resolve(item.path);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already have ${item.path}`);
      continue;
    }
    let ok = false;
    for (const url of item.urls) {
      try {
        console.log(`Fetching ${item.path} from ${url}...`);
        await downloadUrl(url, dest);
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
          console.log(`✓ Got ${item.path} (${fs.statSync(dest).size} bytes)`);
          ok = true;
          break;
        }
      } catch (e) {
        console.warn(`Failed ${url}: ${e.message}`);
      }
      await sleep(500);
    }
    if (!ok) {
      console.error(`Could not get ${item.path}`);
    }
  }
}

run();
