import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Helper from './Help.js';


class View {
  constructor(observer) {
    this.viewChangedSubject = new observer();
    this.track = new Track(this.viewChangedSubject);
    this.bar = new Bar(this.viewChangedSubject);
    this.runnerL = new Runner(this.viewChangedSubject, "runnerL");
    this.helpL = new Helper(this.viewChangedSubject);
  }

  initView(slider, config) {
    slider.style.position = "relative";
    const scin = config.scin;
    const runnerLWidth = this.runnerL.initRunner(slider, scin);

    this.track.initTrack(slider, scin);
    this.bar.initBar(slider, scin);
    this.helpL.initHelp(slider, scin, config.from);
    if(config.double) {
      this.runnerR = new Runner(this.viewChangedSubject, "runnerR");
      this.helpR = new Helper(this.viewChangedSubject);
      const runnerRWidth = this.runnerR.initRunner(slider, scin);
      this.helpR.initHelp(slider, scin, config.to);
      this.viewChangedSubject.notifyObservers("init", [runnerLWidth, this.helpL.getWidth(), runnerRWidth, this.helpR.getWidth()]);
    }
    else {
      this.viewChangedSubject.notifyObservers("init", [runnerLWidth, this.helpL.getWidth()]);
    }
  }

  initPositions(positions) {
    this.runnerL.setPosition(positions[0] + "%");
    this.helpL.setPosition(positions[1] + "%");
    this.runnerR.setPosition(positions[2] + "%");
    this.helpR.setPosition(positions[3] + "%");
    this.bar.setLeft(positions[4] + "%");
    this.bar.setWidth(positions[5] + "%");
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
    if( runner === "runnerL") {
      this.helpL.setValue(newValue);
    }
    else {
      this.helpR.setValue(newValue);
    }
  }
}

export default View;