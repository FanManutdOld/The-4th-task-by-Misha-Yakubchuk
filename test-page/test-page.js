import Plugin from '../src/plugin/plugin.js';

$(document).ready(() => {
  const plugin = document.querySelector('.range-slider__here');
  new Plugin(plugin, {
    min: 0,
    max: 1000,
    current: 300,
  });
});