class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.addObservers();
  }

  initPlugin() {
    this.model.modelChangedSubject.addObserverOnce("initPositions", (positions) => {
      this.view.initPositions(positions);
    });
    this.view.viewChangedSubject.addObserverOnce("init", ([runnerLWidth, helpLWidth, runnerRWidth, helpRWidth] = data) => {
      this.model.init(runnerLWidth, helpLWidth, runnerRWidth, helpRWidth);
    });
    this.view.initView(this.model.slider.DOMObject, this.model.config);
  }

  addObservers() {
    this.view.viewChangedSubject.addObserver("mouseDown", ([runner, posX, runnerCoorLeft] = data) => {
      this.model.calcShiftX(runner, posX, runnerCoorLeft);
    });
    this.view.viewChangedSubject.addObserver("mouseMove", ([runner, posX]) => {
      this.model.calcPositions(runner, posX);
    });
    this.model.modelChangedSubject.addObserver("ChangeValue", ([runner, newValue] = data) => {
      this.view.setValue(runner, newValue);
    });
    this.model.modelChangedSubject.addObserver("ChangePositions", (data) => {
      this.view.setPositions(data);
    });
    this.view.viewChangedSubject.addObserver("ChangeHelperWidth", (helperWidth) => {
      this.model.updateHelperWidth(helperWidth);
    });
  }
}

export default Presenter;