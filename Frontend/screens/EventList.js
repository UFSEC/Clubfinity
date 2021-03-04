import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
} from 'react-native';
import { DateTime } from 'luxon';

import EventsApi from '../api/EventsApi';
import Row from '../components/Row';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';


class EventList extends Component {
  static navigationOptions = buildNavigationsOptions('Event List')

  constructor(props) {
    super(props);
    this.state = {
      pastEvents: [],
      upcomingEvents: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const clubId = navigation.getParam('clubId', 'NO-CLUB');

    const events = await EventsApi.getForClub(clubId);
    const now = DateTime.local();
    const pastEvents = events.filter((event) => event.date < now);
    const upcomingEvents = events.filter((event) => event.date > now);

    this.setState({ pastEvents, upcomingEvents });
  }
  

  renderSectionHeader = (section) => (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        backgroundColor: 'white',
      }}
    >
      {section.title}
    </Text>
  )

  renderEmpty = () => (
    <Text style={{ color: 'rgba(0, 0, 0, 0.50)', textAlign: 'center' }}>No Upcoming or Past Events</Text>
  )

  render() {
    const { navigation } = this.props;
    const isAdmin = navigation.getParam('isAdmin', '');
    const { upcomingEvents, pastEvents} = this.state;

    const listData = [];
    if (upcomingEvents.length > 0) {
      listData.push({ title: 'Upcoming Events', data: upcomingEvents });
    }

    if (pastEvents.length > 0) {
      listData.push({ title: 'Past Events', data: pastEvents });
    }

    return (
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 30 }}>
        <SectionList
          sections={listData}
          keyExtractor={(event) => event._id}
          renderItem={({ item }) => (
            <Row
            date={item.date.toFormat('MMMM dd yyyy')}
            item={item.name}
            handler={() => {
              navigation.navigate('EventScr', {
                id: item._id,
                title: item.name,
                description: item.description,
                location: item.location,
                date: item.date,
                isAdmin,
              });
            }}
            />
          )}
          renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  }
}

export default EventList;
