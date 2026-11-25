import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { fixedDebtRatio, annualGrossChange, fiscalMargin } from '../src/lib/math.mjs';

const series = JSON.parse(await readFile(new URL('../src/data/series.json', import.meta.url), 'utf8'));
const base = JSON.parse(await readFile(new URL('../src/data/base.json', import.meta.url), 'utf8'));
const agenda = JSON.parse(await readFile(new URL('../src/data/agenda.json', import.meta.url), 'utf8'));
const diagrams = JSON.parse(await readFile(new URL('../src/data/diagrams.json', import.meta.url), 'utf8'));
const references = JSON.parse(await readFile(new URL('../src/data/references.json', import.meta.url), 'utf8'));

test('Auditoría Científica 1: Integridad total de 40 series estadísticas (496 puntos)', () => {
  assert.equal(series.length, 40, 'Deben existir exactamente 40 series');
  const allowedKinds = new Set(['histórico', 'estimación oficial', 'proyección oficial', 'cálculo propio']);
  let totalPoints = 0;

  for (const s of series) {
    assert.ok(s.id, 'Cada serie debe tener id');
    assert.ok(s.title, 'Cada serie debe tener título');
    assert.ok(s.unit, 'Cada serie debe tener unidad');
    assert.ok(s.period, 'Cada serie debe tener período');
    assert.ok(s.source, 'Cada serie debe tener fuente');
    assert.ok(s.source.includes('República Bolivariana de Venezuela (2026)') || s.source.includes('Morfe (2026)'), 'Fuente trazable');
    assert.ok(s.points && s.points.length > 0, `Serie ${s.id} debe tener puntos`);

    for (const p of s.points) {
      totalPoints++;
      assert.ok(p.label, `Punto en ${s.id} debe tener etiqueta`);
      assert.ok(typeof p.value === 'number' && !isNaN(p.value), `Valor numérico válido en ${s.id} (${p.label})`);
      const k = p.kind || s.kind;
      assert.ok(allowedKinds.has(k), `Naturaleza metodológica no reconocida en ${s.id}: ${k}`);
    }
  }

  assert.equal(totalPoints, 496, 'Deben auditarse exactamente 496 puntos de datos');
});

test('Auditoría Científica 2: Conciliación exacta de base.json con la tabla macro oficial', () => {
  assert.equal(base.length, 12, '12 años (2025 est. y 2026–2036 proy.)');
  const b2025 = base.find(b => b.anio === 2025);
  assert.equal(b2025.PIB_USD_MMM, 98.1);
  assert.equal(b2025.PIB_real_indice, 36.3);
  assert.equal(b2025.produccion_mbd, 1.118);
  assert.equal(b2025.IPC_fin_pct, 475);
  assert.equal(b2025.saldo_primario_USD_MMM, -4);
  assert.equal(b2025.saldo_primario_pct_PIB, -4);
  assert.equal(b2025.Brent_USD, 68.3);
  assert.equal(b2025.cesta_USD, 51.4);

  const b2036 = base.find(b => b.anio === 2036);
  assert.equal(b2036.PIB_USD_MMM, 290.6);
  assert.equal(b2036.PIB_real_indice, 71.3);
  assert.equal(b2036.produccion_mbd, 2.908);
  assert.equal(b2036.IPC_fin_pct, 24);
  assert.equal(b2036.saldo_primario_USD_MMM, 2.9);
  assert.equal(b2036.saldo_primario_pct_PIB, 1);
  assert.equal(b2036.Brent_USD, 68.8);
  assert.equal(b2036.cesta_USD, 56.4);
  assert.equal(b2036.Brent_equilibrio, 64.6);
  assert.equal(b2036.capex_petrolero_MMM, 16.3);
  assert.equal(b2036.cuenta_corriente_ajustada_pct_PIB, 2.6);
});

test('Auditoría Científica 3: Reproducción matemática de los ejercicios de la Memoria MISRE', () => {
  // Ejercicio 1: Ratios estáticos deuda/PIB a saldo fijo 2025 (237.544 USD MMM)
  assert.equal(Number(fixedDebtRatio(237.544, 98.1).toFixed(2)), 242.14);
  assert.equal(Number(fixedDebtRatio(237.544, 200.9).toFixed(2)), 118.24);
  assert.equal(Number(fixedDebtRatio(237.544, 290.6).toFixed(2)), 81.74);

  // Ejercicio 2: Sensibilidad de facturación bruta unitaria (100.000 b/d x 365 x 1 USD)
  assert.equal(annualGrossChange(100000, 1), 36.5);

  // Ejercicio 3: Margen Brent previsto menos equilibrio primario (2026 y 2036)
  assert.equal(Number(fiscalMargin(99.1, 106.0).toFixed(1)), -6.9);
  assert.equal(Number(fiscalMargin(68.8, 64.6).toFixed(1)), 4.2);
});

test('Auditoría Científica 4: Rigor jurídico en la clasificación de la Agenda Legislativa', () => {
  assert.equal(agenda.length, 29, '29 instrumentos normativos');
  const validLegalStatuses = new Set([
    'Publicación en Gaceta',
    'Sanción parlamentaria documentada',
    'Hito del programa',
    'Antecedente administrativo documentado'
  ]);

  for (const item of agenda) {
    assert.ok(validLegalStatuses.has(item.status), `Estado legal no reconocido: ${item.status}`);
    assert.ok(item.source, `Fuente requerida para ${item.id}`);
    assert.ok(item.dependency, `Dependencia requerida para ${item.id}`);

    if (item.status === 'Publicación en Gaceta') {
      assert.ok(item.source.includes('Gaceta Oficial'), `Debe citar Gaceta Oficial: ${item.id}`);
    }
  }

  const gazetteCount = agenda.filter(a => a.status === 'Publicación en Gaceta').length;
  assert.equal(gazetteCount, 2, 'Exactamente 2 leyes publicadas en Gaceta (Hidrocarburos y Minas)');
});

test('Auditoría Científica 5: Validez de los 14 diagramas analíticos vectoriales', () => {
  assert.equal(diagrams.length, 14, '14 diagramas SVG estructurados');
  for (const d of diagrams) {
    assert.ok(d.id, 'Diagrama debe tener id');
    assert.ok(d.title, 'Diagrama debe tener título');
    assert.ok(d.source, 'Diagrama debe tener fuente documentada');
    assert.ok(d.treatment, 'Diagrama debe tener tratamiento metodológico');
    assert.ok(d.interpretation, 'Diagrama debe tener interpretación analítica');
  }
});

test('Auditoría Científica 6: Corpus de referencias en formato APA 7', () => {
  assert.equal(references.length, 17, '17 referencias bibliográficas documentadas');
  for (const r of references) {
    assert.ok(r.text, 'Texto de referencia en formato APA');
    assert.ok(r.category, 'Categoría institucional');
  }
});
