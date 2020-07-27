// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
import Observer from '../Observer/Observer';
import Validator from './Validator';

class Model extends Observer {
  private config: IConfig;

  private isFractional: boolean;

  private numOfSymbols: number; // после запятой

  constructor(userConfig: any) {
    super();
    this.config = {
      min: 0,
      max: 1000,
      from: 500,
      to: 700,
      step: NaN,
      double: false,
      isTips: true,
      scin: 'orange',
      current: 'to',
    };

    this.updateConfig(userConfig);
    Validator.validateAll(this.config);
    if (!this.config.step) {
      this.getDefaultStep();
    }
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public setCurrent(position: number) {
    const {
      min,
      max,
      from,
      to,
      double,
    } = this.config;

    if (!double) {
      this.config.current = 'to';
      return;
    }

    const posRound = this.roundFractional(position, 3);

    let middle = (Math.abs((from - min) / (max - min)) + Math.abs((to - min) / (max - min))) / 2;
    middle = this.roundFractional(middle, 3);

    const isLastCurrentFrom: boolean = posRound === middle && this.config.current === 'from';
    this.config.current = (posRound < middle) ? 'from' : (isLastCurrentFrom) ? 'from' : 'to';
    this.notify('changeCurrent', this.config.current);
  }

  public calcValue(position: number) {
    const {
      min,
      max,
      from,
      to,
      step,
      double,
      current,
    } = this.config;

    let newValue = (max - min) * position + min;
    newValue = Math.round((newValue - min) / step) * step + min;

    if (this.isFractional) {
      this.config[current] = this.roundFractional(newValue, this.numOfSymbols);
    } else {
      this.config[current] = newValue;
    }

    if (current === 'to') {
      const leftEdge = double ? from : min;
      this.config.to = (this.config.to > max) ? max
        : (this.config.to < leftEdge) ? leftEdge : this.config.to;
    } else {
      this.config.from = (this.config.from > to) ? to
        : (this.config.from < min) ? min : this.config.from;
    }
    this.notify('change');
  }

  private updateConfig(newConfig: any) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(newConfig)) {
      if (!(key in this.config)) {
        throw new Error(`Invalid config property - ${key}`);
      }
      this.config[key] = value;
    }
  }

  private getDefaultStep() {
    const { min, max } = this.config;
    this.isFractional = min.toString().includes('.') || max.toString().includes('.');
    if (this.isFractional) {
      this.numOfSymbols = Math.max(min.toString().split('.').pop().length, max.toString().split('.').pop().length);
    } else {
      this.numOfSymbols = 0;
    }
    this.config.step = this.roundFractional(10 ** (-this.numOfSymbols), this.numOfSymbols);
  }

  // eslint-disable-next-line class-methods-use-this
  private roundFractional(num: number, decimalPlaces: number): number {
    const numPower = 10 ** decimalPlaces;
    return Math.round(num * numPower) / numPower;
  }
}

export default Model;
