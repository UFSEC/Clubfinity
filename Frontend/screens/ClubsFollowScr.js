import React from 'react';
import { StyleSheet, View } from 'react-native';

import ClubsFollowGrid from '../components/ClubsFollowGrid';

const styles = StyleSheet.create({
  formVal: {
    maxWidth: 600,
    backgroundColor: '#F2F2F7',
  },
});

export default class ClubsFollowScr extends React.Component {
  render() {
    return (
      <View styles={styles.formVal}>
        <ClubsFollowGrid />
      </View>
    );
  }
}
