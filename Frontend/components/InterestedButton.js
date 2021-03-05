import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors from '../util/colors';

export default class InterestedButton extends Component {
    static propTypes = {
      clickHandler: PropTypes.func.isRequired,
      isInterested: PropTypes.bool.isRequired,
    };

    render() {
      const { isInterested, clickHandler } = this.props;
      return (
        <Ionicons.Button
          name={isInterested ? 'ios-star' : 'ios-star-outline'}
          backgroundColor={colors.info}
          onPress={clickHandler}
          style={isInterested
            ? { borderWidth: '4', borderColor: 'rgba(255, 255, 255, 0.6)' }
            : { borderWidth: '4', borderStyle: 'hidden', borderColor: 'transparent' }}
        >
          Interested
        </Ionicons.Button>
      );
    }
}
