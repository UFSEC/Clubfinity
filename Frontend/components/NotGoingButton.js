import React, { Component } from 'react';
import { Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class NotGoingButton extends Component {

	render() {
		return (
			<FontAwesome.Button
				name="remove"
				backgroundColor="#ff8080"
				onPress={this._eventHandler}
			>Remove</FontAwesome.Button>);
	}

	_eventHandler = () => {
		this.props.clickHandler();
	}
}

export { NotGoingButton };