// scripts/fix_constellations_images.js
import fs from 'fs';

let cData = fs.readFileSync('src/js/data/constellationsData.js', 'utf8');

const constellations = [
  'orion',
  'ursa-major',
  'cassiopeia',
  'scorpius',
  'taurus',
  'cygnus',
  'canis-major',
  'aries',
  'gemini',
  'cancer',
  'leo',
  'sagittarius',
  'pegasus'
];

for (const id of constellations) {
  // Regex finding id: "id" and then its image: "..."
  const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?image:\\s*)"[^"]+"`);
  cData = cData.replace(regex, `$1"/images/constellations/${id}.jpg"`);
}

fs.writeFileSync('src/js/data/constellationsData.js', cData, 'utf8');
console.log('Successfully fixed constellations image paths to /images/constellations/<id>.jpg');
