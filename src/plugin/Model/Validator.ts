import IConfig from '../IConfig';

const Validator = {
  validateAll(config: IConfig): IConfig {
    const {
      min,
      max,
      step,
      isDouble,
      hasTips,
      hasMinMax,
      isVertical,
      hasScale,
      scin,
    } = config;

    const ValidatedConfig = { ...config };

    ValidatedConfig.max = this.validateMinMax(min, max);
    ValidatedConfig.isDouble = this.validateIsDouble(isDouble);
    ValidatedConfig.hasTips = this.validateHasTips(hasTips);
    ValidatedConfig.hasMinMax = this.validateHasMinMax(hasMinMax);
    ValidatedConfig.isVertical = this.validateIsVertical(isVertical);
    ValidatedConfig.hasScale = this.validateHasScale(hasScale);
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

  validateIsDouble(isDouble: boolean): boolean {
    let checkedIsDouble = isDouble;
    if (typeof isDouble !== 'boolean') {
      console.warn('isDouble must be boolean');
      checkedIsDouble = false;
    }

    return checkedIsDouble;
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
      isDouble,
    } = config;

    const isWrongType = typeof from !== 'number' || typeof to !== 'number';

    let checkedFrom = from; let checkedTo = to;
    if (isWrongType) {
      console.warn('from and to must be a number');
      checkedFrom = min;
      checkedTo = max;
      return [checkedFrom, checkedTo];
    }

    if (isDouble) {
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

  validateHasTips(hasTips: boolean): boolean {
    let checkedHasTips = hasTips;
    if (typeof hasTips !== 'boolean') {
      console.warn('isTip must be boolean');
      checkedHasTips = true;
    }

    return checkedHasTips;
  },

  validateHasMinMax(hasMinMax: boolean): boolean {
    let checkedHasMinMax = hasMinMax;
    if (typeof hasMinMax !== 'boolean') {
      console.warn('isminMax must be boolean');
      checkedHasMinMax = false;
    }

    return checkedHasMinMax;
  },

  validateIsVertical(isVertical: boolean): boolean {
    let checkedIsVertical = isVertical;
    if (typeof isVertical !== 'boolean') {
      console.warn('isVertical must be boolean');
      checkedIsVertical = false;
    }

    return checkedIsVertical;
  },

  validateHasScale(hasScale: boolean): boolean {
    let checkedHasScale = hasScale;
    if (typeof hasScale !== 'boolean') {
      console.warn('scale must be boolean');
      checkedHasScale = false;
    }

    return checkedHasScale;
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
