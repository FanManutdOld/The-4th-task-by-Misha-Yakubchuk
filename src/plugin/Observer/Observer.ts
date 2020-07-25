class Observer {
  private observers;

  constructor() {
    this.observers = {};
  }

  public add(eventType: string, callback: Function) {
    if (this.observers[eventType] === undefined) {
      this.observers[eventType] = {};
      this.observers[eventType].isAddOnce = false;
      this.observers[eventType].data = [];
    }
    if (this.observers[eventType].data.includes(callback)) {
      throw new Error('observer already in the list');
    }
    this.observers[eventType].data.push(callback);
  }

  protected notify(eventType: string, data?: any) {
    if (this.observers[eventType] === undefined || this.observers[eventType].data === undefined) {
      throw new Error('could not find callback or observer');
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
