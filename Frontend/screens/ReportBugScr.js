import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  Textarea,
} from 'native-base';
import colors from '../util/colors';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class ReportBugScr extends Component {
  static navigationOptions = buildNavigationsOptions('Report a bug')

  constructor(props) {
    super(props);
    this.state = {
      bugDescription: '',
      processingRequest: false,
    };
  }

  submitReport = async () => {
    this.setState({
      processingRequest: true,
    });
    const validRequest = this.isRequestValid();
    this.setState({
      processingRequest: false,
      emptyDescription: !validRequest,
    });
  };

  isRequestValid = () => {
    const { bugDescription } = this.state;
    return bugDescription.length > 10;
  };

  render() {
    const {
      emptyDescription,
      processingRequest,
      bugDescription,
    } = this.state;
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
            <View
              style={{
                width: '100%',
              }}
            >
              <Textarea
                rowSpan={5}
                bordered
                borderColor={
                  emptyDescription
                    ? colors.error
                    : colors.grayScale3
                }
                placeholderTextColor={
                  emptyDescription
                    ? colors.error
                    : null
                }
                placeholder={
                  emptyDescription
                    ? 'Invalid description*'
                    : 'What went wrong?*'
                }
                value={bugDescription}
                onChangeText={(value) => this.setState({ bugDescription: value })}
                style={{
                  alignSelf: 'center',
                  width: '95%',
                  paddingBottom: '5%',
                  marginLeft: '4%',
                }}
              />
              {emptyDescription ? (
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
                  Please enter a description
                </Text>
              ) : null}
            </View>
          </Form>
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.secondary0,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1%',
              marginBottom: '5%',
            }}
            onPress={this.submitReport}
          >
            <Text style={{ alignSelf: 'center' }}>
              Submit Report
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
