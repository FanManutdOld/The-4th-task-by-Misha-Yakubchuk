import '../../../plugin/mySlider';
import '../../../plugin/jQueryInterface';

class SliderExample {
  public isDataAttrIsVertical: boolean;

  private exampleSlider: HTMLElement

  private $sliderAPI: JQuery;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public addSlider(userConfig?: any) {
    this.$sliderAPI = $(this.exampleSlider).mySlider(userConfig).data('mySlider');
  }

  public updateSlider(name, value) {
    this.$sliderAPI.update({ [name]: value });
  }

  public getSliderData() {
    return this.$sliderAPI.getData();
  }

  private init(parent: HTMLElement) {
    this.exampleSlider = parent.querySelector('.js-slider-example');
    this.isDataAttrIsVertical = this.exampleSlider.dataset.isVertical === 'true';
  }
}

export default SliderExample;
