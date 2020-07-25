// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
import Observer from '../Observer/Observer';

class Model extends Observer {
  private config: IConfig;

  private isFractional: boolean;

  private numOfSymbols: number; // после запятой

  constructor(userConfig: any) {
    super();
    this.config = {
      min: 0,
      max: 1000,
      to: 700,
      from: 500,
      step: 0,
      double: false,
      scin: 'orange',
      current: 'to',
    };
    this.updateConfig(userConfig);

    const { min, max } = this.config;
    this.isFractional = min.toString().includes('.') || max.toString().includes('.');
    this.numOfSymbols = Math.max(min.toString().split('.').pop().length, max.toString().split('.').pop().length);
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public setCurrent(position: number) {
    const {
      min,
      max,
      to,
      from,
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
      to,
      from,
      double,
      current,
    } = this.config;

    const newValue = (max - min) * position + min;
    if (this.isFractional) {
      this.config[current] = this.roundFractional(newValue, this.numOfSymbols);
    } else {
      this.config[current] = Math.round(newValue);
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
        throw new Error(`Invalid user property - ${key}`);
      }
      this.config[key] = value;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private roundFractional(num: number, decimalPlaces: number): number {
    const numPowerConverter = 10 ** decimalPlaces;
    return Math.round(num * numPowerConverter) / numPowerConverter;
  }
}

export default Model;
