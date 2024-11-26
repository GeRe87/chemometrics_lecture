function createCookDistanceWeightedRegressionChart() {
  // Data points with an outlier at the last point
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 5, y: 10 },
    { x: 10, y: 20 },
    { x: 50, y: 50 } // Outlier
  ];

  // Chart dimensions
  const width = 500;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 70, left: 70 };

  // Create SVG container
  const svg = createSVG('weighted_regression_chart', width, height, margin);

  // Create scales
  const xScale = d3.scaleLinear()
    .domain([0, 60])
    .range([0, width - margin.left - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, 60])
    .range([height, 0]);

  // Add axes
  addAxes(svg, xScale, yScale, width, height, margin, 'X', 'Y');

  // Plot data points
  svg.selectAll('.point')
    .data(data)
    .join('circle')
    .attr('class', 'point xkcd-line')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 10)
    .attr('fill', 'steelblue')
    .style('filter', 'url(#wiggle-filter)');

  // Perform Ordinary Least Squares (OLS) regression
  const olsResult = olsRegression(data);

  // Calculate Cook's Distance and weights
  const cooksDistances = calculateCooksDistance(data, olsResult);
  const weights = cooksDistances.map(D => 1 / (1 + D));

  // Perform Weighted Least Squares (WLS) regression using Cook's Distance weights
  const wlsResult = wlsRegression(data, weights);

  // Generate data for regression lines
  const regressionData = d3.range(0, 60, 0.1).map(x => {
    return {
      x: x,
      y_ols: olsResult.intercept + olsResult.slope * x,
      y_wls: wlsResult.intercept + wlsResult.slope * x
    };
  });

  // Plot OLS regression line
  const lineGenerator = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y_ols))
    .curve(d3.curveCatmullRom.alpha(0.5));

  svg.append('path')
    .datum(regressionData)
    .attr('class', 'ols-line xkcd-line')
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .style('filter', 'url(#wiggle-filter)')
    .attr('d', lineGenerator);

  // Plot WLS regression line
  const lineGeneratorWLS = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y_wls))
    .curve(d3.curveCatmullRom.alpha(0.5));

  svg.append('path')
    .datum(regressionData)
    .attr('class', 'wls-line xkcd-line')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 3)
    .style('filter', 'url(#wiggle-filter)')
    .attr('d', lineGeneratorWLS);

  // Add legend
  // svg.append('text')
  //   .attr('x', 10)
  //   .attr('y', height - margin.bottom + 40)
  //   .style('font-family', 'Humor Sans')
  //   .style('font-size', 'large')
  //   .text('— OLS');

  // svg.append('text')
  //   .attr('x', 150)
  //   .attr('y', height - margin.bottom + 40)
  //   .style('font-family', 'Humor Sans')
  //   .style('font-size', 'large')
  //   .style('fill', 'green')
  //   .text('— WLS');

  // Function to perform OLS regression
  function olsRegression(data) {
    const n = data.length;
    const sumX = d3.sum(data, d => d.x);
    const sumY = d3.sum(data, d => d.y);
    const sumXY = d3.sum(data, d => d.x * d.y);
    const sumX2 = d3.sum(data, d => d.x * d.x);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  // Function to calculate Cook's Distance for each observation
  function calculateCooksDistance(data, olsResult) {
    const n = data.length;
    const p = 2; // Number of parameters (intercept and slope)
    const residuals = data.map(d => d.y - (olsResult.intercept + olsResult.slope * d.x));

    // Compute Hat Matrix H
    const X = data.map(d => [1, d.x]); // Design matrix
    const Xt = math.transpose(X);
    const XtX = math.multiply(Xt, X);
    const XtX_inv = math.inv(XtX);
    const H = math.multiply(math.multiply(X, XtX_inv), Xt);

    // Extract leverage values h_ii
    const h_ii = [];
    for (let i = 0; i < n; i++) {
      h_ii.push(H[i][i]);
    }

    // Estimate variance of residuals
    const RSS = residuals.reduce((sum, r) => sum + r * r, 0);
    const mse = RSS / (n - p);

    // Calculate Cook's Distance for each observation
    const cooksDistances = [];
    for (let i = 0; i < n; i++) {
      const e_i = residuals[i];
      const h_i = h_ii[i];
      const D_i = (e_i * e_i) / (p * mse) * (h_i / ((1 - h_i) * (1 - h_i)));
      cooksDistances.push(D_i);
    }

    return cooksDistances;
  }

  // Function to perform Weighted Least Squares regression using weights
  function wlsRegression(data, weights) {
    // Create weight matrix W
    const W = math.diag(weights);

    // Construct X and y
    const X = data.map(d => [1, d.x]);
    const y = data.map(d => d.y);

    // Perform weighted regression using normal equations
    const Xt = math.transpose(X);
    const XtW = math.multiply(Xt, W);
    const XtWX = math.multiply(XtW, X);
    const XtWy = math.multiply(XtW, y);

    const beta = math.multiply(math.inv(XtWX), XtWy);
    const intercept = beta[0];
    const slope = beta[1];

    return { slope, intercept };
  }
}

createCookDistanceWeightedRegressionChart();
