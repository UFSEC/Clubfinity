import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  FlatList,
} from 'react-native';
import { List } from 'native-base';

import EventsApi from '../api/EventsApi';
import Row from '../components/Row';

class EventList extends Component {
  static navigationOptions = {
    headerTitle: 'Event List',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const club = navigation.getParam('club', 'NO-CLUB');
    const bearerToken = await AsyncStorage.getItem('userToken');

    const events = await EventsApi.getForClub(bearerToken, club._id);
    this.setState({ events });
  }

  render() {
    const { events } = this.state;

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <List>
          <FlatList
            style={{ height: '100%' }}
            data={events}
            keyExtractor={(event) => event._id}
            numColumns={1}
            renderItem={({ item }) => (
              <Row
                date={item.date.toFormat('MMM dd yyyy')}
                text={item.name}
                handler={() => { }}
              />
            )}
          />
        </List>
      </View>
    );
  }
}

export default EventList;
