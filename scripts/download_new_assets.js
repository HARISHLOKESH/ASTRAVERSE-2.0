// scripts/download_new_assets.js
import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  // Black Holes
  {
    path: 'public/images/sagittarius-a.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25275/PIA25275~orig.jpg', // Real EHT photo of Sgr A*
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Black_hole_-_Messier_87_crop_max_res.jpg/1280px-Black_hole_-_Messier_87_crop_max_res.jpg',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/m87-blackhole.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA23122/PIA23122~orig.jpg', // Historic 2019 M87* EHT image
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/cygnus-x1.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA14421/PIA14421~orig.jpg', // Cygnus X-1 Chandra/Hubble
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/ton-618.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA23865/PIA23865~orig.jpg',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/gaia-bh1.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA23125/PIA23125~orig.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // Nebulae
  {
    path: 'public/images/orion-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA08006/PIA08006~orig.jpg', // Hubble M42
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000088/GSFC_20171208_Archive_e000088~orig.jpg'
    ]
  },
  {
    path: 'public/images/pillars-of-creation.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25439/PIA25439~orig.jpg', // JWST NIRCam Pillars of Creation
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001859/GSFC_20171208_Archive_e001859~orig.jpg'
    ]
  },
  {
    path: 'public/images/carina-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25324/PIA25324~orig.jpg', // JWST Cosmic Cliffs
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001476/GSFC_20171208_Archive_e001476~orig.jpg'
    ]
  },
  {
    path: 'public/images/crab-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA03606/PIA03606~orig.jpg', // Hubble Crab Nebula
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000042/GSFC_20171208_Archive_e000042~orig.jpg'
    ]
  },
  {
    path: 'public/images/helix-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA15817/PIA15817~orig.jpg', // Eye of God Helix Nebula
      'https://images-assets.nasa.gov/image/PIA09178/PIA09178~orig.jpg'
    ]
  },
  {
    path: 'public/images/ring-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25970/PIA25970~orig.jpg', // JWST Ring Nebula
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000305/GSFC_20171208_Archive_e000305~orig.jpg'
    ]
  },
  {
    path: 'public/images/horsehead-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001867/GSFC_20171208_Archive_e001867~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA17088/PIA17088~orig.jpg'
    ]
  },

  // New Stars
  {
    path: 'public/images/vega.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA07084/PIA07084~orig.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/rigel.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA23690/PIA23690~orig.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/polaris.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA14420/PIA14420~orig.jpg',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/arcturus.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000494/GSFC_20171208_Archive_e000494~orig.jpg',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/uy-scuti.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21425/PIA21425~orig.jpg',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // New Systems & Planets
  {
    path: 'public/images/kepler-452-system.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA19827/PIA19827~orig.jpg', // Kepler-452b Earth's Cousin
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/kepler-452b.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA19828/PIA19828~orig.jpg', // Kepler-452b artist concept
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/kepler-186-system.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA18164/PIA18164~orig.jpg', // Kepler-186 system
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/kepler-186f.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA18163/PIA18163~orig.jpg', // Kepler-186f
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/tau-ceti-system.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA16694/PIA16694~orig.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/tau-ceti-e.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA16695/PIA16695~orig.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/gliese-667-system.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA17387/PIA17387~orig.jpg',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/gliese-667-cc.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA17388/PIA17388~orig.jpg',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/wasp-12-system.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA13459/PIA13459~orig.jpg',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/wasp-12b.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA13460/PIA13460~orig.jpg',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
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
        fs.unlink(dest, () => {});
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
      await sleep(1000);
    }
    if (!ok) {
      console.error(`Could not get ${item.path}`);
    }
  }
}

run();
