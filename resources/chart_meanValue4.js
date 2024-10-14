Reveal.addEventListener('slidechanged', function (event) {
    if (event.currentSlide.querySelector('#chart_meanValue4')) {
        const ctx = event.currentSlide.querySelector('#chart_meanValue4');

        if (chartInstance) {
            chartInstance.destroy();
        }

        const chart_meanValue4_addLevels = event.currentSlide.querySelector('#chart_meanValue4_addLevels');
        const chart_meanValue4_resetChart = event.currentSlide.querySelector('#chart_meanValue4_resetChart');

        if (!chart_meanValue4_addLevels.hasListener) {
            chart_meanValue4_addLevels.addEventListener('click', increaseDataPoint);
            chart_meanValue4_addLevels.hasListener = true;
        }

        if (!chart_meanValue4_resetChart.hasListener) {
            chart_meanValue4_resetChart.addEventListener('click', resetChart);
            chart_meanValue4_resetChart.hasListener = true;
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

        // Funktion zur Berechnung des Modus
        function calculateMode(dataArray, precision = 2) {
            const yValues = dataArray.map(point => point.y);
            const yValuesRounded = yValues.map(value => value.toFixed(precision));
            const uniqueYValues = [...new Set(yValuesRounded)];
            const counts = uniqueYValues.map(value => {
                return {
                    value: value,
                    count: yValuesRounded.filter(y => y === value).length
                };
            });
            counts.sort((a, b) => b.count - a.count);
            return parseFloat(counts[0].value);
        }

        modeValue = calculateMode(data,1);

        // Erstellung der Linien für Mittelwert und Median
        dataMean = [];
        dataMedian = [];
        dataMode = [];
        for (let i = 0; i < data.length; i++) {
            dataMean.push({ x: data[i].x, y: meanValue });
            dataMedian.push({ x: data[i].x, y: medianValue });
            dataMode.push({ x: data[i].x, y: modeValue });
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
                        label: 'Mode',
                        data: dataMode,
                        borderColor: '#FFA600',
                        borderWidth: 5,
                        pointBackgroundColor: '#FFA600',
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
                        medianValue: medianValue,
                        modeValue: modeValue
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
            // increase 25 random data points by 3 without drawing multiple times
            // Manipulate the first 45 random data points by increasing their y value by 7
            for (let i = 30; i < 55; i++) {
                data[i].y += 1;
            }

            // Manipulate the last 20 random data points by increasing their y value by 3
            for (let i = 55; i < 100; i++) {
                data[i].y += 3;
            }
            
            meanValue = calculateMean(data);
            medianValue = calculateMedian(data);
            modeValue = calculateMode(data,1);

            for (let i = 0; i < dataMean.length; i++) {
                dataMean[i].y = meanValue;
                dataMedian[i].y = medianValue;
                dataMode[i].y = modeValue;
            }

            chartInstance.options.plugins.meanValuePlugin.meanValue = meanValue;
            chartInstance.options.plugins.meanValuePlugin.medianValue = medianValue;
            chartInstance.options.plugins.meanValuePlugin.modeValue = modeValue;

            chartInstance.update();
        }

        // Funktion zum Zurücksetzen des Diagramms
        function resetChart() {
            data = JSON.parse(JSON.stringify(originalData));

            meanValue = calculateMean(data);
            medianValue = calculateMedian(data);
            modeValue = calculateMode(data,1);

            dataMean = [];
            dataMedian = [];
            dataMode = [];
            for (let i = 0; i < data.length; i++) {
                dataMean.push({ x: data[i].x, y: meanValue });
                dataMedian.push({ x: data[i].x, y: medianValue });
                dataMode.push({ x: data[i].x, y: modeValue });
            }

            chartInstance.options.plugins.meanValuePlugin.meanValue = meanValue;
            chartInstance.options.plugins.meanValuePlugin.medianValue = medianValue;
            chartInstance.options.plugins.meanValuePlugin.modeValue = modeValue;

            chartInstance.data.datasets[0].data = dataMean;
            chartInstance.data.datasets[1].data = dataMedian;
            chartInstance.data.datasets[2].data = dataMode;
            chartInstance.data.datasets[3].data = data;

            chartInstance.update();
        }
    }
});
