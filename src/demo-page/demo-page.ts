import DemoSlider from './components/demo-slider/demo-slider';

$(document).ready(() => {
  const config1 = {
    min: 0,
    max: 1000,
    from: 400,
    to: 700,
    step: 1,
    scaleLimit: 10,
    scin: 'orange',
    isDouble: true,
    hasScale: true,
  };
  const demo1 = document.querySelector('.js-slider1') as HTMLElement;
  new DemoSlider(demo1, config1);
  const config2 = {
    min: 0,
    max: 0.1,
    to: 0.035,
    step: 0.001,
    scin: 'darkcongo',
    hasMinMax: true,
  };
  const demo2 = document.querySelector('.js-slider2') as HTMLElement;
  new DemoSlider(demo2, config2);
  const config3 = {
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scaleLimit: 4,
    scin: 'whitered',
    hasScale: true,
    isVertical: true,
    isDouble: true,
  };
  const demo3 = document.querySelector('.js-slider3') as HTMLElement;
  new DemoSlider(demo3, config3);
  const config4 = {
    min: 2,
    max: 10,
    from: 300,
    to: 3,
    step: 0.5,
    scaleLimit: 16,
    scin: 'azure',
    hasScale: true,
    isVertical: true,
  };
  const demo4 = document.querySelector('.js-slider4') as HTMLElement;
  new DemoSlider(demo4, config4);
  const config5 = {
    min: -1000,
    max: 1000,
    isDouble: true,
    from: -500,
    to: 500,
    scin: 'indigo',
  };
  const demo5 = document.querySelector('.js-slider5') as HTMLElement;
  new DemoSlider(demo5, config5);
});
