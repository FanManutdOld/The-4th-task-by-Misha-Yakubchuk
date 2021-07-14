import IConfig from '../IConfig';

class Scale {
  private slider: HTMLElement;

  private scale: HTMLElement;

  private vertical: boolean;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.init();
  }

  public update(config: IConfig, rightEdge: number, leftEdge?: number) {
    if (config.scale) {
      this.scale.classList.remove('slider__scale_hidden');
      if (!leftEdge) {
        leftEdge = rightEdge;
      }
      if (this.vertical) {
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
    this.scale.innerHTML = '';
    const {
      min,
      max,
      step,
      scaleLimit,
    } = config;
    const total = max - min;
    let bigNum = total / step;
    let stepSize = NaN;

    if (bigNum > scaleLimit) {
      stepSize = step * Math.ceil(bigNum / scaleLimit);
    } else {
      stepSize = step;
    }

    const isLastStepFull: boolean = !(this.getRemainder(total, stepSize));

    bigNum = Math.floor(total / stepSize);
    bigNum = isLastStepFull ? bigNum : bigNum + 1;

    // определям количество маленьких рисочек
    let smallMax = 4;
    if (bigNum > 4) {
      smallMax = 3;
    }
    if (bigNum > 7) {
      smallMax = 2;
    }
    if (bigNum > 14) {
      smallMax = 1;
    }
    if (bigNum > 28) {
      smallMax = 0;
    }

    let bigPos = 0;
    let bigPrev = 0;
    let smallPos = 0;
    let smallSize = NaN; // расстояние между маленькими рисочками
    for (let i = 0; i < bigNum + 1; i++) {
      bigPos = (stepSize / total) * i * 100;
      if (bigPos > 100) {
        bigPos = 100;
      }

      smallSize = (bigPos - bigPrev) / (smallMax + 1);

      for (let z = 1; z <= smallMax; z++) {
        if (bigPos === 0) {
          break;
        }

        smallPos = Number((bigPos - (smallSize * z)).toFixed(20));

        // добавляем маленькую рисочку
        this.addStick(smallPos, 'small');
      }
      // добавляем большую рисочку
      this.addStick(bigPos, 'big');
      // считаем значение под большой рисочкой
      const value = this.calcValue(min, max, step, bigPos);
      // добавляем значение под большой рисочкой
      this.addValue(value, bigPos);
      bigPrev = bigPos;
    }
  }

  private getRemainder(a: number, b: number): number {
    // Корректный остаток от деления а на b, работающий с дробными числами.
    return a - b * Math.floor(a / b);
  }

  private addStick(position: number, size: string) {
    const html = document.createElement('div');
    html.className = `slider__scale-${size}`;
    if (this.vertical) {
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
      let numOfSymbols: number;
      if (step.toString().includes('.')) {
        numOfSymbols = step.toString().split('.').pop().length;
      } else {
        const minSymbols = min.toString().includes('.') ? min.toString().split('.').pop().length : 0;
        const maxSymbols = max.toString().includes('.') ? max.toString().split('.').pop().length : 0;
        numOfSymbols = Math.max(minSymbols, maxSymbols);
      }
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

  private addValue(value: number, bigW: number) {
    const html = document.createElement('div');
    html.className = 'slider__scale-value';
    html.textContent = `${value}`;
    this.scale.append(html);
    if (this.vertical) {
      html.style.bottom = `${bigW - (html.offsetHeight / this.slider.offsetHeight / 2) * 100}%`;
    } else {
      html.style.left = `${bigW - ((html.offsetWidth - 2) / this.slider.offsetWidth / 2) * 100}%`;
    }
  }
}

export default Scale;
