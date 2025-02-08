export interface QuestionPlugin {
  id: string;
  name: string;
  version: string;
  standard: string;
  description: string;
  category: string;
  questions: Question[];
  metadata: {
    author: string;
    website: string;
  };
}

export interface Question {
  id: string;
  text: string;
  type: "number" | "text" | "percentage" | "boolean";
  unit: string;
  code: string;
  validation?: {
    min?: number;
    max?: number;
  };
}
