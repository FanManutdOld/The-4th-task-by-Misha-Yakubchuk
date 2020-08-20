import Tip from './Tip';

describe('Tip class', () => {
  let parent: HTMLElement;
  let tipR: Tip;
  beforeEach(() => {
    parent = document.createElement('div');
    tipR = new Tip(parent, 'tipR');
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    (parent.firstElementChild as HTMLElement).style.width = '23px';
    (parent.firstElementChild as HTMLElement).style.height = '15px';
    Object.defineProperty(parent, 'offsetWidth', { value: 650 });
    Object.defineProperty(parent, 'offsetHeight', { value: 650 });
  });

  describe('className', () => {
    test('should set correct className', () => {
      expect((parent.firstElementChild as HTMLElement).className).toBe('slider__tip slider__tipR');
    });
  });

  describe('setValue method', () => {
    test('should set correct value', () => {
      tipR.setValue(200);
      expect((parent.firstElementChild as HTMLElement).textContent).toBe('200');
    });
  });

  describe('remove method', () => {
    test('should remove tip from parent', () => {
      tipR.remove();
      const tipRDOM = parent.querySelector('.slider__tipR');
      expect(tipRDOM).toBeNull();
    });
  });

  describe('append method', () => {
    test('should append tip to parent', () => {
      tipR.remove();
      tipR.append();
      const tipRDOM = parent.querySelector('.slider__tipR');
      expect(tipRDOM).toBeDefined();
    });
  });

  describe('updateVisibility method', () => {
    test('should show tip, if isVisible - true', () => {
      tipR.updateVisibility(true);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('visible');
    });
    test('should hide tip, if isVisible - false', () => {
      tipR.updateVisibility(false);
      expect((parent.firstElementChild as HTMLElement).style.visibility).toBe('hidden');
    });
  });

  describe('setPos method', () => {
    test('should set correct position in horizontal slider', () => {
      tipR.setOrientation(false);
      tipR.setValue(300);
      tipR.setPos(186, 15);
      expect((parent.firstElementChild as HTMLElement).style.left).toMatch('29.1538');
    });
    test('should set correct position in vertical slider', () => {
      tipR.setOrientation(true);
      tipR.setValue(300);
      tipR.setPos(186, 15);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('29.7692');
    });
  });

  describe('setUnitedPos method', () => {
    test('should set correct unitedPos in horizontal slider', () => {
      (parent.firstElementChild as HTMLElement).style.width = '60.5px';
      tipR.setOrientation(false);
      tipR.setValue('660-700');
      tipR.setUnitedPos(437);
      expect((parent.firstElementChild as HTMLElement).style.left).toBe('407px');
    });
    test('should set correct unitedPos in vertical slider', () => {
      tipR.setOrientation(true);
      tipR.setValue('660-700');
      tipR.setUnitedPos(414.5);
      expect((parent.firstElementChild as HTMLElement).style.bottom).toMatch('407px');
    });
  });
});
