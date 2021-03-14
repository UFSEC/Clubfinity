import React from 'react';
import { Text, View } from 'react-native';

export default class EmailVerificationScr extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props;

    const userId = navigation.getParam('userId');
    const username = navigation.getParam('username');
    const password = navigation.getParam('password');

    return (
      <View>
        <Text>Hello, World!</Text>
        <Text>{userId}</Text>
        <Text>{username}</Text>
        <Text>{password}</Text>
      </View>
    );
  }
}
