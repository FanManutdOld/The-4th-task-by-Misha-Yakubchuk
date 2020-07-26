class Bar {
  private bar: HTMLElement;

  constructor(slider: HTMLElement, scin: string) {
    this.initBar(slider, scin);
  }

  public get posLeft(): number {
    return this.bar.getBoundingClientRect().left;
  }

  public get posRight(): number {
    return this.bar.getBoundingClientRect().right;
  }

  public setLeft(value: string) {
    this.bar.style.left = value;
  }

  public setRight(value: string) {
    this.bar.style.right = value;
  }

  private initBar(slider: HTMLElement, scin: string) {
    this.bar = document.createElement('div');
    this.bar.className = `slider__bar slider__bar_${scin}`;
    this.bar.style.left = `${0}%`;
    slider.append(this.bar);
  }
}

export default Bar;
