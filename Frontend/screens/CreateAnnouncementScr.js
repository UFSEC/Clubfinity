import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Textarea,
} from 'native-base';

import colors from '../util/colors';

export default class CreateAnnouncementScr extends Component {
  static navigationOptions = {
    title: 'Create an Announcement',
    headerStyle: { backgroundColor: colors.primary0 },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      titleError: false,
      descriptionError: false,
    };
  }

  setTitle = (text) => {
    this.setState({ titleError: false });
    this.setState({ title: text });
  };

  setDescription = (text) => {
    this.setState({ descriptionError: false });
    this.setState({ description: text });
  };

  handleCreateAnnouncement = () => {
    const { title, description } = this.state;

    if (!title || title.length < 1) {
      this.setState({ titleError: true });
    } else {
      this.setState({ titleError: false });
    }

    if (!description || description.length < 1) {
      this.setState({ descriptionError: true });
    } else {
      this.setState({ descriptionError: false });
    }
  };

  render() {
    const { titleError, descriptionError, description } = this.state;

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
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              error={titleError}
            >
              <Label>*Title</Label>
              <Input
                name="title"
                placeholderTextColor={
                  titleError ? colors.error : colors.grayScale10
                }
                onChangeText={this.setTitle}
                maxLength="50"
                style={{
                  textAlign: 'right',
                }}
              />
            </Item>

            <View
              style={{
                width: '100%',
              }}
            >
              <Textarea
                rowSpan={5}
                bordered
                borderColor={
                  descriptionError
                    ? colors.error
                    : colors.grayScale3
                }
                placeholderTextColor={
                  descriptionError
                    ? colors.error
                    : null
                }
                placeholder={
                  descriptionError
                    ? 'Invalid description*'
                    : 'Description*'
                }
                value={description}
                maxLength={280}
                onChangeText={(value) => this.setState({ description: value })}
                style={{
                  alignSelf: 'center',
                  width: '95%',
                  paddingBottom: '5%',
                  marginLeft: '4%',
                }}
              />
              {descriptionError ? (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: 14,
                    alignSelf: 'center',
                    width: '95%',
                    paddingBottom: '5%',
                    marginLeft: '4%',
                  }}
                >
                  Must add a description
                </Text>
              ) : null}
            </View>
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
            }}
            onPress={this.handleCreateAnnouncement}
          >
            <Text style={{ alignSelf: 'center' }}>
              Create Announcement
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
