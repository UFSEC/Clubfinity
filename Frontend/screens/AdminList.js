import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
  Container,
  Text,
  Thumbnail,
  Content,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import colors from '../util/colors';
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
        admins: [{ name: 'FirstName Lastname' }, { name: 'Firstname Lastname' }],
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
                <View
                  style={{
                    borderBottomColor: colors.grayScale3,
                    borderBottomWidth: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      padding: 5,
                      justifyContent: 'space-between',
                      alignContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Thumbnail small source={DefaultPic} />
                      <Text style={{ fontSize: 16, margin: 10 }}>
                        {item.name}
                      </Text>
                    </View>
                    <Ionicons
                      name="md-arrow-forward"
                      size={25}
                      color={colors.grayScale8}
                      style={{ alignSelf: 'center' }}
                    />
                  </TouchableOpacity>

                </View>
              )}
              keyExtractor={(item) => item.name}
            />
          </Content>
        </Container>
      );
    }
}
