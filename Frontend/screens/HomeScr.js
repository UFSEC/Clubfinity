import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, Text, View } from 'react-native';
import { primary, emptyEventList } from '../assets/styles/stylesheet';
import { Octicons } from '@expo/vector-icons';

import EventCard from '../components/EventCard';
import EventsApi from '../api/EventsApi';
import ClubsApi from '../api/ClubsApi';
import DiscoverButton from "../components/DiscoverButton";
import UserContext from "../util/UserContext";

// Event Feed App Module
class HomeScr extends Component {
  static contextType = UserContext;

  static navigationOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFollowingClubs: true,
      events: []
    };
  }

  async componentDidMount() {
    // Fetch list of Events from API
    const bearerToken = await AsyncStorage.getItem('userToken');
    // const clubs = await ClubsApi.getFollowing(bearerToken);
    const { user } = this.context;
    const clubs = user.clubs;
    if (clubs.length === 0) {
      this.setState({
        events: [],
        isFollowingClubs: false,
        isLoading: false
      });

      return;
    }


    const events = await EventsApi.getFollowing(bearerToken);
    this.setState({
      events: events,
      isLoading: false
    });
  }

  // This has to be a lambda in order to preserve the value of 'this.props'
  navigateToDiscover = async () => {
    await this.props.navigation.navigate('Discover');
  };

  loadingView() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }

  notFollowingClubsView() {
    return (
      <View style={emptyEventList.container}>
        <Text style={emptyEventList.text}>You're not following any clubs</Text>
        <DiscoverButton onPress={this.navigateToDiscover} />
      </View>
    );
  }

  noUpcomingEventsView() {
    return (
      <View style={emptyEventList.container}>
        <Text style={emptyEventList.text}>No upcoming events</Text>
      </View>
    );
  }

  eventListView() {
    return (
      <View style={[primary.container, primary.bodyText]}>
        <Text style={primary.headerText}>Hey Upcoming Events <Octicons name="megaphone" color={'teal'} size={24} /> </Text>
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

  render() {
    if (this.state.isLoading)
      return this.loadingView();
    else if (!this.state.isFollowingClubs)
      return this.notFollowingClubsView();
    else if (this.state.events.length === 0)
      return this.noUpcomingEventsView();
    else
      return this.eventListView();
  }
}

export default HomeScr;
