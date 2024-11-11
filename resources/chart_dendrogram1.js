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

const labels3 = [5,6,7,8];
const data4 = [
    [2.5, 1.4, 0.7, 0.5, 0.6],
    [2.2, 1.5, 0.8, 0.6, 0.5],
    [2.4, 1.6, 0.9, 0.7, 0.1],
    [2.6, 1.7, 1.0, 0.8, 0.3]
  ];
  
  // Generate the distance matrix using Euclidean distance
const distanceMatrix3 = createDistanceMatrix(data4, euclideanDistance);
const dendrogram_data3 = agglomerativeClustering(distanceMatrix3, labels3);

const labels4 = [1,2,5,6,7,8];
const data5 = [
    [2.3, 1.2, 0.5, 0.2, 0.1],
    [2.7, 1.1, 0.4, 0.3, 0.2],
    [2.5, 1.4, 0.7, 0.5, 0.6],
    [2.2, 1.5, 0.8, 0.6, 0.5],
    [2.4, 1.6, 0.9, 0.7, 0.1],
    [2.6, 1.7, 1.0, 0.8, 0.3]
  ];
  
  // Generate the distance matrix using Euclidean distance
  const distanceMatrix4 = createDistanceMatrix(data5, euclideanDistance);
  const dendrogram_data4 = agglomerativeClustering(distanceMatrix4, labels4);

  const labels5 = [1,2,3,5,6,7,8];
  const data6 = [
      [2.3, 1.2, 0.5, 0.2, 0.1],
      [2.7, 1.1, 0.4, 0.3, 0.2],
      [1.9, 1.3, 0.6, 0.1, 0.2],
      [2.5, 1.4, 0.7, 0.5, 0.6],
      [2.2, 1.5, 0.8, 0.6, 0.5],
      [2.4, 1.6, 0.9, 0.7, 0.1],
      [2.6, 1.7, 1.0, 0.8, 0.3]
    ];
    
    // Generate the distance matrix using Euclidean distance
    const distanceMatrix5 = createDistanceMatrix(data6, euclideanDistance);
    const dendrogram_data5 = agglomerativeClustering(distanceMatrix5, labels5);

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

const svgNode3 = dendrogram(dendrogram_data2, options);
document.getElementById("dendrogram_data8").appendChild(svgNode3);

const svgNode4 = dendrogram(dendrogram_data3, options);
document.getElementById("dendrogram_data9").appendChild(svgNode4);

const svgNode5 = dendrogram(dendrogram_data4, options);
document.getElementById("dendrogram_data10").appendChild(svgNode5);

const svgNode6 = dendrogram(dendrogram_data5, options);
document.getElementById("dendrogram_data11").appendChild(svgNode6);

const svgNode7 = dendrogram(dendrogram_data, options);
document.getElementById("dendrogram_data12").appendChild(svgNode7);

options.height = 500;
options.h = 0.6;
const svgNode8 = dendrogram(dendrogram_data, options);
document.getElementById("dendrogram_interpreted").appendChild(svgNode8);