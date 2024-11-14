function updateDesignMatrix() {
  const concentrations = Array.from(document.querySelectorAll('.concentration')).map(input => parseFloat(input.value) || 0);

  // Build Design Matrix X and display it
  let designMatrixContent = '';
  let X = concentrations.map(concentration => [1, concentration]);
  X.forEach(row => {
    designMatrixContent += `│ ${row[0]}, ${row[1].toFixed(0)} │\n`;
  });
  document.getElementById('designMatrix').textContent = designMatrixContent;

  // Calculate Transpose of X
  let XT = [[], []];
  X.forEach(row => {
    XT[0].push(row[0]);
    XT[1].push(row[1]);
  });

  // Calculate XTX = XT * X
  let XTX = [
    [XT[0].reduce((sum, x, i) => sum + x * X[i][0], 0), XT[0].reduce((sum, x, i) => sum + x * X[i][1], 0)],
    [XT[1].reduce((sum, x, i) => sum + x * X[i][0], 0), XT[1].reduce((sum, x, i) => sum + x * X[i][1], 0)]
  ];

  // Calculate inverse of XTX (only for 2x2 matrix here)
  let det = XTX[0][0] * XTX[1][1] - XTX[0][1] * XTX[1][0];
  if (det !== 0) {
    let XTX_inv = [
      [XTX[1][1] / det, -XTX[0][1] / det],
      [-XTX[1][0] / det, XTX[0][0] / det]
    ];

    // Calculate Pseudoinverse: (X^T * X)^-1 * X^T
    let pMatrix = [
      [
        XTX_inv[0][0] * XT[0][0] + XTX_inv[0][1] * XT[1][0],
        XTX_inv[0][0] * XT[0][1] + XTX_inv[0][1] * XT[1][1],
        XTX_inv[0][0] * XT[0][2] + XTX_inv[0][1] * XT[1][2],
        XTX_inv[0][0] * XT[0][3] + XTX_inv[0][1] * XT[1][3],
        XTX_inv[0][0] * XT[0][4] + XTX_inv[0][1] * XT[1][4]
      ],
      [
        XTX_inv[1][0] * XT[0][0] + XTX_inv[1][1] * XT[1][0],
        XTX_inv[1][0] * XT[0][1] + XTX_inv[1][1] * XT[1][1],
        XTX_inv[1][0] * XT[0][2] + XTX_inv[1][1] * XT[1][2],
        XTX_inv[1][0] * XT[0][3] + XTX_inv[1][1] * XT[1][3],
        XTX_inv[1][0] * XT[0][4] + XTX_inv[1][1] * XT[1][4]
      ]
    ];

    // Display the Pseudoinverse
    let pMatrixContent = '';
    pMatrix.forEach(row => {
      pMatrixContent += `│ ${row.map(value => value.toFixed(1)).join(', ')} │\n`;
    });
    document.getElementById('pMatrix').textContent = pMatrixContent;
  } else {
    document.getElementById('pMatrix').textContent = "Keine Pseudoinverse möglich (det = 0).";
  }
}

function startMeasurement() {
  const concentrations = Array.from(document.querySelectorAll('.concentration')).map(input => parseFloat(input.value) || 0);
  document.querySelectorAll('.signal').forEach((signalElement, index) => {
    const signal = 2 * concentrations[index] + 1 + (Math.random() - 0.5); // Beispielhafte Berechnung (y = 2 * x + 1 + Rauschen)
    signalElement.textContent = signal.toFixed(2);
  });
  calculateCoefficients();
}

function startMeasurement2() {
  const concentrations = Array.from(document.querySelectorAll('.concentration')).map(input => parseFloat(input.value) || 0);
  document.querySelectorAll('.signal').forEach((signalElement, index) => {
    const signal = 2 * concentrations[index] + 1 + (Math.random() - 0.5); // Beispielhafte Berechnung (y = 2 * x + 1 + Rauschen)
    signalElement.textContent = signal.toFixed(2);
  });
  calculateCoefficients();
}

// Update the Design Matrix and Pseudoinverse whenever a concentration is input
// document.querySelectorAll('.concentration').forEach(input => {
//   input.addEventListener('input', updateDesignMatrix);
// });

// Initial display of the Design Matrix and Pseudoinverse


// Berechnet die Koeffizienten b und aktualisiert die Anzeige
function calculateCoefficients() {
  const concentrations = Array.from(document.querySelectorAll('.concentration')).map(input => parseFloat(input.value) || 0);
  const signals = Array.from(document.querySelectorAll('.signal')).map(signal => parseFloat(signal.textContent) || 0);

  // Designmatrix X und Anzeige der Matrix
  let X = concentrations.map(concentration => [1, concentration]);

  // Berechnung der Transponierten von X
  let XT = [[], []];
  X.forEach(row => {
    XT[0].push(row[0]);
    XT[1].push(row[1]);
  });

  // Berechnung von (X^T * X)
  let XTX = [
    [XT[0].reduce((sum, x, i) => sum + x * X[i][0], 0), XT[0].reduce((sum, x, i) => sum + x * X[i][1], 0)],
    [XT[1].reduce((sum, x, i) => sum + x * X[i][0], 0), XT[1].reduce((sum, x, i) => sum + x * X[i][1], 0)]
  ];

  // Berechnung der Inversen von (X^T * X)
  let det = XTX[0][0] * XTX[1][1] - XTX[0][1] * XTX[1][0];
  if (det === 0) {
    document.getElementById('bMatrix').textContent = "Keine Koeffizienten (det = 0)";
    return;
  }

  let XTX_inv = [
    [XTX[1][1] / det, -XTX[0][1] / det],
    [-XTX[1][0] / det, XTX[0][0] / det]
  ];

  // Berechnung der Pseudoinversen: (X^T * X)^-1 * X^T
  let pMatrix = [
    [
      XTX_inv[0][0] * XT[0][0] + XTX_inv[0][1] * XT[1][0],
      XTX_inv[0][0] * XT[0][1] + XTX_inv[0][1] * XT[1][1],
      XTX_inv[0][0] * XT[0][2] + XTX_inv[0][1] * XT[1][2],
      XTX_inv[0][0] * XT[0][3] + XTX_inv[0][1] * XT[1][3],
      XTX_inv[0][0] * XT[0][4] + XTX_inv[0][1] * XT[1][4]
    ],
    [
      XTX_inv[1][0] * XT[0][0] + XTX_inv[1][1] * XT[1][0],
      XTX_inv[1][0] * XT[0][1] + XTX_inv[1][1] * XT[1][1],
      XTX_inv[1][0] * XT[0][2] + XTX_inv[1][1] * XT[1][2],
      XTX_inv[1][0] * XT[0][3] + XTX_inv[1][1] * XT[1][3],
      XTX_inv[1][0] * XT[0][4] + XTX_inv[1][1] * XT[1][4]
    ]
  ];
 

  // Berechnung der Koeffizienten b0 und b1 als Produkt der Pseudoinversen und des Signals
  let b0 = pMatrix[0].reduce((sum, p, i) => sum + p * signals[i], 0);
  let b1 = pMatrix[1].reduce((sum, p, i) => sum + p * signals[i], 0);
  // Ausgabe der Koeffizienten
  document.getElementById('bMatrix').textContent = `b0: ${b0.toFixed(3)}, b1: ${b1.toFixed(3)}`;

  // Diagramm erstellen
  createRegressionChart(concentrations, signals, b0, b1);
}



// D3.js Funktion zur Erstellung des Diagramms
function createRegressionChart(concentrations, signals, b0, b1) {
  const data = concentrations.map((x, i) => ({ x, y: signals[i] }));
  const regressionLine = [
    { x: 0, y: b0 },
    { x: d3.max(concentrations) * 1.2, y: b0 + b1 * d3.max(concentrations) * 1.2 }
  ];

  const containerId = "chart";
  const width = 400;
  const height = 350;
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };

  const svg = createSVG(containerId, width, height, margin);
  const { x, y } = createXYScales(data, width, height, "x", "y", 0, d3.max(concentrations)*1.2, 0, d3.max(signals)*1.2);

  // Achsen hinzufügen
  addAxes(svg, x, y, width, height, margin, "Konzentration (mg/L)", "Signal");

  // Datenpunkte plotten
  svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 4)
    .attr("fill", "#ef476f");

  // Regressionslinie plotten
  svg.append("path")
    .datum(regressionLine)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
    );
}

// Funktion zur Aktualisierung bei Konzentrationsänderung
document.querySelectorAll('.concentration').forEach(input => {
  input.addEventListener('input', () => {
    updateDesignMatrix();
    calculateCoefficients();
  });
});

// Initiale Berechnung und Anzeige
updateDesignMatrix();
calculateCoefficients();


function showImage(value) {
  // Alle Bilder ausblenden
  document.querySelectorAll('.slider-image').forEach(img => img.style.display = 'none');
  
  // Nur das ausgewählte Bild anzeigen
  document.getElementById(`img${value}`).style.display = 'block';
}