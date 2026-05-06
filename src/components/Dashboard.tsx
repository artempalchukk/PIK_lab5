import { Trophy, BookCheck, ShieldCheck, Zap } from 'lucide-react';
import { models } from '../data/mockData';
import { SummaryCard } from './SummaryCard';
import { MetricsChart } from './MetricsChart';
import { ModelTable } from './ModelTable';

interface DashboardProps {
  isDark: boolean;
}

export function Dashboard({ isDark }: DashboardProps) {
  const byAvg = [...models].sort((a, b) => b.averageScore - a.averageScore);
  const byFact = [...models].sort((a, b) => b.metrics.factuality - a.metrics.factuality);
  const byPurity = [...models].sort((a, b) => b.metrics.noRussianisms - a.metrics.noRussianisms);
  const bySpeed = [...models].sort((a, b) => b.metrics.generationSpeed - a.metrics.generationSpeed);

  const summaryCards = [
    {
      title: 'Найкраща модель',
      value: byAvg[0].name,
      subtitle: `Середній бал: ${byAvg[0].averageScore} / 100`,
      icon: <Trophy size={18} className="text-white" />,
      accentClass: 'bg-amber-500',
    },
    {
      title: 'Лідер з фактології',
      value: byFact[0].name,
      subtitle: `Фактологія: ${byFact[0].metrics.factuality} / 100`,
      icon: <BookCheck size={18} className="text-white" />,
      accentClass: 'bg-blue-600',
    },
    {
      title: 'Найчистіша мова',
      value: byPurity[0].name,
      subtitle: `Без русизмів: ${byPurity[0].metrics.noRussianisms} / 100`,
      icon: <ShieldCheck size={18} className="text-white" />,
      accentClass: 'bg-emerald-500',
    },
    {
      title: 'Найшвидша генерація',
      value: bySpeed[0].name,
      subtitle: `Швидкість: ${bySpeed[0].metrics.generationSpeed} / 100`,
      icon: <Zap size={18} className="text-white" />,
      accentClass: 'bg-purple-600',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <section>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
          Загальні показники
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map(card => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
          Візуальне порівняння
        </p>
        <MetricsChart models={models} isDark={isDark} />
      </section>

      <section>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
          Детальні результати · Клікніть на заголовок колонки для сортування
        </p>
        <ModelTable models={models} />
      </section>
    </main>
  );
}
