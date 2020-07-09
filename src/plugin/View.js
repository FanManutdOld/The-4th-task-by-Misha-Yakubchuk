class View {
  constructor() {
    
  }

  initView() {
    this.slider.style.position = "relative";


    this.track = document.createElement("div");
    this.track.className = "slider__track slider__track_orange";
    this.track.addEventListener("mousedown", this.handleTrackMouseDown.bind(this));
    this.track.addEventListener("touchstart", this.handleTrackMouseDown.bind(this));

    this.bar = document.createElement("div");
    this.bar.className = "slider__bar slider__bar_orange";

    this.runner = document.createElement("div");
    this.runner.className = "slider__runner slider__runner_orange";
    this.runner.addEventListener("mousedown", this.handleRunnerMouseDown.bind(this));
    this.runner.addEventListener("touchstart", this.handleRunnerMouseDown.bind(this));
   

    this.single = document.createElement("div");
    this.single.className = "slider__single slider__single_orange";

    this.slider.appendChild(this.track);
    this.track.appendChild(this.bar);
    this.slider.appendChild(this.runner);
    this.slider.appendChild(this.single);
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
    this.refHandleDocumentMouseMove = this.handleDocumentMouseMove.bind(this, event.currentTarget, shiftX);
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

  handleDocumentMouseMove(runner, shiftX, event) {
    let positions = this.calcPositions(runner, shiftX, event);
    this.setPositions(runner, positions);
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