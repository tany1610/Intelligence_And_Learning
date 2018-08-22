let tree

function setup() {
  tree = new Tree()
  for (let i = 0; i < 10; i++) {
    tree.addNode(floor(random(0, 100)))
  }
  tree.print()
  let result = tree.search(10)
  if (result) {
    console.log('found')
  } else {
    console.log('not found')
  }
}

function draw() {
}

function Tree () {
  this.root = null

  this.addNode = function (val) {
    let n = new Node(val)
    if (this.root == null) {
      this.root = n
    } else {
      this.root.addNode(n)
    }
  }

  this.print = function () {
    this.root.visit()
  }

  this.search = function (val) {
    return this.root.check(val)
  }
}

function Node (val) {
  this.left = null
  this.right = null
  this.value = val

  this.addNode = function (n) {
    if (n.value < this.value){
      if (this.left === null) {
        this.left = n
      } else {
        this.left.addNode(n)
      }
    } else {
      if (this.right === null) {
        this.right = n
      } else {
        this.right.addNode(n)
      }
    }   
  }

  this.visit = function() {
    if (this.left) {
      this.left.visit()
    }
    console.log(this.value)
    if (this.right) {
      this.right.visit()
    }
  }

  this.check = function (val) {
    if (this.value === val) {
      return this
    }
    if (val < this.value) {
      if (this.left){
        return this.left.check(val)
      }
    } 
    if (val > this.value) {
      if (this.right) {
        return this.right.check(val)
      }
    }
    return null
  }
}
