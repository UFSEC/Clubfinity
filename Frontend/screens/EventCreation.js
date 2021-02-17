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
import DatePicker from 'react-native-datepicker';
import colors from '../util/colors';
import { isValidFacebookUrl } from '../util/validation';
import EventsApi from '../api/EventsApi';
import { combineAndParseDateTime, DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from '../util/dateUtil';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class EventCreation extends Component {
  static navigationOptions = buildNavigationsOptions('Create an event')

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
    const { navigation } = this.props;
    const parsedDate = combineAndParseDateTime(selectedDate, selectedTime);
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
      selectedTime,
      location,
      facebookLink,
      errors,
    } = this.state;
    const errorData = errors;
    errorData.eventName = eventName === '' || eventName.length < 3;
    errorData.selectedDate = selectedDate === '';
    errorData.selectedTime = selectedTime === '';
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

  render() {
    const {
      errors,
      eventDescription,
      selectedDate,
      selectedTime,
    } = this.state;
    const today = new Date();
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
                format={DATE_PICKER_FORMAT}
                minDate={today}
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
                format={TIME_PICKER_FORMAT}
                confirmBtnText="Set Time"
                minDate={today}
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
