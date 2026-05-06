import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { LLMModel, SortKey, SortDirection } from '../types';
import { metricInfoList } from '../data/mockData';

interface ModelTableProps {
  models: LLMModel[];
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2.5 min-w-[110px]">
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-6 text-right shrink-0 tabular-nums">
        {value}
      </span>
      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) return <ChevronsUpDown size={13} className="text-gray-400 shrink-0" />;
  return direction === 'asc'
    ? <ChevronUp size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
    : <ChevronDown size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />;
}

export function ModelTable({ models }: ModelTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('averageScore');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...models].sort((a, b) => {
    let aVal: number | string;
    let bVal: number | string;

    if (sortKey === 'name') {
      aVal = a.name;
      bVal = b.name;
    } else if (sortKey === 'averageScore') {
      aVal = a.averageScore;
      bVal = b.averageScore;
    } else {
      aVal = a.metrics[sortKey];
      bVal = b.metrics[sortKey];
    }

    if (typeof aVal === 'string') {
      return sortDir === 'asc'
        ? aVal.localeCompare(bVal as string, 'uk')
        : (bVal as string).localeCompare(aVal, 'uk');
    }
    return sortDir === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const HeaderCell = ({ label, colKey }: { label: string; colKey: SortKey }) => (
    <th className="px-4 py-3.5 text-left">
      <button
        onClick={() => handleSort(colKey)}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400
          uppercase tracking-wider whitespace-nowrap
          hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
      >
        {label}
        <SortIcon active={sortKey === colKey} direction={sortDir} />
      </button>
    </th>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40">
            <tr>
              <HeaderCell label="Модель" colKey="name" />
              {metricInfoList.map(m => (
                <HeaderCell key={m.key} label={m.shortLabel} colKey={m.key} />
              ))}
              <HeaderCell label="Середній бал" colKey="averageScore" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {sorted.map((model, index) => (
              <tr
                key={model.id}
                className={`
                  group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-100
                  ${index === 0 && sortKey !== 'name' ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''}
                `}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: model.color, ringColor: model.color }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white leading-tight">
                        {model.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {model.provider}
                      </p>
                    </div>
                    {index === 0 && sortKey !== 'name' && (
                      <span className="ml-1 text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        №1
                      </span>
                    )}
                  </div>
                </td>

                {metricInfoList.map(metric => (
                  <td key={metric.key} className="px-4 py-4">
                    <ScoreBar value={model.metrics[metric.key]} color={model.color} />
                  </td>
                ))}

                <td className="px-4 py-4">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full text-sm font-bold text-white shadow-sm"
                    style={{ backgroundColor: model.color }}
                  >
                    {model.averageScore}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
