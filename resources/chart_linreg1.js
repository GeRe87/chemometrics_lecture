// Dataset for linear regression example
const data_linreg1 = [
    { x: 0, y: 1.0 },
    { x: 1, y: 2.2 },
    { x: 2, y: 2.8 },
    { x: 3, y: 4.5 },
    { x: 4, y: 3.7 },
    { x: 5, y: 5.1 }
];

// Initialize default coefficients
let b0 = 0;
let b1 = 1;

// Create the charts
const width = 400, height = 300, margin = { top: 20, right: 30, bottom: 50, left: 50 };

// Scales
const xScale = d3.scaleLinear().domain([0, 6]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 6]).range([height, 0]);
const residualYScale = d3.scaleLinear().domain([0, 5]).range([height, 0]);

// Create SVG containers with xkcd styling
const svg1 = createSVG("chart_linreg1", width, height, margin);
const svg2 = createSVG("chart_linreg2", width, height, margin);

// Axes for scatter plot
addAxes(svg1, xScale, yScale, width, height, margin, "x (Input)", "y (Observed)");
addAxes(svg2, xScale, residualYScale, width, height, margin, "x (Input)", "Residuals");

// Line generator with xkcd-style curves
const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(b0 + b1 * d.x))
    .curve(d3.curveCatmullRom.alpha(0.5)); // Smooth curve

// Function to update plots
function updatePlots() {
    // Update regression line
    const regressionLine = svg1.selectAll(".regression-line").data([data_linreg1]);
    regressionLine.enter().append("path")
        .attr("class", "regression-line xkcd-line")
        .merge(regressionLine)
        .attr("d", line)
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .style("filter", "url(#wiggle-filter)"); // Apply xkcd wiggle filter
    regressionLine.exit().remove();

    // Update data points
    const points = svg1.selectAll(".point").data(data_linreg1);
    points.enter().append("circle")
        .attr("class", "point xkcd-line")
        .attr("r", 5)
        .attr("fill", "blue")
        .merge(points)
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .style("filter", "url(#wiggle-filter)"); // Apply xkcd wiggle filter
    points.exit().remove();

    // Calculate residuals
    const residuals = data_linreg1.map(d => ({ x: d.x, residual: Math.abs(d.y - (b0 + b1 * d.x)) }));

    // Update residual plot
    const bars = svg2.selectAll(".bar").data(residuals);
    bars.enter().append("rect")
        .attr("class", "bar xkcd-line")
        .attr("fill", "steelblue")
        .merge(bars)
        .attr("x", d => xScale(d.x) - 10)
        .attr("y", d => residualYScale(d.residual))
        .attr("width", 20)
        .attr("height", d => height - residualYScale(d.residual))
        .style("filter", "url(#wiggle-filter)"); // Apply xkcd wiggle filter
    bars.exit().remove();
}

// Initial plot
updatePlots();

// Event listeners for sliders
document.getElementById("b0-slider").addEventListener("input", (event) => {
    b0 = parseFloat(event.target.value);
    document.getElementById("b0-value").textContent = b0.toFixed(1);
    updatePlots();
});

document.getElementById("b1-slider").addEventListener("input", (event) => {
    b1 = parseFloat(event.target.value);
    document.getElementById("b1-value").textContent = b1.toFixed(1);
    updatePlots();
});
