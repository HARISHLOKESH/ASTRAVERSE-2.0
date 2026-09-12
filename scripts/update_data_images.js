// scripts/update_data_images.js
import fs from 'fs';

// Update hierarchyData.js
let hData = fs.readFileSync('src/js/data/hierarchyData.js', 'utf8');

// Regex to replace image: "..." in each object
// We can match id: "..." and then its corresponding image: "..."
const idRegex = /id:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;

let updatedHData = hData.replace(idRegex, (match, id, oldImage) => {
  const localImage = `/images/${id}.jpg`;
  const fullPath = `public/images/${id}.jpg`;
  if (fs.existsSync(fullPath)) {
    return match.replace(`image: "${oldImage}"`, `image: "${localImage}"`);
  } else {
    console.warn(`Missing file for ${id}: ${fullPath}`);
    return match;
  }
});

fs.writeFileSync('src/js/data/hierarchyData.js', updatedHData, 'utf8');
console.log('Updated hierarchyData.js with local images');

// Update constellationsData.js
let cData = fs.readFileSync('src/js/data/constellationsData.js', 'utf8');

let updatedCData = cData.replace(idRegex, (match, id, oldImage) => {
  const localImage = `/images/constellations/${id}.jpg`;
  const fullPath = `public/images/constellations/${id}.jpg`;
  if (fs.existsSync(fullPath)) {
    return match.replace(`image: "${oldImage}"`, `image: "${localImage}"`);
  } else {
    console.warn(`Missing file for constellation ${id}: ${fullPath}`);
    return match;
  }
});

fs.writeFileSync('src/js/data/constellationsData.js', updatedCData, 'utf8');
console.log('Updated constellationsData.js with local images');
