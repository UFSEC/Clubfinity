import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
  Card,
  Text,
  H1,
  Thumbnail,
  StyleProvider,
  ListItem,
  Left,
  CardItem,
  Header,
  Item,
  Input,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../util/UserContext';
import DefaultPic from '../assets/images/profile-icon.png';
import thumbnailTheme from '../native-base-theme/components/Thumbnail';
import getTheme from '../native-base-theme/components';
import colors from '../util/colors';

const clubList = [
  {
    id: 111,
    name: 'Puppy Club',
    category: 'Cute',
    categoryColor: '#5E5CE6',
    src: 'https://i.ibb.co/F0hqL1X/puppy-club-img.jpg',
  },
  {
    id: 0,
    name: 'SEC',
    category: 'Computer Science',
    categoryColor: '#FF9F0A',
    src: 'https://i.ibb.co/F4rHdKN/sec-club-img.jpg',
  },
  {
    id: 1,
    name: 'ACM',
    category: 'Computer Science',
    categoryColor: '#FF9F0A',
    src: 'https://i.ibb.co/wLMHZHK/acm-club-img.png',
  },
  {
    id: 2,
    name: 'ACE',
    category: 'Computer Engineering',
    categoryColor: '#FF9F0A',
    src: 'https://i.ibb.co/cwJtrNy/ace-club-img.jpg',
  },
  {
    id: 3,
    name: 'WiCSE',
    category: 'Computer Science',
    categoryColor: '#FF9F0A',
    src: 'https://i.ibb.co/fSM2Zxz/wicse-club-img.jpg',
  },
];

export default class ProfileScr extends React.Component {
  static contextType = UserContext;

  static navigationOptions = {
    title: 'My Profile',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filteredClubs: '',
      followedClubs: clubList,
    };
  }

  /* This needs to be updated to be dynamic after API call exists to fetch user's followed clubs */
  async componentDidMount() {
    try {
      this.setState({
        filteredClubs: clubList,
      });
    } catch (error) {
      console.error(error);
    }
  }

  filterFollowing = (text) => {
    const searchText = text.toLowerCase();
    const filteredClubs = clubList.filter((club) => club.name.toLowerCase().includes(searchText));
    this.setState({
      searchText: text,
      filteredClubs,
    });
  };

  renderSearch = () => {
    const { searchText } = this.state;
    return (
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
            placeholder="Search following"
            onChangeText={(text) => this.filterFollowing(text)}
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
    );
  };

  handleClubSelect = (club, clubImage) => {
    const { navigation } = this.props;
    navigation.navigate('Club', {
      club,
      clubImage,
    });
  };

  render() {
    const { user } = this.context;
    const { navigation } = this.props;
    const { filteredClubs, followedClubs } = this.state;

    return (
      <View
        style={{
          backgroundColor: '#f5f6fa',
          flex: 1,
          margin: 'auto',
        }}
      >
        {/* Profile Info */}
        <Card
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{
              paddingTop: '2%',
              paddingRight: '2%',
              alignSelf: 'flex-end',
            }}
          >
            <Ionicons name="md-settings" size={30} color={colors.grayScale10} />
          </TouchableOpacity>
          <View style={{ paddingTop: '2%' }}>
            <StyleProvider style={getTheme(thumbnailTheme)}>
              <Thumbnail source={DefaultPic} small />
            </StyleProvider>
          </View>
          <H1 style={{ paddingBottom: '2%', paddingTop: '5%' }}>
            {`${user.name.first} ${user.name.last}`}
          </H1>
          <Text style={{ paddingBottom: '5%' }}>{user.major}</Text>
        </Card>

        {/* Grid */}
        {followedClubs.length > 0 ? (
          <FlatList
            data={filteredClubs}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.handleClubSelect(item, item.src)}
                style={{
                  width: '95%',
                  alignSelf: 'center',
                }}
              >
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'row',
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
                        <Thumbnail source={{ uri: item.src }} />
                      </Left>
                    </ListItem>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
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
            ListHeaderComponent={this.renderSearch}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '35%',
            }}
          >
            <Text style={{ color: colors.grayScale8 }}>
              You are not following any clubs yet!
            </Text>
          </View>
        )}
      </View>
    );
  }
}
