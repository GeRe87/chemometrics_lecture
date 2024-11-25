// Function to create the chart of common non-linear functions
function createNonLinearFunctionsChart() {
  // Chart dimensions
  const width = 400;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };

  // Create SVG container with wiggle filter
  const svg = createSVG('chart_nonlinear_functions', width, height, margin);

  // Define the x and y scales
  const x = d3.scaleLinear()
    .domain([0.1, 10])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([-5, 15])
    .range([height, 0]);

  // Add axes with xkcd styling
  addAxes(svg, x, y, width, height, margin, 'x', 'y');

  // Define the functions
  const functions = [
    {
      name: 'Exponential',
      color: '#457b9d',
      func: x => 2 * Math.exp(0.8 * x)
    },
    {
      name: 'Reciprocal',
      color: '#2a9d8f',
      func: x => 10 / x
    },
    {
      name: 'Logarithmic',
      color: '#f4a261',
      func: x => 2 * Math.log(x) + 1
    },
    {
      name: 'Sigmoid',
      color: '#9d4edd',
      func: x => 10 / (1 + Math.exp(-2 * (x - 5)))
    }
  ];

  // Generate data points for each function
  functions.forEach(f => {
    const data = [];
    for (let xi = 0.1; xi <= 10; xi += 0.1) {
      data.push({ x: xi, y: f.func(xi) });
    }

    // Draw the function line
    const lineGenerator = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', f.color)
      .attr('stroke-width', 2)
      .attr('class', 'xkcd-line')
      .style('filter', 'url(#wiggle-filter)')
      .attr('d', lineGenerator);

    // Add function labels at the end of each line
    svg.append('text')
      .datum(data[data.length - 1])
      .attr('x', d => x(d.x) + 5)
      .attr('y', d => y(d.y))
      .attr('fill', f.color)
      .attr('font-size', '12px')
      .attr('font-family', 'Humor Sans')
      .text(f.name);
  });
}

// Call the function to create the chart
createNonLinearFunctionsChart();
