// scripts/download_pro_assets.js
// Downloads authentic NASA / ESA / ESO imagery for newly expanded Black Holes, Nebulae, Moons, and Exoplanets

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const downloads = [
  // High-res Planets & Moons
  {
    path: 'public/images/saturn.jpg',
    urls: [
      'https://cdn.eso.org/images/screen/eso1919a.jpg',
      'https://images-assets.nasa.gov/image/PIA08329/PIA08329~orig.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1280px-Saturn_during_Equinox.jpg'
    ]
  },
  {
    path: 'public/images/titan.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA14602/PIA14602~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA06230/PIA06230~orig.jpg'
    ]
  },
  {
    path: 'public/images/ganymede.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA24681/PIA24681~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA00716/PIA00716~orig.jpg'
    ]
  },
  // Distinct TRAPPIST-1 worlds (official NASA Spitzer/JPL artist impressions)
  {
    path: 'public/images/trappist-1b.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25662/PIA25662~orig.jpg', // JWST MIRI TRAPPIST-1b
      'https://images-assets.nasa.gov/image/PIA21421/PIA21421~orig.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1c.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25890/PIA25890~orig.jpg', // JWST TRAPPIST-1c
      'https://images-assets.nasa.gov/image/PIA21422/PIA21422~orig.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1d.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21423/PIA21423~orig.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1f.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21426/PIA21426~orig.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1g.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21427/PIA21427~orig.jpg'
    ]
  },
  {
    path: 'public/images/trappist-1h.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21428/PIA21428~orig.jpg'
    ]
  },
  {
    path: 'public/images/k2-18b.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA26048/PIA26048~orig.jpg', // NASA/CSA/ESA K2-18b hycean world
      'https://cdn.eso.org/images/screen/eso1738a.jpg'
    ]
  },
  {
    path: 'public/images/wasp-39b.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25450/PIA25450~orig.jpg' // NASA JWST WASP-39b
    ]
  },
  {
    path: 'public/images/kepler-90i.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA22192/PIA22192~orig.jpg' // Kepler-90i NASA release
    ]
  },
  // Expanded Black Holes
  {
    path: 'public/images/gaia-bh3.jpg',
    urls: [
      'https://cdn.eso.org/images/screen/eso2408a.jpg', // ESO official release of Gaia BH3 (2024)
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/oj-287.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA23864/PIA23864~orig.jpg', // NASA Spitzer OJ 287 binary flaring
      'https://cdn.eso.org/images/screen/eso1548a.jpg'
    ]
  },
  {
    path: 'public/images/centaurus-a.jpg',
    urls: [
      'https://cdn.eso.org/images/screen/eso0903a.jpg', // ESO Centaurus A black hole and radio lobes
      'https://images-assets.nasa.gov/image/PIA04215/PIA04215~orig.jpg'
    ]
  },
  {
    path: 'public/images/m106-blackhole.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA16839/PIA16839~orig.jpg' // Hubble/Chandra M106
    ]
  },
  {
    path: 'public/images/v404-cygni.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA19830/PIA19830~orig.jpg' // NASA Chandra V404 Cygni rings
    ]
  },
  // Expanded Nebulae
  {
    path: 'public/images/tarantula-nebula.jpg',
    urls: [
      'https://cdn.eso.org/images/screen/eso1809a.jpg', // ESO/JWST Tarantula Nebula
      'https://images-assets.nasa.gov/image/PIA25439/PIA25439~orig.jpg'
    ]
  },
  {
    path: 'public/images/southern-ring.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA25444/PIA25444~orig.jpg' // JWST Southern Ring Nebula
    ]
  },
  {
    path: 'public/images/rosette-nebula.jpg',
    urls: [
      'https://cdn.eso.org/images/screen/eso0940a.jpg', // ESO Rosette Nebula
      'https://images-assets.nasa.gov/image/PIA13126/PIA13126~orig.jpg'
    ]
  },
  {
    path: 'public/images/butterfly-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~orig.jpg', // Hubble Butterfly Nebula
      'https://cdn.eso.org/images/screen/eso1917a.jpg'
    ]
  },
  {
    path: 'public/images/veil-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000735/GSFC_20171208_Archive_e000735~orig.jpg', // Hubble Veil Nebula
      'https://cdn.eso.org/images/screen/eso1537a.jpg'
    ]
  },
  {
    path: 'public/images/bubble-nebula.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000570/GSFC_20171208_Archive_e000570~orig.jpg' // Hubble Bubble Nebula
    ]
  },
  {
    path: 'public/images/dumbbell-nebula.jpg',
    urls: [
      'https://cdn.eso.org/images/screen/eso9846d.jpg', // ESO Dumbbell Nebula
      'https://images-assets.nasa.gov/image/PIA13125/PIA13125~orig.jpg'
    ]
  }
];

function downloadUrl(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'AstraverseExplorer/2.0 (Astrophysics Learning Platform; contact: dev@astraverse.internal)'
      }
    }, (res) => {
      // Follow 301/302 redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        return downloadUrl(redirectUrl, destPath).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP status ${res.statusCode} for ${url}`));
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function run() {
  console.log(`Starting download of ${downloads.length} authoritative astronomy assets...`);
  let successCount = 0;

  for (const item of downloads) {
    let success = false;
    for (const url of item.urls) {
      try {
        console.log(`Fetching ${item.path} from ${url}...`);
        await downloadUrl(url, item.path);
        console.log(`✓ Successfully downloaded: ${item.path}`);
        success = true;
        successCount++;
        break;
      } catch (err) {
        console.warn(`Failed ${url}: ${err.message}. Trying next fallback...`);
      }
    }
    if (!success) {
      console.error(`✕ All URLs failed for ${item.path}`);
    }
  }

  console.log(`Finished: ${successCount} / ${downloads.length} downloaded successfully.`);
}

run();
