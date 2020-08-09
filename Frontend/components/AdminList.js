import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AdminCard from './AdminCard';

// ------styleSheet-------//
const styles = StyleSheet.create({
  noAdminsTextContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminListContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    backgroundColor: '#93AA93',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    padding: 15,
  },
  topBarText: {
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
    flex: 11,
  },
  searchBoxIcon: {
    flex: 1,
  },
  floatingButton: {
    // Layout
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // Size
    width: 70,
    height: 70,
    // Position
    position: 'absolute',
    bottom: 20,
    right: 20,
    // Styling w/ shadows
    backgroundColor: '#93AA93',
    borderRadius: 100,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
  },
  floatingButtonText: {
    fontSize: 30,
    color: 'white',
    paddingBottom: 2,
  },
});

// Dummy data - list of admins
const adminData = [
  {
    // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    firstName: 'John',
    lastName: 'LastName',
    position: 'Position',
    image: '',
  },
  {
    // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    firstName: 'Elon',
    lastName: 'LastName',
    position: 'Position',
    image: '',
  },
  {
    // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    firstName: 'Mark',
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

// Actual Admin List - displays all the admins
export class AdminList extends Component {
  /* Top navBar with AdminList */
  static navigationOptions = {
    title: 'Admin List',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredAdmins: adminData,
    };
  }

  // Function to display if no admins have been added
  noAdminsView = () => (
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
  )

  filterAdmins(text) {
    const searchText = text.toLowerCase();
    const newFilterAdmins = adminData.filter((admin) => admin.firstName.toLowerCase().includes(searchText)
    || admin.lastName.toLowerCase().includes(searchText));

    this.setState({
      filteredAdmins: newFilterAdmins,
    });
  }

  // Function to display admins w/ image and name
  adminListView() {
    const { filteredAdmins } = this.state;

    return (
      <SafeAreaView style={styles.adminListContainer}>
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons style={styles.searchBoxIcon} color="#8E8E93" name="md-search" size={24} />
          <TextInput
            style={styles.searchBoxText}
            placeholderTextColor="#8E8E93"
            placeholder="Search Admins"
            onChangeText={(text) => this.filterAdmins(text)}
          />
        </View>

        {/* List of admins */}
        <FlatList
          data={filteredAdmins}
          renderItem={({ item }) => (
            <AdminCard
              firstName={item.firstName}
              lastName={item.lastName}
              position={item.position}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        {/* Floating button */}
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }

  // ------Renders Interface-------//
  render() {
    // add conditional statements

    // if(noAdmins)
    //   return this.noAdminsView()
    // else
    return this.adminListView();
  }
}

export default AdminList;
