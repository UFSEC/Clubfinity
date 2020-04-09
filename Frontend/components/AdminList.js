import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, TextInput} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//Dummy data - list of admins
const adminData = [
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
    {
      // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      firstName: 'FirstName',
      lastName: 'LastName',
      position: 'Position',
      image: '', 
    },
   
    
  ];

//AdminCard component - displays text and image
function AdminCard({ firstName, lastName, position, image }) {
    return (
      <View style={styles.adminCard}>
        <Image 
            // source={require('./assets/splash.png')}      standard 
            // source={require(image)}                      using data from admin
            style={styles.cardImage}
        />
        <View style={styles.cardText}>
          <Text style={styles.nameStyle}>{firstName + " " + lastName}</Text>
          <Text style={styles.positionStyle}>{position}</Text>
        </View>
        
      </View>
    );
  }

//Actual Admin List - displays all the admins
export class AdminList extends Component {
    
    //Function to display if no admins have been added
    noAdminsView() {
        return (
          <SafeAreaView style={styles.adminListContainer}>
            
            {/* Fixed top navBar */}
            <View style={styles.topBar}>
              <Text style={styles.topBarText}>Admin List</Text>
            </View>

            <View style={styles.noAdminsTextContainer}>
              <Text> No Admins added.</Text>
            </View>

            {/* Floating button */}
            <TouchableOpacity style={styles.floatingButton}>
              <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>

        </SafeAreaView>
        );
      }

    //Function to display admins w/ image and name
    adminListView(){
        return(
            <SafeAreaView style={styles.adminListContainer}>
                {/* Fixed top navBar */}
                <View style={styles.topBar}>
                    <Text style={styles.topBarText}>Admin List</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBox}>
                    <Ionicons style={styles.searchBoxIcon} color={'#8E8E93'} name={"md-search"} size={24} />
                    <TextInput
                        style={styles.searchBoxText}
                        placeholderTextColor={'#8E8E93'}
                        placeholder="Search Admins"
                    ></TextInput>
                </View>
                
                {/* List of admins */}
                <FlatList
                    data={adminData}
                    renderItem={({ item }) => <AdminCard firstName={item.firstName} lastName={item.lastName} position={item.position} image={item.image} />}
                    keyExtractor={item => item.id}
                />
            
                {/* Floating button */}
                <TouchableOpacity style={styles.floatingButton}>
                    <Text style={styles.floatingButtonText}>+</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }






    //------Renders Interface-------//
    render() {
      //add conditional statements

      // if(noAdmins)
      //   return this.noAdminsView()
      // else
      return this.adminListView();
    }

}


//------styleSheet-------//
const styles = StyleSheet.create({
  noAdminsTextContainer:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminListContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar:{
    backgroundColor: '#93AA93',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 5,
    padding: 15,
  },
  topBarText:{
    fontSize: 22, 
    fontWeight: 'bold',
    color: 'white', 
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
    marginVertical: 5,
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
  adminCard: {
    backgroundColor: 'white', //#f9c2ff
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 75/2,
    overflow: "hidden",
    padding: 5,
    backgroundColor: 'lightgray'
  },
  cardText:{
    // for padding, etc.
    justifyContent: 'center', 
    paddingLeft: 10,
  },
  nameStyle: {
    //to customize text, font, etc. 
    fontSize: 15,
  },
  positionStyle:{
    fontSize: 15,
    color: 'gray',

  },
  floatingButton: {
    //Layout 
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    //Size
    width:70,
    height:70,
    //Position
    position: 'absolute',                                          
    bottom: 20,                                                    
    right: 20,
    //Styling w/ shadows
    backgroundColor: '#93AA93',
    borderRadius: 100, 
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: .3,
    shadowOffset: {width: 0, height: 0},
  },
  floatingButtonText:{
    fontSize: 30,
    color: 'white',
    paddingBottom: 2
  },
})

export default AdminList; 
