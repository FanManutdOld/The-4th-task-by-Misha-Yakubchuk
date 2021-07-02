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
      scale: $(el).data('scale'),
      scaleSnap: $(el).data('scaleSnap'),
      scaleLimit: $(el).data('scaleLimit'),
      scaleNum: $(el).data('scaleNum'),
      scin: $(el).data('scin'),
    };

    const resultConfig = $.extend(dataConfig, userConfig);
    this.init(el, resultConfig);
  }

  mySlider.prototype = {
    init: function (parent: HTMLElement, userConfig) {
      this.model = new Model(userConfig);
      const view = new View(parent);
      new Presenter(this.model, view);
    },

    update: function (newConfig) {
      this.model.update(newConfig);
    },

    getData: function () {
      return this.model.getConfig();
    }
  }

  $.fn.mySlider = function (userConfig) {
    return this.each(function () {
      if (!$.data(this, 'mySlider')) {
        $.data(this, 'mySlider', new mySlider(this, userConfig));
      }
    });
  }
})(jQuery);
