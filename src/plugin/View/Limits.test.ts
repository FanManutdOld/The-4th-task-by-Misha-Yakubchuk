import Limits from './Limits';

describe('Limits class', () => {
  describe('className', () => {
    const parent: HTMLElement = document.createElement('div');
    new Limits(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__limits');
    });
  });

  describe('update method', () => {
    const parent: HTMLElement = document.createElement('div');
    const limits = new Limits(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    test('should hide limits, if hasLimits - false', () => {
      limits.update(false, 0, 1000, 15);
      expect((parent.firstElementChild as HTMLElement).classList.contains('slider__limits_hidden')).toBe(true);
    });
    test('should show limits, if hasLimits - true', () => {
      limits.update(true, 0, 1000, 15);
      expect((parent.firstElementChild as HTMLElement).classList.contains('slider__limits_hidden')).toBe(false);
    });
    test('should set correct min value', () => {
      limits.update(true, 0, 1000, 15);
      expect((parent.firstElementChild.firstElementChild as HTMLElement).textContent).toBe('0');
    });
    test('should set correct max value', () => {
      limits.update(true, 0, 1000, 15);
      expect((parent.firstElementChild.lastElementChild as HTMLElement).textContent).toBe('1000');
    });
  });

  describe('horizontal slider', () => {
    const parent: HTMLElement = document.createElement('div');
    const limits = new Limits(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    Object.defineProperty(parent, 'offsetWidth', { value: 650 });
    Object.defineProperty(parent.firstElementChild.firstElementChild, 'offsetWidth', { value: 13 });
    Object.defineProperty(parent.firstElementChild.lastElementChild, 'offsetWidth', { value: 28 });
    limits.setOrientation(false);
    describe('update method', () => {
      test('should set correct left minEl', () => {
        limits.update(true, 0, 1000, 15);
        expect((parent.firstElementChild.firstElementChild as HTMLElement).style.left).toBe('8.5px');
      });
      test('should set correct left maxEl', () => {
        limits.update(true, 0, 1000, 15);
        expect((parent.firstElementChild.lastElementChild as HTMLElement).style.left).toBe('621px');
      });
    });
  });

  describe('vertical slider', () => {
    const parent: HTMLElement = document.createElement('div');
    const limits = new Limits(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    Object.defineProperty(parent, 'offsetHeight', { value: 277 });
    Object.defineProperty(parent.firstElementChild.firstElementChild, 'offsetHeight', { value: 15 });
    Object.defineProperty(parent.firstElementChild.lastElementChild, 'offsetHeight', { value: 15 });
    limits.setOrientation(true);
    describe('update method', () => {
      test('should set correct top minEl', () => {
        limits.update(true, 0, 1000, 15, 15);
        expect((parent.firstElementChild.firstElementChild as HTMLElement).style.top).toBe('254.5px');
      });
      test('should set correct top maxEl', () => {
        limits.update(true, 0, 1000, 15);
        expect((parent.firstElementChild.lastElementChild as HTMLElement).style.top).toBe('7.5px');
      });
    });
  });
});
