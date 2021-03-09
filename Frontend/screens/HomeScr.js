import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Octicons } from '@expo/vector-icons';
import { primary, emptyEventList } from '../assets/styles/stylesheet';

import EventCard from '../components/EventCard';
import EventsApi from '../api/EventsApi';
import UserApi from '../api/UserApi';
import DiscoverButton from '../components/DiscoverButton';
import UserContext from '../util/UserContext';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';
import colors from '../util/colors';

class HomeScr extends Component {
  static contextType = UserContext;

  static navigationOptions = buildNavigationsOptions('Home');

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFollowingClubs: true,
      events: [],
    };
  }

  async componentDidMount() {
    this.registerForPushNotificationsAsync();
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

    const events = await EventsApi.getFollowing();
    this.setState({
      events,
      isLoading: false,
    });
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      UserApi.updatePushToken(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

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
          Hey Upcoming Events
          {' '}
          <Octicons name="megaphone" color={colors.primary0} size={24} />
        </Text>
        <FlatList
          data={events.sort((eventOne, eventTwo) => eventTwo.date - eventOne.date)}
          renderItem={({ item }) => (
            <EventCard
              key={item._id}
              clubName={item.club.name}
              date={item.date}
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
          contentContainerStyle={{ paddingBottom: 5 }}
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
