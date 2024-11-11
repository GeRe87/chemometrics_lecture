const labels1 = [1, 2, 3, 4, 5, 6, 7, 8];
const data2 = [
    [2.3, 1.2, 0.5, 0.2, 0.1],
    [2.7, 1.1, 0.4, 0.3, 0.2],
    [1.9, 1.3, 0.6, 0.1, 0.2],
    [2.1, 1.0, 0.3, 0.4, 0.7],
    [2.5, 1.4, 0.7, 0.5, 0.6],
    [2.2, 1.5, 0.8, 0.6, 0.5],
    [2.4, 1.6, 0.9, 0.7, 0.1],
    [2.6, 1.7, 1.0, 0.8, 0.3]
  ];
  
  // Generate the distance matrix using Euclidean distance
const distanceMatrix1 = createDistanceMatrix(data2, euclideanDistance);
const dendrogram_data = agglomerativeClustering(distanceMatrix1, labels1);

const labels2 = [7,8];
const data3 = [
    [2.4, 1.6, 0.9, 0.7, 0.1],
    [2.6, 1.7, 1.0, 0.8, 0.3]
  ];
  
  // Generate the distance matrix using Euclidean distance
const distanceMatrix2 = createDistanceMatrix(data3, euclideanDistance);
const dendrogram_data2 = agglomerativeClustering(distanceMatrix2, labels2);

const options = {
    width: 420,
    height: 520,
    hideLabels: false,
    paddingLeft: 30,
    yLabel: "Distance",
    colors: d3.schemeTableau10,
    fontFamily: "Inter, sans-serif",
    fontSize: 16,
};

// Render the dendrogram
const svgNode = dendrogram(dendrogram_data, options);
document.getElementById("dendrogram_step0").appendChild(svgNode);

options.height = 350;

const svgNode2 = dendrogram(dendrogram_data2, options);
document.getElementById("dendrogram_step1").appendChild(svgNode2);