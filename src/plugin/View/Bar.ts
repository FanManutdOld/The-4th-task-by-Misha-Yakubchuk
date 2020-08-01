class Bar {
  private bar: HTMLElement;

  private slider: HTMLElement;

  private scin: string;

  public vertical: boolean;

  constructor(slider: HTMLElement, scin: string) {
    this.slider = slider;
    this.initBar(scin);
  }

  public getMiddle(): number {
    const rect = this.bar.getBoundingClientRect();
    if (this.vertical) {
      return (rect.bottom - rect.top) / 2;
    }
    return (rect.left - rect.right) / 2;
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
    this.bar.className = vertical
      ? `s__bar s__bar_${this.scin} s__bar_${this.scin}_ver`
      : `s__bar s__bar_${this.scin} s__bar_${this.scin}_hor`;
  }

  private initBar(scin: string) {
    this.bar = document.createElement('div');
    this.scin = scin;
    this.slider.append(this.bar);
  }
}

export default Bar;
