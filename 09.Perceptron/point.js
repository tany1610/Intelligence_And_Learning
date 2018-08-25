function Point(x, y, m, b) {
  this.bias = 1
  if (x && y) {
    this.x = x
    this.y = y
  } else {
    this.x = random(-1, 1)
    this.y = random(-1, 1)
  }
  this.mapX = function () {
    return map(this.x, -1, 1, 0, width)
  }
  this.mapY = function () {
    return map(this.y, -1, 1, height, 0)
  }
  this.m = m
  this.b = b
  this.f = function (x, m, b) {
    return m * x + b
  }
  let lineY = f(this.x, this.m, this.b)
  if (this.y > lineY) {
    this.label = 1
  } else {
    this.label = -1
  }
  this.show = function () {
    if (this.label === 1) {
      fill(255)
    } else {
      fill(0)
    }
    ellipse(this.mapX(), this.mapY(), 20, 20)
  }
}