import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { smCard } from '../assets/styles/stylesheet';
import { FontAwesome, Octicons, Ionicons, Entypo } from '@expo/vector-icons';

export default class SmallEventCard extends Component {
    constructor(props) {
        super(props);
      }

  render() {
    const data = this.props.data;
    return (
    <View style={smCard.container}>
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text style={{ fontSize: 20, fontWeight: '600', paddingHorizontal: 0, 
                  marginTop: 10, marginLeft: 10, marginBottom: 20 }}>{data.name}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 10, marginLeft: 10 }}>{data.date}</Text>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', marginTop: 10, marginStart: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', paddingHorizontal: 0 }}>{data.time}</Text>
                    <Text style={{fontSize: 15, fontWeight: '400', paddingHorizontal: 10}}>{data.location}</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', marginStart: 10, marginTop: 5 }}>
                    <Octicons name="chevron-right" size={24}/>
                </View>
            </View>
        </View>
    </View>

);
  }
}