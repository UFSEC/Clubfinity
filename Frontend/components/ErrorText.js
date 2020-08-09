import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 10,
  },
});

export default class ErrorText extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <Text style={style.error}>{errorMessage}</Text>
    );
  }
}
