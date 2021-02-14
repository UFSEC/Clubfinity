import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
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
import { isValidFacebookUrl } from '../util/validation';
import {
  combineAndParseDateTime, extractDateAndTime, DATE_PICKER_FORMAT, TIME_PICKER_FORMAT,
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
      eventDescription: false,
    };
    this.state = {
      id: '',
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
    const { navigation } = this.props;
    const { date, time } = extractDateAndTime(navigation.getParam('date', ''));
    this.setState({
      id: navigation.getParam('id', ''),
      eventName: navigation.getParam('title', ''),
      selectedDate: date,
      selectedTime: time,
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
    const userToken = await AsyncStorage.getItem('userToken');
    const {
      id, eventName, selectedDate, selectedTime, location, eventDescription,
    } = this.state;
    const parsedDate = combineAndParseDateTime(selectedDate, selectedTime);
    const editedEventResponse = await EventsApi.update(id, userToken, {
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
    // Add error feedback
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
                Time
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
                cancelBtnText="Cancel"
                minuteInterval={10}
                showIcon={false}
                minDate={today}
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
        </Content>
      </Container>
    );
  }
}
