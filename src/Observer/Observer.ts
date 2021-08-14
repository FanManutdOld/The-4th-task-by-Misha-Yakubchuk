class Observer {
  private observers: {
    [key: string]: {
      data?: Function[]
    }
  };

  constructor() {
    this.observers = {};
  }

  public add(eventType: string, callback: Function) {
    if (this.observers[eventType] === undefined) {
      this.observers[eventType] = {};
      this.observers[eventType].data = [];
    }
    if (this.observers[eventType].data.includes(callback)) {
      throw new Error('observer already in the list');
    }
    this.observers[eventType].data.push(callback);
  }

  protected notify(eventType: string, data?: any) {
    if (this.observers[eventType] === undefined || this.observers[eventType].data === undefined) {
      console.warn('could not find callback or observer');
      return;
    }

    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    const observersTemp = this.observers[eventType].data.slice();

    observersTemp.forEach((observer: Function) => {
      observer(data);
    });
  }
}

export default Observer;
