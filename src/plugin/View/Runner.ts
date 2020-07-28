class Runner {
  private runner: HTMLElement;

  public halfWidth: number;

  constructor(slider: HTMLElement, scin: string, runnerSide: string) {
    this.initRunner(slider, scin, runnerSide);
    this.halfWidth = this.runner.offsetWidth / 2;
  }

  public setZIndex() {
    this.runner.style.zIndex = '1';
  }

  public removeZIndex() {
    this.runner.style.zIndex = '0';
  }

  public setPos(pos: string) {
    this.runner.style.left = pos;
  }

  private initRunner(slider: HTMLElement, scin: string, runnerSide: string) {
    this.runner = document.createElement('div');
    this.runner.className = `slider__runner slider__${runnerSide} slider__${runnerSide}_${scin}`;
    slider.append(this.runner);
  }
}

export default Runner;
