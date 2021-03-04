import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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
import ClubsApi from '../api/ClubsApi';
import AdminRow from '../components/AdminRow';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

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
    backgroundColor: colors.secondary0,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ClubScr extends React.Component {
  static contextType = UserContext;

  static navigationOptions = buildNavigationsOptions('Club Page');

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

    if (user.clubs.map((currentClub) => currentClub._id).includes(club._id)) {
      this.setState({ isFollowing: true });
    }
    if (club.admins.map((admin) => admin._id).includes(user._id)) {
      this.setState({ isAdmin: true });
    }
    const { events, announcements } = await ClubsApi.getPosts(club._id);
    this.setState({ events, announcements });
  };

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
    const authResponse = await apiCall(clubId);
    setUser(authResponse.data.data);
    return authResponse;
  }

  async handleFollow(clubId) {
    return this.handleUpdate(UserApi.followClub, clubId);
  }

  async handleUnfollow(clubId) {
    return this.handleUpdate(UserApi.unfollowClub, clubId);
  }

  renderSocialMediaLink = (link, icon, text) => {
    const { name, size, marginRight } = icon;

    return (
      <TouchableOpacity onPress={() => Linking.openURL(link)}>
        <CardItem>
          <Ionicons
            name={name}
            size={size}
            style={{ marginRight }}
          />
          <Text>{text}</Text>
        </CardItem>
      </TouchableOpacity>
    );
  };

  renderConnectCard = (club) => {
    if (!club.slackLink && !club.facebookLink && !club.instagramLink) {
      return null;
    }

    return (
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
        {!!club.slackLink && this.renderSocialMediaLink(
          club.slackLink,
          { name: 'logo-slack', size: 27, marginRight: '4%' },
          'Slack',
        )}
        {!!club.facebookLink && this.renderSocialMediaLink(
          club.facebookLink,
          { name: 'logo-facebook', size: 30, marginRight: '5%' },
          'Facebook',
        )}
        {!!club.instagramLink && this.renderSocialMediaLink(
          club.instagramLink,
          { name: 'logo-instagram', size: 30, marginRight: '5%' },
          'Instagram',
        )}
      </Card>
    );
  };

  // TODO: Fix navigation back to the ClubScr from this stack

  render() {
    const { navigation } = this.props;
    const {
      events, announcements, isFollowing, isAdmin,
    } = this.state;

    const announcementsEmpty = announcements.length === 0;
    const eventsEmpty = events.length === 0;

    const club = navigation.getParam('club', 'NO-CLUB');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator>
          <View style={styles.clubView}>
            <View style={{ paddingTop: '10%' }}>
              <StyleProvider style={getTheme(thumbnailTheme)}>
                <Thumbnail source={{ uri: club.thumbnailUrl }} large />
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
                  backgroundColor: isFollowing
                    ? colors.success
                    : colors.secondary0,
                  width: '85%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.followBtnHandler}
              >
                {isFollowing ? <Text>Following</Text> : <Text>Follow</Text>}
              </Button>
            )}

            {this.renderConnectCard(club)}

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
                  <Text>{club.description}</Text>
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
                {!eventsEmpty && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EventList', { clubId: club._id })}
                  >
                    <Text style={{ alignSelf: 'flex-end', color: colors.link }}>
                      View all
                    </Text>
                  </TouchableOpacity>
                )}
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  {!eventsEmpty ? (
                    <List style={{ width: '100%' }}>
                      <FlatList
                        data={events}
                        style={{ width: '100%' }}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => navigation.navigate('EventScr', {
                              id: item._id,
                              title: item.name,
                              description: item.description,
                              location: item.location,
                              date: item.date,
                              isAdmin,
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
                  ) : (
                    <Text
                      style={{
                        alignSelf: 'center',
                        opacity: 0.7,
                        marginBottom: '5%',
                        fontSize: '14',
                      }}
                    >
                      There are no events for this club.
                    </Text>
                  )}
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

                {!announcementsEmpty && (
                  <TouchableOpacity onPress={() => navigation.navigate('AnnouncementList', { clubId: club._id })}>
                    <Text style={{ alignSelf: 'flex-end', color: colors.link }}>
                      View all
                    </Text>
                  </TouchableOpacity>
                )}
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  {!announcementsEmpty ? (
                    <List style={{ width: '100%' }}>
                      <FlatList
                        data={announcements}
                        style={{ width: '100%' }}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => navigation.navigate('AnnouncementScr', {
                              id: item._id,
                              title: item.title,
                              description: item.description,
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
                              <Text
                                numberOfLines={1}
                                style={{ marginRight: '1%' }}
                              >
                                {item.title.length > 40
                      ? `${item.title.substring(0, 37).trim()}...`
                        : item.title.trim()}
                              </Text>
                              <Ionicons name="md-arrow-dropright" size={30} />
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </List>
                  ) : (
                    <Text
                      style={{
                        alignSelf: 'center',
                        opacity: 0.7,
                        marginBottom: '5%',
                        fontSize: '14',
                      }}
                    >
                      There are no announcements for this club.
                    </Text>
                  )}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('AdminList', { club })}
                >
                  <Text style={{ alignSelf: 'flex-end', color: colors.link }}>
                    View all
                  </Text>
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
