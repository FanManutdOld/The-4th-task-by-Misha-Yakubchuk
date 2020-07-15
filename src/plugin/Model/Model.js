class Model {
  constructor(slider, userConfig, observer) {
    this.config = {
      min: 0,
      max: 1000,
      current: 500,
      scin: "orange",
    }
    this.updateConfig(userConfig);
    this.initData(slider);
    this.modelChangedSubject = new observer();
    this.positions = {};
  }

  initData(slider) {
    this.slider = {
      DOMObject: slider,
      width: slider.offsetWidth,
      rightEdge: 0,
    };
    this.runner = {
      width: 0,
      position: 0,
      shiftX: 0,
    }
    this.helper = {
      width: 0,
      position: 0,
    }
    this.bar = {
      left: 0,
      width: 0,
    }
  }

  updateConfig(newConfig) {
    for (let [key, value] of Object.entries(newConfig)) {
      if (!(key in this.config)) {
        throw new Error("Invalid user property - " + key);
      }
      this.config[key] = value;
    }
  }

  init(runnerWidth, helperWidth) {
    this.runner.width = runnerWidth;
    this.helper.width = helperWidth;
    this.slider.rightEdge = (this.slider.width - this.runner.width) / this.slider.width * 100;
    this.initPositions();
  }

  initPositions() {
    this.runner.position = (this.config.current * this.slider.rightEdge - this.config.min * this.slider.rightEdge) / (this.config.max - this.config.min);
    this.bar.width = this.runner.position + this.runner.width / 2 / this.slider.width * 100;
    this.helper.position = this.bar.width - this.helper.width / 2 / this.slider.width * 100;
    this.modelChangedSubject.notifyObservers("initPositions", [this.runner.position, this.bar.width, this.helper.position]);
  }

  calcShiftX(posX, runnerLeft) {
    if (runnerLeft) {
      this.runner.shiftX = posX - runnerLeft;
    }
    else {
      this.runner.shiftX = this.runner.width / 2 - 0.5;
    }
  }

  calcPositions(runnerWidth, posX) {
    this.runner.position = (posX - this.runner.shiftX - this.slider.DOMObject.getBoundingClientRect().left) / this.slider.width * 100;

    if (this.runner.position < 0) {
      this.runner.position = 0;
    }
    if (this.runner.position > this.slider.rightEdge) {
      this.runner.position = this.slider.rightEdge;
    }

    this.config.current = ((this.config.max - this.config.min) * this.runner.position / this.slider.rightEdge) + this.config.min;
    this.modelChangedSubject.notifyObservers("value", this.config.current);        //обновить значение слайдера, что бы изменилась ширина подсказки.

    this.bar.width = this.runner.position + runnerWidth / 2 / this.slider.width * 100;
    this.helper.position = this.bar.width - this.helper.width / 2 / this.slider.width * 100;
    this.modelChangedSubject.notifyObservers("positions", [this.runner.position, this.bar.width, this.helper.position]);
  }

  updateHelperWidth(helperWidth) {
    this.helper.width = helperWidth;
  }
}

export default Model;