let perceptron
let p1, p2, m, b
let inputs = []
let points = []

function setup() {
  createP("Perceptron trying to guess where the line is")
  createCanvas(600,600)
  m = random(-1, 1)
  b = random(-1, 1)
  perceptron = new Perceptron()
  for (let i = 0; i < 50; i++) {
    points.push(new Point(undefined, undefined, m, b))
  }
}

// set different formula for the line
// y = mx + b
function f (x, m, b) {
  return m * x + b
}

function draw() {
  background(0)
  
  p1 = new Point(-1, f(-1, m, b), m, b)
  p2 = new Point(1, f(1, m, b), m, b)

  p3 = new Point(-1, perceptron.guessY(-1), m, b)
  p4 = new Point(1, perceptron.guessY(1), m, b)

  stroke(255)
  strokeWeight(2)
  line(p1.mapX(), p1.mapY(), p2.mapX(), p2.mapY())
  stroke(100)
  strokeWeight(5)
  line(p3.mapX(), p3.mapY(), p4.mapX(), p4.mapY())
  let index = floor(random(0, points.length))
  let p = points[index]
  perceptron.train([p.x, p.y, p.bias], p.label)
  let right = 0
  for (let p of points) {
    if (right == points.length - 1) {
      createP("DONE!")
      noLoop()
    }   
    stroke(180)
    strokeWeight(2)
    p.show()
    let guess = perceptron.guess([p.x, p.y, p.bias])
    if (p.label === guess) {
      fill(0, 255, 0)
      right++
    } else {
      fill(255, 0, 0)
    }
    ellipse(p.mapX(), p.mapY(), 10, 10)
  }
}