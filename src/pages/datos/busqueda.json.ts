import type { APIRoute } from 'astro';
import chapters from '../../data/chapters.json';
import series from '../../data/series.json';
import agenda from '../../data/agenda.json';
import diagrams from '../../data/diagrams.json';
import references from '../../data/references.json';
import { chapterUrl } from '../../lib/edition';

export const GET: APIRoute = () => {
  const hits: Array<{ title: string; text: string; url: string; group: string }> = [];

  for (const c of chapters) {
    hits.push({
      group: 'Capítulo ' + String(c.id).padStart(2, '0'),
      title: c.title,
      text: `${c.kicker} · ${c.lead} · ${c.takeaway} · ${c.sections.map(s => s.title + ' ' + s.text).join(' ')}`,
      url: chapterUrl(c.id)
    });
  }

  for (const a of agenda) {
    hits.push({
      group: 'Agenda legislativa',
      title: a.title,
      text: `${a.status} · ${a.phase} · ${a.pillar} · ${a.instrument} · ${a.detail} · ${a.dependency}`,
      url: `${chapterUrl(2)}#ficha-${a.id}`
    });
  }

  for (const s of series) {
    hits.push({
      group: 'Serie estadística',
      title: s.title,
      text: `${s.unit} · ${s.period} · ${s.source} · ${s.kind} · ${s.interpretation} · ${s.implication}`,
      url: `${chapterUrl(s.chapter)}#serie-${s.id}`
    });
  }

  for (const d of diagrams) {
    hits.push({
      group: 'Diagrama analítico',
      title: d.title,
      text: `${d.treatment} · ${d.unit} · ${d.period} · ${d.interpretation} · ${d.implication}`,
      url: `${chapterUrl(d.chapter)}#${d.id}`
    });
  }

  for (const r of references) {
    hits.push({
      group: 'Biblioteca · ' + r.category,
      title: r.category,
      text: r.text,
      url: chapterUrl(12)
    });
  }

  return new Response(JSON.stringify(hits), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
};
