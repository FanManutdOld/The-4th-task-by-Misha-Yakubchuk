/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';

class Validator {
  static validateAll(config: IConfig): IConfig {
    const {
      min,
      max,
      double,
      isTips,
      isMinMax,
      scin,
    } = config;

    config.max = this.validateMinMax(min, max);
    config.double = this.validateDouble(double);
    config.step = this.validateStep(config.min, config.max, config.step);
    config = this.validateFromTo(config);
    config.isTips = this.validateIsTips(isTips);
    config.isMinMax = this.validateIsMinMax(isMinMax);
    config.scin = this.validateScin(scin);

    return config;
  }

  static validateMinMax(min: number, max: number): number {
    const isWrongType = typeof min !== 'number' || typeof max !== 'number';

    if (isWrongType) {
      throw new Error('min and max must be a number');
    }

    max = (max < min) ? min + 1000 : max;

    return max;
  }

  static validateDouble(double: boolean): boolean {
    if (typeof double !== 'boolean') {
      console.warn('double must be boolean');
      double = false;
    }

    return double;
  }

  static validateStep(min: number, max: number, step: number): number {
    if (typeof step !== 'number') {
      console.warn('Step must be a number');
      return NaN;
    }

    if (!step) {
      return NaN;
    }

    if (step > Math.abs(min) + Math.abs(max)) {
      console.warn('Step too big');
      step = Math.min(Math.abs(min), Math.abs(max));
    }

    return step;
  }

  static validateFromTo(config: IConfig): IConfig {
    const {
      min,
      max,
      from,
      to,
      double,
    } = config;

    const isWrongType = typeof from !== 'number' || typeof to !== 'number';

    if (isWrongType) {
      console.warn('from and to must be a number');
      config.from = min;
      config.to = max;
      return config;
    }

    if (double) {
      config.to = (to > max) ? max : (to < min) ? min : to;
      config.from = (from < min) ? min : (from > max) ? max : from;
      config.from = (config.from > config.to) ? min : config.from;
    } else {
      config.to = (to > max) ? max : (to < min) ? min : to;
    }

    return config;
  }

  static validateIsTips(isTip: boolean): boolean {
    if (typeof isTip !== 'boolean') {
      console.warn('isTip must be boolean');
      isTip = true;
    }

    return isTip;
  }

  static validateIsMinMax(isMinMax: boolean): boolean {
    if (typeof isMinMax !== 'boolean') {
      console.warn('isMinMax must be boolean');
      isMinMax = true;
    }

    return isMinMax;
  }

  static validateScin(scin: string): string {
    if (typeof scin !== 'string') {
      console.warn('scin must be a string');
      return 'orange';
    }

    const isWrong = scin !== 'orange' && scin !== 'caramel';

    if (isWrong) {
      console.warn('scin invalid');
      scin = 'orange';
    }

    return scin;
  }
}

export default Validator;
