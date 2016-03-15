!(function (d3) {

  $("d3matrix").empty();

  var groups = ['KIN', 'CLTL', 'CIW', 'L&S', 'CW', 'CS', 'FSW'];

  var colorgroup = d3.scale.category10()
    .domain(groups)
    .range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"]);

  //MATRIX
  d3.tsv('dat/d3matrix_datacols.txt', function(d) {
    return {
      title: d.title,
      group: d.group
    };
  },
  function(error, labels) {

    var margin = {top: 150, right: 50, bottom: 50, left: 150},
      width = 1400 - margin.left - margin.right,
      height = 1400 - margin.top - margin.bottom,
      gridSize = Math.floor(width / labels.length),
      legendElementWidth = gridSize*2;

    var svg = d3.select("d3matrix").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var rowLabels = svg.selectAll(".rowlabel")
      .data(labels)
      .enter().append("text")
        .text(function(d) { return d.title; })
        .attr("x", 0)
        .attr("y", function(d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return "rowlabel mono r"+i; })
        .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
        .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);});

    rowLabels.transition().duration(1000)
      .style("fill", function(d) {return colorgroup(d.group); });


    var colLabels = svg.selectAll(".collabel")
      .data(labels)
      .enter().append("text")
        .text(function(d) { return d.title; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "left")
        .attr("transform", "translate(" + gridSize / 2 + ", -6) rotate (-90)")
        .attr("class", function(d, i) { return "collabel mono c"+i; })
        .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
        .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);});

    colLabels.transition().duration(1000)
      .style("fill", function(d) {return colorgroup(d.group); });

    d3.tsv('dat/d3matrix_data.tsv', function(d) {
      return {
        link1: d.link1,
        link2: d.link2,
        value: +d.value
      };
    },
    function(error, data) {

      var colorScale = d3.scale.linear()
        .domain([0, .2, .7])
        .range(["#E1F5FE", "#FFD180", "#DD2C00"]);

      var cards = svg.selectAll(".link2")
          .data(data, function(d) {return d.link1+':'+d.link2;});

      cards.append("title");
      
      cards.enter().append("rect")
          .attr("x", function(d) { return (d.link2 - 1) * gridSize; })
          .attr("y", function(d) { return (d.link1 - 1) * gridSize; })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "link2 bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("fill", "ccc")
          .on("mouseover", function(d){
            d3.select(this).classed("cell-hover",true);
            d3.selectAll(".rowlabel").classed("active",function(r,ri){ return ri==d.link1-1; });
            d3.selectAll(".collabel").classed("active",function(c,ci){ return ci==d.link2-1; });
            d3.select("#tooltip")
              .style("left", (d3.event.pageX+10) + "px")
              .style("top", (d3.event.pageY-10) + "px")
              .select("#value")
              .html("<strong>"+labels[d.link1-1].title+"</strong>"+" : "+"<strong>"+labels[d.link2-1].title+"</strong>"+"<br>"+"similarity: "+d.value);  
              d3.select("#tooltip").classed("hidden", false);
            })
          .on("mouseout", function(){
            d3.select(this).classed("cell-hover",false);
            d3.selectAll(".rowlabel").classed("active",false);
            d3.selectAll(".collabel").classed("active",false);
            d3.select("#tooltip").classed("hidden", true);
          });

      cards.transition().duration(1000)
          .style("fill", function(d) { return colorScale(d.value); });
    });

  });

})(d3);