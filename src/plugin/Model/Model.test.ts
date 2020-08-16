import Model from './Model';

describe('Model class', () => {
  let model: Model;
  beforeEach(() => {
    model = new Model({});
  });

  describe('Initialize model', () => {
    test('should setup the default config', () => {
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
    test('should setup user config', () => {
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
  });
});
