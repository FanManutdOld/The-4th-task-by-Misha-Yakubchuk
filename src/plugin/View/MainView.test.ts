import MainView from './MainView';

describe('MainView class', () => {
  let mainView: MainView;
  let parent: HTMLElement;
  let track: HTMLElement;
  let bar: HTMLElement;
  let runnerR: HTMLElement;
  let tipR: HTMLElement;
  let runnerL: HTMLElement;
  let tipL: HTMLElement;
  let min: HTMLElement;
  let max: HTMLElement;
  let config;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    config = {
      min: 0,
      max: 1000,
      from: 400,
      to: 700,
      step: 1,
      double: true,
      tips: true,
      minMax: true,
      vertical: false,
      scin: 'orange',
      current: 'to',
    };
    parent = document.createElement('div');
    (parent as HTMLElement).style.width = '650px';
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    mainView = new MainView(parent);
    mainView.initView(config);
    track = parent.querySelector('.slider__track');
    bar = parent.querySelector('.slider__bar');
    runnerR = parent.querySelector('.slider__runner.slider__runnerR');
    tipR = parent.querySelector('.slider__tip.slider__tipR');
    runnerL = parent.querySelector('.slider__runner.slider__runnerL');
    tipL = parent.querySelector('.slider__tip.slider__tipL');
    min = parent.querySelector('.slider__min');
    max = parent.querySelector('.slider__max');
  });

  describe('initView method', () => {
    test('should create HTML elements', () => {
      expect(track).toBeTruthy();
      expect(bar).toBeTruthy();
      expect(runnerR).toBeTruthy();
      expect(tipR).toBeTruthy();
      expect(runnerL).toBeTruthy();
      expect(tipL).toBeTruthy();
      expect(min).toBeTruthy();
      expect(max).toBeTruthy();
    });
  });

  describe('updateView method', () => {
    beforeEach(() => {
      tipR.style.width = '10px';
      tipR.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 10,
        right: 0,
        bottom: 0,
        toJSON: jest.fn(),
      }));
      tipL.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        toJSON: jest.fn(),
      }));
    });
    test('should set correct values in HTML', () => {
      mainView.updateView(config, true);
      expect(tipR.textContent).toBe('700');
      expect(tipL.textContent).toBe('400');
      expect(min.textContent).toBe('0');
      expect(max.textContent).toBe('1000');
    });
    test('should remove left runner and left tip, in single slider', () => {
      config.double = false;
      mainView.updateView(config, true);
      runnerL = parent.querySelector('.slider__runner.slider__runnerL');
      tipL = parent.querySelector('.slider__tip.slider__tipL');
      expect(runnerL).toBeNull();
      expect(tipL).toBeNull();
    });
    test('should set correct right value', () => {
      config.to = 850;
      mainView.updateView(config);
      expect(tipR.textContent).toBe('850');
    });
    test('should set correct left value', () => {
      config.from = 250;
      config.current = 'from';
      mainView.updateView(config);
      expect(tipL.textContent).toBe('250');
    });
  });

  describe('updateZIndex method', () => {
    test('should set z-index', () => {
      mainView.updateZIndex('to');
      expect(runnerR.style.zIndex).toBe('1');
    });
    test('should remove z-index', () => {
      mainView.updateZIndex('from');
      expect(runnerR.style.zIndex).toBe('0');
    });
  });

  describe('callOnStart method', () => {
    test('should call onStart method', () => {
      const onStart = jest.fn();
      config.onStart = onStart;
      mainView.updateView(config);
      const mousedown = new Event('mousedown', { bubbles: true });
      track.dispatchEvent(mousedown);
      expect(onStart).toBeCalled();
    });
  });

  describe('callOnFinish method', () => {
    test('should call onFinish method', () => {
      const onFinish = jest.fn();
      config.onFinish = onFinish;
      mainView.updateView(config);
      const mousedown = new Event('mousedown', { bubbles: true });
      const mouseup = new Event('mouseup', { bubbles: true });
      track.dispatchEvent(mousedown);
      track.dispatchEvent(mouseup);
      expect(onFinish).toBeCalled();
    });
  });

  describe('mousedown event', () => {
    test('should notify about mousedown on track', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      const mousedown = new Event('mousedown', { bubbles: true });
      track.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on runner', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      const mousedown = new Event('mousedown', { bubbles: true });
      runnerR.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
  });

  describe('mousemove event', () => {
    test('should notify about mousemove', () => {
      const callback = jest.fn();
      mainView.add('changePosition', callback);
      const mousedown = new Event('mousedown', { bubbles: true });
      const mousemove = new Event('mousemove', { bubbles: true });
      runnerR.dispatchEvent(mousedown);
      runnerR.dispatchEvent(mousemove);
      expect(callback).toBeCalled();
    });
  });
});
