let nn, r, g, b
let squares = []
let guessedColor

function setup() {
  createCanvas(700, 700)
  nn = new NeuralNetwork(3, 10, 5)
  squares.push(new Sqare(50, 400, 80, 'white'))
  squares.push(new Sqare(150, 400, 80, 'black'))
  squares.push(new Sqare(250, 400, 80, 'red'))
  squares.push(new Sqare(350, 400, 80, 'green'))
  squares.push(new Sqare(450, 400, 80, 'blue'))
  squares.push(new Sqare(550, 400, 80, 'skip'))
  r = floor(random(255))
  g = floor(random(255))
  b = floor(random(255))
}

function mousePressed() {
  let guess = nn.guess([r, g, b])
  let guessedIndex = 0
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] > guess[guessedIndex]) {
      guessedIndex = i
    }
  }
  if (guessedIndex) {
    if (guessedIndex === 0) {
      guessedColor = 'white'
    } else if (guessedIndex == 1) {
      guessedColor = 'black'
    } else if (guessedIndex == 2) {
      guessedColor = 'red'
    } else if (guessedIndex == 3) {
      guessedColor = 'green'
    } else if (guessedIndex == 4) {
      guessedColor = 'blue'
    } else {
      r = floor(random(255))
      g = floor(random(255))
      b = floor(random(255))
      return
    }
  }
  
  let choice
  for (let square of squares) {
    if (square.isPressed()) {
      choice = square.lable
      break
    }
  }
  let targets = undefined
  if (choice === 'white') {
    targets = [1, 0 ,0, 0, 0]
  } else if (choice === 'black') {
    targets = [0, 1, 0, 0, 0]
  } else if (choice === 'red') {
    targets = [0, 0, 1, 0, 0]
  } else if (choice === 'green') {
    targets = [0, 0, 0, 1, 0]
  } else if (choice === 'blue') {
    targets = [0, 0, 0, 0, 1]
  } else {
    r = floor(random(255))
    g = floor(random(255))
    b = floor(random(255))
    return
  }
  if (targets) {
    nn.train([r, g, b], targets)
  }

  r = floor(random(255))
  g = floor(random(255))
  b = floor(random(255))
}

function draw() {
  background(r, g, b)
  for (square of squares){
    square.show()
  }
  if (guessedColor) {   
    textSize(102)
    noStroke()
    if (guessedColor === 'white') {
      fill(255)
    } else if (guessedColor === 'black') {
      fill(0)
    } else if (guessedColor === 'red') {
      fill(255, 0, 0)
    } else if (guessedColor === 'green') {
      fill(0, 255, 0)
    } else if (guessedColor === 'blue') {
      fill(0, 0, 255)
    }
    text(guessedColor, 250, 100)
  }
}