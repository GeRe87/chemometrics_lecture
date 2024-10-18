function generateData_uniform(N, n) {
  const data = [];
  for (let i = 0; i < N; i++) {
    let sum = 0;
    // Würfele n Mal und berechne den Durchschnitt
    for (let j = 0; j < n; j++) {
      sum += Math.floor(Math.random() * 6) + 1; // Zufällige Zahl zwischen 1 und 6
    }
    const yval = sum / n; // Durchschnitt der n Würfe
    const xval = i + 1;
    data.push({ x: xval, y: yval });
  }
  return data;
}



const ctx1 = document.getElementById('chart_uniformDistribution1').getContext('2d');
const data1 = generateData_uniform(999, 1);
const chart1 = createScatterChart(ctx1, data1, '#DE3163', 'Dice Roll Value');
adjustYLimits(chart1, 0, 7);

const ctx2 = document.getElementById('chart_uniformDistribution1_histogram').getContext('2d');
const chart2 = createHistogramChart(ctx2, data1, 6, '#DE3163', 'Frequency of Dice Roll Value');

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const tabContentId = this.getAttribute('data-tab');
    document.getElementById(tabContentId).classList.add('active');
    this.classList.add('active');
  });
});
