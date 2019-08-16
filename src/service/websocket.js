
import { API_HOST } from '../config'
import NotifService from '../service/NotifService'
class WS {

  constructor() {
    this.websocket = new WebSocket(API_HOST);
    this.timeout = 1000 * 60 * 3;
    this.serverTimeoutObj = null;
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    this.start()
  }

  onRegister(token) {
    console.log(token);
  }

  onNotif(notif) {
    console.log(notif);
  }

  onClose(fn) {
    this.websocket.onclose = (e) => {
      if (typeof fn === 'function') {
        fn(e)
      }
    }
  }
  close(e) {
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
        const msg = JSON.parse(e.data)[0]
        const data = {
          message: msg.text,
          title: 'sanlin'
        }
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
        this.websocket = new WebSocket(API_HOST);
      }
    }, this.timeout)
  }
}

export const ws = new WS()