class Runner {
  runner: HTMLElement;

  constructor(slider: HTMLElement, scin: string, runnerSide: string) {
    this.initRunner(slider, scin, runnerSide);
  }

  initRunner(slider: HTMLElement, scin: string, runnerSide: string) {
    this.runner = document.createElement('div');
    this.runner.className = `slider__runner slider__${runnerSide} slider__${runnerSide}_${scin}`;
    slider.appendChild(this.runner);
  }

  getWidth(): number {
    return this.runner.offsetWidth;
  }

  getPos(): number {
    return this.runner.getBoundingClientRect().left;
  }

  setPos(pos: string) {
    this.runner.style.left = pos;
  }
}

export default Runner;
