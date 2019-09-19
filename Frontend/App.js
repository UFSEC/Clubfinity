import React, { Component } from 'react';
import {
  ActivityIndicator, View,
  Platform, StatusBar, StyleSheet,
} from 'react-native';
import AppNavigator from './navigation/TabNavigator';
import HomeScr from './screens/HomeScr';


export default class App extends Component {
  state = {
    isLoadingComplete: true,
  };

  render() {
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
          <AppNavigator />  
          {/* <HomeScr /> */}
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
