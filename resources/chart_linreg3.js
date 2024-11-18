// Data for observed points
const observedData = [
    { x: 1, y: 3 },
    { x: 2, y: 6 },
    { x: 3, y: 8 },
    { x: 4, y: 11 }
  ];
  
  // Data for predicted points and confidence intervals
  const predictedData = [
    { x: 0, y: 0.5, ci_lower: -1.86, ci_upper: 2.86, pi_lower: -2.54, pi_upper: 3.54 },
    { x: 1, y: 3.1, ci_lower: 1.49, ci_upper: 4.71, pi_lower: 0.59, pi_upper: 5.61 },
    { x: 2, y: 5.7, ci_lower: 4.64, ci_upper: 6.76, pi_lower: 3.51 , pi_upper: 7.89 },
    { x: 3, y: 8.3, ci_lower: 7.24, ci_upper: 9.36, pi_lower: 6.11, pi_upper: 10.49 },
    { x: 4, y: 11.0, ci_lower: 9.29 , ci_upper: 12.51, pi_lower: 8.39, pi_upper: 13.41 },
    { x: 5, y: 13.6, ci_lower: 11.14, ci_upper: 15.86, pi_lower: 10.46, pi_upper: 16.54 }
  ];
  
  // Create a new SVG container
  const svg3 = d3
    .select("#chart_linreg3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Scales for x and y axes
  const xScale3 = d3.scaleLinear().domain([0, 5]).range([0, width]);
  const yScale3 = d3.scaleLinear().domain([0, 18]).range([height, 0]);
  
  // Add x-axis
  svg3
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale3).tickSize(0))
    .attr("class", "axis xkcd-line")
    .attr("font-family", "Humor Sans")
    .attr("font-size", "large");
  
  // Add y-axis
  svg3
    .append("g")
    .call(d3.axisLeft(yScale3))
    .attr("class", "axis xkcd-line")
    .attr("font-family", "Humor Sans")
    .attr("font-size", "large");

     // Add prediction interval as an area
svg3
.append("path")
.datum(predictedData)
.attr("fill", "mediumvioletred")
.attr("stroke", "none")
.attr("opacity", 0.2)
.attr("d", d3.area()
    .x(d => xScale3(d.x))
    .y0(d => yScale3(d.pi_lower))
    .y1(d => yScale3(d.pi_upper))
);
  
  // Add confidence interval as an area
svg3
    .append("path")
    .datum(predictedData)
    .attr("fill", "mediumvioletred")
    .attr("stroke", "none")
    .attr("opacity", 0.5)
    .attr("d", d3.area()
        .x(d => xScale3(d.x))
        .y0(d => yScale3(d.ci_lower))
        .y1(d => yScale3(d.ci_upper))
    );

   
  
  // Add predicted line
  svg3
    .append("path")
    .datum(predictedData)
    .attr("fill", "none")
    .attr("stroke", "tomato")
    .attr("stroke-width", 2)
    .attr("class", "line xkcd-line")
    .style("filter", "url(#wiggle-filter)")
    .attr("d", d3.line()
      .x(d => xScale3(d.x))
      .y(d => yScale3(d.y))
    );
  
  // Add observed points
  svg3
    .selectAll(".point")
    .data(observedData)
    .enter()
    .append("circle")
    .attr("class", "point xkcd-line")
    .attr("cx", d => xScale3(d.x))
    .attr("cy", d => yScale3(d.y))
    .attr("r", 6)
    .attr("fill", "black")
    .style("filter", "url(#wiggle-filter)");
  