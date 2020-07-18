class Helper {
  constructor(observer) {
    this.viewChangedSubject = observer;
  }

  initHelp(slider, scin, currentValue) {
    this.help = document.createElement("div");
    this.help.className = "slider__helper slider__helper_" + scin;
    this.help.textContent = Math.floor(currentValue);
    slider.appendChild(this.help);
  }

  setValue(newValue) {
    const helpWidth = this.getWidth();
    this.help.textContent = Math.floor(newValue);
    if (helpWidth != this.getWidth()) {
      this.viewChangedSubject.notify("ChangeHelperWidth", this.help.offsetWidth);
    }
  }

  getWidth() {
    return this.help.offsetWidth;
  }

  setPosition(position) {
    this.help.style.left = position;
  }
}

export default Helper;