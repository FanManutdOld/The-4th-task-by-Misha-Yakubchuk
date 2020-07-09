import Plugin from '../src/plugin/plugin.js';
import pluginMVC from '../src/plugin/pluginMVC.js';
import App from '../src/plugin/App';

$(document).ready(() => {
  const sliderHere = document.querySelector('.range-slider__here');
  /* new Plugin(sliderHere, {
    min: 0,
    max: 1000,
    current: 300,
  }); */
  //new pluginMVC();
  new App(sliderHere, {
    min: 0,
    max: 1000,
    current: 300,
  })
});