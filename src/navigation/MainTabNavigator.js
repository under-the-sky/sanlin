import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

// import TabBarIcon from '../components/TabBarIcon';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import FriendScreen from '../screens/FriendScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

export const AuthStack = createStackNavigator({ Login: LoginScreen });

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  }
);
HomeStack.navigationOptions = {
  tabBarLabel: '当前',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='message1'
      size={24}
      color='black' />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: FriendScreen,
  },
);

LinksStack.navigationOptions = {
  tabBarLabel: '朋友',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='team'
      size={24}
      color='black' />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
);

SettingsStack.navigationOptions = {
  tabBarLabel: '个人',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='solution1'
      size={24}
      color='black' />
  ),
};

SettingsStack.path = '';

export const tabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Link: LinksStack,
  Setting: SettingsStack,
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerRight: (
        <Button title="+1" color="#fff" />
      ),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

tabNavigator.path = '';

