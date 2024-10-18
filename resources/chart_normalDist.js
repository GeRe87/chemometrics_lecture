// Generiere Datenpunkte für die Normalverteilung
function generateGaussianData(mean, sigma, numPoints) {
  const data = [];
  const minX = mean - 6 * sigma;
  const maxX = mean + 6 * sigma;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      data.push({x: x, y:gaussianPDF(x, mean, sigma)});
  }
  return data;
}

function generateGaussianCDFData(mean, sigma, numPoints) {
  const data = [];
  const minX = mean - 6 * sigma;
  const maxX = mean + 6 * sigma;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      data.push({x: x, y: gaussianCDF(x, mean, sigma)});
  }
  return data;
}

// Daten für Normalverteilung generieren
const gaussianData = generateGaussianData(0, 1, 100);
const gaussianCDFData = generateGaussianCDFData(0, 1, 100);

// get some extrat from gaussianData from index 60 to 70
const gaussianDataExtra = gaussianData.slice(60, 70);
// create data for horizontal line x: between 0 and gaussianDataExtra(0).x and y: gaussianDataCDF(60)
const horizontalLineData1 = [{x: gaussianData[0].x, y: gaussianCDFData[60].y}, {x: gaussianDataExtra[0].x, y: gaussianCDFData[60].y}];
const horizontalLineData2 = [{x: gaussianData[0].x, y: gaussianCDFData[70].y}, {x: gaussianDataExtra[9].x, y: gaussianCDFData[70].y}];

// Chart für Normalverteilung erstellen
const ctx5 = document.getElementById('chart_normalDist_1').getContext('2d');
const chart5 = createLineChart(ctx5, gaussianData, '#DE3163', 'Normal Distribution PDF');
addDataLine(chart5, gaussianCDFData, '#00C4D4', 'Normal Distribution CDF');

const ctx6 = document.getElementById('chart_normalDist_2').getContext('2d');
const chart6 = createLineChart(ctx6, gaussianCDFData, '#00C4D4', 'Normal Distribution CDF');
addDataLine(chart6, gaussianData, '#DE3163', 'Normal Distribution PDF');
addDataLine(chart6, horizontalLineData1, '#00C4D480', 'Probability of x up to x1');
addDataLine(chart6, horizontalLineData2, '#00C4D480', 'Probability of x up to x2');
addDataLineFilled(chart6, gaussianDataExtra, '#DE316380', 'Probability of x in Interval');
