class Help {
  help: HTMLElement;

  constructor(slider: HTMLElement, scin: string, helpSide: string) {
    this.initHelp(slider, scin, helpSide);
  }

  initHelp(slider: HTMLElement, scin: string, helpSide: string) {
    this.help = document.createElement('div');
    this.help.className = `slider__${helpSide} slider__${helpSide}_${scin}`;
    slider.appendChild(this.help);
  }

  setValue(newValue: number) {
    this.help.textContent = `${newValue}`;
  }

  getWidth(): number {
    return parseInt(getComputedStyle(this.help).width);
  }

  setPos(pos: string) {
    this.help.style.left = pos;
  }
}

export default Help;
