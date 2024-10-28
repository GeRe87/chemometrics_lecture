function generateTDistributionData(df, numPoints) {
  const data = [];
  const minX = -6;
  const maxX = 6;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      data.push({x: x, y: tDistributionPDF(x, df)});
  }
  return data;
}

// gnereate experimental t value
const data_tTest = [{x: -3.16, y: 0}, {x: -3.16, y: 0.45}];

// generate data for t-distribution alpha value
const data_tAlpha_left = [];
const data_tAlpha_right = [];

// generate data for t-distribution
const data_t = [];
const minX = -6;
const maxX = 6;
const step = (maxX - minX) / 100;
for (let x = minX; x <= maxX; x += step) {
    data_t.push({x: x, y: tDistributionPDF(x, 10-1)});
}
const ctxTtestOneSided = document.getElementById('chart_tTest_oneSided').getContext('2d');
const chartTtestOneSided = createLineChart(ctxTtestOneSided, data_t, '#DE3163', 't-Distribution');
addDataLineFilled(chartTtestOneSided, data_tTest, '#00C4D4', 'Experimental t-Value');
addDataLine(chartTtestOneSided, data_tAlpha_left, '#FFA500', 't-critical Value');
addDataLine(chartTtestOneSided, data_tAlpha_right, '#FFA500', 't-critical Value');


function calculateTValue() {
  const sampleMean = parseFloat(document.getElementById('sampleMean').value);
  const sampleStd = parseFloat(document.getElementById('sampleStd').value);
  const sampleSize = parseInt(document.getElementById('sampleSize').value);
  const limitValue = 0.1; // mg/L

  const tValue = (sampleMean - limitValue) / (sampleStd / Math.sqrt(sampleSize));
  document.getElementById('tValueResult').innerText = `t-Value: ${tValue.toFixed(2)}`;

  // update t-distribution data
  const data_t = [];
  const minX = -6;
  const maxX = 6;
  const step = (maxX - minX) / 100;
  for (let x = minX; x <= maxX; x += step) {
      data_t.push({x: x, y: tDistributionPDF(x, sampleSize-1)});
  }

  const alphaValue = parseFloat(document.getElementById('alphaValue').value);
  const tAlpha = jStat.studentt.inv(1 - alphaValue, sampleSize-1);
  const data_tAlpha_left = [{x: -tAlpha, y: 0}, {x: -tAlpha, y: 0.45}];
  const data_tAlpha_right = [{x: tAlpha, y: 0}, {x: tAlpha, y: 0.45}];
  // update chart
  

  // update chart
  data_tTest[0].x = tValue;
  data_tTest[1].x = tValue;
  chartTtestOneSided.data.datasets[1].data = data_tTest;
  chartTtestOneSided.data.datasets[0].data = data_t;
  chartTtestOneSided.data.datasets[2].data = data_tAlpha_left;
  chartTtestOneSided.data.datasets[3].data = data_tAlpha_right;
  chartTtestOneSided.update();
}