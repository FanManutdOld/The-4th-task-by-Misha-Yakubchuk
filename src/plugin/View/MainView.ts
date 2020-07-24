// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
// eslint-disable-next-line no-unused-vars
import IViewState from './IViewState';
import Track from './Track';
import Bar from './Bar';
import Runner from './Runner';
import Help from './Help';
import Observer from '../Observer/Observer';

class View extends Observer {
  private config: IConfig;

  private viewState: IViewState;

  private slider: HTMLElement;

  private track: Track;

  private bar: Bar;

  private helpR: Help;

  private runnerR: Runner;

  private helpL: Help;

  private runnerL: Runner;

  private refHandleDocumentMouseMove: EventListener;

  private refHandleDocumentMouseUp: EventListener;

  constructor(parent: HTMLElement) {
    super();
    this.slider = document.createElement('div');
    this.slider.className = 'slider';
    this.slider.style.position = 'relative';
    parent.appendChild(this.slider);
  }

  public initView(config: IConfig) {
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

  public update(config: IConfig) {
    this.config = config;
    const {
      min,
      max,
      to,
      from,
      double,
    } = config;

    this.helpR.setValue(to);
    const runnerRPos: number = (this.viewState.rightEdge * (to - min)) / (max - min);
    let barRight: number = runnerRPos + this.runnerR.getWidth() / 2;
    const helpRPos: number = barRight - this.helpR.getWidth() / 2;
    barRight = this.viewState.width - barRight;
    if (double) {
      this.helpL.setValue(from);
      const runnerLPos: number = (this.viewState.rightEdge * (from - min)) / (max - min);
      const barLeft: number = runnerLPos + this.runnerL.getWidth() / 2;
      const helpLPos: number = barLeft - this.helpL.getWidth() / 2;
      // eslint-disable-next-line object-curly-newline
      this.updatePositions({ runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft });
    } else {
      this.updatePositions({ runnerRPos, helpRPos, barRight });
    }
  }

  // eslint-disable-next-line object-curly-newline
  private updatePositions({ runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft }: {
    runnerRPos: number,
    helpRPos: number,
    barRight: number,
    runnerLPos?: number,
    helpLPos?: number,
    barLeft?: number
  }) {
    this.runnerR.setPos(this.toPerc(runnerRPos));
    this.helpR.setPos(this.toPerc(helpRPos));
    this.bar.setRight(this.toPerc(barRight));
    if (this.config.double) {
      this.runnerL.setPos(this.toPerc(runnerLPos));
      this.helpL.setPos(this.toPerc(helpLPos));
      this.bar.setLeft(this.toPerc(barLeft));
    }
  }

  private handleSliderMouseDown(event: MouseEvent | TouchEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    if (this.isTrack(target)) {
      const posX: number = (event instanceof TouchEvent)
        ? event.targetTouches[0].clientX : event.clientX;
      const shiftX: number = this.getDefaultShiftX(posX);
      const position: number = this.getRelativePosition(posX, shiftX);
      this.notify('mouseDown', position);
      this.notify('changePosition', position);
      this.bindDocumentMouseMove(event, shiftX);
    }
    if (target.classList.contains('slider__runner')) {
      const posX: number = (event instanceof TouchEvent)
        ? event.targetTouches[0].clientX : event.clientX;
      const shiftX: number = posX - target.getBoundingClientRect().left;
      const position: number = this.getRelativePosition(posX, shiftX);
      this.notify('mouseDown', position);
      this.bindDocumentMouseMove(event, shiftX);
    }
  }

  private bindDocumentMouseMove(event: MouseEvent | TouchEvent, shiftX: number) {
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

  private handleDocumentMouseMove(shiftX: number, event: MouseEvent | TouchEvent) {
    const posX: number = (event instanceof TouchEvent)
      ? event.targetTouches[0].clientX : event.clientX;
    const position = this.getRelativePosition(posX, shiftX);
    this.notify('changePosition', position);
  }

  private handleDocumentMouseUp(event: MouseEvent | TouchEvent) {
    if (event.type === 'mouseup') {
      document.removeEventListener('mousemove', this.refHandleDocumentMouseMove);
      document.removeEventListener('mouseup', this.refHandleDocumentMouseUp);
    } else {
      document.removeEventListener('touchmove', this.refHandleDocumentMouseMove);
      document.removeEventListener('touchend', this.refHandleDocumentMouseUp);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private isTrack(target: HTMLElement) {
    return target.classList.contains('slider__track') || target.classList.contains('slider__bar');
  }

  private getDefaultShiftX(posX: number) {
    if (!this.config.double) {
      return this.runnerR.getWidth() / 2 - 0.5;
    }
    // eslint-disable-next-line max-len
    const middle = (this.runnerR.getPos() + this.runnerR.getWidth() / 2 + this.runnerL.getPos() + this.runnerL.getWidth() / 2) / 2;
    return (posX > middle) ? this.runnerR.getWidth() / 2 - 0.5 : this.runnerL.getWidth() / 2 - 0.5;
  }

  private getRelativePosition(posX: number, shiftX: number) {
    return (posX - shiftX - this.viewState.posLeft) / this.viewState.rightEdge;
  }

  private handleWindowResize() {
    this.viewState = {
      posLeft: this.slider.getBoundingClientRect().left,
      width: this.slider.offsetWidth,
      rightEdge: this.slider.offsetWidth - this.runnerR.getWidth(),
    };
    this.update(this.config);
  }

  private toPerc(value: number) {
    return `${(value / this.slider.offsetWidth) * 100}%`;
  }
}

export default View;
