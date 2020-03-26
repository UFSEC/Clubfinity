import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet } from 'react-native';
import { club } from '../assets/styles/stylesheet';
import EventsApi from '../api/EventsApi';
import DashboardButton from "../components/DashboardButton";
import UserContext from "../util/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  heading: {
    marginTop: 30,
    marginBottom: 40,
  },
  middleButton: {
    marginTop: 12,
    marginBottom: 12
  },
  body:{
    fontSize: 18,
    margin: 10,
    marginBottom: 24,
    marginTop: 24,
  },
});

// Event Feed App Module
class HomeScr extends Component {
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
        <View style={{marginTop: 8}}>
          <Text style={club.title}>Club name</Text>
        </View>
        <View style={styles.heading}>
          <Text><Text style={styles.body}>Admin</Text><Text style={[styles.body, {color: '#7e947f'}]}> Panel</Text></Text>
        </View>
        <DashboardButton text='Edit Club Information' onPress={() => {}} />
        <View style={styles.middleButton}>
          <DashboardButton text='Edit Admins' onPress={() => {}} />
        </View>
        <DashboardButton text='Add Post' onPress={() => {}} />
      </View>
    );
  }
}

export default HomeScr;
