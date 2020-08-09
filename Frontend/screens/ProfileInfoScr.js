import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserContext from '../util/UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    position: 'relative',
    marginLeft: 1,
    marginRight: 1,

    marginTop: 5,
    marginBottom: 5,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 4,
    elevation: 3,
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginBottom: 15,
    paddingBottom: 20,
    marginTop: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2980b9',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: '500',
  },
  option: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSubheading: {
    alignSelf: 'flex-start',
    marginTop: 5,
    letterSpacing: 2,
    color: '#636e72',
  },
});

export default class ProfileInfoScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
  };

  static contextType = UserContext;

  render() {
    const { user } = this.context;
    return (
      <View style={styles.container}>
        {user && (
          <Text style={styles.textSubheading}>
            <Text style={{ fontWeight: 'bold' }}>Major:</Text>
            {' '}
            {user.major}
          </Text>
        )}
        {user && (
          <Text style={styles.textSubheading}>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text>
            {' '}
            {user.email}
          </Text>
        )}
        {user && (
          <Text style={styles.textSubheading}>
            <Text style={{ fontWeight: 'bold' }}>Class Year:</Text>
            {' '}
            {user.year}
          </Text>
        )}
        {user && (
          <Text style={styles.textSubheading}>
            <Text style={{ fontWeight: 'bold' }}>Interests:</Text>
            {' '}
            I love to
            code
          </Text>
        )}
      </View>
    );
  }
}
