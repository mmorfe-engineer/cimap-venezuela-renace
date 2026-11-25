# CIMAP | VENEZUELA RENACE (2026–2036)
### Plataforma de Investigación Económica Estratégica y Modelización Macroeconométrica
**Autor Principal e Investigador:** Martin Morfe.°.  
**Institución:** Centro de Investigaciones Macroeconómicas y Políticas Públicas (CIMAP)  
**Metodología:** Modelo Integrado de Simulación y Recuperación Económica (MISRE 2036)  
**URL de Producción / GitHub Pages:** `https://mmorfe-engineer.github.io/cimap-venezuela-renace/`  

---

## 1. Visión y Alcance del Proyecto

*CIMAP | Venezuela Renace* es una plataforma digital de investigación económica estratégica de estándar internacional, diseñada conforme a los cánones editoriales y analíticos de instituciones globales como el Fondo Monetario Internacional (WEO), el Banco de Pagos Internacionales (BIS), *Our World in Data* y la sección de periodismo visual de *Financial Times*.

El programa articula un plan decenal de estabilización, estabilización monetaria, reconstrucción institucional y reactivación productiva sustentado en:
- Una ratio editorial estructurada del **60% de contenido visual / analítico interactivo** frente al **40% de narrativa explicativa**.
- Una base empírica reconciliada de **40 series estadísticas fundamentales** (1998–2036) con descarga directa en formato CSV UTF-8.
- Un corpus de **14 diagramas analíticos vectoriales (SVG nativo)** que sintetizan las interacciones macroeconómicas complejas.
- Una **Agenda Legislativa de 29 instrumentos normativos** ordenados por horizonte de implementación y sector institucional.
- El **Laboratorio Interactivo MISRE 2036**, permitiendo la calibración de escenarios macroeconómicos (producción petrolera, precio de exportación, ajuste fiscal e inversión extranjera).
- Un índice de **búsqueda global en tiempo real** que conecta conceptos, métricas, leyes y referencias bibliográficas en formato APA 7.ª edición.

---

## 2. Arquitectura de la Plataforma

La infraestructura tecnológica prioriza la soberanía del dato, cero dependencias opacas y máxima velocidad de carga:

- **Generador Estático (SSG):** Astro 6 con tipado estricto TypeScript. Salida 100% estática (`output: 'static'`) con ruta base `/cimap-venezuela-renace/`.
- **Motor de Visualización:** Apache ECharts 6 configurado en modo SVG para máxima fidelidad vectorial y bajo consumo de memoria, complementado con diagramas SVG semánticos integrados directamente en el DOM.
- **Tipografía Editorial Local:** Spectral (serifa para títulos y bloques de lectura analítica) y Source Sans 3 (grotesca de alta legibilidad para paneles de control, tablas y ejes numéricos), empaquetadas sin llamadas a CDNs externas.
- **Paleta Cromática Institucional:** Navy institucional profundo (`#0b1d28`), azul pizarra (`#27496d`), matices solares (`#d49a37` / `#f3c669`) y rojo de alerta/reforma (`#8f2d2d`).
- **Accesibilidad y Rendimiento:** Diseño completamente fluido y responsivo (escritorio, tablet y teléfono móvil), con soporte para navegación por teclado, contraste auditado y reglas específicas de impresión analítica (`@media print`).

---

## 3. Directorio de Capítulos

| Cap. | Título | Foco Analítico y Métrico |
| :--- | :--- | :--- |
| **01** | [Fundamentos y Visión Integral](capitulos/fundamentos/) | Bases metodológicas, gobernanza macroeconómica y los 4 pilares de rescate. |
| **02** | [Diagnóstico Macroeconómico Estructural](capitulos/diagnostico-macroeconomico/) | Dinámica de contracción del PIB, hiperinflación, régimen cambiario y brechas de balanza de pagos. |
| **03** | [Petróleo, Gas y Matriz Energética](capitulos/petroleo-y-gas/) | Plan de reactivación de PDVSA, hidrocarburos costa afuera, reducción de quema de gas y transición. |
| **04** | [Diversificación Productiva y Complejidad Económica](capitulos/diversificacion-productiva/) | Reindustrialización, agroindustria, minería regulada y encadenamientos no tradicionales. |
| **05** | [Finanzas Públicas, Regla Fiscal y Deuda](capitulos/finanzas-publicas/) | Reforma tributaria no confiscatoria, regla de superávit estructural y disciplina presupuestaria. |
| **06** | [Deuda Soberana y Reestructuración Integral](capitulos/deuda-soberana/) | Tratamiento del stock de pasivos externos, bonos PDVSA, arbitrajes CIADI y cupones ligados al PIB. |
| **07** | [Financiamiento Internacional e IED](capitulos/financiamiento-internacional/) | Reincorporación al FMI/BM/CAF/BID, marcos de seguridad jurídica para IED y seguro de riesgo político. |
| **08** | [Empleo, Salarios y Protección Social](capitulos/empleo-y-proteccion-social/) | Recomposición del salario real, modernización laboral y red de transferencias condicionadas directas. |
| **09** | [Gobernanza, Instituciones y Matriz de Riesgos](capitulos/gobernanza-y-riesgos/) | Independencia del BCV, despolitización de empresas públicas y mitigación de riesgos de captura. |
| **10** | [Agenda Legislativa y Reformas Estructurales](capitulos/agenda-legislativa/) | Paquete integral de 29 leyes para la transición institucional y la reactivación productiva. |
| **11** | [Laboratorio Interactivo MISRE 2036](capitulos/laboratorio-misre/) | Simulador de sensibilidad y escenarios macroeconómicos (Inercial, Reformista y Acelerado). |
| **12** | [Biblioteca y Referencias Metodológicas](capitulos/biblioteca/) | Documentación de fuentes primarias, conciliación de discrepancias y bibliografía científica APA. |

---

## 4. Conjunto de Datos y Series Temporales

Todas las series se encuentran estructuradas en `src/data/series.json` y se compilan estáticamente en archivos descargables bajo `dist/datos/[id].csv` con formato UTF-8 y Byte Order Mark (BOM) para compatibilidad inmediata con Microsoft Excel y entornos R / Python:

- **Sector Petrolero y Energía:** Producción crudo (Mbd), precio cesta venezolana, diferencial Brent, refinación interna, taladros activos, quema y venteo de gas natural.
- **Sector Real:** PIB nominal en USD, PIB real per cápita, tasa de crecimiento interanual, índice de complejidad económica (ECI), índice de producción industrial.
- **Precios y Régimen Cambiario:** Tipo de cambio oficial BCV, tipo de cambio paralelo/mercado, inflación anualizada y variación mensual de precios al consumidor.
- **Sector Externo y Deuda:** Exportaciones petroleras y no petroleras, importaciones totales, reservas internacionales netas, saldo en cuenta corriente, stock total de deuda externa reestructurable.
- **Finanzas Públicas:** Recaudación tributaria no petrolera como % del PIB, déficit/superávit primario del SPNF, gasto público consolidado y balance financiero.
- **Sector Social y Mercado Laboral:** Salario mínimo legal y canasta alimentaria en USD, tasa de desempleo abierto, informalidad laboral, tasa de pobreza extrema y coeficiente de Gini.

---

## 5. Delimitación Metodológica y Renuncias Científicas (Documento III)

En estricta observancia de los principios de transparencia científica expresados en la *Memoria Científica MISRE 2036* y el *Documento III (Renuncias Científicas)*:

1. **Reconciliación de Fuentes Discrepantes:** Ante las divergencias notorias entre los reportes directos oficiales de PDVSA/BCV y fuentes secundarias de inteligencia de mercado (OPEP secondary sources, Joint Organizations Data Initiative - JODI, TankerTrackers, Kpler, Agencia Internacional de Energía), la serie de producción petrolera base se concilia reportando las bandas de tolerancia documentadas en el Capítulo 12.
2. **Horizonte Estadístico y Ruptura Estructural:** Los años del colapso hiperinflacionario (2017–2021) incorporan imputaciones matemáticas mediante interpolación spline armónica sobre series privadas fiables (CEDICE Libertad, Ecoanalítica, OVFI) para salvaguardar la coherencia analítica.
3. **Estado de Desarrollo del Modelo MISRE:** La versión actual del simulador implementa el módulo de relaciones estructurales deterministas y elasticidades empíricas calibradas. La parametrización estocástica completa mediante BVAR (Bayesian Vector Autoregression) y las simulaciones de trayectoria estocástica Monte Carlo permanecen catalogadas como líneas abiertas de investigación técnica para fases subsiguientes.

---

## 6. Verificación, Pruebas y Control de Calidad (QA)

La plataforma cuenta con un ciclo de verificación automatizado en tres niveles:

### 1. Pruebas Unitarias de Integridad (`npm test`)
Verifica la estructura, consistencia y completitud de las series de datos, los 14 diagramas vectoriales y los 29 instrumentos legislativos:
```bash
npm test
```
*Resultado verificado:* 8/8 pruebas exitosas.

### 2. Comprobación Estática y Compilación (`npm run build`)
Valida la integridad de tipos con Astro Check y compila la totalidad del sitio estático en el directorio `dist/`:
```bash
npm run build
```
*Resultado verificado:* 0 errores, 0 advertencias en 20 componentes y 13 páginas estáticas generadas.

### 3. Auditoría Visual y de Comportamiento en Navegador (`npm run qa`)
Ejecuta un servidor estático local y lanza Playwright sobre Chromium en modo headless para auditar:
- Detección de cero errores de consola o red (`console.error`, 404, etc.).
- Verificación del cuadro de diálogo modal de búsqueda global.
- Validación de filtros dinámicos de la Agenda Legislativa.
- Renderizado interactivo de gráficos SVG con Apache ECharts.
- Ordenamiento y renderizado de tablas de datos.
- Ejecución client-side y recálculo del simulador macroeconómico MISRE.
- Generación de capturas de pantalla de alta resolución almacenadas en `docs/capturas/`.
```bash
npm run qa
```

---

## 7. Despliegue Continuo (CI/CD)

El archivo `.github/workflows/deploy.yml` implementa el flujo oficial de GitHub Actions para el despliegue automático en GitHub Pages:

1. Ejecución de `actions/checkout@v4` y configuración de Node.js 22.
2. Ejecución obligatoria de la suite de pruebas unitarias (`npm test`).
3. Compilación estática del proyecto (`npm run build`).
4. Empaquetado y publicación automática en el entorno `github-pages`.

---

## 8. Licencia y Créditos

**Investigación y Modelización:** Martin Morfe.°., CIMAP  
**Diseño Editorial y Desarrollo de Plataforma:** Centro de Investigaciones Macroeconómicas y Políticas Públicas  
**Derechos:** © 2026 Martin Morfe.°. Todos los derechos reservados. Distribución autorizada con fines de análisis estratégico, debate legislativo y formulación de políticas públicas.
