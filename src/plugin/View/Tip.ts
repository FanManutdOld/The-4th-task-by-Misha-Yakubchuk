class Tip {
  private tip: HTMLElement;

  private width: number;

  constructor(slider: HTMLElement, scin: string, tipSide: string) {
    this.initHelp(slider, scin, tipSide);
  }

  public setValue(newValue: number) {
    this.tip.textContent = `${newValue}`;
    this.width = parseInt(getComputedStyle(this.tip).width);
  }

  public get Width(): number {
    return this.width;
  }

  public setZIndex() {
    this.tip.style.zIndex = '1';
  }

  public removeZIndex() {
    this.tip.style.zIndex = '0';
  }

  public setPos(pos: string) {
    this.tip.style.left = pos;
  }

  public hide() {
    this.tip.style.display = 'none';
  }

  private initHelp(slider: HTMLElement, scin: string, tipSide: string) {
    this.tip = document.createElement('div');
    this.tip.className = `slider__${tipSide} slider__${tipSide}_${scin}`;
    slider.append(this.tip);
  }
}

export default Tip;
