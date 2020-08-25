/* eslint-disable no-undef */
import '../plugin/mySlider.ts';
import DemoSlider from './demo-slider/demo-slider';

$(document).ready(() => {
  const config1 = {
    min: 0,
    max: 1000,
    from: 300,
    step: 1,
    scin: 'orange',
    double: true,
    scale: true,
  };
  const demo1 = document.querySelector('.js-slider1') as HTMLElement;
  new DemoSlider(demo1, config1);
  const config2 = {
    min: 0,
    max: 0.1,
    to: 0.035,
    step: 0.001,
    scin: 'darkcongo',
    minMax: true,
  };
  const demo2 = document.querySelector('.js-slider2') as HTMLElement;
  new DemoSlider(demo2, config2);
  const config3 = {
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'whitered',
    scale: true,
    vertical: true,
    double: true,
  };
  const demo3 = document.querySelector('.js-slider3') as HTMLElement;
  new DemoSlider(demo3, config3);
  const config4 = {
    min: 2,
    max: 10,
    from: 300,
    to: 3,
    step: 0.5,
    scin: 'azure',
    vertical: true,
    scale: true,
    scaleSnap: true,
  };
  const demo4 = document.querySelector('.js-slider4') as HTMLElement;
  new DemoSlider(demo4, config4);
  const config5 = {
    min: -1000,
    max: 1000,
    double: true,
    from: -500,
    to: 500,
    scin: 'indigo',
  };
  const demo5 = document.querySelector('.js-slider5') as HTMLElement;
  new DemoSlider(demo5, config5);
});
