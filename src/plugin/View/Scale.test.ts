import Scale from './Scale';

describe('Scale class', () => {
  const parent = document.createElement('div');
  document.body.innerHTML = '';
  document.body.append(parent);
  Object.defineProperty(parent, 'offsetWidth', { value: 650 });
  Object.defineProperty(parent, 'offsetHeight', { value: 277 });
  const scale = new Scale(parent);

  describe('className', () => {
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__scale');
    });
  });

  describe('update method', () => {
    test('should show scale, if isScale - true', () => {
      scale.update(true, 0, 0);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('visible');
    });
    test('should hide scale, if isScale - true', () => {
      scale.update(false, 0, 0);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('hidden');
    });
    test('should set correct positions in horizontal slider', () => {
      scale.update(true, 15, 40);
      expect((parent.firstElementChild as HTMLElement).style.left).toMatch('2.3076');
      expect((parent.firstElementChild as HTMLElement).style.width).toMatch('91.5384');
    });
    test('should set correct positions in vertical slider', () => {
      scale.setOrientation(true);
      scale.update(true, 15, 40);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('5.4151');
      expect((parent.firstElementChild as HTMLElement).style.height).toMatch('80.1444');
    });
  });
});
