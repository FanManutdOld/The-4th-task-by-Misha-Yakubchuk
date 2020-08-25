/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';

class Validator {
  static validateAll(config: IConfig): IConfig {
    const {
      min,
      max,
      double,
      tips,
      minMax,
      scale,
      scaleNum,
      scaleSnap,
      scin,
    } = config;

    config.max = this.validateMinMax(min, max);
    config.double = this.validateDouble(double);
    config.step = this.validateStep(config.min, config.max, config.step);
    config = this.validateFromTo(config);
    config.tips = this.validateTips(tips);
    config.minMax = this.validateIsMinMax(minMax);
    config.scale = this.validateIsScale(scale);
    config.scaleNum = this.validateScaleNum(scaleNum);
    config.scaleSnap = this.validateScaleSnap(scaleSnap);
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

  static validateTips(tips: boolean): boolean {
    if (typeof tips !== 'boolean') {
      console.warn('isTip must be boolean');
      tips = true;
    }

    return tips;
  }

  static validateIsMinMax(minMax: boolean): boolean {
    if (typeof minMax !== 'boolean') {
      console.warn('isMinMax must be boolean');
      minMax = true;
    }

    return minMax;
  }

  static validateIsScale(scale: boolean): boolean {
    if (typeof scale !== 'boolean') {
      console.warn('isMinMax must be boolean');
      scale = false;
    }

    return scale;
  }

  static validateScaleNum(scaleNum: number): number {
    if (typeof scaleNum !== 'number') {
      console.warn('ScaleNum must be a number');
      scaleNum = 4;
    }

    if (scaleNum > 50) {
      console.warn('ScaleNum too big');
      scaleNum = 4;
    }

    return scaleNum;
  }

  static validateScaleSnap(scaleSnap: boolean): boolean {
    if (typeof scaleSnap !== 'boolean') {
      console.warn('scaleSnap must be boolean');
      scaleSnap = false;
    }

    return scaleSnap;
  }

  static validateScin(scin: string): string {
    if (typeof scin !== 'string') {
      console.warn('scin must be a string');
      return 'orange';
    }

    const isWrong = scin !== 'orange' && scin !== 'darkcongo' && scin !== 'whitered' && scin !== 'azure' && scin !== 'indigo';

    if (isWrong) {
      console.warn('scin invalid');
      scin = 'orange';
    }

    return scin;
  }
}

export default Validator;
