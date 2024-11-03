// Generiere Datenpunkte für die ECDF
const x = [32.4, 34.1, 34.3, 35.0, 35.1, 
  35.5, 35.9, 36.0, 36.1, 36.7, 
  36.7, 36.9, 36.9, 37.0, 37.0, 
  37.5, 37.8, 38.0, 38.1, 38.3, 
  38.4, 38.6, 38.7, 38.8, 39.8];

const mean_data = x.reduce((a, b) => a + b) / x.length;
const stdDev_data = Math.sqrt(x.map(value => Math.pow(value - mean_data, 2)).reduce((a, b) => a + b) / (x.length-1));

const x_min = mean_data - 3 * stdDev_data;
const x_max = mean_data + 3 * stdDev_data;
const dx = (x_max - x_min) / 200;
const x_cdf = Array.from({length: 200}, (_, i) => x_min + i * dx);
const y_cdf = x_cdf.map(value => gaussianCDF(value, mean_data, stdDev_data));
// merge x_cdf and y_cdf into a data set with x: and y: properties
const cdfData = x_cdf.map((value, index) => ({ x: value, y: y_cdf[index] }));
const ecfData = calcEcdf(x);

// use x to calculate the theoretical CDF values by using the gaussianCDF function
const y = x.map(value => gaussianCDF(value, mean_data, stdDev_data));
// merge x and y into a data set with x: and y: properties
const cdfData2 = x.map((value, index) => ({ x: value, y: y[index] }));
const D = x.map((value, index) => ({ x: value, y: Math.abs(ecfData[index].y - y[index]) }));


const ctxEcf1 = document.getElementById('chart_ecdf1').getContext('2d');
const chartEcf1 = createStairsChart(ctxEcf1, ecfData, '#DE3163', 'ECDF');
adjustYLimits(chartEcf1, -.1, 1.1);
adjustXLimits(chartEcf1, 32, 40);

const ctxEcf2 = document.getElementById('chart_ecdf2').getContext('2d');
const chartEcf2 = createStairsChart(ctxEcf2, ecfData, '#DE3163', 'ECDF');
adjustXLimits(chartEcf2, 32, 40);
adjustYLimits(chartEcf2, -.1, 1.1);
addDataStairs(chartEcf2, cdfData, '#6495ED', 'CDF');

const ctxEcf3 = document.getElementById('chart_ecdf3').getContext('2d');
const chartEcf3 = createStairsChart(ctxEcf3, ecfData, '#DE3163', 'ECDF');
adjustXLimits(chartEcf3, 32, 40);
adjustYLimits(chartEcf3, -.1, 1.1);
addDataStairs(chartEcf3, cdfData2, '#6495ED', 'CDF');
addDataStairs(chartEcf3, D, '#FFA500', 'Difference');


