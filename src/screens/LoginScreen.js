import React from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Login } from '../service';
import AsyncStorage from '@react-native-community/async-storage';
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='输入你的电话'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onChangeText={(text) => this.setState({ phone: text })}
        />
        <Input
          placeholder='输入你的密码'
          secureTextEntry={true}
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const { phone, password } = this.state
    const result = await Login(phone, password)
    if (result.user) {
      console.log(result.user)
      await AsyncStorage.setItem('userToken', JSON.stringify(result.user));
      this.props.navigation.navigate('Main');
    }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});