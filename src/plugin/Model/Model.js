import Observer from '../Observer/Observer.js';

class Model extends Observer {

  current;

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

    this.config[this.current] = Math.floor((max - min) * position + min);
    if (this.current === "to") {
      const leftEdge = double ? from : 0;
      this.config.to = (this.config.to > max) ? max : (this.config.to < leftEdge) ? leftEdge : this.config.to;
    }
    else {
      this.config.from = (this.config.from > to) ? to : (this.config.from < min) ? min : this.config.from;
    }
    this.notify("change");
  }

  setCurrent(position) {
    const {
      min,
      max,
      to,
      from,
      double
    } = this.config;

    if (!double) {
      this.current = "to";
      return;
    }

    const middle = (Math.abs((from - min) / (max - min)) + Math.abs((to - min) / (max - min))) / 2;
    this.current = (position > middle) ? "to" : "from";
  }
}

export default Model;