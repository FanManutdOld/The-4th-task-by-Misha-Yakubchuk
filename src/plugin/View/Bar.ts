class Bar {
  bar: HTMLElement;

  constructor(slider: HTMLElement, scin: string) {
    this.initBar(slider, scin);
  }

  initBar(slider: HTMLElement, scin: string) {
    this.bar = document.createElement('div');
    this.bar.className = `slider__bar slider__bar_${scin}`;
    this.bar.style.left = `${0}%`;
    slider.appendChild(this.bar);
  }

  setLeft(value: string) {
    this.bar.style.left = value;
  }

  setRight(value: string) {
    this.bar.style.right = value;
  }
}

export default Bar;
