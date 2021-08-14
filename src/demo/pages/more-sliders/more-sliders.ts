import SliderExample from '../../components/slider-example/slider-example';

$(document).ready(() => {
  $('.js-more-sliders__slider').each((_, element) => {
    const slider = new SliderExample(element);
    slider.addSlider();
  });
});
