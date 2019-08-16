import React from 'react';
import { Platform, StyleSheet, View, Image, AppState } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';
import SlackMessage from './SlackMessage';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { addMessage, addUser, addScoket } from '../reducer/homeReducer';
import { appActive, appBackground, appInactive } from '../reducer/appReducer'
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
        if (this.props.appState !== 'active') {
          const notiOtpIOS = {
            message: msg[0].text,
            title: msg[0].user.name
          }
          this.props.ws.notif.localNotif(notiOtpIOS)
          this.props.ws.notif.setBadge()
        }
      })
      this.props.ws.onClose(e => {
        console.log('断开连接: ', e)
      })
    }
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
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

  _handleAppStateChange = (nextAppState) => {
    switch (nextAppState) {
      case 'active':
        this.props.ws.notif.setBadge(0)
        this.props.appActiveFn()
        return true;
      case 'inactive':
        this.props.appInactive()
        return true
      case 'background':
        this.props.appBackground()
        return true
      default:
        break
    }
  };


  onSend(messages = []) {
    this.props.addMessageFn(messages[0])
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
        keyboardShouldPersistTaps='never'
      // renderSend={this.renderSend}
      />
    );
  }
}

export default connect(
  (state) => ({
    messages: state.home.messages,
    user: state.home.user,
    ws: state.home.ws,
    appState: state.appRuntime.appState
  }),
  (dispatch) => ({
    addUserFn: (user) => dispatch(addUser(user)),
    addMessageFn: (message) => dispatch(addMessage(message)),
    appActiveFn: () => dispatch(appActive()),
    appBackground: () => dispatch(appBackground()),
    appInactive: () => dispatch(appInactive())
  })
)(HomeScreen)