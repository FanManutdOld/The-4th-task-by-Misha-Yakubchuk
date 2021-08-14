import Bar from './Bar';

describe('Bar class', () => {
  describe('className', () => {
    const parent: HTMLElement = document.createElement('div');
    new Bar(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__bar');
    });
  });

  describe('horizontal slider', () => {
    const parent: HTMLElement = document.createElement('div');
    const bar = new Bar(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
      x: 80,
      y: 0,
      width: 160,
      height: 20,
      top: 0,
      left: 80,
      right: 240,
      bottom: 20,
      toJSON: jest.fn(),
    }));
    Object.defineProperty(parent, 'offsetWidth', { value: 320 });
    bar.setOrientation(false);
    describe('setLeft method', () => {
      test('should set correct left', () => {
        bar.setLeft(80, 0);
        expect((parent.firstElementChild as HTMLElement).style.left).toBe('25%');
      });
    });
    describe('setRight method', () => {
      test('should set correct right', () => {
        bar.setRight(240, 0);
        expect((parent.firstElementChild as HTMLElement).style.right).toBe('25%');
      });
    });
    describe('getCenter method', () => {
      test('should return correct center', () => {
        expect(bar.getCenter()).toBe(160);
      });
    });
  });

  describe('vertical slider', () => {
    const parent: HTMLElement = document.createElement('div');
    const bar = new Bar(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    parent.firstElementChild.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 80,
      width: 20,
      height: 160,
      top: 240,
      left: 20,
      right: 0,
      bottom: 80,
      toJSON: jest.fn(),
    }));
    Object.defineProperty(parent, 'offsetHeight', { value: 320 });
    bar.setOrientation(true);
    describe('setLeft method', () => {
      test('should set correct bottom', () => {
        bar.setLeft(80, 0);
        expect((parent.firstElementChild as HTMLElement).style.bottom).toBe('25%');
      });
    });
    describe('setRight method', () => {
      test('should set correct top', () => {
        bar.setRight(240, 0);
        expect((parent.firstElementChild as HTMLElement).style.top).toBe('25%');
      });
    });
    describe('getCenter method', () => {
      test('should return correct center in vertical slider', () => {
        expect(bar.getCenter()).toBe(160);
      });
    });
  });
});
