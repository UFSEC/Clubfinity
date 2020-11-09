import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Card } from 'native-base';
import { card } from '../assets/styles/stylesheet';
import NotGoingButton from './NotGoingButton';
import SECIcon from '../assets/images/sec-icon.png';

const styles = StyleSheet.create({

  interestedButton: {
    marginLeft: 5,
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

  render() {
    const { goingChecked } = this.state;
    const { name, location, description } = this.props;
    const containerStyle = goingChecked ? card.goingMarked : card.container;
    // const iconImagePath = `../assets/images/${this.props.data.icon}`;
    return (
      <Card style={containerStyle}>

        <View style={card.banner}>
          <Image style={card.bannerIcon} source={SECIcon} />
          <View>
            <Text style={card.title}>
              {' '}
              {name}
            </Text>
            <Text style={card.clubname}> ClubName</Text>
          </View>
        </View>
        <View style={card.body}>
          <Text style={card.location}>
            Oct 22
            {'   '}
            {location}
          </Text>
          <Text style={card.bodyText}>{description}</Text>
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
              onPress={this._eventHandler}
            >
              Going
            </FontAwesome.Button>

            <Ionicons.Button style={styles.interestedButton} name="ios-star-outline" backgroundColor="#50adf9">
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
