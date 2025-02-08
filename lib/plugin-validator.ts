import { QuestionPlugin, Question } from "@/types/plugin";

export function validatePlugin(plugin: QuestionPlugin): string[] {
  const errors: string[] = [];

  // Required fields
  const requiredFields = [
    "id",
    "name",
    "version",
    "standard",
    "category",
    "questions",
  ];
  requiredFields.forEach((field) => {
    if (!plugin[field as keyof QuestionPlugin]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Version format (semver)
  if (!/^\d+\.\d+\.\d+$/.test(plugin.version)) {
    errors.push("Invalid version format. Must be semver (e.g., 1.0.0)");
  }

  // Questions validation
  if (Array.isArray(plugin.questions)) {
    plugin.questions.forEach((question: Question, index) => {
      const questionErrors = validateQuestion(question);
      if (questionErrors.length > 0) {
        errors.push(`Question ${index + 1}: ${questionErrors.join(", ")}`);
      }
    });
  } else {
    errors.push("Questions must be an array");
  }

  return errors;
}

function validateQuestion(question: Question): string[] {
  const errors: string[] = [];

  // Required fields
  const requiredFields = ["id", "text", "type", "unit", "code"];
  requiredFields.forEach((field) => {
    if (!question[field as keyof Question]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Type validation
  if (!["number", "percentage", "text"].includes(question.type)) {
    errors.push("Invalid question type");
  }

  // Validation rules
  if (question.validation) {
    if (question.type === "percentage") {
      if (question.validation.max && question.validation.max > 100) {
        errors.push("Percentage cannot exceed 100");
      }
      if (question.validation.min && question.validation.min < 0) {
        errors.push("Percentage cannot be negative");
      }
    }
  }

  return errors;
}
