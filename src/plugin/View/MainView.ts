// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
import Track from './Track';
import Bar from './Bar';
import Runner from './Runner';
import Tip from './Tip';
import Observer from '../Observer/Observer';

class View extends Observer {
  private config: IConfig;

  private slider: HTMLElement;

  private rightEdge: number;

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
    this.config = config;
    const {
      double,
      vertical,
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

    this.updateOrientation(vertical);
    this.rightEdge = vertical
      ? this.slider.offsetHeight - this.runnerR.halfWidth * 2
      : this.slider.offsetWidth - this.runnerR.halfWidth * 2;
    this.updateView(config, true);
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.addEventListener('touchstart', this.handleSliderMouseDown);
    window.addEventListener('resize', this.handleWindowResize);
  }

  public updateView(config: IConfig, isInit?: boolean) {
    this.config = config;
    let newPos: number;
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
      newPos = (this.rightEdge * (to - min)) / (max - min);
      this.updateR(newPos);
    }
    if (isUpdateL) {
      this.tipL.setValue(from);
      newPos = (this.rightEdge * (from - min)) / (max - min);
      this.updateL(newPos);
    }
    if (double) {
      this.checkConnectionTips();
    }
  }

  public updateCurrent(current: string) {
    this.config.current = current;
    if (current === 'to') {
      this.runnerR.setZIndex();
    } else {
      this.runnerR.removeZIndex();
    }
  }

  private updateR(newPos: number) {
    this.runnerR.setPos(newPos);
    this.bar.setRight(newPos, this.runnerR.halfWidth);
    if (this.connectedTip) {
      this.updateConnectedTips();
    } else {
      this.tipR.setPos(newPos, this.runnerR.halfWidth);
    }
  }

  private updateL(newPos: number) {
    this.runnerL.setPos(newPos);
    this.bar.setLeft(newPos, this.runnerL.halfWidth);
    if (this.connectedTip) {
      this.updateConnectedTips();
    }
    this.tipL.setPos(newPos, this.runnerR.halfWidth);
  }

  private updateConnectedTips() {
    const {
      from,
      to,
    } = this.config;
    this.tipR.setValue(`${from}\u00A0—\u00A0${to}`);
    const rect = this.slider.getBoundingClientRect();
    const temp = this.config.vertical
      ? rect.bottom - this.bar.getMiddle()
      : this.bar.getMiddle() - rect.left;
    this.tipR.setUnitedPos(temp);
  }

  private checkConnectionTips() {
    if (!this.connectedTip) {
      if (this.tipR.isConnected(this.tipL)) {
        this.connectedTip = true;
        this.tipL.hide();
        this.updateConnectedTips();
      }
    } else if (this.connectedTip) {
      if (this.tipR.isDisconnected(this.tipL)) {
        this.connectedTip = false;
        this.tipL.show();
        this.updateView(this.config, true);
      }
    }
  }

  private handleSliderMouseDown = (event: MouseEvent | TouchEvent) => {
    const { vertical } = this.config;
    let posClick: number; let shift: number; let position: number;
    const target: HTMLElement = event.target as HTMLElement;
    const isTrack: boolean = target.classList.contains('s__track') || target.classList.contains('s__bar');

    if (isTrack) {
      if (vertical) {
        posClick = (event instanceof TouchEvent)
          ? event.targetTouches[0].clientY : event.clientY;
      } else {
        posClick = (event instanceof TouchEvent)
          ? event.targetTouches[0].clientX : event.clientX;
      }
      shift = this.getDefaultShiftX(posClick);
      position = this.getRelativePosition(posClick, shift);

      this.notify('mouseDown', position);
      this.notify('changePosition', position);
      this.bindDocumentMouseMove(event, shift);
    }
    if (target.classList.contains('s__runner')) {
      if (vertical) {
        posClick = (event instanceof TouchEvent)
          ? event.targetTouches[0].clientY : event.clientY;
      } else {
        posClick = (event instanceof TouchEvent)
          ? event.targetTouches[0].clientX : event.clientX;
      }

      shift = vertical
        ? posClick - target.getBoundingClientRect().top
        : posClick - target.getBoundingClientRect().left;
      position = this.getRelativePosition(posClick, shift);

      this.notify('mouseDown', position);
      this.bindDocumentMouseMove(event, shift);
    }
  }

  private getDefaultShiftX(posClick: number): number {
    if (!this.config.double) {
      return this.runnerR.halfWidth - 0.5;
    }
    const middle = this.bar.getMiddle();
    return (posClick > middle) ? this.runnerR.halfWidth - 0.5 : this.runnerL.halfWidth - 0.5;
  }

  private getRelativePosition(posClick: number, shift: number): number {
    const rect = this.slider.getBoundingClientRect();
    if (this.config.vertical) {
      return 1 - (posClick - shift - rect.top) / this.rightEdge;
    }
    return (posClick - shift - rect.left) / this.rightEdge;
  }

  private bindDocumentMouseMove(event: MouseEvent | TouchEvent, shift: number) {
    // ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, shift);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp;

    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.refHandleDocumentMouseMove);
      document.addEventListener('mouseup', this.refHandleDocumentMouseUp);
    } else {
      document.addEventListener('touchmove', this.refHandleDocumentMouseMove);
      document.addEventListener('touchend', this.refHandleDocumentMouseUp);
    }
  }

  private handleDocumentMouseMove(shift: number, event: MouseEvent | TouchEvent) {
    let posClick: number;
    if (this.config.vertical) {
      posClick = (event instanceof TouchEvent)
        ? event.targetTouches[0].clientY : event.clientY;
    } else {
      posClick = (event instanceof TouchEvent)
        ? event.targetTouches[0].clientX : event.clientX;
    }

    const position = this.getRelativePosition(posClick, shift);
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
    this.rightEdge = this.config.vertical
      ? this.slider.offsetHeight - this.runnerR.halfWidth * 2
      : this.slider.offsetWidth - this.runnerR.halfWidth * 2;
    this.updateView(this.config, true);
  }

  private updateOrientation(vertical: boolean) {
    this.track.setOrientation(vertical);
    this.bar.setOrientation(vertical);
    this.runnerR.setOrientation(vertical);
    this.tipR.setOrientation(vertical);
    if (this.config.double) {
      this.runnerL.setOrientation(vertical);
      this.tipL.setOrientation(vertical);
    }
  }
}

export default View;
