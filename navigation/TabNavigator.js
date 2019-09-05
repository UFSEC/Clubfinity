import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CalendarScr from '../screens/CalendarScr';
import HomeScr from '../screens/HomeScr';
import DiscoverScr from '../screens/DiscoverScr';
import ProfileScr from '../screens/ProfileScr';

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
},);

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
},);

const ProfileStack = createStackNavigator({
  Profile: ProfileScr,
}, {
  navigationOptions: {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      let iconName;
      iconName = Platform.OS === 'ios' ? `ios-happy` : 'md-happy';
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  },
},);

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScr,
},  {
  navigationOptions: {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      let iconName;
      iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  },
},);

export default createAppContainer(createBottomTabNavigator({
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
));
