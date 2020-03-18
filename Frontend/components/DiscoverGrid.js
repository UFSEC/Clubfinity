import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// This isn't arbitrary and is instead depends on padding/margin b/w cards. Must be made a constant one design finalized!
const GRID_ITEM_WIDTH = Dimensions.get('screen').width / 2 - 22;

// Dummy list of clubs
const clubList = [
  {
    id: 111,
    name: " Puppy Club",
    category: "Cute",
    categoryColor: "#5E5CE6",
    src: "https://i.ibb.co/F0hqL1X/puppy-club-img.jpg",
  },
  {
    id: 0,
    name: "SEC",
    category: " Computer Science",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/F4rHdKN/sec-club-img.jpg",
  },
  {
    id: 1,
    name: "ACM",
    category: " Computer Science",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/wLMHZHK/acm-club-img.png",
  },
  {
    id: 2,
    name: "ACE",
    category: "Computer Engineering",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/cwJtrNy/ace-club-img.jpg",
  },
  {
    id: 3,
    name: "WiCSE",
    category: "Computer Science",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/fSM2Zxz/wicse-club-img.jpg",
  },
  {
    id: 4,
    name: "WECE",
    category: "Computer Engineering",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/4TWk5LX/wece-club-img.jpg",
  },
  {
    id: 5,
    name: "GatorTech",
    category: "Computer Science",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/4TxXzRZ/gatortech-club-img.png",
  },
  {
    id: 6,
    name: "Women's Lacrosse",
    category: "Sports",
    categoryColor: "#FF9F0A",
    src: "https://i.ibb.co/FYZbDgV/lacrosse-club-img.jpg"
  }
]

export default class DiscoverGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filteredClubs: clubList
    }
  }


  handleClubSelect = () => {
    console.log("Clubs tapped boi");
    this.props.navigation.navigate('Club');
  }

  filterClubs = (text) => {
    searchText = text.toLowerCase();
    newFilterClubs = clubList.filter((club) => {
      return club.name.toLowerCase().includes(searchText) || club.category.toLowerCase().includes(searchText);
    }); 

    this.setState({
      searchText: text,
      filteredClubs: newFilterClubs
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons style={styles.searchBoxIcon} color={'#8E8E93'} name={"md-search"} size={24} />
          <TextInput
            style={styles.searchBoxText}
            placeholderTextColor={'#8E8E93'}
            placeholder="Explore clubs"
            onChangeText={(text) => this.filterClubs(text)}
            value={this.state.searchText}
          ></TextInput>
        </View>

        {/* Grid */}
        <FlatList
          style={styles.scrollContainer}
          data={this.state.filteredClubs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={this.handleClubSelect}
            >
              <Image
                source={{
                  uri: item.src,
                  method: 'POST',
                  headers: {
                    Pragma: 'no-cache'
                  }
                }}
                style={styles.gridImage}
                resizeMode={"stretch"}
              />
              <View style={styles.gridSubheading}>
                <Text color={item.categoryColor} style={styles.clubName}>{item.name}</Text>
                <Text style={styles.clubCategory}>{item.category}</Text>
              </View>

            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

    );
  }
};

const bgColor = "#F2F2F7";
const cardColor = "#fff"

// Style definitions
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: bgColor
  },
  scrollContainer: {
    flex: 1,
    margin: 1,
    paddingHorizontal: 10,
    minWidth: Dimensions.get("screen").width
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
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
    shadowOpacity: .2,
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
    display: "flex",
    backgroundColor: cardColor,
    justifyContent: "center",
    alignSelf: 'stretch',
    alignItems: "center",
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
    color: "#636e72" 
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
    color: '#fff'
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
    flex: 11
  },
  searchBoxIcon: {
    flex: 1,
  }

});

