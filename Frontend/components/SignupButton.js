import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class SignupButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
  }

  _eventHandler = () => {
    const { clickHandler } = this.props;
    clickHandler();
  }

  render() {
    return (
      <MaterialIcons.Button
        name="person-add"
        size={25}

        backgroundColor="#0C85FC"
        onPress={this._eventHandler}
      >
        Sign Up
      </MaterialIcons.Button>
    );
  }
}
