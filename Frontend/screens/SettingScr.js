import React from 'react';
import { View, AsyncStorage } from 'react-native';
import {
  Text, Container, Content, List, ListItem,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

class SettingsListItem extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired 
  };

  render() {
    const { onPress, label, icon } = this.props;
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
  }
}

export default class SettingScr extends React.Component {
  static navigationOptions = buildNavigationsOptions('Settings')

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <List>
            <SettingsListItem
              onPress={e => navigation.navigate('EditProfileScr')}
              label="md-person"
              icon="Edit Profile"
            />
            <SettingsListItem
              onPress={() => navigation.navigate('ClubCreationScr')}
              label="md-create"
              icon="Create a Club"
            />
            <SettingsListItem
              onPress={() => navigation.navigate('ReportBugScr')}
              label="md-bug"
              icon="Report a Bug"
            />
            <SettingsListItem
              onPress={() => this.signOut()}
              label="md-log-out"
              icon="Logout"
            />
          </List>
        </Content>
      </Container>
    );
  }
}
