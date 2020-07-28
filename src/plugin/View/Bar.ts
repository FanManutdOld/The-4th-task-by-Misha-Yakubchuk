class Bar {
  private bar: HTMLElement;

  private scin: string;

  public vertical: boolean;

  constructor(slider: HTMLElement, scin: string) {
    this.initBar(slider, scin);
  }

  public get posLeft(): number {
    return this.vertical
      ? this.bar.getBoundingClientRect().bottom
      : this.bar.getBoundingClientRect().left;
  }

  public get posRight(): number {
    return this.vertical
      ? this.bar.getBoundingClientRect().top
      : this.bar.getBoundingClientRect().right;
  }

  public setLeft(value: string) {
    if (this.vertical) {
      this.bar.style.bottom = value;
    } else {
      this.bar.style.left = value;
    }
  }

  public setRight(value: string) {
    if (this.vertical) {
      this.bar.style.top = value;
    } else {
      this.bar.style.right = value;
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.bar.className = vertical
      ? `slider__bar slider__bar_${this.scin}_vertical`
      : `slider__bar slider__bar_${this.scin}_horizontal`;
  }

  private initBar(slider: HTMLElement, scin: string) {
    this.bar = document.createElement('div');
    this.scin = scin;
    this.bar.style.left = `${0}%`;
    slider.append(this.bar);
  }
}

export default Bar;
