import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import EventCard from '../components/EventCard';
import EventsApi from '../api/EventsApi';
import UserApi from '../api/UserApi';
import DiscoverButton from '../components/DiscoverButton';
import UserContext from '../util/UserContext';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';
import colors from '../util/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F7',
  },
  bodyText: {
    color: colors.text,
    fontSize: 13,
  },
  headerText: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'center',
    color: colors.grayScale9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    fontSize: 25,
    margin: 10,
    color: colors.grayScale8,
  },
  emptyContainerSubtext: {
    fontSize: 20,
    margin: 5,
    color: colors.grayScale8,
  },
});

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
    const { navigation } = this.props;
    if (clubs.length === 0) {
      this.setState({
        events: [],
        isFollowingClubs: false,
        isLoading: false,
      });

      return;
    }

    navigation.addListener('willFocus', this.onFocus);
    this.onFocus();
  }

  onFocus = async () => {
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

  navigateToDiscover = async () => {
    const { navigation } = this.props;
    await navigation.navigate('Discover');
  };

  loadingView = () => (
    <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator />
    </View>
  );

  notFollowingClubsView = () => {
    const { emptyContainer, emptyContainerText } = styles;
    return (
      <View style={emptyContainer}>
        <Text style={emptyContainerText}>You are not following any clubs</Text>
        <DiscoverButton onPress={this.navigateToDiscover} />
      </View>
    );
  };

  noUpcomingEventsView = () => {
    const { emptyContainer, emptyContainerText, emptyContainerSubtext } = styles;
    return (
      <View style={emptyContainer}>
        <Text style={emptyContainerText}>No upcoming events</Text>
        <Text style={emptyContainerSubtext}>Find new clubs!</Text>
      </View>
    );
  };

  filterEvents = (events) => {
    const currentDate = new Date();
    return events
      .filter((event) => event.date > currentDate)
      .sort((eventOne, eventTwo) => eventOne.date - eventTwo.date);
  }

  eventListView() {
    const { events } = this.state;
    const { user } = this.context;
    const { container, bodyText, headerText } = styles;
    return (
      <View style={[container, bodyText]}>
        <Text style={headerText}>
          Upcoming Events
        </Text>
        <FlatList
          data={this.filterEvents(events)}
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
