class Helper {
  constructor(slider, scin, value, helpSide) {
    this.initHelp(slider, scin, value, helpSide)
  }

  initHelp(slider, scin, value, helpSide) {
    this.help = document.createElement("div");
    this.help.className = `slider__${helpSide} slider__${helpSide}_${scin}`;
    this.help.textContent = value;
    slider.appendChild(this.help);
  }

  setValue(newValue) {
    const helpWidth = this.getWidth();
    this.help.textContent = Math.floor(newValue);
    if (helpWidth != this.getWidth()) {
      this.viewChangedSubject.notify("changeHelpWidth", this.help.offsetWidth);
    }
  }

  getWidth() {
    return this.help.offsetWidth;
  }

  setPos(pos) {
    this.help.style.left = pos;
  }
}

export default Helper;