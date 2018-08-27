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

  this.train = function (inputs, targets) {
    // feeding forward
    let inputMatrix = Matrix.fromArray(inputs)
    let hidden = Matrix.multiply(this.weights_IH, inputMatrix)
    hidden.add(this.bias_H)
    hidden.map(sigmoid)
    let outputs = Matrix.multiply(this.weights_HO, hidden)
    outputs.add(this.bias_O)
    outputs.map(sigmoid)

    targets = Matrix.fromArray(targets)
    let output_errors = Matrix.subtract(targets, outputs)
    
    // calculating output gradient
    let output_gradients = Matrix.map(outputs, sigmoid_derivative)
    output_gradients.scale(output_errors)
    output_gradients.scale(this.learning_rate)
    let hidden_T = Matrix.transpose(hidden)

    // changing the output biases
    this.bias_O.add(output_gradients)

    // calculating hiddent output weights deltas
    let weights_HO_deltas = Matrix.multiply(output_gradients, hidden_T)
    // changing hidden output weights
    this.weights_HO.add(weights_HO_deltas)

    // calculating hidden error
    let weights_HO_T = Matrix.transpose(this.weights_HO)
    let hidden_errors = Matrix.multiply(weights_HO_T, output_errors)

    // calculating hidden gradient
    let hidden_gradients = Matrix.map(hidden, sigmoid_derivative)
    hidden_gradients.scale(hidden_errors)
    hidden_gradients.scale(this.learning_rate)
    let input_T = Matrix.transpose(inputMatrix)

    // changing the hidden biases
    this.bias_H.add(hidden_gradients)

    // calculating input hidden weights deltas
    let weights_IH_deltas = Matrix.multiply(hidden_gradients, input_T)

    // changing hidden output weights
    this.weights_IH.add(weights_IH_deltas)
  }
}