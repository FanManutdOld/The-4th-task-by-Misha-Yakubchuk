class Track {
  constructor(observer) {
    this.viewChangedSubject = observer;
  }

  initTrack(slider, scin, runnerWidth) {
    this.track = document.createElement("div");
    this.track.className = "slider__track slider__track_" + scin;
    this.track.addEventListener("mousedown", this.handleTrackMouseDown.bind(this, runnerWidth));
    this.track.addEventListener("touchstart", this.handleTrackMouseDown.bind(this, runnerWidth));
    slider.appendChild(this.track);
  }

  handleTrackMouseDown(runnerWidth, event) {
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
}

export default Track;