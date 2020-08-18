import MinMax from './MinMax';

describe('MinMax class', () => {
  describe('className', () => {
    const parent: HTMLElement = document.createElement('div');
    new MinMax(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__min-max');
    });
  });

  describe('update method', () => {
    const parent: HTMLElement = document.createElement('div');
    const minMax = new MinMax(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    test('should hide minMax tips, if isMinMax - false', () => {
      minMax.update(false, 0, 1000, 15);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('hidden');
    });
    test('should show minMax tips, if isMinMax - true', () => {
      minMax.update(true, 0, 1000, 15);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('visible');
    });
    test('should set correct min value', () => {
      minMax.update(true, 0, 1000, 15);
      expect((parent.firstElementChild.firstElementChild as HTMLElement).textContent).toBe('0');
    });
    test('should set correct max value', () => {
      minMax.update(true, 0, 1000, 15);
      expect((parent.firstElementChild.lastElementChild as HTMLElement).textContent).toBe('1000');
    });
  });

  describe('horizontal slider', () => {
    const parent: HTMLElement = document.createElement('div');
    const minMax = new MinMax(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    Object.defineProperty(parent, 'offsetWidth', { value: 650 });
    Object.defineProperty(parent.firstElementChild.firstElementChild, 'offsetWidth', { value: 13 });
    Object.defineProperty(parent.firstElementChild.lastElementChild, 'offsetWidth', { value: 28 });
    minMax.setOrientation(false);
    describe('update method', () => {
      test('should set correct left minEl', () => {
        minMax.update(true, 0, 1000, 15);
        expect((parent.firstElementChild.firstElementChild as HTMLElement).style.left).toBe('8.5px');
      });
      test('should set correct left maxEl', () => {
        minMax.update(true, 0, 1000, 15);
        expect((parent.firstElementChild.lastElementChild as HTMLElement).style.left).toBe('621px');
      });
    });
  });

  describe('vertical slider', () => {
    const parent: HTMLElement = document.createElement('div');
    const minMax = new MinMax(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    Object.defineProperty(parent, 'offsetHeight', { value: 277 });
    Object.defineProperty(parent.firstElementChild.firstElementChild, 'offsetHeight', { value: 15 });
    Object.defineProperty(parent.firstElementChild.lastElementChild, 'offsetHeight', { value: 15 });
    minMax.setOrientation(true);
    describe('update method', () => {
      test('should set correct top minEl', () => {
        minMax.update(true, 0, 1000, 15, 15);
        expect((parent.firstElementChild.firstElementChild as HTMLElement).style.top).toBe('254.5px');
      });
      test('should set correct top maxEl', () => {
        minMax.update(true, 0, 1000, 15);
        expect((parent.firstElementChild.lastElementChild as HTMLElement).style.top).toBe('7.5px');
      });
    });
  });
});
