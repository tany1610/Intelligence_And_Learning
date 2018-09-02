function NeuralNetwork (input, hidden, output) {
  this.input_nodes = input
  this.hidden_nodes = hidden
  this.output_nodes = output

  this.weights_IH = new Matrix(hidden, input)
  this.weights_HO = new Matrix(output, hidden)

  this.bias_H = new Matrix(hidden, 1)
  this.bias_O = new Matrix(output, 1)

  this.learning_rate = 0.08

  this.guess = function (input) {
    let inputMatrix = Matrix.fromArray(input)
    let hidden = Matrix.multiply(this.weights_IH, inputMatrix)
    hidden.add(this.bias_H)
    hidden.map(sigmoid)
    let output = Matrix.multiply(this.weights_HO, hidden)
    output.add(this.bias_O)
    output.map(sigmoid)
    return Matrix.toArray(output)
  }
}

NeuralNetwork.copy = function(nn) {
  let newNN = new NeuralNetwork(nn.input_nodes, nn.hidden_nodes, nn.output_nodes)
  newNN.weights_IH = Matrix.copy(nn.weights_IH)
  newNN.weights_HO = Matrix.copy(nn.weights_HO)
  newNN.bias_H = Matrix.copy(nn.bias_H)
  newNN.bias_O = Matrix.copy(nn.bias_O)
  return newNN
}