import MainView from './MainView';
import { MySliderConfig, CurrentRunner } from '../../types';

describe('MainView class', () => {
  let mainView: MainView;
  let parent: HTMLElement;
  let track: HTMLElement;
  let bar: HTMLElement;
  let scale: HTMLElement;
  let runnerRight: HTMLElement;
  let tipRight: HTMLElement;
  let runnerLeft: HTMLElement;
  let tipLeft: HTMLElement;
  let min: HTMLElement;
  let max: HTMLElement;
  let config: MySliderConfig;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    config = {
      min: 0,
      max: 1000,
      from: 400,
      to: 700,
      step: 1,
      isDouble: true,
      hasTips: true,
      hasLimits: true,
      hasScale: true,
      scaleLimit: 50,
      isVertical: false,
      skin: 'orange',
      current: CurrentRunner.TO,
    };
    parent = document.createElement('div');
    (parent as HTMLElement).style.width = '650px';
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    mainView = new MainView(parent, config);
    track = parent.querySelector('.slider__track');
    bar = parent.querySelector('.slider__bar');
    scale = parent.querySelector('.slider__scale');
    runnerRight = parent.querySelector('.slider__runner.slider__runner_pos_right');
    tipRight = parent.querySelector('.slider__tip.slider__tip_pos_right');
    runnerLeft = parent.querySelector('.slider__runner.slider__runner_pos_left');
    tipLeft = parent.querySelector('.slider__tip.slider__tip_pos_left');
    min = parent.querySelector('.slider__limit_min');
    max = parent.querySelector('.slider__limit_max');
  });

  describe('create View', () => {
    test('should create HTML elements', () => {
      expect(track).toBeTruthy();
      expect(bar).toBeTruthy();
      expect(scale).toBeTruthy();
      expect(runnerRight).toBeTruthy();
      expect(tipRight).toBeTruthy();
      expect(runnerLeft).toBeTruthy();
      expect(tipLeft).toBeTruthy();
      expect(min).toBeTruthy();
      expect(max).toBeTruthy();
    });
  });

  describe('updateView method', () => {
    test('should set correct values in HTML', () => {
      mainView.updateView(config, true);
      expect(tipRight.textContent).toBe('700');
      expect(tipLeft.textContent).toBe('400');
      expect(min.textContent).toBe('0');
      expect(max.textContent).toBe('1000');
    });
    test('should set united tips', () => {
      tipRight.style.width = '10px';
      tipRight.getBoundingClientRect = jest.fn(() => ({
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
      tipLeft.getBoundingClientRect = jest.fn(() => ({
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
      expect(tipRight.textContent).toBe('220\u00A0—\u00A0250');
    });
    test('should disconnect united tips after connect', () => {
      tipRight.style.width = '10px';
      tipRight.getBoundingClientRect = jest.fn(() => ({
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
      tipLeft.getBoundingClientRect = jest.fn(() => ({
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

      tipLeft.getBoundingClientRect = jest.fn(() => ({
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
      expect(tipRight.textContent).toBe('250');
    });
    test('should remove left runner and left tip, in single slider', () => {
      config.isDouble = false;
      mainView.updateView(config, true);
      runnerLeft = parent.querySelector('.slider__runner.slider__runnerL');
      tipLeft = parent.querySelector('.slider__tip.slider__tipL');
      expect(runnerLeft).toBeNull();
      expect(tipLeft).toBeNull();
    });
    test('should set correct right value', () => {
      config.to = 850;
      mainView.updateView(config);
      expect(tipRight.textContent).toBe('850');
    });
    test('should set correct left value', () => {
      config.from = 250;
      config.current = CurrentRunner.FROM;
      mainView.updateView(config);
      expect(tipLeft.textContent).toBe('250');
    });
  });

  describe('updateZIndex method', () => {
    test('should set z-index', () => {
      mainView.updateZIndex(CurrentRunner.TO);
      expect(runnerRight.style.zIndex).toBe('1');
    });
    test('should remove z-index', () => {
      mainView.updateZIndex(CurrentRunner.FROM);
      expect(runnerRight.style.zIndex).toBe('0');
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
      const mousedown = new MouseEvent('mousedown', { bubbles: true, button: 3 });
      runnerRight.dispatchEvent(mousedown);
      expect(callback).not.toBeCalled();
    });
    test('should notify about mousedown on runner', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      const mousedown = new MouseEvent('mousedown', { bubbles: true, button: 0 });
      runnerRight.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on track', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      const mousedown = new MouseEvent('mousedown', { bubbles: true, button: 0 });
      track.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on bar', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      const mousedown = new MouseEvent('mousedown', { bubbles: true, button: 0 });
      bar.dispatchEvent(mousedown);
      expect(callback).toBeCalled();
    });
    test('should notify about mousedown on scale', () => {
      const callback = jest.fn();
      mainView.add('mouseDown', callback);
      const mousedown = new MouseEvent('mousedown', { bubbles: true, button: 0 });
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
      runnerRight.dispatchEvent(mousedown);
      runnerRight.dispatchEvent(mousemove);
      expect(callback).toBeCalled();
    });
  });
});
