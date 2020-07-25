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

  private runnerR: Runner;

  private helpR: Help;

  private runnerL: Runner;

  private helpL: Help;

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
    this.runnerR = new Runner(this.slider, scin, 'runnerR');
    this.helpR = new Help(this.slider, scin, 'helpR');
    if (double) {
      this.runnerL = new Runner(this.slider, scin, 'runnerL');
      this.helpL = new Help(this.slider, scin, 'helpL');
    }

    this.updateViewState();
    this.update(config, true);
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.addEventListener('touchstart', this.handleSliderMouseDown);
    window.addEventListener('resize', this.handleWindowResize);
  }

  public update(config: IConfig, isInit?: boolean) {
    this.config = config;
    const {
      min,
      max,
      to,
      from,
      double,
      current,
    } = config;
    const isUpdateR: boolean = current === 'to' || isInit;
    const isUpdateL: boolean = current === 'from' || (isInit && double);

    if (isUpdateR) {
      this.helpR.setValue(to);
      const runnerRPos: number = (this.viewState.rightEdge * (to - min)) / (max - min);
      let barRight: number = runnerRPos + this.runnerR.Width / 2;
      const helpRPos: number = barRight - this.helpR.Width / 2;
      barRight = this.viewState.width - barRight;

      this.updatePositions({ runnerRPos, helpRPos, barRight });
    }
    if (isUpdateL) {
      this.helpL.setValue(from);
      const runnerLPos: number = (this.viewState.rightEdge * (from - min)) / (max - min);
      const barLeft: number = runnerLPos + this.runnerL.Width / 2;
      const helpLPos: number = barLeft - this.helpL.Width / 2;

      this.updatePositions({ runnerLPos, helpLPos, barLeft });
    }
  }

  public updateCurrent(current: string) {
    this.config.current = current;
  }

  // eslint-disable-next-line object-curly-newline
  private updatePositions({ runnerRPos, helpRPos, barRight, runnerLPos, helpLPos, barLeft }: {
    runnerRPos?: number,
    helpRPos?: number,
    barRight?: number,
    runnerLPos?: number,
    helpLPos?: number,
    barLeft?: number
  }) {
    if (typeof (runnerRPos) === 'number') {
      this.runnerR.setPos(this.toPerc(runnerRPos));
      this.helpR.setPos(this.toPerc(helpRPos));
      this.bar.setRight(this.toPerc(barRight));
    } else {
      this.runnerL.setPos(this.toPerc(runnerLPos));
      this.helpL.setPos(this.toPerc(helpLPos));
      this.bar.setLeft(this.toPerc(barLeft));
    }
  }

  private handleSliderMouseDown = (event: MouseEvent | TouchEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    const isTrack: boolean = target.classList.contains('slider__track') || target.classList.contains('slider__bar');

    if (isTrack) {
      const posX: number = (event instanceof TouchEvent)
        ? event.targetTouches[0].clientX : event.clientX;

      const shiftX: number = this.getDefaultShiftX(posX);
      const position: number = this.getRelativePosition(posX, shiftX);

      this.notify('mouseDown', position);
      this.updateZIndex();
      this.notify('changePosition', position);
      this.bindDocumentMouseMove(event, shiftX);
    }
    if (target.classList.contains('slider__runner')) {
      const posX: number = (event instanceof TouchEvent)
        ? event.targetTouches[0].clientX : event.clientX;

      const shiftX: number = posX - target.getBoundingClientRect().left;
      const position: number = this.getRelativePosition(posX, shiftX);

      this.notify('mouseDown', position);
      this.updateZIndex();
      this.bindDocumentMouseMove(event, shiftX);
    }
  }

  private getDefaultShiftX(posX: number): number {
    if (!this.config.double) {
      return this.runnerR.Width / 2 - 0.5;
    }

    // eslint-disable-next-line max-len
    const middle = (this.runnerR.posLeft + this.runnerR.Width / 2 + this.runnerL.posLeft + this.runnerL.Width / 2) / 2;
    return (posX > middle) ? this.runnerR.Width / 2 - 0.5 : this.runnerL.Width / 2 - 0.5;
  }

  private getRelativePosition(posX: number, shiftX: number): number {
    return (posX - shiftX - this.viewState.posLeft) / this.viewState.rightEdge;
  }

  private updateZIndex() {
    const { current } = this.config;
    if (current === 'to') {
      this.runnerR.setZIndex();
      this.helpR.setZIndex();
    } else {
      this.runnerR.removeZIndex();
      this.helpR.removeZIndex();
    }
  }

  private bindDocumentMouseMove(event: MouseEvent | TouchEvent, shiftX: number) {
    // ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, shiftX);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp;
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

  private handleDocumentMouseUp = (event: MouseEvent | TouchEvent) => {
    if (event.type === 'mouseup') {
      document.removeEventListener('mousemove', this.refHandleDocumentMouseMove);
      document.removeEventListener('mouseup', this.refHandleDocumentMouseUp);
    } else {
      document.removeEventListener('touchmove', this.refHandleDocumentMouseMove);
      document.removeEventListener('touchend', this.refHandleDocumentMouseUp);
    }
  }

  private handleWindowResize = () => {
    this.updateViewState();
    this.update(this.config, true);
  }

  private updateViewState() {
    this.viewState = {
      posLeft: this.slider.getBoundingClientRect().left,
      width: this.slider.offsetWidth,
      rightEdge: this.slider.offsetWidth - this.runnerR.Width,
    };
  }

  private toPerc(value: number): string {
    return `${(value / this.slider.offsetWidth) * 100}%`;
  }
}

export default View;
