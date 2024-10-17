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

// Generiere Datenpunkte für die t-Verteilung
function generateTDistributionData(df, numPoints) {
  const data = [];
  const labels = [];
  const minX = -4;
  const maxX = 4;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      labels.push(x.toFixed(2));
      data.push(tDistributionPDF(x, df));
  }
  return { labels, data };
}

// Normalverteilung PDF für Vergleich
function gaussianPDF(x, mean = 0, sigma = 1) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));
}

// Generiere Datenpunkte für die Normalverteilung (zum Vergleich)
function generateGaussianData2(numPoints) {
  const data = [];
  const labels = [];
  const minX = -4;
  const maxX = 4;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      labels.push(x.toFixed(2));
      data.push(gaussianPDF(x));
  }
  return { labels, data };
}

// Daten für die Normalverteilung generieren
const normalDistData = generateGaussianData2(100);  // Normalverteilung

const ctx = document.getElementById('chart_tDist').getContext('2d');

// Initialisiere das Diagramm
const chart = new Chart(ctx, {
  type: 'line',  // Liniendiagramm
  data: {
      labels: normalDistData.labels,
      datasets: [
          {
              label: 't-Distribution (df = 3)',
              data: generateTDistributionData(3, 100).data,  // t-Verteilung mit df = 3
              borderColor: '#FF6347',  // Tomatenrot für die t-Verteilung
              fill: false,
              borderWidth: 4,
              pointRadius: 0,  // Keine Punkte anzeigen
          },
          {
              label: 'Normal Distribution (μ = 0, σ = 1)',
              data: normalDistData.data,
              borderColor: '#4682B4',  // Stahlblau für die Normalverteilung
              fill: false,
              borderWidth: 4,
              pointRadius: 0,  // Keine Punkte anzeigen
          }
      ]
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

// Funktion zum Aktualisieren der t-Verteilung basierend auf dem Slider
function updateTDistribution(df) {
  const tDistData = generateTDistributionData(df, 100);  // Neue t-Verteilung mit aktuellem df
  chart.data.datasets[0].data = tDistData.data;  // Aktualisiere die Daten der t-Verteilung
  chart.data.datasets[0].label = `t-Distribution (df = ${df})`;  // Aktualisiere das Label
  chart.update();  // Aktualisiere das Diagramm
}

// Slider-Eventlistener hinzufügen
const dfSlider = document.getElementById('dfSlider');
const dfValue = document.getElementById('dfValue');

dfSlider.addEventListener('input', function() {
  const df = parseInt(this.value);
  dfValue.textContent = df;  // Zeige den aktuellen Freiheitsgrad an
  updateTDistribution(df);  // Aktualisiere das Diagramm
});