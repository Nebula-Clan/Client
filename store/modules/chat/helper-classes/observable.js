
class Observable {
    constructor() {
      this.handlers = [];
    }

    subscribe(h) {
      this.handlers.push(h);
    }

    unsubscribe(h) {
      this.handlers = this.handlers.filter(subscriber => subscriber !== h);
    }

    notify(data) {
      this.handlers.forEach(handler => handler.handleEvent(data));
    }
  }

exports.Observable = Observable