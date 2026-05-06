import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { LLMModel } from '../types';
import { metricInfoList } from '../data/mockData';

interface MetricsChartProps {
  models: LLMModel[];
  isDark: boolean;
}

export function MetricsChart({ models, isDark }: MetricsChartProps) {
  const data = metricInfoList.map(metric => {
    const entry: Record<string, string | number> = {
      metric: metric.shortLabel,
    };
    models.forEach(model => {
      entry[model.id] = model.metrics[metric.key];
    });
    return entry;
  });

  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const gridColor = isDark ? '#1f2937' : '#f3f4f6';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Горизонтальне порівняння метрик
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Бали всіх моделей за кожною метрикою оцінювання (шкала 0–100)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 4, right: 20, left: 0, bottom: 4 }}
          barCategoryGap="28%"
          barGap={3}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: textColor }}
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />
          <YAxis
            type="category"
            dataKey="metric"
            tick={{ fontSize: 12, fill: textColor }}
            axisLine={false}
            tickLine={false}
            width={120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#111827' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: '13px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            }}
            labelStyle={{ fontWeight: 600, marginBottom: '6px' }}
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '14px', color: textColor }}
          />
          {models.map(model => (
            <Bar
              key={model.id}
              dataKey={model.id}
              name={model.name}
              fill={model.color}
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
