let chartInstance1 = null;

function generateData1() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const yval = Math.floor(Math.random() * 6) + 1; // Zufällige Zahl zwischen 1 und 6
    const xval = i + 1;
    data.push({ x: xval, y: yval });
  }
  return data;
}

function createChart1(ctx, data, chartType = 'line') {
  return new Chart(ctx, {
    type: chartType,
    data: {
      datasets: [{
        borderColor: '#ee5397',
        borderWidth: 0,
        pointBackgroundColor: '#DE3163',
        radius: 3,
        data: data,
        label: chartType === 'line' ? 'Uniform Distribution (Scatter Plot)' : 'Frequency'
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
          min: 0,
          max: 7
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

function updateToHistogram1(chartInstance1, data) {
  // Histogramdaten vorbereiten
  const binCounts = [0, 0, 0, 0, 0, 0];
  data.forEach(point => {
    binCounts[point.y - 1]++;
  });

  // Aktualisiere den Diagrammtyp
  chartInstance1.config.type = 'bar';
  chartInstance1.data.labels = ['1', '2', '3', '4', '5', '6'];
  chartInstance1.data.datasets[0].data = binCounts;
  chartInstance1.data.datasets[0].backgroundColor = '#00C4D4';
  chartInstance1.data.datasets[0].label = 'Frequency';

  // Achsen- und Optionen für Histogramm setzen
  chartInstance1.options.scales.x.title.text = 'Dice Roll Value';
  chartInstance1.options.scales.y.title.text = 'Count';
  chartInstance1.options.scales.y.min = 0;
  chartInstance1.options.scales.y.max = 200;
  chartInstance1.options.scales.x.min = 0;
  chartInstance1.options.scales.x.max = 7;

  // Diagramm aktualisieren
  chartInstance1.update();
}

function updateToScatter1(chartInstance1, data) {
  // Aktualisiere den Diagrammtyp zurück auf 'line'
  chartInstance1.config.type = 'line';
  chartInstance1.data.datasets[0].data = data;
  chartInstance1.data.datasets[0].pointBackgroundColor = 'aqua';
  chartInstance1.data.datasets[0].label = 'Uniform Distribution (Scatter Plot)';
  chartInstance1.data.datasets[0].pointBackgroundColor = '#DE3163';
  chartInstance1.data.datasets[0].backgroundColor = '#DE3163';

  // Achsenoptionen für Scatter Plot zurücksetzen
  chartInstance1.options.scales.x.title.text = '';
  chartInstance1.options.scales.y.title.text = '';
  chartInstance1.options.scales.y.min = 0;
  chartInstance1.options.scales.y.max = 7;
  chartInstance1.options.scales.x.min = 0;
  chartInstance1.options.scales.x.max = 1000;
  
  // Diagramm aktualisieren
  chartInstance1.update();
}

Reveal.addEventListener('slidechanged', function (event) {
  if (event.currentSlide.querySelector('#chart_uniformDistribution1')) {
    const ctx = document.getElementById('chart_uniformDistribution1');
    const data = generateData1();

    if (!chartInstance1) {
      chartInstance1 = createChart1(ctx, data, 'line');
    }
  
    // Button für Histogramm anzeigen
    document.getElementById('chart_uniformDistribution1_addBars').addEventListener('click', function () {
      updateToHistogram1(chartInstance1, data);
    });

    // Button für Scatter-Plot zurücksetzen
    document.getElementById('chart_uniformDistribution1_resetChart').addEventListener('click', function () {
      updateToScatter1(chartInstance1, data);
    });
  }
});
