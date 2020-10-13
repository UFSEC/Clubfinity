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
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import colors from '../util/colors';

const evData = {
  id: 1,
  name: 'GBM 2',
  date: '10/8/20',
  time: '7:00',
  location: 'Zoom',
  facebookLink: 'https://www.facebook.com/events/3684185941606080',
  eventDescription: 'New officers introduction!',
};

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
    console.log(event);

    this.setState({
      eventName: event.name,
      selectedDate: event.date,
      selectedTime: event.time,
      location: event.location,
      facebookLink: event.facebookLink,
      eventDescription: event.eventDescription,
    });
    console.log(this.state);
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
    const errorData = errors.data;
    errorData.eventName = eventName === '' || eventName.length < 3;
    errorData.selectedDate = selectedDate === '';
    errorData.selectedTime = selectedTime === '';
    errorData.location = location === '' || location.length < 3;
    errorData.facebookLink = !!facebookLink && !this.validURL(facebookLink);
    errorData.eventDescription = eventDescription.length > 280;
    let validRequest = true;
    Object.keys(errorData).forEach((input) => {
      if (errorData[input] && input !== 'data' && input !== 'arePresent') {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors };
  };

  validURL = (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str) && str.toLowerCase().includes('facebook');
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
              {console.log(errors)}
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
              <DatePicker
                style={{ width: 200 }}
                date={selectedDate}
                mode="date"
                placeholder={errors.arePresent && errors.data.selectedDate
                  ? 'Invalid date'
                  : 'Select a Date'}
                format="MMM Do YYYY"
                minDate="01-01-2020"
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
                Time
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
            onPress={this.editEvent}
          >
            <Text style={{ alignSelf: 'center' }}>
              {processingRequest.status
                ? processingRequest.message
                : 'Update Event'}
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
