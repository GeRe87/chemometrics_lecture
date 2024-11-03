const ctx = document.getElementById('scatterChart').getContext('2d');
const ctx2 = document.getElementById('scatterChart2').getContext('2d');
const ctxVarianceBarChart = document.getElementById('varianceBarChart').getContext('2d');
const varianceSlider = document.getElementById('varianceSlider');
const varianceSlider2 = document.getElementById('varianceSlider2');

// Function to generate random data with a given variance
function generateData(meanX, meanY, variance, count = 20) {
    return Array.from({ length: count }, () => ({
        x: meanX + (Math.random() - 0.5) * variance,
        y: meanY + (Math.random() - 0.5) * variance,
    }));
}

// Initial data setup for four groups
let variance = parseFloat(varianceSlider.value);
let data = {
    datasets: [
        {
            label: 'Group 1',
            data: generateData(5, 5, variance),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
            label: 'Group 2',
            data: generateData(15, 5, variance),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
            label: 'Group 3',
            data: generateData(5, 15, variance),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
            label: 'Group 4',
            data: generateData(15, 15, variance),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
    ],
};

// calculate the variance within and between groups
// calculate the within-group and between-group variances
function calculateVariance(data) {
    const n = data.datasets.reduce((acc, dataset) => acc + dataset.data.length, 0);

    // Overall mean for all data points
    const overallMean = {
        x: data.datasets.reduce((acc, dataset) => acc + dataset.data.reduce((sum, point) => sum + point.x, 0), 0) / n,
        y: data.datasets.reduce((acc, dataset) => acc + dataset.data.reduce((sum, point) => sum + point.y, 0), 0) / n,
    };

    // Calculate between-group variance
    const betweenGroupVariance = data.datasets.reduce((acc, dataset) => {
        const groupMean = {
            x: dataset.data.reduce((sum, point) => sum + point.x, 0) / dataset.data.length,
            y: dataset.data.reduce((sum, point) => sum + point.y, 0) / dataset.data.length,
        };
        const distanceSquared = Math.pow(groupMean.x - overallMean.x, 2) + Math.pow(groupMean.y - overallMean.y, 2);
        return acc + dataset.data.length * distanceSquared;
    }, 0) / n;

    // Calculate within-group variance
    const withinGroupVariance = data.datasets.reduce((acc, dataset) => {
        const groupMean = {
            x: dataset.data.reduce((sum, point) => sum + point.x, 0) / dataset.data.length,
            y: dataset.data.reduce((sum, point) => sum + point.y, 0) / dataset.data.length,
        };
        const groupVariance = dataset.data.reduce((sum, point) => {
            const distanceSquared = Math.pow(point.x - groupMean.x, 2) + Math.pow(point.y - groupMean.y, 2);
            return sum + distanceSquared;
        }, 0) / dataset.data.length;
        return acc + groupVariance;
    }, 0) / data.datasets.length;

    return { withinGroupVariance, betweenGroupVariance };
}


// create horizontal bar chart for variance
const varianceBarChart = new Chart(ctxVarianceBarChart, {
    type: 'bar',
    data: {
        labels: ['Within Groups', 'Between Groups'],
        datasets: [{
            label: 'Variance',
            data: Object.values(calculateVariance(data)),
            backgroundColor: ['#FF6384', '#36A2EB'],
        }],
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Scatter plot configuration
const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: data,
    options: {
        scales: {
            x: { min: 0, max: 20 },
            y: { min: 0, max: 20 },
        },
        plugins: {
            legend: { display: true },
        },
    },
});

// Update chart data when the slider changes
varianceSlider.addEventListener('input', () => {
    variance = parseFloat(varianceSlider.value);
    scatterChart.data.datasets[0].data = generateData(5, 5, variance);
    scatterChart.data.datasets[1].data = generateData(15, 5, variance);
    scatterChart.data.datasets[2].data = generateData(5, 15, variance);
    scatterChart.data.datasets[3].data = generateData(15, 15, variance);
    scatterChart.update();
});

const scatterChart2 = new Chart(ctx2, {
    type: 'scatter',
    data: data,
    options: {
        scales: {
            x: { min: 0, max: 20 },
            y: { min: 0, max: 20 },
        },
        plugins: {
            legend: { display: true },
        },
    },
});

// Update chart data when the slider changes
varianceSlider2.addEventListener('input', () => {
    variance = parseFloat(varianceSlider2.value);
    scatterChart2.data.datasets[0].data = generateData(5, 5, variance);
    scatterChart2.data.datasets[1].data = generateData(15, 5, variance);
    scatterChart2.data.datasets[2].data = generateData(5, 15, variance);
    scatterChart2.data.datasets[3].data = generateData(15, 15, variance);
    scatterChart2.update();
    // update the variance bar chart
    varianceBarChart.data.datasets[0].data = Object.values(calculateVariance(scatterChart2.data));
    varianceBarChart.update();
});