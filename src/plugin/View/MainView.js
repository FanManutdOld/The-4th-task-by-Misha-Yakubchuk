import Track from './Track.js';
import Bar from './Bar.js';
import Runner from './Runner.js';
import Help from './Help.js';
import Observer from '../Observer/Observer.js';

class View extends Observer {
  constructor(parent) {
    super();
    this.slider = document.createElement('div');
    this.slider.className = 'slider';
    this.slider.style.position = 'relative';
    parent.appendChild(this.slider);
  }

  initView(config) {
    const {
      double,
      scin,
    } = config;

    this.track = new Track(this.slider, scin);
    this.bar = new Bar(this.slider, scin);
    this.helpR = new Help(this.slider, scin, 'helpR');
    this.runnerR = new Runner(this.slider, scin, 'runnerR');
    if (double) {
      this.helpL = new Help(this.slider, scin, 'helpL');
      this.runnerL = new Runner(this.slider, scin, 'runnerL');
    }

    this.viewState = {
      posLeft: this.slider.getBoundingClientRect().left,
      width: this.slider.offsetWidth,
      rightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
    };

    this.update(config);
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown.bind(this));
    this.slider.addEventListener('touchstart', this.handleSliderMouseDown.bind(this));
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  update(config) {
    this.config = config;
    const {
      min,
      max,
      to,
      from,
      double,
    } = config;

    this.helpR.setValue(to);
    const runnerRPos = (this.viewState.rightEdge * (to - min)) / (max - min);
    let barRight = runnerRPos + this.runnerR.getWidth() / 2;
    const helpRPos = barRight - this.helpR.getWidth() / 2;
    barRight = this.viewState.width - barRight;
    if (double) {
      this.helpL.setValue(from);
      const runnerLPos = (this.viewState.rightEdge * (from - min)) / (max - min);
      const barLeft = runnerLPos + this.runnerL.getWidth() / 2;
      const helpLPos = barLeft - this.helpL.getWidth() / 2;
      this.updatePositions(runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft);
    } else {
      this.updatePositions(runnerRPos, helpRPos, barRight);
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

  handleSliderMouseDown(event) {
    // eslint-disable-next-line prefer-destructuring
    const target = event.target;
    if (this.isTrack(target)) {
      const posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
      const shiftX = this.getDefaultShiftX(posX);
      const position = this.getRelativePosition(posX, shiftX);
      this.notify('mouseDown', position);
      this.notify('changePosition', position);
      this.bindDocumentMouseMove(event, shiftX);
    }
    if (target.classList.contains('slider__runner')) {
      const posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
      const shiftX = posX - target.getBoundingClientRect().left;
      const position = this.getRelativePosition(posX, shiftX);
      this.notify('mouseDown', position);
      this.bindDocumentMouseMove(event, shiftX);
    }
  }

  bindDocumentMouseMove(event, shiftX) {
    // ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, shiftX);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.refHandleDocumentMouseMove);
      document.addEventListener('mouseup', this.refHandleDocumentMouseUp);
    } else {
      document.addEventListener('touchmove', this.refHandleDocumentMouseMove);
      document.addEventListener('touchend', this.refHandleDocumentMouseUp);
    }
  }

  handleDocumentMouseMove(shiftX, event) {
    const posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    const position = this.getRelativePosition(posX, shiftX);
    this.notify('changePosition', position);
  }

  handleDocumentMouseUp(event) {
    if (event.type === 'mouseup') {
      document.removeEventListener('mousemove', this.refHandleDocumentMouseMove);
      document.removeEventListener('mouseup', this.refHandleDocumentMouseUp);
    } else {
      document.removeEventListener('touchmove', this.refHandleDocumentMouseMove);
      document.removeEventListener('touchend', this.refHandleDocumentMouseUp);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isTrack(target) {
    return target.classList.contains('slider__track') || target.classList.contains('slider__bar');
  }

  getDefaultShiftX(posX) {
    if (!this.config.double) {
      return this.runnerR.getWidth() / 2 - 0.5;
    }
    // eslint-disable-next-line max-len
    const middle = (this.runnerR.getPos() + this.runnerR.getWidth() / 2 + this.runnerL.getPos() + this.runnerL.getWidth() / 2) / 2;
    return (posX > middle) ? this.runnerR.getWidth() / 2 - 0.5 : this.runnerL.getWidth() / 2 - 0.5;
  }

  getRelativePosition(posX, shiftX) {
    return (posX - shiftX - this.viewState.posLeft) / this.viewState.rightEdge;
  }

  handleWindowResize() {
    this.viewState = {
      posLeft: this.slider.getBoundingClientRect().left,
      width: this.slider.offsetWidth,
      rightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
    };
    this.update(this.config);
  }

  toPerc(value) {
    return `${(value / this.slider.offsetWidth) * 100}%`;
  }
}

export default View;
