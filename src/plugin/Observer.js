class Observer {
  constructor() {
    this.observers = {};
  }

  addObserver(eventType, callback) {
    if (typeof callback !== 'function') {
      throw new Error('observer must be a function');
    }
    if (this.observers[eventType] == undefined) {
      this.observers[eventType] = {};

      this.observers[eventType].isAddOnce = false;
      this.observers[eventType].data = [];
    }
    this.observers[eventType].data.push(callback);
    /* for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === callback) {
        throw new Error('observer already in the list');
      }
    }
    this.observers.push(o); */
  }

  addObserverOnce(eventType, callback) {
    this.addObserver(eventType, callback);
    this.observers[eventType].isAddOnce = true;
  }

  removeObserver(eventType, callback) {
    if (this.observers[eventType]) {
      if(this.observers[eventType].data.includes(callback)) {
        this.observers[eventType].data = this.observers[eventType].data.filter(observer => observer !== callback);
        return;
      }
      throw new Error('could not find callback in list of callbacks');
    }
    throw new Error('could not find observer in list of observers');
    /* for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
      let observer = this.observers[i];
      if (observer === callback) {
        observers.splice(i, 1);
        return;
      }
    } */
  }

  notifyObservers(eventType, data) {
    if (this.observers[eventType] == undefined || this.observers[eventType].data == undefined) {
			throw new Error('could not find callback or observer')
		}

		let itObj = this;		

		this.observers[eventType].data.forEach(observer => {
			if(itObj.observers[eventType].isAddOnce) {
				itObj.off(e, itObj.observers[eventType].data[0]);
			}	
			observer(data);
		});
    /* for (let i = 0, ilen = observersSnapshot.length; i < ilen; i += 1) {
      observersSnapshot[i](data);
    } */
  }
}

export default Observer;