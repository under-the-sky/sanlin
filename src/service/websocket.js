
import { API_HOST } from '../config'
import NotifService from '../service/NotifService'
class WS {

  constructor() {
    this.websocket = new WebSocket(API_HOST);
    this.timeout = 1000 * 60 * 9;
    this.serverTimeoutObj = null;
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  onRegister(token) {
    console.log(token);
  }

  onNotif(notif) {
    console.log(notif);
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
        const msg = JSON.parse(e.data)[0]
        const data = {
          message: msg.text,
          title: 'sanlin'
        }
        this.notif.localNotif(data)
        this.notif.setBadge()
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