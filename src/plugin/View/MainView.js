import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Help from './Help.js';
import Observer from '../Observer/Observer.js';


class View extends Observer {
  constructor(parent) {
    super();
    this.slider = document.createElement('div');
    this.slider.className = "slider";
    this.slider.style.position = "relative";
    parent.appendChild(this.slider);
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

    this.viewState = {
      posLeft: this.slider.getBoundingClientRect().left,
      width: this.slider.offsetWidth,
      rightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
    };

    this.runnerR.add("mouseMove", this.handleRunnerMove.bind(this, "runnerR"));
    

    this.initPositions();
    //this.slider.addEventListener("mousedown", this.handleSliderMouseDown.bind(this));
    //this.slider.addEventListener("touchstart", this.handleSliderMouseDown.bind(this));
    //window.addEventListener("resize", this.handleWindowResize.bind(this));
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
    const runnerRPos = rightEdge * (to - min) / (max - min);
    let barRight = runnerRPos + this.runnerR.getWidth() / 2;
    const helpRPos = barRight - this.helpR.getWidth() / 2;
    barRight = this.slider.offsetWidth - barRight;
    this.updatePositions(runnerRPos, helpRPos, barRight);
    if (double) {
      const runnerLPos = rightEdge * (from - min) / (max - min);
      const barLeft = runnerLPos + this.runnerL.getWidth() / 2;
      const helpLPos = barLeft - this.helpL.getWidth() / 2;
      this.updatePositions(runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft);
    }
  }

  updatePositions(runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft) {
    this.runnerR.setPos(this.toPerc(runnerRPos));
    this.helpR.setPos(this.toPerc(helpRPos));
    this.bar.setRight(this.toPerc(barRight));
    if (this.config.double) {
      this.runnerL.setPos(this.toPerc(runnerLPos));
      this.helpL.setPos(this.toPerc(helpLPos));
      this.bar.setLeft(this.toPerc(barLeft));
    }
  }

  handleRunnerMove(posX, currentRunner) {
    debugger
  }














  handleSliderMouseDown(event) {
    const target = event.target;
    if (this.isCorrect(target)) {
      let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;

    }
  }

  isCorrect (target) {
    return target.classList.contains("slider__track") || target.classList.contains("slider__bar") || target.classList.contains("slider__runner");
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