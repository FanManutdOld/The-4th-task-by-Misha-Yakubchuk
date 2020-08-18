import Validator from './Validator';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-extended';

describe('Validator class', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });

  describe('validate min max', () => {
    test('min and max should be a number', () => {
      expect(() => Validator.validateMinMax(0, '100')).toThrow('min and max must be a number');
    });
    test('max should be greater then min', () => {
      expect(Validator.validateMinMax(100, 0)).toBeGreaterThan(100);
    });
  });

  describe('validate double', () => {
    test('double should be a boolean', () => {
      expect(Validator.validateDouble('true')).toBeBoolean();
    });
  });

  describe('validate step', () => {
    test('step should be a number', () => {
      expect(Validator.validateStep(0, 100, '20')).toBeNumber();
    });
    test('step should be a NaN, if step not set', () => {
      expect(Validator.validateStep(0, 100, NaN)).toBeNaN();
    });
    test('step should be less then min + max', () => {
      expect(Validator.validateStep(0, 100, 200)).toBeLessThan(100);
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
        double: true,
      };
    });
    test('left and right values should be a number', () => {
      config.from = '300';
      const result = Validator.validateFromTo(config);
      expect(result.from).toBeNumber();
    });
    test('value should be greater min in single slider', () => {
      config.to = -10;
      config.double = false;
      const result = Validator.validateFromTo(config);
      expect(result.to).toBeGreaterThanOrEqual(config.min);
    });
    test('value should be less max in single slider', () => {
      config.to = 2000;
      config.double = false;
      const result = Validator.validateFromTo(config);
      expect(result.to).toBeLessThanOrEqual(config.max);
    });
    test('right value should be greater then left value in double slider', () => {
      config.to = 250;
      const result = Validator.validateFromTo(config);
      expect(result.to).toBeGreaterThanOrEqual(config.from);
    });
    test('left value should be less then right value in double slider', () => {
      config.from = 800;
      const result = Validator.validateFromTo(config);
      expect(result.from).toBeLessThanOrEqual(config.to);
    });
  });

  describe('validate tips', () => {
    test('tips should be a boolean', () => {
      expect(Validator.validateTips('true')).toBeBoolean();
    });
  });

  describe('validate isMinMax', () => {
    test('isMinMax should be a boolean', () => {
      expect(Validator.validateIsMinMax('true')).toBeBoolean();
    });
  });

  describe('validate scin', () => {
    test('scin should be a string', () => {
      expect(Validator.validateScin(10)).toBeString();
    });
    test('scin should be an orange if not orange, darkcongo, whitered, azure or indigo', () => {
      expect(Validator.validateScin('superscin')).toBe('orange');
    });
  });
});