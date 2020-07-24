// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';
import Observer from '../Observer/Observer';

class Model extends Observer {
  private config: IConfig;

  constructor(userConfig: any) {
    super();
    this.config = {
      min: 0,
      max: 1000,
      to: 700,
      from: 500,
      double: false,
      scin: 'orange',
      current: 'to',
    };
    this.updateConfig(userConfig);
  }

  public getConfig(): IConfig {
    return this.config;
  }

  public setCurrent(position: number) {
    const {
      min,
      max,
      to,
      from,
      double,
    } = this.config;

    if (!double) {
      this.config.current = 'to';
      return;
    }

    const middle = (Math.abs((from - min) / (max - min)) + Math.abs((to - min) / (max - min))) / 2;
    this.config.current = (position >= middle) ? 'to' : 'from';
    this.notify('changeCurrent', this.config.current);
  }

  public calcValue(position: number) {
    const {
      min,
      max,
      to,
      from,
      double,
      current,
    } = this.config;

    this.config[current] = Math.floor((max - min) * position + min);
    if (current === 'to') {
      const leftEdge = double ? from : 0;
      this.config.to = (this.config.to > max) ? max
        : (this.config.to < leftEdge) ? leftEdge : this.config.to;
    } else {
      this.config.from = (this.config.from > to) ? to
        : (this.config.from < min) ? min : this.config.from;
    }
    this.notify('change');
  }

  private updateConfig(newConfig: any) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(newConfig)) {
      if (!(key in this.config)) {
        throw new Error(`Invalid user property - ${key}`);
      }
      this.config[key] = value;
    }
  }
}

export default Model;
