import App from '../src/plugin/App/App.ts';

// eslint-disable-next-line no-undef
$(document).ready(() => {
  const slider1 = document.querySelector('.test-page__plugin1');
  new App(slider1, {
    min: 0,
    max: 100000,
    from: 700,
    to: 300,
    double: true,
  });
  const slider2 = document.querySelector('.test-page__plugin2');
  new App(slider2, {
    min: 2,
    max: 5,
    from: 300,
    to: 3,
    step: 0.5,
  });
  const slider3 = document.querySelector('.test-page__plugin3');
  new App(slider3, {
    min: -1000,
    max: 1000,
    double: true,
    from: 300,
    to: 700,
  });
});
