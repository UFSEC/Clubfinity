import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  createClubBtn: {
    display: 'flex',
    // flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

class CreateClubButton extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.createClubBtn}>
        <FontAwesome.Button
          name="edit"
          color="#2980b9"
          backgroundColor="#fff"
          style={{ alignSelf: 'center' }}
          onPress={() => {
            navigation.navigate({ routeName: 'ClubCreationScr' });
          }}
        >
          <Text style={{ color: '#2980b9', paddingRight: 5 }}>Create Club</Text>
        </FontAwesome.Button>
      </View>
    );
  }
}

export default CreateClubButton;
