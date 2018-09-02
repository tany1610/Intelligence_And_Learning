function Obstacle(difficulty) {
  this.x = 0
  this.y = 0
  this.speed = 5 + difficulty
  this.holeWidth = 300 / difficulty
  this.holeStart = random(width - this.holeWidth)
  

  this.show = function() {
    noStroke()
    fill(255)
    rect(this.x, this.y, width, 20)
    fill(0)
    rect(this.holeStart, this.y, this.holeWidth, 20)
  }

  this.update = function() {
    this.y += this.speed
  }
}