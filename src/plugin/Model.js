class Model {
  constructor() {
    this.slider = slider;
    this.min = data.min;
    this.max = data.max;
    this.current = data.current;
    this.scin = "orange";
    this.init();
  }

  init() {
    this.rightEdge = (this.slider.offsetWidth - this.runner.offsetWidth) / this.slider.offsetWidth * 100;
    this.initPositions();
  }

  initPositions() {
    let positions = {};
    positions.runnerPosition = (this.current * this.rightEdge - this.min * this.rightEdge) / (this.max - this.min);
    this.setValue(this.current);
    positions.barPosition = positions.runnerPosition + this.runner.offsetWidth / 2 / this.slider.offsetWidth * 100;
    positions.singlePosition = positions.barPosition - this.single.offsetWidth / 2 / this.slider.offsetWidth * 100;
    this.setPositions(this.runner, positions);
  }

  calcPositions(runner, shiftX, event) {
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    let runnerPosition = (posX - shiftX - this.slider.getBoundingClientRect().left) / this.slider.offsetWidth * 100;

    if (runnerPosition < 0) {
      runnerPosition = 0;
    }
    if (runnerPosition > this.rightEdge) {
      runnerPosition = this.rightEdge;
    }

    let newValue = ((this.max - this.min) * runnerPosition / this.rightEdge) + this.min;
    this.setValue(newValue);

    let barPosition = runnerPosition + runner.offsetWidth / 2 / this.slider.offsetWidth * 100;
    let singlePosition = barPosition - this.single.offsetWidth / 2 / this.slider.offsetWidth * 100;
    return {runnerPosition, barPosition, singlePosition};
  }
}

export default Model;