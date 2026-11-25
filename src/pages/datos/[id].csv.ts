import type { APIRoute } from 'astro';
import series from '../../data/series.json';

export function getStaticPaths() {
  return series.map(s => ({
    params: { id: s.id },
    props: { entry: s }
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { entry } = props as { entry: typeof series[number] };

  const escapeCsv = (val: string | number | null | undefined) => {
    if (val == null) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = [
    ['Periodo_o_Categoria', 'Valor', 'Unidad', 'Naturaleza', 'Fuente', 'Titulo'].map(escapeCsv).join(',')
  ];

  for (const point of entry.points) {
    const kind = ('kind' in point && point.kind) || entry.kind;
    rows.push([
      escapeCsv(point.label),
      escapeCsv(point.value),
      escapeCsv(entry.unit),
      escapeCsv(kind),
      escapeCsv(entry.source),
      escapeCsv(entry.title)
    ].join(','));
  }

  const csvContent = '\uFEFF' + rows.join('\r\n');

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${entry.id}.csv"`
    }
  });
};
