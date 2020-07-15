class Model {
  constructor(slider, userConfig, observer) {
    this.slider = slider;
    this.sliderWidth = slider.offsetWidth;
    this.config = {
      min: 0,
      max: 1000,
      current: 500,
      scin: "orange",
    }
    this.updateConfig(userConfig);
    this.modelChangedSubject = new observer();
    this.positions = {};
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
    this.runnerWidth = runnerWidth;
    this.helperWidth = helperWidth;
    this.rightEdge = (this.sliderWidth - this.runnerWidth) / this.sliderWidth * 100;
    this.initPositions();
  }

  initPositions() {
    this.positions.runnerPosition = (this.config.current * this.rightEdge - this.config.min * this.rightEdge) / (this.config.max - this.config.min);
    this.positions.barPosition = this.positions.runnerPosition + this.runnerWidth / 2 / this.sliderWidth * 100;
    this.positions.helperPosition = this.positions.barPosition - this.helperWidth / 2 / this.sliderWidth * 100;
    this.modelChangedSubject.notifyObservers("initPositions", this.positions);
  }

  calcShiftX(posX, runnerLeft) {
    if (runnerLeft) {
      this.shiftX = posX - runnerLeft;
    }
    else {
      this.shiftX = this.runnerWidth / 2 - 0.5;
    }
  }

  calcPositions(runnerWidth, posX) {
    this.positions.runnerPosition = (posX - this.shiftX - this.slider.getBoundingClientRect().left) / this.sliderWidth * 100;

    if (this.positions.runnerPosition < 0) {
      this.positions.runnerPosition = 0;
    }
    if (this.positions.runnerPosition > this.rightEdge) {
      this.positions.runnerPosition = this.rightEdge;
    }

    let newValue = ((this.config.max - this.config.min) * this.positions.runnerPosition / this.rightEdge) + this.config.min;
    this.modelChangedSubject.notifyObservers("value", newValue);        //обновить значение слайдера, что бы изменилась ширина подсказки.

    this.positions.barPosition = this.positions.runnerPosition + runnerWidth / 2 / this.sliderWidth * 100;
    this.positions.helperPosition = this.positions.barPosition - this.helperWidth / 2 / this.sliderWidth * 100;
    this.modelChangedSubject.notifyObservers("positions", this.positions);
  }

  updatehelperWidth(helperWidth) {
    this.helperWidth = helperWidth;
  }
}

export default Model;