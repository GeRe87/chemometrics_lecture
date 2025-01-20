function createDoEIntroChart(containerId) {
    // Data: Example factors and response
    const data = [
        { Temperature: "Low", pH: "Low", Efficiency: 60 },
        { Temperature: "Low", pH: "High", Efficiency: 70 },
        { Temperature: "High", pH: "Low", Efficiency: 80 },
        { Temperature: "High", pH: "High", Efficiency: 90 }
    ];

    // Chart dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Create SVG container
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scalePoint()
        .domain(["Low", "High"])
        .range([0, width])
        .padding(.2);

    const y = d3.scalePoint()
        .domain(["Low", "High"])
        .range([height, 0])
        .padding(.2);

    const color = d3.scaleLinear()
        .domain([60, 90]) // Efficiency range
        .range(["red", "darkblue"]);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(2));

    svg.append("g")
        .call(d3.axisLeft(y).ticks(2));

    // Points
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.Temperature))
        .attr("cy", d => y(d.pH))
        .attr("r", 30)
        .attr("fill", d => color(d.Efficiency))
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

    // Labels for points
    svg.selectAll("text.label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("x", d => x(d.Temperature))
        .attr("y", d => y(d.pH) + 5)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .text(d => `${d.Efficiency}%`);

    // Chart Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Degradation Efficiency by Temperature and pH");

    // Axis Labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("Temperature")
        .style("font-size", "14px")
        .style("font-weight", "bold");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("pH")
        .style("font-size", "14px")
        .style("font-weight", "bold");
}

function createDoE3DChart(containerId) {
    // Data: Factors and response
    const data = [
        { Temperature: "Low", pH: "Low", Concentration: "Low", Efficiency: 60 },
        { Temperature: "Low", pH: "High", Concentration: "Low", Efficiency: 65 },
        { Temperature: "High", pH: "Low", Concentration: "Low", Efficiency: 70 },
        { Temperature: "High", pH: "High", Concentration: "Low", Efficiency: 75 },
        { Temperature: "Low", pH: "Low", Concentration: "Medium", Efficiency: 65 },
        { Temperature: "Low", pH: "High", Concentration: "Medium", Efficiency: 70 },
        { Temperature: "High", pH: "Low", Concentration: "Medium", Efficiency: 75 },
        { Temperature: "High", pH: "High", Concentration: "Medium", Efficiency: 80 },
        { Temperature: "Low", pH: "Low", Concentration: "High", Efficiency: 70 },
        { Temperature: "Low", pH: "High", Concentration: "High", Efficiency: 75 },
        { Temperature: "High", pH: "Low", Concentration: "High", Efficiency: 80 },
        { Temperature: "High", pH: "High", Concentration: "High", Efficiency: 90 }
    ];

    // Chart dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 150, right: 100, bottom: 50, left: 50 };

    // Create SVG container
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scalePoint()
        .domain(["Low", "High"])
        .range([0, width * 0.6]);

    const y = d3.scalePoint()
        .domain(["Low", "High"])
        .range([height * 0.6, 0]);

    const z = d3.scalePoint()
        .domain(["Low", "Medium", "High"])
        .range([0, 200]); // Simulated depth

    const color = d3.scaleLinear()
        .domain([60, 90]) // Efficiency range
        .range(["red", "darkblue"]);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height * 0.6})`)
        .call(d3.axisBottom(x).ticks(2));

    svg.append("g")
        .call(d3.axisLeft(y).ticks(2));

    // Z-axis simulation
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", height * 0.6)
        .attr("x2", z.range()[1])
        .attr("y2", height * 0.6 - z.range()[1] / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

    svg.append("text")
        .attr("x", z.range()[0] -70)
        .attr("y", height * 0.6 - z.range()[0] / 2 - 30)
        .text("Concentration")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-27)");

    // Add 3D points
    data.forEach(d => {
        const cx = x(d.Temperature);
        const cy = y(d.pH);
        const cz = z(d.Concentration);

        // Connect to origin to simulate depth
        svg.append("line")
            .attr("x1", cx)
            .attr("y1", cy)
            .attr("x2", cx + cz)
            .attr("y2", cy - cz / 2)
            .attr("stroke", "gray")
            .attr("stroke-width", 1);

        // Draw the point
        svg.append("circle")
            .attr("cx", cx + cz)
            .attr("cy", cy - cz / 2)
            .attr("r", 8)
            .attr("fill", color(d.Efficiency))
            .attr("stroke", "black");
    });

    // Connect points with lines
    const combinations = [
        [0, 1], [0, 2], [1, 3], [2, 3], // Concentration Low
        [4, 5], [4, 6], [5, 7], [6, 7], // Concentration Medium
        [8, 9], [8, 10], [9, 11], [10, 11], // Concentration High
        [0, 4], [4, 8], [1, 5], [5, 9], // Low -> Medium -> High for Temperature Low
        [2, 6], [6, 10], [3, 7], [7, 11] // Low -> Medium -> High for Temperature High
    ];

    combinations.forEach(([i, j]) => {
        const d1 = data[i];
        const d2 = data[j];

        const x1 = x(d1.Temperature) + z(d1.Concentration);
        const y1 = y(d1.pH) - z(d1.Concentration) / 2;
        const x2 = x(d2.Temperature) + z(d2.Concentration);
        const y2 = y(d2.pH) - z(d2.Concentration) / 2;

        svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke", "black")
            .attr("stroke-width", 1.5);
    });

    // Axis Labels
    svg.append("text")
        .attr("x", width / 2 - 50)
        .attr("y", height * 0.6 + 20)
        .attr("text-anchor", "middle")
        .text("Temperature")
        .style("font-size", "14px")
        .style("font-weight", "bold");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -20)
        .attr("x", -height * 0.3)
        .attr("text-anchor", "middle")
        .text("pH")
        .style("font-size", "14px")
        .style("font-weight", "bold");
}

function createAnimated3DBox(containerId) {
    // Data for the 3D box corners
    const data = [
        { x: -1, y: -1, z: -1, Efficiency: 60 },
        { x: -1, y: 1, z: -1, Efficiency: 65 },
        { x: 1, y: -1, z: -1, Efficiency: 70 },
        { x: 1, y: 1, z: -1, Efficiency: 75 },
        { x: -1, y: -1, z: 0, Efficiency: 65 },
        { x: -1, y: 1, z: 0, Efficiency: 70 },
        { x: 1, y: -1, z: 0, Efficiency: 75 },
        { x: 1, y: 1, z: 0, Efficiency: 80 },
        { x: -1, y: -1, z: 1, Efficiency: 70 },
        { x: -1, y: 1, z: 1, Efficiency: 75 },
        { x: 1, y: -1, z: 1, Efficiency: 80 },
        { x: 1, y: 1, z: 1, Efficiency: 90 }
    ];

     // Axes labels
     const axesLabels = [
        { label: "pH", x: 1.2, y: 0, z: 0 },
        { label: "Temperature", x: 0, y: -1, z: 1.2 },
        { label: "Concentration", x: 1.2, y: -1, z: 0 }
    ];

     // Fine grid points
     const gridPoints = [];
     for (let x = -1; x <= 1; x += 0.2) {
         for (let y = -1; y <= 1; y += 0.2) {
             for (let z = -1; z <= 1; z += 0.2) {
                 const Efficiency = 60 + 10 * x + 5 * y + 15 * z; // Example interpolation formula
                 gridPoints.push({ x, y, z, Efficiency });
             }
         }
     }

    // Chart dimensions
    const width = 400;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Rotation settings
    let angle = 0;

    // Create SVG container
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Scales for x, y, and z
    const x = d3.scaleLinear().domain([-1, 1]).range([-width / 4, width / 4]);
    const y = d3.scaleLinear().domain([-1, 1]).range([height / 4, -height / 4]);
    const z = d3.scaleLinear().domain([-1, 1]).range([-100, 100]);

    const color = d3.scaleLinear().domain([60, 85]).range(["red", "blue"]);

    // Draw edges of the box
    const edges = [
        [0, 1], [0, 2], [1, 3], [2, 3], // Concentration Low
        [4, 5], [4, 6], [5, 7], [6, 7], // Concentration Medium
        [8, 9], [8, 10], [9, 11], [10, 11], // Concentration High
        [0, 4], [4, 8], [1, 5], [5, 9], // Low -> Medium -> High for Temperature Low
        [2, 6], [6, 10], [3, 7], [7, 11] // Low -> Medium -> High for Temperature High
    ];

    function project(d) {
        const scale = 100 / (200 + z(d.z));
        return {
            x: scale * x(d.x),
            y: scale * y(d.y),
            r: scale * 6, // Scale radius
            opacity: scale
        };
    }

    function updateBox() {
        // Compute rotation matrix
        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);

        // Transform points for rotation
        const rotatedData = data.map(d => ({
            x: cosAngle * d.x - sinAngle * d.z,
            z: sinAngle * d.x + cosAngle * d.z,
            y: d.y,
            Efficiency: d.Efficiency
        }));

        const rotatedGrid = gridPoints.map(d => ({
            x: cosAngle * d.x - sinAngle * d.z,
            z: sinAngle * d.x + cosAngle * d.z,
            y: d.y,
            Efficiency: d.Efficiency
        }));

        // Transform axes labels for rotation
        const rotatedLabels = axesLabels.map(d => ({
            label: d.label,
            x: cosAngle * d.x - sinAngle * d.z,
            z: sinAngle * d.x + cosAngle * d.z,
            y: d.y
        }));

        // Update edges
        svg.selectAll(".edge")
            .data(edges)
            .join("line")
            .attr("class", "edge")
            .attr("x1", d => project(rotatedData[d[0]]).x)
            .attr("y1", d => project(rotatedData[d[0]]).y)
            .attr("x2", d => project(rotatedData[d[1]]).x)
            .attr("y2", d => project(rotatedData[d[1]]).y)
            .attr("stroke", "black")
            .attr("stroke-width", 1.5);

        // Update points
        svg.selectAll(".point")
            .data(rotatedData)
            .join("circle")
            .attr("class", "point")
            .attr("cx", d => project(d).x)
            .attr("cy", d => project(d).y)
            .attr("r", d => project(d).r * (d.Efficiency / 90)) // Larger for higher efficiency
            .attr("fill", d => color(d.Efficiency))
            .style("opacity", d => project(d).opacity);

        // Update fine grid points
        svg.selectAll(".grid-point")
            .data(rotatedGrid)
            .join("circle")
            .attr("class", "grid-point")
            .attr("cx", d => project(d).x)
            .attr("cy", d => project(d).y)
            .attr("r", d => project(d).r * (d.Efficiency / 90) * 0.75) // Smaller for grid points
            .attr("fill", d => color(d.Efficiency))
            .style("opacity", d => 0.25 + (d.Efficiency / 90) * 0.5); // Transparency based on Efficiency

        // Update axes labels
        svg.selectAll(".axis-label")
            .data(rotatedLabels)
            .join("text")
            .attr("class", "axis-label")
            .attr("x", d => project(d).x)
            .attr("y", d => project(d).y)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(d => d.label);
    }

    // Start animation
    d3.timer(() => {
        angle += Math.PI / 720; // Rotate by 1 degree per frame
        updateBox();
    });
}

function createDoEexample1Chart(containerId) {
    // Data: Example factors and response
    const data = [
        { Temperature: "Low", pH: "Low", Efficiency: 0 },
        { Temperature: "Low", pH: "High", Efficiency: 0 },
        { Temperature: "High", pH: "Low", Efficiency: 0 },
        { Temperature: "High", pH: "High", Efficiency: 0 }
    ];

    // Chart dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Create SVG container
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scalePoint()
        .domain(["Low", "High"])
        .range([0, width])
        .padding(.2);

    const y = d3.scalePoint()
        .domain(["Low", "High"])
        .range([height, 0])
        .padding(.2);

    const color = d3.scaleLinear()
        .domain([60, 90]) // Efficiency range
        .range(["red", "darkblue"]);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(2));

    svg.append("g")
        .call(d3.axisLeft(y).ticks(2));

    // Points
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.Temperature))
        .attr("cy", d => y(d.pH))
        .attr("r", 30)
        .attr("fill", d => color(d.Efficiency))
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

    // Labels for points
    // svg.selectAll("text.label")
    //     .data(data)
    //     .join("text")
    //     .attr("class", "label")
    //     .attr("x", d => x(d.Temperature))
    //     .attr("y", d => y(d.pH) + 5)
    //     .attr("text-anchor", "middle")
    //     .style("fill", "white")
    //     .style("font-weight", "bold")
    //     .style("font-size", "12px")
    //     .text(d => `${d.Efficiency}%`);

    // Chart Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Degradation Efficiency by Temperature and pH");

    // Axis Labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("Temperature")
        .style("font-size", "14px")
        .style("font-weight", "bold");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("pH")
        .style("font-size", "14px")
        .style("font-weight", "bold");
}





// Call the function
createDoEIntroChart("doeChart");
createDoE3DChart("doe3dChart");
createAnimated3DBox("doe3dFittedChart");
createDoEexample1Chart("doeExample1Chart");
