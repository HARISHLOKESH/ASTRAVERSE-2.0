// ASTRAVERSE 2.0 - Cosmic Scale Comparator
// Visually compares any two astronomical objects side-by-side with accurate relative radius scaling and presets

import { getAllAstronomicalObjects, getAstronomicalObject } from '../data/hierarchyData.js';
import { audioEngine } from '../utils/audioSynthesizer.js';

export class ScaleComparator {
  constructor(containerElement) {
    this.container = containerElement;
    this.objectA = 'earth';
    this.objectB = 'jupiter';
    this.presets = [
      { label: 'Earth vs Jupiter', a: 'earth', b: 'jupiter', icon: '🪐' },
      { label: 'Earth vs TRAPPIST-1e', a: 'earth', b: 'trappist-1e', icon: '🌱' },
      { label: 'Sun vs Betelgeuse', a: 'sun', b: 'betelgeuse', icon: '🌟' },
      { label: 'Earth vs Neutron Star', a: 'earth', b: 'neutron-star', icon: '⚡' },
      { label: 'Milky Way vs Andromeda', a: 'milky-way', b: 'andromeda', icon: '🌀' },
      { label: 'Sun vs Sagittarius A*', a: 'sun', b: 'sagittarius-a', icon: '🕳️' },
      { label: 'Solar System vs TRAPPIST-1', a: 'solar-system', b: 'trappist-1-system', icon: '☀️' }
    ];
    this.render();
  }

  getAllObjectsList() {
    const all = getAllAstronomicalObjects();
    // Return objects with valid diameterKm, sorted by category then name
    return all.filter(o => typeof o.diameterKm === 'number' && o.diameterKm > 0);
  }

  formatKm(num) {
    if (num >= 9.461e12) {
      const ly = num / 9.461e12;
      return `${ly.toLocaleString(undefined, { maximumFractionDigits: 1 })} light-years (${num.toExponential(2)} km)`;
    }
    if (num >= 1.496e8) {
      const au = num / 1.496e8;
      return `${au.toLocaleString(undefined, { maximumFractionDigits: 2 })} AU (${num.toLocaleString()} km)`;
    }
    return `${num.toLocaleString()} km`;
  }

  render() {
    const allObjects = this.getAllObjectsList();
    const itemA = getAstronomicalObject(this.objectA) || allObjects.find(o => o.id === 'earth') || allObjects[0];
    const itemB = getAstronomicalObject(this.objectB) || allObjects.find(o => o.id === 'jupiter') || allObjects[1];

    // Compute relative ratio
    const diamA = itemA.diameterKm || 12742;
    const diamB = itemB.diameterKm || 139820;
    const ratio = diamB / diamA;

    // Visual circle sizing (normalized to max 220px, min 14px)
    let sizeA, sizeB;
    if (diamA > diamB) {
      sizeA = 220;
      sizeB = Math.max(14, Math.min(220, 220 * (diamB / diamA)));
    } else {
      sizeB = 220;
      sizeA = Math.max(14, Math.min(220, 220 * (diamA / diamB)));
    }

    const largerName = ratio >= 1 ? itemB.name : itemA.name;
    const smallerName = ratio >= 1 ? itemA.name : itemB.name;
    const factor = ratio >= 1 ? ratio : (1 / ratio);

    let factorStr;
    if (factor >= 1e6) {
      factorStr = factor.toExponential(2);
    } else if (factor >= 100) {
      factorStr = Math.round(factor).toLocaleString();
    } else {
      factorStr = factor.toFixed(1);
    }

    this.container.innerHTML = `
      <div class="scale-comp-header">
        <h3 class="scale-comp-title">🔭 Cosmic Scale Comparator</h3>
        <p class="scale-comp-sub">Select any two celestial bodies to visualize their true relative physical sizes side-by-side.</p>
      </div>

      <!-- Quick Preset Buttons -->
      <div style="margin-bottom: 1.5rem;">
        <span style="display: block; text-align: center; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 0.6rem;">
          Popular Cosmic Comparisons
        </span>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;">
          ${this.presets.map(p => {
            const isCurrent = (this.objectA === p.a && this.objectB === p.b) || (this.objectA === p.b && this.objectB === p.a);
            return `
              <button class="scale-preset-btn ${isCurrent ? 'active' : ''}" data-a="${p.a}" data-b="${p.b}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; border-radius: 20px; background: ${isCurrent ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}; border: 1px solid ${isCurrent ? 'var(--cyan-glow)' : 'rgba(255, 255, 255, 0.12)'}; color: ${isCurrent ? '#00f0ff' : '#cbd5e1'}; cursor: pointer; transition: all 0.2s ease;">
                <span>${p.icon}</span> ${p.label}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="scale-selectors-row">
        <div class="selector-group">
          <label for="selectObjA">Object A:</label>
          <select id="selectObjA" class="cosmic-select">
            ${allObjects.map(o => `<option value="${o.id}" ${o.id === itemA.id ? 'selected' : ''}>${o.name} (${o.type})</option>`).join('')}
          </select>
        </div>

        <div class="scale-vs-badge">VS</div>

        <div class="selector-group">
          <label for="selectObjB">Object B:</label>
          <select id="selectObjB" class="cosmic-select">
            ${allObjects.map(o => `<option value="${o.id}" ${o.id === itemB.id ? 'selected' : ''}>${o.name} (${o.type})</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="scale-stage">
        <!-- Object A Visual -->
        <div class="scale-entity-box">
          <div class="scale-circle-wrap" style="height: 230px; display: flex; align-items: center; justify-content: center;">
            <div class="scale-circle" style="width: ${sizeA}px; height: ${sizeA}px; background: radial-gradient(circle at 35% 35%, ${itemA.color || '#38bdf8'}, #090d16); box-shadow: 0 0 25px ${itemA.color || '#38bdf8'}40;"></div>
          </div>
          <h4 class="scale-entity-name" style="margin-top: 0.75rem;">${itemA.name}</h4>
          <span class="scale-entity-diam" style="font-size: 0.8rem; color: var(--text-muted);">${itemA.diameter ? itemA.diameter.split('(')[0].trim() : this.formatKm(diamA)}</span>
        </div>

        <!-- Object B Visual -->
        <div class="scale-entity-box">
          <div class="scale-circle-wrap" style="height: 230px; display: flex; align-items: center; justify-content: center;">
            <div class="scale-circle" style="width: ${sizeB}px; height: ${sizeB}px; background: radial-gradient(circle at 35% 35%, ${itemB.color || '#f59e0b'}, #090d16); box-shadow: 0 0 25px ${itemB.color || '#f59e0b'}40;"></div>
          </div>
          <h4 class="scale-entity-name" style="margin-top: 0.75rem;">${itemB.name}</h4>
          <span class="scale-entity-diam" style="font-size: 0.8rem; color: var(--text-muted);">${itemB.diameter ? itemB.diameter.split('(')[0].trim() : this.formatKm(diamB)}</span>
        </div>
      </div>

      <div class="scale-ratio-verdict" style="margin-top: 1rem; text-align: center; padding: 1rem 1.5rem; background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px;">
        <span class="ratio-highlight" style="font-size: 1rem; color: #e2e8f0; line-height: 1.6;">
          <strong>${largerName}</strong> is approximately <strong style="color: var(--cyan-glow);">${factorStr}×</strong> wider in diameter than <strong>${smallerName}</strong>.
        </span>
        <div style="margin-top: 0.35rem; font-size: 0.82rem; color: var(--text-muted);">
          Physical Diameters: ${itemA.name} (${this.formatKm(diamA)}) vs ${itemB.name} (${this.formatKm(diamB)})
        </div>
      </div>
    `;

    const selA = this.container.querySelector('#selectObjA');
    const selB = this.container.querySelector('#selectObjB');

    selA.addEventListener('change', (e) => {
      this.objectA = e.target.value;
      audioEngine.playChime(420, 'sine', 0.03, 0.2);
      this.render();
    });

    selB.addEventListener('change', (e) => {
      this.objectB = e.target.value;
      audioEngine.playChime(420, 'sine', 0.03, 0.2);
      this.render();
    });

    // Preset buttons
    this.container.querySelectorAll('.scale-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.objectA = btn.dataset.a;
        this.objectB = btn.dataset.b;
        audioEngine.playChime(520, 'sine', 0.05, 0.25);
        this.render();
      });
    });
  }
}
