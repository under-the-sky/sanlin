import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { logout } from '../reducer/homeReducer';
class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  _signOutAsync = async () => {
    this.props.logoutFn()
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
        {/* <ExpoLinksView /> */}
        <Button title="Sign Out!" onPress={this._signOutAsync} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


export default connect(
  (state) => ({
    ws: state.home.ws
  }),
  (dispatch) => ({
    logoutFn: (ws) => dispatch(logout(ws)),
  })
)(LinksScreen)