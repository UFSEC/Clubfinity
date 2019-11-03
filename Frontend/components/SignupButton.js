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

  _eventHandler = () => {
    this.props.clickHandler();
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,  
    maxWidth: 200,
    alignSelf: 'center'
  }
})