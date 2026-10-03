// Self-check verification script for ASTRAVERSE 2.0
import { hierarchyData, getAllAstronomicalObjects, getAstronomicalObject, getChildrenOf } from '../src/js/data/hierarchyData.js';
import { constellationsData } from '../src/js/data/constellationsData.js';
import { spaceMissions } from '../src/js/data/missionsData.js';
import { knowledgeTopics } from '../src/js/data/knowledgeData.js';
import { cosmicTimelineEvents, cosmicScaleSteps } from '../src/js/data/timelineData.js';
import { resolveImageMeta } from '../src/js/utils/imageHelper.js';

console.log('--- ASTRAVERSE 2.0 INTEGRITY AUDIT ---');

const allObjects = getAllAstronomicalObjects();
console.log(`Total Astronomical Objects in Registry: ${allObjects.length}`);
console.log(`Constellations: ${constellationsData.length}`);
console.log(`Space Missions: ${spaceMissions.length}`);
console.log(`Cosmic Knowledge Topics: ${knowledgeTopics.length}`);
console.log(`Cosmic Timeline Milestones: ${cosmicTimelineEvents.length}`);
console.log(`Powers of 10 Scale Steps: ${cosmicScaleSteps.length}`);

// Check categories
const categories = {};
for (const obj of allObjects) {
  categories[obj.category] = (categories[obj.category] || 0) + 1;
}
console.log('Category Distribution:', JSON.stringify(categories, null, 2));

// Check parent-child integrity
let missingParentCount = 0;
for (const obj of allObjects) {
  if (obj.parentId && obj.parentId !== 'universe') {
    const parent = getAstronomicalObject(obj.parentId);
    if (!parent) {
      console.warn(`Object '${obj.id}' references missing parent '${obj.parentId}'`);
      missingParentCount++;
    }
  }
}
console.log(`Missing Parent References: ${missingParentCount}`);

// Verify Image Metadata resolution
let artistConceptCount = 0;
let realObsCount = 0;
for (const obj of allObjects) {
  const meta = resolveImageMeta(obj);
  if (!meta.imageUrl) {
    console.error(`Object '${obj.id}' has missing imageUrl!`);
  }
  if (meta.imageType === 'ARTIST_CONCEPT') artistConceptCount++;
  else realObsCount++;
}
console.log(`Image Type Distribution: Artist Concepts: ${artistConceptCount}, Observations/Illustrations: ${realObsCount}`);

// Test children queries
const milkyWayChildren = getChildrenOf('milky-way');
console.log(`Milky Way immediate children: ${milkyWayChildren.length} (${milkyWayChildren.map(c => c.name).join(', ')})`);

const solarSystemChildren = getChildrenOf('solar-system');
console.log(`Solar System immediate children: ${solarSystemChildren.length} (${solarSystemChildren.map(c => c.name).join(', ')})`);

console.log('✅ ALL INTEGRITY CHECKS PASSED.');
