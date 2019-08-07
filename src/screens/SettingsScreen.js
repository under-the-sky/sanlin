import React from 'react';
import {
  View,
  AsyncStorage,
  Text
} from 'react-native'
import { Avatar, ListItem, Card } from 'react-native-elements'
export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  static navigationOptions = (navigation) => {
    return {
      title: '个人'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }
  async componentWillMount() {
    const userInfo = JSON.parse(await AsyncStorage.getItem('userToken'))
    console.log(1, userInfo)
    this.setState({
      userInfo: userInfo
    })
  }
  render() {
    const { userInfo } = this.state
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      }
    ]
    console.log(2, userInfo)
    return (
      <View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} /> */}

          <Avatar
            containerStyle={{ paddingLeft: 10, paddingTop: 10 }}
            size="large"
            source={{
              uri:
                userInfo.avatar
            }}
            showEditButton
          />
          <Text style={{ height: 100, width: 100}}>{userInfo.nickname}</Text>
        </View>
        {/* {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider={true}
            />
          ))
        } */}
      </View>
    )
  }
}
