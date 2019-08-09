
import { API_HOST } from '../config'
export default class WS {

  constructor() {
    this.websocket = new WebSocket(API_HOST);
    this.timeout = 1000 * 60 * 9;
    this.serverTimeoutObj = null;
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
