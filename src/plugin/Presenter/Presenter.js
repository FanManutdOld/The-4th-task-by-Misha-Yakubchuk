class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.add();
  }

  initPlugin() {
    this.view.initView(this.model.getConfig());
  }

  add() {
    this.view.add("mouseDown", (position) => {
      this.model.setCurrent(position);
    });

    this.view.add("changePosition", (position) => {
      this.model.calcValue(position);
    });

    this.model.add("change", () => {
      this.view.update(this.model.getConfig());
    });
  }
}

export default Presenter;