function Perceptron () {
  this.weights = []
  this.weights[0] = random(-1, 1)
  this.weights[1] = random(-1, 1)
  this.weights[2] = random(-1, 1)
  this.learningRate = 0.01

  this.guess = function (inputs) {
    let sum = 0
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    let output = this.sign(sum)
    return output
  }

  this.train = function (inputs, target) {
    let guess = this.guess(inputs)
    let error = target - guess
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningRate
    }
  }

  this.sign = function (number) {
    if (number < 0) {
      return -1
    } else {
      return 1
    }
  }

  this.guessY = function (x) {
    return -(this.weights[2]/this.weights[1]) - (this.weights[0] / this.weights[1]) * x
  }
}