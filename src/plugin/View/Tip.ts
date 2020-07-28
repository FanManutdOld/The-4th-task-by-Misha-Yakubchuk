class Tip {
  private tip: HTMLElement;

  public halfWidth: number;

  constructor(slider: HTMLElement, scin: string, tipSide: string) {
    this.initHelp(slider, scin, tipSide);
  }

  public setValue(newValue: number | string) {
    this.tip.textContent = (typeof newValue === 'string') ? newValue : `${newValue}`;
    this.halfWidth = parseInt(getComputedStyle(this.tip).width) / 2;
  }

  public get posLeft(): number {
    return this.tip.getBoundingClientRect().left;
  }

  public get posRight(): number {
    return this.tip.getBoundingClientRect().right;
  }

  public setPos(pos: string) {
    this.tip.style.left = pos;
  }

  public hide() {
    this.tip.style.visibility = 'hidden';
  }

  public show() {
    this.tip.style.visibility = 'visible';
  }

  private initHelp(slider: HTMLElement, scin: string, tipSide: string) {
    this.tip = document.createElement('div');
    this.tip.className = `slider__${tipSide} slider__${tipSide}_${scin}`;
    slider.append(this.tip);
  }
}

export default Tip;
