class Callbacks {
  private start: HTMLElement;

  private change: HTMLElement;

  private finish: HTMLElement;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public signalStart = () => {
    this.start.classList.add('callbacks__callback_active');
    setTimeout(() => { this.start.classList.remove('callbacks__callback_active'); }, 500);
  }

  public signalChange = () => {
    this.change.classList.add('callbacks__callback_active');
    setTimeout(() => { this.change.classList.remove('callbacks__callback_active'); }, 500);
  }

  public signalFinish = () => {
    this.finish.classList.add('callbacks__callback_active');
    setTimeout(() => { this.finish.classList.remove('callbacks__callback_active'); }, 500);
  }

  private init(parent: HTMLElement) {
    this.start = parent.querySelector('.js-callbacks__callback[data-type="start"]');
    this.change = parent.querySelector('.js-callbacks__callback[data-type="change"]');
    this.finish = parent.querySelector('.js-callbacks__callback[data-type="finish"]');
  }
}

export default Callbacks;
