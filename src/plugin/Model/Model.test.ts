import Model from './Model';

describe('Model class', () => {
  const config = {
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
    onStart: () => { },
    onChange: () => { },
    onFinish: () => { },
  };

  test('shourd return the current config', () => {
    const model: Model = new Model(config);
    expect(model.getConfig()).toEqual(config);
  });
});
