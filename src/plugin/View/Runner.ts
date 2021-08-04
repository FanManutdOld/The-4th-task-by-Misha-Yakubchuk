import Tip from './Tip';

class Runner {
  public halfWidth: number;

  private runner: HTMLElement;

  private tip: Tip;

  private slider: HTMLElement;

  private isVertical: boolean;

  constructor(slider: HTMLElement, runnerSide: string) {
    this.slider = slider;
    this.init(runnerSide);
  }

  public setPos(pos: number) {
    if (this.isVertical) {
      this.runner.style.bottom = `${(pos / this.slider.offsetHeight) * 100}%`;
    } else {
      this.runner.style.left = `${(pos / this.slider.offsetWidth) * 100}%`;
    }
  }

  public getTipRect(): DOMRect {
    return this.tip.getRect();
  }

  public isConnectedTips(rectTipL: DOMRect) {
    return this.tip.isConnected(rectTipL);
  }

  public isDisconnectedTips(rectTipL: DOMRect) {
    return this.tip.isDisconnected(rectTipL);
  }

  public updateTip(pos: number, value: number | string, isUnited?: boolean) {
    this.tip.setValue(value);
    if (isUnited) {
      this.tip.setUnitedPos(pos);
    } else {
      this.tip.setPos(pos, this.halfWidth);
    }
  }

  public updateTipVisibility(isVisible: boolean) {
    this.tip.updateVisibility(isVisible);
  }

  public setZIndex() {
    this.runner.style.zIndex = '1';
  }

  public removeZIndex() {
    this.runner.style.zIndex = '0';
  }

  public setOrientation(isVertical: boolean) {
    this.isVertical = isVertical;
    this.runner.style.bottom = '';
    this.runner.style.left = '';
    if (isVertical) {
      this.halfWidth = this.runner.offsetHeight / 2;
    } else {
      this.halfWidth = this.runner.offsetWidth / 2;
    }
    this.tip.setOrientation(isVertical);
  }

  public append() {
    if (this.slider.contains(this.runner)) return;

    this.slider.append(this.runner);
    this.tip.append();
    if (this.isVertical) {
      this.halfWidth = this.runner.offsetHeight / 2;
    } else {
      this.halfWidth = this.runner.offsetWidth / 2;
    }
  }

  public remove() {
    if (this.slider.contains(this.runner)) {
      this.slider.removeChild(this.runner);
      this.tip.remove();
    }
  }

  private init(runnerSide: string) {
    this.runner = document.createElement('div');
    this.runner.className = `slider__runner slider__${runnerSide}`;
    this.slider.append(this.runner);
    const tipSide = runnerSide === 'runnerR' ? 'tipR' : 'tipL';
    this.tip = new Tip(this.slider, tipSide);
  }
}

export default Runner;
