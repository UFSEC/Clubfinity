import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API from '../api/BaseApi';
import clubImageList from '../assets/images/clubimages/FetchImage';
import ClubfinityLogo from '../assets/images/ClubfinityLogo.png';

/**
 * This isn't arbitrary and is instead depends on padding/margin b/w cards.
 * Must be made a constant one design finalized!
 */

const GRID_ITEM_WIDTH = Dimensions.get('screen').width / 2 - 22;

const bgColor = '#F2F2F7';
const cardColor = '#fff';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: bgColor,
  },
  scrollContainer: {
    flex: 1,
    margin: 1,
    paddingHorizontal: 10,
    minWidth: Dimensions.get('screen').width,
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 150,
    maxWidth: GRID_ITEM_WIDTH,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: bgColor,
    backgroundColor: cardColor,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
  },
  gridImage: {
    flex: 4,
    margin: 0,
    height: 100,
    width: GRID_ITEM_WIDTH,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  gridSubheading: {
    flex: 1,
    display: 'flex',
    backgroundColor: cardColor,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: 0,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 2,
    borderColor: cardColor,
  },
  clubName: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    color: '#636e72',
  },
  clubCategory: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5E5CE6',
    paddingHorizontal: 5,
    marginTop: 5,
    paddingVertical: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#5E5CE6',
    fontSize: 10,
    color: '#fff',
  },
  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E5E4EA',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E4EA',
    marginHorizontal: 10,
    marginVertical: 10,
    height: 50,
    paddingHorizontal: 20,
  },
  searchBoxText: {
    marginLeft: 7,
    flex: 11,
  },
  searchBoxIcon: {
    flex: 1,
  },
});

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
    name: 'GBM 2',
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

  handleClubSelect = (club) => {
    const { navigation } = this.props;
    navigation.navigate('Club', {
      club,
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
      <View style={styles.mainContainer}>
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons
            style={styles.searchBoxIcon}
            color="#8E8E93"
            name="md-search"
            size={24}
          />
          <TextInput
            style={styles.searchBoxText}
            placeholderTextColor="#8E8E93"
            placeholder="Explore clubs"
            onChangeText={(text) => this.filterClubs(text)}
            value={searchText}
          />
        </View>

        {/* Grid */}
        <FlatList
          style={styles.scrollContainer}
          data={filteredClubs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => this.handleClubSelect(item)}
            >
              <Image
                // This retrieves the first instance of the club based on name if in Image File
                source={
                  clubFilterImage[item.name]
                    ? { uri: clubFilterImage[item.name].src }
                    : ClubfinityLogo
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '../assets/images/ClubfinityLogo.png';
                }}
                style={styles.gridImage}
                resizeMode="stretch"
              />
              <View style={styles.gridSubheading}>
                <Text color={item.categoryColor} style={styles.clubName}>
                  {item.name}
                </Text>
                <Text style={styles.clubCategory}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
}

// Style definitions
