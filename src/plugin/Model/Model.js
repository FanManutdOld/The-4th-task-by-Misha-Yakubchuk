class Model {
  constructor(slider, userConfig, observer) {
    this.config = {
      min: 0,
      max: 1000,
      to: 700,
      from: 500,
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
    this.runnerR = {
      width: 0,
      position: 0,
      shiftX: 0,
    }
    this.runnerL = {
      width: 0,
      position: 0,
      shiftX: 0,
    }
    this.helpR = {
      width: 0,
      position: 0,
    }
    this.helpL = {
      width: 0,
      position: 0,
    }
    this.bar = {
      left: 0,
      right: 0,
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

  init({runnerRWidth, helpRWidth, runnerLWidth, helpLWidth}) {
    this.runnerR.width = runnerRWidth;
    this.helpR.width = helpRWidth;
    this.slider.rightEdge = this.slider.width - this.runnerR.width;
    if (this.config.double) {
      this.runnerL.width = runnerLWidth;
      this.helpL.width = helpLWidth;
    }
    this.initPositions();
  }

  initPositions() {
    this.runnerR.position = this.slider.rightEdge * (this.config.to - this.config.min) / (this.config.max - this.config.min);
    this.bar.right = this.runnerR.position + this.runnerR.width / 2;
    this.helpR.position = this.bar.right - this.helpR.width / 2;
    if (this.config.double) {
      this.runnerL.position = this.slider.rightEdge * (this.config.from - this.config.min) / (this.config.max - this.config.min);
      this.bar.left = this.runnerL.position + this.runnerL.width / 2;
      this.helpL.position = this.bar.left - this.helpL.width / 2;
      this.modelChangedSubject.notify("initPositions");
    }
    else {
      this.modelChangedSubject.notify("initPositions");
    }
  }

  getPositions() {
    const positions = {};
    positions.runnerRPos = this.toPerc(this.runnerR.position);
    positions.helpRPos = this.toPerc(this.helpR.position);
    positions.barRight = 100 - this.toPerc(this.bar.right);
    if (this.config.double) {
      positions.runnerLPos = this.toPerc(this.runnerL.position);
      positions.helpLPos = this.toPerc(this.helpL.position);
      positions.barLeft = this.toPerc(this.bar.left);
    }
    return positions;
  }

  toPerc(value) {
    return value / this.slider.width * 100;
  }

  calcShiftX(runner, posX, runnerCoorLeft) {
    let currentRunner = this.runnerR;
    if (runner === "runnerR") {
      currentRunner = this.runnerL;
    }
    if (runnerCoorLeft) {
      currentRunner.shiftX = posX - runnerCoorLeft;
    }
    else {
      currentRunner.shiftX = this.runnerR.width / 2 - 0.5;
    }
  }

  calcPositions(runner, posX) {
    if (this.config.double) {
      let currentRunner = this.runnerR;
      let currentHelp = this.helpR;
      let currentValue = this.config.to;
      if (runner === "runnerR") {
        currentRunner = this.runnerL;
        currentHelp = this.helpL;
        currentValue = this.config.from;
      }
      currentRunner.position = (posX - currentRunner.shiftX - this.slider.DOMObject.getBoundingClientRect().left) / this.slider.width * 100;

      if (currentRunner.position < 0) {
        currentRunner.position = 0;
      }
      if (currentRunner.position > this.slider.rightEdge) {
        currentRunner.position = this.slider.rightEdge;
      }

      currentValue = ((this.config.max - this.config.min) * currentRunner.position / this.slider.rightEdge) + this.config.min;
      this.modelChangedSubject.notify("ChangeValue", [runner, currentValue]);        //обновить значение слайдера, что бы изменилась ширина подсказки.
      if (runner === "runnerL") {
        this.bar.left = currentRunner.position + currentRunner.width / 2 / this.slider.width * 100;
        this.bar.right = (this.runnerL.position + this.runnerL.width / 2 / this.slider.width * 100) - this.bar.left;
        currentHelp.position = this.bar.left - currentHelp.width / 2 / this.slider.width * 100;
        this.modelChangedSubject.notify("ChangePositions", [runner, currentRunner.position, currentHelp.position, this.bar.right, this.bar.left]);
      }
      else {
        this.bar.right = (currentRunner.position + currentRunner.width / 2 / this.slider.width * 100) - this.bar.left;
        currentHelp.position = this.bar.right + this.bar.left - currentHelp.width / 2 / this.slider.width * 100;
        this.modelChangedSubject.notify("ChangePositions", [runner, currentRunner.position, currentHelp.position, this.bar.right]);
      }
    }
    else {
      this.runnerR.position = (posX - this.runnerR.shiftX - this.slider.DOMObject.getBoundingClientRect().left) / this.slider.width * 100;

      if (this.runnerR.position < 0) {
        this.runnerR.position = 0;
      }
      if (this.runnerR.position > this.slider.rightEdge) {
        this.runnerR.position = this.slider.rightEdge;
      }

      this.config.to = ((this.config.max - this.config.min) * this.runnerR.position / this.slider.rightEdge) + this.config.min;
      this.modelChangedSubject.notify("ChangeValue", this.config.to);        //обновить значение слайдера, что бы изменилась ширина подсказки.

      this.bar.right = this.runnerR.position + runnerWidth / 2 / this.slider.width * 100;
      this.helpR.position = this.bar.right - this.helpR.width / 2 / this.slider.width * 100;
      this.modelChangedSubject.notify("ChangePositions", [this.runnerR.position, this.bar.right, this.helpR.position]);
    }
  }

  updateHelperWidth(helperWidth) {
    this.helpR.width = helperWidth;
  }
}

export default Model;