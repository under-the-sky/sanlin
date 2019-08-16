const APP_ACTIVE = 'active'
const APP_BACKGROUND = 'background'
const APP_INACTIVE = 'inactive'

import { AppState } from 'react-native'
const initialState = {
  appState: AppState.currentState
}
export const appRuntime = (state = initialState, action) => {
  switch (action.type) {
    case APP_ACTIVE:
      return { appState: APP_ACTIVE }
    case APP_BACKGROUND:
      return { appState: APP_BACKGROUND }
    case APP_INACTIVE:
      return { appState: APP_INACTIVE }
    default:
      return state;
  }
}

export function appActive() {
  return { type: APP_ACTIVE }
}

export function appBackground() {
  return { type: APP_BACKGROUND }
}

export function appInactive() {
  return { type: APP_INACTIVE }
}

