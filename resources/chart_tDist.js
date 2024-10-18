// Generiere Datenpunkte für die t-Verteilung
function generateTDistributionData(df, numPoints) {
  const data = [];
  const minX = -6;
  const maxX = 6;
  const step = (maxX - minX) / numPoints;
  for (let x = minX; x <= maxX; x += step) {
      data.push({x: x, y: tDistributionPDF(x, df)});
  }
  return data;
}

const ctx7 = document.getElementById('chart_tDist').getContext('2d');
const chart7 = createLineChart(ctx7, gaussianData, '#DE3163', 'Normal Distribution PDF');
const tDistData = generateTDistributionData(3, 100);
addDataLine(chart7, tDistData, '#00C4D4', 't-Distribution (df = 3)');

// Funktion zum Aktualisieren der t-Verteilung basierend auf dem Slider
function updateTDistribution(df) {
  const tmpData = generateTDistributionData(df, 100);  // Neue t-Verteilung mit aktuellem df
  chart7.data.datasets[1].data = tmpData;  // Aktualisiere die Daten der t-Verteilung
  chart7.data.datasets[1].label = `t-Distribution (df = ${df})`;  // Aktualisiere das Label
  chart7.update();  // Aktualisiere das Diagramm
}

// Slider-Eventlistener hinzufügen
const dfSlider = document.getElementById('dfSlider');
const dfValue = document.getElementById('dfValue');

dfSlider.addEventListener('input', function() {
  const df = parseInt(this.value);
  dfValue.textContent = df;  // Zeige den aktuellen Freiheitsgrad an
  updateTDistribution(df);  // Aktualisiere das Diagramm
});