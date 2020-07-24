class Help {
  private help: HTMLElement;

  private width: number;

  constructor(slider: HTMLElement, scin: string, helpSide: string) {
    this.initHelp(slider, scin, helpSide);
  }

  public setValue(newValue: number) {
    this.help.textContent = `${newValue}`;
    this.width = parseInt(getComputedStyle(this.help).width);
  }

  public get Width(): number {
    return this.width;
  }

  public setZIndex() {
    this.help.style.zIndex = '1';
  }

  public removeZIndex() {
    this.help.style.zIndex = '0';
  }

  public setPos(pos: string) {
    this.help.style.left = pos;
  }

  private initHelp(slider: HTMLElement, scin: string, helpSide: string) {
    this.help = document.createElement('div');
    this.help.className = `slider__${helpSide} slider__${helpSide}_${scin}`;
    slider.appendChild(this.help);
  }
}

export default Help;
