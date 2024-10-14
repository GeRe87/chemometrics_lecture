let originalData = []; // Speichert die ursprünglichen Daten zum Zurücksetzen
let data = [];         // Daten für das Diagramm
let dataMean = [];     // Daten für die Mittelwertlinie
let dataMedian = [];   // Daten für die Medianlinie
let meanValue = 0;     // Mittelwert
let medianValue = 0;   // Medianwert
let modeValue = 0;     // Moduswert

// Benutzdefiniertes Plugin zur Anzeige von Mittelwert und Median
const meanValuePlugin = {
    id: 'meanValuePlugin',
    afterDraw(chart, args, options) {
        const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;

        // Prüfen, ob die Optionen vorhanden sind
        const meanValue = options.meanValue;
        const medianValue = options.medianValue;
        const modeValue = options.modeValue;

        if (meanValue !== undefined && medianValue !== undefined) {
            // Textformatierung
            ctx.save();
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = '#fe4e4e'; // Farbe des Textes
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Textpositionierung (zentriert)
            const centerX = left + width / 2;
            const centerY = top + height / 3.5;

            if (modeValue == undefined) {
                // Text zeichnen
                ctx.fillText(`Mean: ${meanValue.toFixed(2)} | Median: ${medianValue.toFixed(2)}`, centerX, centerY);
            } else {
                ctx.fillText(`Mean: ${meanValue.toFixed(2)} | Median: ${medianValue.toFixed(2)} | Mode: ${modeValue.toFixed(2)}`, centerX, centerY);
            }
            ctx.restore();
        }
    }
};


// Plugin registrieren
Chart.register(meanValuePlugin);

Reveal.addEventListener('slidechanged', function (event) {
    if (event.currentSlide.querySelector('#chart_meanValue3')) {
        const ctx = event.currentSlide.querySelector('#chart_meanValue3');

        if (chartInstance) {
            chartInstance.destroy();
        }

        const chart_meanValue3_addOutlier = event.currentSlide.querySelector('#chart_meanValue3_addOutlier');
        const chart_meanValue3_reduceData = event.currentSlide.querySelector('#chart_meanValue3_reduceData');
        const chart_meanValue3_resetChart = event.currentSlide.querySelector('#chart_meanValue3_resetChart');

        if (!chart_meanValue3_addOutlier.hasListener) {
            chart_meanValue3_addOutlier.addEventListener('click', increaseDataPoint);
            chart_meanValue3_addOutlier.hasListener = true;
        }

        if (!chart_meanValue3_reduceData.hasListener) {
            chart_meanValue3_reduceData.addEventListener('click', reduceDataPoints);
            chart_meanValue3_reduceData.hasListener = true;
        }

        if (!chart_meanValue3_resetChart.hasListener) {
            chart_meanValue3_resetChart.addEventListener('click', resetChart);
            chart_meanValue3_resetChart.hasListener = true;
        }

        function gaussianRandom(mean = 0, stdev = 1) {
            const u = 1 - Math.random();
            const v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            return z * stdev + mean;
        }

        ctx.width = ctx.parentElement.clientWidth;
        ctx.height = ctx.parentElement.clientHeight;

        // Initiale Datengenerierung
        data = [];
        let yval = 0.0;
        let xval = 0;
        for (let i = 0; i < 100; i++) {
            yval = gaussianRandom(0.5, 0.1);
            xval = i;
            data.push({ x: xval, y: yval });
        }

        // Originaldaten speichern
        originalData = JSON.parse(JSON.stringify(data));

        // Funktion zur Mittelwertberechnung
        function calculateMean(dataArray) {
            let total = 0;
            for (let i = 0; i < dataArray.length; i++) {
                total += dataArray[i].y;
            }
            return total / dataArray.length;
        }

        // Funktion zur Medianberechnung
        function calculateMedian(dataArray) {
            const yValues = dataArray.map(point => point.y);
            yValues.sort((a, b) => a - b);
            const len = yValues.length;
            if (len % 2 === 0) {
                return (yValues[len / 2 - 1] + yValues[len / 2]) / 2;
            } else {
                return yValues[(len - 1) / 2];
            }
        }

        meanValue = calculateMean(data);
        medianValue = calculateMedian(data);

        // Erstellung der Linien für Mittelwert und Median
        dataMean = [];
        dataMedian = [];
        for (let i = 0; i < data.length; i++) {
            dataMean.push({ x: data[i].x, y: meanValue });
            dataMedian.push({ x: data[i].x, y: medianValue });
        }

        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Mean',
                        data: dataMean,
                        borderColor: '#ee5397',
                        borderWidth: 5,
                        pointBackgroundColor: '#ee5397',
                        radius: 0,
                        fill: false,
                        tension: 0,
                    },
                    {
                        label: 'Median',
                        data: dataMedian,
                        borderColor: '#00C4D4',
                        borderWidth: 5,
                        pointBackgroundColor: '#00C4D4',
                        radius: 0,
                        fill: false,
                        tension: 0,
                    },
                    {
                        label: 'Data',
                        data: data,
                        borderColor: '#00C4D4aa',
                        borderWidth: 0.5,
                        pointBackgroundColor: '#00C4D4aa',
                        radius: 3,
                        fill: false,
                        tension: 0,
                    },
                ],
            },
            options: {
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: true,
                    meanValuePlugin: {
                        meanValue: meanValue,
                        medianValue: medianValue
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        grid: {
                            display: false
                        },
                        border: {
                            color: 'lightgray',
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            color: 'lightgray',
                        }
                    }
                },
                responsive: false,
            }
        });

        // Funktion zum Erhöhen eines Datenpunkts um +3
        function increaseDataPoint() {
            data[7].y += 3;

            meanValue = calculateMean(data);
            medianValue = calculateMedian(data);

            for (let i = 0; i < dataMean.length; i++) {
                dataMean[i].y = meanValue;
                dataMedian[i].y = medianValue;
            }

            chartInstance.options.plugins.meanValuePlugin.meanValue = meanValue;
            chartInstance.options.plugins.meanValuePlugin.medianValue = medianValue;

            chartInstance.update();
        }

        // Funktion zum Reduzieren der Datenpunkte auf 10
        function reduceDataPoints() {
            data = data.slice(0, 10);

            for (let i = 0; i < data.length; i++) {
                data[i].x = i;
            }

            meanValue = calculateMean(data);
            medianValue = calculateMedian(data);

            dataMean = [];
            dataMedian = [];
            for (let i = 0; i < data.length; i++) {
                dataMean.push({ x: data[i].x, y: meanValue });
                dataMedian.push({ x: data[i].x, y: medianValue });
            }

            chartInstance.options.plugins.meanValuePlugin.meanValue = meanValue;
            chartInstance.options.plugins.meanValuePlugin.medianValue = medianValue;

            chartInstance.data.datasets[0].data = dataMean;
            chartInstance.data.datasets[1].data = dataMedian;
            chartInstance.data.datasets[2].data = data;

            chartInstance.update();
        }

        // Funktion zum Zurücksetzen des Diagramms
        function resetChart() {
            data = JSON.parse(JSON.stringify(originalData));

            meanValue = calculateMean(data);
            medianValue = calculateMedian(data);

            dataMean = [];
            dataMedian = [];
            for (let i = 0; i < data.length; i++) {
                dataMean.push({ x: data[i].x, y: meanValue });
                dataMedian.push({ x: data[i].x, y: medianValue });
            }

            chartInstance.options.plugins.meanValuePlugin.meanValue = meanValue;
            chartInstance.options.plugins.meanValuePlugin.medianValue = medianValue;

            chartInstance.data.datasets[0].data = dataMean;
            chartInstance.data.datasets[1].data = dataMedian;
            chartInstance.data.datasets[2].data = data;

            chartInstance.update();
        }
    }
});
