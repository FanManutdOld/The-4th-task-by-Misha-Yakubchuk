import Observer from '../../observer/Observer';

class TextInput extends Observer {
  private input: HTMLInputElement;

  private name: string;

  constructor(parent: HTMLElement) {
    super();
    this.init(parent);
  }

  public updateInput(data) {
    this.input.value = data[this.name];

    const isFromTo = this.name === 'from' || this.name === 'to';
    if (isFromTo) {
      this.input.step = data.step;
    }
  }

  private init(parent: HTMLElement) {
    this.input = parent.querySelector('.js-text-input__input');
    this.name = this.input.getAttribute('name');
    this.input.addEventListener('change', this.updateSlider);
  }

  private updateSlider = () => {
    const value = Number(this.input.value);
    this.notify('Change', { name: this.name, value });
  }
}

export default TextInput;
