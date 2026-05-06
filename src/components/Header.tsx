import { Moon, Sun, BarChart3 } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggle: () => void;
}

export function Header({ isDark, onToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white shadow-sm">
            <BarChart3 size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              Оцінювання мовних моделей
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
              Аналіз якості відповідей українською мовою
            </p>
          </div>
        </div>

        <button
          onClick={onToggle}
          aria-label="Перемкнути тему"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
            text-gray-600 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800
            active:scale-95
            transition-all duration-150"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden sm:inline">
            {isDark ? 'Світла тема' : 'Темна тема'}
          </span>
        </button>
      </div>
    </header>
  );
}
