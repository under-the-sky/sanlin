import React from 'react';
import { Platform, StyleSheet, View, Image, Alert } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { addMessage, addUser, addScoket } from '../reducer/homeReducer';
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
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

  componentDidMount() {
    if (this.props.ws.onOpen && this.props.ws.onMessage) {
      this.props.ws.onOpen(this.props.navigation.setParams({ title: '在线' }))
      this.props.ws.onMessage((e) => {
        const msg = JSON.parse(e.data)
        this.props.addMessageFn(msg[0])
      })
    }
  }

  async componentWillMount() {
    const userInfo = JSON.parse(await AsyncStorage.getItem('userToken'))
    const user = {
      _id: userInfo._id,
      name: userInfo.nickname,
      avatar: userInfo.avatar,
    };
    this.props.addUserFn(user);
  }

  onSend(messages = []) {
    this.props.ws.onSend(JSON.stringify(messages))
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
    const { user, messages } = this.props
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

export default connect(
  (state) => ({
    messages: state.home.messages,
    user: state.home.user,
    ws: state.home.ws
  }),
  (dispatch) => ({
    addUserFn: (user) => dispatch(addUser(user)),
    addMessageFn: (message) => dispatch(addMessage(message)),
  })
)(HomeScreen)