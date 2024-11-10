// Example data to call the function
const dataBar2 = [
    { sample: 1, Fe: 2.3, Cu: 1.2, Zn: 0.5, Mn: 0.2 },
    { sample: 2, Fe: 2.7, Cu: 1.1, Zn: 0.4, Mn: 0.3 },
    { sample: 3, Fe: 1.9, Cu: 1.3, Zn: 0.6, Mn: 0.1 },
    { sample: 4, Fe: 2.1, Cu: 1.0, Zn: 0.3, Mn: 0.4 },
    { sample: 5, Fe: 2.5, Cu: 1.4, Zn: 0.7, Mn: 0.5 }
];

// Call the function to create the chart in chart_bar02 container
createGroupedBarChart("chart_bar02", dataBar2, "sample", "concentration");