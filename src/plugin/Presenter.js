import Model from "./Model";

class Presenter {
  constructor(model, view) {
    model.positionsChangedSubject.addObserver(function (positions) {
      view.setPositions(view.runner, positions);
    });
    view.viewInitSubject.addObserver(function ([runnerWidth, singleWidth] = data) {
      model.init(runnerWidth, singleWidth);
    });
    view.initView(model.scin, model.slider, model.current);
    view.viewChangedSubject.addObserver(function ([posX, shiftX] = data) {
      model.calcPositions(model.runnerWidth, posX, shiftX);
    });
    model.valueChangedSubject.addObserver(function (newValue) {
      view.setValue(newValue);
    });
  }
}

export default Presenter;