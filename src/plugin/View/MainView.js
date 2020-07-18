import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Helper from './Help.js';


class View {
  constructor(observer) {
    this.viewChangedSubject = new observer();
    this.track = new Track(this.viewChangedSubject);
    this.bar = new Bar(this.viewChangedSubject);
    this.runnerR = new Runner(this.viewChangedSubject, "runnerR");
    this.helpR = new Helper(this.viewChangedSubject);
  }

  initView(slider, config) {
    slider.style.position = "relative";
    this.config = config;
    this.runnerR.initRunner(slider, config.scin);

    this.track.initTrack(slider, config.scin);
    this.bar.initBar(slider, config.scin);
    this.helpR.initHelp(slider, config.scin, config.to);
    if (config.double) {
      this.runnerL = new Runner(this.viewChangedSubject, "runnerL");
      this.helpL = new Helper(this.viewChangedSubject);
      this.runnerL.initRunner(slider, config.scin);
      this.helpL.initHelp(slider, config.scin, config.from);
      this.viewChangedSubject.notify("init");
    }
    else {
      this.viewChangedSubject.notify("init");
    }
  }

  getWidths() {
    if (this.config.double) {
      return {
        runnerRWidth: this.runnerR.getWidth(), 
        helpRWidth: this.helpR.getWidth(), 
        runnerLWidth: this.runnerL.getWidth(), 
        helpLWidth: this.helpL.getWidth()
      }
    }
    return {
      runnerRWidth: this.runnerR.getWidth(), 
      helpRWidth: this.helpR.getWidth()
    }
  }
  initPositions({ runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft }) {
    this.runnerR.setPosition(runnerRPos + "%");
    this.helpR.setPosition(helpRPos + "%");
    this.bar.setRight(barRight + "%");
    if (runnerLPos) {
      this.runnerL.setPosition(runnerLPos + "%");
      this.helpL.setPosition(helpLPos + "%");
      this.bar.setLeft(barLeft + "%");
    }
  }

  setPositions(positions) {
    if (positions[0] === "runnerL") {
      this.runnerL.setPosition(positions[1] + "%");
      this.helpL.setPosition(positions[2] + "%");
      this.bar.setWidth(positions[3] + "%");
      this.bar.setLeft(positions[4] + "%");
    }
    else {
      this.runnerR.setPosition(positions[1] + "%");
      this.helpR.setPosition(positions[2] + "%");
      this.bar.setWidth(positions[3] + "%");
    }
  }

  setValue(runner, newValue) {
    if (runner === "runnerL") {
      this.helpL.setValue(newValue);
    }
    else {
      this.helpR.setValue(newValue);
    }
  }
}

export default View;