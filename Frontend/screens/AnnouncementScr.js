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
import colors from '../util/colors';
import UserContext from '../util/UserContext';

export default class AnnouncementScr extends Component {
  static navigationOptions = {
    title: 'Event Screen',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  static contextType = UserContext;

  render() {
    const {
      navigation,
    } = this.props;
    const title = navigation.getParam('title', '');
    const description = navigation.getParam('description', '');
    const id = navigation.getParam('id', '');
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
              <Label>
                Title
              </Label>
              <Input
                disabled
              >
                {title}
              </Input>
            </Item>
            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label>
                Description
              </Label>
              <Input
                disabled
              >
                {description}
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
            onPress={() => navigation.navigate('EditAnnouncement', {
              id, title, description,
            })}
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
