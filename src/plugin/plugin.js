class plugin {
  constructor(slider) {
    this.slider = slider;
    this.init();
  }

  init() {
    this.slider.style.position = "relative";
    this.min = 0;
    this.max = 1000;


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

    
    this.rightEdge = (this.slider.offsetWidth - this.runner.offsetWidth) / this.slider.offsetWidth * 100;
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

  calcPositions(runner, shiftX, event) {
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    let runnerPosition = (posX - shiftX - this.slider.getBoundingClientRect().left) / this.slider.offsetWidth * 100;

    if (runnerPosition < 0) {
      runnerPosition = 0;
    }
    if (runnerPosition > this.rightEdge) {
      runnerPosition = this.rightEdge;
    }

    let newValue = ((this.max - this.min) * runnerPosition / this.rightEdge) + this.min;
    this.setValue(newValue);

    let barPosition = runnerPosition + runner.offsetWidth / 2 / this.slider.offsetWidth * 100;
    let singlePosition = barPosition - this.single.offsetWidth / 2 / this.slider.offsetWidth * 100;
    return {runnerPosition, barPosition, singlePosition};
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

export default plugin;