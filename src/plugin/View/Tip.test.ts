import Tip from './Tip';

describe('Tip class', () => {
  let parent: HTMLElement;
  let tipRight: Tip;
  beforeEach(() => {
    parent = document.createElement('div');
    tipRight = new Tip(parent, 'right');
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    (parent.firstElementChild as HTMLElement).style.width = '23px';
    (parent.firstElementChild as HTMLElement).style.height = '15px';
    Object.defineProperty(parent, 'offsetWidth', { value: 650 });
    Object.defineProperty(parent, 'offsetHeight', { value: 650 });
  });

  describe('className', () => {
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__tip slider__tip_pos_right');
    });
  });

  describe('setValue method', () => {
    test('should set correct value', () => {
      tipRight.setValue(200);
      expect((parent.firstElementChild as HTMLElement).textContent).toBe('200');
    });
  });

  describe('remove method', () => {
    test('should remove tip from parent', () => {
      tipRight.remove();
      const tipRDOM = parent.querySelector('.slider__tip_pos_right');
      expect(tipRDOM).toBeNull();
    });
  });

  describe('append method', () => {
    test('should append tip to parent', () => {
      tipRight.remove();
      tipRight.append();
      const tipRDOM = parent.querySelector('.slider__tip_pos_right');
      expect(tipRDOM).toBeTruthy();
    });
  });

  describe('updateVisibility method', () => {
    test('should show tip, if isVisible - true', () => {
      tipRight.updateVisibility(true);
      expect((parent.firstElementChild as HTMLElement).classList.contains('slider__tip_hidden')).toBe(false);
    });
    test('should hide tip, if isVisible - false', () => {
      tipRight.updateVisibility(false);
      expect((parent.firstElementChild as HTMLElement).classList.contains('slider__tip_hidden')).toBe(true);
    });
  });

  describe('setPos method', () => {
    test('should set correct position in horizontal slider', () => {
      tipRight.setOrientation(false);
      tipRight.setValue(300);
      tipRight.setPos(186, 15);
      expect((parent.firstElementChild as HTMLElement).style.left).toMatch('29.1538');
    });
    test('should set correct position in vertical slider', () => {
      tipRight.setOrientation(true);
      tipRight.setValue(300);
      tipRight.setPos(186, 15);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('29.7692');
    });
  });

  describe('setUnitedPos method', () => {
    test('should set correct unitedPos in horizontal slider', () => {
      (parent.firstElementChild as HTMLElement).style.width = '60.5px';
      tipRight.setOrientation(false);
      tipRight.setValue('660-700');
      tipRight.setUnitedPos(437);
      expect((parent.firstElementChild as HTMLElement).style.left).toBe('407px');
    });
    test('should set correct unitedPos in vertical slider', () => {
      tipRight.setOrientation(true);
      tipRight.setValue('660-700');
      tipRight.setUnitedPos(414.5);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('407px');
    });
  });
});
