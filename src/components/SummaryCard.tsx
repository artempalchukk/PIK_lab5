import type { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  accentClass: string;
}

export function SummaryCard({ title, value, subtitle, icon, accentClass }: SummaryCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${accentClass}`}>
        {icon}
      </div>
      <div className="mt-3 space-y-0.5">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight truncate" title={value}>
          {value}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
