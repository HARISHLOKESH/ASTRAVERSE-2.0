// scripts/download_bh_and_nebulae.js
// Downloads authentic NASA, ESA, ESO, Hubble, JWST, and EHT images for all 17 Black Holes and 16 Nebulae.

import fs from 'fs';
import path from 'path';
import https from 'https';

const USER_AGENT = 'AstraverseApp/2.0 (Astrophysics Educational Platform; contact: dev@astraverse.internal)';

const items = [
  // ==========================================
  // BLACK HOLES (17 items)
  // ==========================================
  {
    id: 'sagittarius-a',
    name: 'Sagittarius A* (Sgr A*)',
    dest: 'public/images/sagittarius-a.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso2208-eht-mwa.jpg']
  },
  {
    id: 'm87-blackhole',
    name: 'Messier 87* (M87*)',
    dest: 'public/images/m87-blackhole.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso1907a.jpg']
  },
  {
    id: 'ton-618',
    name: 'TON 618',
    dest: 'public/images/ton-618.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso1548a.jpg']
  },
  {
    id: 'oj-287',
    name: 'OJ 287 (Binary SMBH)',
    dest: 'public/images/oj-287.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso0844a.jpg']
  },
  {
    id: 'centaurus-a-bh',
    name: 'Centaurus A* (NGC 5128)',
    dest: 'public/images/centaurus-a.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso0903a.jpg']
  },
  {
    id: 'm106-bh',
    name: 'Messier 106* (NGC 4258)',
    dest: 'public/images/m106-blackhole.jpg',
    wikiTitle: 'File:Messier 106 visible and infrared composite.jpg'
  },
  {
    id: 'holmberg-15a',
    name: 'Holmberg 15A*',
    dest: 'public/images/holmberg-15a.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso1440a.jpg'],
    wikiTitle: 'File:Abell 85.jpg'
  },
  {
    id: 'ngc-1277-bh',
    name: 'NGC 1277*',
    dest: 'public/images/ngc-1277.jpg',
    wikiTitle: 'File:NGC 1277 viewed by Hubble.jpg'
  },
  {
    id: 'cygnus-x1',
    name: 'Cygnus X-1 (Cyg X-1)',
    dest: 'public/images/cygnus-x1.jpg',
    wikiTitle: 'File:Cygnus X-1.jpg'
  },
  {
    id: 'gaia-bh1',
    name: 'Gaia BH1',
    dest: 'public/images/gaia-bh1.jpg',
    wikiTitle: "File:Artist's impression of the closest black hole to Earth and its Sun-like companion star.jpg"
  },
  {
    id: 'gaia-bh3',
    name: 'Gaia BH3',
    dest: 'public/images/gaia-bh3.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso2408a.jpg']
  },
  {
    id: 'v404-cygni',
    name: 'V404 Cygni',
    dest: 'public/images/v404-cygni.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso1526a.jpg']
  },
  {
    id: 'gw150914',
    name: 'GW150914 (Historic Merger Remnant)',
    dest: 'public/images/gw150914.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso1608a.jpg']
  },
  {
    id: 'gw190521',
    name: 'GW190521 (Intermediate-Mass Remnant)',
    dest: 'public/images/gw190521.jpg',
    wikiTitle: 'File:Illu LIGO-Virgo 20200902 1.jpg'
  },
  {
    id: 'hlx-1',
    name: 'HLX-1 (Hyper-Luminous X-ray Source 1)',
    dest: 'public/images/hlx-1.jpg',
    wikiTitle: 'File:Black Hole ESO 243-49 HLX-1 (2012-11-2992).jpg'
  },
  {
    id: 'bh-accretion-disks',
    name: 'Relativistic Accretion Disks',
    dest: 'public/images/black-hole-accretion.jpg',
    wikiTitle: 'File:General relativistic magnetohydrodynamic simulation of black hole accretion.jpg'
  },
  {
    id: 'relativistic-jets',
    name: 'Relativistic Plasma Jets',
    dest: 'public/images/relativistic-jets.jpg',
    wikiTitle: 'File:M87 jet.jpg'
  },

  // ==========================================
  // NEBULAE (16 items)
  // ==========================================
  {
    id: 'orion-nebula',
    name: 'Orion Nebula (Messier 42 / NGC 1976)',
    dest: 'public/images/orion-nebula.jpg',
    wikiTitle: 'File:Orion Nebula - Hubble 2006 mosaic 18000.jpg'
  },
  {
    id: 'pillars-of-creation',
    name: 'Pillars of Creation (Eagle Nebula / M16)',
    dest: 'public/images/pillars-of-creation.jpg',
    urls: ['https://cdn.esawebb.org/archives/images/screen/weic2216a.jpg']
  },
  {
    id: 'carina-nebula',
    name: 'Carina Nebula (NGC 3372 / Cosmic Cliffs)',
    dest: 'public/images/carina-nebula.jpg',
    urls: ['https://cdn.esawebb.org/archives/images/screen/weic2205a.jpg']
  },
  {
    id: 'tarantula-nebula',
    name: 'Tarantula Nebula (30 Doradus / NGC 2070)',
    dest: 'public/images/tarantula-nebula.jpg',
    urls: ['https://cdn.esawebb.org/archives/images/screen/weic2212a.jpg']
  },
  {
    id: 'lagoon-nebula',
    name: 'Lagoon Nebula (Messier 8 / NGC 6523)',
    dest: 'public/images/lagoon-nebula.jpg',
    wikiTitle: 'File:New Hubble view of the Lagoon Nebula.jpg'
  },
  {
    id: 'rosette-nebula',
    name: 'Rosette Nebula (Caldwell 49 / NGC 2237)',
    dest: 'public/images/rosette-nebula.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso0940a.jpg']
  },
  {
    id: 'ring-nebula',
    name: 'Ring Nebula (Messier 57 / NGC 6720)',
    dest: 'public/images/ring-nebula.jpg',
    urls: ['https://cdn.esawebb.org/archives/images/screen/weic2320a.jpg']
  },
  {
    id: 'helix-nebula',
    name: 'Helix Nebula (NGC 7293 / "Eye of God")',
    dest: 'public/images/helix-nebula.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso1205a.jpg']
  },
  {
    id: 'southern-ring',
    name: 'Southern Ring Nebula (NGC 3132 / Eight-Burst)',
    dest: 'public/images/southern-ring.jpg',
    urls: ['https://cdn.esawebb.org/archives/images/screen/weic2207a.jpg']
  },
  {
    id: 'cats-eye-nebula',
    name: 'Cat\'s Eye Nebula (NGC 6543)',
    dest: 'public/images/cats-eye-nebula.jpg',
    wikiTitle: 'File:NGC6543.jpg'
  },
  {
    id: 'butterfly-nebula',
    name: 'Butterfly Nebula (NGC 6302 / Bug Nebula)',
    dest: 'public/images/butterfly-nebula.jpg',
    wikiTitle: 'File:NGC 6302 Hubble 2009.full.jpg'
  },
  {
    id: 'dumbbell-nebula',
    name: 'Dumbbell Nebula (Messier 27 / NGC 6853)',
    dest: 'public/images/dumbbell-nebula.jpg',
    urls: ['https://cdn.eso.org/images/screen/eso9846a.jpg']
  },
  {
    id: 'crab-nebula',
    name: 'Crab Nebula (Messier 1 / NGC 1952)',
    dest: 'public/images/crab-nebula.jpg',
    wikiTitle: 'File:Crab Nebula.jpg'
  },
  {
    id: 'veil-nebula',
    name: 'Veil Nebula (Cygnus Loop / NGC 6960)',
    dest: 'public/images/veil-nebula.jpg',
    wikiTitle: 'File:Return to the Veil Nebula.jpg'
  },
  {
    id: 'bubble-nebula',
    name: 'Bubble Nebula (NGC 7635)',
    dest: 'public/images/bubble-nebula.jpg',
    wikiTitle: 'File:The Bubble Nebula - NGC 7635 - Heic1608a.jpg'
  },
  {
    id: 'horsehead-nebula',
    name: 'Horsehead Nebula (Barnard 33)',
    dest: 'public/images/horsehead-nebula.jpg',
    wikiTitle: 'File:Hubble Sees a Horsehead of a Different Color.jpg'
  }
];

async function getWikiUrl(title) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json`;
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const page = Object.values(json.query.pages)[0];
          const info = page.imageinfo?.[0];
          resolve(info?.thumburl || info?.url);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP status ${res.statusCode}`));
      }
      const tmp = dest + '.tmp';
      const ws = fs.createWriteStream(tmp);
      res.pipe(ws);
      ws.on('finish', () => {
        ws.close(() => {
          const stat = fs.statSync(tmp);
          if (stat.size < 10000) {
            fs.unlinkSync(tmp);
            return reject(new Error(`File too small: ${stat.size} bytes`));
          }
          fs.renameSync(tmp, dest);
          resolve(stat.size);
        });
      });
      ws.on('error', err => {
        fs.unlink(tmp, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Starting authentic download of all ${items.length} Black Holes & Nebulae...`);
  let successCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`[${i + 1}/${items.length}] Processing "${item.name}"...`);
    let urls = item.urls ? [...item.urls] : [];
    if (item.wikiTitle) {
      const wikiUrl = await getWikiUrl(item.wikiTitle);
      if (wikiUrl) urls.unshift(wikiUrl);
    }

    let success = false;
    for (const u of urls) {
      try {
        const size = await downloadFile(u, item.dest);
        console.log(`   ✓ ${item.dest} (${(size / 1024).toFixed(1)} KB)`);
        success = true;
        successCount++;
        break;
      } catch (err) {
        console.warn(`   ✕ Failed: ${err.message}`);
      }
    }

    if (!success) {
      console.error(`   ❌ Failed for ${item.name}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`\nCOMPLETED: ${successCount} / ${items.length} downloaded successfully.`);
}

main();
