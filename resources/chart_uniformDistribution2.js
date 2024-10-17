let chartInstance2 = null;

function generateData2() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    let sum = 0;
    // Würfele 30 Mal und berechne den Durchschnitt
    for (let j = 0; j < 30; j++) {
      sum += Math.floor(Math.random() * 6) + 1; // Zufällige Zahl zwischen 1 und 6
    }
    const yval = sum / 30; // Durchschnitt der 30 Würfe
    const xval = i + 1;
    data.push({ x: xval, y: yval });
  }
  return data;
}

function createChart2(ctx, data, chartType = 'line') {
  return new Chart(ctx, {
    type: chartType,
    data: {
      datasets: [{
        borderColor: '#ee5397',
        borderWidth: 0,
        pointBackgroundColor: '#DE3163',
        radius: 3,
        data: data,
        label: chartType === 'line' ? 'Average of 30 Dice Rolls (Scatter Plot)' : 'Frequency'
      }]
    },
    options: {
      animation: {
        duration: 0
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        },
        y: {
          type: 'linear',
          position: 'left',
          min: 1,
          max: 6
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

function updateToHistogram2(chartInstance2, data) {
  const binCounts = new Array(20).fill(0); // Es gibt mögliche Durchschnittswerte zwischen 1 und 6
  data.forEach(point => {
    const binIndex = Math.floor((point.y - 1) * 4); // Werte in passende Bins einteilen
    binCounts[binIndex]++;
  });

  // Aktualisiere den Diagrammtyp
  chartInstance2.config.type = 'bar';
  chartInstance2.data.labels = Array.from({ length: 20 }, (_, i) => (i / 4 + 1).toFixed(2)); // Labels für Bins
  chartInstance2.data.datasets[0].data = binCounts;
  chartInstance2.data.datasets[0].backgroundColor = '#00C4D4';
  chartInstance2.data.datasets[0].label = 'Frequency';

  // Achsenoptionen für Histogramm setzen
  chartInstance2.options.scales.x.title.text = 'Average Dice Roll Value';
  chartInstance2.options.scales.y.title.text = 'Count';
  chartInstance2.options.scales.y.min = 0;
  chartInstance2.options.scales.y.max = 400;
  chartInstance2.options.scales.x.min = 1;
  chartInstance2.options.scales.x.max = 6;

  // Diagramm aktualisieren
  chartInstance2.update();
}

function updateToScatter2(chartInstance2, data) {
  // Aktualisiere den Diagrammtyp zurück auf 'line'
  chartInstance2.config.type = 'line';
  chartInstance2.data.datasets[0].data = data;
  chartInstance2.data.datasets[0].pointBackgroundColor = '#DE3163';
  chartInstance2.data.datasets[0].backgroundColor = '#DE3163';
  chartInstance2.data.datasets[0].label = 'Average of 30 Dice Rolls (Scatter Plot)';

  // Achsenoptionen für Scatter Plot zurücksetzen
  chartInstance2.options.scales.x.title.text = '';
  chartInstance2.options.scales.y.title.text = '';
  chartInstance2.options.scales.y.min = 1;
  chartInstance2.options.scales.y.max = 6;
  chartInstance2.options.scales.x.min = 0;
  chartInstance2.options.scales.x.max = 1000;

  // Diagramm aktualisieren
  chartInstance2.update();
}

Reveal.addEventListener('slidechanged', function (event) {
  if (event.currentSlide.querySelector('#chart_uniformDistribution2')) {
    const ctx = document.getElementById('chart_uniformDistribution2');
    const data = generateData2();

    if (!chartInstance2) {
      chartInstance2 = createChart2(ctx, data, 'line');
    }

    // Button für Histogramm anzeigen
    document.getElementById('chart_uniformDistribution2_addBars').addEventListener('click', function () {
      updateToHistogram2(chartInstance2, data);
    });

    // Button für Scatter-Plot zurücksetzen
    document.getElementById('chart_uniformDistribution2_resetChart').addEventListener('click', function () {
      updateToScatter2(chartInstance2, data);
    });
  }
});
