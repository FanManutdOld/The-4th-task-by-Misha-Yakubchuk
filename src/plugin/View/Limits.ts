class Limits {
  private limits: HTMLElement;

  private slider: HTMLElement;

  private minEl: HTMLElement;

  private maxEl: HTMLElement;

  private isVertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.init();
  }

  public update(hasLimits: boolean, min: number, max: number, shiftR: number, shiftL = shiftR) {
    if (hasLimits) {
      this.limits.classList.remove('slider__limits_hidden');
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
      this.limits.classList.add('slider__limits_hidden');
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
    this.limits = document.createElement('div');
    this.minEl = document.createElement('div');
    this.maxEl = document.createElement('div');
    this.limits.className = 'slider__limits';
    this.minEl.className = 'slider__limit slider__limit_min';
    this.maxEl.className = 'slider__limit slider__limit_max';
    this.limits.append(this.minEl);
    this.limits.append(this.maxEl);
    this.slider.append(this.limits);
  }
}

export default Limits;
