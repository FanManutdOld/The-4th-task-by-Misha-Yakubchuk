class Model {
  constructor(userConfig, observer) {
    this.config = {
      min: 0,
      max: 1000,
      to: 700,
      from: 500,
      double: false,
      scin: "orange",
    }
    this.updateConfig(userConfig);
    this.initData();
    this.modelChangedSubject = new observer();
    this.positions = {};
  }

  initData() {
    this.slider = {
      posLeft: 0,
      width: 0,
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
      middle() {
        return this.left + (this.right - this.left) / 2;
      }
    }
    this.currentRunner = "";
  }

  updateConfig(newConfig) {
    for (let [key, value] of Object.entries(newConfig)) {
      if (!(key in this.config)) {
        throw new Error("Invalid user property - " + key);
      }
      this.config[key] = value;
    }
  }

  initModel({ sliderPosLeft, sliderWidth, runnerRWidth, helpRWidth, runnerLWidth, helpLWidth }) {
    this.slider.posLeft = sliderPosLeft;
    this.slider.width = sliderWidth;
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
    }
    this.modelChangedSubject.notify("changePositions");
  }

  defineCurrentRunner(posX) {
    let posClick = posX - this.slider.posLeft;
    if (!this.config.double) {
      this.currentRunner = "runnerR";
      this.calcShiftX(posClick, this.runnerR);
      return;
    }
    if (posClick >= this.bar.middle()) {
      this.currentRunner = "runnerR";
      this.calcShiftX(posClick, this.runnerR);
    }
    else {
      this.currentRunner = "runnerL"
      this.calcShiftX(posClick, this.runnerL);
    }
  }

  calcShiftX(posClick, runner) {
    runner.shiftX = this.isInsideRunner(runner, posClick) ? posClick - runner.position : runner.width / 2 - 0.5;
  }

  isInsideRunner(runner, posClick) {
    return (posClick >= runner.position && posClick <= runner.position + runner.width);
  }

  calcPositions(posX) {
    if (this.currentRunner === "runnerR") {
      this.runnerR.position = (posX - this.runnerR.shiftX - this.slider.posLeft);
      let leftEdge = this.config.double ? this.runnerL.position : 0;
      this.runnerR.position = (this.runnerR.position < leftEdge) ? leftEdge :
        (this.runnerR.position > this.slider.rightEdge) ? this.slider.rightEdge : this.runnerR.position;

      this.config.to = ((this.config.max - this.config.min) * this.runnerR.position / this.slider.rightEdge) + this.config.min;
      this.modelChangedSubject.notify("changeValue", [this.currentRunner, this.config.to]);        //обновить значение слайдера, что бы изменилась ширина подсказки.
      this.bar.right = this.runnerR.position + this.runnerR.width / 2;
      this.helpR.position = this.bar.right - this.helpR.width / 2;
      this.modelChangedSubject.notify("changePositions");
    }
    if (this.currentRunner === "runnerL") {
      this.runnerL.position = (posX - this.runnerL.shiftX - this.slider.posLeft);
      this.runnerL.position = (this.runnerL.position < 0) ? 0 :
        (this.runnerL.position > this.runnerR.position) ? this.runnerR.position : this.runnerL.position;
      this.config.from = ((this.config.max - this.config.min) * this.runnerL.position / this.slider.rightEdge) + this.config.min;
      this.modelChangedSubject.notify("changeValue", [this.currentRunner, this.config.from]);        //обновить значение слайдера, что бы изменилась ширина подсказки.
      this.bar.left = this.runnerL.position + this.runnerL.width / 2;
      this.helpL.position = this.bar.left - this.helpL.width / 2;
      this.modelChangedSubject.notify("changePositions");
    }
  }

  updateHelpWidth(helpWidth) {
    this.currentRunner === "runnerR" ? this.helpR.width = helpWidth : this.helpL.width = helpWidth;
  }

  updateSliderSizes({ sliderPosLeft, sliderWidth }) {
    this.slider.posLeft = sliderPosLeft;
    this.slider.width = sliderWidth;
    console.log("sds");
  }

  toPerc(value) {
    return value / this.slider.width * 100;
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
}

export default Model;