/* eslint-disable */
import './jQueryInterface';
import Model from './Model/Model';
import View from './View/MainView';
import Presenter from './Presenter/Presenter';


(function ($) {

  const mySlider = function (el: HTMLElement, userConfig) {
    const dataConfig = {
      min: $(el).data('min'),
      max: $(el).data('max'),
      from: $(el).data('from'),
      to: $(el).data('to'),
      step: $(el).data('step'),
      double: $(el).data('double'),
      tips: $(el).data('tips'),
      minMax: $(el).data('minMax'),
      vertical: $(el).data('vertical'),
      scin: $(el).data('scin'),
    };

    const resultConfig = $.extend(dataConfig, userConfig);
    this.init(el, resultConfig);
  }

  mySlider.prototype = {
    init: function (el: HTMLElement, userConfig) {
      this.model = new Model(userConfig);
      const view = new View(el);
      new Presenter(this.model, view);
    },

    update: function (newConfig) {
      this.model.update(newConfig);
    },

    getData: function() {
      return this.model.getConfig();
    }
  }

  $.fn.mySlider = function (userConfig) {
    return this.each(function() {
      if (!$.data(this, 'mySlider')) {
          $.data(this, 'mySlider', new mySlider(this, userConfig));
      }
  });
  }
})(jQuery);
