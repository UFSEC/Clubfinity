import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
  Container,
  Text,
  Thumbnail,
  ListItem,
  Content,
  Left,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DefaultPic from '../assets/images/profile-icon.png';

export default class AdminList extends React.Component {
    static navigationOptions = {
      headerTitle: 'Admins',
      headerStyle: { backgroundColor: '#7e947f' },
      headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
      headerTintColor: 'white',
      headerRight: (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15 }}>
          <TouchableOpacity>
            <Ionicons
              name="md-add"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      ),
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
          <Text style={{
            marginTop: 10, marginLeft: 10, fontSize: 25, fontWeight: 'bold',
          }}
          >
            Admins
          </Text>
          <Content style={{ margin: 10 }}>
            <FlatList
              data={admins}
              renderItem={({ item }) => (
                <ListItem noIndent>
                  <TouchableOpacity>
                    <Left>
                      <Thumbnail small source={DefaultPic} />
                      <Text style={{ fontSize: 16, margin: 5 }}>{item.name}</Text>
                      <Ionicons
                        name="md-arrow-forward"
                        size={25}
                        style={{ marginLeft: 100, marginTop: 5 }}
                      />
                    </Left>
                  </TouchableOpacity>
                </ListItem>
              )}
              keyExtractor={(item) => item.name}
            />
          </Content>
        </Container>
      );
    }
}
