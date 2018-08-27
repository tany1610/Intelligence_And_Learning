let inputs = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
]

let targets = [
  [0],
  [1],
  [1],
  [0]
]

function setup() {
  // TESTING WITH XOR
  let nn = new NeuralNetwork(2, 2, 1)

  // GUESSING BEFORE TRAINING
  for (let i = 0; i < inputs.length; i++) {
    let output = nn.guess(inputs[i])
    console.log(`${inputs[i]} -> ${output} //${targets[i]}`)
  }

  // TRAINING
  for (let i = 0; i < 50000; i++) {
    let index = floor(random(0, 4))
    nn.train(inputs[index], targets[index])
  }
  console.log('--------------------------')

  // GUESSING AFTER TRAINING
  for (let i = 0; i < inputs.length; i++) {
    let output = nn.guess(inputs[i])
    console.log(`${inputs[i]} -> ${output} //${targets[i]}`)
  }
}