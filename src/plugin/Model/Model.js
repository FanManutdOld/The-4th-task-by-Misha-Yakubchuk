class Model {
  constructor(slider, userConfig, observer) {
    this.config = {
      min: 0,
      max: 1000,
      from: 500,
      to: 700,
      double: false,
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
    this.runnerL = {
      width: 0,
      position: 0,
      shiftX: 0,
    }
    this.runnerR = {
      width: 0,
      position: 0,
      shiftX: 0,
    }
    this.helpL = {
      width: 0,
      position: 0,
    }
    this.helpR = {
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

  init(runnerLWidth, helpLWidth, runnerRWidth, helpRWidth) {
    this.runnerL.width = runnerLWidth;
    this.helpL.width = helpLWidth;
    if (this.config.double) {
      this.runnerR.width = runnerRWidth;
      this.helpR.width = helpRWidth;
      this.slider.rightEdge = (this.slider.width - this.runnerR.width) / this.slider.width * 100;
    }
    else {
      this.slider.rightEdge = (this.slider.width - this.runnerL.width) / this.slider.width * 100;
    }
    this.initPositions();
  }

  initPositions() {
    this.runnerL.position = (this.config.from * this.slider.rightEdge - this.config.min * this.slider.rightEdge) / (this.config.max - this.config.min);
    if (this.config.double) {
      this.runnerR.position = (this.config.to * this.slider.rightEdge - this.config.min * this.slider.rightEdge) / (this.config.max - this.config.min);
      this.bar.left = this.runnerL.position + this.runnerL.width / 2 / this.slider.width * 100;
      this.bar.width = (this.runnerR.position + this.runnerR.width / 2 / this.slider.width * 100) - this.bar.left;
      this.helpL.position = this.bar.left - this.helpL.width / 2 / this.slider.width * 100;
      this.helpR.position = this.bar.width + this.bar.left - this.helpR.width / 2 / this.slider.width * 100;
      this.modelChangedSubject.notifyObservers("initPositions", [this.runnerL.position, this.helpL.position, this.runnerR.position, this.helpR.position, this.bar.left, this.bar.width]);
    }
    else {
      this.bar.width = this.runnerL.position + this.runnerL.width / 2 / this.slider.width * 100;
      this.helpL.position = this.bar.width - this.helpL.width / 2 / this.slider.width * 100;
      this.modelChangedSubject.notifyObservers("initPositions", [this.runnerL.position, this.helpL.position, this.bar.width]);
    }
  }

  calcShiftX(posX, runnerLeft) {
    if (runnerLeft) {
      this.runnerL.shiftX = posX - runnerLeft;
    }
    else {
      this.runnerL.shiftX = this.runnerL.width / 2 - 0.5;
    }
  }

  calcPositions(runner, posX) {
    this.runnerL.position = (posX - this.runnerL.shiftX - this.slider.DOMObject.getBoundingClientRect().left) / this.slider.width * 100;

    if (this.runnerL.position < 0) {
      this.runnerL.position = 0;
    }
    if (this.runnerL.position > this.slider.rightEdge) {
      this.runnerL.position = this.slider.rightEdge;
    }

    this.config.from = ((this.config.max - this.config.min) * this.runnerL.position / this.slider.rightEdge) + this.config.min;
    this.modelChangedSubject.notifyObservers("ChangeValue", this.config.from);        //обновить значение слайдера, что бы изменилась ширина подсказки.

    this.bar.width = this.runnerL.position + runnerWidth / 2 / this.slider.width * 100;
    this.helpL.position = this.bar.width - this.helpL.width / 2 / this.slider.width * 100;
    this.modelChangedSubject.notifyObservers("ChangePositions", [this.runnerL.position, this.bar.width, this.helpL.position]);
  }

  updateHelperWidth(helperWidth) {
    this.helpL.width = helperWidth;
  }
}

export default Model;