import { MySliderConfig, CurrentRunner } from '../types';
import Track from './Track';
import Bar from './Bar';
import Runner from './Runner';
import Observer from '../../Observer/Observer';

class View extends Observer {
  private config: MySliderConfig;

  private slider: HTMLElement;

  private rightEdge: number;

  private track: Track;

  private bar: Bar;

  private runnerRight: Runner;

  private runnerLeft: Runner;

  private handleDocumentMouseMoveWithShift: EventListener;

  private connectedTips: boolean;

  constructor(parent: HTMLElement, config: MySliderConfig) {
    super();
    this.slider = document.createElement('div');
    parent.append(this.slider);
    this.initView(config);
  }

  public updateView(config: MySliderConfig, isInit?: boolean) {
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
    const isUpdateRight: boolean = current === CurrentRunner.TO || isInit;
    const isUpdateLeft: boolean = (current === CurrentRunner.FROM || isInit) && isDouble;
    const isCheckTips: boolean = isDouble && hasTips;

    if (isInit) {
      this.rebuild();
    }
    if (isUpdateRight) {
      const newPos = (this.rightEdge * (to - min)) / (max - min);
      this.updateRight(newPos);
    }
    if (isUpdateLeft) {
      const newPos = (this.rightEdge * (from - min)) / (max - min);
      this.updateLeft(newPos);
    }
    if (isCheckTips) {
      this.checkConnectionTips();
    }
  }

  public updateZIndex(current: string) {
    if (current === CurrentRunner.TO) {
      this.runnerRight.setZIndex();
    } else {
      this.runnerRight.removeZIndex();
    }
  }

  private initView(config: MySliderConfig) {
    this.track = new Track(this.slider);
    this.bar = new Bar(this.slider);
    this.runnerRight = new Runner(this.slider, 'right');
    this.runnerLeft = new Runner(this.slider, 'left');

    this.updateView(config, true);
    this.slider.addEventListener('mousedown', this.handleSliderMouseDown);
    this.slider.addEventListener('touchstart', this.handleSliderMouseDown, { passive: false });
    window.addEventListener('resize', this.handleWindowResize);
  }

  private rebuild() {
    const { hasTips, isDouble } = this.config;
    this.connectedTips = false;
    this.runnerRight.updateTipVisibility(hasTips);
    this.updateOrientation();
    this.updateRightEdge();
    if (isDouble) {
      this.runnerLeft.append();
      if (!this.connectedTips) {
        this.runnerLeft.updateTipVisibility(hasTips);
      }
      this.track.update(this.config, this.runnerRight.halfWidth, this.runnerLeft.halfWidth);
    } else {
      this.runnerLeft.remove();
      this.track.update(this.config, this.runnerRight.halfWidth);
    }
  }

  private updateRight(newPos: number) {
    this.runnerRight.setPos(newPos);
    this.bar.setRight(newPos, this.runnerRight.halfWidth);
    if (this.connectedTips) {
      this.updateConnectedTips();
    } else {
      this.runnerRight.updateTip(newPos, this.config.to);
    }
  }

  private updateLeft(newPos: number) {
    this.runnerLeft.setPos(newPos);
    this.bar.setLeft(newPos, this.runnerLeft.halfWidth);
    if (this.connectedTips) {
      this.updateConnectedTips();
    }
    this.runnerLeft.updateTip(newPos, this.config.from);
  }

  private checkConnectionTips() {
    const rectTipL = this.runnerLeft.getTipRect();
    if (!this.connectedTips) {
      if (this.runnerRight.isConnectedTips(rectTipL)) {
        this.connectedTips = true;
        this.runnerLeft.updateTipVisibility(false);
        this.updateConnectedTips();
      }
    } else if (this.connectedTips) {
      if (this.runnerRight.isDisconnectedTips(rectTipL)) {
        this.connectedTips = false;
        this.runnerLeft.updateTipVisibility(true);
        const { to, min, max } = this.config;
        const newPos = (this.rightEdge * (to - min)) / (max - min);
        this.updateRight(newPos);
      }
    }
  }

  private updateConnectedTips() {
    const rect = this.slider.getBoundingClientRect();
    const pos = this.config.isVertical
      ? rect.bottom - this.bar.getCenter()
      : this.bar.getCenter() - rect.left;

    const { from, to } = this.config;
    this.runnerRight.updateTip(pos, `${from}\u00A0—\u00A0${to}`, true);
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
      return this.runnerRight.halfWidth;
    }
    const center = this.bar.getCenter();
    if (isVertical) {
      return (posClick < center) ? this.runnerRight.halfWidth : this.runnerLeft.halfWidth;
    }
    return (posClick > center) ? this.runnerRight.halfWidth : this.runnerLeft.halfWidth;
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
    this.handleDocumentMouseMoveWithShift = this.handleDocumentMouseMove.bind(this, shift);

    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.handleDocumentMouseMoveWithShift);
      document.addEventListener('mouseup', this.handleDocumentMouseUp);
    } else {
      document.addEventListener('touchmove', this.handleDocumentMouseMoveWithShift, { passive: false });
      document.addEventListener('touchend', this.handleDocumentMouseUp);
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
      document.removeEventListener('mousemove', this.handleDocumentMouseMoveWithShift);
      document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    } else {
      document.removeEventListener('touchmove', this.handleDocumentMouseMoveWithShift);
      document.removeEventListener('touchend', this.handleDocumentMouseUp);
    }
    this.callOnFinish();
  }

  private handleWindowResize = () => {
    this.updateView(this.config, true);
  }

  private updateRightEdge() {
    this.rightEdge = this.config.isVertical
      ? this.slider.offsetHeight - this.runnerRight.halfWidth * 2
      : this.slider.offsetWidth - this.runnerRight.halfWidth * 2;
  }

  private updateOrientation() {
    const { skin, isVertical, isDouble } = this.config;

    this.slider.className = isVertical
      ? `slider slider_skin_${skin} slider_orientation_vertical`
      : `slider slider_skin_${skin} slider_orientation_horizontal`;
    this.bar.setOrientation(isVertical);
    this.track.setOrientation(isVertical);
    this.runnerRight.setOrientation(isVertical);
    if (isDouble) {
      this.runnerLeft.setOrientation(isVertical);
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
