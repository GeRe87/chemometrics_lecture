// Example data
const data0 = [
    { x: 1, y: 2 },
    { x: 3, y: 4 }
];

const data1 = [
    { x: 1, y: 2 },
    { x: 1.2, y: 2},
    { x: 1.5, y: 2},
    { x: 2, y: 2 },
    { x: 2.5, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 2.5 },
    { x: 3, y: 3 },
    { x: 3, y: 3.5 },
    { x: 3, y: 4 }
];

// Call the function to create the line chart with markers enabled
createXYLineChart("chart_distance0", data0, "x", "y", "x", "y",  false, true, true, 0, 4, 0, 5);
const chart_scales1 = createXYLineChart("chart_distance1", data0, "x", "y", "x", "y",  false, true, true, 0, 4, 0, 5);
addPlotSeries("chart_distance1", data1, chart_scales1.xScale, chart_scales1.yScale, "x", "y", "black", "#ef476f", true, false);

createXYLineChart("chart_distance2", data0, "x", "y", "x", "y",  false, true, true, 0, 4, 0, 5);
addPlotSeries("chart_distance2", data0, chart_scales1.xScale, chart_scales1.yScale, "x", "y", "black", "#ef476f", true, false);