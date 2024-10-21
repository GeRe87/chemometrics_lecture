// Function to generate kernel data based on mean and bandwidth (sigma)
function generateKernelData(mean, sigma, xmin, xmax, numPoints) {
  const data = [];
  const minX = xmin;
  const maxX = xmax;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      data.push({x: x, y: gaussianPDF(x, mean, sigma)});
  }
  return data;
}

// Raw data points
const data_kde_raw = generateData_uniform(15, 30);

// Set all x values to y values and y values to 0
data_kde_raw.forEach((point) => {
    point.x = point.y;
    point.y = 0;
});

// Create scatter chart for raw data
const ctxKDE1 = document.getElementById('chart_kde1').getContext('2d');
const chartKDE1 = createScatterChart(ctxKDE1, data_kde_raw, '#DE3163', 'Data');
adjustXLimits(chartKDE1, 2.5, 4.5);
chartKDE1.options.plugins.legend.display = false;

// Create chart for individual kernels
const ctxKDE2 = document.getElementById('chart_kde2').getContext('2d');
const chartKDE2 = createLineChart(ctxKDE2, data_kde_raw, '#DE3163', 'Data');
chartKDE2.data.datasets[0].radius = 3;
chartKDE2.data.datasets[0].backgroundColor = '#DE3163';
chartKDE2.data.datasets[0].showLine = false;
adjustXLimits(chartKDE2, 2.5, 4.5);
chartKDE2.options.plugins.legend.display = false;

// Create chart for summed KDE
const ctxKDE3 = document.getElementById('chart_kde3').getContext('2d');
const chartKDE3 = createLineChart(ctxKDE3, data_kde_raw, '#DE3163', 'Data');
chartKDE3.data.datasets[0].radius = 3;
chartKDE3.data.datasets[0].backgroundColor = '#DE3163';
chartKDE3.data.datasets[0].showLine = false;
adjustXLimits(chartKDE3, 2.5, 4.5);
chartKDE3.options.plugins.legend.display = false;

// Function to update the KDE charts based on the bandwidth
function updateKDECharts(bandwidth) {
    // Clear the previous kernels
    chartKDE2.data.datasets.splice(1);
    chartKDE3.data.datasets.splice(1);

    // Generate new kernel data and sum them up
    const data_kde_sum = [];
    for (let i = 0; i < data_kde_raw.length; i++) {
        const kernelData = generateKernelData(data_kde_raw[i].x, bandwidth, 2.5, 4.5, 256);
        addDataLine(chartKDE2, kernelData, '#00C4D4', 'Kernel Density Estimation');

        // Sum up the kernels
        for (let j = 0; j < kernelData.length; j++) {
            if (data_kde_sum[j] === undefined) {
                data_kde_sum[j] = {x: kernelData[j].x, y: 0};
            }
            data_kde_sum[j].y += kernelData[j].y;
        }
    }

    // Add the summed KDE to the third chart
    addDataLine(chartKDE3, data_kde_sum, '#00C4D4', 'Kernel Density Estimation');

    // Update both charts
    chartKDE2.update();
    chartKDE3.update();
}

// Slider event listener
const bwSlider = document.getElementById('bwSlider');
const bwSliderValue = document.getElementById('bwSliderValue');

bwSlider.addEventListener('input', function () {
    const bandwidth = parseFloat(this.value);
    bwSliderValue.textContent = bandwidth.toFixed(2);  // Update displayed bandwidth value
    updateKDECharts(bandwidth);  // Update the KDE charts with new bandwidth
});

// Initialize the charts with the default bandwidth
updateKDECharts(0.15);  // Initial bandwidth value
