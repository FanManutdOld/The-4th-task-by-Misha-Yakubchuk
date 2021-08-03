import IConfig from '../IConfig';

const Validator = {
  validateAll(config: IConfig): IConfig {
    const {
      min,
      max,
      step,
      double,
      tips,
      minMax,
      vertical,
      scale,
      scin,
    } = config;

    const ValidatedConfig = { ...config };

    ValidatedConfig.max = this.validateMinMax(min, max);
    ValidatedConfig.double = this.validateDouble(double);
    ValidatedConfig.tips = this.validateTips(tips);
    ValidatedConfig.minMax = this.validateIsMinMax(minMax);
    ValidatedConfig.vertical = this.validateVertical(vertical);
    ValidatedConfig.scale = this.validateIsScale(scale);
    ValidatedConfig.scin = this.validateScin(scin);
    ValidatedConfig.step = this.validateStep(ValidatedConfig.min, ValidatedConfig.max, step);
    [ValidatedConfig.from, ValidatedConfig.to] = this.validateFromTo(ValidatedConfig);
    ValidatedConfig.scaleLimit = this.validateScaleLimit(ValidatedConfig);

    return ValidatedConfig;
  },

  validateMinMax(min: number, max: number): number {
    const isWrongType = typeof min !== 'number' || typeof max !== 'number';

    if (isWrongType) {
      throw new Error('min and max must be a number');
    }

    const checkedMax = (max <= min) ? min + 1000 : max;

    return checkedMax;
  },

  validateDouble(double: boolean): boolean {
    let checkedDouble = double;
    if (typeof double !== 'boolean') {
      console.warn('double must be boolean');
      checkedDouble = false;
    }

    return checkedDouble;
  },

  validateStep(min: number, max: number, step: number): number {
    if (typeof step !== 'number') {
      console.warn('step must be a number');
      return NaN;
    }

    if (!step) {
      return NaN;
    }

    let checkedStep = step;
    if (step > Math.abs(min) + Math.abs(max)) {
      console.warn('step too big');
      checkedStep = Math.min(Math.abs(min), Math.abs(max));
    }

    if (step < 0) {
      console.warn('step must be equal or greater than 0');
      checkedStep = 0;
    }

    return checkedStep;
  },

  validateFromTo(config: IConfig): [number, number] {
    const {
      min,
      max,
      from,
      to,
      double,
    } = config;

    const isWrongType = typeof from !== 'number' || typeof to !== 'number';

    let checkedFrom = from; let checkedTo = to;
    if (isWrongType) {
      console.warn('from and to must be a number');
      checkedFrom = min;
      checkedTo = max;
      return [checkedFrom, checkedTo];
    }

    if (double) {
      checkedTo = (to > max)
        ? max : (to < min)
          ? min : to;
      checkedFrom = (from < min)
        ? min : (from > max)
          ? max : from;
      checkedFrom = (checkedFrom > checkedTo) ? min : checkedFrom;
    } else {
      checkedTo = (to > max)
        ? max : (to < min)
          ? min : to;
    }

    return [checkedFrom, checkedTo];
  },

  validateTips(tips: boolean): boolean {
    let checkedTips = tips;
    if (typeof tips !== 'boolean') {
      console.warn('isTip must be boolean');
      checkedTips = true;
    }

    return checkedTips;
  },

  validateIsMinMax(minMax: boolean): boolean {
    let checkedMinMax = minMax;
    if (typeof minMax !== 'boolean') {
      console.warn('isMinMax must be boolean');
      checkedMinMax = false;
    }

    return checkedMinMax;
  },

  validateVertical(vertical: boolean): boolean {
    let checkedVertical = vertical;
    if (typeof vertical !== 'boolean') {
      console.warn('vertical must be boolean');
      checkedVertical = false;
    }

    return checkedVertical;
  },

  validateIsScale(scale: boolean): boolean {
    let checkedScale = scale;
    if (typeof scale !== 'boolean') {
      console.warn('scale must be boolean');
      checkedScale = false;
    }

    return checkedScale;
  },

  validateScaleLimit(config: IConfig): number {
    const {
      min,
      max,
      step,
    } = config;

    let { scaleLimit } = config;

    if (typeof scaleLimit !== 'number') {
      console.warn('scaleLimit must be a number');
      scaleLimit = 4;
    }

    if (scaleLimit > 50) {
      console.warn('scaleLimit too big');
      scaleLimit = 50;
    }

    const maxNumberOfValues = Math.ceil((max - min) / step);

    if (scaleLimit > maxNumberOfValues) {
      console.warn('scaleLimit must be equal or less than (max - min) / step');
      scaleLimit = maxNumberOfValues;
    }

    if (scaleLimit < 1) {
      console.warn('scaleLimit must be equal or greater than 1');
      scaleLimit = 1;
    }

    return scaleLimit;
  },

  validateScin(scin: string): string {
    if (typeof scin !== 'string') {
      console.warn('scin must be a string');
      return 'orange';
    }

    const isWrong = scin !== 'orange' && scin !== 'darkcongo' && scin !== 'whitered' && scin !== 'azure' && scin !== 'indigo';

    let checkedScin = scin;
    if (isWrong) {
      console.warn('scin invalid');
      checkedScin = 'orange';
    }

    return checkedScin;
  },
};

export default Validator;
