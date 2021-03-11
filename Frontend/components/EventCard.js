import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Card } from 'native-base';
import { card, primary } from '../assets/styles/stylesheet';
import MuteButton from './MuteButton';
import SECIcon from '../assets/images/sec-icon.png';
import colors from '../util/colors';
import GoingButton from './GoingButton';
import InterestedButton from './InterestedButton';
import EventsApi from '../api/EventsApi';
import { formatToMonthAndDay } from '../util/dateUtil';
import { cancelNotification, scheduleNotification } from '../util/localNotifications';

const styles = StyleSheet.create({
  clubNameText: {
    color: colors.text,
  },
  dateText: {
    color: colors.text,
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
  },
  locationText: {
    color: colors.text,
    fontWeight: '700',
    marginLeft: '2%',
  },
  bodyText: {
    color: primary.bodyText.color,
    fontSize: primary.bodyText.fontSize,
    marginLeft: '2%',
  },
  mutedContainer: {
    backgroundColor: '#c2c3c4',
    padding: 15,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#c2c3c4',
    borderRadius: 5,
    borderWidth: 4,
    elevation: 2,
  },
  titleText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 5,
  },
});

export default class EventCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    date: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    goingUsers: PropTypes.array.isRequired,
    uninterestedUsers: PropTypes.array.isRequired,
    interestedUsers: PropTypes.array.isRequired,
    eventID: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      uninterestedUsers, goingUsers, interestedUsers, userId,
    } = this.props;
    this.state = {
      mute: uninterestedUsers.includes(userId),
      going: goingUsers.includes(userId),
      interested: interestedUsers.includes(userId),
    };
  }

  muteHandler = async () => {
    const { mute } = this.state;
    this.setState({
      mute: !mute,
    });
    const { eventID } = this.props;
    if (!mute) {
      this.setState(
        {
          going: false,
          interested: false,
        },
      );
      await EventsApi.addUninterestedUser(eventID);
    } else await EventsApi.removeUninterestedUser(eventID);
  };

  goingHandler = async () => {
    const { going } = this.state;
    const {
      name, date, eventID, userId,
    } = this.props;
    this.setState({
      going: !going,
    });
    if (!going) {
      this.setState({
        mute: false,
        interested: false,
      });
      await EventsApi.addGoingUser(eventID);
      await scheduleNotification(name, date, eventID, userId);
    } else {
      await EventsApi.removeGoingUser(eventID, userId);
      await cancelNotification(eventID, userId);
    }
  }

  interestedHandler = async () => {
    const { interested } = this.state;
    const {
      name, date, eventID, userId,
    } = this.props;
    this.setState({
      interested: !interested,
    });
    if (!interested) {
      this.setState({
        mute: false,
        going: false,
      });
      await EventsApi.addInterestedUser(eventID);
      scheduleNotification(name, date, eventID, userId);
    } else {
      await EventsApi.removeGoingUser(eventID, userId);
      cancelNotification(eventID, userId);
    }
  }

  render() {
    const {
      name,
      location,
      description,
      clubName,
      date,
    } = this.props;
    const { mute, going, interested } = this.state;
    const {
      mutedContainer, bodyText, dateText, clubNameText, titleText, locationText,
    } = styles;
    const {
      container, bannerIcon, banner, body,
    } = card;
    const containerStyle = mute ? mutedContainer : container;

    return (
      <Card style={containerStyle}>
        <View style={banner}>
          <Image style={bannerIcon} source={SECIcon} />
          <View>
            <Text style={titleText}>
              {' '}
              {name}
            </Text>
            <Text style={clubNameText}>{clubName}</Text>
          </View>
          <Text style={dateText}>{formatToMonthAndDay(date)}</Text>
        </View>
        <View style={body}>
          <Text style={locationText}>
            {location}
          </Text>
          <Text style={bodyText}>{description}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}
          >
            <GoingButton clickHandler={this.goingHandler} isGoing={going} />
            <InterestedButton
              clickHandler={this.interestedHandler}
              isInterested={interested}
            />
            <MuteButton clickHandler={this.muteHandler} isMuted={mute} />
          </View>
        </View>
      </Card>
    );
  }
}
