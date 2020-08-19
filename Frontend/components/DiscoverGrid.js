import React, { Component } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Card,
  Input,
  Item,
  Header,
  List,
  CardItem,
  Text,
  ListItem,
  Left,
  Thumbnail,
} from 'native-base';
import API from '../api/BaseApi';
import clubImageList from '../assets/images/clubimages/FetchImage';
import ClubfinityLogo from '../assets/images/ClubfinityLogo.png';
import colors from '../util/colors';

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

export default class DiscoverGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      clubs: '',
      filteredClubs: '',
      clubList: clubImageList,
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await API.get('/api/club');
      const { data } = response.data;
      this.setState({
        clubs: data,
        filteredClubs: data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleClubSelect = (club, clubImage) => {
    const { navigation } = this.props;
    navigation.navigate('Club', {
      club,
      clubImage,
      eventData: evData,
      postData,
    });
  };

  filterClubs = (text) => {
    const searchText = text.toLowerCase();
    const { clubs } = this.state;
    const newFilterClubs = clubs.filter((club) => club.name.toLowerCase().includes(searchText));

    this.setState({
      searchText: text,
      filteredClubs: newFilterClubs,
    });
  };

  render() {
    const {
      isLoading, clubList, searchText, filteredClubs,
    } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    const clubFilterImage = clubList;

    return (
      <View>
        {/* Search Bar */}
        <Header
          rounded
          searchBar
          style={{
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
          }}
        >
          <Item
            style={{
              width: '100%',
              borderBottomWidth: 1,
              height: 40,
              borderBottomColor: colors.grayScale8,
              backgroundColor: 'transparent',
            }}
          >
            <Ionicons
              name="ios-search"
              size={20}
              style={{
                marginLeft: '2%',
                marginTop: '1%',
              }}
              color={colors.grayScale8}
            />
            <Input
              placeholder="Explore clubs"
              onChangeText={(text) => this.filterClubs(text)}
              value={searchText}
              autoCorrect={false}
              clearButtonMode="always"
              style={{
                fontSize: 14,
                marginLeft: '2%',
                height: '100%',
                width: '100%',
              }}
            />
          </Item>
        </Header>

        <View>
          {/* Grid */}
          <List
            style={{
              width: '100%',
            }}
          >
            <FlatList
              data={filteredClubs}
              style={{
                width: '100%',
                height: '100%',
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                  }}
                  onPress={() => this.handleClubSelect(
                    item,
                    clubFilterImage[item.name]
                      ? { uri: clubFilterImage[item.name].src }
                      : ClubfinityLogo,
                  )}
                >
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      alignSelf: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      flex: 1,
                    }}
                  >
                    <Card
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <ListItem avatar style={{ paddingTop: 0 }}>
                        <Left style={{ paddingTop: 0 }}>
                          <Thumbnail
                            source={
                              clubFilterImage[item.name]
                                ? { uri: clubFilterImage[item.name].src }
                                : ClubfinityLogo
                            }
                          />
                        </Left>
                      </ListItem>
                      <View
                        style={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <CardItem
                          header
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingTop: '1%',
                            paddingBottom: '1%',
                          }}
                        >
                          <Text style={{ paddingTop: '2%' }}>{item.name}</Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: colors.grayScale8,
                            }}
                          >
                            {item.category}
                          </Text>
                        </CardItem>
                        <CardItem body>
                          <Text
                            style={{ fontSize: 14, color: colors.grayScale8 }}
                          >
                            {item.description}
                          </Text>
                        </CardItem>
                      </View>
                      <View style={{ marginLeft: 'auto' }}>
                        <Ionicons
                          name="md-arrow-dropright"
                          size={30}
                          style={{ paddingRight: '5%' }}
                        />
                      </View>
                    </Card>
                  </View>
                </TouchableOpacity>
              )}
              numColumns={1}
              keyExtractor={(item) => item._id}
            />
          </List>
        </View>
      </View>
    );
  }
}
