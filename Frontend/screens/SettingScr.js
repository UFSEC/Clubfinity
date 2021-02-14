import React from 'react';
import { View, AsyncStorage } from 'react-native';
import {
  Text, Container, Content, List, ListItem,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

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
            <ListItem
              button
              onPress={() => navigation.navigate('EditProfileScr')}
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
                    name="md-person"
                    size={20}
                    style={{ paddingRight: '2%' }}
                  />
                  <Text>Edit Profile</Text>
                </View>
                <Ionicons name="md-arrow-dropright" size={30} />
              </View>
            </ListItem>
            <ListItem
              button
              onPress={() => navigation.navigate('ClubCreationScr')}
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
                    name="md-create"
                    size={20}
                    style={{ paddingRight: '2%' }}
                  />
                  <Text>Create a Club</Text>
                </View>
                <Ionicons name="md-arrow-dropright" size={30} />
              </View>
            </ListItem>
            <ListItem
              button
              onPress={() => navigation.navigate('ReportBugScr')}
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
                    name="md-bug"
                    size={20}
                    style={{ paddingRight: '2%' }}
                  />
                  <Text>Report a bug</Text>
                </View>
                <Ionicons name="md-arrow-dropright" size={30} />
              </View>
            </ListItem>
            <ListItem button onPress={() => this.signOut()}>
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
                    alignSelf: 'flex-end',
                  }}
                >
                  <Ionicons
                    name="md-log-out"
                    size={20}
                    style={{ paddingRight: '2%', paddingVertical: '1.5%' }}
                  />
                  <Text>Logout</Text>
                </View>
              </View>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
