import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { club } from '../assets/styles/stylesheet';
import UserContext from "../util/UserContext";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const MAX_FIELD_WIDTH = (Dimensions.get("screen").width * 3) / 4;
const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: STATUS_BAR_HEIGHT,
    flex: 1,
    display: "flex",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  heading: {
    marginTop: 30,
    marginBottom: 40,
  },
  middleButton: {
    marginTop: 15,
    marginBottom: 15
  },
  body:{
    fontSize: 18,
    margin: 10,
    marginBottom: 24,
    marginTop: 24,
  },
  flexbox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '100%',
  },
  button: {
    minWidth: MAX_FIELD_WIDTH,
    padding: 10,
    backgroundColor: "#7e947f",
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3
  },
  buttonText: {
    fontSize: 15,
    alignSelf: "center",
    color: "#fff"
  }
});

// Event Feed App Module
class AdminDashboard extends Component {
  static contextType = UserContext;

  static navigationOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={club.title}>{props.clubName}</Text>
        </View>
        <View style={styles.heading}>
          <Text><Text style={styles.body}>Admin</Text><Text style={[styles.body, {color: '#7e947f'}]}> Panel</Text></Text>
        </View>
        <View style={styles.flexbox}>
          <TouchableOpacity
            style={styles.button}
            onPress={e => {}}
          >
            <Text style={styles.buttonText}>Edit Club Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={e => {}}
          >
            <Text style={styles.buttonText}>Edit Admins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={e => {}}
          >
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AdminDashboard;
