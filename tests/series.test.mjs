import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const series = JSON.parse(await readFile(new URL('../src/data/series.json', import.meta.url), 'utf8'));
const byId = new Map(series.map(entry => [entry.id, entry]));
const values = id => byId.get(id).points.map(point => point.value);
const total = id => values(id).reduce((sum, value) => sum + value, 0);

test('Cada observación conserva una unidad, una referencia impresa y una categoría documental', () => {
  assert.equal(series.length, byId.size);
  const kinds = new Set(['histórico', 'estimación oficial', 'proyección oficial', 'cálculo propio']);
  for (const entry of series) {
    assert.match(entry.source, /pp?\. \d+/);
    for (const key of ['title', 'unit', 'period', 'interpretation', 'implication']) {
      assert.ok(entry[key]?.trim(), entry.id + ' / ' + key);
    }
    assert.equal(new Set(entry.points.map(p => p.label)).size, entry.points.length);
    for (const point of entry.points) {
      assert.ok(Number.isFinite(point.value));
      assert.ok(kinds.has(point.kind ?? entry.kind));
      if (entry.kind === 'mixto') {
        const year = Number(point.label);
        const expected = year <= 2024 ? 'histórico' : year === 2025 ? 'estimación oficial' : 'proyección oficial';
        assert.equal(point.kind, expected, entry.id + ' / ' + point.label);
      }
    }
  }
});

test('La deuda por acreencia y por emisor concilia al inventario de la tabla 3', () => {
  assert.equal(total('deuda-tipo'), 237544);
  assert.equal(total('deuda-emisor'), 237544);
  assert.equal(total('deuda-multilateral'), 4163);
  // El cuadro original publica los subtotales redondeados por separado.
  assert.equal(total('eurobonos') - 110134, 1);
});

test('Las composiciones reproducen sus universos documentados', () => {
  assert.ok(Math.abs(total('manufactura-privada') - 100) < 1e-9);
  assert.equal(total('minas-oro'), 24);
});

test('El diferencial anual de Brent se reproduce a partir de ambas tablas oficiales', () => {
  const prices = byId.get('brent').points;
  const thresholds = byId.get('brent-equilibrio').points;
  assert.deepEqual(byId.get('brecha-brent').points, prices.map((point, i) => {
    assert.equal(thresholds[i].label, point.label);
    return {label: point.label, value: Number((point.value - thresholds[i].value).toFixed(1))};
  }));
});

test('El gas interno está contenido en el total comercializable de cada año proyectado', () => {
  const supply = new Map(byId.get('gas-comercializable').points.map(p => [p.label, p.value]));
  for (const point of byId.get('gas-interno').points) {
    assert.ok(point.value <= supply.get(point.label), point.label);
  }
});

test('Los indicadores documentales del V2 se reproducen con los cuadros oficiales', () => {
  const at = (id, year) => {
    const point = byId.get(id).points.find(p => p.label === String(year));
    assert.ok(point, id + ' / ' + year);
    return point.value;
  };
  const round = n => Number(n.toFixed(2));
  const debtInBillions = total('deuda-emisor') / 1000;
  // El numerador permanece fijo en 2025 para aislar el efecto del denominador.
  const staticRatios = [2025, 2031, 2036].map(year => round(100 * debtInBillions / at('pib-nominal', year)));
  assert.deepEqual(staticRatios, [242.14, 118.24, 81.74]);
  assert.equal(round(100 * at('eurobonos', 'Intereses vencidos') / 110134), 41.71);
  assert.equal(round(100 * (at('pib-real', 2036) / at('pib-real', 2025) - 1)), 96.42);
  assert.equal(round(at('pib-real', 2036) - 100), -28.7);
  const deficits = [2026, 2027, 2028, 2029, 2030].map(year => -at('saldo-publico-dolares', year));
  assert.equal(round(deficits.reduce((sum, value) => sum + value, 0)), 19.2);
  assert.deepEqual(values('brecha-brent'), [-6.9, -15.5, -11, -6.5, -5.8, 0.2, 0.7, 1.1, 2.6, 3.1, 4.2]);
  assert.equal(round(100 * at('crudo-contratos', 2036) / at('produccion-crudo', 2036)), 57.02);
  assert.equal(round(100 * (at('produccion-crudo', 2036) / at('produccion-crudo', 2026) - 1)), 140.93);
  // El texto de la p. 90 expresa 160 mil millones de inversión y 75 a cargo de PDVSA.
  assert.equal(round(total('inversion-petrolera')), 159.8);
  assert.equal(100 * 75 / Math.round(total('inversion-petrolera')), 46.875);
});
