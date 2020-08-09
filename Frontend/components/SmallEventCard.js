import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { smCard } from '../assets/styles/stylesheet';

export default class SmallEventCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  };

  render() {
    const {
      name, date, time, location,
    } = this.props;
    return (
      <View style={smCard.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                paddingHorizontal: 0,
                marginTop: 10,
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              {name}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              {date}
            </Text>
            <View
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginStart: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingHorizontal: 0,
                }}
              >
                {time}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  paddingHorizontal: 10,
                }}
              >
                {location}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                marginStart: 10,
                marginTop: 5,
              }}
            >
              <Octicons name="chevron-right" size={24} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
