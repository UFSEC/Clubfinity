import React, { Component } from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NotGoingButton extends Component {

	render() {
		return (
			<Icon.Button
				name="remove"
				backgroundColor="#ff8080"
				onPress={this._eventHandler}
			>Remove</Icon.Button>);
	}

	_eventHandler = () => {
		this.props.clickHandler();
	}
}

export { NotGoingButton };