// Function to create the sigmoid regression chart
function createSigmoidRegressionChart() {
  const data = [
    { x: 0, y: 0.05 },
    { x: 1, y: 0.10 },
    { x: 2, y: 0.18 },
    { x: 3, y: 0.30 },
    { x: 4, y: 0.45 },
    { x: 5, y: 0.60 },
    { x: 6, y: 0.75 },
    { x: 7, y: 0.85 },
    { x: 8, y: 0.92 },
    { x: 9, y: 0.97 },
    { x: 10, y: 0.99 }
  ];

  // Chart dimensions
  const width = 300;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };

  // Create SVG container with wiggle filter
  const svg = createSVG('chart_nonlinear_regression', width, height, margin);

  // Create scales
  const x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

  // Add axes with xkcd styling
  addAxes(svg, x, y, width, height, margin, 'x', 'y');

  // Plot data points
  svg.selectAll('.point')
    .data(data)
    .join('circle')
    .attr('class', 'point xkcd-line')
    .attr('cx', d => x(d.x))
    .attr('cy', d => y(d.y))
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .style('filter', 'url(#wiggle-filter)');

  // Sigmoid function definition
  function sigmoid(x, params) {
    const { a, b, c } = params;
    return c / (1 + Math.exp(-a * (x - b)));
  }

  // Fit the sigmoid function to the data
  function fitSigmoid(data) {
    // Initial parameter guesses
    let params = { a: 1, b: 5, c: 1 };

    // Loss function (sum of squared errors)
    function loss(params) {
      return d3.sum(data, d => {
        const yPred = sigmoid(d.x, params);
        return Math.pow(d.y - yPred, 2);
      });
    }

    // Optimization using gradient descent
    function optimize(params, learningRate = 0.01, iterations = 1000) {
      for (let i = 0; i < iterations; i++) {
        const gradients = {
          a: 0,
          b: 0,
          c: 0
        };
        for (const d of data) {
          const x = d.x;
          const y = d.y;
          const yPred = sigmoid(x, params);
          const error = yPred - y;
          const expTerm = Math.exp(-params.a * (x - params.b));

          gradients.a += error * params.c * (x - params.b) * expTerm / Math.pow(1 + expTerm, 2);
          gradients.b += error * params.c * params.a * expTerm / Math.pow(1 + expTerm, 2);
          gradients.c += error / (1 + expTerm);
        }
        // Update parameters
        params.a -= learningRate * gradients.a;
        params.b -= learningRate * gradients.b;
        params.c -= learningRate * gradients.c;
      }
      return params;
    }

    const fittedParams = optimize(params);
    return fittedParams;
  }

  const fittedParams = fitSigmoid(data);

  // Generate fitted sigmoid curve data
  const sigmoidLineData = [];
  for (let xi = 0; xi <= 10; xi += 0.1) {
    const yi = sigmoid(xi, fittedParams);
    sigmoidLineData.push({ x: xi, y: yi });
  }

  // Draw fitted sigmoid curve
  const lineGenerator = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y))
    .curve(d3.curveMonotoneX);

  svg.append('path')
    .datum(sigmoidLineData)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .attr('class', 'xkcd-line')
    .style('filter', 'url(#wiggle-filter)')
    .attr('d', lineGenerator);
}

// Call the function to create the chart
createSigmoidRegressionChart();
