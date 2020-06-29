class plugin {
  constructor(slider) {
    this.slider = slider;
    this.init();
  }

  init() {
    this.slider.style.backgroundColor = "rgba(21,69,225,0.05)";
    this.slider.style.position = "relative";
    this.min = 200;
    this.max = 500;


    this.track = document.createElement("div");
    this.track.classList.add("slider__track");
    this.slider.appendChild(this.track);

    this.runner = document.createElement("div");
    this.runner.classList.add("slider__runner");
    //runner.onmousedown = function(event) { event.}
    this.runner.addEventListener("mousedown", this.handleRunnerMouseDown.bind(this));
    this.runner.addEventListener("touchstart", this.handleRunnerMouseDown.bind(this));
    this.runner.ondragstart = function () {
      return false;
    };
    this.slider.appendChild(this.runner);

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
    let posX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    let newPosition = (posX - shiftX - this.slider.getBoundingClientRect().left) / this.slider.offsetWidth * 100;

    if (newPosition < 0) {
      newPosition = 0;
    }
    let rightEdge = (this.slider.offsetWidth - runner.offsetWidth) / this.slider.offsetWidth * 100;
    if (newPosition > rightEdge) {
      newPosition = rightEdge;
    }

    let newValue = ((this.max - this.min) * newPosition / rightEdge) + this.min;

    //newPosition = newPosition / this.item.offsetWidth * 100;
    this.setPosition(runner, newPosition);
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

  setPosition(runner, newPosition) {
    runner.style.left = newPosition + "%";
    this.track.style.background = `linear-gradient(to right, rgba(206, 80, 80, 0.5) ${newPosition + 1}%, rgba(18,243,100,0.5) ${newPosition + 1}%)`;
  }

  setValue(newValue) {
    console.log(Math.floor(newValue));
  }
}

export default plugin;