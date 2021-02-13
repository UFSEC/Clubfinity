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
import ClubsApi from '../api/ClubsApi';
import ClubfinityLogo from '../assets/images/ClubfinityLogo.png';
import colors from '../util/colors';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class DiscoverScr extends Component {
  static navigationOptions = buildNavigationsOptions('Discover')

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      clubs: '',
      filteredClubs: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', this.onFocus);
    this.onFocus();
  }

  onFocus = async () => {
    try {
      const data = await ClubsApi.getAllClubs()
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

  renderSearch = () => {
    const { searchText } = this.state;
    return (
      <Header
        rounded
        searchBar
        style={{
          borderBottomWidth: 0,
          backgroundColor: '#f5f6fa',
          elevation: 0,
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
    );
  };

  render() {
    const { isLoading, filteredClubs } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: '#f5f6fa', flex: 1 }}>
        <View>
          {/* Grid */}
          <List
            style={{
              width: '100%',
            }}
          >
            <FlatList
              data={filteredClubs}
              contentContainerStyle={{ flexGrow: 1 }}
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
                    item.thumbnailUrl
                      ? { uri: item.thumbnailUrl }
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
                              item.thumbnailUrl
                                ? { uri: item.thumbnailUrl }
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
                        <CardItem cardBody>
                          <Text
                            style={{
                              fontSize: 14,
                              color: colors.grayScale8,
                              paddingBottom: '5%',
                              paddingLeft: '3.8%',
                            }}
                          >
                            {item.description.length > 40
                              ? `${item.description.substring(0, 37).trim()}...`
                              : item.description.trim()}
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
          </List>
        </View>
      </View>
    );
  }
}
