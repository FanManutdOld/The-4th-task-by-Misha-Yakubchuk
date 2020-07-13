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
    this.view.initView(this.model.config.scin, this.model.slider, this.model.config.current);
  }

  addObservers() {
    this.view.viewChangedSubject.addObserver("move", ([posX, shiftX] = data) => {
      this.model.calcPositions(this.model.runnerWidth, posX, shiftX);
    });
    this.model.modelChangedSubject.addObserver("value", (newValue) => {
      this.view.setValue(newValue);
    });
    this.model.modelChangedSubject.addObserver("positions", (positions) => {
      this.view.setPositions(this.view.runner, positions);
    });
    this.view.viewChangedSubject.addObserver("helperWidth", (helperWidth) => {
      this.model.updatehelperWidth(helperWidth);
    });
  }
}

export default Presenter;