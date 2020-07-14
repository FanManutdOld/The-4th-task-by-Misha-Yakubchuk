class Helper {
  constructor(observer) {
    this.viewChangedSubject = observer;
  }

  initHelper(slider, scin, currentValue) {
    this.helper = document.createElement("div");
    this.helper.className = "slider__helper slider__helper_" + scin;
    this.helper.textContent = Math.floor(currentValue);
    slider.appendChild(this.helper);
  }

  setValue(newValue) {
    const helperWidth = this.helper.offsetWidth;
    console.log(this.helper.offsetWidth);
    this.helper.textContent = Math.floor(newValue);
    if (helperWidth != this.helper.offsetWidth) {
      this.viewChangedSubject.notifyObservers("helperWidth", this.helper.offsetWidth);
    }
  }

  getWidth() {
    return this.helper.offsetWidth;
  }

  setPosition(position) {
    this.helper.style.left = position;
  }
}

export default Helper;