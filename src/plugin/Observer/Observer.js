class Observer {
  constructor() {
    this.observers = {};
  }

  add(eventType, callback) {
    if (typeof callback !== 'function') {
      throw new Error('observer must be a function');
    }
    if (this.observers[eventType] == undefined) {
      this.observers[eventType] = {};

      this.observers[eventType].isAddOnce = false;
      this.observers[eventType].data = [];
    }
    if (this.observers[eventType].data.includes(callback)) {
      throw new Error('observer already in the list');
    }
    this.observers[eventType].data.push(callback);
  }

  addOnce(eventType, callback) {
    this.add(eventType, callback);
    this.observers[eventType].isAddOnce = true;
  }

  remove(eventType, callback) {
    if (this.observers[eventType]) {
      if (this.observers[eventType].data.includes(callback)) {
        this.observers[eventType].data = this.observers[eventType].data.filter(observer => observer !== callback);
        if (this.observers[eventType].data.length == 0) {   //если наблюдателей больше нет, удаляем свойство из observers.
          delete this.observers[eventType];
        }
        return;
      }
      throw new Error('could not find callback in list of callbacks');
    }
    throw new Error('could not find observer in list of observers');
  }

  notify(eventType, data) {
    if (this.observers[eventType] == undefined || this.observers[eventType].data == undefined) {
      throw new Error('could not find callback or observer');
    }

    let that = this;

    // Make a copy of observer list in case the list
    // is mutated during the notifications.
    let observersTemp = this.observers[eventType].data.slice();
    observersTemp.forEach(observer => {
      if (that.observers[eventType].isAddOnce) {
        that.remove(eventType, that.observers[eventType].data[0]);
      }
      observer(data);
    });
  }
}

export default Observer;