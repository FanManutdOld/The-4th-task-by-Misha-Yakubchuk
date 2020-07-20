import Observer from '../Observer/Observer.js';

class Model extends Observer {
  constructor(userConfig) {
    super();
    this.config = {
      min: 0,
      max: 1000,
      to: 700,
      from: 500,
      double: false,
      scin: "orange",
    };
    this.updateConfig(userConfig);
  }

  getConfig() {
    return this.config;
  }

  updateConfig(newConfig) {
    for (let [key, value] of Object.entries(newConfig)) {
      if (!(key in this.config)) {
        throw new Error("Invalid user property - " + key);
      }
      this.config[key] = value;
    }
  }

  calcValue(position) {
    let {
      min,
      max,
      to,
      from,
      double
    } = this.config;

    const current = this.getCurrent(position);
    this.config[current] = Math.floor((max - min) * position + min);
    if (current === "to") {
      const leftEdge = double ? from : 0;
      this.config.to = (this.config.to > max) ? max : (this.config.to < leftEdge) ? leftEdge : this.config.to;
    }
    else {
      this.config.from = (this.config.from > to) ? to : (this.config.from < 0) ? 0 : this.config.from;
    }
    this.notify("change");
  }

  getCurrent(position) {
    const {
      min,
      max,
      to,
      from,
      double
    } = this.config;

    if (!double) {
      return "to";
    }

    const middle = (Math.abs(from / (max - min)) + Math.abs(to / (max - min))) / 2;
    return (position > middle) ? "to" : "from";
  }

  updateSliderSizes({ sliderPosLeft, sliderRightEdge }) {
    this.slider.posLeft = sliderPosLeft;
    this.slider.rightEdge = sliderRightEdge;
    this.initPositions();
  }
}

export default Model;