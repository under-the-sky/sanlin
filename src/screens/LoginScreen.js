import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

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

  Login = (phone, password) => {
    return fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    })
      .then((res) => {
        if (res.status == 400) {
          throw new Error(400);
        }
        return res;
      })
      .then(res => res.json())
      .catch((error) => error)
  }

  _signInAsync = async () => {
    const { phone, password } = this.state
    const result = await this.Login(phone, password)
    if (result.user) {
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