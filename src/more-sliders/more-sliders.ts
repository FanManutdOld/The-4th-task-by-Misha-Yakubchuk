import '../plugin/jQueryInterface';
import '../plugin/mySlider';

$(document).ready(() => {
  const sliders = $('.js-more-sliders__slider');
  sliders.mySlider();
});
