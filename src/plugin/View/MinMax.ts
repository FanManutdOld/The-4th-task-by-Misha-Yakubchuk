class MinMax {
  private minMax: HTMLElement;

  private slider: HTMLElement;

  private minEl: HTMLElement;

  private maxEl: HTMLElement;

  private vertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.init();
  }

  public update(min: number, max: number, shiftR: number, shiftL?: number) {
    if (!shiftL) {
      // eslint-disable-next-line no-param-reassign
      shiftL = shiftR;
    }
    this.minEl.textContent = `${min}`;
    this.maxEl.textContent = `${max}`;
    if (this.vertical) {
      this.minEl.style.top = `${this.slider.offsetHeight - shiftL - this.maxEl.offsetHeight / 2}px`;
      this.maxEl.style.top = `${shiftR - this.minEl.offsetHeight / 2}px`;
    } else {
      this.minEl.style.left = `${shiftL - this.minEl.offsetWidth / 2}px`;
      this.maxEl.style.left = `${this.slider.offsetWidth - shiftR - this.maxEl.offsetWidth / 2}px`;
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
  }

  public hide() {
    this.minMax.style.visibility = 'hidden';
  }

  public show() {
    this.minMax.style.visibility = 'visible';
  }

  private init() {
    this.minMax = document.createElement('div');
    this.minEl = document.createElement('div');
    this.maxEl = document.createElement('div');
    this.minMax.className = 'slider__min-max';
    this.minEl.className = 'slider__range slider__min';
    this.maxEl.className = 'slider__range slider__max';
    this.minMax.append(this.minEl);
    this.minMax.append(this.maxEl);
    this.slider.append(this.minMax);
  }
}

export default MinMax;
