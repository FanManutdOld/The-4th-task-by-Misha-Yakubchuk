class Bar {
  constructor(observer) {
    this.viewChangedSubject = observer;
  }

  initBar(slider, scin) {
    this.bar = document.createElement("div");
    this.bar.className = "slider__bar slider__bar_" + scin;
    this.bar.style.left = 0 + "%";
    this.bar.addEventListener("mousedown", this.handleBarMouseDown.bind(this));
    this.bar.addEventListener("touchstart", this.handleBarMouseDown.bind(this));
    slider.appendChild(this.bar);
  }

  handleBarMouseDown(event) {
    event.preventDefault();
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    this.viewChangedSubject.notify("mouseDown", posX);
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    this.viewChangedSubject.notify("mouseMove", posX);
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
    this.viewChangedSubject.notify("mouseMove", posX);
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

  setLeft(value) {
    this.bar.style.left = value;
  }

  setRight(value) {
    this.bar.style.right = value;
  }
}

export default Bar;