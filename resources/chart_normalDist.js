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

// Generiere Datenpunkte für die Normalverteilung
function generateGaussianData(mean, sigma, numPoints) {
  const data = [];
  const labels = [];
  const minX = mean - 3 * sigma;
  const maxX = mean + 3 * sigma;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      labels.push(x.toFixed(2));
      data.push(gaussianPDF(x, mean, sigma));
  }
  return { labels, data };
}

function generateGaussianCDFData(mean, sigma, numPoints) {
  const data = [];
  const labels = [];
  const minX = mean - 3 * sigma;
  const maxX = mean + 3 * sigma;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      labels.push(x.toFixed(2));
      data.push(gaussianCDF(x, mean, sigma));
  }
  return { labels, data };
}

// Daten für Normalverteilung generieren
const gaussianData = generateGaussianData(0, 1, 100);
const gaussianCDFData = generateGaussianCDFData(0, 1, 100);

// Funktion zur Erstellung des Diagramms
function createChart(ctx) {
  return new Chart(ctx, {
      type: 'line',
      data: {
          labels: gaussianData.labels,
          datasets: [{
              label: 'Normal Distribution PDF (μ = 0, σ = 1)',
              data: gaussianData.data,
              borderColor: '#FF6347',
              fill: false,
              borderWidth: 4,
              pointRadius: 0,
          },
          {
              label: 'Normal Distribution CDF (μ = 0, σ = 1)',
              data: gaussianCDFData.data,
              borderColor: '#4682B4',
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
}

// Reveal.js-Ereignis, um das Diagramm zu initialisieren, wenn die Folie aktiv wird
Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.querySelector('#chart_normalDist_1')) {
      const ctx1 = document.getElementById('chart_normalDist_1').getContext('2d');
      createChart(ctx1);
  }

  if (event.currentSlide.querySelector('#chart_normalDist_2')) {
      const ctx2 = document.getElementById('chart_normalDist_2').getContext('2d');
      createChart(ctx2);
  }
});