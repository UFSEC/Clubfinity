import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Text,
  View,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { primary, emptyEventList } from '../assets/styles/stylesheet';

import EventCard from '../components/EventCard';
import EventsApi from '../api/EventsApi';
import DiscoverButton from '../components/DiscoverButton';
import UserContext from '../util/UserContext';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';
import colors from '../util/colors';

class HomeScr extends Component {
  static contextType = UserContext

  static navigationOptions = buildNavigationsOptions('Home')

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFollowingClubs: true,
      events: [],
    };
  }

  async componentDidMount() {
    // Fetch list of Events from API
    const bearerToken = await AsyncStorage.getItem('userToken');
    // const clubs = await ClubsApi.getFollowing(bearerToken);
    const { user } = this.context;
    const { clubs } = user;
    if (clubs.length === 0) {
      this.setState({
        events: [],
        isFollowingClubs: false,
        isLoading: false,
      });

      return;
    }

    const events = await EventsApi.getFollowing(bearerToken);
    this.setState({
      events,
      isLoading: false,
    });
  }

  // This has to be a lambda in order to preserve the value of 'this.props'
  navigateToDiscover = async () => {
    const { navigation } = this.props;
    await navigation.navigate('Discover');
  };

  loadingView = () => (
    <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator />
    </View>
  );

  notFollowingClubsView = () => (
    <View style={emptyEventList.container}>
      <Text style={emptyEventList.text}>You are not following any clubs</Text>
      <DiscoverButton onPress={this.navigateToDiscover} />
    </View>
  );

  noUpcomingEventsView = () => (
    <View style={emptyEventList.container}>
      <Text style={emptyEventList.text}>No upcoming events</Text>
    </View>
  );

  eventListView() {
    const { events } = this.state;
    const { user } = this.context;
    return (
      <View style={[primary.container, primary.bodyText]}>
        <Text style={primary.headerText}>
          Hey Upcoming Events{' '}
          <Octicons name="megaphone" color={colors.primary0} size={24} />
        </Text>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <EventCard
              key={item._id}
              name={item.name}
              location={item.location}
              description={item.description}
              userId={user._id}
              goingUsers={item.goingUsers}
              eventID={item._id}
              interestedUsers={item.interestedUsers}
              uninterestedUsers={item.uninterestedUsers}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    );
  }

  render() {
    const { isLoading, isFollowingClubs, events } = this.state;

    if (isLoading) return this.loadingView();
    if (!isFollowingClubs) return this.notFollowingClubsView();
    if (events.length === 0) return this.noUpcomingEventsView();
    return this.eventListView();
  }
}

export default HomeScr;
