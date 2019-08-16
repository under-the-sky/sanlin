import { home } from './homeReducer'
import { appRuntime } from './appReducer'
import { combineReducers } from 'redux';
const appReducers = combineReducers({ home, appRuntime });
export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducers(state, action)
}