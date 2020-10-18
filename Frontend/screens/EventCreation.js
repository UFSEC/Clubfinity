import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
  Textarea,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { DateTime } from 'luxon';
import colors from '../util/colors';
import { isValidFacebookUrl } from '../util/validation';
import EventsApi from '../api/EventsApi';

export default class EventCreation extends Component {
  static navigationOptions = {
    title: 'Create an event',
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
      createdEvent: false,
    };
    this.state = {
      eventName: '',
      selectedDate: '',
      selectedTime: '',
      location: '',
      facebookLink: '',
      eventDescription: '',
      createdEvent: false,
      errors: { arePresent: false, data: errors },
    };
  }

  createEvent = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({ createdEvent: true });
    this.setState({
      errors: { arePresent: false, data: validRequest.errors },
    });

    const {
      eventName,
      eventDescription,
      location,
      selectedDate,
      selectedTime,
    } = this.state;
    const parsedDate = this.combineAndParseDateTime(selectedDate, selectedTime);

    const userToken = await AsyncStorage.getItem('userToken');
    await EventsApi.create(userToken, {
      club: '99cb91bdc3464f14678934ca',
      name: eventName,
      description: eventDescription,
      date: parsedDate.toISO(),
      location,
    });
  };

  combineAndParseDateTime = (date, time) => {
    const combined = `${date} ${time}`;
    return DateTime.fromFormat(combined, 'MMM d yyyy hh:mm a');
  };

  isRequestValid = () => {
    const {
      eventName,
      selectedDate,
      selectedTime,
      location,
      facebookLink,
      eventDescription,
      errors,
    } = this.state;
    const errorData = errors;
    errorData.eventName = eventName === '' || eventName.length < 3;
    errorData.selectedDate = selectedDate === '';
    errorData.selectedTime = selectedTime === '';
    errorData.location = location === '' || location.length < 3;
    errorData.facebookLink = !!facebookLink && !isValidFacebookUrl(facebookLink);
    errorData.eventDescription = eventDescription.length > 280;
    let validRequest = true;
    Object.keys(errorData).forEach((input) => {
      if (errorData[input] && input !== 'data' && input !== 'arePresent') {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors };
  };

  render() {
    const {
      errors,
      eventDescription,
      createdEvent,
      selectedDate,
      selectedTime,
    } = this.state;
    if (createdEvent) {
      return (
        // Add routing to admin clubName management screen
        <Text>Successfully created an Event!</Text>
      );
    }
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
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.eventName
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Event Name*
              </Label>
              <Input
                onChangeText={(value) => this.setState({ eventName: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.eventName
                    ? 'Invalid event name'
                    : ''
                }
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.date
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Date*
              </Label>
              <DatePicker
                style={{ width: 200 }}
                date={selectedDate}
                mode="date"
                placeholder={errors.arePresent && errors.data.selectedDate
                  ? 'Invalid date'
                  : 'Select a Date'}
                format="MMM D yyyy"
                minDate="Jan 1 2020"
                confirmBtnText="Set Date"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 50,
                    borderColor: 'white',
                  },
                  dateText: {
                    fontSize: 17,
                    color: colors.grayScale10,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color:
                        errors.arePresent && errors.data.eventName
                          ? colors.error
                          : colors.grayScale10,
                  },
                }}
                onDateChange={(date) => this.setState({ selectedDate: date })}
              />
              <Ionicons
                name="md-arrow-dropdown"
                size={20}
                style={{ paddingTop: '1%' }}
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.date
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Time*
              </Label>
              <DatePicker
                style={{ width: 200 }}
                date={selectedTime}
                mode="time"
                placeholder={errors.arePresent && errors.data.selectedTime
                  ? 'Invalid time'
                  : 'Select a Time'}
                format="hh:mm A"
                confirmBtnText="Set Time"
                cancelBtnText="Cancel"
                minuteInterval={10}
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 50,
                    borderColor: 'white',
                  },
                  dateText: {
                    fontSize: 17,
                    color: colors.grayScale10,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color:
                        errors.arePresent && errors.data.eventName
                          ? colors.error
                          : colors.grayScale10,
                  },
                }}
                onDateChange={(time) => this.setState({ selectedTime: time })}
              />
              <Ionicons
                name="md-arrow-dropdown"
                size={20}
                style={{ paddingTop: '1%' }}
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.location
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Location*
              </Label>
              <Input
                onChangeText={(value) => this.setState({ location: value })}
                style={{ textAlign: 'right' }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.location
                    ? 'Invalid event location'
                    : ''
                }
              />
            </Item>
            {errors.arePresent && errors.data.facebookLink ? (
              <Item
                fixedLabel
                style={{ width: '95%', height: 45, marginBottom: '5%' }}
              >
                <Label style={{ color: colors.error }}>Facebook</Label>
                <Input
                  onChangeText={(value) => this.setState({ facebookLink: value })}
                  style={{ textAlign: 'right' }}
                  placeholderTextColor={colors.error}
                  placeholder="Invalid Link"
                />
              </Item>
            ) : (
              <Item
                fixedLabel
                style={{ width: '95%', height: 45, marginBottom: '5%' }}
              >
                <Label>Facebook Link</Label>
                <Input
                  onChangeText={(value) => this.setState({ facebookLink: value })}
                  style={{ textAlign: 'right' }}
                  placeholder=""
                />
              </Item>
            )}
            {errors.arePresent && errors.data.eventDescription ? (
              <View
                style={{
                  width: '100%',
                }}
              >
                <Textarea
                  rowSpan={5}
                  bordered
                  borderColor={colors.error}
                  placeholderTextColor={colors.error}
                  placeholder="Invalid description*"
                  value={eventDescription}
                  onChangeText={(value) => this.setState({ eventDescription: value })}
                  style={{
                    alignSelf: 'center',
                    width: '95%',
                    paddingBottom: '5%',
                    marginLeft: '4%',
                  }}
                />
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
                  Must be less than 280 characters
                </Text>
              </View>
            ) : (
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Description (Max 280 characters*)"
                value={eventDescription}
                onChangeText={(value) => this.setState({ eventDescription: value })}
                placeholderStyle={{ color: colors.grayScale10 }}
                style={{
                  alignSelf: 'center',
                  width: '95%',
                  paddingBottom: '5%',
                  marginLeft: '4%',
                }}
              />
            )}
          </Form>
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.accent0,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1%',
            }}
            onPress={this.createEvent}
          >
            <Text style={{ alignSelf: 'center' }}>
              Create Event
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
