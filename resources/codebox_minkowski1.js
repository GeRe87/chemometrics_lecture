const pSlider = document.getElementById('pSlider');
  const pValueDisplay = document.getElementById('pValue');
  const distanceCalculation = document.getElementById('distanceCalculation');

  // Data points A and B
  const A = [5.2, 3.9, 2.1, 1.8, 0.7];
  const B = [4.8, 3.7, 2.0, 1.7, 0.6];

  // Update the displayed calculation based on the selected value of p
  pSlider.addEventListener('input', () => {
    const p = parseInt(pSlider.value, 10);
    pValueDisplay.textContent = p;

    // Calculate the Minkowski distance dynamically
    const distances = A.map((a, i) => Math.abs(a - B[i]) ** p);
    const distanceSum = distances.reduce((acc, val) => acc + val, 0);
    const distanceResult = distanceSum ** (1 / p);

    // Update the calculation display
    distanceCalculation.innerHTML = `
      <code data-trim data-noescape>d = |5.2 - 4.8|^${p} + |3.9 - 3.7|^${p} 
  + |2.1 - 2.0|^${p} + |1.8 - 1.7|^${p} 
  + |0.7 - 0.6|^${p}

d = ${distances.map(d => d.toFixed(2)).join(" + ")}

d = ${distanceSum.toFixed(2)}^(1/${p})

d = ${distanceResult.toFixed(2)}</code>
    `;
  });