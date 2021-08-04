import IConfig from '../IConfig';
import Track from './Track';
import Bar from './Bar';
import Runner from './Runner';
import Observer from '../Observer/Observer';
import CurrentRunner from '../ECurrentRunner';

class View extends Observer {
  private config: IConfig;

  private slider: HTMLElement;

  private rightEdge: number;

  private track: Track;

  private bar: Bar;

  private runnerR: Runner;

  private runnerL: Runner;

  private refHandleDocumentMouseMove: EventListener;

  private refHandleDocumentMouseUp: (event: MouseEvent | TouchEvent) => void;

  private connectedTips: boolean;

  constructor(parent: HTMLElement) {
    super();
    this.slider = document.createElement('div');
    parent.append(this.slider);
  }

  public initView(config: IConfig) {
    this.track = new Track(this.slider);
    this.bar = new Bar(this.slider);
    this.runnerR = new Runner(this.slider, 'runnerR');
    this.runnerL = new Runner(this.slider, 'runnerL');

    this.updateView(config, true);
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.addEventListener('touchstart', this.handleSliderMouseDown, { passive: false });
    window.addEventListener('resize', this.handleWindowResize);
  }

  public updateView(config: IConfig, isInit?: boolean) {
    this.config = config;
    const {
      min,
      max,
      from,
      to,
      isDouble,
      current,
      hasTips,
    } = this.config;
    const isUpdateR: boolean = current === CurrentRunner.TO || isInit;
    const isUpdateL: boolean = (current === CurrentRunner.FROM || isInit) && isDouble;
    const isCheckTips: boolean = isDouble && hasTips;

    if (isInit) {
      this.rebuild();
    }
    let newPos: number;
    if (isUpdateR) {
      newPos = (this.rightEdge * (to - min)) / (max - min);
      this.updateR(newPos);
    }
    if (isUpdateL) {
      newPos = (this.rightEdge * (from - min)) / (max - min);
      this.updateL(newPos);
    }
    if (isCheckTips) {
      this.checkConnectionTips();
    }
  }

  public updateZIndex(current: string) {
    if (current === CurrentRunner.TO) {
      this.runnerR.setZIndex();
    } else {
      this.runnerR.removeZIndex();
    }
  }

  private rebuild() {
    const { hasTips, isDouble } = this.config;
    this.connectedTips = false;
    this.runnerR.updateTipVisibility(hasTips);
    this.updateOrientation();
    this.updateRightEdge();
    if (isDouble) {
      this.runnerL.append();
      if (!this.connectedTips) {
        this.runnerL.updateTipVisibility(hasTips);
      }
      this.track.update(this.config, this.runnerR.halfWidth, this.runnerL.halfWidth);
    } else {
      this.runnerL.remove();
      this.track.update(this.config, this.runnerR.halfWidth);
    }
  }

  private updateR(newPos: number) {
    this.runnerR.setPos(newPos);
    this.bar.setRight(newPos, this.runnerR.halfWidth);
    if (this.connectedTips) {
      this.updateConnectedTips();
    } else {
      this.runnerR.updateTip(newPos, this.config.to);
    }
  }

  private updateL(newPos: number) {
    this.runnerL.setPos(newPos);
    this.bar.setLeft(newPos, this.runnerL.halfWidth);
    if (this.connectedTips) {
      this.updateConnectedTips();
    }
    this.runnerL.updateTip(newPos, this.config.from);
  }

  private checkConnectionTips() {
    const rectTipL = this.runnerL.getTipRect();
    if (!this.connectedTips) {
      if (this.runnerR.isConnectedTips(rectTipL)) {
        this.connectedTips = true;
        this.runnerL.updateTipVisibility(false);
        this.updateConnectedTips();
      }
    } else if (this.connectedTips) {
      if (this.runnerR.isDisconnectedTips(rectTipL)) {
        this.connectedTips = false;
        this.runnerL.updateTipVisibility(true);
        const { to, min, max } = this.config;
        const newPos = (this.rightEdge * (to - min)) / (max - min);
        this.updateR(newPos);
      }
    }
  }

  private updateConnectedTips() {
    const rect = this.slider.getBoundingClientRect();
    const pos = this.config.isVertical
      ? rect.bottom - this.bar.getCenter()
      : this.bar.getCenter() - rect.left;

    const { from, to } = this.config;
    this.runnerR.updateTip(pos, `${from}\u00A0—\u00A0${to}`, true);
  }

  private handleSliderMouseDown = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    const isClickOrTouch = (event as MouseEvent).button === 0 || event instanceof TouchEvent;
    if (!isClickOrTouch) return;

    const target: HTMLElement = event.target as HTMLElement;
    const isCorrect: boolean = target.classList.contains('slider__track')
      || target.classList.contains('slider__bar')
      || Boolean(target.closest('.slider__scale'))
      || target.classList.contains('slider__runner');
    if (!isCorrect) return;

    this.callOnStart();
    const posClick = this.getPosClick(event);
    const shift = this.calcShift(target, posClick);
    const position: number = this.getRelativePosition(posClick, shift);
    const isScaleValue: boolean = target.classList.contains('slider__scale-value');
    if (isScaleValue) {
      this.notify('mouseDown', position);
      this.notify('setValue', Number(target.textContent));
    } else {
      this.notifyMouseDown(target, position);
    }
    this.bindDocumentMouseMove(event, shift);
  }

  private getPosClick(event: MouseEvent | TouchEvent) {
    if (this.config.isVertical) {
      return event instanceof MouseEvent ? event.clientY : event.targetTouches[0].clientY;
    }
    return event instanceof MouseEvent ? event.clientX : event.targetTouches[0].clientX;
  }

  private calcShift(target: HTMLElement, posClick: number) {
    let shift: number;
    if (target.classList.contains('slider__runner')) {
      shift = this.config.isVertical
        ? target.getBoundingClientRect().bottom - posClick
        : posClick - target.getBoundingClientRect().left;
    } else {
      shift = this.getDefaultShift(posClick);
    }
    return shift;
  }

  private getDefaultShift(posClick: number): number {
    const { isDouble, isVertical } = this.config;

    if (!isDouble) {
      return this.runnerR.halfWidth;
    }
    const center = this.bar.getCenter();
    if (isVertical) {
      return (posClick < center) ? this.runnerR.halfWidth : this.runnerL.halfWidth;
    }
    return (posClick > center) ? this.runnerR.halfWidth : this.runnerL.halfWidth;
  }

  private getRelativePosition(posClick: number, shift: number): number {
    const rect = this.slider.getBoundingClientRect();
    if (this.config.isVertical) {
      return (rect.bottom - posClick - shift) / this.rightEdge;
    }
    return (posClick - shift - rect.left) / this.rightEdge;
  }

  private notifyMouseDown(target: HTMLElement, position: number) {
    this.notify('mouseDown', position);
    if (!target.classList.contains('slider__runner')) {
      this.notify('changePosition', position);
    }
  }

  private bindDocumentMouseMove(event: MouseEvent | TouchEvent, shift: number) {
    // ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, shift);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp;

    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.refHandleDocumentMouseMove);
      document.addEventListener('mouseup', this.refHandleDocumentMouseUp);
    } else {
      document.addEventListener('touchmove', this.refHandleDocumentMouseMove, { passive: false });
      document.addEventListener('touchend', this.refHandleDocumentMouseUp);
    }
  }

  private handleDocumentMouseMove(shift: number, event: MouseEvent | TouchEvent) {
    event.preventDefault();
    const posClick = this.getPosClick(event);
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
    this.updateView(this.config, true);
  }

  private updateRightEdge() {
    this.rightEdge = this.config.isVertical
      ? this.slider.offsetHeight - this.runnerR.halfWidth * 2
      : this.slider.offsetWidth - this.runnerR.halfWidth * 2;
  }

  private updateOrientation() {
    const { scin, isVertical, isDouble } = this.config;

    this.slider.className = isVertical
      ? `slider slider_${scin} slider_${scin}_ver`
      : `slider slider_${scin} slider_${scin}_hor`;
    this.bar.setOrientation(isVertical);
    this.track.setOrientation(isVertical);
    this.runnerR.setOrientation(isVertical);
    if (isDouble) {
      this.runnerL.setOrientation(isVertical);
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
