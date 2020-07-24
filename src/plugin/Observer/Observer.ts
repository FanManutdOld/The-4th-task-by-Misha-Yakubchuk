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

  public addObce(eventType: string, callback: Function) {
    this.add(eventType, callback);
    this.observers[eventType].isAddOnce = true;
  }

  public remove(eventType: string, callback: Function) {
    if (this.observers[eventType]) {
      if (this.observers[eventType].data.includes(callback)) {
        this.observers[eventType].data = this.observers[eventType]
          .data.filter((observer) => observer !== callback);
        // если наблюдателей больше нет, удаляем свойство из observers.
        if (this.observers[eventType].data.length === 0) {
          delete this.observers[eventType];
        }
        return;
      }
      throw new Error('could not find callback in list of callbacks');
    }
    throw new Error('could not find observer in list of observers');
  }

  protected notify(eventType: string, data?: any) {
    if (this.observers[eventType] === undefined || this.observers[eventType].data === undefined) {
      throw new Error('could not find callback or observer');
    }

    const that = this;

    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    const observersTemp = this.observers[eventType].data.slice();
    observersTemp.forEach((observer: Function) => {
      if (that.observers[eventType].isAddOnce) {
        that.remove(eventType, that.observers[eventType].data[0]);
      }
      observer(data);
    });
  }
}

export default Observer;