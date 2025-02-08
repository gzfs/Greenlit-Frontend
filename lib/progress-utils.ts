import { Category } from "@/types/types";
import { QuestionPlugin } from "@/types/plugin";

export interface CategoryProgress {
  total: number;
  answered: number;
  percentage: number;
}

export interface ProgressData {
  [key: string]: CategoryProgress;
}

export function calculateProgress(
  categories: Record<string, Category>,
  plugins: QuestionPlugin[],
  answers: Record<string, any>
) {
  const progress: ProgressData = {};
  const answeredQuestions = new Set(Object.keys(answers));

  // Calculate built-in categories progress
  Object.entries(categories).forEach(([key, category]) => {
    const total = category.questions.length;
    const answered = category.questions.filter((q) =>
      answeredQuestions.has(q.id)
    ).length;
    progress[key] = {
      total,
      answered,
      percentage: (answered / total) * 100,
    };
  });

  // Calculate plugin categories progress
  plugins.forEach((plugin) => {
    const total = plugin.questions.length;
    const answered = plugin.questions.filter((q) =>
      answeredQuestions.has(q.id)
    ).length;
    progress[plugin.standard] = progress[plugin.standard] || {
      total: 0,
      answered: 0,
      percentage: 0,
    };
    progress[plugin.standard].total += total;
    progress[plugin.standard].answered += answered;
    progress[plugin.standard].percentage =
      (progress[plugin.standard].answered / progress[plugin.standard].total) *
      100;
  });

  return progress;
}

export function getTotalProgress(progressData: ProgressData): number {
  const totals = Object.values(progressData).reduce(
    (acc, curr) => ({
      total: acc.total + curr.total,
      answered: acc.answered + curr.answered,
    }),
    { total: 0, answered: 0 }
  );

  return totals.total > 0 ? (totals.answered / totals.total) * 100 : 0;
}
