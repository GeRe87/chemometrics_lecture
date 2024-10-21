const ctx3 = document.getElementById('chart_uniformDistribution2').getContext('2d');
const data2 = generateData_uniform(999, 30);
const chart3 = createScatterChart(ctx3, data2, '#DE3163', 'Average Dice Roll Value (n=30)');
adjustYLimits(chart3, 0, 7);

const ctx4 = document.getElementById('chart_uniformDistribution2_histogram').getContext('2d');
const chart4 = createHistogramChart(ctx4, data2, 20, '#DE3163', 'Frequency of Dice Roll Value');