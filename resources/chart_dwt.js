function plotHaarWavelet(chartId) {
    const svg = d3
        .select(`#${chartId}`)
        .append("svg")
        .attr("width", 800)
        .attr("height", 500);

    const scales = [2, 4, 8]; // Verschiedene Skalen
    const baseX = 50; // Startposition auf der x-Achse
    const baseY = 50; // Startposition auf der y-Achse
    const width = 300; // Breite der Darstellung
    const height = 50; // Höhe jedes Wavelets

    scales.forEach((scale, index) => {
        const step = width / scale;

        // Scaling Function (Vaterfunktion)
        const scalingValues = Array.from({ length: scale }, () => 1 / scale);
        const scalingData = [];

        scalingValues.forEach((value, i) => {
            scalingData.push(
                { x: baseX + i * step, y: baseY + index * 2 * (height + 20) + height / 2 - value * height },
                { x: baseX + (i + 1) * step, y: baseY + index * 2 * (height + 20) + height / 2 - value * height }
            );

            // Marker für Scaling Function
            svg.append("circle")
                .attr("cx", baseX + (i + 0.5) * step)
                .attr("cy", baseY + index * 2 * (height + 20) + height / 2 - value * height)
                .attr("r", 4)
                .style("fill", "blue");

            // Werte für Scaling Function
            svg.append("text")
                .attr("x", baseX + width + 10) // Rechts neben der Darstellung
                .attr("y", baseY + index * 2 * (height + 20) + height / 2 - value * height + 5)
                .style("font-size", "12px")
                .style("fill", "blue")
                .text(value.toFixed(2));
        });

        const scalingLine = d3.line()
            .x(d => d.x)
            .y(d => d.y);

        svg.append("path")
            .datum(scalingData)
            .attr("d", scalingLine)
            .style("fill", "none")
            .style("stroke", "blue")
            .style("stroke-width", 2);

        // Wavelet Function (Mutterfunktion)
        const waveletValues = [];
        for (let i = 0; i < scale; i++) {
            let value = (i < scale / 2) ? (1 / scale) : (-1 / scale);
            waveletValues.push(value);
        }
        const waveletData = [];

        waveletValues.forEach((value, i) => {
            waveletData.push(
                { x: baseX + i * step, y: baseY + index * 2 * (height + 20) + height + 20 + height / 2 - value * height },
                { x: baseX + (i + 1) * step, y: baseY + index * 2 * (height + 20) + height + 20 + height / 2 - value * height }
            );

            // Marker für Wavelet Function
            svg.append("circle")
                .attr("cx", baseX + (i + 0.5) * step)
                .attr("cy", baseY + index * 2 * (height + 20) + height + 20 + height / 2 - value * height)
                .attr("r", 4)
                .style("fill", "red");

            // Werte für Wavelet Function
            svg.append("text")
                .attr("x", baseX + width + 10) // Rechts neben der Darstellung
                .attr("y", baseY + index * 2 * (height + 20) + height + 20 + height / 2 - value * height + 5)
                .style("font-size", "12px")
                .style("fill", "red")
                .text(value.toFixed(2));
        });

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
            .text(`Skala: ${scale}`);
    });
}

// Haar-Wavelet-Darstellung initialisieren
plotHaarWavelet("chart_haar_wavelet");
