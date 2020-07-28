class Runner {
  private runner: HTMLElement;

  private scin: string;

  private runnerSide: string;

  public halfWidth: number;

  public vertical: boolean;

  constructor(slider: HTMLElement, scin: string, runnerSide: string) {
    this.initRunner(slider, scin, runnerSide);
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
    if (vertical) {
      this.runner.className = `s__runner s__${this.runnerSide}_${this.scin} s__${this.runnerSide}_${this.scin}_ver`;
      this.halfWidth = this.runner.offsetHeight / 2;
    } else {
      this.runner.className = `s__runner s__${this.runnerSide}_${this.scin} s__${this.runnerSide}_${this.scin}_hor`;
      this.halfWidth = this.runner.offsetWidth / 2;
    }
  }

  private initRunner(slider: HTMLElement, scin: string, runnerSide: string) {
    this.runner = document.createElement('div');
    this.scin = scin;
    this.runnerSide = runnerSide;
    slider.append(this.runner);
  }
}

export default Runner;
