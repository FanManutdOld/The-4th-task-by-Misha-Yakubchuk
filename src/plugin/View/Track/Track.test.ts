import Track from './Track';

describe('Track class', () => {
  describe('className', () => {
    const parent: HTMLElement = document.createElement('div');
    new Track(parent);
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__track');
    });
  });
});
