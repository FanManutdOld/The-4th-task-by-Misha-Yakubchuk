import App from '../src/plugin/App/App.ts';

// eslint-disable-next-line no-undef
$(document).ready(() => {
  const slider1 = document.querySelector('.test-page__plugin1');
  new App(slider1, {
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'orange',
    // isMinMax: false,
    double: true,
  });
  const slider2 = document.querySelector('.test-page__plugin2');
  new App(slider2, {
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'darkcongo',
    double: true,
    vertical: true,
  });
  const slider3 = document.querySelector('.test-page__plugin3');
  new App(slider3, {
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'whitered',
    vertical: true,
  });
  const slider4 = document.querySelector('.test-page__plugin4');
  new App(slider4, {
    min: 2,
    max: 5,
    from: 300,
    to: 3,
    step: 0.5,
    scin: 'azure',
  });
  const slider5 = document.querySelector('.test-page__plugin5');
  new App(slider5, {
    min: -1000,
    max: 1000,
    double: true,
    from: 300,
    to: 700,
    scin: 'indigo',
  });
});
