class Bar {
  constructor(slider, scin) {
    this.initBar(slider, scin);
  }

  initBar(slider, scin) {
    this.bar = document.createElement('div');
    this.bar.className = `slider__bar slider__bar_${scin}`;
    this.bar.style.left = `${0}%`;
    slider.appendChild(this.bar);
  }

  setLeft(value) {
    this.bar.style.left = value;
  }

  setRight(value) {
    this.bar.style.right = value;
  }
}

export default Bar;
