export const mockVisualizationData = {
  environmental: {
    energyConsumption: [
      { year: 2020, total: 1200, renewable: 300, nonRenewable: 900 },
      { year: 2021, total: 1100, renewable: 400, nonRenewable: 700 },
      { year: 2022, total: 1000, renewable: 500, nonRenewable: 500 },
      { year: 2023, total: 900, renewable: 600, nonRenewable: 300 },
    ],
    gridElectricity: [
      { year: 2020, percentage: 60 },
      { year: 2021, percentage: 65 },
      { year: 2022, percentage: 70 },
      { year: 2023, percentage: 75 },
    ],
    emissions: [
      { year: 2020, scope1: 500, scope2: 300, scope3: 200 },
      { year: 2021, scope1: 450, scope2: 280, scope3: 180 },
      { year: 2022, scope1: 400, scope2: 250, scope3: 150 },
      { year: 2023, scope1: 350, scope2: 220, scope3: 130 },
    ],
    considerations: [
      { text: "Renewable Energy", value: 80 },
      { text: "Waste Reduction", value: 65 },
      { text: "Water Conservation", value: 55 },
      { text: "Carbon Footprint", value: 90 },
      { text: "Biodiversity", value: 45 },
    ],
  },
  dataSecurity: {
    userInfo: [
      { year: 2020, users: 10000, breaches: 5, losses: 50000 },
      { year: 2021, users: 15000, breaches: 3, losses: 30000 },
      { year: 2022, users: 20000, breaches: 2, losses: 20000 },
      { year: 2023, users: 25000, breaches: 1, losses: 10000 },
    ],
    breachHeatmap: [
      { month: "Jan", year: 2023, count: 1 },
      { month: "Feb", year: 2023, count: 0 },
      { month: "Mar", year: 2023, count: 2 },
      { month: "Apr", year: 2023, count: 0 },
    ],
  },
  disruptions: {
    services: [
      { type: "Network", count: 5, impact: 3 },
      { type: "Database", count: 3, impact: 4 },
      { type: "API", count: 2, impact: 2 },
      { type: "Storage", count: 1, impact: 1 },
    ],
    downtime: [
      { start: "2023-01-01", end: "2023-01-02", description: "Network outage" },
      {
        start: "2023-03-15",
        end: "2023-03-16",
        description: "Database maintenance",
      },
    ],
  },
  comparative: {
    "Gross global Scope 3 emissions - Business travel": [180, 220],
    "Gross global Scope 2 emissions": [720, 680],
    "Gross global Scope 1 emissions": [480, 450],
    "Total energy consumed": [1400, 1600],
    "Percentage of total energy from grid electricity": [70, 80],
    "Number of service disruptions": [3, 1],
    "Water consumption": [5000, 4500],
    "Waste recycled": [45, 60],
    "Employee satisfaction": [75, 82],
    "Community investment": [200000, 250000],
  },
};
