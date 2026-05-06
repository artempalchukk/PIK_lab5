export interface ModelMetrics {
  factuality: number;
  noRussianisms: number;
  literaryStyle: number;
  generationSpeed: number;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  color: string;
  metrics: ModelMetrics;
  averageScore: number;
}

export type MetricKey = keyof ModelMetrics;

export interface MetricInfo {
  key: MetricKey;
  label: string;
  shortLabel: string;
  description: string;
}

export type SortKey = MetricKey | 'name' | 'averageScore';
export type SortDirection = 'asc' | 'desc';
