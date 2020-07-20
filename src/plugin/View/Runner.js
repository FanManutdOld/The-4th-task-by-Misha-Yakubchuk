class Runner {
  constructor(slider, scin, runnerSide) {
    this.initRunner(slider, scin, runnerSide);
  }

  initRunner(slider, scin, runnerSide) {
    this.runner = document.createElement("div");
    this.runner.className = `slider__runner slider__${runnerSide} slider__${runnerSide}_${scin}`;
    slider.appendChild(this.runner);
  }

  getWidth() {
    return this.runner.offsetWidth;
  }

  getPos() {
    return this.runner.getBoundingClientRect().left;
  }

  setPos(pos) {
    this.runner.style.left = pos;
  }
}

export default Runner;