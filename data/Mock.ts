import { Category } from "@/types/types";

export const categories: Record<string, Category> = {
  "Environmental Footprint": {
    title: "Environmental Impact",
    questions: [
      {
        id: "total_energy",
        text: "Total energy consumed",
        type: "number",
        unit: "Gigajoules (GJ)",
        code: "TC-SI-130a.1",
      },
      {
        id: "grid_electricity",
        text: "Percentage of total energy from grid electricity",
        type: "percentage",
        unit: "Percentage (%)",
        code: "TC-SI-130a.1",
      },
      {
        id: "environmental_planning",
        text: "Discussion of the integration of environmental considerations into strategic planning for data centre needs",
        type: "text",
        unit: "n/a",
        code: "TC-SI-130a.3",
      },
    ],
  },
  "Data Privacy & Security": {
    title: "Privacy Metrics",
    questions: [
      {
        id: "secondary_users",
        text: "Number of users whose information is used for secondary purposes",
        type: "number",
        unit: "Number",
        code: "TC-SI-220a.2",
      },
      {
        id: "privacy_losses",
        text: "Total amount of monetary losses due to legal proceedings associated with user privacy",
        type: "number",
        unit: "Currency",
        code: "TC-SI-220a.3",
      },
      {
        id: "data_breaches",
        text: "Number of data breaches",
        type: "number",
        unit: "Number",
        code: "TC-SI-230a.1",
      },
      {
        id: "affected_users",
        text: "Number of users affected by data breaches",
        type: "number",
        unit: "Number",
        code: "TC-SI-230a.1",
      },
    ],
  },
  "Technology Disruptions": {
    title: "Service Reliability",
    questions: [
      {
        id: "service_disruptions",
        text: "Number of service disruptions",
        type: "number",
        unit: "Number",
        code: "TC-SI-550a.1",
      },
      {
        id: "customer_downtime",
        text: "Total customer downtime",
        type: "number",
        unit: "Days",
        code: "TC-SI-550a.1",
      },
      {
        id: "continuity_risks",
        text: "Description of business continuity risks related to disruptions of operations",
        type: "text",
        unit: "n/a",
        code: "TC-SI-550a.2",
      },
    ],
  },
};

export const boxes = [
  {
    id: 1,
    title: "Environmental Impact",
    description: "Evaluate energy consumption and environmental planning",
    category: "Environmental Footprint",
  },
  {
    id: 2,
    title: "Data Protection",
    description: "Assess privacy measures and security incidents",
    category: "Data Privacy & Security",
  },
  {
    id: 3,
    title: "Service Reliability",
    description: "Monitor system uptime and business continuity",
    category: "Technology Disruptions",
  },
];
