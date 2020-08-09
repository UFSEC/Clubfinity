import React, { Component } from 'react';
import {
  Dimensions, StyleSheet, Text, TouchableOpacity, AsyncStorage,
} from 'react-native';

import Form from '../components/Form/Form';
import TextInputBox from '../components/Form/TextInputBox';
import NativePicker from '../components/Form/NativePicker';
import ClubsApi from '../api/ClubsApi';

const MAX_FIELD_WIDTH = (Dimensions.get('screen').width * 3) / 4;
const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#636e72',
    alignSelf: 'center',
  },
  formContainer: {
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 13,
    flex: 10,
  },
  signupButton: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    backgroundColor: '#ACCBAC',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
  },
  nameField: {
    marginLeft: 20,
  },
  signupButtonTxt: {
    fontSize: 15,
    color: '#FFF',
    alignSelf: 'center',
  },
});

const clubCategories = [
  { label: 'Computer Science', value: 'Computer Science' },
  { label: 'Research', value: 'Research' },
  { label: 'Business', value: 'Business' },
  { label: 'Arts', value: 'Arts' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Health', value: 'Health' },
  { label: 'Journalism', value: 'Journalism' },
  { label: 'Liberal Arts', value: 'Liberal Arts' },
  { label: 'Cultural', value: 'Cultural' },
  { label: 'Honor Society', value: 'Honor Society' },
  { label: 'Media', value: 'Media' },
  { label: 'Professional/Career', value: 'Professional/Career' },
  { label: 'Religious/Spiritual', value: 'Religious/Spiritual' },
  { label: 'Sport Clubs', value: 'Sport Clubs' },
  { label: 'Student Government', value: 'Student Government' },
];

export default class ClubCreation extends Component {
    static navigationOptions = {
      title: 'Create a club',
      headerStyle: { backgroundColor: '#7e947f' },
      headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
    }

    constructor(props) {
      super(props);
      const errors = {
        clubName: false,
        clubDescription: false,
        clubCategory: false,
        position: false,
        tags: false,
        facebookLink: false,
      };
      this.state = {
        clubName: '',
        clubDescription: '',
        clubCategory: '',
        position: '',
        tags: '',
        facebookLink: '',
        processingRequest: false,
        createdClub: false,
        createdClubError: false,
        errors: { arePresent: false, data: errors },
      };
    }

  createClub = async () => {
    const {
      clubName, clubCategory, clubDescription, tags, facebookLink,
    } = this.state;
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({
      processingRequest: true,
      errors: { arePresent: false, data: validRequest.errors },
    });
    const userToken = await AsyncStorage.getItem('userToken');
    const createClubResponse = await ClubsApi.createClub(
      userToken,
      clubName,
      clubCategory,
      clubDescription,
      tags,
      facebookLink,
    );
    if (createClubResponse.successfulRequest) {
      this.setState({ createdClub: true, processingRequest: false });
    } else {
      console.log(createClubResponse.error);
      this.setState({ createdClubError: true, processingRequest: false });
    }
  };

  isRequestValid = () => {
    const {
      clubName, clubCategory, clubDescription, tags, facebookLink, position, errors,
    } = this.state;
    const errorData = errors;
    errorData.clubName = clubName === '' || clubName.length < 3;
    errorData.clubDescription = clubDescription === '' || clubDescription.length < 3;
    errorData.clubCategory = clubCategory === '' || clubCategory.length < 3;
    errorData.facebookLink = !!facebookLink && !this.validURL(facebookLink);
    errorData.position = !!position
      && (position !== '' || position.length < 3);
    errorData.tags = tags === '';

    let validRequest = true;
    Object.keys(errorData).forEach((input) => {
      if (errorData[input]) {
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
      errors, createdClubError, processingRequest, createdClub,
    } = this.state;
    if (createdClub) {
      return (
        // Add routing to admin club management screen
        <Text>Successfully created club!</Text>
      );
    }
    return (
      <Form>
        {createdClubError && (
          <Text style={styles.error}>
            Unable to create a club, try again later!
          </Text>
        )}
        <Text style={styles.header}>Create Club</Text>
        {errors.arePresent && errors.data.clubName && (
          <Text style={styles.error}>Please select a valid club name</Text>
        )}
        <TextInputBox
          placeholder="Club name"
          setValue={(value) => this.setState({ clubName: value })}
        />
        {errors.arePresent && errors.data.position && (
          <Text style={styles.error}>Please select a valid position</Text>
        )}
        <TextInputBox
          placeholder="Position (optional)"
          setValue={(value) => this.setState({ position: value })}
        />
        {errors.arePresent
          && errors.data.facebookLink && (
            <Text style={styles.error}>
              Please select a valid facebook link
            </Text>
        )}
        <TextInputBox
          placeholder="Facebook link (optional)"
          setValue={(value) => this.setState({ facebookLink: value })}
        />
        {errors.arePresent
          && errors.data.clubDescription && (
            <Text style={styles.error}>
              Please select a valid club description
            </Text>
        )}
        <TextInputBox
          multiline
          placeholder="Description"
          setValue={(value) => this.setState({ clubDescription: value })}
        />
        {errors.arePresent
          && errors.data.clubCategory && (
            <Text style={styles.error}>
              Please select a valid club category
            </Text>
        )}
        <NativePicker
          items={clubCategories}
          placeholder={{ label: '  Select category...' }}
          setValue={(value) => this.setState({ clubCategory: value })}
        />
        {errors.arePresent && errors.data.tags && (
          <Text style={styles.error}>
            Enter at least one tag or more (ex: &apos;sports,tennis&apos;)
          </Text>
        )}
        <TextInputBox
          multiline={false}
          placeholder="Tags (separated by commas)"
          setValue={(value) => this.setState({ tags: value })}
        />
        <TouchableOpacity style={styles.signupButton} onPress={this.createClub}>
          <Text style={styles.signupButtonTxt} onClick={this.createClub}>
            {processingRequest ? 'creating...' : 'Create Club'}
          </Text>
        </TouchableOpacity>
      </Form>
    );
  }
}
