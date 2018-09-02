function chooseBest(savedPlayers) {
  let best = savedPlayers[0]
  for (let i = 1; i < savedPlayers.length; i++) {
    if (savedPlayers[i].score > best.score) {
      best = savedPlayers[i]
    }
  }
  return best
}
