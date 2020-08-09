import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';

// ------styleSheet-------//
const styles = StyleSheet.create({
  adminCard: {
    backgroundColor: 'white', // #f9c2ff
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 75 / 2,
    overflow: 'hidden',
    padding: 5,
    backgroundColor: 'lightgray',
  },
  cardText: {
    // for padding, etc.
    justifyContent: 'center',
    paddingLeft: 10,
  },
  nameStyle: {
    // to customize text, font, etc.
    fontSize: 15,
  },
  positionStyle: {
    fontSize: 15,
    color: 'gray',

  },
});

export default class AdminCard extends Component {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }

  render() {
    const { firstName, lastName, position } = this.props;

    return (
      <View style={styles.adminCard}>
        <Image
            // source={require('./assets/splash.png')}      standard
            // source={require(image)}                      using data from admin
          style={styles.cardImage}
        />
        <View style={styles.cardText}>
          <Text style={styles.nameStyle}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.positionStyle}>{position}</Text>
        </View>

      </View>
    );
  }
}
