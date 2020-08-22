/* eslint-disable no-undef */
import '../plugin/mySlider.ts';
import DemoSlider from './demo-slider/demo-slider';

$(document).ready(() => {
  const config1 = {
    min: 0,
    max: 1000,
    from: 300,
    step: 1,
    scale: true,
    scin: 'orange',
    double: true,
  };
  const demo1 = document.querySelector('.js-slider1') as HTMLElement;
  new DemoSlider(demo1, config1);
  /* $('.test-page__plugin2').mySlider({
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'darkcongo',
    double: true,
    vertical: true,
  });
  $('.test-page__plugin3').mySlider({
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'whitered',
    vertical: true,
  });
  $('.test-page__plugin4').mySlider({
    min: 2,
    max: 5,
    from: 300,
    to: 3,
    step: 0.5,
    scin: 'azure',
  });
  $('.test-page__plugin5').mySlider({
    min: -1000,
    max: 1000,
    double: true,
    from: 300,
    to: 700,
    scin: 'indigo',
  }); */
});
