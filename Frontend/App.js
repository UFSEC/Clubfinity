import React, { Component, useContext } from 'react';
import {
  ActivityIndicator, View,
  Platform, StatusBar, StyleSheet,
} from 'react-native';

import AppNavigator from './navigation/TabNavigator';
import UserContext from './util/UserContext';
console.disableYellowBox = true; // This is to switch off warning

export default class App extends Component {
  state = {
    isLoadingComplete: true,
    user: {
      firstName: "Null",
      "lastName": "User"
    },
  };

  setUser = (newUser) => {
    this.setState({
      user: newUser
    });
  }

  render() {
    const user = this.state.user;
    const setUser = this.setUser;
    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <UserContext.Provider value={{ user, setUser }}>
            <AppNavigator />
          </UserContext.Provider>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
