class Runner {
  constructor(observer, runner) {
    this.viewChangedSubject = observer;
    this.runner = runner;
  }

  initRunner(slider, scin) {
    this.runner = document.createElement("div");
    this.runner.className = `slider__${this.runner} slider__${this.runner}_ + ${scin}`;
    this.runner.addEventListener("mousedown", this.handleRunnerMouseDown.bind(this));
    this.runner.addEventListener("touchstart", this.handleRunnerMouseDown.bind(this));
    slider.appendChild(this.runner);
    return this.runner.offsetWidth;
  }

  handleRunnerMouseDown(event) {
    event.preventDefault();
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    let runnerLeft = event.currentTarget.getBoundingClientRect().left;
    this.viewChangedSubject.notifyObservers("mouseDown", [posX, runnerLeft]);
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
    this.viewChangedSubject.notifyObservers("mouseMove", this.runner, posX);
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
  }

  setPosition(position) {
    this.runner.style.left = position;
  }
}

export default Runner;