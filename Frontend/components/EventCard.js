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

const styles = StyleSheet.create({
  clubname: {
    color: colors.secondary2,
  },
  date: {
    color: colors.sucess,
    flex: 1,
    textAlign: 'right',
    fontSize: 23,
  },
  location: {
    color: colors.sucess,
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
      mute: false,
      going: false,
      interested: false,
    };
  }

  muteHandler = () => {
    const { mute } = this.state;
    this.setState({
      mute: !mute,
    });
    if (!mute) {
      this.setState(
        {
          going: false,
          interested: false,
        },
      );
    }
  };

  goingHandler = async () => {
    const { going } = this.state;
    await this.setState({
      going: !going,
    });
    if (!going) {
      this.setState({
        mute: false,
      });
    }
  }

  interestedHandler = () => {
    const { interested } = this.state;
    this.setState({
      interested: !interested,
    });
    if (!interested) {
      this.setState({
        mute: false,
      });
    }
  }

  render() {
    const {
      name,
      location,
      description,
    } = this.props;
    const {
      mute,
      going,
      interested,
    } = this.state;
    const {
      mutedContainer, bodyText, date, clubname,
    } = styles;
    const {
      container, title, bannerIcon, banner, body,
    } = card;
    const containerStyle = mute ? mutedContainer : container;
    return (
      <Card style={containerStyle}>
        <View style={banner}>
          <Image style={bannerIcon} source={SECIcon} />
          <View>
            <Text style={title}>
              {' '}
              {name}
            </Text>
            <Text style={clubname}> ClubName</Text>
          </View>
          <Text style={date}>Oct 22</Text>
        </View>
        <View style={body}>
          <Text style={styles.location}>
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
            <GoingButton
              clickHandler={this.goingHandler}
              isGoing={going}
            />
            <InterestedButton
              clickHandler={this.interestedHandler}
              isInterested={interested}
            />
            <MuteButton
              clickHandler={this.muteHandler}
              isMuted={mute}
            />
          </View>
        </View>
      </Card>
    );
  }
}
