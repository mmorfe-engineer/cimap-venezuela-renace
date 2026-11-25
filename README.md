# CIMAP | VENEZUELA RENACE (2026–2036)
### Plataforma de Investigación Económica Estratégica
**Autor Principal e Investigador:** Martin Morfe.°.  
**Institución:** Centro de Investigaciones Macroeconómicas y Políticas Públicas (CIMAP)  
**Metodología:** Modelo Integrado de Sostenibilidad y Resurgimiento Económico (MISRE 2036)  
**URL de Producción / GitHub Pages:** `https://mmorfe-engineer.github.io/cimap-venezuela-renace/`  

---

## 1. Visión y Alcance del Proyecto

*CIMAP | Venezuela Renace* es una plataforma digital de investigación económica estratégica de estándar internacional, diseñada conforme a los cánones editoriales y analíticos de instituciones globales como el Fondo Monetario Internacional (WEO), el Banco de Pagos Internacionales (BIS), *Our World in Data* y la sección de periodismo visual de *Financial Times*.

El programa articula un plan decenal de estabilización, reformas institucionales y reactivación productiva sustentado en:
- Una ratio editorial estructurada del **60% de contenido visual / analítico interactivo** frente al **40% de narrativa explicativa**.
- Una base empírica de **40 series estadísticas fundamentales** extraídas con 100% de trazabilidad de los cuadros oficiales de *República Bolivariana de Venezuela (2026)* y reportes complementarios, disponibles para descarga en formato CSV UTF-8 con BOM.
- Un corpus de **14 diagramas analíticos vectoriales (SVG nativo)** que sintetizan la arquitectura institucional y las interacciones macroeconómicas del programa.
- Un **Observatorio de la Agenda Legislativa con 29 instrumentos**, distinguiendo con rigor jurídico entre leyes publicadas en Gaceta Oficial, sanciones parlamentarias pendientes de promulgación e hitos/propuestas programadas.
- El **Laboratorio de Sensibilidad MISRE 2036**, un módulo transparente de ensayo aritmético que reproduce los tres ejercicios de la *Memoria Técnica MISRE* (relación estática de pasivos/PIB, facturación petrolera bruta y margen de equilibrio fiscal).
- Un índice de **búsqueda global en tiempo real** que conecta conceptos, leyes, series y referencias bibliográficas en formato APA 7.ª edición.

---

## 2. Arquitectura de la Plataforma

La infraestructura tecnológica prioriza la soberanía del dato, cero dependencias opacas y máxima velocidad de carga:

- **Generador Estático (SSG):** Astro 6 con tipado estricto TypeScript. Salida 100% estática (`output: 'static'`) con ruta base `/cimap-venezuela-renace/`.
- **Motor de Visualización:** Apache ECharts 6 configurado en modo SVG para máxima fidelidad vectorial y bajo consumo de recursos, complementado con diagramas SVG semánticos integrados directamente en el DOM (`DiagramPlot.astro`).
- **Tipografía Editorial Local:** Spectral (serifa para títulos y bloques de lectura analítica) y Source Sans 3 (grotesca de alta legibilidad para paneles de control, tablas y ejes numéricos), empaquetadas localmente sin llamadas a CDNs externas.
- **Paleta Cromática Institucional:** Navy institucional profundo (`#0b1d28`), azul pizarra (`#27496d`), matices solares (`#d49a37` / `#f3c669`) y rojo de alerta/reforma (`#8f2d2d`).
- **Accesibilidad y Rendimiento:** Diseño completamente fluido y responsivo (escritorio, tablet y teléfono móvil), navegación accesible por teclado y estilos específicos de impresión analítica (`@media print`).

---

## 3. Directorio de Capítulos

| Cap. | Título | Foco Analítico y Métrico |
| :--- | :--- | :--- |
| **01** | [Elementos fundamentales](capitulos/fundamentos/) | Bases metodológicas, pilares de recuperación y secuencia temporal de reformas. |
| **02** | [Agenda legislativa y regulatoria](capitulos/agenda-legislativa/) | Fichas de 29 instrumentos con estado jurídico, dependencia operativa y fuentes. |
| **03** | [Diagnóstico macroeconómico](capitulos/diagnostico-macroeconomico/) | Evolución del PIB real, crecimiento, producto por habitante e inflación. |
| **04** | [Deuda y sostenibilidad soberana](capitulos/deuda-soberana/) | Estructura de pasivos al cierre de 2025: acreencias, emisores, eurobonos y deuda multilateral. |
| **05** | [Petróleo y gas](capitulos/petroleo-y-gas/) | Producción de crudo, gas comercializable, refinados, inversión petrolera y contratos. |
| **06** | [Finanzas públicas y estabilización](capitulos/finanzas-publicas/) | Operaciones del sector público consolidado y gobierno central (% PIB y USD eq.). |
| **07** | [Diversificación productiva](capitulos/diversificacion-productiva/) | Minas de oro documentadas, manufactura privada, telecomunicaciones y peso sectorial. |
| **08** | [Empleo, salarios, pensiones y protección social](capitulos/empleo-y-proteccion-social/) | Empleo formal, cobertura educativa ENCOVI, remuneraciones, pensiones y esperanza de vida. |
| **09** | [Geoeconomía y financiamiento internacional](capitulos/financiamiento-internacional/) | Balanza de pagos, exportaciones, IED neta, reservas brutas y cuenta corriente ajustada. |
| **10** | [Gobernanza, ejecución y riesgos](capitulos/gobernanza-y-riesgos/) | Matriz ordinal de riesgos, canales de transmisión, precio Brent supuesto vs. equilibrio fiscal. |
| **11** | [Laboratorio MISRE 2036](capitulos/laboratorio-misre/) | Laboratorio de sensibilidad para ensayar los supuestos aritméticos documentados. |
| **12** | [Biblioteca científica y publicaciones](capitulos/biblioteca/) | Documentación de fuentes primarias, delimitación metodológica y referencias APA 7. |

---

## 4. Conjunto de Datos y Series Temporales

Las 40 series estadísticas de la plataforma se encuentran estructuradas en `src/data/series.json` y se compilan estáticamente en archivos descargables bajo `dist/datos/[id].csv` con formato UTF-8 y Byte Order Mark (BOM):

1. **Sector Real y Precios:**
   - `pib-real`: PIB real (Índice 2012=100, 2019–2036, Tabla 27).
   - `crecimiento-real`: Variación real anual del PIB (%, 2019–2036, Tabla 27).
   - `pib-no-petrolero`: PIB real no hidrocarburos (Índice 2012=100, 2019–2036, Tabla 27).
   - `pib-por-habitante`: PIB por habitante en USD corrientes (2019–2036, Tabla 27).
   - `pib-nominal`: PIB nominal en miles de millones USD (2019–2036, Tabla 27).
   - `inflacion-cierre`: Inflación fin de período a diciembre (%, 2025–2036, Tabla 27).
   - `inflacion-interanual`: Variación interanual mensual del INPC (%, sep 2025–ago 2026, Tabla 25).
2. **Deuda Pública (Cierre 2025):**
   - `deuda-tipo`: Pasivos por tipo de acreencia (USD millones, Tabla 3).
   - `deuda-emisor`: Pasivos por entidad deudora emisora (USD millones, Tabla 3).
   - `eurobonos`: Desglose entre principal e intereses vencidos / PDI (USD millones, Tabla 3).
   - `deuda-multilateral`: Desglose por organismo multilateral (USD millones, Tabla 14).
3. **Sector Petrolero y Gas:**
   - `produccion-crudo`: Producción petrolera total en mbd (2019–2036, Tabla 27).
   - `cesta-venezolana`: Precio promedio de exportación en USD/barril (2019–2036, Tabla 27).
   - `gas-comercializable`: Producción de gas comercializable en MMCF/d (2019–2036, Tabla 27).
   - `gas-interno`: Gas destinado al mercado interno en MMCF/d (2026–2036, Tabla 32).
   - `refinados`: Producción de productos refinados en mbd (2026–2036, Tabla 32).
   - `inversion-petrolera`: Capex bruto del sector petrolero en miles de millones USD (2026–2036, Tabla 32).
   - `crudo-contratos`: Producción bajo contratos de participación (CPP) y licencias (2026–2036, Tabla 32).
4. **Finanzas Públicas:**
   - `saldo-publico`: Saldo primario del sector público no financiero en % PIB (2021–2036, Tabla 29).
   - `saldo-central`: Saldo primario del gobierno central en % PIB (2021–2036, Tabla 29).
   - `ingreso-no-petrolero`: Ingresos distintos de hidrocarburos en % PIB (2021–2036, Tabla 29).
   - `inversion-publica`: Gasto de inversión pública en % PIB (2021–2036, Tabla 29).
   - `saldo-publico-dolares`: Saldo primario del sector público en miles de millones USD eq. (2021–2036, Tabla 28).
   - `remuneraciones`: Sueldos y salarios del gobierno central en % PIB (2021–2036, Tabla 29).
   - `pensiones`: Gasto en pensiones del gobierno central en % PIB (2021–2036, Tabla 29).
5. **Sector Productivo y Social:**
   - `minas-oro`: Minas de oro documentadas según estado operativo (2025, párr. 127).
   - `manufactura-privada`: Estructura sectorial de la industria privada (III Trimestre 2026, Tabla 9).
   - `cobertura-movil`: Cobertura poblacional de red móvil (2017 y 2025, párr. 142).
   - `peso-sectorial`: Participación de agricultura, telecomunicaciones y finanzas en el PIB (I Trimestre 2026, párrs. 130 y 140–143).
   - `empleo-formal`: Tasa de formalidad laboral en tres cortes (2012, 2016 y 2023, párr. 102).
   - `cobertura-educativa`: Cobertura de población de 3 a 24 años (2014–2025, Figura 3, ENCOVI).
   - `esperanza-vida`: Esperanza de vida al nacer en años (2012–2024, Tabla 5, Banco Mundial).
6. **Sector Externo y Umbrales:**
   - `exportaciones`: Exportaciones de bienes en miles de millones USD (2019–2036, Tabla 30).
   - `saldo-comercial-no-petrolero`: Balanza comercial sin hidrocarburos (2019–2036, Tabla 30).
   - `inversion-extranjera`: Inversión extranjera directa neta en miles de millones USD (2019–2036, Tabla 30).
   - `reservas`: Reservas internacionales brutas en millones USD (2016–julio 2026, Tabla 23).
   - `cuenta-corriente-ajustada`: Cuenta corriente sin intereses ajustada por IED petrolera en % PIB (2026–2036, Tabla 31).
   - `brent`: Precio Brent supuesto en el escenario oficial (2026–2036, Tabla 32).
   - `brent-equilibrio`: Precio Brent de equilibrio fiscal primario (2026–2036, Tabla 29).
   - `brecha-brent`: Diferencial aritmético editorial entre precio supuesto y umbral primario (2026–2036).

---

## 5. Delimitación Metodológica y Renuncias Científicas (Documento III)

En estricta observancia de los principios de transparencia y rigor del *Documento III (Renuncias Científicas)*:

1. **Trazabilidad Absoluta:** No se han realizado imputaciones arbitrarias, interpolaciones no fundamentadas ni ajustes sobre las series del documento original. Cada observación está clasificada unívocamente como `histórico` (2019–2024 o fuentes cerradas), `estimación oficial` (cierre 2025), `proyección oficial` (trayectoria 2026–2036 del programa) o `cálculo propio` (diferencia aritmética explícita de la brecha Brent).
2. **Naturaleza del Simulador MISRE:** El *Laboratorio MISRE 2036* no es un modelo econométrico estocástico de predicción ni contiene regresiones dinámicas no documentadas. Es una herramienta de análisis de sensibilidad aritmética que permite al usuario verificar interactivamente las tres relaciones estáticas formuladas en la *Memoria Técnica*: la razón de pasivos a saldo fijo sobre el PIB nominal, la escala matemática de facturación bruta por barril vendido y el margen frente al precio de equilibrio fiscal primario.
3. **Líneas de Investigación Abiertas:** Conforme se estipula en la *Memoria Científica*, la estimación formal mediante vectores autorregresivos bayesianos (BVAR) y el análisis de distribución probabilística de riesgos (simulaciones Monte Carlo) corresponden a etapas posteriores condicionadas a la disponibilidad de series temporales de alta frecuencia conciliadas entre el Banco Central de Venezuela, PDVSA y fuentes internacionales independientes (OPEP, AIE, JODI).

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
