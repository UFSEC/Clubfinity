import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';



import DiscoverGrid from '../components/DiscoverGrid';

export default class DiscoverScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <DiscoverGrid />
        {/* <Text>Discover Screen</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});