import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class DiscoverButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  render() {
    return (
      <MaterialIcons.Button
        borderRadius={50}
        backgroundColor="#7e947f"
        textAlign="center"
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.text}>Discover</Text>
      </MaterialIcons.Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    paddingLeft: 0
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: 'white'
  }
});
