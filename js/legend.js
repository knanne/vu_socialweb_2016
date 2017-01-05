//LEGEND
var groups = ['KIN', 'CLTL', 'CIW', 'L&S', 'CW', 'CS', 'FSW'];

var colorgroup = d3.scale.category10()
  .domain(groups)
  .range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"]);

var legend = d3.select("d3legend").append("svg")
  .attr("width", 50+groups.length*100)
  .attr("height", 40);

legend = legend.selectAll(".legend")
  .data(d3.range(groups.length))
  .enter()
  .append("g")
  .attr("class", "legend");

legend.append("circle")
  .attr("r", 10)
  .attr("cx", d3.scale.linear().domain([-.5,groups.length-.5]).range([0,groups.length*100]))
  .attr("cy", 20)
  .style("fill", function(d) { return colorgroup(d); });

legend.append("text")
  .attr("x", function(d,i) { return 60+(i*100); })
  .attr("y", 25)
  .text(function(d,i) {return groups[i]; });