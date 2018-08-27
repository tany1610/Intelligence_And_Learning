let nn
let training_data = [
  {
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
]

function setup() {
  createCanvas(700, 700)
  nn = new NeuralNetwork(2, 4, 1)
}

function draw() {
  background(150)
  for (let i = 0; i < 1000; i++) {
    let data = random(training_data)
    nn.train(data.inputs, data.outputs)
  }
  let size = 10
  let rows = height / size
  let cols = width / size
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x1 = i / rows
      let x2 = j / cols
      let inputs = [x1, x2]
      let y = nn.guess(inputs)
      noStroke()
      fill(y * 255)
      rect(i * size, j * size, size, size)
    }
  }
}