import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Card } from 'native-base';
import { card, primary } from '../assets/styles/stylesheet';
import NotGoingButton from './NotGoingButton';
import SECIcon from '../assets/images/sec-icon.png';
import colors from '../util/colors';

const styles = StyleSheet.create({
  clubname: {
    color: colors.accent2,
  },
  date: {
    color: 'teal',
    flex: 1,
    textAlign: 'right',
    fontSize: 23,
  },
  location: {
    color: 'teal',
    fontWeight: '700',
    marginLeft: '2%'
  },
  bodyText: {
    color: primary.bodyText.color,
    fontSize: primary.bodyText.fontSize,
    marginLeft: '2%'
  },
});

export default class EventCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      goingChecked: false,
    };
  }

  // Change card style if 'Going' clicked || remove if Not going
  goingBtnHandler = () => {
    const { goingChecked } = this.state;
    this.setState({
      goingChecked: !goingChecked,
    });
  };

  notGoingHandler = () => {};

  goingHandler = () => {}

  interestedBtnHandler = () => {}

  render() {
    const { name, location, description } = this.props;
    const containerStyle = card.container;
    return (
      <Card style={containerStyle}>

        <View style={card.banner}>
          <Image style={card.bannerIcon} source={SECIcon} />
          <View>
            <Text style={card.title}>
              {' '}
              {name}
            </Text>
            <Text style={styles.clubname}> ClubName</Text>
          </View>
          <Text style={styles.date}>Oct 22</Text>
        </View>
        <View style={card.body}>
          <Text style={styles.location}>
            {location}
          </Text>
          <Text style={styles.bodyText}>{description}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}
          >
              <FontAwesome.Button
                name="check-square-o"
                backgroundColor="#16a085"
                onPress={this.goingHandler}
              >
                Going
              </FontAwesome.Button>
            <Ionicons.Button
              name="ios-star-outline"
              backgroundColor="#50adf9"
              onPress={this.interestedBtnHandler}
            >
              Interested
            </Ionicons.Button>
            <NotGoingButton
              clickHandler={this.notGoingHandler}
              name="Not Going"
              btnColor="#ff8080"
            />
          </View>
        </View>
      </Card>
    );
  }
}
