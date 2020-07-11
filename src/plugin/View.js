class View {
  constructor(observer) {
    this.viewInitSubject = new observer();
    this.viewChangedSubject = new observer();
  }

  initView(scin, slider, currentValue) {
    slider.style.position = "relative";


    this.track = document.createElement("div");
    this.track.className = "slider__track slider__track_" + scin;
    this.track.addEventListener("mousedown", this.handleTrackMouseDown.bind(this));
    this.track.addEventListener("touchstart", this.handleTrackMouseDown.bind(this));

    this.bar = document.createElement("div");
    this.bar.className = "slider__bar slider__bar_" + scin;

    this.runner = document.createElement("div");
    this.runner.className = "slider__runner slider__runner_" + scin;
    this.runner.addEventListener("mousedown", this.handleRunnerMouseDown.bind(this));
    this.runner.addEventListener("touchstart", this.handleRunnerMouseDown.bind(this));
   

    this.single = document.createElement("div");
    this.single.className = "slider__single slider__single_" + scin;

    this.track.appendChild(this.bar);
    slider.appendChild(this.track);
    slider.appendChild(this.runner);
    slider.appendChild(this.single);
    this.setValue(currentValue);
    this.viewInitSubject.notifyObservers([this.runner.offsetWidth, this.single.offsetWidth]);
  }

  handleTrackMouseDown(event) {
    event.preventDefault();
    let shiftX = this.runner.offsetWidth / 2;
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, this.runner, shiftX);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    let positions = this.calcPositions(this.runner, shiftX, event);
    this.setPositions(this.runner, positions);
    if(event.type == "mousedown") {
      document.addEventListener("mousemove", this.refHandleDocumentMouseMove);
      document.addEventListener("mouseup", this.refHandleDocumentMouseUp);
    }
    else {
      document.addEventListener("touchmove", this.refHandleDocumentMouseMove);
      document.addEventListener("touchend", this.refHandleDocumentMouseUp);
    }
  }

  handleRunnerMouseDown(event) {
    event.preventDefault();
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    let shiftX = posX - event.currentTarget.getBoundingClientRect().left;
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, shiftX);
    this.refHandleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
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
    this.viewChangedSubject.notifyObservers([posX, shiftX]);
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
  
  setPositions(runner, positions) {
    runner.style.left = positions.runnerPosition + "%";
    this.bar.style.width = positions.barPosition + "%";
    this.single.style.left = positions.singlePosition + "%";
  }

  setValue(newValue) {
    this.single.textContent = Math.floor(newValue);
  }
}

export default View;