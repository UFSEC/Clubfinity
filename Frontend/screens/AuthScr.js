import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import UserContext from '../util/UserContext';
import UserApi from '../api/UserApi';

export default class AuthScr extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    this.authRouter();
  }

  // Check for valid user token, if not route to auth else get user from API and route to App screens
  authRouter = async () => {
    const { setUser } = this.context;
    const bearerToken = await AsyncStorage.getItem('userToken');
    let routeName = 'Auth';
    if (bearerToken) {
      let authResponse = await UserApi.getUser(bearerToken);
      if (!authResponse.error && authResponse.data && authResponse.data.data) {
        setUser(authResponse.data.data);
        routeName = 'App';
      }
    }
    this.props.navigation.navigate(routeName);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}