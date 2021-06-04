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

  public update(config: IConfig, rightEdge: number, leftEdge?: number) {
    if (config.scale) {
      this.scale.style.visibility = 'visible';
      if (!rightEdge) {
        // eslint-disable-next-line no-param-reassign
        rightEdge = leftEdge;
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
    this.scale.innerHTML = '';
    const {
      min,
      max,
      step,
      scaleNum,
      scaleSnap,
    } = config;
    let html: HTMLElement;
    const total = max - min;
    let bigNum = scaleNum;
    let smallMax = 4;
    let bigP = 0;
    let bigW = 0;
    let smallP = NaN;
    let smallW = 0;
    let numOfSymbols: number;

    if (scaleSnap) {
      bigNum = total / step;
    }

    if (bigNum > 50) bigNum = 50;
    bigP = Number((100 / bigNum).toFixed(20));

    // определям количество маленьких рисочек
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

    for (let i = 0; i < bigNum + 1; i++) {
      bigW = Number((bigP * i).toFixed(20));
      if (bigW > 100) {
        bigW = 100;
      }

      smallP = (bigW - (bigP * (i - 1))) / (smallMax + 1);

      for (let z = 1; z <= smallMax; z++) {
        if (bigW === 0) {
          break;
        }

        smallW = Number((bigW - (smallP * z)).toFixed(20));

        // добавляем маленькую рисочку
        html = document.createElement('div');
        html.className = 'slider__scale-small';
        if (this.vertical) {
          html.style.bottom = `${smallW}%`;
        } else {
          html.style.left = `${smallW}%`;
        }
        this.scale.append(html);
      }
      // добавляем большую рисочку
      html = document.createElement('div');
      html.className = 'slider__scale-big';
      if (this.vertical) {
        html.style.bottom = `${bigW}%`;
      } else {
        html.style.left = `${bigW}%`;
      }
      this.scale.append(html);

      // считаем значение под большой рисочкой
      let value = (max - min) * (bigW / 100) + min;
      value = Math.round((value - min) / step) * step + min;
      const isFractional = step.toString().includes('.') || min.toString().includes('.') || max.toString().includes('.');
      if (isFractional) {
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

      // добавляем значение под большой рисочкой
      html = document.createElement('div');
      html.className = 'slider__scale-text';
      html.textContent = `${value}`;
      this.scale.append(html);
      if (this.vertical) {
        html.style.bottom = `${bigW - (html.offsetHeight / this.slider.offsetHeight / 2) * 100}%`;
      } else {
        html.style.left = `${bigW - ((html.offsetWidth - 2) / this.slider.offsetWidth / 2) * 100}%`;
      }
    }
  }
}

export default Scale;
