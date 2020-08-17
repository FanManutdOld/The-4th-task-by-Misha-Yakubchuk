import Model from './Model';

describe('Model class', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model({});
  });

  describe('Initialize model', () => {
    test('should set the default config', () => {
      const defaultConfig = {
        min: 0,
        max: 1000,
        from: 400,
        to: 700,
        step: 1,
        double: false,
        tips: true,
        minMax: true,
        vertical: false,
        scin: 'orange',
        current: 'to',
      };
      expect(model.getConfig()).toMatchObject(defaultConfig);
    });
    test('should set the user config', () => {
      const userConfig = {
        min: 200,
        max: 500,
        from: 250,
        to: 300,
        double: true,
        vertical: true,
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
        vertical: true,
        minMax: false,
      };
      model.update(newConfig);
      expect(model.getConfig()).toMatchObject(newConfig);
    });
  });

  describe('setCurrent method', () => {
    test('should set current - to, in single slider', () => {
      model.setCurrent(0.7);
      expect(model.getConfig().current).toBe('to');
    });
    test('should set current - to, if position right of center', () => {
      model.update({ double: true });
      model.setCurrent(0.8);
      expect(model.getConfig().current).toBe('to');
    });
    test('should set current - from, if position left of center', () => {
      model.update({ double: true });
      model.setCurrent(0.4);
      expect(model.getConfig().current).toBe('from');
    });
    test('should set current - from, if last current - from and position on middle', () => {
      model.update({ double: true });
      model.setCurrent(0.3);
      model.setCurrent(0.55);
      expect(model.getConfig().current).toBe('from');
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
    test('should set correct right value', () => {
      model.calcValue(0.8);
      expect(model.getConfig().to).toBe(800);
    });
    test('should set correct left value', () => {
      model.update({ double: true });
      model.setCurrent(0.3);
      model.calcValue(0.3);
      expect(model.getConfig().from).toBe(300);
    });
    test('should set correct fractional value if slider is fractional', () => {
      model.update({ step: 0.1 });
      model.calcValue(0.3005);
      expect(model.getConfig().to).toBe(300.5);
    });
    test('should set right value to max, if right value greater then max', () => {
      model.calcValue(1.1);
      expect(model.getConfig().to).toBe((model.getConfig().max));
    });
    test('should set right value to min, if right value less then min in single slider', () => {
      model.calcValue(-0.1);
      expect(model.getConfig().to).toBe((model.getConfig().min));
    });
    test('should set right value to left value, if right value less then left value in double slider', () => {
      model.update({ double: true });
      model.calcValue(0.2);
      expect(model.getConfig().to).toBe(model.getConfig().from);
    });
    test('should set left value to min, if left value less then min in double slider', () => {
      model.update({ double: true });
      model.setCurrent(0.3);
      model.calcValue(-0.1);
      expect(model.getConfig().from).toBe((model.getConfig().min));
    });
    test('should set left value to right value, if left value greater then right value in double slider', () => {
      model.update({ double: true });
      model.setCurrent(0.3);
      model.calcValue(0.8);
      expect(model.getConfig().from).toBe(model.getConfig().to);
    });
  });
});
