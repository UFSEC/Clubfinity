import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import colors from '../util/colors';

export default class Row extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
  };

  render() {
    const { date, text, handler } = this.props;

    return (
      <TouchableOpacity
        style={{
          width: '100%',
          alignSelf: 'center',
          marginBottom: '5%',
        }}
        onPress={handler}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            borderBottomColor: colors.grayScale9,
            borderBottomWidth: 0.3,
          }}
        >
          <View style={{ marginRight: 'auto' }}>
            <Text>
              {date}
              {'    '}
              <Text style={{ fontWeight: 'bold' }}>{text}</Text>
            </Text>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            <Ionicons
              name="ios-arrow-forward"
              size={25}
              color={colors.grayScale8}
              style={{ paddingBottom: '1%' }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
