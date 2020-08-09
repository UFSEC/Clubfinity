import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, Text, View, StyleSheet, Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    width,
  },
  innerContainer: {
    padding: 12,
    borderBottomColor: '#636e72',
    borderBottomWidth: 1,
    flexDirection: 'row',
    fontSize: 40,
  },
  textStyle: {
    marginLeft: 20,
    fontSize: 17,
    letterSpacing: 2,
    color: '#636e72',
  },
});

class Preferences extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  render() {
    const { navigation, signOut } = this.props;

    return (
      <View style={styles.container} bounces={false}>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => {
            navigation.navigate({ routeName: 'Edit' });
          }}
        >

          <FontAwesome color="#636e72" size={24} name="edit" />
          <Text style={styles.textStyle}>
            Edit Profile
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => {
            navigation.navigate({ routeName: 'Setting' });
          }}
        >
          <FontAwesome color="#636e72" size={24} name="cog" />
          <Text style={styles.textStyle}>
            Settings
          </Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.innerContainer}>
          <FontAwesome color="#636e72" size={24} name="flag" />
          <Text style={styles.textStyle}>
            Report a Problem
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => {
            navigation.navigate({ routeName: 'ClubCreationScr' });
          }}
        >
          <FontAwesome color="#636e72" size={24} name="plus" />
          <Text style={styles.textStyle}>
            Create a Club
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.innerContainer} onPress={signOut}>
          <FontAwesome color="#636e72" size={24} name="sign-out" />
          <Text style={styles.textStyle}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Preferences);
