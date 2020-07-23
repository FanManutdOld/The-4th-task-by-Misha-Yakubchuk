class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.addListeners();
  }

  initPlugin() {
    this.view.initView(this.model.getConfig());
  }

  addListeners() {
    this.view.add('mouseDown', this.handleMouseDown.bind(this));
    this.view.add('changePosition', this.handleChangePosition.bind(this));
    this.model.add('change', this.handleModelChange.bind(this));
  }

  handleMouseDown(position) {
    this.model.setCurrent(position);
  }

  handleChangePosition(position) {
    this.model.calcValue(position);
  }

  handleModelChange() {
    this.view.update(this.model.getConfig());
  }
}

export default Presenter;
