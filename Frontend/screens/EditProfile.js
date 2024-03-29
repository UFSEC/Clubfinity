import React, { Component } from 'react';
import { Platform } from 'react-native';
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
import buildNavigationsOptions from '../util/navigationOptionsBuilder';

export default class EditProfile extends Component {
  static navigationOptions = buildNavigationsOptions('Edit Profile')

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      major: '',
      classYear: '',
      processingRequest: { status: false, message: '' },
      errors: {
        arePresent: false,
        data: {
          firstName: false,
          lastName: false,
          major: false,
          classYear: false,
        },
      },
    };
  }

  componentDidMount() {
    const { user } = this.context;

    this.setState({
      classYear: user.year,
      firstName: user.name.first,
      lastName: user.name.last,
      major: user.major,
    });
  }

  editProfile = async () => {
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
      firstName, lastName, major, classYear,
    } = this.state;
    const { user, setUser } = this.context;
    const updateUserResponse = await UserApi.updateUser(
      {
        major, year: classYear, name: { first: firstName, last: lastName },
      },
    );

    if (updateUserResponse.error) {
      alert('Unable to update user');
      console.log(updateUserResponse.error);
      return;
    }
    this.setState({
      processingRequest: { status: true, message: 'Updated your profile!' },
    });
    setUser(user);
  };

  isRequestValid = () => {
    const {
      errors,
      firstName,
      lastName,
      major,
      classYear,
    } = this.state;
    const errorsData = { ...errors.data };
    errorsData.firstName = firstName === '' || !/^[a-zA-Z()]+$/.test(firstName);
    errorsData.lastName = lastName === '' || !/^[a-zA-Z()]+$/.test(lastName);
    errorsData.major = major === '' || major === null;
    errorsData.classYear = classYear === '' || classYear === null || Number.isNaN(Number(classYear));

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
      major,
      classYear,
    } = this.state;
    const majorCategories = Majors.map((s) => (
      <Picker.Item value={s.value} label={s.label} key={s.label} />
    ));
    const classYearCategories = ClassYears.map((s) => (
      <Picker.Item value={s.value} label={s.label} key={s.label} />
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
                width: '95%', height: 45, marginBottom: '5%', marginTop: '7%',
              }}
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
              backgroundColor: colors.info,
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
