import IConfig from './../IConfig';

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
      this.drawScale(config);
      if (this.vertical) {
        this.scale.style.bottom = `${(leftEdge / this.slider.offsetHeight) * 100}%`;
        this.scale.style.height = `${((this.slider.offsetHeight - leftEdge - rightEdge) / this.slider.offsetHeight) * 100}%`;
      } else {
        this.scale.style.left = `${(leftEdge / this.slider.offsetWidth) * 100}%`;
        this.scale.style.width = `${((this.slider.offsetWidth - leftEdge - rightEdge) / this.slider.offsetWidth) * 100}%`;
      }
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
    this.scale = document.createElement('div');
    this.scale.className = 'slider__scale';
    this.slider.prepend(this.scale);
    stick = document.createElement('div');
    stick.className = 'slider__scale-big';
    stick.style.left = '0%';
    text = document.createElement('div');
    text.className = 'slider__scale-text';
    text.style.left = '0%';
    text.textContent = `${min}`;
    this.scale.append(stick, text);

    
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
