// Function to create the exponential regression chart using your helper functions
function createExponentialRegressionChart() {
    // Data points
    const data = [
        { x: 1, y: 2.718 },
        { x: 2, y: 7.389 },
        { x: 3, y: 20.085 }
    ];

    // Initial parameter estimates
    let params = { beta0: 0.9, beta1: 0.8 };

    // Chart dimensions
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };

    // Create SVG container with wiggle filter
    const svg = createSVG('chart_it0', width, height, margin);

    // Create scales
    const xKey = 'x';
    const yKey = 'y';
    const xMin = 0;
    const xMax = 4;
    const yMin = 0;
    const yMax = 25;
    const { x: xScale, y: yScale } = createXYScales(data, width, height, xKey, yKey, xMin, xMax, yMin, yMax);

    // Add axes with xkcd styling
    addAxes(svg, xScale, yScale, width, height, margin, 'x', 'y');

    // Optionally add grid
    // addGrid(svg, xScale, yScale, width, height);

    // Plot data points
    svg.selectAll('.point')
        .data(data)
        .join('circle')
        .attr('class', 'point xkcd-line')
        .attr('cx', d => xScale(d[xKey]))
        .attr('cy', d => yScale(d[yKey]))
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .style('filter', 'url(#wiggle-filter)');

    // Exponential function definition
    function exponentialModel(x, params) {
        const { beta0, beta1 } = params;
        return beta0 * Math.exp(beta1 * x);
    }

    // Fit the exponential function to the data using gradient descent
    function fitExponential(data) {
        // Parameters
        let { beta0, beta1 } = params;

        // Learning rate and iterations
        const learningRate = 0.0001;
        const iterations = 0;

        for (let i = 0; i < iterations; i++) {
            let gradientBeta0 = 0;
            let gradientBeta1 = 0;

            for (const d of data) {
                const x = d.x;
                const y = d.y;
                const yPred = exponentialModel(x, { beta0, beta1 });
                const error = yPred - y;

                // Compute gradients
                gradientBeta0 += (2 / data.length) * error * Math.exp(beta1 * x);
                gradientBeta1 += (2 / data.length) * error * beta0 * x * Math.exp(beta1 * x);
            }

            // Update parameters
            beta0 -= learningRate * gradientBeta0;
            beta1 -= learningRate * gradientBeta1;
        }

        return { beta0, beta1 };
    }

    // Fit the model
    const fittedParams = fitExponential(data);

    // Generate data for the fitted exponential curve
    const modelData = [];
    for (let xi = xMin; xi <= xMax; xi += 0.01) {
        const yi = exponentialModel(xi, fittedParams);
        modelData.push({ x: xi, y: yi });
    }

    // Plot the fitted exponential curve
    const lineGenerator = d3.line()
        .x(d => xScale(d[xKey]))
        .y(d => yScale(d[yKey]))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg.append('path')
        .datum(modelData)
        .attr('fill', 'none')
        .attr('stroke', 'tomato')
        .attr('stroke-width', 4)
        .attr('class', 'xkcd-line')
        .style('filter', 'url(#wiggle-filter)')
        .attr('d', lineGenerator);

    // Optionally add markers to the curve
    /*
    svg.selectAll('.marker')
        .data(modelData)
        .join('circle')
        .attr('class', 'marker xkcd-line')
        .attr('cx', d => xScale(d[xKey]))
        .attr('cy', d => yScale(d[yKey]))
        .attr('r', 2)
        .attr('fill', 'tomato')
        .style('filter', 'url(#wiggle-filter)');
    */
}

// Call the function to create the chart
createExponentialRegressionChart();
