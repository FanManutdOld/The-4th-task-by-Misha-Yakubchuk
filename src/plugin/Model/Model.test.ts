import Model from './Model';
import CurrentRunner from '../ECurrentRunner';

describe('Model class', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model({});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('Initialize model', () => {
    test('should set the default config', () => {
      const defaultConfig = {
        min: 0,
        max: 1000,
        from: 400,
        to: 700,
        step: 1,
        isDouble: false,
        hasTips: true,
        hasLimits: false,
        isVertical: false,
        scin: 'orange',
        current: CurrentRunner.TO,
      };
      expect(model.getConfig()).toMatchObject(defaultConfig);
    });
    test('should set the user config', () => {
      const userConfig = {
        min: 200,
        max: 500,
        from: 250,
        to: 300,
        isDouble: true,
        isVertical: true,
      };
      model = new Model(userConfig);
      expect(model.getConfig()).toMatchObject(userConfig);
    });
    test('should throw invalid config property', () => {
      expect(() => { new Model({ mib: 200 }); }).toThrow('Invalid config property - mib');
    });
    test('should not set undefined property', () => {
      model = new Model({ min: undefined });
      expect(model.getConfig().min).not.toBeUndefined();
    });
  });

  describe('Calculate default step', () => {
    test('should set fractional step, if min is fractional', () => {
      model = new Model({ min: 10.5 });
      expect(model.getConfig().step).toBe(0.1);
    });
    test('should set fractional step, if max is fractional', () => {
      model = new Model({ max: 10.55 });
      expect(model.getConfig().step).toBe(0.01);
    });
    test('should set fractional step', () => {
      model = new Model({ step: 0.1 });
      expect(model.getConfig().step).toBe(0.1);
    });
  });

  describe('Update model from API', () => {
    test('should set new config', () => {
      const newConfig = {
        from: 100,
        to: 455,
        isVertical: true,
        hasLimits: false,
      };
      model.update(newConfig);
      expect(model.getConfig()).toMatchObject(newConfig);
    });
  });

  describe('setCurrent method', () => {
    test('should notify about change current', () => {
      model.update({ isDouble: true });
      const callback = jest.fn();
      model.add('changeCurrent', callback);
      model.setCurrent(0.7);
      expect(callback).toBeCalled();
    });

    test('should set current - to, in single slider', () => {
      model.setCurrent(0.7);
      expect(model.getConfig().current).toBe(CurrentRunner.TO);
    });
    test('should set current - to, if position right of center', () => {
      model.update({ isDouble: true });
      model.setCurrent(0.8);
      expect(model.getConfig().current).toBe(CurrentRunner.TO);
    });
    test('should set current - from, if position left of center', () => {
      model.update({ isDouble: true });
      model.setCurrent(0.4);
      expect(model.getConfig().current).toBe(CurrentRunner.FROM);
    });
    test('should set current - from, if last current - from and position on middle', () => {
      model.update({ isDouble: true });
      model.setCurrent(0.3);
      model.setCurrent(0.55);
      expect(model.getConfig().current).toBe(CurrentRunner.FROM);
    });
  });

  describe('setValueFromView method', () => {
    test('should set new value', () => {
      model.setValueFromView(200);
      expect(model.getConfig().to).toBe(200);
    });
  });

  describe('callOnChange method', () => {
    test('should call onChange method', () => {
      const onChange = jest.fn();
      model.update({ onChange });
      expect(onChange).toBeCalled();
    });
  });

  describe('calcValue method', () => {
    test('should notify about change value', () => {
      const callback = jest.fn();
      model.add('changeValue', callback);
      model.calcValue(0.8);
      expect(callback).toBeCalled();
    });

    test('should set correct right value', () => {
      model.calcValue(0.8);
      expect(model.getConfig().to).toBe(800);
    });
    test('should set correct left value', () => {
      model.update({ isDouble: true });
      model.setCurrent(0.3);
      model.calcValue(0.3);
      expect(model.getConfig().from).toBe(300);
    });
    test('should set correct fractional value if slider is fractional', () => {
      model.update({ step: 0.1 });
      model.calcValue(0.3005);
      expect(model.getConfig().to).toBe(300.5);
    });
    test('should set right value to max, if right value greater than max', () => {
      model.calcValue(1.1);
      expect(model.getConfig().to).toBe((model.getConfig().max));
    });
    test('should set right value to min, if right value less than min in single slider', () => {
      model.calcValue(-0.1);
      expect(model.getConfig().to).toBe((model.getConfig().min));
    });
    test('should set right value to left value, if right value less than left value in double slider', () => {
      model.update({ isDouble: true });
      model.calcValue(0.2);
      expect(model.getConfig().to).toBe(model.getConfig().from);
    });
    test('should set left value to min, if left value less than min in double slider', () => {
      model.update({ isDouble: true });
      model.setCurrent(0.3);
      model.calcValue(-0.1);
      expect(model.getConfig().from).toBe((model.getConfig().min));
    });
    test('should set left value to right value, if left value greater than right value in double slider', () => {
      model.update({ isDouble: true });
      model.setCurrent(0.3);
      model.calcValue(0.8);
      expect(model.getConfig().from).toBe(model.getConfig().to);
    });
    test('should set right value to max, if right value greater than max after rounding', () => {
      model.update({
        min: 0,
        max: 11,
        step: 4,
        to: 8,
      });
      model.setCurrent(0.8);
      model.calcValue(0.95);
      expect(model.getConfig().to).toBe(model.getConfig().max);
    });
  });
});
