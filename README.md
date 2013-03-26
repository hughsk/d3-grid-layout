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

**grid.center(dimensions)**

Pass a boolean to enable/disable centering of the layout (e.g. `true`).
Alternatively, pass an array for toggling horizontal and vertical centering
(e.g. `[true, false]`).

**grid.speed(speed)**

Change the transition rate when updating the grid layout - defaults to `0.02`.

**grid.diameter(diameter)**

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
