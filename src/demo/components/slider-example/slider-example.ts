import '../../../plugin/mySlider';
import { MySliderConfig } from '../../../plugin/types';

class SliderExample {
  public isDataAttrIsVertical: boolean;

  private exampleSlider: HTMLElement

  private sliderAPI: MySliderAPI;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public addSlider(userConfig?: MySliderConfig) {
    this.sliderAPI = $(this.exampleSlider).mySlider(userConfig).data('mySlider');
  }

  public updateSlider(config: MySliderConfig) {
    this.sliderAPI.update(config);
  }

  public getSliderData() {
    return this.sliderAPI.getData();
  }

  private init(parent: HTMLElement) {
    this.exampleSlider = parent.querySelector('.js-slider-example');
    this.isDataAttrIsVertical = this.exampleSlider.dataset.isVertical === 'true';
  }
}

export default SliderExample;
