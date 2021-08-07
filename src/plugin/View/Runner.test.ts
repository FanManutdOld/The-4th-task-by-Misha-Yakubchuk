import Runner from './Runner';

describe('Runner class', () => {
  const parent = document.createElement('div');
  const runnerRight = new Runner(parent, 'right');
  document.body.innerHTML = '';
  document.body.appendChild(parent);
  Object.defineProperty(parent, 'offsetWidth', { value: 650 });
  Object.defineProperty(parent, 'offsetHeight', { value: 650 });
  Object.defineProperty(parent.firstElementChild, 'offsetWidth', { value: 30 });
  Object.defineProperty(parent.firstElementChild, 'offsetHeight', { value: 30 });

  describe('className', () => {
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__runner slider__runner_pos_right');
    });
  });

  describe('setZIndex method', () => {
    test('should set z-index', () => {
      runnerRight.setZIndex();
      expect((parent.firstElementChild as HTMLElement).style.zIndex).toBe('1');
    });
  });

  describe('removeZIndex method', () => {
    test('should remove z-index', () => {
      runnerRight.removeZIndex();
      expect((parent.firstElementChild as HTMLElement).style.zIndex).toBe('0');
    });
  });

  describe('remove method', () => {
    test('should remove runner from parent', () => {
      runnerRight.remove();
      const tipRDOM = parent.querySelector('.slider__runnerR');
      expect(tipRDOM).toBeNull();
    });
  });

  describe('append method', () => {
    test('should append runner to parent', () => {
      runnerRight.append();
      const tipRDOM = parent.querySelector('.slider__runner_pos_right');
      expect(tipRDOM).toBeTruthy();
    });
  });

  describe('setPos method', () => {
    test('should set correct position in horizontal slider', () => {
      runnerRight.setOrientation(false);
      runnerRight.setPos(186);
      expect((parent.firstElementChild as HTMLElement).style.left).toMatch('28.6153');
    });
    test('should set correct position in vertical slider', () => {
      runnerRight.setOrientation(true);
      runnerRight.setPos(186);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('28.6153');
    });
  });
});
