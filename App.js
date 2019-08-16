/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import configureStore from './src/store/store';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App;
