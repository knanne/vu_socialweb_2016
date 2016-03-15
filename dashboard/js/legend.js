    //LEGEND
    groups = ['CIW', 'CLTL', 'CS', 'CW', 'FSW', 'KIN', 'L&S'];

    var colorcat = d3.scale.category10();

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
      .style("fill", function(d,i) { return colorcat(groups[i]); });

    legend.append("text")
      .attr("x", function(d,i) { return 60+(i*100); })
      .attr("y", 25)
      .text(function(d,i) {return groups[i]; });