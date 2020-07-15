import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Helper from './Helper.js';


class View {
  constructor(observer) {
    this.viewChangedSubject = new observer();
    this.track = new Track(this.viewChangedSubject);
    this.bar = new Bar(this.viewChangedSubject);
    this.runner = new Runner(this.viewChangedSubject);
    this.helper = new Helper(this.viewChangedSubject);
  }

  initView(slider, scin, currentValue) {
    slider.style.position = "relative";

    
    this.runnerWidth = this.runner.initRunner(slider, scin);

    this.track.initTrack(slider, scin);
    this.bar.initBar(slider, scin);
    this.helper.initHelper(slider, scin, currentValue);
    this.viewChangedSubject.notifyObservers("init", [this.runnerWidth, this.helper.getWidth()]);
  }

  setPositions(runner, positions) {
    runner.setPosition(positions[0] + "%");
    this.bar.setPosition(positions[1] + "%");
    this.helper.setPosition(positions[2] + "%");
  }

  setValue(newValue) {
    this.helper.setValue(newValue);
  }
}

export default View;