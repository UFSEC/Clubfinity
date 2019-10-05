import React, { Component } from 'react';
import { Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Switch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
    }

    render() {
        if (this.state.toggled) {
            return (
                <FontAwesome.Button
                    name="toggle-on"
                    color="#16a085"
                    backgroundColor="white"
                    onPress={this._eventHandler}
                />
            );
        }
        return (
            <FontAwesome.Button
                name="toggle-off"
                color="grey"
                backgroundColor="white"
                onPress={this._eventHandler}
            />
		);
    }

    _eventHandler = () => {
        this.props.clickHandler();
        this.setState({
            toggled: !this.state.toggled
        });
    }
}

export { Switch };