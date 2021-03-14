import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container, Content, List
} from 'native-base';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';
import SettingsListItem from '../components/SettingsListItem';

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
              onPress={() => navigation.navigate('EditProfileScr')}
              icon="md-person"
              label="Edit Profile"
            />
            <SettingsListItem
              onPress={() => navigation.navigate('ClubCreationScr')}
              icon="md-create"
              label="Create a Club"
            />
            <SettingsListItem
              onPress={() => navigation.navigate('ReportBugScr')}
              icon="md-bug"
              label="Report a Bug"
            />
            <SettingsListItem
              onPress={() => this.signOut()}
              icon="md-log-out"
              label="Logout"
            />
          </List>
        </Content>
      </Container>
    );
  }
}
