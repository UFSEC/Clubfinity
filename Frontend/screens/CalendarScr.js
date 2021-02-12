import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateTime } from 'luxon';
import AgendaContainer from '../components/AgendaContainer';
import UserContext from '../util/UserContext';
import EventsApi from '../api/EventsApi';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';
import colors from '../util/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  calContainer: {
    flex: 3,
  },

  agendaContainer: {
    flex: 2,
    paddingHorizontal: 10,
    marginTop: 20,
  },

  agendaHeader: {
    fontSize: 22,
    color: '#7e947f',
  },
});

export default class CalendarScr extends React.Component {
  static contextType = UserContext;

  static navigationOptions = buildNavigationsOptions('Calendar')

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedDate: DateTime.local(),
    };
  }

  async componentDidMount() {
    const now = DateTime.local();
    const events = await this.fetchEvents(now.year, now.month);
    this.setState({
      events,
    });
  }

  fetchEvents = async (year, month) => {
    const bearerToken = await AsyncStorage.getItem('userToken');
    const date = DateTime.local(year, month);

    return EventsApi.getInMonth(bearerToken, date);
  }

  handleMonthChange = async (date) => {
    const events = await this.fetchEvents(date.year, date.month);

    this.setState({ events });
  };

  handleDayPress = (date) => {
    const selectedDate = DateTime.local(date.year, date.month, date.day);
    this.setState({
      selectedDate,
    });
  };

  render() {
    const { selectedDate, events } = this.state;
    const dates = { };
    events.forEach((event) => { dates[event.date.toISODate()] = { marked: true, dotColor: colors.primary0 }; });
    dates[selectedDate.toISODate()] = { selected: true, selectedColor: colors.primary0 };
    return (
      <View style={style.container}>
        <View style={style.calContainer}>
          <Calendar
            hideArrows={false}
            markedDates={dates}
            onDayPress={this.handleDayPress}
            onMonthChange={this.handleMonthChange}
            theme={{ arrowColor: colors.primary0 }}
          />
        </View>
        <AgendaContainer events={events} selectedDate={selectedDate} />
      </View>
    );
  }
}
