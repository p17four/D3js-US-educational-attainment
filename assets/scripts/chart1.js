var Accio_gitrepo="Github Repo: https://github.com/colorfest/d3js";
var data = [{
  "name": "2009",
  "rank": 92,45
}, {
  "name": "2010",
  "rank": 65,5
}, {
  "name": "2011",
  "rank": 85,25
}, {
  "name": "2012",
  "rank": 101,56
}, {
  "name": "2013",
  "rank": 104,6
}, {
  "name": "2014",
  "rank": 117,63
}, {
  "name": "2015",
  "rank": 97,2
}, {
  "name": "2016",
  "rank": 92,14
}, {
  "name": "2017",
  "rank": 90,25
}];

var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 60
  },
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  x = d3.scaleBand().rangeRound([15, width]).paddingInner(0.5),
  y = d3.scaleLinear().range([height, 0]);

//draw axis
var xAxis = d3.axisBottom().scale(x).ticks(6);

var yAxis = d3.axisLeft().scale(y).ticks(5).tickSizeInner(-width).tickSizeOuter(0).tickPadding(10);

var svg = d3.select("#barGraph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) {
  return d.name;
}));

y.domain([0, d3.max(data, function(d) {
  return d.rank;
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-0.5em")
  .attr("dy", "-.55em")
  .attr("y", 30)
  .attr("transform", "rotate(-45)");

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 5)
  .attr("dy", "0.8em")
  .attr("text-anchor", "end")
  .text("Member Rank");

svg.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
  .style("fill", "orange")
  .attr("x", function(d) {
    return x(d.name);
  })
  .attr("width", x.bandwidth())
  .attr("y", function(d) {
    return y(d.rank);
  })
  .attr("height", function(d) {
    return height - y(d.rank);
  })
  .on("mouseover", function() {
    tooltip.style("display", null);
  })
  .on("mouseout", function() {
    tooltip.style("display", "none");
  })

.on("mousemove", function(d) {

  tooltip.transition().duration(200)
    .style("opacity", 0.9);
  tooltip.select("div").html("Name: <strong>" + d.name + "</strong><br/>Rank: <strong>" + d.rank + "</strong>")
    .style("position", "fixed")
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px");

});

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0.5);

tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "#ffffff")
  .style("opacity", 0.5);

tooltip.append("div")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "1.5em")
  .attr("font-weight", "bold");
