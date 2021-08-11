/* eslint-disable func-names */
import Model from './Model/Model';
import View from './View/MainView';
import Presenter from './Presenter/Presenter';
import { MySliderConfig } from './types';

(function ($) {
  class MySlider {
    model: Model;

    constructor(parent: HTMLElement, userConfig: MySliderConfig) {
      const dataConfig = this.getConfigFromData(parent);
      const resultConfig = $.extend(dataConfig, userConfig);
      this.init(parent, resultConfig);
    }

    public update(newConfig: MySliderConfig) {
      this.model.update(newConfig);
    }

    public getData() {
      return this.model.getConfig();
    }

    private getConfigFromData(parent: HTMLElement) {
      return {
        min: $(parent).data('min'),
        max: $(parent).data('max'),
        from: $(parent).data('from'),
        to: $(parent).data('to'),
        step: $(parent).data('step'),
        isDouble: $(parent).data('isDouble'),
        hasTips: $(parent).data('hasTips'),
        hasLimits: $(parent).data('hasLimits'),
        isVertical: $(parent).data('isVertical'),
        hasScale: $(parent).data('hasScale'),
        scaleLimit: $(parent).data('scaleLimit'),
        skin: $(parent).data('skin'),
      };
    }

    private init(parent: HTMLElement, userConfig: MySliderConfig) {
      this.model = new Model(userConfig);
      const config = this.model.getConfig();
      const view = new View(parent, config);
      new Presenter(this.model, view);
    }
  }

  // eslint-disable-next-line no-param-reassign
  $.fn.mySlider = function (userConfig) {
    return this.each(function () {
      if (!$.data(this, 'mySlider')) {
        $.data(this, 'mySlider', new MySlider(this, userConfig));
      }
    });
  };
}(jQuery));
