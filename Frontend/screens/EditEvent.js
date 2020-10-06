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
import UserApi from '../api/UserApi';
import EventApi from '../api/EventsApi'

const evData = [
  {
    id: 1,
    name: 'GBM 2',
    date: '10/8/20',
    time: '7:00',
    location: 'Zoom',
    facebookLink: 'https://www.facebook.com/events/3684185941606080',
    eventDescription: 'New officers introduction!',
  },
];


export default class EditEvent extends Component {
  static navigationOptions = {
    title: 'Edit Event',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props);
    const errors = {
      eventName: false,
      selectedDate: false,
      selectedTime: false,
      location: false,
      facebookLink: false,
      eventDescription: false,
    };
    this.state = {
      eventName: '',
      selectedDate: '',
      selectedTime: '',
      location: '',
      facebookLink: '',
      eventDescription: '',
      processingRequest: { status: false, message: '' },
      errors: { arePresent: false, data: errors },
    };
  }

  componentDidMount() {
    const event = evData;

    this.setState({
      eventName: event.name,
      selectedDate: event.date,
      selectedTime: event.time,
      location: event.location,
      facebookLink: event.facebookLink,
      eventDescription: event.eventDescription,
    });
  }

  editEvent = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        processingRequest: { status: false, message: '' },
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({
      processingRequest: { status: true, message: 'Updating...' },
      errors: { arePresent: false, data: validRequest.errors },
    });
    const {
      eventName,
      selectedDate,
      selectedTime,
      location,
      facebookLink,
      eventDescription,
    } = this.state;

    // Set event equal to EventContext
    const { event, setEvent } = this.context;

    event.eventName = eventName;
    event.selectedDate = selectedDate;
    event.selectedTime = selectedTime;
    event.location = location;
    event.facebookLink = facebookLink;
    event.eventDescription = eventDescription;

    // Set response to event update function in EventsApi
    const updateEventResponse;

    if (updateEventResponse.error) {
      alert('Unable to update event');
      console.log(updateEventResponse.error);
      return;
    }
    this.setState({
      processingRequest: { status: true, message: 'Updated Event!' },
    });
    setUser(event);
  };

  isRequestValid = () => {
    const {
      errors,
      eventName,
      selectedDate,
      selectedTime,
      location,
      facebookLink,
      eventDescription,
    } = this.state;
    const errorsData = { ...errors.data };
    errorData.eventName = eventName === '' || eventName.length < 3;
    errorData.selectedDate = selectedDate === '';
    errorData.selectedTime = selectedTime === '';
    errorData.location = location === '' || location.length < 3;
    errorData.facebookLink = !!facebookLink && !this.validURL(facebookLink);
    errorData.eventDescription = eventDescription.length > 280;

    let validRequest = true;
    Object.keys(errorsData).forEach((input) => {
      if (errorsData[input]) {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors: errorsData };
  };

  setMajor = (major) => {
    this.setState({ major });
  };

  setYear = (year) => {
    this.setState({ classYear: year });
  };

  render() {
    const {
      processingRequest,
      errors,
      firstName,
      lastName,
      username,
      major,
      classYear,
    } = this.state;
    const majorCategories = Majors.map((s) => (
      <Picker.Item value={s.value} label={s.label} />
    ));
    const classYearCategories = ClassYears.map((s) => (
      <Picker.Item value={s.value} label={s.label} />
    ));
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
                style={{
                  color:
                    errors.arePresent && errors.data.username
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Username
              </Label>
              <Input
                onChangeText={(value) => this.setState({ username: value })}
              >
                {username}
              </Input>
            </Item>
            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.firstName
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                First name
              </Label>
              <Input
                onChangeText={(value) => this.setState({ firstName: value })}
              >
                {firstName}
              </Input>
            </Item>

            <Item
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              stackedLabel
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.lastName
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Last name
              </Label>
              <Input
                onChangeText={(value) => this.setState({ lastName: value })}
              >
                {lastName}
              </Input>
            </Item>
            <Item
              picker
              fixedLabel
              style={{ width: '95%', marginBottom: '5%' }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.major
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Major
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholderStyle={{ color: colors.grayScale10 }}
                placeholder="Select club category"
                selectedValue={major}
                onValueChange={this.setMajor}
              >
                {majorCategories}
              </Picker>
              {Platform.OS === 'ios' ? (
                <Ionicons
                  name="md-arrow-dropdown"
                  size={20}
                  style={{ paddingTop: '1%' }}
                />
              ) : null}
            </Item>
            <Item
              picker
              fixedLabel
              style={{ width: '95%', marginBottom: '5%' }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.classYear
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Class Year
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholderStyle={{ color: colors.grayScale10 }}
                placeholder="Select class year"
                selectedValue={classYear.toString()}
                onValueChange={this.setYear}
              >
                {classYearCategories}
              </Picker>
              {Platform.OS === 'ios' ? (
                <Ionicons
                  name="md-arrow-dropdown"
                  size={20}
                  style={{ paddingTop: '1%' }}
                />
              ) : null}
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
            onPress={this.editProfile}
          >
            <Text style={{ alignSelf: 'center' }}>
              {processingRequest.status
                ? processingRequest.message
                : 'Update Profile'}
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
