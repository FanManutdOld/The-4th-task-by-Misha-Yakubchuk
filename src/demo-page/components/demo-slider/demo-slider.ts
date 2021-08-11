import SliderExample from '../slider-example/slider-example';
import TextInput from '../text-input/text-input';
import Checkbox from '../checkbox/checkbox';
import Select from '../select/select';
import CallbacksDemo from '../callbacks-demo/callbacks-demo';
import { MySliderConfig } from '../../../plugin/types';

class DemoSlider {
  private sliderExample: SliderExample;

  private textInputs: TextInput[] = [];

  private checkboxes: Checkbox[] = [];

  private select: Select;

  private callbacksDemo: CallbacksDemo;

  private parent: HTMLElement;

  constructor(parent: HTMLElement, userConfig?: MySliderConfig) {
    this.parent = parent;
    this.init(userConfig);
  }

  private init(userConfig?: MySliderConfig) {
    const callbacksParent: HTMLElement = this.parent.querySelector('.js-demo-slider__callbacks-demo');
    const sliderParent: HTMLElement = this.parent.querySelector('.js-demo-slider__slider-example');
    const HTMLTextInputs = this.parent.querySelectorAll('.js-demo-slider__text-input');
    const HTMLCheckboxes = this.parent.querySelectorAll('.js-demo-slider__checkbox');
    const HTMLSelect = this.parent.querySelector('.js-demo-slider__select');
    this.sliderExample = new SliderExample(sliderParent);
    const isVertical: boolean = userConfig
      ? userConfig.isVertical || this.sliderExample.isDataAttrIsVertical
      : this.sliderExample.isDataAttrIsVertical;
    if (isVertical) {
      const plugin = this.parent.querySelector('.js-demo-slider__plugin');
      plugin.classList.add('demo-slider__plugin_orientation_vertical');
      sliderParent.classList.add('demo-slider__slider-example_orientation_vertical');
    }

    if (userConfig) {
      const extendedUserConfig = Object.assign(userConfig, {
        onStart: () => { this.callbacksDemo.signalStart(); },
        onChange: this.handleOnChange,
        onFinish: () => { this.callbacksDemo.signalFinish(); },
      });
      this.sliderExample.addSlider(extendedUserConfig);
    } else {
      this.sliderExample.addSlider({
        onStart: () => { this.callbacksDemo.signalStart(); },
        onChange: this.handleOnChange,
        onFinish: () => { this.callbacksDemo.signalFinish(); },
      });
    }

    this.callbacksDemo = new CallbacksDemo(callbacksParent);

    HTMLTextInputs.forEach((item, index) => {
      this.textInputs.push(new TextInput(item as HTMLElement));
      this.textInputs[index].add('Change', this.updateSlider);
    });
    HTMLCheckboxes.forEach((item, index) => {
      this.checkboxes.push(new Checkbox(item as HTMLElement));
      this.checkboxes[index].add('Change', this.updateSlider);
    });
    this.select = new Select(HTMLSelect as HTMLElement);
    this.select.add('Change', this.updateSlider);

    this.updateDemo();
  }

  private handleOnChange = () => {
    this.updateDemo();
    this.callbacksDemo.signalChange();
  }

  private updateSlider = ({ name, value }) => {
    const plugin = this.parent.querySelector('.js-demo-slider__plugin');
    const sliderParent: HTMLElement = this.parent.querySelector('.js-demo-slider__slider-example');

    if (name === 'isVertical') {
      if (value === true) {
        plugin.classList.add('demo-slider__plugin_orientation_vertical');
        sliderParent.classList.add('demo-slider__slider-example_orientation_vertical');
      } else {
        plugin.classList.remove('demo-slider__plugin_orientation_vertical');
        sliderParent.classList.remove('demo-slider__slider-example_orientation_vertical');
      }
    }

    this.sliderExample.updateSlider({ [name]: value });
  }

  private updateDemo() {
    const data = this.sliderExample.getSliderData();
    this.textInputs.forEach((item) => {
      item.updateInput(data);
    });
    this.checkboxes.forEach((item) => {
      item.updateCheckbox(data);
    });
    this.select.updateSelect(data);
  }
}

export default DemoSlider;
