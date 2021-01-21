import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Linking,
} from 'react-native';
import {
  Button,
  Text,
  H1,
  Card,
  CardItem,
  Body,
  List,
  Thumbnail,
  StyleProvider,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import thumbnailTheme from '../native-base-theme/components/Thumbnail';
import getTheme from '../native-base-theme/components';
import colors from '../util/colors';
import UserContext from '../util/UserContext';
import UserApi from '../api/UserApi';
import EventsApi from '../api/EventsApi';
import AnnouncementsApi from '../api/AnnouncementsApi';
import AdminRow from '../components/AdminRow';
import ClubfinityLogo from '../assets/images/ClubfinityLogo.png';

const styles = StyleSheet.create({
  clubView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminButton: {
    marginTop: '4%',
    alignSelf: 'center',
    backgroundColor: colors.accent0,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ClubScr extends React.Component {
  static navigationOptions = {
    title: 'Club Page',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
      isAdmin: false,
      announcements: [],
      events: [],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', this.onFocus);
    this.onFocus();
  }

  onFocus = async () => {
    const { navigation } = this.props;
    const { user } = this.context;
    const club = navigation.getParam('club', 'NO-CLUB');
    const bearerToken = await AsyncStorage.getItem('userToken');

    if (user.clubs.map((currentClub) => currentClub._id).includes(club._id)) {
      this.setState({ isFollowing: true });
    }
    if ((club.admins.map((admin) => admin._id)).includes(user._id)) {
      this.setState({ isAdmin: true });
    }
    const events = await EventsApi.getForClub(bearerToken, club._id);
    const announcements = await AnnouncementsApi.getForClub(bearerToken, club._id);
    this.setState({ events, announcements });
  }

  followBtnHandler = () => {
    const { navigation } = this.props;
    const { isFollowing } = this.state;
    const club = navigation.getParam('club', 'NO-CLUB');
    if (!isFollowing) {
      const authResponse = this.handleFollow(club._id);
      if (!authResponse.error) {
        this.setState({ isFollowing: true });
      } else {
        console.log('todo: error handling');
      }
    } else {
      this.handleUnfollow(club._id);
      this.setState({ isFollowing: false });
    }
  };

  async handleUpdate(apiCall, clubId) {
    const { setUser } = this.context;
    const bearer = await AsyncStorage.getItem('userToken');
    const authResponse = await apiCall(clubId, bearer);
    setUser(authResponse.data.data);
    return authResponse;
  }

  async handleFollow(clubId) {
    return this.handleUpdate(UserApi.followClub, clubId);
  }

  async handleUnfollow(clubId) {
    return this.handleUpdate(UserApi.unfollowClub, clubId);
  }

  render() {
    const { navigation } = this.props;
    const {
      events, announcements, isFollowing, isAdmin,
    } = this.state;

    const club = navigation.getParam('club', 'NO-CLUB');
    const defaultAdminUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator>
          <View
            style={styles.clubView}
          >
            <View style={{ paddingTop: '10%' }}>
              <StyleProvider style={getTheme(thumbnailTheme)}>
              <Thumbnail source={club.thumbnailUrl ? { uri: club.thumbnailUrl } : ClubfinityLogo} large />
              </StyleProvider>
            </View>
            <H1 style={{ paddingBottom: '2%', paddingTop: '5%' }}>
              {club.name}
            </H1>
            <Text style={{ paddingBottom: '5%' }}>{club.category}</Text>

            {isAdmin ? (
              <>
                <Button
                  style={styles.adminButton}
                  onPress={() => navigation.navigate('EditClub', { club })}
                >
                  <Text>Manage</Text>
                </Button>

                <Button
                  style={styles.adminButton}
                  onPress={() => navigation.navigate('CreateAnnouncementScr', { club })}
                >
                  <Text>Make an announcement</Text>
                </Button>

                <Button
                  style={styles.adminButton}
                  onPress={() => navigation.navigate('EventCreation', { club })}
                >
                  <Text>Create a new event</Text>
                </Button>
              </>
            ) : (
              <Button
                style={{
                  alignSelf: 'center',
                  backgroundColor: isFollowing ? colors.accent2 : colors.accent0,
                  width: '85%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.followBtnHandler}
              >
                { isFollowing
                  ? <Text>Following</Text> : <Text>Follow</Text>}
              </Button>
            )}

            {/**
             * Connect
             */}
            <Card
              style={{
                width: '85%',
                marginTop: '10%',
                borderTopColor: colors.primary0,
                borderTopWidth: 10,
              }}
            >
              <CardItem header>
                <Text>Connect</Text>
              </CardItem>
              <TouchableOpacity onPress={() => Linking.openURL(club.slackLink)}>
                <CardItem>
                  <Ionicons
                    name="logo-slack"
                    size={27}
                    style={{ marginRight: '4%' }}
                  />
                  <Text>Slack</Text>
                </CardItem>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(club.facebookLink)}>
                <CardItem>
                  <Ionicons
                    name="logo-facebook"
                    size={30}
                    style={{ marginRight: '5%' }}
                  />
                  <Text>Facebook</Text>
                </CardItem>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(club.instagramLink)}>
                <CardItem>
                  <Ionicons
                    name="logo-instagram"
                    size={30}
                    style={{ marginRight: '5%' }}
                  />
                  <Text>Instagram</Text>
                </CardItem>
              </TouchableOpacity>
            </Card>

            {/**
             * Purpose
             */}
            <Card
              style={{
                width: '85%',
                marginTop: '5%',
                borderTopColor: colors.primary0,
                borderTopWidth: 10,
              }}
            >
              <CardItem header>
                <Text>Purpose</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    { club.description }
                  </Text>
                </Body>
              </CardItem>
            </Card>

            {/**
             * Events
             */}
            <Card
              style={{
                width: '85%',
                marginTop: '5%',
                borderTopColor: colors.primary0,
                borderTopWidth: 10,
              }}
            >
              <CardItem header style={{ justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'flex-end' }}>Events</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EventList', { club })}>
                  <Text style={{ alignSelf: 'flex-end', color: colors.link }}>View all</Text>
                </TouchableOpacity>
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  <List style={{ width: '100%' }}>
                    <FlatList
                      data={events}
                      style={{ width: '100%' }}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('EventScr', {
                          id: item._id,
                          title: item.name,
                          description: item.description,
                          location: item.location,
                          date: item.date,
                        })}
                        >
                          <View
                            style={{
                              width: '100%',
                              marginLeft: '0%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              padding: '2%',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ marginLeft: '0%' }}>
                              {item.name}
                            </Text>
                            <Ionicons name="md-arrow-dropright" size={30} />
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </List>
                </Body>
              </CardItem>
            </Card>

            {/**
             * Announcements
             */}
            <Card
              style={{
                width: '85%',
                marginTop: '5%',
                borderTopColor: colors.primary0,
                borderTopWidth: 10,
              }}
            >
              <CardItem header style={{ justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'flex-end' }}>Announcements</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={{ alignSelf: 'flex-end', color: colors.link }}>View all</Text>
                </TouchableOpacity>
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  <List style={{ width: '100%' }}>
                    <FlatList
                      data={announcements}
                      style={{ width: '100%' }}
                      renderItem={({ item }) => (
                        <TouchableOpacity>
                          <View
                            style={{
                              width: '100%',
                              marginLeft: '0%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              padding: '2%',
                              alignItems: 'center',
                            }}
                          >
                            <Text numberOfLines={1} style={{ marginRight: '1%' }}>
                              {item.title}
                            </Text>
                            <Ionicons name="md-arrow-dropright" size={30} />
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </List>
                </Body>
              </CardItem>
            </Card>

            {/**
             * Admins
             */}
            <Card
              style={{
                width: '85%',
                marginTop: '5%',
                borderTopColor: colors.primary0,
                borderTopWidth: 10,
              }}
            >
              <CardItem header style={{ justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'flex-end' }}>Admins</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AdminList', { club })}>
                  <Text style={{ alignSelf: 'flex-end', color: colors.link }}>View all</Text>
                </TouchableOpacity>
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  <List style={{ width: '100%' }}>
                    <FlatList
                      data={club.admins}
                      style={{ width: '100%' }}
                      renderItem={({ item }) => (
                        <AdminRow
                          admin={{
                            name: `${item.name.first} ${item.name.last}`,
                            year: item.year,
                            major: item.major,
                            thumbnailUrl: defaultAdminUrl,
                          }}
                          handler={() => {}}
                        />
                      )}
                    />
                  </List>
                </Body>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
