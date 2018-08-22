let grid = []
let w
let rows
let cols
let current
let stack = []

function setup() {
  createCanvas(400, 400)
  // frameRate(10)
  w = 5
  rows = width / w
  cols = height / w
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = new Cell(i, j)
      grid.push(cell)
    }
  }
  current = grid[0]
  current.visited = true
}

function draw() {
  background(235, 239, 16)
  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }
  let next = current.checkNeighbors()
  if (next) {
    next.visited = true
    if (current.x - next.x < 0) {
      current.walls[1] = false
      next.walls[3] = false
    } else if (current.x - next.x > 0) {
      current.walls[3] = false
      next.walls[1] = false
    } else if (current.y - next.y < 0) {
      current.walls[2] = false
      next.walls[0] = false
    } else if (current.y - next.y > 0) {
      current.walls[0] = false
      next.walls[2] = false
    }
    current = next
    stack.push(current)
  } else {
    if (stack.length > 0) {
      current = stack.pop()
    } else {
      console.log('done!')
      noLoop()
    }
  }
  current.highlight()
}

function index (i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1
  }
  return j + i * cols
}

function Cell (x, y) {
  this.x = x
  this.y = y
  this.visited = false
  this.walls = [true, true, true, true]

  this.show = function () {
    let x = this.x * w
    let y = this.y * w
    stroke(0)
    if (this.walls[0]) {
      line(x, y, x + w, y)
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w)
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w)
    }
    if (this.walls[3]) {
      line(x, y + w, x, y)
    }

    if (this.visited) {
      fill(216, 83, 26, 150)
      noStroke()
      rect(x, y, w, w)
    }
  }

  this.checkNeighbors = function() {
    let neighbors = []

    let top = grid[index(x, y - 1)]
    let right = grid[index(x + 1, y)]
    let bottom = grid[index(x, y + 1)]
    let left = grid[index(x - 1, y)]

    if (top && !top.visited) {
      neighbors.push(top)
    }
    if (right && !right.visited) {
      neighbors.push(right)
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if (left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      let idx = floor(random(neighbors.length))
      return neighbors[idx]
    }
  }

  this.highlight = function() {
    fill(15, 219, 4)
    noStroke()
    rect(this.x * w, this.y * w, w, w)
  }
}