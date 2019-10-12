import React from 'react';
import {
  AsyncStorage,
  View,
  Button,
  TextInput,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default class SigninScr extends React.Component {
  static navigationOptions = {
    title: 'Sign in',
  };

  _signIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput />
        <FontAwesome.Button
          name="sign-in"
          backgroundColor="#3254E9"
          onPress={this._signIn}
        >Login</FontAwesome.Button>
      </View>
    );
  }


}