class MinMax {
  private minMax: HTMLElement;

  private slider: HTMLElement;

  private minEl: HTMLElement;

  private maxEl: HTMLElement;

  private isVertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.init();
  }

  public update(hasMinMax: boolean, min: number, max: number, shiftR: number, shiftL = shiftR) {
    if (hasMinMax) {
      this.minMax.classList.remove('slider__min-max_hidden');
      this.minEl.textContent = `${min}`;
      this.maxEl.textContent = `${max}`;
      if (this.isVertical) {
        this.minEl.style.top = `${this.slider.offsetHeight - shiftL - this.maxEl.offsetHeight / 2}px`;
        this.maxEl.style.top = `${shiftR - this.minEl.offsetHeight / 2}px`;
      } else {
        this.minEl.style.left = `${shiftL - this.minEl.offsetWidth / 2}px`;
        this.maxEl.style.left = `${this.slider.offsetWidth - shiftR - this.maxEl.offsetWidth / 2}px`;
      }
    } else {
      this.minMax.classList.add('slider__min-max_hidden');
    }
  }

  public setOrientation(isVertical: boolean) {
    this.isVertical = isVertical;
    this.minEl.style.top = '';
    this.minEl.style.left = '';
    this.maxEl.style.top = '';
    this.maxEl.style.left = '';
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
