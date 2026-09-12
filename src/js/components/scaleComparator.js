// ASTRAVERSE 2.0 - Cosmic Scale Comparator
// Visually compares two astronomical objects side-by-side with accurate relative radius scaling

import { hierarchyData, getAstronomicalObject } from '../data/hierarchyData.js';

export class ScaleComparator {
  constructor(containerElement) {
    this.container = containerElement;
    this.objectA = 'earth';
    this.objectB = 'jupiter';
    this.render();
  }

  getAllObjectsList() {
    const list = [];
    if (hierarchyData.universe) list.push(hierarchyData.universe);
    list.push(...hierarchyData.galaxies);
    list.push(...hierarchyData.systems);
    list.push(...hierarchyData.stars);
    list.push(...hierarchyData.planets);
    list.push(...hierarchyData.moons);
    return list;
  }

  render() {
    const allObjects = this.getAllObjectsList();
    const itemA = getAstronomicalObject(this.objectA) || hierarchyData.planets[2];
    const itemB = getAstronomicalObject(this.objectB) || hierarchyData.planets[4];

    // Compute relative ratio
    const diamA = itemA.diameterKm || 12742;
    const diamB = itemB.diameterKm || 139820;
    const ratio = diamB / diamA;

    // Visual circle sizing (normalized to max 220px)
    let sizeA, sizeB;
    if (diamA > diamB) {
      sizeA = 220;
      sizeB = Math.max(12, 220 * (diamB / diamA));
    } else {
      sizeB = 220;
      sizeA = Math.max(12, 220 * (diamA / diamB));
    }

    this.container.innerHTML = `
      <div class="scale-comp-header">
        <h3 class="scale-comp-title">🔭 Cosmic Scale Comparator</h3>
        <p class="scale-comp-sub">Select any two celestial bodies to visualize their true relative physical sizes.</p>
      </div>

      <div class="scale-selectors-row">
        <div class="selector-group">
          <label for="selectObjA">Object A:</label>
          <select id="selectObjA" class="cosmic-select">
            ${allObjects.map(o => `<option value="${o.id}" ${o.id === this.objectA ? 'selected' : ''}>${o.name} (${o.type})</option>`).join('')}
          </select>
        </div>

        <div class="scale-vs-badge">VS</div>

        <div class="selector-group">
          <label for="selectObjB">Object B:</label>
          <select id="selectObjB" class="cosmic-select">
            ${allObjects.map(o => `<option value="${o.id}" ${o.id === this.objectB ? 'selected' : ''}>${o.name} (${o.type})</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="scale-stage">
        <!-- Object A Visual -->
        <div class="scale-entity-box">
          <div class="scale-circle-wrap">
            <div class="scale-circle" style="width: ${sizeA}px; height: ${sizeA}px; background: radial-gradient(circle at 35% 35%, ${itemA.color || '#38bdf8'}, #090d16); box-shadow: 0 0 25px ${itemA.color || '#38bdf8'}40;"></div>
          </div>
          <h4 class="scale-entity-name">${itemA.name}</h4>
          <span class="scale-entity-diam">${itemA.diameter ? itemA.diameter.split('(')[0] : ''}</span>
        </div>

        <!-- Object B Visual -->
        <div class="scale-entity-box">
          <div class="scale-circle-wrap">
            <div class="scale-circle" style="width: ${sizeB}px; height: ${sizeB}px; background: radial-gradient(circle at 35% 35%, ${itemB.color || '#f59e0b'}, #090d16); box-shadow: 0 0 25px ${itemB.color || '#f59e0b'}40;"></div>
          </div>
          <h4 class="scale-entity-name">${itemB.name}</h4>
          <span class="scale-entity-diam">${itemB.diameter ? itemB.diameter.split('(')[0] : ''}</span>
        </div>
      </div>

      <div class="scale-ratio-verdict">
        <span class="ratio-highlight">
          ${ratio >= 1 
            ? `<strong>${itemB.name}</strong> is approximately <strong>${ratio.toFixed(1)}×</strong> wider than <strong>${itemA.name}</strong>.`
            : `<strong>${itemA.name}</strong> is approximately <strong>${(1 / ratio).toFixed(1)}×</strong> wider than <strong>${itemB.name}</strong>.`}
        </span>
      </div>
    `;

    const selA = this.container.querySelector('#selectObjA');
    const selB = this.container.querySelector('#selectObjB');

    selA.addEventListener('change', (e) => {
      this.objectA = e.target.value;
      this.render();
    });

    selB.addEventListener('change', (e) => {
      this.objectB = e.target.value;
      this.render();
    });
  }
}
