import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, Button, Overlay, Text } from 'react-native-elements';
import { Login } from '../service/userAction';
import AsyncStorage from '@react-native-community/async-storage';
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      isVisible: false
    }
    this.weChatLogin = this.weChatLogin.bind(this)
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/robot-prod.png')} />
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
        <Button buttonStyle={styles.btnStyle} title="登录" onPress={this._signInAsync} />
        <View style={styles.tipStyle}>
          <Text style={{ color: 'gray' }} onPress={() => { this.setState({ isVisible: true }) }}>忘记密码?</Text>
          <Text style={{ color: '#2185d8' }} onPress={this.signup}>注册账号</Text>
        </View>
        <View style={styles.footStyle}>
          <View><Text>其他登录方式</Text></View>
          <View style={{ margin: 20 }}><Icon name='wechat' size={24} color='#2185d8' onPress={this.weChatLogin} /></View>
          <View style={{ backgroundColor: '#eaeaea', paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15 }}><Text style={{ fontSize: 10, color: 'gray' }}>三林·来自吃货单杠双硕孤魂读书群</Text></View>
        </View>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          // windowBackgroundColor="rgba(255, 255, 255, .5)"
          // overlayBackgroundColor="red"
          width={150}
          height={50}
        >
          <Text>该功能还未上线</Text>
        </Overlay>
      </View>
    );
  }

  signup = () => {
    this.props.navigation.push('signup')
  }

  weChatLogin() {
    this.setState({
      isVisible: true
    })
  }
  _signInAsync = async () => {
    const { phone, password } = this.state
    const result = await Login(phone, password)
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
  tipStyle: {
    height: 50,
    marginTop: 20,
    width: 350,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }
});