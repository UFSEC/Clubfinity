import React, { Component } from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <Icon.Button
                    name="check-square"
                    backgroundColor="#55efc4"
                    onPress={this._eventHandler}
                >
                    Going
            </Icon.Button>
            );
        }
        return (
            <Icon.Button
                    name="check-square-o"
                    backgroundColor="#16a085"
                    onPress={this._eventHandler}
                >
                    Interested
            </Icon.Button>
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