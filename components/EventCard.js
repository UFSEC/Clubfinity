import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { card } from '../assets/styles/stylesheet';
import { GoingButton } from './GoingButton';
import { NotGoingButton } from './NotGoingButton';

export default class EventCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goingChecked: false,
      hideCard: false
    }
  }

  // Change card style if 'Going' clicked || remove if Not going
  goingBtnHandler = () => {
    this.setState({
      goingChecked: !this.state.goingChecked
    });
  }

  notGoingHandler = () => {
  }


  render() {
    const data = this.props.data;
    const containerStyle = this.state.goingChecked ? card.goingMarked : card.container;
    return (
      <View style={containerStyle}>
        <View style={card.banner}>
          <Image style={card.bannerIcon} source={require('../assets/images/sec-icon.png')} />
          <Text style={card.title}>{data.name}</Text>
        </View>
        <View style={card.body}>
          <Text style={card.location}>{data.place}</Text>
          <Text style={card.bodyText}>{data.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <NotGoingButton clickHandler={this.notGoingHandler} name={'Not Going'} btnColor={'#ff8080'} />
            <GoingButton clickHandler={this.goingBtnHandler} name={'Going'} btnColor={'#16a085'} />
          </View>
        </View>
      </View>
    );
  }

}

