import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class GoingButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    isGoing: PropTypes.bool.isRequired,
  };

  render() {
    const { isGoing, clickHandler } = this.props;
    return (
      <Ionicons.Button
        name={isGoing ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'}
        backgroundColor={isGoing ? '#0d5e4e' : '#16a085'}
        onPress={clickHandler}
      >
        Going
      </Ionicons.Button>
    );
  }
}
