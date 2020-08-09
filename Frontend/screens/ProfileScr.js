import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import Preferences from './Preferences';
import ProfileInfoScr from './ProfileInfoScr';
import ClubsFollowScr from './ClubsFollowScr';
import UserContext from '../util/UserContext';
import DefaultPic from '../assets/images/profile-icon.png';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  mainContainer: {
    padding: 7,
    backgroundColor: '#f5f6fa',
  },
  Card: {
    padding: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  profileCardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  profilePicture: {
    width: 115,
    height: 115,
    resizeMode: 'contain',
    alignItems: 'flex-start',
    flex: 1,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    letterSpacing: 2,
    color: '#636e72',
  },
  textSubheading: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  tabContainerOuter: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 8,
  },
  tabOverlay: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#7e947f',
    color: 'white',
    borderRadius: 4,
  },
  textStyle: {
    color: 'white',
    letterSpacing: 2,
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Add User API

export default class ProfileScr extends React.Component {
  static contextType = UserContext;

  static navigationOptions = {
    title: 'Profile',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
  };

  constructor(props) {
    super(props);
    this.state = {
      title: ['Preferences', 'Following'],
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,

      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),

      translateY: -1000,
    };
  }

  componentDidUpdate(prevState) {
    const { active } = this.state;
    if (prevState.active !== active) {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  handleSlide = (type) => {
    const {
      active,
      translateX,
      translateXTabOne,

      translateXTabTwo,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: active === 1 ? 0 : -width * 2,
          duration: 100,
        }).start(),
      ]);
    }
  };

  render() {
    const { user } = this.context;

    const userProfilePicture = {
      ProfilePic: DefaultPic,
    };

    const {
      xTabOne,
      xTabTwo,
      active,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateY,
      title,
    } = this.state;

    return (
      <View style={style.mainContainer}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}
          scrollEnabled={active === 1}
        >
          <View style={style.Card}>
            <View style={style.profileCardRow}>
              <Image
                style={[style.profilePicture]}
                source={userProfilePicture.ProfilePic}
              />
              <View>
                {user && (
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    style={style.textHeader}
                  >
                    {user.name.first}
                    {' '}
                    {user.name.last}
                  </Text>
                )}
              </View>
            </View>
            <View style={style.profileInfo}>
              <ProfileInfoScr />
            </View>
          </View>
          <View style={style.tabContainerOuter}>
            <View style={style.tabContainerInner}>
              <Animated.View
                style={{
                  ...style.tabOverlay,
                  ...{ transform: [{ translateX }] },
                }}
              />
              <TouchableOpacity
                style={{
                  ...style.tabStyle,
                  ...{
                    borderRightWidth: 1,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRadius: 7,
                  },
                  ...{ backgroundColor: active === 1 ? '#b1caa9' : '#7e947f' },
                }}
                onLayout={(event) => this.setState({ xTabOne: event.nativeEvent.layout.x })}
                onPress={() => this.setState({ active: 0 }, () => this.handleSlide(xTabOne))}
              >
                <Text style={style.textStyle}>
                  {' '}
                  {title[0]}
                  {' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...style.tabStyle,
                  ...{
                    borderLeftWidth: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 3,
                    borderBottomRightRadius: 3,
                  },
                  ...{ backgroundColor: active === 1 ? '#7e947f' : '#b1caa9' },
                }}
                onLayout={(event) => this.setState({ xTabTwo: event.nativeEvent.layout.x })}
                onPress={() => this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))}
              >
                <Text style={style.textStyle}>
                  {' '}
                  {title[1]}
                  {' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            style={{
              ...style.tabContent,
              ...{
                transform: [
                  {
                    translateX: translateXTabOne,
                  },
                ],
              },
            }}
            onLayout={(event) => this.setState({ translateY: event.nativeEvent.layout.height })}
          >
            <Preferences signOut={this.signOut} />
          </Animated.View>
          <Animated.View
            style={{
              ...style.tabContent,
              ...{
                transform: [
                  {
                    translateX: translateXTabTwo,
                  },
                  {
                    translateY: -translateY,
                  },
                ],
              },
            }}
          >
            <ClubsFollowScr />
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}
