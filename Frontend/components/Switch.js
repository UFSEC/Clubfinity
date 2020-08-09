import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

export default class Switch extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
  }

  handler = () => {
    const { toggled } = this.state;
    const { clickHandler } = this.props;
    clickHandler();
    this.setState({
      toggled: !toggled,
    });
  };

  render() {
    const { toggled } = this.state;

    if (toggled) {
      return (
        <FontAwesome.Button
          name="toggle-on"
          color="#16a085"
          backgroundColor="white"
          onPress={this.handler}
        />
      );
    }
    return (
      <FontAwesome.Button
        name="toggle-off"
        color="grey"
        backgroundColor="white"
        onPress={this.handler}
      />
    );
  }
}
