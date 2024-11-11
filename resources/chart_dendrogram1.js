const dendrogram_data = {
    name: "Root",           // Root node
    height: 1.5,            // Maximum height of the root node
    children: [
        {
            name: "Cluster A",
            height: 0.9,        // Height of Cluster A
            children: [
                { name: "Sample 1", height: 0, isLeaf: true }, // Leaf node with height 0
                { name: "Sample 2", height: 0, isLeaf: true }  // Leaf node with height 0
            ]
        },
        {
            name: "Cluster B",
            height: 1.2,        // Height of Cluster B
            children: [
                { name: "Sample 3", height: 0, isLeaf: true },
                {
                    name: "Cluster C",
                    height: 0.7,
                    children: [
                        { name: "Sample 4", height: 0, isLeaf: true },
                        { name: "Sample 5", height: 0, isLeaf: true }
                    ]
                }
            ]
        }
    ]
};


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