// Generate Chi-Square distribution data points
function generateChiSquareData(df, numPoints) {
  const data = [];
  const minX = 0; // Chi-Square starts at 0
  const maxX = 6 * df; // Adjust x range depending on df to display appropriately
  const step = maxX / numPoints;

  for (let x = minX; x <= maxX; x += step) {
    data.push({ x: x, y: chiSquarePDF(x, df) });
  }
  return data;
}

const ctxChi = document.getElementById('chart_chiSquare').getContext('2d');
// Create an initial Chi-Square chart with df = 2
const chiSquareData = generateChiSquareData(2, 100);
const chartChiSquare = createLineChart(ctxChi, chiSquareData, '#FF6347', 'Chi-Square Distribution (df = 2)');

// Function to update Chi-Square distribution based on slider
function updateChiSquare(df) {
  const newChiSquareData = generateChiSquareData(df, 100);  // Generate new data with updated df
  chartChiSquare.data.datasets[0].data = newChiSquareData;  // Update the chart data
  chartChiSquare.data.datasets[0].label = `Chi-Square Distribution (df = ${df})`;  // Update the label
  chartChiSquare.update();  // Update the chart
}

// Add slider event listener for dynamic updates
const dfSliderChi = document.getElementById('dfSliderChi');
const dfValueChi = document.getElementById('dfValueChi');

dfSliderChi.addEventListener('input', function() {
  const df = parseInt(this.value);
  dfValueChi.textContent = df;  // Show the current degrees of freedom
  updateChiSquare(df);  // Update the chart
});