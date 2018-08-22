function Population (p, m, num){
  this.population;
  this.matingPool;
  this.generations = 0;
  this.finished = false;
  this.target = p;
  this.mutationRate = m;
  this.perfectScore = 1;

  this.best = "";

  this.population = [];
  for (let i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }
  this.matingPool = [];

  this.calcFitness = function () {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  this.calcFitness();

  this.naturalSelection = function () {
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    for (let i = 0; i < this.population.length; i++) {

      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  this.generate = function () {
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  this. getBest = function() {
    return this.best;
  }

  this.evaluate = function () {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  this.isFinished = function () {
    return this.finished;
  }

  this.getGenerations = function () {
    return this.generations;
  }

  this.getAverageFitness = function () {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  this.allPhrases = function () {
    let everything = "";

    let displayLimit = min(this.population.length, 50);


    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
}