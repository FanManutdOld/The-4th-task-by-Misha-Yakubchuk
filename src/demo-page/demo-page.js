/* eslint-disable no-undef */
import '../plugin/mySlider.ts';

$(document).ready(() => {
  const plugin1 = $('.test-page__plugin1').mySlider({
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'orange',
    // isMinMax: false,
    double: true,
    onStart() {
      console.log('start');
    },
    onChange() {
      console.log('change');
    },
    onFinish() {
      console.log('finish');
    },
  }).data('mySlider');
  plugin1.update({
    double: false,
  });
  plugin1.update({
    double: true,
  });
  $('.test-page__plugin2').mySlider({
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'darkcongo',
    double: true,
    vertical: true,
  });
  $('.test-page__plugin3').mySlider({
    min: 0,
    max: 1000,
    from: 300,
    to: 700,
    scin: 'whitered',
    vertical: true,
  });
  $('.test-page__plugin4').mySlider({
    min: 2,
    max: 5,
    from: 300,
    to: 3,
    step: 0.5,
    scin: 'azure',
  });
  $('.test-page__plugin5').mySlider({
    min: -1000,
    max: 1000,
    double: true,
    from: 300,
    to: 700,
    scin: 'indigo',
  });
});
