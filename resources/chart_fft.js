function plotAxialFrequency(chartId, frequency) {
    const data = Array.from({ length: 1000 }, (_, i) => ({
        x: i / 100,
        y: Math.cos((i / 100) * frequency)
    }));
    createXYLineChart(chartId, data, "x", "y", "X", "Intensity", 
                      showLines = true, showMarkers = false, showGrid = false, 
                      xMin = null, xMax = null, yMin = null, yMax = null, width = 300, height = 20, hideAxes = true);
}

// Update axial frequency chart when slider changes
document.getElementById("slider_axial").addEventListener("input", function () {
    const frequency = +this.value;
    document.getElementById("value_axial").textContent = frequency;
    plotAxialFrequency("chart_axial", frequency);
});

// Initial axial plot
plotAxialFrequency("chart_axial", 10);

function plotInterference(chartId, freq1, freq2) {
    const data1 = Array.from({ length: 1000 }, (_, i) => ({
        x: i / 100,
        y: Math.cos((i / 100) * freq1)
    }));
    const data2 = Array.from({ length: 1000 }, (_, i) => ({
        x: i / 100,
        y: Math.cos((i / 100) * freq2)
    }));

    const combined = data1.map((d, i) => ({
        x: d.x,
        y: d.y + data2[i].y
    }));

    createXYLineChart(chartId, combined, "x", "y", "X", "Intensity", 
                      showLines = true, showMarkers = false, showGrid = false, 
                      xMin = null, xMax = null, yMin = null, yMax = null, width = 300, height = 20, hideAxes = true);
}

// Update interference chart when sliders change
document.getElementById("slider_interference_1").addEventListener("input", function () {
    const freq1 = +this.value;
    const freq2 = +document.getElementById("slider_interference_2").value;
    document.getElementById("value_interference_1").textContent = freq1;
    plotInterference("chart_interference", freq1, freq2);
});

document.getElementById("slider_interference_2").addEventListener("input", function () {
    const freq1 = +document.getElementById("slider_interference_1").value;
    const freq2 = +this.value;
    document.getElementById("value_interference_2").textContent = freq2;
    plotInterference("chart_interference", freq1, freq2);
});

// Initial interference plot
plotInterference("chart_interference", 10, 20);


// Radial Frequency Visualization with Animation
function plotRadialFrequencyWithAnimation(chartId) {
    const svg = d3
        .select(`#${chartId}`)
        .append("svg")
        .attr("width", 300)
        .attr("height", 300);

    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    // Kreis zeichnen
    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", radius)
        .style("fill", "none")
        .style("stroke", "blue")
        .style("stroke-width", 2);

    // Punkte hinzufügen
    const point1 = svg.append("circle").attr("r", 5).attr("fill", "red");
    const point2 = svg.append("circle").attr("r", 5).attr("fill", "green");

    // Animation
    let angle1 = 0; // Winkel für Punkt 1
    let angle2 = 0; // Winkel für Punkt 2

    function update() {
        // Winkel für die beiden Punkte aktualisieren
        angle1 += 0.02; // Geschwindigkeit für Punkt 1
        angle2 += 0.01; // Geschwindigkeit für Punkt 2

        // Position der Punkte berechnen
        const x1 = centerX + radius * Math.cos(angle1);
        const y1 = centerY + radius * Math.sin(angle1);

        const x2 = centerX + radius * Math.cos(angle2);
        const y2 = centerY + radius * Math.sin(angle2);

        // Punkte aktualisieren
        point1.attr("cx", x1).attr("cy", y1);
        point2.attr("cx", x2).attr("cy", y2);

        // Wiederholen
        requestAnimationFrame(update);
    }

    update(); // Animation starten
}

plotRadialFrequencyWithAnimation("chart_radial");

function plotFourierWrappedCosineWithRotation(chartId, frequency, numPoints) {
    const svg = d3
        .select(`#${chartId}`)
        .append("svg")
        .attr("width", 300)
        .attr("height", 300);

    const centerX = 150;
    const centerY = 150;
    const baseRadius = 100;

    let rotationOffset = 0; // Startwinkel für die Drehung

    function update() {
        // Datenpunkte für die Fourier-Darstellung berechnen
        const points = Array.from({ length: numPoints }, (_, j) => {
            const theta = -2 * Math.PI * j / numPoints + rotationOffset; // Winkel mit Rotation
            const cosValue = Math.cos(j * frequency * (2 * Math.PI) / numPoints); // Axialer Wert
            const radius = baseRadius + cosValue * 20; // Modulierter Radius

            return {
                x: centerX + radius * Math.cos(theta),
                y: centerY + radius * Math.sin(theta),
            };
        });

        // Linie aktualisieren
        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCardinal);

        const path = svg.selectAll("path").data([points]);

        // Linie erstellen oder aktualisieren
        path
            .enter()
            .append("path")
            .merge(path)
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "red")
            .style("stroke-width", 2);

        // Punkte hinzufügen oder aktualisieren (optional)
        const circles = svg.selectAll("circle").data(points);

        circles
            .enter()
            .append("circle")
            .merge(circles)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 2)
            .style("fill", "blue");

        // Rotation erhöhen
        rotationOffset += 0.02;

        // Nächster Frame
        requestAnimationFrame(update);
    }

    update(); // Animation starten
}

// Darstellung initialisieren
plotFourierWrappedCosineWithRotation("chart_interference2", 5, 200);

function plotMatchingWithRadialFrequencyAndRotation(chartId) {
    const svg = d3
        .select(`#${chartId}`)
        .append("svg")
        .attr("width", 300)
        .attr("height", 300);

    const centerX = 150;
    const centerY = 150;
    const baseRadius = 100;
    const numPoints = 200;
    const axialFrequency = 7.3; // Axiale Frequenz bleibt konstant

    let radialFrequency = 1; // Startwert der Kreisfrequenz
    let rotationOffset = 0; // Startwert für die Rotation

    // Elemente für die Visualisierung
    const path = svg.append("path").style("fill", "none").style("stroke", "red").style("stroke-width", 2);
    const centroidLine = svg.append("line").style("stroke", "blue").style("stroke-width", 2);
    const centroidPoint = svg.append("circle").attr("r", 5).style("fill", "blue");

    function update() {
        // Datenpunkte berechnen
        const points = Array.from({ length: numPoints }, (_, j) => {
            const theta = -2 * Math.PI * j / numPoints * radialFrequency + rotationOffset; // Kreisfrequenz + Rotation
            const cosValue = Math.cos(j * axialFrequency * (2 * Math.PI) / numPoints); // Axialer Wert
            const radius = baseRadius + cosValue * 20; // Modulierter Radius

            return {
                x: centerX + radius * Math.cos(theta),
                y: centerY + radius * Math.sin(theta),
                weight: cosValue, // Gewicht für den Schwerpunkt
            };
        });

        // Linie aktualisieren
        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCardinal);

        path.datum(points).attr("d", line);

        // Schwerpunkt berechnen
        const centroid = points.reduce(
            (acc, p) => {
                acc.x += p.x * Math.abs(p.weight);
                acc.y += p.y * Math.abs(p.weight);
                acc.totalWeight += Math.abs(p.weight);
                return acc;
            },
            { x: 0, y: 0, totalWeight: 0 }
        );

        centroid.x /= centroid.totalWeight;
        centroid.y /= centroid.totalWeight;

        // Schwerpunktpunkt und Linie aktualisieren
        centroidPoint.attr("cx", centroid.x).attr("cy", centroid.y);
        centroidLine
            .attr("x1", centerX)
            .attr("y1", centerY)
            .attr("x2", centroid.x)
            .attr("y2", centroid.y);

        // Rotation erhöhen
        rotationOffset += 0.02; // Geschwindigkeit der Rotation
    }

    // Slider Event
    d3.select("#frequencySlider").on("input", function () {
        radialFrequency = +this.value;
        d3.select("#frequencyValue").text(radialFrequency);
    });

    function animate() {
        update(); // Darstellung aktualisieren
        requestAnimationFrame(animate); // Nächster Frame
    }

    animate(); // Animation starten
}

// Funktion initialisieren
plotMatchingWithRadialFrequencyAndRotation("chart_matching");







