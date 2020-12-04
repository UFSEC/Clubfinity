import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class NotGoingButton extends Component {
  
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    isMuted : PropTypes.bool.isRequired
  };

  render() {
    const {isMuted, clickHandler} = this.props
    return (
      <Ionicons.Button
        name= {isMuted ? 'ios-close-circle' : 'ios-close-circle-outline' }
        backgroundColor= { isMuted ? '#ab3a3a' : "#ff8080" } 
        onPress={clickHandler}
      >
        Mute
      </Ionicons.Button>
    );
  }
}
