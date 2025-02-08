import { Question as PluginQuestion, QuestionPlugin } from "@/types/plugin";
import { Question, Category } from "@/types/types";

export function convertPluginToCategory(plugin: QuestionPlugin): Category {
  return {
    title: plugin.name,
    questions: plugin.questions.map(
      (q: PluginQuestion): Question => ({
        id: q.id,
        text: q.text,
        type: q.type,
        unit: q.unit,
        code: q.code,
      })
    ),
  };
}
