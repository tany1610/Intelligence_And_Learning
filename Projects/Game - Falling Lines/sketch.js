var obstacle
var players
var population = 200
var savedPlayers
var saveButton
var loadButton
var difficulty = 1
var slider
var score = 0

function setup() {
  createCanvas(600, 600)
  slider = createSlider(1, 10, 1)
  saveButton = createButton('Save best')
  saveButton.mousePressed(saveBest)
  loadButton = createButton('Load brain')
  loadButton.mousePressed(loadBest)
  players = []
  savedPlayers = []
  obstacle = new Obstacle(difficulty)
  for (let i = 0; i < population; i++) {
    players[i] = new Player() 
  }
}

function draw() {
  background(0)
  for (let i = 0; i < slider.value(); i++) {   
    if (obstacle.y > height + 100) {
      obstacle = new Obstacle(difficulty)
    }
    obstacle.update()
    obstacle.show()
    if (players.length === 0) {
      restartGame()
    }
    let i1 = obstacle.holeStart
    let i2 = obstacle.holeStart + obstacle.holeWidth
    let i5 = obstacle.y
    for (let i = 0; i < players.length; i++) {
      let i3 = dist(players[i].x, players[i].y, obstacle.holeStart + (obstacle.holeWidth / 2), obstacle.y)
      let i4 = players[i].x
      let inputs = [i1, i2, i3, i4, i5]
      let outputs = players[i].brain.guess(inputs)
      if (outputs[0] > outputs[1]) {
        players[i].x += players[i].speed
      } else {
        players[i].x -= players[i].speed
      }
      players[i].speed = 5 + map(outputs[2], 0, 1, 1, 3)
      players[i].score++
      players[i].show()
      if (checkIfDead(players[i])) {
        savedPlayers.push(players.splice(i, 1)[0])
      }
    }
    
    difficulty += 0.001   
  }
  if(players.length > 0) {
    score = players[0].score
  }
  fill(255)
  textSize(35)
  text(`Score: ${score}`, 10, 30)
}

function saveBest () {
  let nn = players[0].brain
  saveJSON(nn, 'brain.json')
}

function loadBest () {
  loadJSON('http://localhost:8000/save/brain.json', (loaded) => {
    players = []
    savedPlayers = []
    for (let i = 0; i < population; i++) {
      let bestCopy = new Player(loaded)
      bestCopy.mutate()
      players[i] = bestCopy
    }
    difficulty = 1
    obstacle = new Obstacle(difficulty)
  })
}

function checkIfDead(player) {
  if (player.y <= obstacle.y) {
    if (player.x > obstacle.holeStart && player.x + player.w < obstacle.holeStart + obstacle.holeWidth) {
    } else {
      return true
    }
  } else if (player.x < 0 || player.x > width) {
    return true
  }
}

function restartGame() {
  let best = chooseBest(savedPlayers)
  players = []
  savedPlayers = []
  for (let i = 0; i < population; i++) {
    let bestCopy = new Player(best.brain)
    bestCopy.mutate()
    players[i] = bestCopy
  }
  difficulty = 1
  obstacle = new Obstacle(difficulty)
}