// create some x y data with normal distribution for the x and y values howeverm i want four clusters and 100 points in total
function generateKmeansData() {
    // Create the data
    const data = [];
    const means = [
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 4, y: 2 },
        { x: 5, y: 3 }
    ];
    const stdDev = 1.5;
    for (let i = 0; i < 100; i++) {
        const mean = means[Math.floor(i / 25)];
        data.push({
            x: mean.x + (Math.random() - 0.5) * stdDev,
            y: mean.y + (Math.random() - 0.5) * stdDev
        });
    }
    return data;
}

// Schritt 2: Zwei zufällige Anfangszentroiden auswählen
function selectRandomCentroids(data, numCentroids = 2) {
    const centroids = [];
    while (centroids.length < numCentroids) {
        const randomPoint = data[Math.floor(Math.random() * data.length)];
        if (!centroids.includes(randomPoint)) {
            centroids.push({ x: randomPoint.x, y: randomPoint.y });
        }
    }
    return centroids;
}

function assignPointsToCentroids(data, centroids) {
    data.forEach(point => {
        let minDistance = Infinity;
        let assignedCluster = -1;

        centroids.forEach((centroid, index) => {
            const dx = point.x - centroid.x;
            const dy = point.y - centroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy); // Euclidean distance

            if (distance < minDistance) {
                minDistance = distance;
                assignedCluster = index;
            }
        });

        // Assign the nearest centroid as a cluster to the point
        point.cluster = assignedCluster;
    });

    return data; // Updated data with cluster assignments
}

function updateCentroids(data, centroids) {
    const newCentroids = centroids.map((centroid, index) => {
        const clusterPoints = data.filter(point => point.cluster === index);
        const clusterX = clusterPoints.map(point => point.x);
        const clusterY = clusterPoints.map(point => point.y);
        const clusterSize = clusterPoints.length;
        const sumX = clusterX.reduce((a, b) => a + b, 0);
        const sumY = clusterY.reduce((a, b) => a + b, 0);

        return {
            x: sumX / clusterSize,
            y: sumY / clusterSize
        };
    });

    return newCentroids;
}

function kmeans(data, numCentroids = 2, maxIterations = 10) {
    let centroids = selectRandomCentroids(data, numCentroids);
    let iteration = 0;

    while (iteration < maxIterations) {
        assignPointsToCentroids(data, centroids);
        const newCentroids = updateCentroids(data, centroids);
        if (JSON.stringify(centroids) === JSON.stringify(newCentroids)) {
            break;
        }
        centroids = newCentroids;
        iteration++;
    }

    return data; // Updated data with cluster assignments
}



// Create the data
const kmeansData1 = generateKmeansData();
const initialCentroids = selectRandomCentroids(kmeansData1);



createXYLineChart("kmeans_intro", kmeansData1, "x", "y", "x", "y",  false, true, false, 0, 6, 0, 5);
const chart_kmeans_scales1 = createXYLineChart("choose_k", kmeansData1, "x", "y", "x", "y",  false, true, false, 0, 6, 0, 5);

const chart_kmeans_scales2 = createXYLineChart("initial_centroids", kmeansData1, "x", "y", "x", "y",  false, true, false, 0, 6, 0, 5);
addPlotSeries("initial_centroids", initialCentroids, chart_kmeans_scales2.xScale, chart_kmeans_scales2.yScale, "x", "y", "black", "black", false, true);

assignPointsToCentroids(kmeansData1, initialCentroids); // stores cluster information in property "cluster" of each point
// create a new chart that contains only cluster 0 data points
const cluster0 = kmeansData1.filter(point => point.cluster === 0);
const cluster1 = kmeansData1.filter(point => point.cluster === 1);
const chart_kmeans_scales3 = createXYLineChart("initial_assignment", cluster0, "x", "y", "x", "y",  false, true, false, 0, 6, 0, 5);
addPlotSeries("initial_assignment", cluster1, chart_kmeans_scales3.xScale, chart_kmeans_scales3.yScale, "x", "y", "black", "#118ab2", false, true);
addPlotSeries("initial_assignment", initialCentroids, chart_kmeans_scales3.xScale, chart_kmeans_scales3.yScale, "x", "y", "black", "black", false, true);

const updatedCentroids = updateCentroids(kmeansData1, initialCentroids);
const chart_kmeans_scales4 = createXYLineChart("centroid_current", cluster0, "x", "y", "x", "y",  false, true, false, 0, 6, 0, 5);
addPlotSeries("centroid_current", cluster1, chart_kmeans_scales4.xScale, chart_kmeans_scales4.yScale, "x", "y", "black", "#118ab2", false, true);
addPlotSeries("centroid_current", updatedCentroids, chart_kmeans_scales4.xScale, chart_kmeans_scales4.yScale, "x", "y", "black", "black", false, true);

// update the cluster assignment
assignPointsToCentroids(kmeansData1, updatedCentroids);
const updatedCluster0 = kmeansData1.filter(point => point.cluster === 0);
const updatedCluster1 = kmeansData1.filter(point => point.cluster === 1);
const chart_kmeans_scales5 = createXYLineChart("centroid_update", updatedCluster0, "x", "y", "x", "y",  false, true, false, 0, 6, 0, 5);
addPlotSeries("centroid_update", updatedCluster1, chart_kmeans_scales5.xScale, chart_kmeans_scales5.yScale, "x", "y", "black", "#118ab2", false, true);
addPlotSeries("centroid_update", updatedCentroids, chart_kmeans_scales5.xScale, chart_kmeans_scales5.yScale, "x", "y", "black", "black", false, true);

const kSlider = document.getElementById('kSlider');
const kValueDisplay = document.getElementById('kValue');
const kmeansChart = document.getElementById('final_clusters');

// Function to run k-means and update the chart with the current k value
function updateKmeansChart(k) {
    kValueDisplay.textContent = k;

    // Run k-means with k clusters on the existing dataset and retrieve the final centroids
    let finalCentroids = selectRandomCentroids(kmeansData1, k);  // Initial centroids
    let iteration = 0;
    let newCentroids;

    do {
        assignPointsToCentroids(kmeansData1, finalCentroids);
        newCentroids = updateCentroids(kmeansData1, finalCentroids);
        if (JSON.stringify(finalCentroids) === JSON.stringify(newCentroids)) break;
        finalCentroids = newCentroids;
        iteration++;
    } while (iteration < 10);

    // Separate data by cluster for plotting
    const clusters = [];
    for (let i = 0; i < k; i++) {
        clusters.push(kmeansData1.filter(point => point.cluster === i));
    }

    // Clear the previous plot
    kmeansChart.innerHTML = '';

    // Plot each cluster on a single chart
    const chartScales = createXYLineChart("final_clusters", [], "x", "y", "x", "y", false, true, false, 0, 6, 0, 5);

    clusters.forEach((cluster, index) => {
        addPlotSeries("final_clusters", cluster, chartScales.xScale, chartScales.yScale, "x", "y", null, d3.schemeCategory10[index], false, true);
    });

    // Plot the final centroids
    addPlotSeries("final_clusters", finalCentroids, chartScales.xScale, chartScales.yScale, "x", "y", "black", "black", false, true);
}

// Initialize chart on page load
updateKmeansChart(parseInt(kSlider.value, 10));

// Update chart whenever the slider changes
kSlider.addEventListener('input', () => {
    updateKmeansChart(parseInt(kSlider.value, 10));
});

