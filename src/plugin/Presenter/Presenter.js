class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.add();
  }

  initPlugin() {
    /* this.view.addOnce("initView", () => {
      const widths = this.view.getWidths();
      this.model.initModel(widths);
    });
    this.model.add("changePositions", () => {
      const positions = this.model.getPositions();
      this.view.updatePositions(positions);
    }); */
    this.view.initView(this.model.getConfig());
  }

  add() {
    this.view.add("mouseDown", (posX) => {
      this.model.defineCurrentRunner(posX);
    });
    this.view.add("mouseMove", (posX) => {
      this.model.calcPositions(posX);
    });
    this.view.add("changeHelpWidth", (helpWidth) => {
      this.model.updateHelpWidth(helpWidth);
    });
    this.view.add("resize", () => {
      const sizes = this.view.getSliderSizes();
      this.model.updateSliderSizes(sizes);
    });
    this.model.add("changeValue", ([runner, newValue] = data) => {
      this.view.setValue(runner, newValue);
    });
  }
}

export default Presenter;