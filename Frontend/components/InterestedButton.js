import React, {Component} from 'react';
import {Ionicons} from '@expo/vector-icons'
import PropTypes from 'prop-types'

export default class InterestedButton extends Component {
    static propTypes = {
        clickHandler: PropTypes.func.isRequired,
        isInterested: PropTypes.bool.isRequired
    };
    
    render() {
        const {isInterested, clickHandler} = this.props
        return (
            <Ionicons.Button
              name={isInterested ? 'ios-star' : 'ios-star-outline'}
              backgroundColor= {isInterested ?  '#2b618c' : "#50adf9" }
              onPress = {clickHandler}
            >
              Interested
            </Ionicons.Button>
        )
    }
}