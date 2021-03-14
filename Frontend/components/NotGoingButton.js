import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors from '../util/colors';

export default class NotGoingButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    notGoing: PropTypes.bool.isRequired,
  };

  render() {
    const { notGoing, clickHandler } = this.props;
    return (
      <Ionicons.Button
        name={notGoing ? 'ios-close-circle' : 'ios-close-circle-outline'}
        backgroundColor={colors.error}
        onPress={clickHandler}
        style={notGoing
          ? { borderWidth: 4, borderColor: 'rgba(255, 255, 255, 0.6)', paddingLeft: 15 }
          : { borderWidth: 4, borderColor: 'transparent', paddingLeft: 15 }}
      />
    );
  }
}
