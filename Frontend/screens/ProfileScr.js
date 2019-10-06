import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { card } from '../assets/styles/stylesheet';
import { FontAwesome } from '@expo/vector-icons';


export default class ProfileScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  _eventHandler = () => {
    console.log('Stuff has been clicked boi');
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.profileHeader}>
          <Image style={[card.bannerIcon, { flex: 1 }]} source={require('../assets/images/profile-icon.png')} />
          <Text style={style.profileTitle}>Flash Gordon</Text>
        </View>
        <View style={style.settingsContainer}>
          <TouchableOpacity onPress={this._eventHandler} style={style.settingTile}>
            <FontAwesome style={style.settingsIcon} name="edit" size={18} color="#4F8EF7" />
            <Text style={style.settingsText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._eventHandler} style={[style.settingTile]}>
            <FontAwesome style={style.settingsIcon} name="location-arrow" size={18} color="#4F8EF7" />
            <Text style={style.settingsText}>Change Location</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._eventHandler} style={[style.settingTile]}>
            <FontAwesome style={style.settingsIcon} name="bookmark-o" size={18} color="#4F8EF7" />
            <Text style={style.settingsText}>Pinned Clubs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._eventHandler} style={[style.settingTile]}>
            <FontAwesome style={style.settingsIcon} name="bell-o" size={18} color="#4F8EF7" />
            <Text style={style.settingsText}>Notification Settings</Text>
          </TouchableOpacity>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome.Button
              name="sign-out"
              backgroundColor="#ff8080"
              onPress={this._eventHandler}
            >Logout</FontAwesome.Button>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  profileHeader: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
  },

  profileTitle: {
    fontSize: 20,
    // alignSelf: 'center',
    fontWeight: 'bold',
    color: '#636e72',
    flex: 5
  },

  settingsContainer: {
    flex: 4,
    // justifyContent: 'space-evenly',
  },

  settingTile: {
    margin: 0,
    elevation: 0,
    backgroundColor: '#f5f6fa',
    padding: 15,
    margin: 1,
    borderWidth: 1,
    borderColor: "#f5f6fa",
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  settingsText: {
    flex: 11,
    color: '#636e72',
    fontSize: 15,
  },

  settingsIcon: {
    flex: 1,
    marginRight: 5,
  }
})
