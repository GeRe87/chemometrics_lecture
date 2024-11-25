function drawElephant() {
  // Parameters for the elephant function
  const numPoints = 1000;
  const twoPi = 2 * Math.PI;

  // Generate data points
  const data = d3.range(numPoints).map(i => {
    const t = (i / numPoints) * twoPi;

    // Parametric equations for the elephant
    const x = -60 * Math.cos(t)
              + 30 * Math.sin(t)
              - 8 * Math.sin(2 * t)
              + 10 * Math.sin(3 * t);

    const y = 50 * Math.sin(t)
              + 18 * Math.sin(2 * t)
              - 12 * Math.cos(3 * t)
              + 14 * Math.cos(5 * t);

    return { x, y };
  });

  // Chart dimensions
  const width = 400;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  // Create SVG container
  const svg = d3.select('#chart_elephant')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Scales
  const xExtent = d3.extent(data, d => d.x);
  const yExtent = d3.extent(data, d => d.y);

  const xScale = d3.scaleLinear()
    .domain([xExtent[0] - 10, xExtent[1] + 10])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([yExtent[0] - 10, yExtent[1] + 10])
    .range([height - margin.bottom, margin.top]);

  // Line generator
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveCardinalClosed);

  // Draw the elephant
  svg.append('path')
    .datum(data)
    .attr('fill', '#aaa')
    .attr('stroke', '#333')
    .attr('stroke-width', 2)
    .attr('d', line);
}

drawElephant();
