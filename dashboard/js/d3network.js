!(function (d3) {

  $("d3network").empty();

  var color = d3.scale.category10();

  //NETWORK
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 1400 - margin.left - margin.right,
      height = 1000 - margin.top - margin.bottom;

  var svg_network = d3.select("d3network").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

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
        .attr("class", "link");

    var color = d3.scale.category10();

    var node = svg_network.selectAll(".node")
        .data(json.nodes)
      .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("circle")
        .attr("r", function(d) { if (d.type == "network") { return Math.sqrt(d.size); } else { return 2; } })
        .style("fill", function(d) { if (d.type == "network") { return color(d.group); } else { return '#9E9E9E'; } })
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

})(d3);