import Runner from './Runner';

describe('Runner class', () => {
  const parent = document.createElement('div');
  const runnerR = new Runner(parent, 'runnerR');
  document.body.innerHTML = '';
  document.body.appendChild(parent);
  Object.defineProperty(parent, 'offsetWidth', { value: 650 });
  Object.defineProperty(parent, 'offsetHeight', { value: 650 });
  Object.defineProperty(parent.firstElementChild, 'offsetWidth', { value: 30 });
  Object.defineProperty(parent.firstElementChild, 'offsetHeight', { value: 30 });

  describe('className', () => {
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__runner slider__runnerR');
    });
  });

  describe('setZIndex method', () => {
    test('should set z-index', () => {
      runnerR.setZIndex();
      expect((parent.firstElementChild as HTMLElement).style.zIndex).toBe('1');
    });
  });

  describe('removeZIndex method', () => {
    test('should remove z-index', () => {
      runnerR.removeZIndex();
      expect((parent.firstElementChild as HTMLElement).style.zIndex).toBe('0');
    });
  });

  describe('remove method', () => {
    test('should remove runner from parent', () => {
      runnerR.remove();
      const tipRDOM = parent.querySelector('.slider__runnerR');
      expect(tipRDOM).toBeNull();
    });
  });

  describe('append method', () => {
    test('should append runner to parent', () => {
      runnerR.append();
      const tipRDOM = parent.querySelector('.slider__runnerR');
      expect(tipRDOM).toBeTruthy();
    });
  });

  describe('setPos method', () => {
    test('should set correct position in horizontal slider', () => {
      runnerR.setOrientation(false);
      runnerR.setPos(186);
      expect((parent.firstElementChild as HTMLElement).style.left).toMatch('28.6153');
    });
    test('should set correct position in vertical slider', () => {
      runnerR.setOrientation(true);
      runnerR.setPos(186);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('28.6153');
    });
  });
});
