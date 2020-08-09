import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: {
    width: 200,
    paddingLeft: 0,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
});

export default class DiscoverButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const { onPress } = this.props;

    return (
      <MaterialIcons.Button
        borderRadius={50}
        backgroundColor="#7e947f"
        textAlign="center"
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.text}>Discover</Text>
      </MaterialIcons.Button>
    );
  }
}
