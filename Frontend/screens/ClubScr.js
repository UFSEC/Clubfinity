import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
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

const postData = [
  {
    id: 1,
    header: 'Hey guys! Get ready for our final GBM!',
    description: 'Its a me a Mario!',
  },
  {
    id: 2,
    header: 'See you all at the CS Picnic today :)',
    description: 'Its a me a Mario!',
  },
  {
    id: 3,
    header: 'Its a me a Mario!',
    description: 'Its a me a Mario!',
  },
  {
    id: 4,
    header: 'We Cool',
    description: 'Its a me a Mario!',
  },
];

const evData = [
  {
    id: 1,
    name: 'GBM 3',
    date: '10/17/19',
    time: '6:00',
    location: 'LIT 101',
  },
  {
    id: 2,
    name: 'codeCollab',
    date: '10/24/19',
    time: '7:00',
    location: 'LIT 101',
  },
  {
    id: 3,
    name: 'SEC X Microsoft',
    date: '10/31/19',
    time: '6:00',
    location: 'LIT 101',
  },
  {
    id: 4,
    name: 'GBM 3',
    date: '11/07/19',
    time: '6:00',
    location: 'LIT 101',
  },
];

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
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const clubContext = navigation.getParam('club', 'NO-CLUB');
    const { user } = this.context;
    if (user.clubs.some((club) => club._id.toString() === clubContext._id)) {
      this.setState({ isFollowing: true });
    }
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
    const { isFollowing } = this.state;
    const events = evData;
    const posts = postData;
    const club = navigation.getParam('club', 'NO-CLUB');
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ paddingTop: '10%' }}>
              <StyleProvider style={getTheme(thumbnailTheme)}>
                <Thumbnail source={{ uri: club.thumbnailUrl }} large />
              </StyleProvider>
            </View>
            <H1 style={{ paddingBottom: '2%', paddingTop: '5%' }}>
              {club.name}
            </H1>
            <Text style={{ paddingBottom: '5%' }}>{club.category}</Text>
            {isFollowing ? (
              <Button
                style={{
                  alignSelf: 'center',
                  backgroundColor: colors.accent2,
                  width: '85%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.followBtnHandler}
              >
                <Text>Following</Text>
              </Button>
            ) : (
              <Button
                style={{
                  alignSelf: 'center',
                  backgroundColor: colors.accent0,
                  width: '85%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.followBtnHandler}
              >
                <Text>Follow</Text>
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
              <TouchableOpacity>
                <CardItem>
                  <Ionicons
                    name="logo-slack"
                    size={27}
                    style={{ marginRight: '4%' }}
                  />
                  <Text>Slack</Text>
                </CardItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <CardItem>
                  <Ionicons
                    name="logo-facebook"
                    size={30}
                    style={{ marginRight: '5%' }}
                  />
                  <Text>Facebook</Text>
                </CardItem>
              </TouchableOpacity>
              <TouchableOpacity>
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
                    A short description that we should not allow more than ~400
                    characters or so.
                  </Text>
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
              <CardItem header>
                <Text>Announcements</Text>
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  <List style={{ width: '100%' }}>
                    <FlatList
                      data={posts}
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
                            <Text style={{ marginLeft: '0%' }}>
                              {item.header}
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
              <CardItem header>
                <Text>Events</Text>
              </CardItem>
              <CardItem style={{ paddingHorizontal: '0%' }}>
                <Body style={{ paddingHorizontal: '0%', width: '100%' }}>
                  <List style={{ width: '100%' }}>
                    <FlatList
                      data={events}
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
