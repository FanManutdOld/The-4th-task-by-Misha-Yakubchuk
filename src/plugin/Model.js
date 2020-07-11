class Model {
  constructor(slider, data, observer) {
    this.slider = slider;
    this.sliderWidth = slider.offsetWidth;
    this.min = data.min;
    this.max = data.max;
    this.current = data.current;
    this.scin = "orange";
    /* this.valueChangedSubject = new observer();
    this.positionsChangedSubject = new observer(); */
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
    this.positions.runnerPosition = (this.current * this.rightEdge - this.min * this.rightEdge) / (this.max - this.min);
    this.positions.barPosition = this.positions.runnerPosition + this.runnerWidth / 2 / this.sliderWidth * 100;
    this.positions.singlePosition = this.positions.barPosition - this.singleWidth / 2 / this.sliderWidth * 100;
    this.modelChangedSubject.notifyObservers("positions", this.positions);
  }

  calcPositions(runnerWidth, posX, shiftX) {
    this.positions.runnerPosition = (posX - shiftX - this.slider.getBoundingClientRect().left) / this.sliderWidth * 100;

    if (this.positions.runnerPosition < 0) {
      this.positions.runnerPosition = 0;
    }
    if (this.positions.runnerPosition > this.rightEdge) {
      this.positions.runnerPosition = this.rightEdge;
    }

    let newValue = ((this.max - this.min) * this.positions.runnerPosition / this.rightEdge) + this.min;
    this.modelChangedSubject.notifyObservers("value", newValue);

    this.positions.barPosition = this.positions.runnerPosition + runnerWidth / 2 / this.sliderWidth * 100;
    this.positions.singlePosition = this.positions.barPosition - this.singleWidth / 2 / this.sliderWidth * 100;
    this.modelChangedSubject.notifyObservers("positions", this.positions);
  }
}

export default Model;