class Callbacks {
  private start: HTMLElement;

  private change: HTMLElement;

  private finish: HTMLElement;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public signalStart = () => {
    this.start.style.background = '#73b9f2';
    setTimeout(() => { this.start.style.background = 'rgba(251, 229, 213, 0.5)'; }, 500);
  }

  public signalChange = () => {
    this.change.style.background = '#73b9f2';
    setTimeout(() => { this.change.style.background = 'rgba(251, 229, 213, 0.5)'; }, 500);
  }

  public signalFinish = () => {
    this.finish.style.background = '#73b9f2';
    setTimeout(() => { this.finish.style.background = 'rgba(251, 229, 213, 0.5)'; }, 500);
  }

  private init(parent: HTMLElement) {
    this.start = parent.querySelector('.js-start');
    this.change = parent.querySelector('.js-change');
    this.finish = parent.querySelector('.js-finish');
  }
}

export default Callbacks;
