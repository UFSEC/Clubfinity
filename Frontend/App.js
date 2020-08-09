import React, { Component } from 'react';
import {
  ActivityIndicator, View,
  Platform, StatusBar, StyleSheet,
} from 'react-native';

import AppNavigator from './navigation/TabNavigator';
import UserContext from './util/UserContext';

console.disableYellowBox = true; // This is to switch off warning

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: true,
      user: null,
    };
  }

  setUser = (newUser) => {
    this.setState({
      user: newUser,
    });
  }

  render() {
    const { user, isLoadingComplete } = this.state;
    const { setUser } = this;
    if (!isLoadingComplete) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
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
