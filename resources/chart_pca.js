// we use the the kmeansData1 data
createXYLineChart("pca_intro1", kmeansData1, "x", "y", "x", "y",  false, true, false, -6, 6, -6, 6);
createXYLineChart("pca_intro2", kmeansData1, "x", "y", "x", "y",  false, true, false, -6, 6, -6, 6);




// Function to rotate the coordinate system
function rotateCoordinates(data, angle) {
    const radians = (Math.PI / 180) * angle;
    return data.map(point => {
        const xRotated = point.x * Math.cos(radians) - point.y * Math.sin(radians);
        const yRotated = point.x * Math.sin(radians) + point.y * Math.cos(radians);
        return { x: xRotated, y: yRotated };
    });
}

// Function to adjust the angle between axes
function adjustAxisAngle(data, axisAngle) {
    const radians = (Math.PI / 180) * axisAngle;
    return data.map(point => {
        const xAdjusted = point.x;
        const yAdjusted = point.y * Math.cos(radians); // adjust y based on axis angle
        return { x: xAdjusted, y: yAdjusted };
    });
}

// Event listeners for sliders
const phiSlider = document.getElementById('phiSlider');
const rhoSlider = document.getElementById('rhoSlider');
const phiValueDisplay = document.getElementById('phiValue');
const rhoValueDisplay = document.getElementById('rhoValue');

// Function to apply both rotation and axis-angle adjustments based on slider values
function updateTransformation(data, rotationAngle, axisAngle) {
    // Step 1: Rotate the coordinates
    const radiansRotation = (Math.PI / 180) * rotationAngle;
    const rotatedData = data.map(point => {
        const xRotated = point.x * Math.cos(radiansRotation) - point.y * Math.sin(radiansRotation);
        const yRotated = point.x * Math.sin(radiansRotation) + point.y * Math.cos(radiansRotation);
        return { x: xRotated, y: yRotated };
    });

    // Step 2: Adjust axis angle
    const radiansAxis = (Math.PI / 180) * axisAngle;
    const transformedData = rotatedData.map(point => {
        const xAdjusted = point.x;
        const yAdjusted = point.y * Math.cos(radiansAxis); // adjust y based on axis angle
        return { x: xAdjusted, y: yAdjusted };
    });

    return transformedData;
}

// Function to update chart based on both sliders
function updateChart() {
    const rotationAngle = parseInt(phiSlider.value, 10);
    const axisAngle = parseInt(rhoSlider.value, 10);

    // Update slider value displays
    phiValueDisplay.textContent = rotationAngle;
    rhoValueDisplay.textContent = axisAngle;

    // Apply transformation and update chart
    const transformedData = updateTransformation(kmeansData1, rotationAngle, axisAngle);
    createXYLineChart("pca_intro2", transformedData, "x", "y", "x", "y", false, true, false, -6, 6, -6, 6);
}

// Function to create a bar chart with custom plot height
function createBarChart(containerId, data, labels, title, height = 150) {
    const svgWidth = 500; // width of SVG
    const svgHeight = height; // height of SVG as per input

    const svg = d3.select(`#${containerId}`)
        .html("") // clear any previous SVG content
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const xScale = d3.scaleBand()
        .domain(labels)
        .range([0, svgWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([svgHeight - 20, 20]); // add padding at the top and bottom

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xScale(labels[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => svgHeight - 20 - yScale(d))
        .attr("fill", "#118ab2");

    svg.append("g")
        .attr("transform", `translate(0,${svgHeight - 20})`)
        .call(d3.axisBottom(xScale).tickValues([])); // x-axis without labels

    svg.append("g")
        .attr("transform", "translate(40,0)")
        .call(d3.axisLeft(yScale));
}

// Function to handle updates on bar charts based on sliders
function updateBarCharts() {
    const rotationAngle = parseInt(phiSlider2.value, 10);
    const axisAngle = parseInt(rhoSlider2.value, 10);

    // Display slider values
    phiValue2.textContent = rotationAngle;
    rhoValue2.textContent = axisAngle;

    // Apply transformation on data
    const transformedData = updateTransformation(kmeansData1, rotationAngle, axisAngle);

    // Create labels (indices of data points)
    const labels = transformedData.map((_, index) => index);

    // Extract new x and y values after transformation
    const newXValues = transformedData.map(point => point.x);
    const newYValues = transformedData.map(point => point.y);

    // Update bar charts with transformed x and y values
    createBarChart("pca_intro3", newXValues, labels, "Transformed X Values", 150);
    createBarChart("pca_intro4", newYValues, labels, "Transformed Y Values", 150);
}


// Event listeners for sliders
phiSlider.addEventListener('input', updateChart);
rhoSlider.addEventListener('input', updateChart);

// Add event listeners for sliders to update bar charts
phiSlider2.addEventListener('input', updateBarCharts);
rhoSlider2.addEventListener('input', updateBarCharts);



// Fixed matrix with a known eigenvector, e.g., [[3, 2], [1, 5]]
const matrix_A = [[3, 2], [1, 5]];

// Initial vector with sliders
let v = [0, 2];

// Function to transform vector by matrix A
function transformVector(v) {
    return [
        matrix_A[0][0] * v[0] + matrix_A[0][1] * v[1],
        matrix_A[1][0] * v[0] + matrix_A[1][1] * v[1]
    ];
}

// Function to plot the original and transformed vectors
function updatePlot() {
    // Get current vector values from sliders
    v[0] = parseFloat(document.getElementById("v1").value);
    v[1] = parseFloat(document.getElementById("v2").value);
    
    // Update slider labels
    document.getElementById("v1Label").textContent = v[0].toFixed(1);
    document.getElementById("v2Label").textContent = v[1].toFixed(1);

    // Apply transformation
    const transformedV = transformVector(v);

    // Plot setup with D3.js
    const svg = d3.select("#eigenvector_plot")
                  .html("")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", 200);

    const centerX = 200, centerY = 200;

    // Scale for vectors (adjusted to fit the plot area)
    const scale = d3.scaleLinear().domain([-10, 10]).range([-150, 150]);

    // Plot the original vector in blue
    svg.append("line")
       .attr("x1", centerX)
       .attr("y1", centerY)
       .attr("x2", centerX + scale(v[0]))
       .attr("y2", centerY - scale(v[1]))
       .attr("stroke", "blue")
       .attr("stroke-width", 2)
       .attr("marker-end", "url(#arrow)");

    // Plot the transformed vector in red
    svg.append("line")
       .attr("x1", centerX)
       .attr("y1", centerY)
       .attr("x2", centerX + scale(transformedV[0]))
       .attr("y2", centerY - scale(transformedV[1]))
       .attr("stroke", "red")
       .attr("stroke-width", 2)
       .attr("stroke-dasharray", "5,5")
       .attr("marker-end", "url(#arrow)");

    // Add arrow markers for end of vectors
    svg.append("defs").append("marker")
       .attr("id", "arrow")
       .attr("viewBox", "0 0 10 10")
       .attr("refX", 5)
       .attr("refY", 5)
       .attr("markerWidth", 6)
       .attr("markerHeight", 6)
       .attr("orient", "auto-start-reverse")
       .append("path")
       .attr("d", "M 0 0 L 10 5 L 0 10 Z")
       .attr("fill", "gray");
}

// Initialize plot and attach event listeners to sliders
updatePlot();
["v1", "v2"].forEach(id => {
    document.getElementById(id).addEventListener("input", updatePlot);
});
