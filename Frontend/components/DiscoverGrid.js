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

// import { window } from '../constants/Layout';

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
    newFilterClubs = clubList.filter((club) => {
      return club.name.includes(text);
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
        <TextInput
          style={{ height: 50, paddingHorizontal: 20 }}
          placeholder="Explore clubs"
          onChangeText={(text) => this.filterClubs(text)}
          value={this.state.searchText}
        ></TextInput>
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
    minWidth: Dimensions.get("screen").width
  },
  gridItem: {
    flex: 1,
    minWidth: 150,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    backgroundColor: '#fcf8de',
    padding: 10,
    elevation: 2
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

});

