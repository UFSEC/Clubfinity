import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { post } from '../assets/styles/stylesheet';

export default class Post extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }

  render() {
    const { header, description } = this.props;
    return (
      <View style={post.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '400',
              paddingHorizontal: 0,
              marginLeft: 5,
            }}
            >
              {header}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={{
              fontSize: 9,
              fontWeight: '200',
              paddingHorizontal: 0,
              marginLeft: 5,
            }}
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
