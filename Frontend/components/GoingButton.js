import React, { Component } from 'react';
import { Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class GoingButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  render() {
    if (this.state.isChecked) {
      return (
        <FontAwesome.Button
          name="check-square"
          backgroundColor="#55efc4"
          onPress={this._eventHandler}
        >
          Going
            </FontAwesome.Button>
      );
    }
    return (
      <FontAwesome.Button
        name="check-square-o"
        backgroundColor="#16a085"
        onPress={this._eventHandler}
      >
        Interested
            </FontAwesome.Button>
    );
  }

  _eventHandler = () => {
    this.props.clickHandler();
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
}

export { GoingButton };