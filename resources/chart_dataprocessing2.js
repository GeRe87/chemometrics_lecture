function createDataProcessingPlot2a(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    const data2 = createGaussianPeakData(100, .5, .01, 90);

    // add nosie
    for (let i = 0; i < data.length; i++){
        data[i].y += Math.random() * 2;
        data2[i].y += Math.random() * 2;
    }

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-10, 100]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)

    createXYLineChart("chart_dataprocessing2a", data, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -10, yMax = 100);
    addPlotSeries("chart_dataprocessing2a", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

function createDataProcessingPlot2b(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    const data2 = createGaussianPeakData(100, .5, .01, 90);

     // add nosie
     for (let i = 0; i < data.length; i++){
        data[i].y += Math.random() * 2;
        data2[i].y += Math.random() * 2;
    }

    // normalize data by min-max scaling
    var yMin = Math.min(...data.map(d => d.y));
    var yMax = Math.max(...data.map(d => d.y));
    data.forEach(d => {
        d.y = (d.y - yMin) / (yMax - yMin);
    });

    var yMin2 = Math.min(...data2.map(d => d.y));
    var yMax2 = Math.max(...data2.map(d => d.y));
    data2.forEach(d => {
        d.y = (d.y - yMin2) / (yMax2 - yMin2);
    });

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-.6, 1.6]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)

    createXYLineChart("chart_dataprocessing2b", data, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -.5, yMax = 1.5);
    addPlotSeries("chart_dataprocessing2b", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

function createDataProcessingPlot2c(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    const data2 = createGaussianPeakData(100, .5, .01, 90);


    // add nosie
    for (let i = 0; i < data.length; i++){
        data[i].y += Math.random() * 2;
        data2[i].y += Math.random() * 2;
    }

    // add noisy spike to data2
    data2[80].y = -100;

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-100, 100]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)

    createXYLineChart("chart_dataprocessing2c", data, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -100, yMax = 100);
    addPlotSeries("chart_dataprocessing2c", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

function createDataProcessingPlot2d(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    const data2 = createGaussianPeakData(100, .5, .01, 90);

     // add nosie
     for (let i = 0; i < data.length; i++){
        data[i].y += Math.random() * 2;
        data2[i].y += Math.random() * 2;
    }

    // add noisy spike to data2
    data2[80].y = -100;

    // normalize data by z score
    var yMean = d3.mean(data.map(d => d.y));
    var yStd = d3.deviation(data.map(d => d.y));
    data.forEach(d => {
        d.y = (d.y - yMean) / yStd;
    }
    );

    var yMean2 = d3.mean(data2.map(d => d.y));
    var yStd2 = d3.deviation(data2.map(d => d.y));
    data2.forEach(d => {
        d.y = (d.y - yMean2) / yStd2;
    }
    );

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-4, 4]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)

    createXYLineChart("chart_dataprocessing2d", data, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -4, yMax = 4);
    addPlotSeries("chart_dataprocessing2d", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}

function createDataProcessingPlot2e(){
    // Create some peak data using createGaussianPeakData function
    const data = createGaussianPeakData(100, .5, .01, 10);
    const data2 = createGaussianPeakData(100, .5, .01, 90);

     // add nosie
     for (let i = 0; i < data.length; i++){
        data[i].y += Math.random() * 2;
        data2[i].y += Math.random() * 2;
    }

    // add noisy spike to data2
    data2[80].y = -100;

    // normalize data by min-max scaling
    var yMin = Math.min(...data.map(d => d.y));
    var yMax = Math.max(...data.map(d => d.y));
    data.forEach(d => {
        d.y = (d.y - yMin) / (yMax - yMin);
    });

    var yMin2 = Math.min(...data2.map(d => d.y));
    var yMax2 = Math.max(...data2.map(d => d.y));
    data2.forEach(d => {
        d.y = (d.y - yMin2) / (yMax2 - yMin2);
    });

    // Define the scales
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Input domain (min and max x values)
        .range([0, 300]); // Output range (pixels)
    
    const yScale = d3.scaleLinear()
        .domain([-.6, 1.6]) // Input domain (min and max y values)
        .range([400, 0]); // Output range (pixels)

    createXYLineChart("chart_dataprocessing2e", data, "x", "y", "x", "y",showLines = true, showMarkers = false, showGrid = false, xMin = 0, xMax = 1, yMin = -.5, yMax = 1.5);
    addPlotSeries("chart_dataprocessing2e", data2, xScale, yScale, "x", "y", lineColor = "#ef476f", markerColor = "#118ab2", showLine = true, showMarkers = false);
}



createDataProcessingPlot2a();
createDataProcessingPlot2b();
createDataProcessingPlot2c();
createDataProcessingPlot2d();
createDataProcessingPlot2e();