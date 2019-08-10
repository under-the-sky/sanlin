
import { API_HOST } from '../config'
class WS {

  constructor() {
    this.websocket = new WebSocket(API_HOST);
    this.timeout = 1000 * 60 * 9;
    this.serverTimeoutObj = null;
  }

  onClose(e) {
    this.websocket.close(e)
  }

  onOpen(fn) {
    this.websocket.onopen = (e) => {
      if (typeof fn === 'function') {
        fn(e);
      }
    }
  }

  onMessage(fn) {
    this.websocket.onmessage = (e) => {
      if (typeof fn === 'function') {
        fn(e);
      }
    }
  }

  onSend(message) {
    this.websocket.send(message)
  }

  reset() {
    clearInterval(this.serverTimeoutObj);
    return this;
  }

  start() {
    this.serverTimeoutObj = setInterval(() => {
      if (this.websocket.readyState == 1) {
        this.reset().start();
      } else {
        new WS();
      }
    }, this.timeout)
  }
}

export const ws = new WS()