# d3-grid-layout #

A grid layout for [d3.js](http://d3js.org/). The layout gradually expands to
fit its nodes/cells within its boundaries.

See the [demo](http://hughsk.github.com/d3-grid-layout/) for a better
explanation.

d3 has a super-intriguing but also perplexing API, so hopefully this lines up
with the built-in layouts OK.

## Installation ##

Built for use with [browserify](http://browserify.org/) - open an issue or pull
request if you'd like to use it with something else :)

``` bash
npm install d3-grid-layout
```

## Usage ##

**gridLayout = require('d3-grid-layout')(d3)**

Load up the grid layout by passing it your instance of d3.

**grid = gridLayout([nodes])**

Create a new grid layout, optionally with an array of data to initiate with.

**grid.add(nodes)**

Append multiple items to the data array.

**grid.push(nodes)**

Append a single item to the data array.

**grid.sort(comparator)**

Sort items in the grid by a comparator function.

**grid.width(width)**

Set the width of the grid layout.

**grid.height(height)**

Set the height of the grid layout.

**grid.align(dimensions)**

Pass a number to change the alignment of the layout, where -1 is top-left, 0 is
centered, and 1 is bottom-right.

Alternatively, pass an array for toggling horizontal and vertical alignment
(e.g. `[-1, 0]` is middle-left).

**grid.speed(speed)**

Change the transition rate when updating the grid layout - defaults to `0.02`.

**grid.radius(radius)**

The maxiumum amount of distance between points in the grid.

**grid.nodes(node)**

Replace the current set of nodes with a new array.

**grid.ease()**

Set the easing function. Takes either a custom easing function, or the same
arguments as `d3.ease`.

**grid.tick()**

Forces an animation tick.

**grid.update()**

Updates the grid layout - this is done automatically when using `grid.add` or
`grid.push`, but should be triggered manually otherwise.

**grid.cols()**

Returns the amount of columns wide the grid is currently.

**grid.rows()**

Returns the amount of rows high the grid is currently.

**grid.size()**

Returns an array with the actual width/height of the grid space, e.g.
`[400, 500]`.
