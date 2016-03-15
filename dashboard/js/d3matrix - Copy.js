      //READ CSV FILE
      function readTextFile(file) {
          var rawFile = new XMLHttpRequest();
          rawFile.open("GET", file, false);
          rawFile.onreadystatechange = function () {
              if(rawFile.readyState === 4) {
                  if(rawFile.status === 200 || rawFile.status == 0) {
                      var allText = rawFile.responseText;

                      links = allText.split('\r\n');
                  }
              }
          }
          rawFile.send(null);
      }

      readTextFile('dat/d3matrix_datacols.txt');
      console.log(links);

      var margin = {top: 120, right: 50, bottom: 50, left: 120},
          width = 1000 - margin.left - margin.right,
          height = 1000 - margin.top - margin.bottom,
          gridSize = Math.floor(width / links.length),
          legendElementWidth = gridSize*4,
          colors = ['#FFFFFF', '#01579B','#FF6F00'];

      var svg_matrix = d3.select("#matrix").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var rowLabels = svg_matrix.selectAll(".rowlabel")
          .data(links)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", 0)
            .attr("y", function(d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return "rowlabel mono r"+i; })
            .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
            .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);});

      var colLabels = svg_matrix.selectAll(".collabel")
          .data(links)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "left")
            .attr("transform", "translate(" + gridSize / 2 + ", -6) rotate (-90)")
            .attr("class", function(d, i) { return "collabel mono c"+i; })
            .on("mouseover", function(d) {d3.select(this).classed("text-hover",true);})
            .on("mouseout" , function(d) {d3.select(this).classed("text-hover",false);});

      d3.tsv('dat/d3matrix_data.tsv', function(d) {
          return {
            link1: +d.link1,
            link2: +d.link2,
            value: +d.value
          };
        },
        function(error, data) {

          var colorScale = d3.scale.linear()
              .domain([0, d3.max(data, function (d) { return d.value; }) /2 , d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg_matrix.selectAll(".link2")
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
              .style("fill", colors[0])
              .on("mouseover", function(d){
                 d3.select(this).classed("cell-hover",true);
                 d3.selectAll(".rowlabel").classed("active",function(r,ri){ return ri==d.link1-1; });
                 d3.selectAll(".collabel").classed("active",function(c,ci){ return ci==d.link2-1; });
          
                 //Update the tooltip position and value
                 d3.select("#tooltip")
                   .style("left", (d3.event.pageX+10) + "px")
                   .style("top", (d3.event.pageY-10) + "px")
                   .select("#value")
                   .html(links[d.link1-1]+" : "+links[d.link2-1]+"<br>"+"similarity: "+d.value);  
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