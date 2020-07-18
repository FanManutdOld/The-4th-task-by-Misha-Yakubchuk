class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initPlugin();
    this.adds();
  }

  initPlugin() {
    this.model.modelChangedSubject.addOnce("initPositions", (positions) => {
      this.view.initPositions(positions);
    });
    this.view.viewChangedSubject.addOnce("init", ([runnerLWidth, helpLWidth, runnerRWidth, helpRWidth] = data) => {
      this.model.init(runnerLWidth, helpLWidth, runnerRWidth, helpRWidth);
    });
    this.view.initView(this.model.slider.DOMObject, this.model.config);
  }

  adds() {
    this.view.viewChangedSubject.add("mouseDown", ([runner, posX, runnerCoorLeft] = data) => {
      this.model.calcShiftX(runner, posX, runnerCoorLeft);
    });
    this.view.viewChangedSubject.add("mouseMove", ([runner, posX]) => {
      this.model.calcPositions(runner, posX);
    });
    this.model.modelChangedSubject.add("ChangeValue", ([runner, newValue] = data) => {
      this.view.setValue(runner, newValue);
    });
    this.model.modelChangedSubject.add("ChangePositions", (data) => {
      this.view.setPositions(data);
    });
    this.view.viewChangedSubject.add("ChangeHelperWidth", (helperWidth) => {
      this.model.updateHelperWidth(helperWidth);
    });
  }
}

export default Presenter;