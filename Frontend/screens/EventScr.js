import React, { Component } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import colors from '../util/colors';
import Majors from '../data/Majors';
import ClassYears from '../data/ClassYears';
import UserContext from '../util/UserContext';
import EventsApi from '../api/EventsApi';

export default class EventScr extends Component {
  static navigationOptions = {
    title: 'Event Screen',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      location: '',
      date: '',
    };
  }

  componentDidMount() {
    const { user } = this.context;
  }

  render() {
    return (
      <Container>
        <Content>
          <Form
            style={{
              width: '95%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '5%',
              paddingBottom: '5%',
            }}
          >
            <Item
              style={{
                width: '95%',
                height: 45,
                marginBottom: '5%',
                marginTop: '7%',
              }}
              stackedLabel
            >
              <Label
              >
                Title
              </Label>
              <Input
                onChangeText={(value) => {}}
              >
                {'username'}
              </Input>
            </Item>
            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label
              >
                Description
              </Label>
              <Input
                onChangeText={(value) => {}}
              >
                {'firstName'}
              </Input>
            </Item>

            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label
              >
                Location
              </Label>
              <Input
                onChangeText={(value) => {}}
              >
                {'lastName'}
              </Input>
            </Item>
            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label
              >
                Date
              </Label>
              <Input
                onChangeText={(value) => {}}
              >
                {'lastName'}
              </Input>
            </Item>
          </Form>
          
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.accent0,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1%',
              marginBottom: '5%',
              marginTop: '5%',
            }}
            onPress={() => {}}
          >
            <Text style={{ alignSelf: 'center' }}>
              Edit
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
