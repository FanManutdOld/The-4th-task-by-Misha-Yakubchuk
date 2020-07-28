class Runner {
  private runner: HTMLElement;

  private scin: string;

  private runnerSide: string;

  public halfWidth: number;

  public vertical: boolean;

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
    if (this.vertical) {
      this.runner.style.bottom = pos;
    } else {
      this.runner.style.left = pos;
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.runner.className = vertical
      ? `slider__runner slider__${this.runnerSide} slider__${this.runnerSide}_${this.scin}_vertical`
      : `slider__runner slider__${this.runnerSide} slider__${this.runnerSide}_${this.scin}_horizontal`;
  }

  private initRunner(slider: HTMLElement, scin: string, runnerSide: string) {
    this.runner = document.createElement('div');
    this.scin = scin;
    this.runnerSide = runnerSide;
    slider.append(this.runner);
  }
}

export default Runner;
