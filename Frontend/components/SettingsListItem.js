import React from 'react';
import { View } from 'react-native';
import { Text, ListItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class SettingsListItem extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    const { onPress, label, icon } = this.props;

    return (
      <ListItem
        button
        onPress={onPress}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Ionicons
              name={icon}
              size={20}
              style={{ paddingRight: '2%' }}
            />
            <Text>{label}</Text>
          </View>
          <Ionicons name="md-arrow-dropright" size={30} />
        </View>
      </ListItem>
    );
  }
}
