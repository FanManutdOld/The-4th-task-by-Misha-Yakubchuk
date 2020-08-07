class Runner {
  private runner: HTMLElement;

  private slider: HTMLElement;

  public halfWidth: number;

  private vertical: boolean;

  constructor(slider: HTMLElement, runnerSide: string) {
    this.slider = slider;
    this.initRunner(runnerSide);
  }

  public setZIndex() {
    this.runner.style.zIndex = '1';
  }

  public removeZIndex() {
    this.runner.style.zIndex = '0';
  }

  public setPos(pos: number) {
    if (this.vertical) {
      this.runner.style.bottom = `${(pos / this.slider.offsetHeight) * 100}%`;
    } else {
      this.runner.style.left = `${(pos / this.slider.offsetWidth) * 100}%`;
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.runner.style.bottom = '';
    this.runner.style.left = '';
    if (vertical) {
      this.halfWidth = this.runner.offsetHeight / 2;
    } else {
      this.halfWidth = this.runner.offsetWidth / 2;
    }
  }

  public append() {
    if (!this.slider.contains(this.runner)) {
      this.slider.append(this.runner);
      if (this.vertical) {
        this.halfWidth = this.runner.offsetHeight / 2;
      } else {
        this.halfWidth = this.runner.offsetWidth / 2;
      }
    }
  }

  public remove() {
    if (this.slider.contains(this.runner)) {
      this.slider.removeChild(this.runner);
    }
  }

  private initRunner(runnerSide: string) {
    this.runner = document.createElement('div');
    this.runner.className = `slider__runner slider__${runnerSide}`;
    this.slider.append(this.runner);
  }
}

export default Runner;
