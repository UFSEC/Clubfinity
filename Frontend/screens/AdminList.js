import React from 'react';
import {
  FlatList,
  View,
  AsyncStorage,
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
import UserContext from '../util/UserContext';
import ClubsApi from '../api/ClubsApi';
import UserApi from '../api/UserApi';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class AdminList extends React.Component {
    static contextType = UserContext;

    static navigationOptions = buildNavigationsOptions('Admin List')

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

    constructor(props) {
      super(props);
      this.state = {
        admins: [],
        isAdmin: false,
      };
    }

    async componentDidMount() {
      const { navigation } = this.props;
      const { user } = this.context;
      const club = navigation.getParam('club', 'NO-CLUB');
      const bearerToken = await AsyncStorage.getItem('userToken');
      const adminIds = await ClubsApi.getAdmins(bearerToken, club._id);
      const promises = [];
      for (let i = 0; i < adminIds.length; i += 1) {
        promises.push(UserApi.getAdmin(adminIds[i], bearerToken));
      }
      const admins = await Promise.all(promises);
      this.setState({ admins });
      if ((club.admins.map((admin) => admin._id)).includes(user._id)) {
        this.setState({ isAdmin: true });
      }
    }

    removeAdminHandler = (adminId) => {
      const { navigation } = this.props;
      const club = navigation.getParam('club', 'NO-CLUB');
      let index = -1;
      for (let i = 0; i < (club.admins).length; i += 1) {
        if (((club.admins)[i])._id === adminId) {
          index = i;
        }
      }
      if (index > -1) {
        (club.admins).splice(index, 1);
      }
      this.handleRemove(club);
      this.setState({ admins: club.admins });
    };

    handleRemove = async (club) => {
      const bearerToken = await AsyncStorage.getItem('userToken');
      const authResponse = await ClubsApi.updateClub(club._id, bearerToken, club);
      return authResponse;
    }

    render() {
      const { isAdmin, admins } = this.state;
      const defaultAdminUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
      return (
        <Root>
          <List style={{ paddingTop: 20, width: '100%' }}>
            <FlatList
              data={admins}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: '100%',
                    marginBottom: '3%',
                    paddingHorizontal: 20,
                  }}
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
                    {isAdmin ? (
                      <View>
                        <MaterialCommunityIcons
                          name="account-minus-outline"
                          size={30}
                          color={colors.grayScale6}
                          onPress={() => ActionSheet.show({
                            options: ['Remove Admin', 'Cancel'],
                            cancelButtonIndex: 1,
                            destructiveButtonIndex: 0,
                          },
                          (buttonIndex) => {
                            switch (buttonIndex) {
                              case 0:
                                this.removeAdminHandler(item._id);
                                break;
                              case 1:
                                break;
                              default:
                                break;
                            }
                          })}
                        />
                      </View>
                    ) : null}
                  </View>
                </View>
              )}
            />
          </List>
        </Root>
      );
    }
}
