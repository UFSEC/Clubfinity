import React, { Component } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import colors from '../util/colors';
import { isValidFacebookUrl } from '../util/validation';
import EventsApi from '../api/EventsApi';
import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from '../util/dateUtil';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class EventCreation extends Component {
  static navigationOptions = buildNavigationsOptions('Create an event')

  constructor(props) {
    super(props);
    const errors = {
      eventName: false,
      selectedDate: false,
      location: false,
      facebookLink: false,
      eventDescription: false,
      createdEvent: false,
    };
    this.state = {
      eventName: '',
      selectedDate: new Date(),
      location: '',
      facebookLink: '',
      eventDescription: '',
      createdEvent: false,
      errors: { arePresent: false, data: errors },
      showDatePicker: false,
      showTimePicker: false,
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
    } = this.state;
    const { navigation } = this.props;
    const parsedDate = DateTime.fromISO(selectedDate.toISOString());
    const club = navigation.getParam('club', 'NO-CLUB');

    await EventsApi.create({
      club: club._id,
      name: eventName,
      description: eventDescription,
      date: parsedDate.toISO(),
      location,
    });
    navigation.navigate('Club', { club });
  };

  isRequestValid = () => {
    const {
      eventName,
      selectedDate,
      location,
      facebookLink,
      errors,
    } = this.state;
    const errorData = errors;
    errorData.eventName = eventName === '' || eventName.length < 3;
    errorData.selectedDate = selectedDate === '';
    errorData.location = location === '' || location.length < 3;
    errorData.facebookLink = !!facebookLink && !isValidFacebookUrl(facebookLink);
    let validRequest = true;
    Object.keys(errorData).forEach((input) => {
      if (errorData[input] && input !== 'data' && input !== 'arePresent') {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors };
  };

  setShowDatePicker = () => {
    this.setState({ showDatePicker: true });
  }

  setShowTimePicker = () => {
    this.setState({ showTimePicker: true });
  }

  onDateTimeChange = async (event, newDate) => {
    const { selectedDate } = this.state;
    this.setState({ showDatePicker: false });
    this.setState({ showTimePicker: false });
    this.setState({ selectedDate: newDate || selectedDate });
  }

  render() {
    const {
      errors,
      eventDescription,
      createdEvent,
      selectedDate,
      showDatePicker,
      showTimePicker,
    } = this.state;
    if (createdEvent) {
      return (
        // Add routing to admin clubName management screen
        <Text>Successfully created an Event!</Text>
      );
    }

    const today = new Date();

    const getDateString = () => {
      if (selectedDate === undefined) {
        return '';
      }
      return selectedDate.toString().substring(0, 10);
    };

    const getTimeString = () => {
      if (selectedDate === undefined) {
        return '';
      }
      let hours = selectedDate.getHours();
      let minutes = selectedDate.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      const strTime = `${hours}:${minutes} ${ampm}`;
      return strTime;
    };

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
                height="50%"
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
              onPress={this.setShowDatePicker}
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
              <Text
                style={{ textAlign: 'right' }}
                height="50%"
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.location
                    ? 'Invalid event location'
                    : ''
                }
              >
                {getDateString()}
              </Text>
              {showDatePicker
                && (
                <DateTimePicker
                  style={{ width: 200 }}
                  value={selectedDate}
                  mode="date"
                  placeholder={errors.arePresent && errors.data.selectedDate
                    ? 'Invalid date'
                    : 'Select a Date'}
                  format={DATE_PICKER_FORMAT}
                  minimumDate={today}
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
                  onChange={this.onDateTimeChange}
                />
                )}
              <Ionicons
                name="md-arrow-dropdown"
                size={20}
                style={{ paddingTop: '1%' }}
              />
            </Item>
            <Item
              fixedLabel
              style={{ width: '95%', height: 45, marginBottom: '5%' }}
              onPress={this.setShowTimePicker}
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
              <Text
                style={{ textAlign: 'right' }}
                height="50%"
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.location
                    ? 'Invalid event location'
                    : ''
                }
              >
                {getTimeString()}
              </Text>
              {showTimePicker
                && (
                <DateTimePicker
                  style={{ width: 200 }}
                  value={selectedDate}
                  mode="time"
                  placeholder={errors.arePresent && errors.data.selectedDate
                    ? 'Invalid time'
                    : 'Select a Time'}
                  format={TIME_PICKER_FORMAT}
                  minimumDate={today}
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
                  onChange={this.onDateTimeChange}
                />
                )}
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
                height="50%"
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
                  height="50%"
                  placeholder=""
                />
              </Item>
            )}
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Description"
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
          </Form>
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.secondary0,
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
