import home from './homeReducer'
import { combineReducers } from 'redux';
const appReducers = combineReducers({ home });
export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducers(state, action)
}