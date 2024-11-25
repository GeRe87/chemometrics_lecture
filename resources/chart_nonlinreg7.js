function createExponentialRegressionChartWithUncertainties() {
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
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };

    // Create SVG container with wiggle filter
    const svg = createSVG('chart_with_uncertainties', width, height, margin);

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

    // Function to fit the exponential model using the Gauss-Newton method
    function fitExponentialGaussNewton(data, iterations) {
        // Initial parameter estimates
        let beta0 = params.beta0;
        let beta1 = params.beta1;

        let J; // Declare J outside the loop
        let residuals; // Declare residuals outside the loop

        for (let iter = 0; iter < iterations; iter++) {
            J = []; // Jacobian matrix
            residuals = []; // Residual vector

            // Compute Jacobian matrix and residuals
            for (const d of data) {
                const x = d.x;
                const y = d.y;
                const yPred = beta0 * Math.exp(beta1 * x);
                const error = y - yPred;

                // Residual
                residuals.push(error);

                // Partial derivatives
                const dFdBeta0 = Math.exp(beta1 * x); // Partial derivative with respect to beta0
                const dFdBeta1 = beta0 * x * Math.exp(beta1 * x); // Partial derivative with respect to beta1

                // Add row to Jacobian matrix
                J.push([dFdBeta0, dFdBeta1]);
            }

            // Convert to matrices for math.js operations
            const JT = math.transpose(J); // Transpose of Jacobian matrix
            const JTJ = math.multiply(JT, J); // JT * J
            const JTr = math.multiply(JT, residuals); // JT * residuals

            // Solve the linear system JTJ * deltaBeta = JTr
            const deltaBeta = math.lusolve(JTJ, JTr); // Using a numerical solver

            // Update parameters
            beta0 += deltaBeta[0][0];
            beta1 += deltaBeta[1][0];
        }

        // After iterations, compute the residuals and Jacobian at final parameters
        J = []; // Re-initialize J
        residuals = []; // Re-initialize residuals

        for (const d of data) {
            const x = d.x;
            const y = d.y;
            const yPred = beta0 * Math.exp(beta1 * x);
            const error = y - yPred;

            // Residual
            residuals.push(error);

            // Partial derivatives at final parameters
            const dFdBeta0 = Math.exp(beta1 * x); // Partial derivative with respect to beta0
            const dFdBeta1 = beta0 * x * Math.exp(beta1 * x); // Partial derivative with respect to beta1

            // Add row to Jacobian matrix
            J.push([dFdBeta0, dFdBeta1]);
        }

        // Compute the estimated variance of the residuals
        const n = data.length;
        const p = 2; // Number of parameters
        const RSS = residuals.reduce((sum, r) => sum + r * r, 0);
        const sigma2 = RSS / (n - p);

        // Compute covariance matrix
        const JT = math.transpose(J);
        const JTJ = math.multiply(JT, J);
        const covarianceMatrix = math.multiply(sigma2, math.inv(JTJ));

        // Standard errors
        const SE_beta0 = Math.sqrt(covarianceMatrix[0][0]);
        const SE_beta1 = Math.sqrt(covarianceMatrix[1][1]);

        return {
            beta0,
            beta1,
            SE_beta0,
            SE_beta1
        };
    }

    // Function to update the chart
    function updateChart(iterations) {
        // Fit the model
        const fittedParams = fitExponentialGaussNewton(data, iterations);

        // Generate data for the fitted exponential curve
        const modelData = [];
        for (let xi = xMin; xi <= xMax; xi += 0.01) {
            const yi = exponentialModel(xi, fittedParams);
            modelData.push({ x: xi, y: yi });
        }

        // Remove previous curve if it exists
        svg.selectAll('.model-curve').remove();

        // Plot the fitted exponential curve
        const lineGenerator = d3.line()
            .x(d => xScale(d[xKey]))
            .y(d => yScale(d[yKey]))
            .curve(d3.curveCatmullRom.alpha(0.5));

        svg.append('path')
            .datum(modelData)
            .attr('class', 'model-curve xkcd-line')
            .attr('fill', 'none')
            .attr('stroke', 'tomato')
            .attr('stroke-width', 4)
            .style('filter', 'url(#wiggle-filter)')
            .attr('d', lineGenerator);

        // Update parameter display with standard errors
        const n = data.length;
        const p = 2;
        const degreesOfFreedom = n - p;
        const tValue = jStat.studentt.inv(0.975, degreesOfFreedom); // Using jStat library for t-value

        const CI_beta0 = [
            fittedParams.beta0 - tValue * fittedParams.SE_beta0,
            fittedParams.beta0 + tValue * fittedParams.SE_beta0
        ];
        const CI_beta1 = [
            fittedParams.beta1 - tValue * fittedParams.SE_beta1,
            fittedParams.beta1 + tValue * fittedParams.SE_beta1
        ];

        d3.select('#parameter-display3')
            .html(`
                Iterations: ${iterations}<br>
                β₀: ${fittedParams.beta0.toFixed(4)} ± ${fittedParams.SE_beta0.toFixed(4)}<br>
                95% CI for β₀: [${CI_beta0[0].toFixed(4)}, ${CI_beta0[1].toFixed(4)}]<br>
                β₁: ${fittedParams.beta1.toFixed(4)} ± ${fittedParams.SE_beta1.toFixed(4)}<br>
                95% CI for β₁: [${CI_beta1[0].toFixed(4)}, ${CI_beta1[1].toFixed(4)}]
            `);
    }

    // Initial chart update
    updateChart(0); // Adjust the number of iterations as needed

    // Optionally, add a slider to adjust iterations
}

createExponentialRegressionChartWithUncertainties();
