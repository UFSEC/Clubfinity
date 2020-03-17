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
        header: null,
    }

    //Changes "Follow" button text to "Following", vice versa
    state = {
      textValue: 'Follow',
      
    }

    onPress = () => {
      this.setState({
        textValue: 'Following',
      })
    }

    //--------------------Renders interface--------------------
    render() {
        const evData = [
            {
                id: 1,
                name: "GBM 2",
                date: "10/17/19",
                time: "6:00",
                location: "LIT 101"
              },
              {
                id: 2,
                name: "codeCollab",
                date: "10/24/19",
                time: "7:00",
                location: "LIT 101"
              },
              {
                id: 3,
                name: "SEC X Microsoft",
                date: "10/31/19",
                time: "6:00",
                location: "LIT 101"
              },
              {
                id: 4,
                name: "GBM 3",
                date: "11/07/19",
                time: "6:00",
                location: "LIT 101"
              },
        ];

        const postData = [
            {
                id: 1,
                header: "Hey guys! Get ready for our final GBM!",
                description: 'Its a me a Mario!',
              },
              {
                id: 2,
                header: 'See you all at the CS Picnic today :)',
                description: 'Its a me a Mario!',
              },
              {
                id: 3,
                header: 'Its a me a Mario!',
                description: 'Its a me a Mario!',
              },
              {
                id: 4,
                header: 'We Cool',
                description: 'Its a me a Mario!',
              },
        ];

      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ width: width, height: 175 }}>
              <Image style={{ flex: 1, height: undefined, width: undefined, resizeMode: 'cover' }} source={require('../assets/images/clubLogo.jpg')} />
          </View>
          {/* Top section with Title, subtitle, and follow button */}
          <View style={{flexDirection: 'row', width: width, height: 100, flexShrink: 1}}>
            <View style={{}}>
              <Text style={club.title}>Software Engineering</Text>
              <Text style={club.description}>The coolest club on campus. Period.</Text>
            </View>
            {/* Follow / Following button */}
            <View style={{backgroundColor: '#ACCAAC', borderRadius: 50, width: 100, alignSelf: 'center'}}>
            <Button 
              title={this.state.textValue}
              color='white'
              onPress={this.onPress}
            />
          </View>
          </View>
          
          <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20, 
                  marginTop: 5, marginBottom: 20}}>Events Happening</Text>
          <View style={{flex: 1} [primary.container]}>
            <FlatList
              marginHorizontal={15}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={evData}
              key={evData.id}
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
              data={postData}
              key={postData.id}
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