class Tip {
  private tip: HTMLElement;

  private slider: HTMLElement;

  public halfWidth: number;

  private vertical: boolean;

  constructor(slider: HTMLElement, tipSide: string) {
    this.slider = slider;
    this.initTip(tipSide);
  }

  public setValue(newValue: number | string) {
    this.tip.textContent = (typeof newValue === 'string') ? newValue : `${newValue}`;
    this.halfWidth = this.vertical
      ? parseInt(getComputedStyle(this.tip).height) / 2
      : parseInt(getComputedStyle(this.tip).width) / 2;
  }

  public setPos(pos: number, shift: number) {
    if (this.vertical) {
      this.tip.style.bottom = `${((pos + shift - this.halfWidth) / this.slider.offsetHeight) * 100}%`;
    } else {
      this.tip.style.left = `${((pos + shift - this.halfWidth) / this.slider.offsetWidth) * 100}%`;
    }
  }

  public setUnitedPos(pos: number) {
    if (this.vertical) {
      this.tip.style.bottom = `${pos - this.halfWidth}px`;
    } else {
      this.tip.style.left = `${pos - this.halfWidth}px`;
    }
  }

  public isConnected(tipL: Tip): boolean {
    const rectR = this.tip.getBoundingClientRect();
    const rectL = tipL.tip.getBoundingClientRect();
    if (this.vertical) {
      return (rectR.bottom >= rectL.top);
    }
    return (rectL.right >= rectR.left);
  }

  public isDisconnected(tipL: Tip): boolean {
    const rectR = this.tip.getBoundingClientRect();
    const rectL = tipL.tip.getBoundingClientRect();
    if (this.vertical) {
      return (rectR.bottom <= rectL.top + this.halfWidth);
    }
    return (rectL.right <= rectR.left + this.halfWidth);
  }

  public updateVisibility(isVisible: boolean) {
    if (isVisible) {
      this.tip.style.visibility = 'visible';
    } else {
      this.tip.style.visibility = 'hidden';
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.tip.style.bottom = '';
    this.tip.style.left = '';
  }

  public append() {
    if (!this.slider.contains(this.tip)) {
      this.slider.append(this.tip);
    }
  }

  public remove() {
    if (this.slider.contains(this.tip)) {
      this.slider.removeChild(this.tip);
    }
  }

  private initTip(tipSide: string) {
    this.tip = document.createElement('div');
    this.tip.className = `slider__tip slider__${tipSide}`;
    this.slider.append(this.tip);
  }
}

export default Tip;
