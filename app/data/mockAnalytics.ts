export const mockVisualizationData = {
  environmental: {
    energyConsumption: [
      { year: 2022, total: 1500, renewable: 500, nonRenewable: 1000 },
      { year: 2023, total: 1600, renewable: 800, nonRenewable: 800 },
    ],
    gridElectricity: [
      { year: 2022, percentage: 75 },
      { year: 2023, percentage: 75 },
    ],
    emissions: [
      { year: 2022, scope1: 500, scope2: 750, scope3: 200 },
      { year: 2023, scope1: 450, scope2: 700, scope3: 180 },
    ],
    considerations: [
      { text: "Carbon Reduction", value: 30 },
      { text: "Renewable Energy", value: 25 },
      { text: "Waste Management", value: 20 },
      { text: "Water Conservation", value: 15 },
    ],
  },
  dataSecurity: {
    userInfo: [
      { year: 2022, users: 1000, breaches: 5, losses: 50000 },
      { year: 2023, users: 1200, breaches: 3, losses: 30000 },
    ],
  },
  disruptions: {
    services: [
      { type: "Network", count: 5, impact: 8 },
      { type: "Database", count: 3, impact: 7 },
      { type: "API", count: 2, impact: 5 },
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
