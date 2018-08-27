function Sqare (x, y, w, lable) {
  this.x = x
  this.y = y
  this.w = w
  this.lable = lable

  this.show = function() {
    if (this.lable === 'white') {
      fill(255)
    } else if (this.lable === 'black') {
      fill(0)
    } else if (this.lable === 'red') {
      fill(255, 0, 0)
    } else if (this.lable === 'green') {
      fill(0, 255, 0)
    } else if (this.lable === 'blue') {
      fill(0, 0, 255)
    } else {
      fill(100, 100, 100)
      stroke(0)
      strokeWeight(2)
      rect(this.x, this.y, this.w, this.w)
      textSize(32)
      fill(255)
      text('fine', this.x + this.w / 6, this.y + this.w / 1.5)
      return
    }
   
    stroke(0)
    strokeWeight(2)
    rect(this.x, this.y, this.w, this.w)
  }

  this.isPressed = function() {
    if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.w) {
      return true
    }
    return false
  }
}