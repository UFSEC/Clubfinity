import React from 'react';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import AgendaCard from './AgendaCard';

const style = StyleSheet.create({
  agendaContainer: {
    marginTop: 20,
    flex: 2,
    paddingHorizontal: 10,
  },

  agendaSubheading: {
    marginTop: 10,
  },
});

export default class AgendaContainer extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedDate: PropTypes.object.isRequired,
  }

  // Determine Events to display based on selected date
  getEventsForSelectedDate = () => {
    const { events, selectedDate } = this.props;
    return events.filter((e) => this.dateIsEqual(e.date, selectedDate));
  }

  dateIsEqual = (first, second) => first.year === second.year
           && first.month === second.month
           && first.day === second.day

  render() {
    const selectedEvents = this.getEventsForSelectedDate();

    return (
      <View style={style.agendaContainer}>
        {(selectedEvents.length !== 0
                    && <Text style={style.agendaSubheading}>Events happening today</Text>)
                    || <Text style={style.agendaSubheading}>Sorry! No Events today</Text>}
        <FlatList
          data={selectedEvents}
          keyExtractor={(event) => event._id.toString()}
          renderItem={({ item }) => (
            <AgendaCard
              clubName={item.club.name}
              eventName={item.name}
              location={item.location}
              date={item.date}
            />
          )}
        />
      </View>
    );
  }
}
