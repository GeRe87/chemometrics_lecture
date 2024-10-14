let chartInstance = null;

Reveal.addEventListener('slidechanged', function (event) {
    // Prüfen, ob die aktuelle Folie das Diagramm enthält
    if (event.currentSlide.querySelector('#chart_meanValue1')) {
        const ctx = document.getElementById('chart_meanValue1');

        if (chartInstance) {
            chartInstance.destroy();
        }

        function gaussianRandom(mean = 0, stdev = 1) {
            const u = 1 - Math.random(); // Converting [0,1) to (0,1]
            const v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            // Transform to the desired mean and standard deviation:
            return z * stdev + mean;
        }

        ctx.width = ctx.parentElement.clientWidth;
        ctx.height = ctx.parentElement.clientHeight;
        const data = [];
        let yval = .0;
        let xval = 0;
        for (let i = 0; i < 1000; i++) {
            yval = gaussianRandom(0.5, 0.1);
            xval = Math.floor(i / 5) + 1;
            data.push({ x: xval, y: yval });
        }
        // calculate the mean value of a series of 5 data points 
        // and then move on to the next series of 5 data points and store in dataMean array
        // i.e. dataMean[0] = mean(data[0], data[1], data[2], data[3], data[4])
        // i.e. dataMean[1] = mean(data[5], data[6], data[7], data[8], data[9])

        const dataMean = [];
        let sum = 0;
        for (let i = 0; i < data.length; i += 5) {
            for (let u = 0; u < 5; u++) {
                sum = 0;
                for (let j = 0; j < 5; j++) {
                    sum += data[i + j].y;
                }
                dataMean.push({ x: data[i].x, y: sum / 5 });
            }
        }

        const totalDuration = 5000;
        const delayBetweenPoints = totalDuration / data.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: '#ee5397',
                    borderWidth: 5,
                    pointBackgroundColor: '#ee5397',
                    radius: 0,
                    data: dataMean,
                    label: 'Mean Value of 5 Data Points',
                },
                {
                    borderColor: '#00C4D4aa',
                    borderWidth: .5,
                    pointBackgroundColor: '#00C4D4aa',
                    radius: 3,
                    data: data,
                    label: 'Data',
                },
                ]
            },
            options: {
                animation: {
                    x: {
                        type: 'number',
                        easing: 'linear',
                        duration: delayBetweenPoints,
                        from: NaN, // the point is initially skipped
                        delay(ctx) {
                            if (ctx.type !== 'data' || ctx.xStarted) {
                                return 0;
                            }
                            ctx.xStarted = true;
                            return ctx.index * delayBetweenPoints;
                        }
                    },
                    y: {
                        type: 'number',
                        easing: 'linear',
                        duration: delayBetweenPoints,
                        from: previousY,
                        delay(ctx) {
                            if (ctx.type !== 'data' || ctx.yStarted) {
                                return 0;
                            }
                            ctx.yStarted = true;
                            return ctx.index * delayBetweenPoints;
                        }
                    }
                },
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: true,
                },
                scales: {
                    x: {
                        type: 'linear',
                        grid: {
                            display: false // Gitterlinien für die x-Achse ausblenden
                        },
                        border: {
                            color: 'lightgray',
                        }
                    },
                    y: {
                        grid: {
                            display: false // Gitterlinien für die y-Achse ausblenden
                        },
                        border: {
                            color: 'lightgray',
                        }
                    }
                },
                responsive: false,
            }
        });
    }
}
);