// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';

class Scale {
  private slider: HTMLElement;

  private scale: HTMLElement;

  private vertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.init();
  }

  public update(isScale: boolean, leftEdge: number, rightEdge: number, config: IConfig) {
    if (isScale) {
      this.scale.style.visibility = 'visible';
      if (this.vertical) {
        this.scale.style.bottom = `${(leftEdge / this.slider.offsetHeight) * 100}%`;
        this.scale.style.height = `${((this.slider.offsetHeight - leftEdge - rightEdge) / this.slider.offsetHeight) * 100}%`;
      } else {
        this.scale.style.left = `${(leftEdge / this.slider.offsetWidth) * 100}%`;
        this.scale.style.width = `${((this.slider.offsetWidth - leftEdge - rightEdge) / this.slider.offsetWidth) * 100}%`;
      }
      this.drawScale(config);
    } else {
      this.scale.style.visibility = 'hidden';
    }
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.scale.style.left = '';
    this.scale.style.bottom = '';
    this.scale.style.width = '';
    this.scale.style.height = '';
  }

  private init() {
    this.scale = document.createElement('div');
    this.scale.className = 'slider__scale';
    this.slider.append(this.scale);
  }

  private drawScale(config: IConfig) {
    const {
      min,
      max,
    } = config;
    let stick: HTMLElement; let text: HTMLElement;
    this.slider.removeChild(this.scale);
    this.scale.innerHTML = '';
    this.slider.prepend(this.scale);
    stick = document.createElement('div');
    stick.className = 'slider__scale-big';
    stick.style.left = '0%';
    text = document.createElement('div');
    text.className = 'slider__scale-text';
    text.textContent = `${min}`;
    this.scale.append(stick, text);
    text.style.left = `${0 - (text.offsetWidth / 2 / this.slider.offsetWidth) * 100}%`;
    for (let i = 1; i < 20; i++) {
      stick = document.createElement('div');
      if (i % 5 === 0) {
        stick.className = 'slider__scale-big';
        text = document.createElement('div');
        text.className = 'slider__scale-text';
        text.textContent = `${(max - min) / (100 / 20 - 1) * (i / 5)}`;
        this.scale.append(text);
        text.style.left = `${i * (100 / 20) - (text.offsetWidth / 2 / this.slider.offsetWidth) * 100}%`;
      } else {
        stick.className = 'slider__scale-small';
      }
      stick.style.left = `${i * (100 / 20)}%`;
      this.scale.append(stick);
    }

    stick = document.createElement('div');
    stick.className = 'slider__scale-big';
    stick.style.left = '100%';
    text = document.createElement('div');
    text.className = 'slider__scale-text';
    text.textContent = `${max}`;
    this.scale.append(stick, text);
    text.style.left = `${100 - (text.offsetWidth / 2 / this.slider.offsetWidth) * 100}%`;

  }
}

export default Scale;
