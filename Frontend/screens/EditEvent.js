import React, { Component } from 'react';
import { Alert } from 'react-native'
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
import { Ionicons } from '@expo/vector-icons';
import {DateTimePicker as DatePicker} from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon'
import colors from '../util/colors';
import { isValidFacebookUrl } from '../util/validation';
import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT,
} from '../util/dateUtil';
import EventsApi from '../api/EventsApi';
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class EditEvent extends Component {
  static navigationOptions = buildNavigationsOptions('Edit Event')

  constructor(props) {
    super(props);
    const errors = {
      eventName: false,
      selectedDate: false,
      selectedTime: false,
      location: false,
      facebookLink: false,
      eventDescription: false
    };
    this.state = {
      id: '',
      eventName: '',
      selectedDate: new Date(),
      location: '',
      facebookLink: '',
      eventDescription: '',
      processingRequest: { status: false, message: '' },
      processingDelete: { status: false, message: '' },
      errors: { arePresent: false, data: errors },
      showDatePicker: false,
      showTimePicker: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      id: navigation.getParam('id', ''),
      eventName: navigation.getParam('title', ''),
      selectedDate: date,
      location: navigation.getParam('location', ''),
      facebookLink: '',
      eventDescription: navigation.getParam('description', ''),
    });
  }

  editEvent = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        processingRequest: { status: false, message: '' },
        errors: { arePresent: true, data: validRequest.errors.data },
      });
      return;
    }
    this.setState({
      processingRequest: { status: false, message: 'Updating...' },
      errors: { arePresent: false, data: validRequest.errors.data },
    });
    const {
      id, eventName, selectedDate, selectedTime, location, eventDescription,
    } = this.state;
    const parsedDate = DateTime.fromISO(selectedDate.toISOString());
    const editedEventResponse = await EventsApi.update(id, {
      name: eventName,
      description: eventDescription,
      date: parsedDate.toISO(),
      location,
    });
    if (editedEventResponse.error) {
      alert('Unable to edit user');
    } else {
      const { navigation } = this.props;
      navigation.pop(2);
    }
  };

  isRequestValid = () => {
    const {
      eventName,
      selectedDate,
      location,
      facebookLink,
      errors,
    } = this.state;
    const errorData = errors.data;
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

  deleteConfirmation = () =>
    Alert.alert(
      "Delete Announcement?",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deleteEvent() }
      ],
      { cancelable: false }
    );

  setShowDatePicker = () => {
    this.setState({showDatePicker: true});
  };

  setShowTimePicker = () => {
    this.setState({showTimePicker: true});
  };

  onDateTimeChange = (event, newDate) => {
    const currentDate = newDate || this.state.selectedDate;
    this.setState({showDatePicker: false});
    this.setState({showTimePicker: false});
    this.setState({selectedDate: currentDate});
  };

  render() {
    const {
      processingRequest,
      errors,
      eventName,
      selectedDate,
      selectedTime,
      location,
      facebookLink,
      eventDescription,
    } = this.state;

    const today = new Date();

    getDateString = () => {
      if (this.state.selectedDate === undefined) {
        return ""
      }
      return this.state.selectedDate.toString().substring(0,10)
    }

    getTimeString = () => {
      if (this.state.selectedDate === undefined) {
        return ""
      }
      var hours = this.state.selectedDate.getHours();
      var minutes = this.state.selectedDate.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
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
                Event Name
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
              >
                {eventName}
              </Input>

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
                Date
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
              {showDatePicker && 
                <DatePicker
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
              }
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
                Time
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
              {showTimePicker &&
                <DatePicker
                  style={{ width: 200 }}
                  value={selectedTime}
                  mode="time"
                  placeholder={errors.arePresent && errors.data.selectedTime
                    ? 'Invalid time'
                    : 'Select a Time'}
                  format={TIME_PICKER_FORMAT}
                  confirmBtnText="Set Time"
                  cancelBtnText="Cancel"
                  minuteInterval={10}
                  showIcon={false}
                  minimumDate={today}
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
              }
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
                Location
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
              >
                {location}
              </Input>
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
                  height="50%"
                >
                  {facebookLink}
                </Input>
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
            onPress={this.editEvent}
          >
            <Text style={{ alignSelf: 'center' }}>
              {processingRequest.status
                ? processingRequest.message
                : 'Update Event'}
            </Text>
          </Button>
          <Button
            style={{
              alignSelf: 'center',
              backgroundColor: colors.secondary0,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1%',
            }}
            onPress={this.deleteConfirmation}
          >
            <Text style={{ alignSelf: 'center' }}>
              {processingDelete.status
                ? processingDelete.message
                : 'Delete Event'}
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
