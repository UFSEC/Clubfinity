import React, { Component } from 'react';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { DateTime } from 'luxon';
import colors from '../util/colors';
import UserContext from '../util/UserContext';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class EventScr extends Component {
  static contextType = UserContext;

  static navigationOptions = buildNavigationsOptions('Event Screen')

  render() {
    const { navigation } = this.props;

    const title = navigation.getParam('title', '');
    const description = navigation.getParam('description', '');
    const location = navigation.getParam('location', '');
    const date = navigation.getParam('date', '');
    const id = navigation.getParam('id', '');
    const isAdmin = navigation.getParam('isAdmin', '');

    return (
      <Container>
        <Content>
          <Form
            style={{
              width: '95%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '10%',
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
              <Label>Title</Label>
              <Input disabled>{title}</Input>
            </Item>
            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label>Description</Label>
              <Input disabled>{description}</Input>
            </Item>

            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label>Location</Label>
              <Input disabled>{location}</Input>
            </Item>
            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label>Date</Label>
              <Input disabled>
                {DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)}
              </Input>
            </Item>
            {isAdmin && (
              <Button
                style={{
                  alignSelf: 'center',
                  backgroundColor: colors.secondary0,
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '1%',
                  marginBottom: '5%',
                  marginTop: '5%',
                }}
                onPress={() => navigation.navigate('EditEvent', {
                  id,
                  title,
                  description,
                  location,
                  date,
                })}
              >
                <Text style={{ alignSelf: 'center' }}>Edit</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Container>
    );
  }
}
