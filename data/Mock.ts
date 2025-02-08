import { Category } from "@/types/types";

export const categories: Record<string, Category> = {
  "Safety of Clinical Trial Participants": {
    title: "Clinical Trial Safety",
    questions: [
      {
        id: "inspections",
        text: "Number of inspections related to clinical trial management",
        type: "number",
        unit: "Number",
        code: "HC-BP-210a.2",
      },
      {
        id: "monetary_losses",
        text: "Total amount of monetary losses due to legal proceedings related to clinical trials",
        type: "number",
        unit: "Currency",
        code: "HC-BP-210a.3",
      },
      {
        id: "management_process",
        text: "Discussion of management process to ensure quality and patient safety during clinical trials",
        type: "text",
        unit: "n/a",
        code: "HC-BP-210a.1",
      },
    ],
  },
  "Affordability & Pricing": {
    title: "Pricing Metrics",
    questions: [
      {
        id: "list_price_change",
        text: "Percentage change in weighted average list price",
        type: "percentage",
        unit: "Percentage",
        code: "HC-BP-240b.2",
      },
      {
        id: "net_price_change",
        text: "Percentage change in weighted average net price",
        type: "percentage",
        unit: "Percentage",
        code: "HC-BP-240b.2",
      },
    ],
  },
  "Drug Safety": {
    title: "Product Safety",
    questions: [
      {
        id: "fatalities",
        text: "Number of fatalities associated with products",
        type: "number",
        unit: "Number",
        code: "HC-BP-250a.2",
      },
      {
        id: "recalls_count",
        text: "Number of recalls issued",
        type: "number",
        unit: "Number",
        code: "HC-BP-250a.3",
      },
      {
        id: "units_recalled",
        text: "Total units recalled",
        type: "number",
        unit: "Number",
        code: "HC-BP-250a.3",
      },
    ],
  },
  "Counterfeit Drugs": {
    title: "Anti-Counterfeiting Measures",
    questions: [
      {
        id: "enforcement_actions",
        text: "Number of actions that led to raids, seizure, arrests, or filing of criminal charges",
        type: "number",
        unit: "Number",
        code: "HC-BP-260a.3",
      },
      {
        id: "traceability_methods",
        text: "Description of methods and technologies used to maintain traceability of products throughout the supply chain",
        type: "text",
        unit: "n/a",
        code: "HC-BP-260a.1",
      },
    ],
  },
  "Employee Recruitment, Development & Retention": {
    title: "Employee Metrics",
    questions: [
      {
        id: "voluntary_turnover",
        text: "Voluntary turnover rate for executive managers",
        type: "percentage",
        unit: "Percentage",
        code: "HC-BP-330a.2",
      },
      {
        id: "involuntary_turnover",
        text: "Involuntary turnover rate for executive managers",
        type: "percentage",
        unit: "Percentage",
        code: "HC-BP-330a.2",
      },
    ],
  },
};

export const boxes = [
  {
    id: 1,
    title: "Onboarding",
    description: "Evaluate clinical trial safety and management processes",
    category: "Safety of Clinical Trial Participants",
  },
  {
    id: 2,
    title: "Emission History",
    description: "Assess pricing strategies and affordability metrics",
    category: "Affordability & Pricing",
  },
  {
    id: 3,
    title: "ISO",
    description: "Monitor product safety and anti-counterfeiting measures",
    category: "Drug Safety",
  },
];
