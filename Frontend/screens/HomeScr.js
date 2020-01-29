import React, { Component, Fragment } from 'react';
import { FlatList, ActivityIndicator, Button, Text, View, TextInput, AsyncStorage } from 'react-native';
import { primary } from '../assets/styles/stylesheet';
import { Octicons } from '@expo/vector-icons';

import EventCard from '../components/EventCard';
import { API } from '../util/API';

// Event Feed App Module
class EventFeed extends Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: []
    };
  }

  async componentDidMount() {
    // Fetch list of Events from API
    const token = await AsyncStorage.getItem('userToken');
    try {
      let response = await API.get('/api/event', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let { data } = response.data;
      console.log(data);
      this.setState({
        events: data,
        isLoading: false
      });
    } catch (error) {
      console.error(error);
    }

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={[primary.container, primary.bodyText]}>
        <Text style={primary.headerText}>Upcoming Events <Octicons name="megaphone" color={'teal'} size={24} />   </Text>
        <FlatList
          data={this.state.events}
          renderItem={({ item }) =>
            <EventCard key={item._id} data={item} />
          }
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    );
  }
}

export default EventFeed;