import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import colors from '../util/colors';

const styles = StyleSheet.create({
  button: {
    width: 200,
    alignSelf: 'center',
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
      <Button
        borderRadius={50}
        backgroundColor={colors.secondary0}
        textAlign="center"
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.text}>Discover Clubs</Text>
      </Button>
    );
  }
}
