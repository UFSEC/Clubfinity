import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Button, Text, View, TextInput } from 'react-native';
import { primary } from '../assets/styles/stylesheet';
import EventCard from '../components/EventCard';
import Icon from 'react-native-vector-icons/Foundation';

// Event Feed App Module
class EventFeed extends Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  render() {
    const eventData = [
      {
        id: 1,
        name: "Event Name",
        place: "Event Location",
        description: "Dank Descritpion"
      },
      {
        id: 2,
        name: "Event Name",
        place: "Event Location",
        description: "Dank Descritpion"
      },
      {
        id: 3,
        name: "Event Name",
        place: "Event Location",
        description: "Dank Descritpion"
      },
      {
        id: 4,
        name: "Event Name",
        place: "Event Location",
        description: "Dank Descritpion"
      },
      {
        id: 5,
        name: "Event Name",
        place: "Event Location",
        description: "Dank Descritpion"
      },
      {
        id: 6,
        name: "Event Name",
        place: "Event Location",
        description: "Dank Descritpion"
      }
    ];

    return (
      <View style={[primary.container, primary.bodyText]}>
        <Text style={primary.headerText}>Upcoming Events <Icon name="megaphone" color={'teal'} size={24} />   </Text>
        <FlatList
          data={eventData}
          key={eventData.id}
          renderItem={({ item }) =>
            <EventCard data={item} />
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}

export default EventFeed;