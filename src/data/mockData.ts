import type { LLMModel, MetricInfo } from '../types';

const raw: Omit<LLMModel, 'averageScore'>[] = [
  {
    id: 'gpt4',
    name: 'GPT-4o',
    provider: 'OpenAI',
    color: '#10a37f',
    metrics: {
      factuality: 88,
      noRussianisms: 72,
      literaryStyle: 85,
      generationSpeed: 64,
    },
  },
  {
    id: 'gemini',
    name: 'Gemini 1.5 Pro',
    provider: 'Google DeepMind',
    color: '#d97706',
    metrics: {
      factuality: 91,
      noRussianisms: 89,
      literaryStyle: 93,
      generationSpeed: 71,
    },
  },
  {
    id: 'llama3',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    color: '#2563eb',
    metrics: {
      factuality: 76,
      noRussianisms: 61,
      literaryStyle: 70,
      generationSpeed: 88,
    },
  },
  {
    id: 'mistral',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    color: '#7c3aed',
    metrics: {
      factuality: 82,
      noRussianisms: 68,
      literaryStyle: 79,
      generationSpeed: 83,
    },
  },
];

export const models: LLMModel[] = raw.map(m => ({
  ...m,
  averageScore: Math.round(
    (m.metrics.factuality +
      m.metrics.noRussianisms +
      m.metrics.literaryStyle +
      m.metrics.generationSpeed) /
      4,
  ),
}));

export const metricInfoList: MetricInfo[] = [
  {
    key: 'factuality',
    label: 'Фактологія',
    shortLabel: 'Фактологія',
    description: 'Точність фактичних тверджень у відповідях',
  },
  {
    key: 'noRussianisms',
    label: 'Відсутність русизмів',
    shortLabel: 'Без русизмів',
    description: 'Чистота мови від небажаних запозичень',
  },
  {
    key: 'literaryStyle',
    label: 'Літературна стилізація',
    shortLabel: 'Літ. стилізація',
    description: 'Якість та стилістична відповідність тексту',
  },
  {
    key: 'generationSpeed',
    label: 'Швидкість генерації',
    shortLabel: 'Швидкість',
    description: 'Нормалізована швидкість отримання відповіді',
  },
];
