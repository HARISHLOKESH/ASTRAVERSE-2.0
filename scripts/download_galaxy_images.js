// scripts/download_galaxy_images.js
// Downloads authentic, original telescope imagery for all 10 galaxies in ASTRAVERSE 2.0
import fs from 'fs';
import path from 'path';
import https from 'https';

const galaxiesToDownload = [
  {
    id: 'milky-way',
    file: 'public/images/milky-way.jpg',
    url: 'https://cdn.eso.org/images/screen/eso0932a.jpg',
    description: 'Milky Way Galaxy - ESO / Serge Brunier 360-degree All-Sky Panorama'
  },
  {
    id: 'andromeda',
    file: 'public/images/andromeda.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/M31_09-01-2011_%28cropped%29.jpg/1280px-M31_09-01-2011_%28cropped%29.jpg',
    description: 'Andromeda Galaxy (M31) - High-resolution spiral disk'
  },
  {
    id: 'triangulum',
    file: 'public/images/triangulum.jpg',
    url: 'https://cdn.eso.org/images/screen/eso1424a.jpg',
    description: 'Triangulum Galaxy (M33) - ESO VLT Survey Telescope (VST) Mosaic'
  },
  {
    id: 'lmc',
    file: 'public/images/lmc.jpg',
    url: 'https://cdn.eso.org/images/screen/eso1914a.jpg',
    description: 'Large Magellanic Cloud (LMC) - ESO VISTA Survey view of the LMC and Tarantula Nebula'
  },
  {
    id: 'smc',
    file: 'public/images/smc.jpg',
    url: 'https://cdn.eso.org/images/screen/eso1008a.jpg',
    description: 'Small Magellanic Cloud (SMC) - ESO / Digitized Sky Survey 2 wide-field view'
  },
  {
    id: 'm87-galaxy',
    file: 'public/images/m87-galaxy.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/M87_jet.jpg',
    description: 'Messier 87 (Virgo A) - Hubble Space Telescope view of M87 and its relativistic plasma jet'
  },
  {
    id: 'pinwheel',
    file: 'public/images/pinwheel.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/M101_hires_STScI-PRC2006-10a.jpg/1280px-M101_hires_STScI-PRC2006-10a.jpg',
    description: 'Pinwheel Galaxy (M101) - Hubble Space Telescope 51-exposure mosaic'
  },
  {
    id: 'cigar-galaxy',
    file: 'public/images/cigar-galaxy.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/M82_HST_ACS_2006-14-a-large_web.jpg/1280px-M82_HST_ACS_2006-14-a-large_web.jpg',
    description: 'Cigar Galaxy (M82) - Hubble Space Telescope 16th Anniversary starburst mosaic'
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'AstraverseApp/2.0 (https://github.com/HARISHLOKESH/ASTRAVERSE-2.0; contact@astraverse.org)'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('//')) redirectUrl = 'https:' + redirectUrl;
        return resolve(downloadFile(redirectUrl, destPath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const tmpPath = destPath + '.tmp';
      const file = fs.createWriteStream(tmpPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          fs.renameSync(tmpPath, destPath);
          resolve(fs.statSync(destPath).size);
        });
      });
      file.on('error', (err) => {
        try { fs.unlinkSync(tmpPath); } catch {}
        reject(err);
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function main() {
  console.log('Downloading authentic astronomy pictures for all target galaxies...');
  for (const item of galaxiesToDownload) {
    try {
      console.log(`Downloading ${item.id} -> ${item.file}...`);
      const size = await downloadFile(item.url, item.file);
      console.log(`✓ SUCCESS [${item.id}]: ${size} bytes saved (${item.description})`);
    } catch (e) {
      console.error(`✗ FAILED [${item.id}]: ${e.message}`);
    }
  }
}

main();
