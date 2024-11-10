// Example data
const data = [
    { x: 1, y: 2.3 },
    { x: 2, y: 2.7 },
    { x: 3, y: 1.9 },
    { x: 4, y: 2.1 },
    { x: 5, y: 2.5 }
];

// Call the function to create the line chart with markers enabled
createXYLineChart("chart_distance1", data, "x", "y", true, true);