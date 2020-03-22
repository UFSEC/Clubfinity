import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Button, Text, View, TextInput, SafeAreaView, Dimensions, Image, ScrollView } from 'react-native';
import { primary, club } from '../assets/styles/stylesheet';
import EventCard from '../components/EventCard';
import { Octicons }  from '@expo/vector-icons';
import SmallEventCard from '../components/SmallEventCard';
import Post from '../components/Post';

const {height, width } = Dimensions.get('window');

export default class ClubScr extends React.Component {
    static navigationOptions = {
        title: 'Club', 
        headerStyle: { backgroundColor: '#7e947f' },
        headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
    }

    render() {
      const { navigation } = this.props;
      const events = navigation.getParam('eventData', []);
      const posts = navigation.getParam('postData', []);
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ width: width, height: 175 }}>
              <Image style={{ flex: 1, height: undefined, width: undefined, resizeMode: 'cover' }} source={require('../assets/images/clubLogo.jpg')} />
          </View>
          <View style={{ width: width, height: 100}}>
            <Text style={club.title}>Software Engineering Club</Text>
            <Text style={club.description}>The coolest club on campus. Period.</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,
                  marginTop: 5, marginBottom: 20}}>Events Happening</Text>
          <View style={{flex: 1} [primary.container]}>
            <FlatList
              marginHorizontal={15}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={events}
              key={events.id}
              renderItem={({ item }) =>
                <SmallEventCard data={item} />
              }
              keyExtractor={(item) => item.id.toString()}/>
          </View>
            <View style={{flex: 1} [primary.container]}>
            <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,
              marginTop: 5, marginBottom: 20}}>Club Posts</Text>
            <FlatList
              marginHorizontal={15}
              showsVerticalScrollIndicator={false}
              data={posts}
              key={posts.id}
              renderItem={({ item }) =>
                <Post data={item} />
              }
              keyExtractor={(item) => item.id.toString()}/>
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }