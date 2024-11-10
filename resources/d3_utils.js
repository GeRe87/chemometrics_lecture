// Helper function to create SVG container with xkcd wiggle filter
function createSVG(containerId, width, height, margin) {
    d3.select(`#${containerId}`).selectAll("*").remove(); // Clear existing content

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add wiggle filter for xkcd style
    svg.append("defs").append("filter")
        .attr("id", "wiggle-filter")
        .html(`
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        `);

    return svg;
}

 // Helper function to create scales for line chart
 function createXYScales(data, width, height, xKey, yKey) {
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d[xKey]))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yKey])])
        .nice()
        .range([height, 0]);

    return { x, y };
}

// Helper function to create scales
function createScales(data, metals, width, height) {
    const x0 = d3.scaleBand()
        .domain(data.map(d => d.sample))
        .range([0, width])
        .padding(0.2);

    const x1 = d3.scaleBand()
        .domain(metals)
        .range([0, x0.bandwidth()])
        .padding(0.05);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(...metals.map(metal => d[metal])))])
        .nice()
        .range([height, 0]);

    return { x0, x1, y };
}

// Helper function to add axes
function addAxes(svg, xScale, yScale, width, height, margin) {
    // X-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .attr("class", "axis xkcd-line")
        .attr("font-family", "Humor Sans")
        .attr("font-size", "large")
        .append("text")
        .attr("y", margin.bottom - 10)
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text("Sample");

    // Y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .attr("class", "axis xkcd-line")
        .attr("font-family", "Humor Sans")
        .attr("font-size", "large")
        .append("text")
        .attr("y", -margin.left + 15)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .text("Concentration");
}

// Helper function to add legend
function addLegend(svg, metals, colorScale, width) {
    const legend = svg.append("g")
        .attr("transform", `translate(${width-10}, 0)`)
        .selectAll("g")
        .data(metals)
        .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => colorScale(d));

    legend.append("text")
        .attr("font-family", "Humor Sans")
        .attr("x", 20)
        .attr("y", 12)
        .text(d => d);
}

// Helper function to add grid lines with xkcd style
function addGrid(svg, xScale, yScale, width, height) {
    // Add horizontal grid lines with xkcd style
    svg.append("g")
        .attr("class", "grid-line")
        .style("filter", "url(#wiggle-filter)") // Apply xkcd wiggle filter
        .call(d3.axisLeft(yScale)
            .tickSize(-width)
            .tickFormat("")
        );

    // Add vertical grid lines with xkcd style
    svg.append("g")
        .attr("class", "grid-line")
        .style("filter", "url(#wiggle-filter)") // Apply xkcd wiggle filter
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
            .tickSize(-height)
            .tickFormat("")
        );
}


// Main charting function with xkcd styling
function createGroupedBarChart(containerId, data) {
    // Chart dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 20, right: 50, bottom: 50, left: 70 };

    // Create SVG container with wiggle filter
    const svg = createSVG(containerId, width, height, margin);

    // Extract metal keys dynamically
    const metals = Object.keys(data[0]).filter(key => key !== 'sample');

    // Create scales
    const { x0, x1, y } = createScales(data, metals, width, height);

    // Color scale for metals
    const color = d3.scaleOrdinal()
        .domain(metals)
        .range(["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"]);

    // Add axes with xkcd styling
    addAxes(svg, x0, y, width, height, margin);

    // Add bars for each metal within each sample
    svg.selectAll("g.layer")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x0(d.sample)},0)`)
        .selectAll("rect")
        .data(d => metals.map(metal => ({ key: metal, value: d[metal] })))
        .join("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.key))
        .attr("class", "bar") // Adds xkcd-style stroke to bars
        .style("filter", "url(#wiggle-filter)"); // Apply wiggle filter

    // Add legend with xkcd styling
    addLegend(svg, metals, color, width);
}

 // Main function to create XY line chart with optional markers and grid
 function createXYLineChart(containerId, data, xKey, yKey, showMarkers = false, showGrid = false) {
    // Chart dimensions
    const width = 300;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };

    // Create SVG container with wiggle filter
    const svg = createSVG(containerId, width, height, margin);

    // Create scales
    const { x, y } = createXYScales(data, width, height, xKey, yKey);

    // Add axes with xkcd styling
    addAxes(svg, x, y, width, height, margin);

    // Optionally add grid
    if (showGrid) {
        addGrid(svg, x, y, width, height);
    }

    // Define line generator
    const line = d3.line()
        .x(d => x(d[xKey]))
        .y(d => y(d[yKey]))
        .curve(d3.curveCatmullRom.alpha(0.5)); // Smooth line with curve

    // Draw line with xkcd styling
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("class", "xkcd-line")
        .style("filter", "url(#wiggle-filter)") // Apply wiggle filter
        .attr("d", line);

    // Optionally add markers
    if (showMarkers) {
        svg.selectAll(".marker")
            .data(data)
            .join("circle")
            .attr("class", "marker xkcd-line")
            .attr("cx", d => x(d[xKey]))
            .attr("cy", d => y(d[yKey]))
            .attr("r", 5)
            .attr("fill", "red")
            .style("filter", "url(#wiggle-filter)"); // Apply wiggle filter
    }
}