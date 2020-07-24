/* eslint-disable no-unused-vars */
import Model from '../Model/Model';
import View from '../View/MainView';

class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.addListeners();
  }

  private initPlugin() {
    this.view.initView(this.model.getConfig());
  }

  private addListeners() {
    this.view.add('mouseDown', this.handleMouseDown.bind(this));
    this.view.add('changePosition', this.handleChangePosition.bind(this));
    this.model.add('change', this.handleModelChange.bind(this));
  }

  private handleMouseDown(position) {
    this.model.setCurrent(position);
  }

  private handleChangePosition(position) {
    this.model.calcValue(position);
  }

  private handleModelChange() {
    this.view.update(this.model.getConfig());
  }
}

export default Presenter;
