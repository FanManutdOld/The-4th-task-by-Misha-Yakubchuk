class Bar {
  constructor(observer) {
    this.viewChangedSubject = observer;
  }

  initBar(slider, scin, runnerWidth) {
    this.bar = document.createElement("div");
    this.bar.className = "slider__bar slider__bar_" + scin;
    this.bar.addEventListener("mousedown", this.handleBarMouseDown.bind(this, runnerWidth));
    this.bar.addEventListener("touchstart", this.handleBarMouseDown.bind(this, runnerWidth));
    slider.appendChild(this.bar);
  }

  handleBarMouseDown(runnerWidth, event) {
    event.preventDefault();
    let shiftX = runnerWidth / 2 - 0.5;
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, shiftX);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    this.viewChangedSubject.notifyObservers("move", [posX, shiftX]);
    if(event.type == "mousedown") {
      document.addEventListener("mousemove", this.refHandleDocumentMouseMove);
      document.addEventListener("mouseup", this.refHandleDocumentMouseUp);
    }
    else {
      document.addEventListener("touchmove", this.refHandleDocumentMouseMove);
      document.addEventListener("touchend", this.refHandleDocumentMouseUp);
    }
  }

  handleDocumentMouseMove(shiftX, event) {
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    this.viewChangedSubject.notifyObservers("move", [posX, shiftX]);
  }

  handleDocumentMouseUp(event) {
    if(event.type == "mouseup") {
      document.removeEventListener("mousemove", this.refHandleDocumentMouseMove);
      document.removeEventListener("mouseup", this.refHandleDocumentMouseUp);
    }
    else {
      document.removeEventListener("touchmove", this.refHandleDocumentMouseMove);
      document.removeEventListener("touchend", this.refHandleDocumentMouseUp);
    }
  }

  setPosition(position) {
    this.bar.style.width = position;
  }
}

export default Bar;