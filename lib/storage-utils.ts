import { QuestionPlugin } from "@/types/plugin";

const STORAGE_KEYS = {
  ANSWERS: "greenlit-answers",
  INSTALLED_PLUGINS: "greenlit-plugins",
} as const;

export function saveAnswers(answers: Record<string, any>) {
  try {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  } catch (error) {
    console.error("Failed to save answers:", error);
  }
}

export function loadAnswers(): Record<string, any> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Failed to load answers:", error);
    return {};
  }
}

export function saveInstalledPlugins(plugins: QuestionPlugin[]) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.INSTALLED_PLUGINS,
      JSON.stringify(plugins)
    );
  } catch (error) {
    console.error("Failed to save installed plugins:", error);
  }
}

export function loadInstalledPlugins(): QuestionPlugin[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.INSTALLED_PLUGINS);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load installed plugins:", error);
    return [];
  }
}
