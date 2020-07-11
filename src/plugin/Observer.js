class Observer {
  constructor() {
    this.observers = [];
  }

  addObserver(o) {
    if (typeof o !== 'function') {
      throw new Error('observer must be a function');
    }
    for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === o) {
        throw new Error('observer already in the list');
      }
    }
    this.observers.push(o);
  }

  removeObserver(o) {
    for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === o) {
        observers.splice(i, 1);
        return;
      }
    }
    throw new Error('could not find observer in list of observers');
  }

  notifyObservers(data) {
    let observersSnapshot = this.observers.slice(0);
    for (let i = 0, ilen = observersSnapshot.length; i < ilen; i += 1) {
      observersSnapshot[i](data);
    }
  }
}

export default Observer;