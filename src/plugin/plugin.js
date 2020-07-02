class plugin {
  constructor(slider) {
    this.slider = slider;
    this.init();
  }

  init() {
    this.slider.style.position = "relative";
    this.min = 200;
    this.max = 500;


    this.track = document.createElement("div");
    this.track.className = "slider__track slider__track_orange";

    this.bar = document.createElement("div");
    this.bar.className = "slider__bar slider__bar_orange";

    this.runner = document.createElement("div");
    this.runner.className = "slider__runner slider__runner_orange";
    //runner.onmousedown = function(event) { event.}
    this.runner.addEventListener("mousedown", this.handleRunnerMouseDown.bind(this));
    this.runner.addEventListener("touchstart", this.handleRunnerMouseDown.bind(this));
    this.runner.ondragstart = function () {
      return false;
    };

    this.single = document.createElement("div");
    this.single.className = "slider__single slider__single_orange";

    this.slider.appendChild(this.track);
    this.slider.appendChild(this.bar);
    this.slider.appendChild(this.runner);
    this.slider.appendChild(this.single);

    
    this.rightEdge = (this.slider.offsetWidth - this.runner.offsetWidth) / this.slider.offsetWidth * 100;
  }

  handleRunnerMouseDown(event) {
    event.preventDefault();
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    let shiftX = posX - event.currentTarget.getBoundingClientRect().left;
    //ссылки на eventListener, что бы удалить эти же eventListener
    this.refHandleRunnerMouseMove = this.handleRunnerMouseMove.bind(this, event.currentTarget, shiftX);
    this.refHandleRunnerMouseUp = this.handleRunnerMouseUp.bind(this);
    if(event.type == "mousedown") {
      document.addEventListener("mousemove", this.refHandleRunnerMouseMove);
      document.addEventListener("mouseup", this.refHandleRunnerMouseUp);
    }
    else {
      document.addEventListener("touchmove", this.refHandleRunnerMouseMove);
      document.addEventListener("touchend", this.refHandleRunnerMouseUp);
    }
    console.log("click");
  }

  handleRunnerMouseMove(runner, shiftX, event) {
    let positions = this.calcPositions(runner, shiftX, event);

    let newValue = ((this.max - this.min) * positions.runnerPosition / this.rightEdge) + this.min;

    this.setPositions(runner, positions);
    this.setValue(newValue);

  }

  handleRunnerMouseUp(event) {
    if(event.type == "mouseup") {
      document.removeEventListener("mousemove", this.refHandleRunnerMouseMove);
      document.removeEventListener("mouseup", this.refHandleRunnerMouseUp);
    }
    else {
      document.removeEventListener("touchmove", this.refHandleRunnerMouseMove);
      document.removeEventListener("touchend", this.refHandleRunnerMouseUp);
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