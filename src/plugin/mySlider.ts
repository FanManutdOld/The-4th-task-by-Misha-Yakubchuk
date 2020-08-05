/* eslint-disable */
import Model from './Model/Model';
import View from './View/MainView';
import Presenter from './Presenter/Presenter';

(function ($) {

  const mySlider = function (el, userConfig) {
    this.init(el, userConfig);
  }

  mySlider.prototype = {
    init: function (el, userConfig) {
      const model = new Model(userConfig);
      const view = new View(el);
      new Presenter(model, view);
    },

    test: function () {
      console.log('hello');
    },
  }
  $.fn.mySlider = function (userConfig) {
    return this.each(function() {
      if (!$.data(this, 'mySlider')) {
          $.data(this, 'mySlider', new mySlider(this, userConfig));
      }
  });
  }
})(jQuery);
