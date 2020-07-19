import App from '../src/plugin/App/App.js';

$(document).ready(() => {
  const slider1 = document.querySelector('.test-page__plugin1');
  new App(slider1, {
    min: 0,
    max: 1000,
    double: true,
    to: 700,
    from: 300,
  });
  const slider2 = document.querySelector('.test-page__plugin2');
  new App(slider2, {
    min: 0,
    max: 1000,
    to: 700,
    from: 300,
  });
  const slider3 = document.querySelector('.test-page__plugin3');
  new App(slider3, {
    min: -1000,
    max: 1000,
    double: true,
    to: 700,
    from: 300,
  });
});