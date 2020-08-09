import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

import * as Font from 'expo-font';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import Ionicons from 'native-base/Fonts/Ionicons.ttf';
import UserContext from './util/UserContext';
import AppNavigator from './navigation/TabNavigator';

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
      isLoadingComplete: false,
      user: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto,
      RobotoMedium,
      Ionicons,
      ...Ionicons.font,
    });
    this.setState({ isLoadingComplete: true });
  }

  setUser = (newUser) => {
    this.setState({
      user: newUser,
    });
  };

  render() {
    const { user, isLoadingComplete } = this.state;
    const { setUser } = this;
    if (!isLoadingComplete) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
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
