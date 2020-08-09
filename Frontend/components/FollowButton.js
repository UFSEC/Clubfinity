import React, { Component } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class FollowButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
  }

  /* State for changing button */
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  /* Handles when the button is clicked, changing the state */
  _eventHandler = () => {
    const { isChecked } = this.state;
    const { clickHandler } = this.props;

    clickHandler();
    this.setState({
      isChecked: !isChecked,
    });
  }

  /* Renders the "Follow" and "Following" buttons
    changing the text and background color, etc. */

  render() {
    const { isChecked } = this.state;

    if (isChecked) {
      return (
        <SimpleLineIcons.Button
          name="user-following"
          backgroundColor="#2ba7ff"
          onPress={this._eventHandler}
        >
          Following
        </SimpleLineIcons.Button>
      );
    }
    return (
      <SimpleLineIcons.Button
        name="user-follow"
        backgroundColor="#75b7e6"
        onPress={this._eventHandler}
      >
        Follow
      </SimpleLineIcons.Button>
    );
  }
}

export default FollowButton;
