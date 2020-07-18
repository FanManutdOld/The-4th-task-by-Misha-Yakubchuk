class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.add();
  }

  initPlugin() {
    this.view.viewChangedSubject.addOnce("initView", () => {
      const widths = this.view.getWidths();
      this.model.initModel(widths);
    });
    this.model.modelChangedSubject.add("changePositions", () => {
      const positions = this.model.getPositions();
      this.view.updatePositions(positions);
    });
    this.view.initView(this.model.config);
  }

  add() {
    this.view.viewChangedSubject.add("mouseDown", (posX) => {
      this.model.defineCurrentRunner(posX);
    });
    this.view.viewChangedSubject.add("mouseMove", (posX) => {
      this.model.calcPositions(posX);
    });
    this.view.viewChangedSubject.add("changeHelpWidth", (helpWidth) => {
      this.model.updateHelpWidth(helpWidth);
    });
    this.view.viewChangedSubject.add("resize", () => {
      const sizes = this.view.getSliderSizes();
      this.model.updateSliderSizes(sizes);
    });
    this.model.modelChangedSubject.add("changeValue", ([runner, newValue] = data) => {
      this.view.setValue(runner, newValue);
    });
  }
}

export default Presenter;