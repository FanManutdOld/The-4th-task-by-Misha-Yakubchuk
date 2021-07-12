import IConfig from '../IConfig';
import CurrentRunner from '../ECurrentRunner';
import Scale from './Scale';

describe('Scale class', () => {
  const parent = document.createElement('div');
  document.body.innerHTML = '';
  document.body.append(parent);
  Object.defineProperty(parent, 'offsetWidth', { value: 650 });
  Object.defineProperty(parent, 'offsetHeight', { value: 277 });
  const scale = new Scale(parent);
  const config: IConfig = {
    min: 0,
    max: 1000,
    from: 400,
    to: 700,
    step: NaN,
    scaleLimit: 50,
    double: false,
    tips: true,
    minMax: true,
    scale: false,
    vertical: false,
    scin: 'orange',
    current: CurrentRunner.TO,
  };
  describe('className', () => {
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__scale');
    });
  });

  describe('update method', () => {
    test('should show scale, if scale - true', () => {
      config.scale = true;
      scale.update(config, 0, 0);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('visible');
    });
    test('should hide scale, if scale - false', () => {
      config.scale = false;
      scale.update(config, 0, 0);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('hidden');
    });
    test('should set correct scale location in horizontal slider', () => {
      config.scale = true;
      scale.update(config, 40, 15);
      expect((parent.firstElementChild as HTMLElement).style.left).toMatch('2.3076');
      expect((parent.firstElementChild as HTMLElement).style.width).toMatch('91.5384');
    });
    test('should set correct scale location in vertical slider', () => {
      scale.setOrientation(true);
      scale.update(config, 40, 15);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('5.4151');
      expect((parent.firstElementChild as HTMLElement).style.height).toMatch('80.1444');
    });
  });
});
