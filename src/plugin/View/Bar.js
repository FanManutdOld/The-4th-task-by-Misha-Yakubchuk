class Bar {
  constructor(observer) {
    this.viewChangedSubject = observer;
  }

  initBar(slider, scin) {
    this.bar = document.createElement("div");
    this.bar.className = "slider__bar slider__bar_" + scin;
    this.bar.addEventListener("mousedown", this.handleBarMouseDown.bind(this));
    this.bar.addEventListener("touchstart", this.handleBarMouseDown.bind(this));
    slider.appendChild(this.bar);
  }

  handleBarMouseDown(event) {
    event.preventDefault();
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    this.viewChangedSubject.notifyObservers("mouseDown", [posX]);
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    this.viewChangedSubject.notifyObservers("mouseMove", posX);
    if(event.type == "mousedown") {
      document.addEventListener("mousemove", this.refHandleDocumentMouseMove);
      document.addEventListener("mouseup", this.refHandleDocumentMouseUp);
    }
    else {
      document.addEventListener("touchmove", this.refHandleDocumentMouseMove);
      document.addEventListener("touchend", this.refHandleDocumentMouseUp);
    }
  }

  handleDocumentMouseMove(event) {
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    this.viewChangedSubject.notifyObservers("mouseMove", posX);
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