class Tip {
  private tip: HTMLElement;

  private slider: HTMLElement;

  private scin: string;

  private tipSide: string;

  public halfWidth: number;

  public vertical: boolean;

  constructor(slider: HTMLElement, scin: string, tipSide: string) {
    this.slider = slider;
    this.initHelp(scin, tipSide);
  }

  public setValue(newValue: number | string) {
    this.tip.textContent = (typeof newValue === 'string') ? newValue : `${newValue}`;
    this.halfWidth = this.vertical
      ? parseInt(getComputedStyle(this.tip).height) / 2
      : parseInt(getComputedStyle(this.tip).width) / 2;
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

  public setPos(pos: number, shift: number) {
    if (this.vertical) {
      this.tip.style.bottom = `${((pos + shift - this.halfWidth) / this.slider.offsetHeight) * 100}%`;
    } else {
      this.tip.style.left = `${((pos + shift - this.halfWidth) / this.slider.offsetWidth) * 100}%`;
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
      ? `s__tip s__${this.tipSide}_${this.scin} s__${this.tipSide}_${this.scin}_ver`
      : `s__tip s__${this.tipSide}_${this.scin} s__${this.tipSide}_${this.scin}_hor`;
  }

  private initHelp(scin: string, tipSide: string) {
    this.tip = document.createElement('div');
    this.scin = scin;
    this.tipSide = tipSide;
    this.slider.append(this.tip);
  }
}

export default Tip;
