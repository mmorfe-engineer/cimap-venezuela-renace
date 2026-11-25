import chapters from '../data/chapters.json';
import series from '../data/series.json';
export { chapters, series };
export const root = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const chapterUrl = (id: number) => root + 'capitulos/' + chapters.find(c => c.id === id)!.slug + '/';
export const num = (n: number) => String(n).padStart(2, '0');
export const format = (n:number, places = 2) => new Intl.NumberFormat('es-VE',{maximumFractionDigits:places}).format(n);
export const normalize = (s:string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export type ChartSeries = typeof series[number];
