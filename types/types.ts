export interface Question {
  id: string;
  text: string;
  type: "number" | "text" | "percentage" | "boolean";
  unit: string;
  code: string;
}

export interface Category {
  title: string;
  questions: Question[];
}
