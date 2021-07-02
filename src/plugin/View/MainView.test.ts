import MainView from './MainView';
// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
import CurrentRunner from '../ECurrentRunner';

describe('MainView class', () => {
  let mainView: MainView;
  let parent: HTMLElement;
  let track: HTMLElement;
  let bar: HTMLElement;
  let scale: HTMLElement;
  let runnerR: HTMLElement;
  let tipR: HTMLElement;
  let runnerL: HTMLElement;
  let tipL: HTMLElement;
  let min: HTMLElement;
  let max: HTMLElement;
  let config: IConfig;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    config = {
      min: 0,
      max: 1000,
      from: 400,
      to: 700,
      step: 1,
      double: true,
      tips: true,
      minMax: true,
      scale: true,
      scaleNum: 4,
      scaleSnap: true,
      scaleLimit: 50,
      vertical: false,
      scin: 'orange',
      current: CurrentRunner.TO,
    };
    parent = document.createElement('div');
    (parent as HTMLElement).style.width = '650px';
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    mainView = new MainView(parent);
    mainView.initView(config);
    track = parent.querySelector('.slider__track');
    bar = parent.querySelector('.slider__bar');
    scale = parent.querySelector('.slider__scale');
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
      expect(scale).toBeTruthy();
      expect(runnerR).toBeTruthy();
      expect(tipR).toBeTruthy();
      expect(runnerL).toBeTruthy();
      expect(tipL).toBeTruthy();
      expect(min).toBeTruthy();
      expect(max).toBeTruthy();
    });
  });

  describe('updateView method', () => {
    test('should set correct values in HTML', () => {
      mainView.updateView(config, true);
      expect(tipR.textContent).toBe('700');
      expect(tipL.textContent).toBe('400');
      expect(min.textContent).toBe('0');
      expect(max.textContent).toBe('1000');
    });
    test('should set united Tips', () => {
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
        right: 20,
        bottom: 0,
        toJSON: jest.fn(),
      }));
      config.to = 250;
      config.from = 220;
      mainView.updateView(config);
      expect(tipR.textContent).toBe('220\u00A0—\u00A0250');
    });
    test('should disconnect united tips after connect', () => {
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
        right: 20,
        bottom: 0,
        toJSON: jest.fn(),
      }));
      // connect
      config.to = 250;
      config.from = 220;
      mainView.updateView(config);

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
      // should disconnect
      config.from = 100;
      mainView.updateView(config);
      expect(tipR.textContent).toBe('250');
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
      config.current = CurrentRunner.FROM;
      mainView.updateView(config);
      expect(tipL.textContent).toBe('250');
    });
  });

  describe('updateZIndex method', () => {
    test('should set z-index', () => {
      mainView.updateZIndex(CurrentRunner.TO);
      expect(runnerR.style.zIndex).toBe('1');
    });
    test('should remove z-index', () => {
      mainView.updateZIndex(CurrentRunner.FROM);
      expect(runnerR.style.zIndex).toBe('0');
    });
  });

  describe('callOnStart method', () => {
    test('should call onStart method', () => {
      const onStart = jest.fn();
      config.onStart = onStart;
      mainView.updateView(config);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      track.dispatchEvent(mousedown);
      expect(onStart).toBeCalled();
    });
  });

  describe('callOnFinish method', () => {
    test('should call onFinish method', () => {
      const onFinish = jest.fn();
      config.onFinish = onFinish;
      mainView.updateView(config);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      const mouseup = new Event('mouseup', { bubbles: true });
      track.dispatchEvent(mousedown);
      track.dispatchEvent(mouseup);
      expect(onFinish).toBeCalled();
    });
  });

  describe('mousedown event', () => {
    test('should not notify about mousedown on Right Mouse Button', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 3 });
      runnerR.dispatchEvent(mousedown);
      expect(callback).not.toBeCalled();
    });
    test('should notify about mousedown on runner', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      runnerR.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on track', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      track.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on bar', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      bar.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on scale', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      scale.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
  });

  describe('mousemove event', () => {
    test('should notify about mousemove', () => {
      const callback = jest.fn();
      mainView.add('changePosition', callback);
      // @ts-expect-error
      const mousedown = new MouseEvent('mousedown', { bubbles: true, which: 1 });
      const mousemove = new MouseEvent('mousemove', { bubbles: true });
      runnerR.dispatchEvent(mousedown);
      runnerR.dispatchEvent(mousemove);
      expect(callback).toBeCalled();
    });
  });
});
