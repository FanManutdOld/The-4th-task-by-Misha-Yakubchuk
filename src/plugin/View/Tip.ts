class Tip {
  private tip: HTMLElement;

  private scin: string;

  private tipSide: string;

  public halfWidth: number;

  public vertical: boolean;

  constructor(slider: HTMLElement, scin: string, tipSide: string) {
    this.initHelp(slider, scin, tipSide);
  }

  public setValue(newValue: number | string) {
    this.tip.textContent = (typeof newValue === 'string') ? newValue : `${newValue}`;
    this.halfWidth = this.vertical
      ? parseInt(getComputedStyle(this.tip).width) / 2
      : parseInt(getComputedStyle(this.tip).height) / 2;
  }

  public get posLeft(): number {
    return this.vertical
      ? this.tip.getBoundingClientRect().bottom
      : this.tip.getBoundingClientRect().left;
  }

  public get posRight(): number {
    return this.vertical
      ? this.tip.getBoundingClientRect().top
      : this.tip.getBoundingClientRect().right;
  }

  public setPos(pos: string) {
    if (this.vertical) {
      this.tip.style.bottom = pos;
    } else {
      this.tip.style.left = pos;
    }
  }

  public hide() {
    this.tip.style.visibility = 'hidden';
  }

  public show() {
    this.tip.style.visibility = 'visible';
  }

  public setOrientation(vertical: boolean) {
    this.vertical = vertical;
    this.tip.className = vertical
      ? `slider__${this.tipSide} slider__${this.tipSide}_${this.scin}_vertical`
      : `slider__${this.tipSide} slider__${this.tipSide}_${this.scin}_horizontal`;
  }

  private initHelp(slider: HTMLElement, scin: string, tipSide: string) {
    this.tip = document.createElement('div');
    this.scin = scin;
    this.tipSide = tipSide;
    slider.append(this.tip);
  }
}

export default Tip;
