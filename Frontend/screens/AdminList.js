import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Root,
  Text,
  List,
  Thumbnail,
  ActionSheet,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../util/colors';

export default class AdminList extends React.Component {
    static navigationOptions = {
      headerTitle: 'Admins',
      headerStyle: { backgroundColor: '#7e947f' },
      headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
      headerTintColor: 'white',
    };

    static yearToString(year) {
      switch (year) {
        case 2024:
          return '1st Year';
        case 2023:
          return '2nd Year';
        case 2022:
          return '3rd Year';
        case 2021:
          return '4th Year';
        case 2020:
          return '5th Year';
        default:
          return `${year}th Year`;
      }
    }

    render() {
      const { navigation } = this.props;
      const club = navigation.getParam('club', 'NO-CLUB');
      const defaultAdminUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

      return (
        <Root>
          <List style={{ paddingTop: 20, width: '100%' }}>
            <FlatList
              data={club.admins}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    marginBottom: '3%',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => ActionSheet.show({
                    options: ['Remove Admin', 'Cancel'],
                    cancelButtonIndex: 1,
                    destructiveButtonIndex: 0,
                  },
                  (buttonIndex) => {
                  /* to be updated: remove admin on press */
                    switch (buttonIndex) {
                      case 0:
                        break;
                      case 1:
                        break;
                      default:
                        break;
                    }
                  })}
                >
                  <View style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomColor: colors.grayScale9,
                    borderBottomWidth: 0.3,
                    paddingBottom: '2%',
                  }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Thumbnail style={{ margin: '2%' }} source={{ uri: defaultAdminUrl }} />
                      <View
                        style={{
                          marginLeft: '3%',
                        }}
                      >
                        <Text>
                          {item.name.first}
                          {' '}
                          {item.name.last}
                        </Text>
                        <Text style={{ color: colors.grayScale9, fontSize: 14 }}>
                          {AdminList.yearToString(item.year) }
                      &nbsp;&#183;&nbsp;
                          { item.major }
                        </Text>
                      </View>
                    </View>
                    <View>
                      <MaterialCommunityIcons name="account-minus-outline" size={30} color={colors.grayScale6} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </List>
        </Root>
      );
    }
}
