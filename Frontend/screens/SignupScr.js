import React from 'react';
import {
  AsyncStorage,
  Text,
  View,
} from 'react-native';

export default class SignupScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Sign Up</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      </View>
    );
  }
}
