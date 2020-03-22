import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

class FollowButton extends Component {

  /* State for changing button*/
  constructor(props) {
      super(props);
      this.state = {
          isChecked: false
      };
  }

  /* Handles when the button is clicked, changing the state*/
  _eventHandler = () => {
    this.props.clickHandler();
    this.setState({
        isChecked: !this.state.isChecked
    });
  }

  /* Renders the "Follow" and "Following" buttons
    changing the text and background color, etc. */

    render(){
      if(this.state.isChecked) {
        return(
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
