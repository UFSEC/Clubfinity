import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import colors from '../util/colors';

export default class AdminRow extends Component {
  static propTypes = {
    admin: PropTypes.shape({
      name: PropTypes.string,
      year: PropTypes.number,
      major: PropTypes.string,
      thumbnailUrl: PropTypes.string,
    }).isRequired,
    handler: PropTypes.func.isRequired,
  };

  static yearToString(year) {
    switch (year) {
      case 2024:
        return '1st Year';
      case 2023:
        return '2nd Year';
      case 2022:
        return '3rd Year';
      case 2021:
        return '4th Year';
      case 2020:
        return '5th Year';
      default:
        return `${year}th Year`;
    }
  }

  render() {
    const {
      admin: {
        name,
        year,
        major,
        thumbnailUrl,
      },
      handler,
    } = this.props;

    return (
      <TouchableOpacity
        style={{
          width: '100%',
          marginBottom: '3%',
        }}
        onPress={handler}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: colors.grayScale9,
            borderBottomWidth: 0.3,
            paddingBottom: '2%',
          }}
        >
          <Thumbnail source={{ uri: thumbnailUrl }} />
          <View
            style={{
              marginLeft: '3%',
            }}
          >
            <Text>{ name }</Text>
            <Text style={{ color: colors.grayScale9, fontSize: 14 }}>
              { AdminRow.yearToString(year) }
              &nbsp;&#183;&nbsp;
              { major }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
