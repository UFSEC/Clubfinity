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
        name: "SEC GBM #2",
        place: "CSE A101 6:15pm",
        icon: "sec-icon.jpg",
        description: "Join us for another GBM and see what we have in store! Clubfinity is in full motion and we are more excited than ever to bring this game-changing project to our members. Opportunities like this don’t come too often, so join us and add this to your resume!"
      },
      {
        id: 2,
        name: "SGP and BSU Present: 21 Savage",
        place: "Stephen O'Connell Center",
        icon: "21-savage.jpg",
        description: "SGP is excited to bring 21 SAVAGE to Exactech Arena at the Stephen C. O'Connell Center on April 15th! Doors open at 6:30 PM and the show will begin at 7:30 PM. "
      },
      {
        id: 3,
        name: "Event Name",
        place: "Event Location",
        icon: "sec-icon.jpg",
        description: "Dank Descritpion"
      },
      {
        id: 4,
        name: "Event Name",
        place: "Event Location",
        icon: "sec-icon.jpg",
        description: "Dank Descritpion"
      },
      {
        id: 5,
        name: "Event Name",
        place: "Event Location",
        icon: "sec-icon.jpg",
        description: "Dank Descritpion"
      },
      {
        id: 6,
        name: "Event Name",
        place: "Event Location",
        icon: "sec-icon.jpg",
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