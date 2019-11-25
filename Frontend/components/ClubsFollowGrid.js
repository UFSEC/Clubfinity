import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Button

} from 'react-native';

import { Ionicons } from '@expo/vector-icons';


const GRID_ITEM_WIDTH = Dimensions.get('screen').width / 1.1


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
  
  }
]

 

export default class DiscoverGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filteredClubs: clubList,
      editButton: true
    }
    // this.editButtonHandler = this.editButtonHandler.bind(this);
  }

  
  handleClubSelect = () => {
    console.log("Clubs tapped boi");
  }
  notGoingHandler = () => {
  }
  removeHandler = () => {
    console.log("Clicked")
    console.log(this.state.editButton)
  }
  editButtonHandler = () => {
    if(this.state.editButton){
      this.setState({editButton:false});
    }else{
      this.setState({editButton:true});
    }
    console.log(this.state.editButton)
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
           <View >
              <Button 	style={styles.button}
				      onPress={this.editButtonHandler}  title="Edit" />
                
          </View>
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
                style={styles.photo}
                resizeMode={"cover"}
              />
              <View style={styles.gridSubheading}>
                <Text color={item.categoryColor} style={styles.clubName}>{item.name}</Text>
                <Text style={styles.clubCategory}>{item.category}</Text>
              </View>
           
              <View >
              {this.state.editButton && <Button 	style={styles.button}
              onPress={this.removeHandler} color={'red'} title="Remove" /> }
           
            
          </View>
            </TouchableOpacity>
          )}
          numColumns={1}
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
    alignItems: 'center',
    flex: 1,
    backgroundColor: bgColor
  },
  photo: {
    height: '70%',
    width: '30%',
    borderRadius: 53,
    marginLeft:10
    
  },
  scrollContainer: {
    flex: 1,
    margin: 1,
    paddingHorizontal: 10,
    
    minWidth: GRID_ITEM_WIDTH
  },
  gridItem: {
    display: "flex",
    flexDirection: "row",
    flex: 0.30,
    minWidth: GRID_ITEM_WIDTH,
    maxWidth: GRID_ITEM_WIDTH,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
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
  },
  button: {
    backgroundColor: '#FFFF',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15       
 }

});

