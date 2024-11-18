// Data setup
const observedX = [1, 2, 3, 4];
const observedY = [3, 6, 8, 11];
const beta = [0.5, 2.6, 0.0]; // Estimated coefficients

// Generate predicted data
const predictedX = [];
const predictedY = [];
for (let i = 0; i <= 5; i += 0.1) { // Adjust range from 0 to 5
  predictedX.push(i);
  predictedY.push(beta[0] + beta[1] * i + beta[2] * i ** 2);
}


// Create SVG container with xkcd-style filter
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Add xkcd wiggle filter
svg.append("defs").append("filter")
  .attr("id", "wiggle-filter")
  .html(`
    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="8" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
  `);

// Create scales
const xScale2 = d3.scaleLinear().domain([0, 5]).range([0, width]);
const yScale2 = d3.scaleLinear().domain([0, 12]).range([height, 0]);

// Add axes with xkcd styling
svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale2).tickSize(0))
  .attr("class", "axis xkcd-line")
  .attr("font-family", "Humor Sans")
  .attr("font-size", "large");

svg
  .append("g")
  .call(d3.axisLeft(yScale2))
  .attr("class", "axis xkcd-line")
  .attr("font-family", "Humor Sans")
  .attr("font-size", "large");

// Plot observed points with xkcd-style stroke
svg
  .selectAll(".point")
  .data(observedX)
  .enter()
  .append("circle")
  .attr("class", "point xkcd-line")
  .attr("cx", (d, i) => xScale2(observedX[i]))
  .attr("cy", (d, i) => yScale2(observedY[i]))
  .attr("r", 10)
  .attr("fill", "steelblue")
  .style("filter", "url(#wiggle-filter)");

// Plot predicted line with xkcd-style stroke
const line2 = d3
  .line()
  .x((d, i) => xScale2(predictedX[i]))
  .y((d, i) => yScale2(predictedY[i]))
  .curve(d3.curveMonotoneX); // Smooth line

svg
  .append("path")
  .datum(predictedX)
  .attr("class", "line xkcd-line")
  .attr("fill", "none")
  .attr("stroke", "tomato")
  .attr("stroke-width", 2)
  .style("filter", "url(#wiggle-filter)")
  .attr("d", line2);
