    // F-distribution PDF calculation
    function fDistributionPDF(x, d1, d2) {
        const numerator = Math.pow(d1 * x, d1) * Math.pow(d2, d2);
        const denominator = Math.pow(d1 * x + d2, d1 + d2);
        const beta = betaFunction(d1 / 2, d2 / 2);
        return (Math.sqrt(numerator / denominator)) / (x * beta);
    }

    // Beta function approximation
    function betaFunction(a, b) {
        return (gammaApprox(a) * gammaApprox(b)) / gammaApprox(a + b);
    }

    // Gamma function approximation
    function gammaApprox(z) {
        const g = 7;
        const C = [
            0.99999999999980993, 676.5203681218851, -1259.1392167224028,
            771.32342877765313, -176.61502916214059, 12.507343278686905,
            -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
        ];

        if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaApprox(1 - z));
        z -= 1;

        let x = C[0];
        for (let i = 1; i < g + 2; i++) {
            x += C[i] / (z + i);
        }

        const t = z + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
    }

    // Generate F-distribution data
    function generateFDistributionData(d1, d2, numPoints) {
        const data = [];
        const labels = [];
        const minX = 0.01;
        const maxX = 5;
        const step = (maxX - minX) / numPoints;
        for (let x = minX; x <= maxX; x += step) {
            labels.push(x.toFixed(2));
            data.push(fDistributionPDF(x, d1, d2));
        }
        return { labels, data };
    }

    const ctx2 = document.getElementById('chart_fDist').getContext('2d');

    // Initial degrees of freedom
    let df1 = 5;
    let df2 = 10;

    // Initialize chart2
    const chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: generateFDistributionData(df1, df2, 100).labels,
            datasets: [{
                label: `F-Distribution (d1 = ${df1}, d2 = ${df2})`,
                data: generateFDistributionData(df1, df2, 100).data,
                borderColor: '#FF6347',
                fill: false,
                borderWidth: 4,
                pointRadius: 0,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Probability Density',
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            }
        }
    });

    // Function to update chart2 when sliders change
    function updateFDistribution() {
        const fDistData = generateFDistributionData(df1, df2, 100);
        chart2.data.datasets[0].data = fDistData.data;
        chart2.data.datasets[0].label = `F-Distribution (d1 = ${df1}, d2 = ${df2})`;
        chart2.update();
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
