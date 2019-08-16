
const ADD_Message = 'add message';
const ADD_User = 'add user';
const ADD_Websocket = 'add websocket';
const Close_Websocket = 'close websocket';
const LOGIN_OUT = 'USER_LOGOUT'
import { ws } from '../service/websocket'
const initialState = {
  messages: [],
  user: {},
  ws: ws
}

export const home = (state = initialState, action) => {
  switch (action.type) {
    case ADD_Message:
      const msg = JSON.parse(JSON.stringify(state.messages))
      msg.unshift(action.message);
      return {
        ...state,
        messages: msg
      };
    case ADD_User:
      return {
        ...state,
        user: action.user
      };
    case ADD_Websocket:
      return {
        ...state,
        ws: action.ws
      }
    case Close_Websocket:
      action.ws.close();
      return {
        ...state,
        ws: action.ws
      }
    default:
      return state;
  }
}
export function logout() {
  return { type: LOGIN_OUT }
}
export function addScoket(ws) {
  return { type: ADD_Websocket, ws }
}

export function closeScoket(ws) {
  return { type: Close_Websocket, ws }
}
export function addUser(user) {
  return { type: ADD_User, user }
}
export function addMessage(message) {
  return { type: ADD_Message, message }
}