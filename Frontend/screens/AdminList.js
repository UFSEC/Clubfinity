import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Text,
  Header,
  Button,
  Thumbnail,
  H2,
  ListItem,
  Content,
  Left,
  Right,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DefaultPic from '../assets/images/profile-icon.png';

export default class AdminList extends React.Component {
    static navigationOptions = {
      headerTitle: 'Admins',
      headerStyle: { backgroundColor: '#7e947f' },
      headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
      headerTintColor: 'white',
    };

    constructor() {
      super();
      this.state = {
        admins: [{ name: 'Firstname Lastname' }, { name: 'Firstname Lastname' }],
      };
    }

    render() {
      const { admins } = this.state;
      return (
        <Container>
          <Header>
            <Left>
              <H2 style={{ marginLeft: 10 }}>Admins</H2>
            </Left>
            <Right>
              <Button transparent>
                <Ionicons
                  name="md-add"
                  size={20}
                  style={{ paddingTop: '7%' }}
                />
              </Button>
            </Right>
          </Header>
          <Content style={{ margin: 10 }}>
            <FlatList
              data={admins}
              renderItem={({ item }) => (
                <ListItem noIndent>
                  <Left>
                    <Thumbnail size={5} source={DefaultPic} />
                    <Text style={{ fontSize: 20, margin: 10 }}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Ionicons
                      name="md-arrow-forward"
                      size={20}
                      style={{ paddingTop: '7%' }}
                    />
                  </Right>
                </ListItem>
              )}
              keyExtractor={(item) => item.name}
            />
          </Content>
        </Container>
      );
    }
}
