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
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API } from '../util/API';
import clubList from '../assets/images/clubimages/FetchImage'

// This isn't arbitrary and is instead depends on padding/margin b/w cards. Must be made a constant one design finalized!
const GRID_ITEM_WIDTH = Dimensions.get('screen').width / 2 - 22;


export default class DiscoverGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      clubs: '',
      filteredClubs: '',
      errorMessage:'',
      clubList:clubList,
      isLoading: true
    }
  }
  async componentDidMount(){
    // event.preventDefault();
  
    try {
      
      let response = await API.get('/api/club');
      let { data } = response.data;
      this.setState({
        clubs: data,
        filteredClubs: data,
        isLoading: false
      });
     
    } catch (error) {
      console.error(error);
    }

  
  };

  handleClubSelect = () => {
    console.log("Clubs tapped boi");
    this.props.navigation.navigate('Club');
  }

  filterClubs = (text) => {
    searchText = text.toLowerCase();
  
    newFilterClubs = this.state.clubs.filter((club) => {
      return club.major_of_interest.toLowerCase().includes(searchText);
      console.log(club)
    }); 

    this.setState({
      searchText: text,
      filteredClubs: newFilterClubs
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    const clubFilterImage = this.state.clubList;
   
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
              // This retrieves the first instance of the club based on name if in Image File
                source={{
                  uri: clubFilterImage.filter(user => {
                    return user.name == item.name
                    })[0].src,
                 
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
          keyExtractor={(item) => item._id}
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
    elevation: 2,

  },
  gridImage: {
    flex: 4,
    margin: 0,
    height: 100,
    width: GRID_ITEM_WIDTH, 
    borderWidth: 1,
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

