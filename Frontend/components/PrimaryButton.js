import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../util/colors';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: colors.primary0,
    borderRadius: 8,
    minHeight: 42,
    elevation: 3,
  },
  text: {
    fontSize: 15,
    alignSelf: 'center',
    color: colors.grayScale0,
  },
});

export default class PrimaryButton extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    const { text, onPress } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
