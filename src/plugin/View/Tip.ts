class Tip {
  public halfWidth: number;

  private tip: HTMLElement;

  private slider: HTMLElement;

  private isVertical: boolean;

  constructor(slider: HTMLElement, tipSide: 'right' | 'left') {
    this.slider = slider;
    this.init(tipSide);
  }

  public getRect(): DOMRect {
    return this.tip.getBoundingClientRect();
  }

  public setValue(newValue: number | string) {
    this.tip.textContent = String(newValue);
    this.halfWidth = this.isVertical
      ? parseInt(getComputedStyle(this.tip).height) / 2
      : parseInt(getComputedStyle(this.tip).width) / 2;
  }

  public setPos(pos: number, shift: number) {
    if (this.isVertical) {
      this.tip.style.bottom = `${((pos + shift - this.halfWidth) / this.slider.offsetHeight) * 100}%`;
    } else {
      this.tip.style.left = `${((pos + shift - this.halfWidth) / this.slider.offsetWidth) * 100}%`;
    }
  }

  public setUnitedPos(pos: number) {
    if (this.isVertical) {
      this.tip.style.bottom = `${pos - this.halfWidth}px`;
    } else {
      this.tip.style.left = `${pos - this.halfWidth}px`;
    }
  }

  public isConnected(rectL: DOMRect): boolean {
    const rectR = this.tip.getBoundingClientRect();
    if (this.isVertical) {
      return (rectR.bottom >= rectL.top);
    }
    return (rectL.right >= rectR.left + 1);
  }

  public isDisconnected(rectL: DOMRect): boolean {
    const rectR = this.tip.getBoundingClientRect();
    if (this.isVertical) {
      return (rectR.bottom <= rectL.top + this.halfWidth - 1);
    }
    return (rectL.right <= rectR.left + this.halfWidth);
  }

  public updateVisibility(isVisible: boolean) {
    if (isVisible) {
      this.tip.classList.remove('slider__tip_hidden');
    } else {
      this.tip.classList.add('slider__tip_hidden');
    }
  }

  public setOrientation(isVertical: boolean) {
    this.isVertical = isVertical;
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

  private init(tipSide: 'right' | 'left') {
    this.tip = document.createElement('div');
    this.tip.className = `slider__tip slider__tip_pos_${tipSide}`;
    this.slider.append(this.tip);
  }
}

export default Tip;
