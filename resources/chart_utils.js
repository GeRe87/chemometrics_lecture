// create a scatter chart
function createScatterChart(ctx, data, color = '#DE3163', label = 'Scatter Plot') {
  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        borderWidth: 0,
        pointBackgroundColor: color,
        radius: 3,
        data: data,
        label: label
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// add addtional data to the scatter chart as a new data series
function addDataScatter(chart, data, color = '#DE3163', label = 'Scatter Plot') {
  chart.data.datasets.push({
    borderWidth: 0,
    pointBackgroundColor: color,
    radius: 3,
    data: data,
    label: label
  });
  chart.update();
}

// create a line chart
function createLineChart(ctx, data, color = '#DE3163', label = 'Line Plot') {
  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        borderColor: color,
        data: data,
        label: label,
        radius: 0,
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',  // Setze die x-Achse auf eine lineare Skala
          position: 'bottom'  // x-Achse unten
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// add addtional data to the line chart as a new data series
function addDataLine(chart, data, color = '#DE3163', label = 'Line Plot') {
  chart.data.datasets.push({
    borderColor: color,
    data: data,
    label: label,
    radius: 0,
  });
  chart.update();
}

function addDataLineFilled(chart, data, color = '#DE3163', label = 'Line Plot') {
  chart.data.datasets.push({
    borderColor: color,
    backgroundColor: color, 
    data: data,
    label: label,
    radius: 0,
    fill: true,
  });
  chart.update();
}


// create a histogram chart
function createHistogramChart(ctx, data, nBins, color = '#00C4D4', label = 'Frequency') {
  const data_min = Math.min(...data.map(point => point.y));
  const data_max = Math.max(...data.map(point => point.y));
  const binWidth = (data_max - data_min) / (nBins-1);
  const binEdges = Array.from({ length: nBins + 1 }, (_, i) => data_min + i * binWidth);
  const binCounts = new Array(nBins).fill(0);
  for (let i = 0; i < nBins; i++) {
    binCounts[i] = data.filter(point => point.y >= binEdges[i] && point.y < binEdges[i + 1]).length;
  }
  // add the last bin
  binCounts.push(data.filter(point => point.y > binEdges[nBins-1]).length);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: binEdges.slice(0, -1).map(edge => edge.toFixed(2)),
      datasets: [{
        label: label,
        data: binCounts,
        backgroundColor: color,
      }]
    },
    options: {
      scales: {
        x: {

        },
        y: {
          title: {
            display: true,
            text: 'Count'
          },
          beginAtZero: true,
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// function to adjust y limits of a chart
function adjustYLimits(chart, min, max) {
  chart.options.scales.y.min = min;
  chart.options.scales.y.max = max;
  chart.update();
}

// function to adjust x limits of a chart
function adjustXLimits(chart, min, max) {
  chart.options.scales.x.min = min;
  chart.options.scales.x.max = max;
  chart.update();
}

// Berechnung der Normalverteilung (PDF)
function gaussianPDF(x, mean, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));
}

// Error function approximation
function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function gaussianCDF(x, mean, sigma) {
  return 0.5 * (1 + erf((x - mean) / (sigma * Math.sqrt(2))));
}

// Berechnung der t-Verteilung (PDF) für einen bestimmten Freiheitsgrad (df)
function tDistributionPDF(x, df) {
  const numerator = Math.pow(1 + (x * x) / df, -(df + 1) / 2);
  const denominator = Math.sqrt(df) * betaFunction(0.5, df / 2);
  return numerator / denominator;
}

// Näherung der Beta-Funktion für die t-Verteilungsformel
function betaFunction(a, b) {
  return (gammaApprox(a) * gammaApprox(b)) / gammaApprox(a + b);
}

// Näherung der Gamma-Funktion für positive Werte
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

function fDistributionPDF(x, d1, d2) {
  const numerator = Math.pow(d1 * x, d1) * Math.pow(d2, d2);
  const denominator = Math.pow(d1 * x + d2, d1 + d2);
  const beta = betaFunction(d1 / 2, d2 / 2);
  return (Math.sqrt(numerator / denominator)) / (x * beta);
}

// Chi-Square PDF calculation for a given df
function chiSquarePDF(x, df) {
  if (x < 0) return 0; // Chi-Square is defined for x >= 0
  const numerator = Math.pow(x, (df / 2) - 1) * Math.exp(-x / 2);
  const denominator = Math.pow(2, df / 2) * gammaApprox(df / 2);
  return numerator / denominator;
}