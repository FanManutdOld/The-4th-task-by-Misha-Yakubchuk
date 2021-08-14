import DemoSlider from '../../components/demo-slider/demo-slider';

$(document).ready(() => {
  const demoSliders = document.querySelectorAll('.js-demo-page__demo-slider');
  demoSliders.forEach((demoSlider) => new DemoSlider(demoSlider as HTMLElement));
});
