import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors from '../util/colors';

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
        backgroundColor={colors.success}
        onPress={clickHandler}
        style={isGoing
          ? { borderWidth: 4, borderColor: 'rgba(255, 255, 255, 0.6)' }
          : { borderWidth: 4, borderStyle: 'hidden', borderColor: 'transparent' }}
      >
        Going
      </Ionicons.Button>
    );
  }
}
