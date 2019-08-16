import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Signup } from '../service/userAction';
import AsyncStorage from '@react-native-community/async-storage';
export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
  };

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      phone: '',
      password: ''
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/robot-prod.png')} />
        <Input
          placeholder='输入你的昵称'
          containerStyle={styles.inputStyle}
          inputStyle={styles.labelStyle}
          onChangeText={(text) => this.setState({ nickname: text })}
        />
        <Input
          placeholder='输入你的电话'
          containerStyle={styles.inputStyle}
          inputStyle={styles.labelStyle}
          onChangeText={(text) => this.setState({ phone: text })}
        />
        <Input
          placeholder='输入你的密码'
          secureTextEntry={true}
          containerStyle={styles.inputStyle}
          inputStyle={styles.labelStyle}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button buttonStyle={styles.btnStyle} title="注册" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const { nickname, phone, password } = this.state
    const result = await Signup(nickname, phone, password)
    if (result.user) {
      await AsyncStorage.setItem('userToken', JSON.stringify(result.user));
      this.props.navigation.navigate('Main');
    }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  btnStyle: {
    width: 350,
    marginTop: 20
  },
  inputStyle: {
    width: 400,
    margin: 20,
  },
  labelStyle: {
    paddingLeft: 15
  },
  imageStyle: {
    margin: 30,
  },
});