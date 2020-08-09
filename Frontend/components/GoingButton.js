import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class GoingButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  _eventHandler = () => {
    const { isChecked } = this.state;
    const { clickHandler } = this.props;

    clickHandler();
    this.setState({
      isChecked: !isChecked,
    });
  }

  render() {
    const { isChecked } = this.state;

    if (isChecked) {
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
}
