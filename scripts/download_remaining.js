// scripts/download_remaining.js
import fs from 'fs';
import path from 'path';
import https from 'https';

const remaining = [
  // Planets
  {
    path: 'public/images/jupiter.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA22949/PIA22949~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA02873/PIA02873~orig.jpg',
      'https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/uranus.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA01360/PIA01360~orig.jpg',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/neptune.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA00046/PIA00046~orig.jpg',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/pluto.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA19952/PIA19952~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA20291/PIA20291~orig.jpg',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/trappist-1e.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA22097/PIA22097~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA21427/PIA21427~orig.jpg'
    ]
  },
  {
    path: 'public/images/proxima-centauri-b.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21423/PIA21423~orig.jpg',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/55-cancri-e.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA20068/PIA20068~orig.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // Moons
  {
    path: 'public/images/europa.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA00502/PIA00502~orig.jpg'
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
    path: 'public/images/enceladus.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA17202/PIA17202~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA07724/PIA07724~orig.jpg'
    ]
  },
  {
    path: 'public/images/ganymede.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA00716/PIA00716~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA01666/PIA01666~orig.jpg'
    ]
  },
  {
    path: 'public/images/triton.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA01538/PIA01538~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA00317/PIA00317~orig.jpg'
    ]
  },
  {
    path: 'public/images/charon.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA19966/PIA19966~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA19708/PIA19708~orig.jpg'
    ]
  },
  {
    path: 'public/images/phobos.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA10368/PIA10368~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA05596/PIA05596~orig.jpg'
    ]
  },
  {
    path: 'public/images/mimas.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA12570/PIA12570~orig.jpg',
      'https://images-assets.nasa.gov/image/PIA06258/PIA06258~orig.jpg'
    ]
  },

  // Stars
  {
    path: 'public/images/proxima-centauri.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000494/GSFC_20171208_Archive_e000494~orig.jpg',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/sirius-a.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001392/GSFC_20171208_Archive_e001392~orig.jpg',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/betelgeuse.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA23690/PIA23690~orig.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    path: 'public/images/trappist-1-star.jpg',
    urls: [
      'https://images-assets.nasa.gov/image/PIA21425/PIA21425~orig.jpg',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=80'
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
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  for (const item of remaining) {
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
