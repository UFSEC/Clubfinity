import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WillComponent} from '../components/WillComponent';
export default class DiscoverScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Discoverrr</Text>
        <WillComponent text='this is text from a prop'/>
      </View>
    );
  }
}
