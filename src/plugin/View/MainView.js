import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Help from './Help.js';
import Observer from '../Observer/Observer.js';


class View extends Observer {
  constructor(slider) {
    this.slider = slider;
    this.slider.style.position = "relative";
  }

  initView(config) {
    this.config = config;
    const {
      to,
      from,
      double,
      scin
    } = this.config;

    this.track = new Track(this.slider, scin);
    this.bar = new Bar(this.slider, scin);
    this.helpR = new Help(this.slider, scin, to, "helpR");
    this.runnerR = new Runner(this.slider, scin, "runnerR");
    if (double) {
      this.helpL = new Help(this.slider, scin, from, "helpL");
      this.runnerL = new Runner(this.slider, scin, "runnerL");
    }
    window.addEventListener("resize", this.handleWindowResize.bind(this));
  }

  initPositions() {
    const {
      min,
      max,
      to,
      from,
      double
    } = this.config;
    const rightEdge = this.slider.offsetWidth - this.runnerR.getWidth();
    let position = rightEdge * (to - min) / (max - min);
    this.runnerR.setPos(this.toPerc(position));
    position = position + this.runnerR.getWidth() / 2;
    this.bar.setRight(this.toPerc(position));
    position = position - this.helpR.getWidth() / 2;
    this.helpR.setPos(this.toPerc(position));
    if (double) {
      position = rightEdge * (from - min) / (max - min);
      this.runnerL.setPos(this.toPerc(position));
      position = position + this.runnerL.getWidth() / 2;
      this.bar.setLeft(this.toPerc(position));
      position = position - this.helpL.getWidth() / 2;
      this.helpRLsetPos(this.toPerc(position));
    }
  }

  updatePositions({ runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft }) {
    this.runnerR.setPosition(this.toPerc(runnerRPos) + "%");
    this.helpR.setPosition(this.toPerc(helpRPos) + "%");
    this.bar.setRight(100 - this.toPerc(barRight) + "%");
    if (this.config.double) {
      this.runnerL.setPosition(this.toPerc(runnerLPos) + "%");
      this.helpL.setPosition(this.toPerc(helpLPos) + "%");
      this.bar.setLeft(this.toPerc(barLeft) + "%");
    }
  }

  setValue(runner, newValue) {
    if (runner === "runnerR") {
      this.helpR.setValue(newValue);
    }
    else {
      this.helpL.setValue(newValue);
    }
  }
  handleWindowResize() {
    this.viewChangedSubject.notify("resize");
  }

  getWidths() {
    if (this.config.double) {
      return {
        sliderPosLeft: this.slider.getBoundingClientRect().left,
        sliderRightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
        runnerRWidth: this.runnerR.getWidth(),
        helpRWidth: this.helpR.getWidth(),
        runnerLWidth: this.runnerL.getWidth(),
        helpLWidth: this.helpL.getWidth()
      }
    }
    return {
      sliderPosLeft: this.slider.getBoundingClientRect().left,
      sliderRightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
      runnerRWidth: this.runnerR.getWidth(),
      helpRWidth: this.helpR.getWidth()
    }
  }

  getSliderSizes() {
    return {
      sliderPosLeft: this.slider.getBoundingClientRect().left,
      sliderRightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
    }
  }

  toPerc(value) {
    return (value / this.slider.offsetWidth * 100) + "%";
  }
}

export default View;