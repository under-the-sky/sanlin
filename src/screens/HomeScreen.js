import React from 'react';
import { Platform, StyleSheet, AsyncStorage, View, Image } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import { API_HOST } from '../config'

import Icon from 'react-native-vector-icons/FontAwesome';
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.ws = new WebSocket(API_HOST)
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    // console.log(navigation.getParam('title'))
    return {
      title: navigation.getParam('title', '离线'),
      // tabBarLabel: '当前',
      // tabBarIcon: ({ focused }) => (
      //   <Icon
      //     name='address-card'
      //     color='black' />
      // )
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
    this.ws.onopen = (e) => {
      this.props.navigation.setParams({ title: '在线' })
    }
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      // const { messages } = this.state
      // messages.push(msg[0])
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
  // function sendMessage() {
  //   ws.send(document.getElementById('text').value);
  // }
  onSend(messages = []) {
    // this.ws.send()
    console.log(2, messages)
    this.ws.send(JSON.stringify(messages))
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