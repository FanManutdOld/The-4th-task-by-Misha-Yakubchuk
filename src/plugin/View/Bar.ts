class Bar {
  private bar: HTMLElement;

  constructor(slider: HTMLElement, scin: string) {
    this.initBar(slider, scin);
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
