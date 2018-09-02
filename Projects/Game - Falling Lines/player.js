function Player(brain) {
  this.x = width / 2
  this.w = 20
  if (brain) {
    this.brain = NeuralNetwork.copy(brain)
  } else {
    this.brain = new NeuralNetwork(5, 5, 3)
  }
  this.y = height - this.w
  this.speed = 5
  this.score = 0

  this.show = function() {
    fill(255, 50)
    noStroke()
    rect(this.x, this.y, this.w, this.w)
  }

  this.mutate = function () {
    this.brain.weights_IH.mutate()
    this.brain.weights_HO.mutate()
    this.brain.bias_H.mutate()
    this.brain.bias_O.mutate()
  }
}