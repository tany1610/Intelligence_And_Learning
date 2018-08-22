let data = []
let m = 0
let b = 1

function setup() {
  createCanvas(600,600)
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1)
  let y = map(mouseY, 0, height, 1, 0)
  let point = createVector(x, y)
  data.push(point)
}

function linearRegression() {
  let xAverage = 0
  let yAverage = 0

  for (let i = 0; i < data.length; i++) {
    xAverage += data[i].x
    yAverage += data[i].y
  }

  let num = 0
  let den = 0

  for (let i = 0; i < data.length; i++) {
    num += (data[i].x - xAverage) * (data[i].y - yAverage)
    den += (data[i].x - xAverage) * (data[i].x - xAverage)
  }

  m = num / den
  b = yAverage - m * xAverage
}

function drawLine() {
  let x1 = 0
  let y1 = m * x1 + b
  let x2 = 1
  let y2 = m * x2 + b

  x1 = map(x1, 0, 1, 0, width)
  y1 = map(y1, 0, 1, height, 0)
  x2 = map(x2, 0, 1, 0, width)
  y2 = map(y2, 0, 1, height, 0)

  stroke(198, 46, 0)
  strokeWeight(4)
  line(x1, y1, x2, y2)
}

function draw() {
  background(229, 225, 0)
  if (random(1) < 0.05) {
    data.push(createVector(random(1), random(1)))
  }
  for (let p of data) {
    stroke(0)
    strokeWeight(4)
    fill(30, 1, 137)
    ellipse(map(p.x, 0, 1, 0, width), map(p.y, 0, 1, height, 0), 8, 8)
  }
  if (data.length > 1) {
    linearRegression()
    drawLine()
  }
}