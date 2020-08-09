import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import DiscoverGrid from '../components/DiscoverGrid';

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class DiscoverScr extends React.Component {
  static navigationOptions = {
    title: 'Discover',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <DiscoverGrid navigation={navigation} />
      </SafeAreaView>
    );
  }
}
