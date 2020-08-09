import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { card } from '../assets/styles/stylesheet';
import GoingButton from './GoingButton';
import NotGoingButton from './NotGoingButton';
import SECIcon from '../assets/images/sec-icon.png';

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
      <View style={containerStyle}>
        <View style={card.banner}>
          <Image style={card.bannerIcon} source={SECIcon} />
          <Text style={card.title}>{name}</Text>
        </View>
        <View style={card.body}>
          <Text style={card.location}>{location}</Text>
          <Text style={card.bodyText}>{description}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <NotGoingButton
              clickHandler={this.notGoingHandler}
              name="Not Going"
              btnColor="#ff8080"
            />
            <GoingButton
              clickHandler={this.goingBtnHandler}
              name="Going"
              btnColor="#16a085"
            />
          </View>
        </View>
      </View>
    );
  }
}
