/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import '../../plugin/jQueryInterface';

class DemoSlider {
  private parent: HTMLElement;

  private $slider: JQuery;

  private minInput: HTMLInputElement;

  private maxInput: HTMLInputElement;

  private fromInput: HTMLInputElement;

  private toInput: HTMLInputElement;

  private stepInput: HTMLInputElement;

  private scinInput: HTMLInputElement;

  private doubleInput: HTMLInputElement;

  private tipsInput: HTMLInputElement;

  private verticalInput: HTMLInputElement;

  private minMaxInput: HTMLInputElement;

  private scaleInput: HTMLInputElement;

  private start: HTMLElement;

  private change: HTMLElement;

  private finish: HTMLElement;

  constructor(parent: HTMLElement, userConfig?: any) {
    this.parent = parent;
    userConfig.onStart = this.handleOnStart;
    userConfig.onChange = this.handleOnChange;
    userConfig.onFinish = this.handleOnFinish;
    this.init(userConfig);
    this.addListeners();
    this.initInputs();
  }

  private init(userConfig) {
    this.minInput = this.parent.querySelector('.js-min');
    this.maxInput = this.parent.querySelector('.js-max');
    this.fromInput = this.parent.querySelector('.js-from');
    this.toInput = this.parent.querySelector('.js-to');
    this.stepInput = this.parent.querySelector('.js-step');
    this.scinInput = this.parent.querySelector('.js-scin');
    this.doubleInput = this.parent.querySelector('.js-double');
    this.tipsInput = this.parent.querySelector('.js-tips');
    this.verticalInput = this.parent.querySelector('.js-vertical');
    this.minMaxInput = this.parent.querySelector('.js-minMax');
    this.scaleInput = this.parent.querySelector('.js-scale');
    this.start = this.parent.querySelector('.js-start');
    this.change = this.parent.querySelector('.js-change');
    this.finish = this.parent.querySelector('.js-finish');

    const plugin = this.parent.querySelector('.js-plugin');
    const slider = this.parent.querySelector('.js-slider') as HTMLElement;
    if (userConfig.vertical || slider.dataset.vertical) {
      plugin.classList.add('demo-slider__plugin_ver');
      slider.classList.add('demo-slider__slider_ver');
    }
    this.$slider = $(this.parent).find('.js-slider').mySlider(userConfig).data('mySlider');
  }

  private addListeners() {
    this.minInput.addEventListener('change', this.handleMinInputChange);
    this.maxInput.addEventListener('change', this.handleMaxInputChange);
    this.fromInput.addEventListener('change', this.handleFromInputChange);
    this.toInput.addEventListener('change', this.handleToInputChange);
    this.stepInput.addEventListener('change', this.handleStepInputChange);
    this.scinInput.addEventListener('change', this.handleScinInputChange);
    this.doubleInput.addEventListener('change', this.handleDoubleInputChange);
    this.tipsInput.addEventListener('change', this.handleTipsInputChange);
    this.verticalInput.addEventListener('change', this.handleVerticalInputChange);
    this.minMaxInput.addEventListener('change', this.handleMinMaxInputChange);
    this.scaleInput.addEventListener('change', this.handleScaleInputChange);
  }

  private handleMinInputChange = () => {
    const min = Number(this.minInput.value);
    this.$slider.update({ min });
  }

  private handleMaxInputChange = () => {
    const max = Number(this.maxInput.value);
    this.$slider.update({ max });
  }

  private handleFromInputChange = () => {
    const from = Number(this.fromInput.value);
    this.$slider.update({ from });
  }

  private handleToInputChange = () => {
    const to = Number(this.toInput.value);
    this.$slider.update({ to });
  }

  private handleStepInputChange = () => {
    let step = Number(this.stepInput.value);
    if (step <= 0) {
      step = 1;
      this.stepInput.value = String(step);
    }
    this.$slider.update({ step });
    this.updateInputsStep(this.stepInput.value);
  }

  private handleScinInputChange = () => {
    const scin = this.scinInput.value;
    this.$slider.update({ scin });
  }

  private handleDoubleInputChange = () => {
    const double = Boolean(this.doubleInput.checked);
    this.$slider.update({ double });
  }

  private handleTipsInputChange = () => {
    const tips = Boolean(this.tipsInput.checked);
    this.$slider.update({ tips });
  }

  private handleVerticalInputChange = () => {
    const vertical = Number(this.verticalInput.checked);

    const plugin = this.parent.querySelector('.js-plugin');
    const slider = this.parent.querySelector('.js-slider');
    if (vertical) {
      plugin.classList.add('demo-slider__plugin_ver');
      slider.classList.add('demo-slider__slider_ver');
    } else {
      plugin.classList.remove('demo-slider__plugin_ver');
      slider.classList.remove('demo-slider__slider_ver');
    }
    this.$slider.update({ vertical });
  }

  private handleMinMaxInputChange = () => {
    const minMax = Boolean(this.minMaxInput.checked);
    this.$slider.update({ minMax });
  }

  private handleScaleInputChange = () => {
    const scale = Boolean(this.scaleInput.checked);
    this.$slider.update({ scale });
  }

  private initInputs() {
    const data = this.$slider.getData();
    this.minInput.value = data.min;
    this.maxInput.value = data.max;
    this.fromInput.value = data.from;
    this.toInput.value = data.to;
    this.stepInput.value = data.step;
    this.scinInput.value = data.scin;
    this.doubleInput.checked = data.double;
    this.tipsInput.checked = data.tips;
    this.verticalInput.checked = data.vertical;
    this.minMaxInput.checked = data.minMax;
    this.scaleInput.checked = data.scale;

    this.updateInputsStep(data.step);
  }

  private handleOnStart = () => {
    this.start.style.background = '#73b9f2';
    setTimeout(() => { this.start.style.background = 'rgba(251, 229, 213, 0.5)'; }, 500);
  }

  private handleOnChange = (data) => {
    this.maxInput.value = data.max;
    this.minInput.value = data.min;
    this.fromInput.value = data.from;
    this.toInput.value = data.to;
    this.change.style.background = '#73b9f2';
    setTimeout(() => { this.change.style.background = 'rgba(251, 229, 213, 0.5)'; }, 500);
  }

  private handleOnFinish = () => {
    this.finish.style.background = '#73b9f2';
    setTimeout(() => { this.finish.style.background = 'rgba(251, 229, 213, 0.5)'; }, 500);
  }

  private updateInputsStep(step: string) {
    this.minInput.step = step;
    this.maxInput.step = step;
    this.fromInput.step = step;
    this.toInput.step = step;
    this.stepInput.step = step;
  }
}

export default DemoSlider;
