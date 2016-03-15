      //LEGEND
      groups = ['CIW', 'CLTL', 'CS', 'CW', 'FSW', 'KIN', 'L&S']

      var color = d3.scale.category10();

      var legend = d3.select("#network_legend").append("svg")
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
          .style("fill", function(d,i) { return color(groups[i]); })
          .style("opacity", .8);

      legend.append("text")
          .attr("x", function(d,i) { return 60+(i*100); })
          .attr("y", 25)
          .text(function(d,i) {return groups[i]; });

//NETWORK
var width = 1200;
var height = 900;

var svg_network = d3.select("#network").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

d3.json("dat/d3network_data.json", function(json) {
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg_network.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke", "#ccc");

  var color = d3.scale.category10();

  var node = svg_network.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("r", function(d) { if (d.type == "network") { return Math.sqrt(d.size); } else { return 2; } })
      .style("fill", function(d) { if (d.type == "network") { return color(d.group); } else { return '#9E9E9E'; } })
      .style("opacity", .8)
      .on("mouseover", function(d){
        d3.select("#tooltip")
          .style("left", (d3.event.pageX+10) + "px")
          .style("top", (d3.event.pageY-10) + "px")
          .select("#value")
          .html("account: <strong>@"+ d.id +"</strong>"+"<br>"+"following: "+d.size)
          d3.select("#tooltip").classed("hidden", false);
        })
      .on("mouseout", function(){
        d3.select("#tooltip").classed("hidden", true);
      });

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { if ( d.type == "network") {return d.id;} else {return '';}; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});