import Model from '../Model/Model';
import View from '../View/MainView';

class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.view.initView(this.model.getConfig());
    this.addListeners();
  }

  private addListeners() {
    this.view.add('mouseDown', this.handleMouseDown);
    this.view.add('changePosition', this.handleChangePosition);
    this.view.add('setValue', this.handleSetValue);
    this.model.add('changeCurrent', this.handleChangeCurrent);
    this.model.add('changeValue', this.handleChangeValue);
    this.model.add('changeConfig', this.handleChangeConfig);
  }

  private handleMouseDown = (position: number) => {
    this.model.setCurrent(position);
  }

  private handleChangePosition = (position: number) => {
    this.model.calcValue(position);
  }

  private handleSetValue = (value: number) => {
    this.model.setValueFromView(value);
  }

  private handleChangeCurrent = (current: string) => {
    this.view.updateZIndex(current);
  }

  private handleChangeValue = () => {
    this.view.updateView(this.model.getConfig());
  }

  private handleChangeConfig = () => {
    this.view.updateView(this.model.getConfig(), true);
  }
}

export default Presenter;
