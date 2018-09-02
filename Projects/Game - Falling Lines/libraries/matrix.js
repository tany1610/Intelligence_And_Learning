function Matrix (rows, cols) {
  this.rows = rows
  this.cols = cols
  this.data = []

  for (let row = 0; row < this.rows; row++) {
    this.data[row] = []
    for (let col = 0; col < this.cols; col++) {
      this.data[row][col] = random(-1, 1)
    }
  }

  this.randomize = function() {
    for (let row = 0; row < this.rows; row++) {
      this.data[row] = []
      for (let col = 0; col < this.cols; col++) {
        this.data[row][col] = random(-1, 1)
      }
    }
  }

  this.scale = function (num) {
    if (num instanceof Matrix) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] *= num.data[row][col]
        }
      }  
    } else {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] *= num
        }
      }
    }
  }

  this.add = function (num) {
    if (num instanceof Matrix) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] += num.data[row][col]
        }
      }
    } else {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.data[row][col] += num
        }
      }
    }
  }

  this.map = function (func) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let val = this.data[row][col]
        this.data[row][col] = func(val)
      }
    }
  }

  this.print = function () {
    console.table(this.data)
  }

  this.mutate = function() {
    let mutationRate = 0.01
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (random(1) < mutationRate) {
          this.data[row][col] = random(-1, 1)
        }
      }
    }
  }
}

Matrix.copy = function(m) {
  let newMarix = new Matrix(m.rows, m.cols)
  for (let row = 0; row < newMarix.rows; row++) {
    for (let col = 0; col < newMarix.cols; col++) {
      newMarix.data[row][col] = m.data[row][col]
    }
  }
  return newMarix
}

Matrix.map = function (matrix, func) {
  let result = new Matrix(matrix.rows, matrix.cols)
  for (let row = 0; row < matrix.rows; row++) {
    for (let col = 0; col < matrix.cols; col++) {
      let val = matrix.data[row][col]
      result.data[row][col] = func(val)
    }
  }
  return result
}

Matrix.multiply = function (a, b) {
  let result = new Matrix(a.rows, b.cols)
  for (let aRow = 0; aRow < a.rows; aRow++) {
    for (let bCol = 0; bCol < b.cols; bCol++) {
      let sum = 0
      for (let i = 0; i < a.cols; i++) {
        sum += a.data[aRow][i] * b.data[i][bCol]
      }
      result.data[aRow][bCol] = sum
    }
  }
  return result
}

Matrix.transpose = function (matrix) {
  let result = new Matrix(matrix.cols, matrix.rows)
  for (let i = 0; i < result.rows; i++) {
    for (let j = 0; j < result.cols; j++) {
      result.data[i][j] = matrix.data[j][i] 
    }
  }
  return result
}

Matrix.fromArray = function (array) {
  let result = new Matrix(array.length, 1)
  for (let i = 0; i < array.length; i++) {
    result.data[i][0] = array[i]
  }
  return result
}

Matrix.toArray = function (matrix) {
  let result = []
  for (let i = 0; i < matrix.rows; i++) {
    result.push(matrix.data[i][0])
  }
  return result
}

Matrix.subtract = function (a, b) {
  let result = new Matrix(a.rows, a.cols)
  for (let row = 0; row < a.rows; row++) {
    for (let col = 0; col < a.cols; col++) {
      result.data[row][col] = a.data[row][col] -= b.data[row][col]
    }
  }
  return result
}

function sigmoid (x) {
  return 1 / (1 + Math.exp(-x))
}

function sigmoid_derivative (y) {
  return y * (1 - y)
}