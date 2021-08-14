import Observer from '../../../Observer/Observer';
import { MySliderConfig } from '../../../plugin/types';

class Select extends Observer {
  private select: HTMLSelectElement;

  private name: string;

  constructor(parent: HTMLElement) {
    super();
    this.init(parent);
  }

  public updateSelect(data: MySliderConfig) {
    this.select.value = data[this.name];
  }

  private init(parent: HTMLElement) {
    this.select = parent.querySelector('.js-select');
    this.name = this.select.getAttribute('name');
    this.select.addEventListener('change', this.updateSlider);
  }

  private updateSlider = () => {
    const { value } = this.select;
    this.notify('Change', { name: this.name, value });
  }
}

export default Select;
