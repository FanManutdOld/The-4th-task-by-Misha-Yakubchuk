import Plugin from '../src/plugin/plugin.js';

$(document).ready(() => {
  const plugin = document.querySelector('.test-page__plugin');
  new Plugin(plugin);
});