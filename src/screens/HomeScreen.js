import React from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import AsyncStorage from '@react-native-community/async-storage';
import WS from '../service/websocket';
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.ws = new WS()
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.getParam('title', '离线'),
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  state = {
    messages: [],
  }

  componentDidMount() {
    this.ws.websocket.close = (e) => {
      this.props.navigation.setParams({ title: '离线' })
    }
    this.ws.websocket.onopen = (e) => {
      this.props.navigation.setParams({ title: '在线' })
      this.ws.reset().start();
    }
    this.ws.websocket.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg),
      }))
    }
  }

  async UNSAFE_componentWillMount() {
    const userInfo = JSON.parse(await AsyncStorage.getItem('userToken'))
    const user = {
      _id: userInfo._id,
      name: userInfo.nickname,
      avatar: userInfo.avatar,
    };
    this.setState({
      messages: [],
      user
    })
  }

  onSend(messages = []) {
    console.log(2)
    this.ws.websocket.send(JSON.stringify(messages))
    console.log(3)
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  renderMessage(props) {
    const { currentMessage: { text: currText } } = props;
    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  renderSend(props) {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Image source={require('../../assets/images/robot-prod.png')} resizeMode={'center'} />
        </View>
      </Send>
    );
  }

  render() {
    const { user, messages } = this.state
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={user}
        renderMessage={this.renderMessage}
      // renderSend={this.renderSend}
      />
    );
  }
}