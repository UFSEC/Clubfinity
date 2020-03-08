import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class SignupButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  render() {
    return (
      <MaterialIcons.Button size={25} backgroundColor="#D4D4D4" onPress={this._eventHandler}>
        Discover
      </MaterialIcons.Button>
    );
  }

  _eventHandler = () => {
    // TODO
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: 200,
    alignSelf: 'center'
  }
})
