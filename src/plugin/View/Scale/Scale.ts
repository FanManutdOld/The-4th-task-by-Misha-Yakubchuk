import { MySliderConfig } from '../../types';

class Scale {
  private slider: HTMLElement;

  private scale: HTMLElement;

  private isVertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.init();
  }

  public update(config: MySliderConfig, rightEdge: number, leftEdge = rightEdge) {
    if (config.hasScale) {
      this.scale.classList.remove('slider__scale_hidden');
      if (this.isVertical) {
        this.scale.style.bottom = `${(leftEdge / this.slider.offsetHeight) * 100}%`;
        this.scale.style.height = `${((this.slider.offsetHeight - leftEdge - rightEdge) / this.slider.offsetHeight) * 100}%`;
      } else {
        this.scale.style.left = `${(leftEdge / this.slider.offsetWidth) * 100}%`;
        this.scale.style.width = `${((this.slider.offsetWidth - leftEdge - rightEdge) / this.slider.offsetWidth) * 100}%`;
      }
      this.drawScale(config);
    } else {
      this.scale.classList.add('slider__scale_hidden');
    }
  }

  public setOrientation(isVertical: boolean) {
    this.isVertical = isVertical;
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

  private drawScale(config: MySliderConfig) {
    this.scale.innerHTML = '';
    const {
      min,
      max,
      step,
      scaleLimit,
    } = config;
    const total = max - min;
    const numOfValues = total / step;
    const stepSize = numOfValues > scaleLimit
      ? step * Math.ceil(numOfValues / scaleLimit)
      : step;

    const isLastStepFull: boolean = !(this.getRemainder(total, stepSize));

    const bigNum = isLastStepFull
      ? Math.floor(total / stepSize)
      : Math.floor(total / stepSize) + 1;

    // определям количество маленьких рисочек
    const smallMax = this.getSmallMax(bigNum);

    for (let i = 0, prevBigPos = 0; i < bigNum + 1; i++) {
      const bigPos = (stepSize / total) * i * 100;
      const fixedBigPos = bigPos > 100 ? 100 : bigPos;

      // расстояние между маленькими рисочками
      const smallSize = (fixedBigPos - prevBigPos) / (smallMax + 1);

      for (let z = 1; z <= smallMax; z++) {
        if (fixedBigPos === 0) {
          break;
        }

        const smallPos = Number((fixedBigPos - (smallSize * z)).toFixed(20));

        this.addStick(smallPos, 'small');
      }
      this.addStick(fixedBigPos, 'big');
      const value = this.calcValue(min, max, step, fixedBigPos);
      this.addValue(value, fixedBigPos);
      prevBigPos = fixedBigPos;
    }
  }

  private getRemainder(a: number, b: number): number {
    // Корректный остаток от деления а на b, работающий с дробными числами.
    return a - b * Math.floor(a / b);
  }

  private getSmallMax(bigNum) {
    switch (true) {
      case (bigNum > 28):
        return 0;
      case (bigNum > 14):
        return 1;
      case (bigNum > 7):
        return 2;
      case (bigNum > 4):
        return 3;
      default:
        return 4;
    }
  }

  private addStick(position: number, size: 'small' | 'big') {
    const html = document.createElement('div');
    html.className = `slider__scale-${size}`;
    if (this.isVertical) {
      html.style.bottom = `${position}%`;
    } else {
      html.style.left = `${position}%`;
    }
    this.scale.append(html);
  }

  private calcValue(min: number, max: number, step: number, bigW: number): number {
    let value = (max - min) * (bigW / 100) + min;
    if (value !== max) {
      value = Math.round((value - min) / step) * step + min;
    }
    const isFractional = step.toString().includes('.') || min.toString().includes('.') || max.toString().includes('.');
    if (isFractional) {
      const numOfSymbols = this.getNumOfSymbols(min, max, step);
      const numPower = 10 ** numOfSymbols;
      value = Math.round(value * numPower) / numPower;
    }
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    return value;
  }

  private getNumOfSymbols(min: number, max: number, step: number): number {
    if (step.toString().includes('.')) {
      return step.toString().split('.').pop().length;
    }
    const minSymbols = min.toString().includes('.') ? min.toString().split('.').pop().length : 0;
    const maxSymbols = max.toString().includes('.') ? max.toString().split('.').pop().length : 0;
    return Math.max(minSymbols, maxSymbols);
  }

  private addValue(value: number, bigW: number) {
    const html = document.createElement('div');
    html.className = 'slider__scale-value';
    html.textContent = `${value}`;
    this.scale.append(html);
    if (this.isVertical) {
      html.style.bottom = `${bigW - (html.offsetHeight / this.slider.offsetHeight / 2) * 100}%`;
    } else {
      html.style.left = `${bigW - ((html.offsetWidth - 2) / this.slider.offsetWidth / 2) * 100}%`;
    }
  }
}

export default Scale;
