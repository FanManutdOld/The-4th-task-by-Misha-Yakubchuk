class Bar {
  private bar: HTMLElement;

  private slider: HTMLElement;

  private vertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.initBar();
  }

  public getCenter(): number {
    const rect = this.bar.getBoundingClientRect();
    if (this.vertical) {
      return rect.top + (rect.bottom - rect.top) / 2;
    }
    return rect.left + (rect.right - rect.left) / 2;
  }

  public setLeft(pos: number, shift: number) {
    if (this.vertical) {
      this.bar.style.bottom = `${((pos + shift) / this.slider.offsetHeight) * 100}%`;
    } else {
      this.bar.style.left = `${((pos + shift) / this.slider.offsetWidth) * 100}%`;
    }
  }

  public setRight(pos: number, shift: number) {
    if (this.vertical) {
      this.bar.style.top = `${(1 - (pos + shift) / this.slider.offsetHeight) * 100}%`;
    } else {
      this.bar.style.right = `${(1 - (pos + shift) / this.slider.offsetWidth) * 100}%`;
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.bar.style.top = '';
    this.bar.style.right = '';
    this.bar.style.bottom = '';
    this.bar.style.left = '';
  }

  private initBar() {
    this.bar = document.createElement('div');
    this.bar.className = 'slider__bar';
    this.slider.append(this.bar);
  }
}

export default Bar;
