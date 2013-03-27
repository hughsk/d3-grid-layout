module.exports = orderedGrid

function orderedGrid(d3) {
  function layout(starters) {
    var grid = {}
      , event = d3.dispatch('tick')
      , idCounter = 0
      , nodes = []
      , index = {}
      , width = 500
      , height = 500
      , ratio = width / height
      , diameter = 50
      , alpha = 0
      , speed = 0.02
      , ease = d3.ease('linear')
      , align = [0, 0]
      , localWidth
      , localHeight
      , sort
      , rows
      , cols

    grid.sort = function(fn) {
      if (!arguments.length) return sort
      sort = fn; return grid
    }

    // Alignment
    // [horizontal, vertical] or both with a single boolean
    // -1 is left
    //  0 is centered
    // +1 is right
    grid.align = function(c) {
      if (!arguments.length) return c
      align = Array.isArray(c) ? c : [c, c]
      align[0] = align[0] * 0.5 + 0.5
      align[1] = align[1] * 0.5 + 0.5
      return grid
    }

    grid.width = function(w) {
      if (!arguments.length) return width
      ratio = width / height
      width = w; return grid
    }
    grid.height = function(h) {
      if (!arguments.length) return height
      ratio = width / height
      height = h; return grid
    }

    grid.rows = function() {
      return rows
    }
    grid.cols = function() {
      return cols
    }
    grid.size = function() {
      return [localWidth, localHeight]
    }

    // Speed of movement when rearranging
    // the node layout
    grid.speed = function(s) {
      if (!arguments.length) return speed
      speed = s; return grid
    }

    // The distance between nodes on the grid
    grid.radius = function(d) {
      if (!arguments.length) return diameter
      diameter = d / 2; return grid
    }

    // add multiple values to the grid
    grid.add = function(arr) {
      for (var i = 0, l = arr.length; i < l; i += 1) grid.push(arr[i], true)
      return grid.update()
    }

    // add a single value to the grid
    grid.push = function(node, _noLayout) {
      if (typeof node !== 'object') node = {
        id: node
      }

      node.id = String(node.id || idCounter++)

      if (index[node.id]) return

      node.x = node.x || width/2   // x-position
      node.y = node.y || height/2  // y-position
      node.sx = node.sx || width/2  // starting x-position (for animation)
      node.sy = node.sy || height/2 // starting y-position
      node.gx = node.gx || width/2  // goal x-position
      node.gy = node.gy || height/2 // goal y-position

      index[node.id] = node
      nodes.push(node)

      return _noLayout ? grid : grid.update()
    }

    // Update the arrangement of the nodes
    // to fit into a grid. Called automatically
    // after push/add
    grid.update = function() {
      var gridLength = nodes.length

      rows = Math.max(Math.floor(Math.sqrt(gridLength * height / width)), 1)
      cols = Math.ceil(gridLength / rows)
      localWidth = Math.min(width, diameter * cols)
      localHeight = Math.min(height, diameter * rows)

      var offsetX = (width - localWidth) * align[0]
        , offsetY = (height - localHeight) * align[1]
        , i = 0
        , node

      if (sort) nodes.sort(sort)

      toploop:
      for (var x = 0.5; x < cols; x += 1)
      for (var y = 0.5; y < rows; y += 1, i += 1) {
        node = nodes[i]
        if (!node) break toploop
        node.gx = offsetX + localWidth * x / cols
        node.gy = offsetY + localHeight * y / rows
        node.sx = node.x
        node.sy = node.y
      }

      d3.timer(grid.tick)
      alpha = 1

      return grid
    }

    grid.nodes = function(arr) {
      if (!arguments.length) return nodes
      nodes = arr
      return grid
    }

    grid.ease = function(fn) {
      if (!arguments.length) return fn
      if (typeof fn == 'function') {
        ease = fn
      } else {
        ease = d3.ease.apply(d3, Array.prototype.slice.call(arguments))
      }
      return grid
    }

    grid.tick = function() {
      var i = nodes.length
        , node
        , scaled = ease(alpha * alpha)

      while (i--) {
        node = nodes[i]
        node.x = scaled * (node.sx - node.gx) + node.gx
        node.y = scaled * (node.sy - node.gy) + node.gy
        if (Math.abs(node.x) < 0.0001) node.x = 0
        if (Math.abs(node.y) < 0.0001) node.y = 0
      }

      event.tick({ type: 'tick' })

      if (alpha < 0) return true
      alpha -= speed
    }

    grid.add(starters || [])

    return d3.rebind(grid, event, "on")
  }

  return layout
}
