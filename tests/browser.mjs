import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const PORT = 4321;
const BASE = '/cimap-venezuela-renace/';
const ORIGIN = `http://127.0.0.1:${PORT}`;
const URL = (path = '') => `${ORIGIN}${BASE}${path.replace(/^\//, '')}`;

mkdirSync('docs/capturas', { recursive: true });

console.log('--- INICIANDO SERVIDOR ASTRO PREVIEW ---');
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  stdio: ['ignore', 'pipe', 'pipe']
});

let serverReady = false;
server.stdout.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('http')) serverReady = true;
});
server.stderr.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('http')) serverReady = true;
});

// Wait up to 10s for server to start
for (let i = 0; i < 20; i++) {
  if (serverReady) break;
  try {
    const res = await fetch(ORIGIN + BASE);
    if (res.ok) { serverReady = true; break; }
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

console.log('Servidor listo en:', ORIGIN + BASE);

const browser = await chromium.launch({
  executablePath: '/snap/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const consoleErrors = [];

async function createContextAndPage(viewport) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[CONSOLE ERROR @ ${page.url()}] ${msg.text()}`);
    }
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      consoleErrors.push(`[HTTP ${res.status()}] ${res.url()}`);
    }
  });
  return { context, page };
}

try {
  console.log('\n--- 1. AUDITORÍA DE PORTADA (DESKTOP 1440x900) ---');
  const { page: desktopPage } = await createContextAndPage({ width: 1440, height: 900 });
  await desktopPage.goto(URL(), { waitUntil: 'networkidle' });

  // Verificaciones de contenido y accesos
  const title = await desktopPage.title();
  console.log('Título:', title);
  assert.ok(title.includes('Venezuela Renace'), 'El título debe incluir Venezuela Renace');

  const chaptersCount = await desktopPage.locator('.contents a').count();
  console.log('Capítulos en índice:', chaptersCount);
  assert.equal(chaptersCount, 12, 'Deben existir 12 capítulos en el directorio');

  await desktopPage.screenshot({ path: 'docs/capturas/01_portada_desktop.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/01_portada_desktop.png');

  console.log('\n--- 2. AUDITORÍA DE BUSCADOR GLOBAL MODAL ---');
  await desktopPage.locator('#open-search').click();
  await desktopPage.waitForSelector('dialog#search[open]');
  await desktopPage.locator('#q-global').fill('pensiones');
  await desktopPage.waitForTimeout(300);
  const searchResultsCount = await desktopPage.locator('#search-hits li').count();
  console.log('Resultados para "pensiones":', searchResultsCount);
  assert.ok(searchResultsCount > 0, 'La búsqueda debe arrojar resultados');

  await desktopPage.screenshot({ path: 'docs/capturas/02_buscador_modal.png' });
  console.log('✓ Captura guardada: docs/capturas/02_buscador_modal.png');
  await desktopPage.locator('.dialog-head button').click();

  console.log('\n--- 3. CAPÍTULO 1: FUNDAMENTOS Y DIAGRAMAS SVG ---');
  await desktopPage.goto(URL('capitulos/fundamentos/'), { waitUntil: 'networkidle' });
  const hubDiagram = await desktopPage.locator('#cuatro-pilares .wide-plot svg').isVisible();
  const pathDiagram = await desktopPage.locator('#tres-fases .wide-plot svg').isVisible();
  assert.ok(hubDiagram && pathDiagram, 'Los diagramas de 4 pilares y 3 fases deben ser visibles');
  await desktopPage.screenshot({ path: 'docs/capturas/03_capitulo01_fundamentos.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/03_capitulo01_fundamentos.png');

  console.log('\n--- 4. CAPÍTULO 2: AGENDA LEGISLATIVA Y FILTROS INTERACTIVOS ---');
  await desktopPage.goto(URL('capitulos/agenda-legislativa/'), { waitUntil: 'networkidle' });
  const totalLaws = await desktopPage.locator('.law').count();
  console.log('Fichas legislativas totales:', totalLaws);
  assert.equal(totalLaws, 29, 'Deben existir 29 fichas legislativas');

  // Filtrado interactivo
  await desktopPage.locator('#q-law').fill('electricidad');
  await desktopPage.waitForTimeout(200);
  const visibleLaws = await desktopPage.locator('.law:not([hidden])').count();
  console.log('Fichas visibles tras filtro "electricidad":', visibleLaws);
  assert.ok(visibleLaws > 0 && visibleLaws < 29, 'El filtro de búsqueda debe reducir las fichas');

  // Abrir primera ficha
  await desktopPage.locator('.law:not([hidden]) summary').first().click();
  await desktopPage.screenshot({ path: 'docs/capturas/04_capitulo02_agenda_filtros.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/04_capitulo02_agenda_filtros.png');

  console.log('\n--- 5. CAPÍTULO 3: DIAGNÓSTICO MACROECONÓMICO Y ECHARTS ---');
  await desktopPage.goto(URL('capitulos/diagnostico-macroeconomico/'), { waitUntil: 'networkidle' });
  // Verificar renderizado de ECharts SVG
  await desktopPage.waitForSelector('.plot svg');
  const hasEchartsSvg = await desktopPage.locator('.plot svg').first().isVisible();
  assert.ok(hasEchartsSvg, 'ECharts debe renderizar SVG de gráfica macroeconómica');

  // Probar ordenamiento en tabla colapsable
  await desktopPage.locator('.observations summary').first().click();
  const firstValBefore = await desktopPage.locator('.table-wrap tbody tr td:nth-child(2)').first().textContent();
  await desktopPage.locator('button[data-sort="1"]').first().click();
  const firstValAfter = await desktopPage.locator('.table-wrap tbody tr td:nth-child(2)').first().textContent();
  console.log(`Ordenamiento tabla: antes="${firstValBefore}", después="${firstValAfter}"`);

  await desktopPage.screenshot({ path: 'docs/capturas/05_capitulo03_macro_echarts.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/05_capitulo03_macro_echarts.png');

  console.log('\n--- 6. CAPÍTULO 4: DEUDA Y SOSTENIBILIDAD SOBERANA ---');
  await desktopPage.goto(URL('capitulos/deuda-soberana/'), { waitUntil: 'networkidle' });
  await desktopPage.waitForSelector('.plot svg');
  await desktopPage.screenshot({ path: 'docs/capturas/06_capitulo04_deuda_soberana.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/06_capitulo04_deuda_soberana.png');

  console.log('\n--- 7. CAPÍTULO 5: PETRÓLEO Y GAS ---');
  await desktopPage.goto(URL('capitulos/petroleo-y-gas/'), { waitUntil: 'networkidle' });
  await desktopPage.waitForSelector('.plot svg');
  await desktopPage.screenshot({ path: 'docs/capturas/07_capitulo05_petroleo_gas.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/07_capitulo05_petroleo_gas.png');

  console.log('\n--- 8. CAPÍTULO 10: GOBERNANZA Y MATRIZ DE RIESGOS ---');
  await desktopPage.goto(URL('capitulos/gobernanza-y-riesgos/'), { waitUntil: 'networkidle' });
  const matrixVisible = await desktopPage.locator('#matriz-riesgo .wide-plot svg').isVisible();
  assert.ok(matrixVisible, 'La matriz de riesgo debe ser visible');
  await desktopPage.screenshot({ path: 'docs/capturas/08_capitulo10_matriz_riesgo.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/08_capitulo10_matriz_riesgo.png');

  console.log('\n--- 9. CAPÍTULO 11: LABORATORIO MISRE 2036 Y SENSIBILIDAD ---');
  await desktopPage.goto(URL('capitulos/laboratorio-misre/'), { waitUntil: 'networkidle' });
  const initialLabVal = await desktopPage.locator('#lab-value').textContent();
  console.log('Valor inicial del simulador de deuda:', initialLabVal);
  assert.equal(initialLabVal, '242,14 %', 'El valor inicial de ratio fijo debe ser 242,14%');

  // Cambiar modo del laboratorio a facturación petrolera bruta
  await desktopPage.locator('#lab-mode').selectOption('venta');
  await desktopPage.waitForTimeout(200);
  const ventaVal = await desktopPage.locator('#lab-value').textContent();
  console.log('Simulador facturación venta:', ventaVal);
  assert.ok(ventaVal.includes('millones USD'), 'Debe calcular variación en millones USD');

  await desktopPage.screenshot({ path: 'docs/capturas/09_capitulo11_misre_lab.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/09_capitulo11_misre_lab.png');

  console.log('\n--- 10. CAPÍTULO 12: BIBLIOTECA, APA Y RENUNCIAS CIENTÍFICAS ---');
  await desktopPage.goto(URL('capitulos/biblioteca/'), { waitUntil: 'networkidle' });
  const refCount = await desktopPage.locator('.ref-item').count();
  console.log('Referencias bibliográficas APA encontradas:', refCount);
  assert.ok(refCount >= 17, 'Deben existir al menos 17 referencias APA');
  await desktopPage.screenshot({ path: 'docs/capturas/10_capitulo12_biblioteca_apa.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/10_capitulo12_biblioteca_apa.png');

  console.log('\n--- 11. AUDITORÍA RESPONSIVE TABLET (768x1024) ---');
  const { page: tabletPage } = await createContextAndPage({ width: 768, height: 1024 });
  await tabletPage.goto(URL(), { waitUntil: 'networkidle' });
  await tabletPage.screenshot({ path: 'docs/capturas/11_responsive_tablet.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/11_responsive_tablet.png');

  console.log('\n--- 12. AUDITORÍA RESPONSIVE MOBILE (375x812) ---');
  const { page: mobilePage } = await createContextAndPage({ width: 375, height: 812 });
  await mobilePage.goto(URL(), { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'docs/capturas/12_responsive_mobile.png', fullPage: true });
  console.log('✓ Captura guardada: docs/capturas/12_responsive_mobile.png');

  console.log('\n--- 13. VERIFICACIÓN DE ENDPOINTS DE DATOS Y CSV ---');
  const csvRes = await fetch(URL('datos/pib-real.csv'));
  assert.equal(csvRes.status, 200, 'El endpoint CSV debe retornar HTTP 200');
  const csvText = await csvRes.text();
  assert.ok(csvText.includes('La recuperación del producto interno bruto'), 'El CSV debe tener contenido válido');

  const jsonRes = await fetch(URL('datos/busqueda.json'));
  assert.equal(jsonRes.status, 200, 'El endpoint busqueda.json debe retornar HTTP 200');
  const jsonData = await jsonRes.json();
  assert.ok(Array.isArray(jsonData) && jsonData.length > 50, 'El índice de búsqueda debe tener más de 50 entradas');

  console.log('\n--- RESULTADOS DE AUDITORÍA DE CONSOLA ---');
  if (consoleErrors.length > 0) {
    console.error('Errores de consola encontrados:', consoleErrors);
    throw new Error(`Se detectaron ${consoleErrors.length} errores de consola durante la navegación.`);
  } else {
    console.log('✓ CERO errores de consola detectados en todas las pantallas e interacciones.');
  }

  console.log('\n=========================================');
  console.log('🎉 AUDITORÍA QA COMPLETA: TODOS LOS TESTS PASARON EXITOSAMENTE.');
  console.log('=========================================');
} finally {
  await browser.close();
  server.kill('SIGTERM');
}
