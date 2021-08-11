import { MySliderConfig, CurrentRunner } from '../types';

function validateMinMax(min: number, max: number): number {
  const isWrongType = typeof min !== 'number' || typeof max !== 'number';

  if (isWrongType) {
    throw new Error('min and max must be a number');
  }

  const checkedMax = (max <= min) ? min + 1000 : max;

  return checkedMax;
}

function validateIsDouble(isDouble: boolean): boolean {
  if (typeof isDouble !== 'boolean') {
    console.warn('isDouble must be boolean');
    return false;
  }

  return isDouble;
}

function validateStep(min: number, max: number, step: number): number {
  if (typeof step !== 'number') {
    console.warn('step must be a number');
    return NaN;
  }

  if (!step) {
    return NaN;
  }

  if (step > Math.abs(min) + Math.abs(max)) {
    console.warn('step too big');
    return Math.min(Math.abs(min), Math.abs(max));
  }

  if (step < 0) {
    console.warn('step must be equal or greater than 0');
    return 0;
  }

  return step;
}

function validateFromTo(config: MySliderConfig): [number, number] {
  const {
    min,
    max,
    from,
    to,
    isDouble,
  } = config;

  const isWrongType = typeof from !== 'number' || typeof to !== 'number';

  if (isWrongType) {
    console.warn('from and to must be a number');
    return [min, max];
  }

  if (isDouble) {
    const checkedTo = (to > max)
      ? max : (to < min)
        ? min : to;
    let checkedFrom = (from < min)
      ? min : (from > max)
        ? max : from;
    checkedFrom = (checkedFrom > checkedTo) ? min : checkedFrom;
    return [checkedFrom, checkedTo];
  }

  const checkedTo = (to > max)
    ? max : (to < min)
      ? min : to;
  return [from, checkedTo];
}

function validateHasTips(hasTips: boolean): boolean {
  if (typeof hasTips !== 'boolean') {
    console.warn('hasTips must be boolean');
    return true;
  }

  return hasTips;
}

function validateHasLimits(hasLimits: boolean): boolean {
  if (typeof hasLimits !== 'boolean') {
    console.warn('hasLimits must be boolean');
    return false;
  }

  return hasLimits;
}

function validateIsVertical(isVertical: boolean): boolean {
  if (typeof isVertical !== 'boolean') {
    console.warn('isVertical must be boolean');
    return false;
  }

  return isVertical;
}

function validateHasScale(hasScale: boolean): boolean {
  if (typeof hasScale !== 'boolean') {
    console.warn('hasScale must be boolean');
    return false;
  }

  return hasScale;
}

function validateScaleLimit(config: MySliderConfig): number {
  const {
    min,
    max,
    step,
    scaleLimit,
  } = config;

  if (typeof scaleLimit !== 'number') {
    console.warn('scaleLimit must be a number');
    return 4;
  }

  const maxNumberOfValues = Math.ceil((max - min) / step);

  if (scaleLimit > maxNumberOfValues) {
    console.warn('scaleLimit must be equal or less than (max - min) / step');
    return maxNumberOfValues;
  }

  if (scaleLimit < 1) {
    console.warn('scaleLimit must be equal or greater than 1');
    return 1;
  }

  if (scaleLimit > 50) {
    console.warn('scaleLimit too big');
    return 50;
  }

  return scaleLimit;
}

function validateSkin(skin: string): string {
  if (typeof skin !== 'string') {
    console.warn('skin must be a string');
    return 'orange';
  }

  const isWrong = skin !== 'orange' && skin !== 'darkcongo' && skin !== 'whitered' && skin !== 'azure' && skin !== 'indigo';

  if (isWrong) {
    console.warn('skin invalid');
    return 'orange';
  }

  return skin;
}

function validateNewValue(config: MySliderConfig, newValue: number): number {
  const {
    min,
    max,
    from,
    to,
    isDouble,
    current,
  } = config;

  if (current === CurrentRunner.TO) {
    const leftEdge = isDouble ? from : min;
    return (newValue > max)
      ? max : (newValue < leftEdge)
        ? leftEdge : newValue;
  }
  return (newValue > to) ? to : newValue;
}

function validateAll(config: MySliderConfig): MySliderConfig {
  const {
    min,
    max,
    step,
    isDouble,
    hasTips,
    hasLimits,
    isVertical,
    hasScale,
    skin,
  } = config;

  const ValidatedConfig = { ...config };

  ValidatedConfig.max = validateMinMax(min, max);
  ValidatedConfig.isDouble = validateIsDouble(isDouble);
  ValidatedConfig.hasTips = validateHasTips(hasTips);
  ValidatedConfig.hasLimits = validateHasLimits(hasLimits);
  ValidatedConfig.isVertical = validateIsVertical(isVertical);
  ValidatedConfig.hasScale = validateHasScale(hasScale);
  ValidatedConfig.skin = validateSkin(skin);
  ValidatedConfig.step = validateStep(ValidatedConfig.min, ValidatedConfig.max, step);
  [ValidatedConfig.from, ValidatedConfig.to] = validateFromTo(ValidatedConfig);
  ValidatedConfig.scaleLimit = validateScaleLimit(ValidatedConfig);

  return ValidatedConfig;
}

export {
  validateAll,
  validateNewValue,
  validateFromTo,
  validateHasLimits,
  validateHasScale,
  validateHasTips,
  validateIsDouble,
  validateIsVertical,
  validateMinMax,
  validateScaleLimit,
  validateSkin,
  validateStep,
};
