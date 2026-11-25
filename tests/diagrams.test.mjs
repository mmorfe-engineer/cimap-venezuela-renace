import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const data = JSON.parse(await readFile(new URL('../src/data/diagrams.json', import.meta.url), 'utf8'));

test('Cada diagrama conserva el alcance, la interpretación y la referencia paginada', () => {
  assert.equal(new Set(data.map(d => d.id)).size, data.length);
  for (const figure of data) {
    assert.match(figure.source, /pp?\. \d+/);
    for (const field of ['unit', 'legend', 'period', 'interpretation', 'implication', 'treatment']) {
      assert.ok(figure[field]?.trim(), figure.id + ' / ' + field);
    }
    if (figure.layout === 'path') assert.ok(figure.steps.length >= 2);
    if (figure.layout === 'links') assert.equal(figure.columns.length, 2);
  }
});

test('La tabla 4 conserva las doce probabilidades ordinales y los impactos por pilar', () => {
  const { columns, risks } = data.find(d => d.id === 'matriz-riesgo');
  assert.deepEqual(columns, ['Crecimiento', 'Fiscal', 'Monetario y financiero', 'Gobernanza']);
  const impacts = risks.map(r => r.impact.map(value => value[0]).join(''));
  // En el orden de las filas de la tabla 4 del programa, páginas 37 y 38.
  assert.deepEqual(impacts, ['MMMB', 'MAAM', 'MAMA', 'MMAB', 'MMAB', 'AAAM', 'MMAB', 'MMAB', 'MMMA', 'MAMM', 'AAAM', 'AAAM']);
  assert.ok(risks.every(r => r.probability === 'Medio' && r.response.length > 0));
});
