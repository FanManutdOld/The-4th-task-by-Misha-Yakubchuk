// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
// eslint-disable-next-line no-unused-vars
import IViewState from './IViewState';
import Track from './Track';
import Bar from './Bar';
import Runner from './Runner';
import Tip from './Tip';
import Observer from '../Observer/Observer';

class View extends Observer {
  private config: IConfig;

  private viewState: IViewState;

  private slider: HTMLElement;

  private track: Track;

  private bar: Bar;

  private runnerR: Runner;

  private tipR: Tip;

  private runnerL: Runner;

  private tipL: Tip;

  private refHandleDocumentMouseMove: EventListener;

  private refHandleDocumentMouseUp: EventListener;

  private connectedTip: boolean;

  constructor(parent: HTMLElement) {
    super();
    this.slider = document.createElement('div');
    this.slider.className = 'slider';
    this.slider.style.position = 'relative';
    parent.append(this.slider);
  }

  public initView(config: IConfig) {
    const {
      double,
      scin,
      isTips,
    } = config;

    this.track = new Track(this.slider, scin);
    this.bar = new Bar(this.slider, scin);
    this.runnerR = new Runner(this.slider, scin, 'runnerR');
    this.tipR = new Tip(this.slider, scin, 'tipR');
    if (!isTips) {
      this.tipR.hide();
    }
    if (double) {
      this.runnerL = new Runner(this.slider, scin, 'runnerL');
      this.tipL = new Tip(this.slider, scin, 'tipL');
      if (!isTips) {
        this.tipL.hide();
      }
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
      from,
      to,
      double,
      current,
    } = config;
    const isUpdateR: boolean = current === 'to' || isInit;
    const isUpdateL: boolean = current === 'from' || (isInit && double);

    if (isUpdateR) {
      if (!this.connectedTip) {
        this.tipR.setValue(to);
      }
      const runnerRPos: number = (this.viewState.rightEdge * (to - min)) / (max - min);
      let barRight: number = runnerRPos + this.runnerR.Width / 2;
      const tipRPos: number = barRight - this.tipR.Width / 2;
      barRight = this.viewState.width - barRight;

      this.updatePositions({ runnerRPos, tipRPos, barRight });
    }
    if (isUpdateL) {
      this.tipL.setValue(from);
      const runnerLPos: number = (this.viewState.rightEdge * (from - min)) / (max - min);
      const barLeft: number = runnerLPos + this.runnerL.Width / 2;
      const tipLPos: number = barLeft - this.tipL.Width / 2;

      this.updatePositions({ runnerLPos, tipLPos, barLeft });
    }
    if (double) {
      this.checkConnectionTips();
    }
  }

  public updateCurrent(current: string) {
    this.config.current = current;
  }

  // eslint-disable-next-line object-curly-newline
  private updatePositions({ runnerRPos, tipRPos, barRight, runnerLPos, tipLPos, barLeft }: {
    runnerRPos?: number,
    tipRPos?: number,
    barRight?: number,
    runnerLPos?: number,
    tipLPos?: number,
    barLeft?: number
  }) {
    if (typeof (runnerRPos) === 'number') {
      this.runnerR.setPos(this.toPerc(runnerRPos));
      this.tipR.setPos(this.toPerc(tipRPos));
      this.bar.setRight(this.toPerc(barRight));
    } else {
      this.runnerL.setPos(this.toPerc(runnerLPos));
      this.tipL.setPos(this.toPerc(tipLPos));
      this.bar.setLeft(this.toPerc(barLeft));
    }
  }

  private checkConnectionTips() {
    const {
      from,
      to,
    } = this.config;
    let { posLeft } = this.tipR;
    const { posRight } = this.tipL;

    if (posLeft <= posRight) {
      if (!this.connectedTip) {
        this.tipL.hide();
        this.connectedTip = true;
      }
      this.tipR.setValue(`${from}\u00A0—\u00A0${to}`);
      this.tipR.setPos(`${(this.bar.posLeft + this.bar.posRight) / 2 - this.viewState.posLeft - this.tipR.Width / 2}px`);
      posLeft = this.tipR.posLeft;
      if ((posLeft + this.tipR.Width / 2) >= posRight) {
        this.tipL.show();
        this.tipR.setValue(to);
        const tipRPos = (this.bar.posRight - this.tipR.Width / 2) - this.viewState.posLeft;
        this.tipR.setPos(this.toPerc(tipRPos));
        this.connectedTip = false;
      }
    } else if (this.connectedTip) {
      this.tipL.show();
      this.tipR.setValue(to);
      const tipRPos = (this.bar.posRight - this.tipR.Width / 2) - this.viewState.posLeft;
      this.tipR.setPos(this.toPerc(tipRPos));
      this.connectedTip = false;
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

    const middle = (this.bar.posLeft + this.bar.posRight) / 2;
    return (posX > middle) ? this.runnerR.Width / 2 - 0.5 : this.runnerL.Width / 2 - 0.5;
  }

  private getRelativePosition(posX: number, shiftX: number): number {
    return (posX - shiftX - this.viewState.posLeft) / this.viewState.rightEdge;
  }

  private updateZIndex() {
    const { current } = this.config;
    if (current === 'to') {
      this.runnerR.setZIndex();
    } else {
      this.runnerR.removeZIndex();
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
