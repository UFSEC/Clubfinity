import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Icon,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
  Textarea,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import EditForm from '../components/EditForm';
import colors from '../util/colors';
import Majors from '../data/Majors';
import ClassYears from '../data/ClassYears';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
});

export default class EditProfile extends Component {
  static navigationOptions = {
    title: 'Edit Profile',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    headerTintColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      major: '',
      classYear: '',
      username: '',
      processingRequest: false,
      errors: {
        arePresent: false,
        data: {
          firstName: false,
          lastName: false,
          major: false,
          classYear: false,
          username: false,
        },
      },
    };
  }

  editProfile = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        errors: { arePresent: true, data: validRequest.errors },
      });
    }
  };

  isRequestValid = () => {
    const {
      errors,
      firstName,
      lastName,
      major,
      classYear,
      username,
    } = this.state;
    const errorsData = { ...errors.data };
    errorsData.firstName = firstName === '' || !/^[a-zA-Z()]+$/.test(firstName);
    errorsData.lastName = lastName === '' || !/^[a-zA-Z()]+$/.test(lastName);
    errorsData.major = major === '' || major === null;
    errorsData.classYear = classYear === '' || classYear === null || Number.isNaN(Number(classYear));
    errorsData.username = username === '' || username < 6 || username > 20;

    let validRequest = true;
    Object.keys(errorsData).forEach((input) => {
      if (errorsData[input]) {
        validRequest = false;
      }
    });
    console.log({ valid: validRequest, errors: errorsData });
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
              paddingTop: '5%',
              paddingBottom: '5%',
            }}
          >

            <Item style={{ width: '95%', height: 45, marginBottom: '5%' }} stackedLabel>
              <Label style={{
                color:
                  errors.arePresent && errors.username
                    ? colors.error
                    : colors.grayScale10,
              }}
              >
                Username
              </Label>
              <Input onChangeText={(value) => this.setState({ firstName: value })}>
                pablo
              </Input>
            </Item>
            <Item style={{ width: '95%', height: 45, marginBottom: '5%' }} stackedLabel>
              <Label style={{
                color:
                  errors.arePresent && errors.firstName
                    ? colors.error
                    : colors.grayScale10,
              }}
              >
                First name
              </Label>
              <Input style={{
                color:
                  errors.arePresent && errors.firstName
                    ? colors.error
                    : colors.grayScale10,
              }}
              >
                Pablo
              </Input>
            </Item>
            <Item style={{ width: '95%', height: 45, marginBottom: '5%' }} stackedLabel>
              <Label style={{
                color:
                  errors.arePresent && errors.lastName
                    ? colors.error
                    : colors.grayScale10,
              }}
              >
                Last name
              </Label>
              <Input style={{
                color:
                  errors.arePresent && errors.lastName
                    ? colors.error
                    : colors.grayScale10,
              }}
              >
                Estrada
              </Input>
            </Item>

            <Item
              picker
              fixedLabel
              style={{ width: '95%', marginBottom: '5%' }}
            >
              <Label style={{
                color:
                  errors.arePresent && errors.major
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
                selectedValue="Computer Science"
                onValueChange={this.setMajor}
              >
                {majorCategories}
              </Picker>
              <Ionicons
                name="md-arrow-dropdown"
                size={20}
                style={{ paddingTop: '1%' }}
              />
            </Item>
            <Item
              picker
              fixedLabel
              style={{ width: '95%', marginBottom: '5%' }}
            >
              <Label style={{
                color:
                  errors.arePresent && errors.classYear
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
                selectedValue="2022"
                onValueChange={this.setYear}
              >
                {classYearCategories}
              </Picker>
              <Ionicons
                name="md-arrow-dropdown"
                size={20}
                style={{ paddingTop: '1%' }}
              />
            </Item>
            <Button
              style={{
                alignSelf: 'center',
                backgroundColor: colors.accent0,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '1%',
              }}
              onPress={this.editProfile}
            >
              <Text style={{ alignSelf: 'center' }}>
                {processingRequest ? 'Updating...' : 'Update Profile'}
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
