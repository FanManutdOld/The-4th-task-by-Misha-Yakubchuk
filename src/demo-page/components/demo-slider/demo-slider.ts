import Slider from '../example-slider/example-slider';
import TextInput from '../text-input/text-input';
import Checkbox from '../checkbox/checkbox';
import Callbacks from '../callbacks-demo/callbacks-demo';

class DemoSlider {
  private slider: Slider;

  private InstancesOfTextInputs: TextInput[] = [];

  private InstansesOfCheckboxes: Checkbox[] = [];

  private callbacks: Callbacks;

  private parent: HTMLElement;

  constructor(parent: HTMLElement, userConfig?: any) {
    this.parent = parent;
    this.init(userConfig);
  }

  private init(userConfig?: any) {
    const callbacksParent: HTMLElement = this.parent.querySelector('.js-demo-slider__callbacks');
    const sliderParent: HTMLElement = this.parent.querySelector('.js-demo-slider__example-slider');
    const textInputs = this.parent.querySelectorAll('.js-demo-slider__text-input');
    const checkboxes = this.parent.querySelectorAll('.js-demo-slider__checkbox');
    this.slider = new Slider(sliderParent);
    const isVertical: boolean = userConfig
      ? userConfig.isVertical || this.slider.isDataAttrIsVertical
      : this.slider.isDataAttrIsVertical;
    if (isVertical) {
      const plugin = this.parent.querySelector('.js-demo-slider__plugin');
      plugin.classList.add('demo-slider__plugin_orient_ver');
      sliderParent.classList.add('demo-slider__example-slider_orient_ver');
    }

    if (userConfig) {
      const extendedUserConfig = Object.assign(userConfig, {
        onStart: () => { this.callbacks.signalStart(); },
        onChange: this.handleOnChange,
        onFinish: () => { this.callbacks.signalFinish(); },
      });
      this.slider.addSlider(extendedUserConfig);
    } else {
      this.slider.addSlider({
        onStart: () => { this.callbacks.signalStart(); },
        onChange: this.handleOnChange,
        onFinish: () => { this.callbacks.signalFinish(); },
      });
    }

    this.callbacks = new Callbacks(callbacksParent);

    /* this.slider.addSlider(extendedUserConfig);
    this.slider.updateSlider('onStart', () => { this.callbacks.signalStart(); });
    this.slider.updateSlider('onChange', this.handleOnChange);
    this.slider.updateSlider('onFinish', () => { this.callbacks.signalFinish(); }); */
    textInputs.forEach((item, index) => {
      this.InstancesOfTextInputs.push(new TextInput(item as HTMLElement));
      this.InstancesOfTextInputs[index].add('Change', this.updateSlider);
    });
    checkboxes.forEach((item, index) => {
      this.InstansesOfCheckboxes.push(new Checkbox(item as HTMLElement));
      this.InstansesOfCheckboxes[index].add('Change', this.updateSlider);
    });

    this.updateDemo();
  }

  private handleOnChange = () => {
    this.updateDemo();
    this.callbacks.signalChange();
  }

  private updateSlider = ({ name, value }) => {
    const plugin = this.parent.querySelector('.js-demo-slider__plugin');
    const sliderParent: HTMLElement = this.parent.querySelector('.js-demo-slider__example-slider');

    if (name === 'isVertical') {
      if (value === true) {
        plugin.classList.add('demo-slider__plugin_orient_ver');
        sliderParent.classList.add('demo-slider__example-slider_orient_ver');
      } else {
        plugin.classList.remove('demo-slider__plugin_orient_ver');
        sliderParent.classList.remove('demo-slider__example-slider_orient_ver');
      }
    }

    this.slider.updateSlider(name, value);
  }

  private updateDemo() {
    const data = this.slider.getSliderData();
    this.InstancesOfTextInputs.forEach((item) => {
      item.updateInput(data);
    });
    this.InstansesOfCheckboxes.forEach((item) => {
      item.updateCheckbox(data);
    });
  }
}

export default DemoSlider;
