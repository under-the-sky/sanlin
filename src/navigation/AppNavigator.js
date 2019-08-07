import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { AuthStack, tabNavigator } from './MainTabNavigator';

import AuthLoadingScreen from './AuthNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AuthStack,
    Main: tabNavigator,
    AuthLoading: AuthLoadingScreen
  },
    {
      initialRouteName: 'AuthLoading'
    },
  )
);
