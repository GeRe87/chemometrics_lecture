
// JavaScript file for creating regression examples

// Generate data for the regression examples
function generateData() {
    const data = [];
    for (let x = -10; x <= 10; x += 0.5) {
        const noise = Math.random() * 2 - 1; // Add noise to the data
        const y = Math.sin(x / 2) + noise; // Sine wave with noise
        data.push({ x, y });
    }
    return data;
}

// Create a D3 chart for a given container and regression model
function createChart(containerId, data, model, modelLabel) {
    const width = 350;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.y) - 1,
            d3.max(data, d => d.y) + 1
        ])
        .range([height, 0]);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Points
    svg.selectAll(".point")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 3)
        .attr("fill", "steelblue");

    // Regression line
    const regressionLine = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(model(d.x)));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", regressionLine);

    // Add label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text(modelLabel);
}

// Regression models
function linearModel(x) {
    return 0.5 * x; // Example of a simple linear model (Underfitting)
}

function overfitModel(x) {
    // Example of an overfitted polynomial model
    return (
        0.05 * Math.pow(x, 5) -
        0.3 * Math.pow(x, 3) +
        0.5 * x +
        Math.random() * 0.5 // Add some random variability for noise
    );
}

function generalizedModel(x) {
    return Math.sin(x / 2); // Generalized sine wave (ideal model)
}

// Main function to create all charts
function createRegressionCharts() {
    const data = generateData();

    createChart("chart_underfit", data, linearModel, "Underfitting");
    createChart("chart_overfit", data, overfitModel, "Overfitting");
    createChart("chart_general", data, generalizedModel, "Generalization");
}

// Call the main function after DOM is loaded
document.addEventListener("DOMContentLoaded", createRegressionCharts);
