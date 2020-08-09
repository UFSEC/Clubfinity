import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class NotGoingButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
  };

  _eventHandler = () => {
    const { clickHandler } = this.props;
    clickHandler();
  };

  render() {
    return (
      <FontAwesome.Button
        name="remove"
        backgroundColor="#ff8080"
        onPress={this._eventHandler}
      >
        Remove
      </FontAwesome.Button>
    );
  }
}
