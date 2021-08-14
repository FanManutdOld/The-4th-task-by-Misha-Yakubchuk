import {
  validateFromTo, validateHasLimits, validateHasScale,
  validateHasTips, validateIsDouble, validateIsVertical,
  validateMinMax, validateScaleLimit, validateSkin, validateStep,
} from './validators';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-extended';

describe('Validator class', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });

  describe('validate min max', () => {
    test('min and max should be a number', () => {
      // @ts-expect-error
      expect(() => validateMinMax(0, '100')).toThrow('min and max must be a number');
    });
    test('max should be greater than min', () => {
      expect(validateMinMax(100, 0)).toBeGreaterThan(100);
    });
  });

  describe('validate isDouble', () => {
    test('isDouble should be a boolean', () => {
      // @ts-expect-error
      expect(validateIsDouble('true')).toBeBoolean();
    });
  });

  describe('validate step', () => {
    test('step should be a number', () => {
      // @ts-expect-error
      expect(validateStep(0, 100, '20')).toBeNumber();
    });
    test('step should be a NaN, if step not set', () => {
      expect(validateStep(0, 100, NaN)).toBeNaN();
    });
    test('step should be less than min + max', () => {
      expect(validateStep(0, 100, 200)).toBeLessThan(100);
    });
    test('step should be equal or greater than 0', () => {
      expect(validateStep(0, 100, -25)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('validate from to', () => {
    let min: number;
    let max: number;
    let from: number;
    let to: number;
    let isDouble: boolean;
    beforeEach(() => {
      min = 300;
      max = 1000;
      from = 300;
      to = 700;
      isDouble = true;
    });
    test('left and right values should be a number', () => {
      // @ts-expect-error
      from = '300';
      const [checkedFrom] = validateFromTo(min, max, from, to, isDouble);
      expect(checkedFrom).toBeNumber();
    });
    test('value should be greater min in single slider', () => {
      to = -10;
      isDouble = false;
      const [, checkedTo] = validateFromTo(min, max, from, to, isDouble);
      expect(checkedTo).toBeGreaterThanOrEqual(min);
    });
    test('value should be less max in single slider', () => {
      to = 2000;
      isDouble = false;
      const [, checkedTo] = validateFromTo(min, max, from, to, isDouble);
      expect(checkedTo).toBeLessThanOrEqual(max);
    });
    test('right value should be greater than left value in double slider', () => {
      to = 250;
      const [checkedFrom, checkedTo] = validateFromTo(min, max, from, to, isDouble);
      expect(checkedTo).toBeGreaterThanOrEqual(checkedFrom);
    });
    test('left value should be less than right value in double slider', () => {
      from = 800;
      const [checkedFrom, checkedTo] = validateFromTo(min, max, from, to, isDouble);
      expect(checkedFrom).toBeLessThanOrEqual(checkedTo);
    });
  });

  describe('validate hasTips', () => {
    test('hasTips should be a boolean', () => {
      // @ts-expect-error
      expect(validateHasTips('true')).toBeBoolean();
    });
  });

  describe('validate hasLimits', () => {
    test('hasLimits should be a boolean', () => {
      // @ts-expect-error
      expect(validateHasLimits('true')).toBeBoolean();
    });
  });

  describe('validate isVertical', () => {
    test('isVertical should be a boolean', () => {
      // @ts-expect-error
      expect(validateIsVertical('true')).toBeBoolean();
    });
  });

  describe('validate hasScale', () => {
    test('hasScale should be a boolean', () => {
      // @ts-expect-error
      expect(validateHasScale('true')).toBeBoolean();
    });
  });

  describe('validate scaleLimit', () => {
    const min = 0;
    const max = 1000;
    const step = 1;
    let scaleLimit: number;
    test('scaleLimit should be a number', () => {
      // @ts-expect-error
      scaleLimit = '59';
      expect(validateScaleLimit(min, max, step, scaleLimit)).toBeNumber();
    });
    test('scaleLimit should be less or equal than 50', () => {
      scaleLimit = 55;
      expect(validateScaleLimit(min, max, step, scaleLimit)).toBeLessThanOrEqual(50);
    });
    test('scaleLimit should be equal or greater than 1', () => {
      scaleLimit = -5;
      expect(validateScaleLimit(min, max, step, scaleLimit)).toBeGreaterThanOrEqual(1);
    });
  });

  describe('validate skin', () => {
    test('skin should be a string', () => {
      // @ts-expect-error
      expect(validateSkin(10)).toBeString();
    });
    test('skin should be an orange if not orange, darkcongo, whitered, azure or indigo', () => {
      expect(validateSkin('superskin')).toBe('orange');
    });
  });
});
