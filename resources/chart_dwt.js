function plotHaarWavelet(chartId) {
    const svg = d3
        .select(`#${chartId}`)
        .append("svg")
        .attr("width", 800)
        .attr("height", 300);

    const scales = [1, 2, 4]; // Verschiedene Skalen
    const baseX = 50; // Startposition auf der x-Achse
    const baseY = 50; // Startposition auf der y-Achse
    const width = 300; // Breite der Darstellung
    const height = 50; // Höhe jedes Wavelets

    scales.forEach((scale, index) => {
        const step = width / scale;

        // Scaling Function (Vater)
        const scalingData = Array.from({ length: scale + 1 }, (_, i) => ({
            x: baseX + i * step,
            y: baseY + index * 2 * (height + 20),
        }));

        const scalingValues = Array.from({ length: scale }, () => 1 / scale);

        // Rechtecke für Scaling Function zeichnen
        scalingValues.forEach((value, i) => {
            svg.append("rect")
                .attr("x", baseX + i * step)
                .attr("y", baseY + index * 2 * (height + 20) - height / 2)
                .attr("width", step)
                .attr("height", height / 2)
                .style("fill", "blue")
                .style("opacity", 0.5);
        });

        // Wavelet Function (Mutter)
        const waveletData = Array.from({ length: scale * 2 + 1 }, (_, i) => ({
            x: baseX + (i * step) / 2,
            y:
                baseY +
                index * 2 * (height + 20) +
                height +
                20 +
                (i % 4 < 2 ? 0 : height / 2),
        }));

        const waveletLine = d3.line()
            .x(d => d.x)
            .y(d => d.y);

        svg.append("path")
            .datum(waveletData)
            .attr("d", waveletLine)
            .style("fill", "none")
            .style("stroke", "red")
            .style("stroke-width", 2);

        // Skala beschriften
        svg.append("text")
            .attr("x", baseX)
            .attr("y", baseY + index * 2 * (height + 20) - 10)
            .style("font-size", "12px")
            .text(`Scale: ${scale}`);
    });
}

// Haar-Wavelet-Darstellung initialisieren
plotHaarWavelet("chart_haar_wavelet");
