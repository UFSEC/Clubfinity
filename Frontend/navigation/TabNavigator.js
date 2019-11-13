import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import CalendarScr from '../screens/CalendarScr';
import HomeScr from '../screens/HomeScr';
import DiscoverScr from '../screens/DiscoverScr';
import ProfileScr from '../screens/ProfileScr';
import SignupScr from '../screens/SignupScr';
import SigninScr from '../screens/SigninScr';
import AuthScr from '../screens/AuthScr';

const HomeStack = createStackNavigator({
  Home: HomeScr,
}, {
  navigationOptions: {
    title: 'Home',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      iconName = Platform.OS === 'ios' ? `ios-home` : 'md-home';
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
    headerStyle: {
      backgroundColor: 'white',
      color: 'black'
    },
    headerTintColor: 'black',
  },
});

const CalendarStack = createStackNavigator({
  Calendar: CalendarScr,
}, {
  navigationOptions: {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      iconName = Platform.OS === 'ios' ? `ios-calendar` : 'md-calendar';
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  },
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScr,
  Edit: EditProfile
}, {
  navigationOptions: {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      let iconName;
      iconName = Platform.OS === 'ios' ? `ios-happy` : 'md-happy';
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  },
});

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScr,
}, {
  navigationOptions: {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      let iconName;
      iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  },
});

// This stack holds all the App screens/sub views like Home, Discover Profile etc
const AppStack = createBottomTabNavigator({
  Home: HomeStack,
  Discover: DiscoverStack,
  Calendar: CalendarStack,
  Profile: ProfileStack,
}, {
  headerLayoutPreset: 'center',
  tabBarOptions: {
    activeTintColor: '#7e947f',
    inactiveTintColor: '#bdc3c7',
  }
},
);

// This stack holds Auth screens like Sign in, Sign up, Forgot pass etc
const AuthStack = createStackNavigator({
  SignIn: SigninScr,
  SignUp: SignupScr,
},
  {
    initialRouteName: 'SignIn'
  }
);

// This stack/nav switches between Auth Stack and App stack based on whether user is signed in or not
const ContainerNavigator = createSwitchNavigator({
  AuthLoading: AuthScr,
  Auth: AuthStack,
  App: AppStack,
}, {
  initialRouteName: 'AuthLoading' // This component determines which stack to route to initially
}
);


export default createAppContainer(ContainerNavigator);
