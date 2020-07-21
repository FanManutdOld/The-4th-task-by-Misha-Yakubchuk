class Helper {
  constructor(slider, scin, helpSide) {
    this.initHelp(slider, scin, helpSide)
  }

  initHelp(slider, scin,helpSide) {
    this.help = document.createElement("div");
    this.help.className = `slider__${helpSide} slider__${helpSide}_${scin}`;
    slider.appendChild(this.help);
  }

  setValue(newValue) {
    this.help.textContent = newValue;
  }

  getWidth() {
    return parseInt(getComputedStyle(this.help).width);
  }

  setPos(pos) {
    this.help.style.left = pos;
  }
}

export default Helper;