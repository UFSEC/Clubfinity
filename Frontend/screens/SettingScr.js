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
