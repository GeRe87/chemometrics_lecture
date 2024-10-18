// Generate F-distribution data
function generateFDistributionData(d1, d2, numPoints) {
    const data = [];
    const labels = [];
    const minX = 0.01;
    const maxX = 5;
    const step = (maxX - minX) / numPoints;
    for (let x = minX; x <= maxX; x += step) {
        data.push({x: x, y: fDistributionPDF(x, d1, d2)});
    }
    return data;
}

const ctx8 = document.getElementById('chart_fDist').getContext('2d');
const fDistData = generateFDistributionData(5, 10, 100);
const chart8 = createLineChart(ctx8, fDistData, '#DE3163', 'F-Distribution (d1 = 5, d2 = 10)');

// Initialize chart2

// Function to update chart2 when sliders change
function updateFDistribution() {
    const tmpData = generateFDistributionData(df1, df2, 100);
    chart8.data.datasets[0].data = tmpData;
    chart8.data.datasets[0].label = `F-Distribution (d1 = ${df1}, d2 = ${df2})`;
    chart8.update();
}

// Slider event listeners
const df1Slider = document.getElementById('df1Slider');
const df2Slider = document.getElementById('df2Slider');
const df1Value = document.getElementById('df1Value');
const df2Value = document.getElementById('df2Value');

df1Slider.addEventListener('input', function () {
    df1 = parseInt(this.value);
    df1Value.textContent = df1;
    updateFDistribution();
});

df2Slider.addEventListener('input', function () {
    df2 = parseInt(this.value);
    df2Value.textContent = df2;
    updateFDistribution();
});
