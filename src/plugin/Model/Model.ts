import IConfig from '../IConfig';
import CurrentRunner from '../ECurrentRunner';
import Observer from '../Observer/Observer';
import { validateAll, validateNewValue } from './validators';

class Model extends Observer {
  private config: IConfig = {
    min: 0,
    max: 1000,
    from: 400,
    to: 700,
    step: NaN,
    isDouble: false,
    hasTips: true,
    hasLimits: false,
    hasScale: false,
    scaleLimit: 10,
    isVertical: false,
    scin: 'orange',
    current: CurrentRunner.TO,
  };

  private isFractional: boolean;

  private numOfSymbols: number; // после запятой

  constructor(userConfig: any) {
    super();

    this.updateConfig(userConfig);
    this.config = validateAll(this.config);
    this.setStep();
  }

  public update(userConfig: any) {
    this.updateConfig(userConfig);
    this.config = validateAll(this.config);
    this.setStep();
    this.notify('changeConfig');
    this.callOnChange();
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
      isDouble,
    } = this.config;

    if (!isDouble) {
      this.config.current = CurrentRunner.TO;
      return;
    }

    const posRound = this.roundFractional(position, 3);

    const center = (Math.abs((from - min) / (max - min)) + Math.abs((to - min) / (max - min))) / 2;
    const roundedCenter = this.roundFractional(center, 3);

    const isLastCurrentFrom: boolean = posRound === roundedCenter
      && this.config.current === CurrentRunner.FROM;
    if (posRound < roundedCenter) {
      this.config.current = CurrentRunner.FROM;
    } else if (isLastCurrentFrom) {
      this.config.current = CurrentRunner.FROM;
    } else {
      this.config.current = CurrentRunner.TO;
    }
    this.notify('changeCurrent', this.config.current);
  }

  public setValueFromView(value: number) {
    const { current } = this.config;

    this.config[current] = validateNewValue(this.config, value);
    this.notify('changeValue');
    this.callOnChange();
  }

  public calcValue(position: number) {
    const {
      min,
      max,
      step,
      current,
    } = this.config;

    const newValue = (max - min) * position + min;
    if (newValue >= max) {
      this.config[current] = max;
    } else if (newValue <= min) {
      this.config[current] = min;
    } else {
      let roundedValue = Math.round((newValue - min) / step) * step + min;
      if (this.isFractional) {
        roundedValue = this.roundFractional(roundedValue, this.numOfSymbols);
      }
      this.config[current] = validateNewValue(this.config, roundedValue);
    }

    this.notify('changeValue');
    this.callOnChange();
  }

  private setStep() {
    const { step } = this.config;
    if (!step) {
      this.calcDefaultStep();
    } else if (step.toString().includes('.')) {
      this.isFractional = true;
      this.numOfSymbols = step.toString().split('.').pop().length;
    } else {
      this.isFractional = false;
    }
  }

  private calcDefaultStep() {
    const { min, max } = this.config;
    this.isFractional = min.toString().includes('.') || max.toString().includes('.');
    if (this.isFractional) {
      const minSymbols = min.toString().includes('.') ? min.toString().split('.').pop().length : 0;
      const maxSymbols = max.toString().includes('.') ? max.toString().split('.').pop().length : 0;
      this.numOfSymbols = Math.max(minSymbols, maxSymbols);
    } else {
      this.numOfSymbols = 0;
    }
    this.config.step = this.roundFractional(10 ** (-this.numOfSymbols), this.numOfSymbols);
  }

  private updateConfig(newConfig: any) {
    Object.entries(newConfig).forEach(([key, value]) => {
      const isInvalid = !(key in this.config) && typeof value !== 'function';
      if (isInvalid) {
        throw new Error(`Invalid config property - ${key}`);
      }
      if (typeof value !== 'undefined') {
        this.config[key] = value;
      }
    });
  }

  private callOnChange() {
    if (this.config.onChange && typeof this.config.onChange === 'function') {
      this.config.onChange(this.config);
    }
  }

  private roundFractional(num: number, decimalPlaces: number): number {
    const numPower = 10 ** decimalPlaces;
    return Math.round(num * numPower) / numPower;
  }
}

export default Model;
