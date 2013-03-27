var d3 = window.d3 || require('d3')
var grid = require('./')(d3)

var layout = grid()
  .width(window.innerWidth - 40)
  .height(window.innerHeight - 40)
  .radius(80)
  .align(0)
  .ease('back', 2)

var svg = d3.select('body')
  .append('svg')
  .style('margin', '0 auto')
  .style('display', 'block')
  .attr('width', window.innerWidth)
  .attr('height', window.innerHeight)

var group = svg
  .append('g')
  .attr('transform', 'translate(20,20)')

var nodes = group
  .selectAll('.node')
  .data(layout.nodes())

layout.on('tick', function() {
  nodes
    .attr('cx', function(d) { return d.x })
    .attr('cy', function(d) { return d.y })
})

setInterval(function() {

  layout.push({
    scale: Math.pow(Math.random(), 2) * 10 + 3
  })

  nodes = nodes.data(layout.nodes())

  nodes.enter()
    .append('circle')
    .classed('node', true)
    .attr('r', 0)
    .style('fill', '#a88')
    .style('stroke', '#544')
    .style('stroke-width', '2px')
   .transition()
    .duration(350)
    .ease('elastic')
    .attr('r', function(d) { return d.scale })

}, 250)

window.onresize = function() {
  layout
    .width(window.innerWidth - 40)
    .height(window.innerHeight - 40)
    .update()

  svg.attr('width', window.innerWidth)
  svg.attr('height', window.innerHeight)
}