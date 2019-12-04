import React, { Component } from 'react';
import { Text, View, Image, Badge } from 'react-native';
import PropTypes from 'prop-types';
import { post } from '../assets/styles/stylesheet';
import { Platform, RoundButton } from 'react-native';
import { validate } from '@babel/types';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
      }

  render() {
    const data = this.props.data;
    return (
    <View style={post.container}>
        <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={{ fontSize: 14, fontWeight: '400', paddingHorizontal: 0, 
                    marginLeft: 5}}>{data.header}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <Text style={{ fontSize: 9, fontWeight: '200', paddingHorizontal: 0,
                     marginLeft: 5}}>{data.fullPost}</Text>
            </View>
        </View>
        </View>
    );
  }
}