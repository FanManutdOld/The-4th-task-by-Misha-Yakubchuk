// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
import Track from './Track';
import Bar from './Bar';
import MinMax from './MinMax';
import Runner from './Runner';
import Tip from './Tip';
import Observer from '../Observer/Observer';

class View extends Observer {
  private config: IConfig;

  private slider: HTMLElement;

  private rightEdge: number;

  private track: Track;

  private bar: Bar;

  private minMax: MinMax;

  private runnerR: Runner;

  private tipR: Tip;

  private runnerL: Runner;

  private tipL: Tip;

  private refHandleDocumentMouseMove: EventListener;

  private refHandleDocumentMouseUp: EventListener;

  private connectedTips: boolean;

  constructor(parent: HTMLElement) {
    super();
    this.slider = document.createElement('div');
    parent.append(this.slider);
  }

  public initView(config: IConfig) {
    this.config = config;

    this.track = new Track(this.slider);
    this.bar = new Bar(this.slider);
    this.runnerR = new Runner(this.slider, 'runnerR');
    this.tipR = new Tip(this.slider, 'tipR');
    this.runnerL = new Runner(this.slider, 'runnerL');
    this.tipL = new Tip(this.slider, 'tipL');
    this.minMax = new MinMax(this.slider);

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
      tips,
      minMax,
    } = config;
    const isUpdateR: boolean = current === 'to' || isInit;
    const isUpdateL: boolean = (current === 'from' || isInit) && double;
    const isCheckTips: boolean = double && tips;

    if (isInit) {
      this.tipR.updateVisibility(tips);
      this.updateOrientation();
      this.updateRightEdge();
      if (double) {
        this.runnerL.append();
        this.tipL.append();
        if (!this.connectedTips) {
          this.tipL.updateVisibility(tips);
        }
        this.minMax.update(minMax, min, max, this.runnerR.halfWidth, this.runnerL.halfWidth);
      } else {
        this.runnerL.remove();
        this.tipL.remove();
        this.minMax.update(minMax, min, max, this.runnerR.halfWidth);
      }
    }
    if (isUpdateR) {
      if (!this.connectedTips) {
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
    if (isCheckTips) {
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
    if (this.connectedTips) {
      this.updateConnectedTips();
    } else {
      this.tipR.setPos(newPos, this.runnerR.halfWidth);
    }
  }

  private updateL(newPos: number) {
    this.runnerL.setPos(newPos);
    this.bar.setLeft(newPos, this.runnerL.halfWidth);
    if (this.connectedTips) {
      this.updateConnectedTips();
    }
    this.tipL.setPos(newPos, this.runnerL.halfWidth);
  }

  private checkConnectionTips() {
    if (!this.connectedTips) {
      if (this.tipR.isConnected(this.tipL)) {
        this.connectedTips = true;
        this.tipL.updateVisibility(false);
        this.updateConnectedTips();
      }
    } else if (this.connectedTips) {
      if (this.tipR.isDisconnected(this.tipL)) {
        this.connectedTips = false;
        this.tipL.updateVisibility(true);
        this.updateView(this.config, true);
      }
    }
  }

  private updateConnectedTips() {
    const {
      from,
      to,
    } = this.config;
    this.tipR.setValue(`${from}\u00A0—\u00A0${to}`);
    const rect = this.slider.getBoundingClientRect();
    const pos = this.config.vertical
      ? rect.bottom - this.bar.getCenter()
      : this.bar.getCenter() - rect.left;
    this.tipR.setUnitedPos(pos);
  }

  private handleSliderMouseDown = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    const { vertical } = this.config;
    let posClick: number; let shift: number; let position: number;
    const target: HTMLElement = event.target as HTMLElement;
    const isTrack: boolean = target.classList.contains('slider__track') || target.classList.contains('slider__bar');

    if (isTrack) {
      this.callOnStart();
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
    if (target.classList.contains('slider__runner')) {
      this.callOnStart();
      if (vertical) {
        posClick = (event instanceof TouchEvent)
          ? event.targetTouches[0].clientY : event.clientY;
      } else {
        posClick = (event instanceof TouchEvent)
          ? event.targetTouches[0].clientX : event.clientX;
      }

      shift = vertical
        ? target.getBoundingClientRect().bottom - posClick
        : posClick - target.getBoundingClientRect().left;
      position = this.getRelativePosition(posClick, shift);
      this.notify('mouseDown', position);
      this.bindDocumentMouseMove(event, shift);
    }
  }

  private getDefaultShiftX(posClick: number): number {
    const {
      double,
      vertical,
    } = this.config;

    if (!double) {
      return this.runnerR.halfWidth - 0.5;
    }
    const center = this.bar.getCenter();
    if (vertical) {
      return (posClick < center) ? this.runnerR.halfWidth - 0.5 : this.runnerL.halfWidth - 0.5;
    }
    return (posClick > center) ? this.runnerR.halfWidth - 0.5 : this.runnerL.halfWidth - 0.5;
  }

  private getRelativePosition(posClick: number, shift: number): number {
    const rect = this.slider.getBoundingClientRect();
    if (this.config.vertical) {
      return (rect.bottom - posClick - shift) / this.rightEdge;
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
    event.preventDefault();
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
    this.callOnFinish();
  }

  private handleWindowResize = () => {
    this.updateRightEdge();
    this.updateView(this.config, true);
  }

  private updateRightEdge() {
    this.rightEdge = this.config.vertical
      ? this.slider.offsetHeight - this.runnerR.halfWidth * 2
      : this.slider.offsetWidth - this.runnerR.halfWidth * 2;
  }

  private updateOrientation() {
    const {
      scin,
      vertical,
    } = this.config;

    this.slider.className = vertical
      ? `slider slider_${scin} slider_${scin}_ver`
      : `slider slider_${scin} slider_${scin}_hor`;
    this.bar.setOrientation(vertical);
    this.minMax.setOrientation(vertical);
    this.runnerR.setOrientation(vertical);
    this.tipR.setOrientation(vertical);
    if (this.config.double) {
      this.runnerL.setOrientation(vertical);
      this.tipL.setOrientation(vertical);
    }
  }

  private callOnStart() {
    if (this.config.onStart && typeof this.config.onStart === 'function') {
      this.config.onStart(this.config);
    }
  }

  private callOnFinish() {
    if (this.config.onFinish && typeof this.config.onFinish === 'function') {
      this.config.onFinish(this.config);
    }
  }
}

export default View;
