class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.addObservers();
  }

  initPlugin() {
    this.model.modelChangedSubject.addObserverOnce("initPositions", (positions) => {
      this.view.setPositions(this.view.runner, positions);
    });
    this.view.viewChangedSubject.addObserverOnce("init", ([runnerWidth, helperWidth] = data) => {
      this.model.init(runnerWidth, helperWidth);
    });
    this.view.initView(this.model.slider.DOMObject, this.model.config.scin, this.model.config.current);
  }

  addObservers() {
    this.view.viewChangedSubject.addObserver("mouseDown", ([posX, runnerLeft] = data) => {
      this.model.calcShiftX(posX, runnerLeft);
    });
    this.view.viewChangedSubject.addObserver("mouseMove", (posX) => {
      this.model.calcPositions(this.model.runner.width, posX);
    });
    this.model.modelChangedSubject.addObserver("ChangeValue", (newValue) => {
      this.view.setValue(newValue);
    });
    this.model.modelChangedSubject.addObserver("ChangePositions", (positions) => {
      this.view.setPositions(this.view.runner, positions);
    });
    this.view.viewChangedSubject.addObserver("ChangeHelperWidth", (helperWidth) => {
      this.model.updateHelperWidth(helperWidth);
    });
  }
}

export default Presenter;