function createInteractiveDecisionTree(containerId) {
  const width = 300, height = 300, margin = { top: 20, right: 20, bottom: 20, left: 20 };

  // Tree structure with criteria
  const treeData = {
      name: "Root Node",
      criteria: { param1: 5, operator: ">" },
      children: [
          {
              name: "Node 1: Param 2 > 7",
              criteria: { param2: 7, operator: ">" },
              children: [
                  { name: "Leaf: Class A" },
                  { name: "Leaf: Class B" }
              ]
          },
          {
              name: "Node 2: Param 3 < 5",
              criteria: { param3: 5, operator: "<" },
              children: [
                  {
                      name: "Node 3: Param 3 < 3",
                      criteria: { param3: 3, operator: "<" },
                      children: [
                          { name: "Leaf: Class C" },
                          { name: "Leaf: Class D" }
                      ]
                  },
                  {
                      name: "Node 4: Param 1 < 2",
                      criteria: { param1: 2, operator: "<" },
                      children: [
                          { name: "Leaf: Class E" },
                          { name: "Leaf: Class F" }
                      ]
                  }
              ]
          }
      ]
  };

  // Create an SVG container
  const svg = d3.select(`#${containerId}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create tree layout
  const treeLayout = d3.tree().size([width, height - margin.top - margin.bottom]);
  const root = d3.hierarchy(treeData);
  treeLayout(root);

  // Add links
  const links = svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

  // Add nodes
  const nodes = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

  nodes.append("circle")
      .attr("r", 10)
      .attr("fill", d => d.children ? "#69b3a2" : "#ffd166");

  nodes.append("text")
      .attr("dy", -15)
      .attr("x", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(d => d.data.name);

  // Slider interactivity
  const maxDepth = Math.max(...root.descendants().map(d => d.depth));
  const slider = d3.select("#pathSlider").attr("max", maxDepth);

  function evaluateCriteria(node, parameters) {
      if (!node.data.criteria) return true; // Leaf nodes or nodes without criteria
      const { operator, ...criteria } = node.data.criteria;

      const [key, value] = Object.entries(criteria)[0];
      const parameter = parameters[key];

      // Evaluate criteria based on the operator
      switch (operator) {
          case ">": return parameter > value;
          case "<": return parameter < value;
          default: return false;
      }
  }

  function updateTreePath() {
      const currentDepth = +slider.property("value");

      // Get parameter values from input boxes
      const parameters = {
          param1: +d3.select("#parameter1").property("value"),
          param2: +d3.select("#parameter2").property("value"),
          param3: +d3.select("#parameter3").property("value")
      };

      // Reset previous highlights
      links.attr("stroke", "#ccc").attr("stroke-width", 2);
      nodes.selectAll("circle").attr("stroke", "none");

      // Start from the root and traverse the tree up to the current depth
      let currentNode = root;

      for (let depth = 0; depth <= currentDepth; depth++) {
          // Highlight the current node
          svg.selectAll(".node circle")
              .filter(d => d === currentNode)
              .attr("stroke", "red")
              .attr("stroke-width", 3);

          // Highlight the link to the next node, if applicable
          if (depth < currentDepth && currentNode.children) {
              const nextNode = currentNode.children.find(child => evaluateCriteria(child, parameters));

              if (nextNode) {
                  svg.selectAll(".link")
                      .filter(d => d.source === currentNode && d.target === nextNode)
                      .attr("stroke", "red")
                      .attr("stroke-width", 3);

                  currentNode = nextNode; // Move to the next node
              }
          }
      }
  }

  // Event listeners for the slider and inputs
  slider.on("input", updateTreePath);
  d3.selectAll("input[type='number']").on("input", updateTreePath);

  // Initial update
  updateTreePath();
}

// Initialize the interactive decision tree
createInteractiveDecisionTree("decisionTreeInteractive");
