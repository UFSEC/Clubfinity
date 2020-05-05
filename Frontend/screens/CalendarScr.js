import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateTime } from 'luxon'
import AgendaContainer from '../components/AgendaContainer';
import UserContext from '../util/UserContext';
import EventsApi from '../api/EventsApi';

export default class CalendarScr extends React.Component {

  static contextType = UserContext;

  static navigationOptions = {
    title: 'Calendar',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedDate: DateTime.local()
    };
  }

  async componentDidMount() {
    const now = DateTime.local();
    const events = await this.fetchEvents(now.year, now.month);
    this.setState({
      events
    })
  }

  async fetchEvents(year, month) {
    const bearerToken = await AsyncStorage.getItem('userToken');
    const date = DateTime.local(year, month);

    return EventsApi.getInMonth(bearerToken, date);
  }

  handleMonthChange = async date => {
    const events = await this.fetchEvents(date.year, date.month);

    this.setState({ events });
  };

  handleDayPress = date => {
    const selectedDate = DateTime.local(date.year, date.month, date.day);
    this.setState({
      selectedDate
    });
  };

  render() {
    const { user } = this.context;
    return (
      <View style={style.container}>
        <View style={style.calContainer}>
          <Calendar
            hideArrows={false}
            markedDates={{ [this.state.selectedDate.toISODate()]: { selected: true } }}
            onDayPress={this.handleDayPress.bind(this)}
            onMonthChange={this.handleMonthChange}
          />
        </View>

        <AgendaContainer events={this.state.events} selectedDate={this.state.selectedDate} />

      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // paddingHorizontal: 10,
  },

  calContainer: {
    flex: 3,

  },

  agendaContainer: {
    flex: 2,
    paddingHorizontal: 10,
    marginTop: 20
  },

  agendaHeader: {
    fontSize: 22,
    color: '#7e947f'
  }
})
