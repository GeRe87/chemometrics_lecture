function createLogisticRegressionChart(containerId) {
  // Generate training data
  const trainingData = [
      { z: -8, label: 0 }, { z: -7, label: 0 }, { z: -6, label: 0 },
      { z: -3, label: 0 }, { z: -2, label: 0 },
      { z: 2, label: 1 }, { z: 3, label: 1 }, { z: 4, label: 1 },
      { z: 7, label: 1 }, { z: 8, label: 1 },
  ];

  // Generate sigmoid function points
  const sigmoidData = Array.from({ length: 200 }, (_, i) => {
      const z = -10 + (20 / 199) * i; // z ranges from -10 to 10
      return { z, P: 1 / (1 + Math.exp(-z)) };
  });

  // Chart dimensions
  const width = 300;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };

  // Create SVG container
  const svg = createSVG(containerId, width, height, margin);

  // Create scales
  const x = d3.scaleLinear()
      .domain([-10, 10]) // z ranges from -10 to 10
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, 1]) // P ranges from 0 to 1
      .range([height, 0]);

  // Add axes
  addAxes(svg, x, y, width, height, margin, "z (normalized property)", "P (Probability)");

  // Draw sigmoid curve
  const line = d3.line()
      .x(d => x(d.z))
      .y(d => y(d.P))
      .curve(d3.curveCatmullRom.alpha(0.5)); // Smooth curve

  svg.append("path")
      .datum(sigmoidData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 4)
      .attr("class", "xkcd-line")
      .style("filter", "url(#wiggle-filter)") // Apply xkcd wiggle filter
      .attr("d", line);

  // Add horizontal threshold line at P = 0.5
  svg.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(0.5))
      .attr("y2", y(0.5))
      .attr("stroke", "red")
      .attr("stroke-dasharray", "5,5")
      .attr("stroke-width", 2);

  // Add label for threshold
  svg.append("text")
      .attr("x", width - 10)
      .attr("y", y(0.5) - 10)
      .attr("text-anchor", "end")
      .attr("fill", "red")
      .style("font-family", "Humor Sans")
      .text("P = 0.5 (Decision Boundary)");

  // Plot training data points
  svg.selectAll(".training-point")
      .data(trainingData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.z))
      .attr("cy", d => y(d.label))
      .attr("r", 5)
      .attr("fill", d => (d.label === 0 ? "orange" : "green"))
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("class", "training-point")
      .style("filter", "url(#wiggle-filter)"); // Apply xkcd wiggle filter

  // Add legend for training points
  const legend = svg.append("g")
      .attr("transform", `translate(${width - 120}, ${height - 50})`);

  legend.append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 5)
      .attr("fill", "orange")
      .attr("stroke", "black");

  legend.append("text")
      .attr("x", 20)
      .attr("y", 14)
      .text("Class 0")
      .style("font-family", "Humor Sans");

  legend.append("circle")
      .attr("cx", 10)
      .attr("cy", 30)
      .attr("r", 5)
      .attr("fill", "green")
      .attr("stroke", "black");

  legend.append("text")
      .attr("x", 20)
      .attr("y", 34)
      .text("Class 1")
      .style("font-family", "Humor Sans");
}

// Call the function in your Reveal.js setup
createLogisticRegressionChart("chart_logistic1");


