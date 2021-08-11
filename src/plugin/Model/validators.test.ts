import {
  validateFromTo, validateHasLimits, validateHasScale,
  validateHasTips, validateIsDouble, validateIsVertical,
  validateMinMax, validateScaleLimit, validateSkin, validateStep,
} from './validators';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-extended';
import { CurrentRunner } from '../types';

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
    let config;
    beforeEach(() => {
      config = {
        min: 0,
        max: 1000,
        from: 300,
        to: 700,
        isDouble: true,
      };
    });
    test('left and right values should be a number', () => {
      config.from = '300';
      const [from] = validateFromTo(config);
      expect(from).toBeNumber();
    });
    test('value should be greater min in single slider', () => {
      config.to = -10;
      config.isDouble = false;
      const [, to] = validateFromTo(config);
      expect(to).toBeGreaterThanOrEqual(config.min);
    });
    test('value should be less max in single slider', () => {
      config.to = 2000;
      config.isDouble = false;
      const [, to] = validateFromTo(config);
      expect(to).toBeLessThanOrEqual(config.max);
    });
    test('right value should be greater than left value in double slider', () => {
      config.to = 250;
      const [from, to] = validateFromTo(config);
      expect(to).toBeGreaterThanOrEqual(from);
    });
    test('left value should be less than right value in double slider', () => {
      config.from = 800;
      const [from, to] = validateFromTo(config);
      expect(from).toBeLessThanOrEqual(to);
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
    const config = {
      max: 1000,
      min: 0,
      from: 2,
      to: 5,
      isDouble: true,
      hasTips: false,
      hasScale: true,
      hasLimits: false,
      skin: 'orange',
      current: CurrentRunner.TO,
      isVertical: false,
      step: 1,
      scaleLimit: 50,
    };
    test('scaleLimit should be a number', () => {
      // @ts-expect-error
      config.scaleLimit = '59';
      expect(validateScaleLimit(config)).toBeNumber();
    });
    test('scaleLimit should be less or equal than 50', () => {
      config.scaleLimit = 55;
      expect(validateScaleLimit(config)).toBeLessThanOrEqual(50);
    });
    test('scaleLimit should be equal or greater than 1', () => {
      config.scaleLimit = -5;
      expect(validateScaleLimit(config)).toBeGreaterThanOrEqual(1);
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
