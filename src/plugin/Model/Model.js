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
    this.modelChangedSubject = new observer();
    this.positions = {};
  }

  init(runnerWidth, singleWidth) {
    this.runnerWidth = runnerWidth;
    this.singleWidth = singleWidth;
    this.rightEdge = (this.sliderWidth - this.runnerWidth) / this.sliderWidth * 100;
    this.initPositions();
  }

  initPositions() {
    this.positions.runnerPosition = (this.config.current * this.rightEdge - this.config.min * this.rightEdge) / (this.config.max - this.config.min);
    this.positions.barPosition = this.positions.runnerPosition + this.runnerWidth / 2 / this.sliderWidth * 100;
    this.positions.singlePosition = this.positions.barPosition - this.singleWidth / 2 / this.sliderWidth * 100;
    this.modelChangedSubject.notifyObservers("initPositions", this.positions);
  }

  calcPositions(runnerWidth, posX, shiftX) {
    this.positions.runnerPosition = (posX - shiftX - this.slider.getBoundingClientRect().left) / this.sliderWidth * 100;

    if (this.positions.runnerPosition < 0) {
      this.positions.runnerPosition = 0;
    }
    if (this.positions.runnerPosition > this.rightEdge) {
      this.positions.runnerPosition = this.rightEdge;
    }

    let newValue = ((this.config.max - this.config.min) * this.positions.runnerPosition / this.rightEdge) + this.config.min;
    this.modelChangedSubject.notifyObservers("value", newValue);

    this.positions.barPosition = this.positions.runnerPosition + runnerWidth / 2 / this.sliderWidth * 100;
    console.log(this.singleWidth);
    console.log(this.positions.barPosition);
    this.positions.singlePosition = this.positions.barPosition - this.singleWidth / 2 / this.sliderWidth * 100;
    this.modelChangedSubject.notifyObservers("positions", this.positions);
  }

  updateSingleWidth(singleWidth) {
    this.singleWidth = singleWidth;
  } 
}

export default Model;