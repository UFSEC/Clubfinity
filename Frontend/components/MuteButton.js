import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors from '../util/colors';

export default class NotGoingButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
  };

  render() {
    const { isMuted, clickHandler } = this.props;
    return (
      <Ionicons.Button
        name={isMuted ? 'ios-close-circle' : 'ios-close-circle-outline'}
        backgroundColor={colors.error}
        onPress={clickHandler}
        style={isMuted ? { borderWidth: '4%', borderColor: 'rgba(255, 255, 255, 0.6)' } : { borderWidth: '4%', borderStyle: 'hidden', borderColor: 'transparent' }}
      >
        Mute
      </Ionicons.Button>
    );
  }
}
