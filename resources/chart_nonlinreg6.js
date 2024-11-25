// Funktion zur Erstellung des zweiten Charts mit Slider
function createExponentialRegressionChartWithSlider2() {
    // Datenpunkte
    const data2 = [
        { x: 1, y: 2.718 },
        { x: 2, y: 7.389 },
        { x: 3, y: 20.085 }
    ];

    // Initiale Parameterschätzungen
    let params2 = { beta0: 0.9, beta1: 0.3 };

    // Diagrammabmessungen
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };

    // SVG-Container erstellen
    const svg2 = createSVG('chart_with_slider2', width, height, margin);

    // Skalen erstellen
    const xKey = 'x';
    const yKey = 'y';
    const xMin = 0;
    const xMax = 4;
    const yMin = 0;
    const yMax = 25;
    const { x: xScale2, y: yScale2 } = createXYScales(data2, width, height, xKey, yKey, xMin, xMax, yMin, yMax);

    // Achsen hinzufügen
    addAxes(svg2, xScale2, yScale2, width, height, margin, 'x', 'y');

    // Datenpunkte plotten
    svg2.selectAll('.point')
        .data(data2)
        .join('circle')
        .attr('class', 'point xkcd-line')
        .attr('cx', d => xScale2(d[xKey]))
        .attr('cy', d => yScale2(d[yKey]))
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .style('filter', 'url(#wiggle-filter)');

    // Exponentialfunktion definieren
    function exponentialModel2(x, params) {
        const { beta0, beta1 } = params;
        return beta0 * Math.exp(beta1 * x);
    }

    // Funktion zur Anpassung des Modells mit Gauss-Newton-Verfahren
    function fitExponential2(data, iterations, initialParams) {
        // Initiale Parameterschätzungen kopieren
        let beta0 = initialParams.beta0;
        let beta1 = initialParams.beta1;

        for (let iter = 0; iter < iterations; iter++) {
            const J = []; // Jacobimatrix
            const r = []; // Residualvektor

            // Berechnung von Jacobimatrix und Residuen
            for (const d of data) {
                const x = d.x;
                const y = d.y;
                const yPred = beta0 * Math.exp(beta1 * x);
                const error = y - yPred;

                // Residuum hinzufügen
                r.push(error);

                // Partielle Ableitungen berechnen
                const dFdBeta0 = Math.exp(beta1 * x); // Ableitung nach beta0
                const dFdBeta1 = beta0 * x * Math.exp(beta1 * x); // Ableitung nach beta1

                // Zeile zur Jacobimatrix hinzufügen
                J.push([dFdBeta0, dFdBeta1]);
            }

            // Umwandlung in Matrizen für Matrixoperationen
            const JT = math.transpose(J); // Transponierte Jacobimatrix
            const JTJ = math.multiply(JT, J); // JT * J
            const JTr = math.multiply(JT, r); // JT * r

            // Lösung des Gleichungssystems JTJ * DeltaBeta = JTr
            const deltaBeta = math.lusolve(JTJ, JTr); // Verwenden Sie eine numerische Lösungsmethode

            // Aktualisierung der Parameter
            beta0 += deltaBeta[0][0];
            beta1 += deltaBeta[1][0];
        }

        return { beta0, beta1 };
    }

    // Funktion zum Aktualisieren des Charts basierend auf der Anzahl der Iterationen
    function updateChart2(iterations) {
        // Modell anpassen
        const fittedParams = fitExponential2(data2, iterations, params2);

        // Daten für die angepasste Kurve generieren
        const modelData = [];
        for (let xi = xMin; xi <= xMax; xi += 0.01) {
            const yi = exponentialModel2(xi, fittedParams);
            modelData.push({ x: xi, y: yi });
        }

        // Vorherige Kurve entfernen
        svg2.selectAll('.model-curve').remove();

        // Angepasste Kurve plotten
        const lineGenerator = d3.line()
            .x(d => xScale2(d[xKey]))
            .y(d => yScale2(d[yKey]))
            .curve(d3.curveCatmullRom.alpha(0.5));

        svg2.append('path')
            .datum(modelData)
            .attr('class', 'model-curve xkcd-line')
            .attr('fill', 'none')
            .attr('stroke', 'tomato')
            .attr('stroke-width', 4)
            .style('filter', 'url(#wiggle-filter)')
            .attr('d', lineGenerator);

        // Parameteranzeige aktualisieren
        d3.select('#parameter-display2')
            .text(`Iterations: ${iterations}, β₀: ${fittedParams.beta0.toFixed(4)}, β₁: ${fittedParams.beta1.toFixed(4)}`);
    }

    // Initiale Chart-Aktualisierung
    updateChart2(0);

    // Slider erstellen
    d3.select('#slider-container2')
        .append('input')
        .attr('type', 'range')
        .attr('min', 0)
        .attr('max', 10)
        .attr('value', 0)
        .attr('step', 1)
        .attr('id', 'iteration-slider2')
        .on('input', function () {
            const iterations = +this.value;
            updateChart2(iterations);
        });

    // Parameteranzeige erstellen
    d3.select('#slider-container2')
        .append('div')
        .attr('id', 'parameter-display2')
        .style('margin-top', '10px')
        .style('font-family', 'Humor Sans')
        .style('font-size', 'large')
        .text(`Iterations: 0, β₀: ${params2.beta0.toFixed(4)}, β₁: ${params2.beta1.toFixed(4)}`);
}

// Aufruf der Funktion zum Erstellen des zweiten Charts
createExponentialRegressionChartWithSlider2();
