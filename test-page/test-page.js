import Plugin from '../src/plugin/plugin.js';

$(document).ready(() => {
  const plugin = document.querySelector('.range-slider__here');
  new Plugin(plugin);
});