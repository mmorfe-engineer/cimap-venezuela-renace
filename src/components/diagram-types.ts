export interface DiagramData {
  id: string;
  chapter: number;
  title: string;
  layout: string;
  period: string;
  source: string;
  treatment: string;
  unit: string;
  legend: string;
  interpretation: string;
  implication: string;
  anchor?: string;
  columns?: string[];
  steps?: { key: string; name: string; text: string }[];
  rows?: { left: string; right: string }[];
  risks?: { name: string; probability: string; impact: string[]; response: string }[];
}
