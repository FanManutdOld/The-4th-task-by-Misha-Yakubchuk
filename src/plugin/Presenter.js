import Model from "./Model";

class Presenter {
  constructor(model, view) {
    model.modelChangedSubject.addObserver("positions", function (positions) {
      view.setPositions(view.runner, positions);
    });
    view.viewChangedSubject.addObserver("init", function ([runnerWidth, singleWidth] = data) {
      model.init(runnerWidth, singleWidth);
    });
    view.initView(model.scin, model.slider, model.current);
    view.viewChangedSubject.addObserver("move", function ([posX, shiftX] = data) {
      model.calcPositions(model.runnerWidth, posX, shiftX);
    });
    model.modelChangedSubject.addObserver("value", function (newValue) {
      view.setValue(newValue);
    });
  }
}

export default Presenter;