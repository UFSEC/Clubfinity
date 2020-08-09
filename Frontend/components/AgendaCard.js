import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { card } from '../assets/styles/stylesheet';

const style = StyleSheet.create({
  title: {
    fontWeight: '500',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center',
    maxHeight: 65,
    margin: 0,
  },

  mainSection: {
    flex: 4,
  },

  subSection: {
    flex: 2,
    alignContent: 'flex-end',
  },
});

export default class AgendaCard extends Component {
  static propTypes = {
    clubName: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    date: PropTypes.object.isRequired,
  }

  render() {
    const {
      clubName, eventName, location, date,
    } = this.props;
    return (
      <View style={[card.container, style.container]}>
        <View style={style.mainSection}>
          <Text style={style.title}>{eventName}</Text>
          <Text style={card.bodyText}>{clubName}</Text>
        </View>
        <View style={style.subSection}>
          <Text style={card.agendaText}>{date.toLocaleString()}</Text>
          <Text style={card.agendaText}>{location}</Text>
        </View>

      </View>
    );
  }
}
