class Runner {
  constructor(slider, scin, runnerSide) {
    this.initRunner(slider, scin, runnerSide);
  }

  initRunner(slider, scin, runnerSide) {
    this.runner = document.createElement("div");
    this.runner.className = `slider__${runnerSide} slider__${runnerSide}_${scin}`;
    /* this.runner.addEventListener("mousedown", this.handleRunnerMouseDown.bind(this));
    this.runner.addEventListener("touchstart", this.handleRunnerMouseDown.bind(this)); */
    slider.appendChild(this.runner);
  }

  /* handleRunnerMouseDown(event) {
    event.preventDefault();
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    this.viewChangedSubject.notify("mouseDown", posX);
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    if (event.type == "mousedown") {
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
    if (event.type == "mouseup") {
      document.removeEventListener("mousemove", this.refHandleDocumentMouseMove);
      document.removeEventListener("mouseup", this.refHandleDocumentMouseUp);
    }
    else {
      document.removeEventListener("touchmove", this.refHandleDocumentMouseMove);
      document.removeEventListener("touchend", this.refHandleDocumentMouseUp);
    }
  } */

  getWidth() {
    return this.runner.offsetWidth;
  }

  setPos(pos) {
    this.runner.style.left = pos;
  }
}

export default Runner;