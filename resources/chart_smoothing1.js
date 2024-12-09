// Create Gaussian Peak Data
const data = createGaussianPeakData(100, 0.5, 0.001, 20);

// create noise
const data2 = data.map((d, i) => {
    return {
        x: d.x,
        y: Math.random() - .5
    }
});

// cumulative sum of data2
let sum = 0;
for (let i = 0; i < data2.length; i++){
    sum += data2[i].y;
    data2[i].y = sum;
}

// Add noise to the data
const noisyData = data.map((d, i) => {
    return {
        x: d.x,
        y: d.y + data2[i].y
    }
});

// Boxcar kernel smoothing function
function smoothData(data, span) {
    const smoothed = [];
    const halfSpan = Math.floor(span / 2);

    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        let count = 0;

        for (let j = i - halfSpan; j <= i + halfSpan; j++) {
            if (j >= 0 && j < data.length) {
                sum += data[j].y;
                count++;
            }
        }

        smoothed.push({ x: data[i].x, y: sum / count });
    }

    return smoothed;
}

// Gaussian kernel smoothing function
function smoothDataGaussian(data, span) {
    const smoothed = [];
    const halfSpan = Math.floor(span / 2);

    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        let count = 0;

        for (let j = i - halfSpan; j <= i + halfSpan; j++) {
            if (j >= 0 && j < data.length) {
                const weight = Math.exp(-Math.pow(i - j, 2) / (2 * Math.pow(span / 3, 2)));
                sum += data[j].y * weight;
                count += weight;
            }
        }

        smoothed.push({ x: data[i].x, y: sum / count });
    }

    return smoothed;
}

// Create the initial chart
function createChart(span) {
    // Smooth data with current span
    const smoothedData = smoothData(noisyData, span);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 300]);
    
    const yScale = d3.scaleLinear()
        .domain([-10, 40])
        .range([400, 0]);

    // Create the chart
    createXYLineChart("chart_smoothing1", noisyData, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -10, yMax = 40);
    
    // Add the smoothed curve
    addPlotSeries("chart_smoothing1", smoothedData, xScale, yScale, "x", "y", 
                  lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

// Create the initial chart
function createChart2(span) {
    // Smooth data with current span
    const smoothedData = smoothDataGaussian(noisyData, span);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 300]);
    
    const yScale = d3.scaleLinear()
        .domain([-10, 40])
        .range([400, 0]);

    // Create the chart
    createXYLineChart("chart_smoothing2", noisyData, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -10, yMax = 40);
    
    // Add the smoothed curve
    addPlotSeries("chart_smoothing2", smoothedData, xScale, yScale, "x", "y", 
                  lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

// Update chart on slider input
document.getElementById("spanSlider").addEventListener("input", (event) => {
    const span = parseInt(event.target.value);
    document.getElementById("spanValue").textContent = span;
    createChart(span);
});

// Update chart on slider input
document.getElementById("spanSlider2").addEventListener("input", (event) => {
    const span = parseInt(event.target.value);
    document.getElementById("spanValue2").textContent = span;
    createChart2(span);
});

// Initial chart creation
createChart(4);
createChart2(4);

// savitzkyGolaySmoothing function
function savitzkyGolaySmoothing(data, windowSize, polyOrder) {
    if (windowSize % 2 === 0) {
        throw new Error("Window size must be odd.");
    }

    const halfWindow = Math.floor(windowSize / 2);
    const smoothed = [];

    // Generate Savitzky-Golay coefficients
    const coefficients = generateSavitzkyGolayCoefficients(windowSize, polyOrder);

    for (let i = 0; i < data.length; i++) {
        let weightedSum = 0;

        for (let j = -halfWindow; j <= halfWindow; j++) {
            const index = i + j;
            if (index >= 0 && index < data.length) {
                weightedSum += data[index].y * coefficients[0][j + halfWindow];
            }
        }

        smoothed.push({ x: data[i].x, y: weightedSum });
    }

    return smoothed;
}


function generateSavitzkyGolayCoefficients(windowSize, polyOrder) {
    if (windowSize % 2 === 0) {
        throw new Error("Window size must be odd.");
    }
    if (polyOrder >= windowSize) {
        throw new Error("Polynomial order must be less than the window size.");
    }

    const halfWindow = Math.floor(windowSize / 2);

    // Create the Vandermonde matrix
    const vandermonde = [];
    for (let i = -halfWindow; i <= halfWindow; i++) {
        const row = [];
        for (let j = 0; j <= polyOrder; j++) {
            row.push(Math.pow(i, j));
        }
        vandermonde.push(row);
    }

    // Compute the pseudo-inverse of the Vandermonde matrix
    const vandermondeMatrix = math.matrix(vandermonde); // Using math.js
    const vandermondePseudoInverse = math.multiply(
        math.inv(math.multiply(math.transpose(vandermondeMatrix), vandermondeMatrix)),
        math.transpose(vandermondeMatrix)
    );

    // Extract the coefficients for the smoothing (0th derivative)
    const smoothingCoefficients = math.row(vandermondePseudoInverse, 0);

    return smoothingCoefficients.toArray();
}


// Add event listeners for interactive slider and polynomial order
document.getElementById("spanSlider3").addEventListener("input", () => updateSavitzkyGolay());
document.getElementById("polyOrder").addEventListener("change", () => updateSavitzkyGolay());

// Update chart
function updateSavitzkyGolay() {
    const span = parseInt(document.getElementById("spanSlider3").value);
    const polyOrder = parseInt(document.getElementById("polyOrder").value);
    document.getElementById("spanValue3").textContent = span;

    const smoothedData = savitzkyGolaySmoothing(noisyData, span, polyOrder);
    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 300]);
    
    const yScale = d3.scaleLinear()
        .domain([-10, 40])
        .range([400, 0]);

    createXYLineChart("chart_smoothing3", noisyData, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -10, yMax = 40);
    addPlotSeries("chart_smoothing3", smoothedData, xScale, yScale, "x", "y", 
        lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

// Initial chart setup
updateSavitzkyGolay();

function createSmoothingTradeoffChart() {
    // Original signal with noise
    const signal = createGaussianPeakData(100, 0.5, 0.001, 20);
    const noisySignal = signal.map((d, i) => ({
        x: d.x,
        y: d.y + (Math.random() - 0.5) * 5.5
    }));

    // Smooth with different spans
    const lightlySmoothed = smoothData(noisySignal, 2); // Small kernel
    const stronglySmoothed = smoothData(noisySignal, 20); // Large kernel

    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 300]);
    
    const yScale = d3.scaleLinear()
        .domain([-10, 40])
        .range([400, 0]);

    // Plot original and smoothed signals
    createXYLineChart("chart_smoothing_tradeoff", noisySignal, "x", "y", "x", "y", 
                      showLines = true, showMarkers = false, showGrid = false, 
                      xMin = 0, xMax = 1, yMin = -10, yMax = 40);

    addPlotSeries("chart_smoothing_tradeoff", lightlySmoothed, xScale, yScale, "x", "y", 
                  lineColor = "black", markerColor = "black", showLine = true, showMarkers = false);

    addPlotSeries("chart_smoothing_tradeoff", stronglySmoothed, xScale, yScale, "x", "y", 
                  lineColor = "#ef476f", markerColor = "#ffd166", showLine = true, showMarkers = false);
}

createSmoothingTradeoffChart();

function createElbowCriterionChart() {
    const spans = Array.from({ length: 30 }, (_, i) => i + 2); // Smoothing spans
    const errors = [];

    // Original signal with noise
    const originalSignal1 = createGaussianPeakData(100, 0.3, 0.001, 20);
    const originalSignal2 = createGaussianPeakData(100, 0.6, 0.001, 40);
    const originalSignal = originalSignal1.map((d, i) => ({
        x: d.x,
        y: d.y + originalSignal2[i].y
    }));

    const noisySignal = originalSignal.map((d, i) => ({
        x: d.x,
        y: d.y + (Math.random() - 0.5) * 5.5
    }));

    // Compute error for each span
    spans.forEach(span => {
        const smoothedSignal = smoothDataGaussian(noisySignal, span); // Use a smoothing function
        const error = smoothedSignal.reduce((sum, d, i) => {
            return sum + Math.pow(d.y - originalSignal[i].y, 2);
        }, 0) / smoothedSignal.length;

        errors.push({ span, error });
    });

    const { fValues, pValues } = calculateFandPValues(errors);
    // Plot the elbow curve
    createXYLineChart("chart_elbow_criterion", errors, "span", "error", "Span", "Error",
                      showLines = true, showMarkers = true, showGrid = false);
}

function calculateFandPValues(errors) {
    const fValues = [];
    const pValues = [];

    for (let i = 1; i < errors.length; i++) {
        const mse1 = errors[i - 1].error;
        const mse2 = errors[i].error;

        // Compute F-value
        const fValue = mse1 / mse2;
        fValues.push({ span: errors[i].span, fValue });

        // Compute p-value (using F-distribution)
        const pValue = jStat.ftest(fValue, 1, 1); // df1 and df2 are 1 for simplicity
        pValues.push({ span: errors[i].span, pValue });
    }

    return { fValues, pValues };
}


createElbowCriterionChart();


function createSavitzkyGolayDerivativeChart() {
    // Generate noisy data with baseline drift
    const signal = createGaussianPeakData(100, 0.5, 0.001, 20);
    const baseline = signal.map((d, i) => ({ x: d.x, y: d.x * 16 })); // Linear baseline drift
    const noisySignal = signal.map((d, i) => ({
        x: d.x,
        y: d.y + baseline[i].y + (Math.random() - 0.5) * 5.5
    }));

    // Apply Savitzky-Golay 1st Derivative
    const derivativeSignal = applySavitzkyGolayDerivative(noisySignal, 11, 1); // Window size = 5, 1st derivative
    // Baseline-corrected signal (integral of derivative signal)
    // calculate conventional derrivative
    const derivativeSignal2 = noisySignal.map((d, i) => {
        if (i === 0 || i === noisySignal.length - 1) {
            return { x: d.x, y: 0 };
        }
        return { x: d.x, y: (noisySignal[i + 1].y - noisySignal[i - 1].y) / (noisySignal[i + 1].x - noisySignal[i - 1].x) };
    });
    // const baselineCorrectedSignal = integrateSignal(derivativeSignal);

    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 300]);
    
    const yScale = d3.scaleLinear()
        .domain([-5, 20])
        .range([400, 0]);
    
    const xScale2 = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 300]);
    
    const yScale2 = d3.scaleLinear()
        .domain([-100, 400])
        .range([400, 0]);

    // Visualize
    createXYLineChart("chart_sg_derivative", noisySignal, "x", "y", "x", "y", 
        showLines = true, showMarkers = false, showGrid = false, 
        xMin = 0, xMax = 1, yMin = -10, yMax = 40);

    addPlotSeries("chart_sg_derivative", derivativeSignal, xScale, yScale, "x", "y",
                  lineColor = "black", markerColor = "#118ab2", showLine = true, showMarkers = false);
    addPlotSeries("chart_sg_derivative", derivativeSignal2, xScale2, yScale2, "x", "y",
                    lineColor = "#ef476f", markerColor = "#ffd166", showLine = true, showMarkers = false, lineWidth = 2, lineStyle = "dashed");
    // addPlotSeries("chart_sg_derivative", baselineCorrectedSignal, xScale, yScale, "x", "y",
    //               lineColor = "#ef476f", markerColor = "#ffd166", showLine = true, showMarkers = false);
}

// Derivative calculation (Savitzky-Golay)
function applySavitzkyGolayDerivative(data, windowSize, derivativeOrder) {
    const derivativeCoefficients = generateSavitzkyGolayDerivativeCoefficients(windowSize, 2,derivativeOrder); // Polynomial order 2
    return data.map((d, i) => {
        let value = 0;
        for (let j = -Math.floor(windowSize / 2); j <= Math.floor(windowSize / 2); j++) {
            const index = i + j;
            if (index >= 0 && index < data.length) {
                value += data[index].y * derivativeCoefficients[0][j + Math.floor(windowSize / 2)];
            }
        }
        return { x: d.x, y: value };
    });
}

function generateSavitzkyGolayDerivativeCoefficients(windowSize, polyOrder, derivativeOrder) {
    if (windowSize % 2 === 0) {
        throw new Error("Window size must be odd.");
    }
    if (polyOrder >= windowSize) {
        throw new Error("Polynomial order must be less than the window size.");
    }

    const halfWindow = Math.floor(windowSize / 2);

    // Create the Vandermonde matrix
    const vandermonde = [];
    for (let i = -halfWindow; i <= halfWindow; i++) {
        const row = [];
        for (let j = 0; j <= polyOrder; j++) {
            row.push(Math.pow(i, j));
        }
        vandermonde.push(row);
    }

    // Compute the pseudo-inverse of the Vandermonde matrix
    const vandermondeMatrix = math.matrix(vandermonde); // Requires math.js
    const vandermondePseudoInverse = math.multiply(
        math.inv(math.multiply(math.transpose(vandermondeMatrix), vandermondeMatrix)),
        math.transpose(vandermondeMatrix)
    );

    // Extract the coefficients for the specified derivative order
    const derivativeCoefficients = math.row(vandermondePseudoInverse, derivativeOrder);

    // Scale the coefficients for the derivative
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
    const scaleFactor = factorial(derivativeOrder);
    return derivativeCoefficients.map((c) => c * scaleFactor).toArray();
}


// Signal integration for baseline correction
function integrateSignal(derivativeSignal) {
    let cumulativeSum = 0;
    return derivativeSignal.map(d => {
        cumulativeSum += d.y;
        return { x: d.x, y: cumulativeSum };
    });
}

createSavitzkyGolayDerivativeChart();
