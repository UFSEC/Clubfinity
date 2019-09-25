import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Dummy list of clubs
const clubList = [
  {
    id: 0,
    name: "SEC",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 1,
    name: "ACM",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 2,
    name: "ACE",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 3,
    name: "WiCSE",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 4,
    name: "WECE",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 5,
    name: "GatorTech",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 6,
    name: "SEC",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 7,
    name: "ACM",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 8,
    name: "ACE",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 9,
    name: "WiCSE",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 10,
    name: "WECE",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
  {
    id: 11,
    name: "GatorTech",
    category: "Computer Science",
    src: "../assets/images/sec-icon.png",
  },
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
              <Text>{item.name}</Text>
              <Text>{item.category}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

    );
  }
};

// Style definitions
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    // paddingTop: 40,
  },
  scrollContainer: {
    flex: 1,
    margin: 1,
    paddingHorizontal: 10,
    minWidth: Dimensions.get("screen").width
  },
  gridItem: {
    flex: 1,
    minWidth: 150,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    backgroundColor: '#E5E4EA',
    padding: 10,
    elevation: 2
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
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

