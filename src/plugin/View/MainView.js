import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Helper from './Help.js';


class View {
  constructor(slider, observer) {
    this.slider = slider;
    this.viewChangedSubject = new observer();
    this.createClassInstances();
  }

  createClassInstances() {
    this.track = new Track(this.viewChangedSubject);
    this.bar = new Bar(this.viewChangedSubject);
    this.runnerR = new Runner(this.viewChangedSubject, "runnerR");
    this.helpR = new Helper(this.viewChangedSubject);
  }

  initView(config) {
    this.slider.style.position = "relative";
    this.config = config;
    const {
      scin,
      to,
      from
    } = this.config;

    this.runnerR.initRunner(this.slider, scin);
    this.track.initTrack(this.slider, scin);
    this.bar.initBar(this.slider, scin);
    this.helpR.initHelp(this.slider, scin, to);
    if (config.double) {
      this.runnerL = new Runner(this.viewChangedSubject, "runnerL");
      this.helpL = new Helper(this.viewChangedSubject);
      this.runnerL.initRunner(this.slider, scin);
      this.helpL.initHelp(this.slider, scin, from);
      this.viewChangedSubject.notify("initView");
    }
    else {
      this.viewChangedSubject.notify("initView");
    }
    window.addEventListener("resize", this.handleWindowResize.bind(this));
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
    return value / this.slider.offsetWidth * 100;
  }
}

export default View;