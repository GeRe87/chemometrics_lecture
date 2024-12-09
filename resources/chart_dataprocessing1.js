function createDataProcessingPlot1a(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    // const data2 = createGaussianPeakData(100, .5, .01, 2);
    // const data3 = createGaussianPeakData(100, .5, .01, 5);
    // const data4 = createGaussianPeakData(100, .5, .01, 6);
    // const data5 = createGaussianPeakData(100, .5, .01, 1);

    // // Define the scales
    // const xScale = d3.scaleLinear()
    //     .domain([0, 1]) // Input domain (min and max x values)
    //     .range([0, 300]); // Output range (pixels)
    
    // const yScale = d3.scaleLinear()
    //     .domain([-2, 16]) // Input domain (min and max y values)
    //     .range([400, 0]); // Output range (pixels)


    createXYLineChart("chart_dataprocessing1a", data, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -1, yMax = 15);
    // addPlotSeries("chart_dataprocessing1a", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#ef476f", showLine = true, showMarkers = false);
    // addPlotSeries("chart_dataprocessing1a", data3, xScale, yScale, "x", "y", lineColor = "#06d6a0", markerColor = "#06d6a0", showLine = true, showMarkers = false);
    // addPlotSeries("chart_dataprocessing1a", data4, xScale, yScale, "x", "y", lineColor = "#118ab2", markerColor = "#118ab2", showLine = true, showMarkers = false);
    // addPlotSeries("chart_dataprocessing1a", data5, xScale, yScale, "x", "y", lineColor = "#073b4c", markerColor = "#073b4c", showLine = true, showMarkers = false);
}

function createDataProcessingPlot1b(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    // add interference
    const data2 = createGaussianPeakData(100, .6, .02, 2);

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-2, 16]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)


    // create signal + interference
    const data3 = data.map((d, i) => {
        return {
            x: d.x,
            y: d.y + data2[i].y
        }
    });
    createXYLineChart("chart_dataprocessing1b", data3, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -1, yMax = 15);
    addPlotSeries("chart_dataprocessing1b", data, xScale, yScale, "x", "y", lineColor = "#000000", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
    addPlotSeries("chart_dataprocessing1b", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
}

function createDataProcessingPlot1c(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-2, 16]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)


    // create signal + interference
    const data3 = data.map((d, i) => {
        return {
            x: d.x,
            y: d.y * .7
        }
    });
    createXYLineChart("chart_dataprocessing1c", data3, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -1, yMax = 15);
    addPlotSeries("chart_dataprocessing1c", data, xScale, yScale, "x", "y", lineColor = "#000000", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
}

function createDataProcessingPlot1d(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);

    // create noise
    const data2 = data.map((d, i) => {
        return {
            x: d.x,
            y: (Math.random() - .5) * 2
        }
    });

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-2, 16]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)


    // create signal + noise
    const data3 = data.map((d, i) => {
        return {
            x: d.x,
            y: d.y + data2[i].y
        }
    });
    createXYLineChart("chart_dataprocessing1d", data3, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -1, yMax = 15);
    addPlotSeries("chart_dataprocessing1d", data, xScale, yScale, "x", "y", lineColor = "#000000", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
    addPlotSeries("chart_dataprocessing1d", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
}

function createDataProcessingPlot1e(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);

    // create drift 
    const data2 = data.map((d, i) => {
        return {
            x: d.x,
            y: (d.x) * 5
        }
    });

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-2, 16]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)


    // create signal + noise
    const data3 = data.map((d, i) => {
        return {
            x: d.x,
            y: d.y + data2[i].y
        }
    });
    createXYLineChart("chart_dataprocessing1e", data3, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -1, yMax = 15);
    addPlotSeries("chart_dataprocessing1e", data, xScale, yScale, "x", "y", lineColor = "#000000", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
    addPlotSeries("chart_dataprocessing1e", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
}


function createDataProcessingPlot1f(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    // add interference
    const data2 = createGaussianPeakData(100, .6, .02, 2);
    // create noise
    const data3 = data.map((d, i) => {
        return {
            x: d.x,
            y: (Math.random() - .5) * 2
        }
    });

    // create drift 
    const data4 = data.map((d, i) => {
        return {
            x: d.x,
            y: (d.x) * 5
        }
    });

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-2, 16]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)


    // create signal + noise
    const data5 = data.map((d, i) => {
        return {
            x: d.x,
            y: d.y * 0.7 + data2[i].y + data3[i].y + data4[i].y
        }
    });
    createXYLineChart("chart_dataprocessing1f", data5, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -1, yMax = 15);
    addPlotSeries("chart_dataprocessing1f", data, xScale, yScale, "x", "y", lineColor = "#000000", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
    addPlotSeries("chart_dataprocessing1f", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
    addPlotSeries("chart_dataprocessing1f", data3, xScale, yScale, "x", "y", lineColor = "red", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
    addPlotSeries("chart_dataprocessing1f", data4, xScale, yScale, "x", "y", lineColor = "magenta", markerColor = "#118ab2", showLine = true, showMarkers = false, lineWidth=2, lineStyle = "dashed");
}



// call the function
createDataProcessingPlot1a();
createDataProcessingPlot1b();
createDataProcessingPlot1c();
createDataProcessingPlot1d();
createDataProcessingPlot1e();
createDataProcessingPlot1f();