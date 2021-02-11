import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import CalendarScr from '../screens/CalendarScr';
import HomeScr from '../screens/HomeScr';
import DiscoverScr from '../screens/DiscoverScr';
import ProfileScr from '../screens/ProfileScr';
import ClubScr from '../screens/ClubScr';
import SignupScr from '../screens/SignupScr';
import SigninScr from '../screens/SigninScr';
import AuthScr from '../screens/AuthScr';
import EditProfile from '../screens/EditProfile';
import ClubCreation from '../screens/ClubCreation';
import SettingScr from '../screens/SettingScr';
import EventList from '../screens/EventList';
import AnnouncementList from '../screens/AnnouncementList';
import EventCreation from '../screens/EventCreation';
import CreateAnnouncementScr from '../screens/CreateAnnouncementScr';
import AdminList from '../screens/AdminList';
import EditClub from '../screens/EditClub';
import EditEvent from '../screens/EditEvent'
import EventScr from '../screens/EventScr'
import AnnouncementScr from '../screens/AnnouncementScr'
import EditAnnouncement from '../screens/EditAnnouncements'
import colors from '../util/colors';

const HomeStack = createStackNavigator(
  {
    Home: HomeScr,
  },
  {
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const iconName = Platform.OS === 'ios' ? 'ios-home' : 'md-home';
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
      headerStyle: {
        backgroundColor: 'white',
        color: 'black',
      },
      headerTintColor: 'black',
    },
  }
);

const CalendarStack = createStackNavigator(
  {
    Calendar: CalendarScr,
  },
  {
    navigationOptions: {
      header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const iconName = Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar';
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScr,
    EditProfileScr: EditProfile,
    Settings: SettingScr,
    ClubCreationScr: ClubCreation,
    ClubScr : ClubScr,
  },
  {
    navigationOptions: {
      header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const iconName = Platform.OS === 'ios' ? 'ios-happy' : 'md-happy';
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    },
  }
);

const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScr,
    Club: ClubScr,
    EditClub: EditClub,
    EventList: EventList,
    AnnouncementList: AnnouncementList,
    EventCreation: EventCreation,
    CreateAnnouncementScr: CreateAnnouncementScr,
    AdminList: AdminList,
    EventScr: EventScr,
    AnnouncementScr: AnnouncementScr,
    EditEvent: EditEvent,
    EditAnnouncement: EditAnnouncement
  },
  {
    initialRouteName: 'Discover',
    navigationOptions: {
      header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const iconName = Platform.OS === 'ios' ? 'ios-search' : 'md-search';
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    },
  }
);

// This stack holds all the App screens/sub views like Home, Discover Profile etc
const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Discover: DiscoverStack,
    Calendar: CalendarStack,
    Profile: ProfileStack,
  },
  {
    headerLayoutPreset: 'center',
    tabBarOptions: {
      activeTintColor: colors.primary0,
      inactiveTintColor: colors.grayScale8,
      showLabel: false,
    },
  }
);

// This stack holds Auth screens like Sign in, Sign up, Forgot pass etc
const AuthStack = createStackNavigator(
  {
    SignIn: SigninScr,
    SignUp: SignupScr,
  },
  {
    initialRouteName: 'SignIn',
  }
);

// This stack/nav switches between Auth Stack and App stack based on whether user is signed in or not
const ContainerNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthScr,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading', // This component determines which stack to route to initially
  }
);

export default createAppContainer(ContainerNavigator);
