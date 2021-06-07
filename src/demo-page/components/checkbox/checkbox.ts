import Observer from '../observer/Observer';

class Checkbox extends Observer {
  private checkbox: HTMLInputElement;

  private name: string;

  constructor(parent: HTMLElement) {
    super();
    this.init(parent);
  }

  public updateCheckbox(data) {
    this.checkbox.checked = data[this.name];
  }

  private init(parent: HTMLElement) {
    this.checkbox = parent.querySelector('.js-checkbox__input');
    this.name = this.checkbox.getAttribute('name');
    this.checkbox.addEventListener('change', this.updateSlider);
  }

  private updateSlider = () => {
    const checked = Boolean(this.checkbox.checked);
    this.notify('Change', { name: this.name, value: checked });
  }
}

export default Checkbox;
