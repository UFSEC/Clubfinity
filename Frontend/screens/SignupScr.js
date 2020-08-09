import React from 'react';
import {
  Dimensions, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import Form from '../components/Form/Form';
import TextInputBox from '../components/Form/TextInputBox';
import NativePicker from '../components/Form/NativePicker';
import AuthApi from '../api/AuthApi';
import UserApi from '../api/UserApi';
import Majors from '../data/Majors';
import ClassYears from '../data/ClassYears';
import UserContext from '../util/UserContext';

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

export default class SignupScr extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      major: '',
      classYear: '',
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      triedSubmitting: false,
      errors: {
        arePresent: false,
        data: {
          firstName: false,
          lastName: false,
          major: false,
          classYear: false,
          username: false,
          email: false,
          password: false,
          verifyPassword: false,
        },
      },
    };
  }

  isRequestValid = () => {
    const {
      errors, firstName, lastName, major, classYear, username, email, password, verifyPassword,
    } = this.state;
    const errorsData = { ...errors.data };
    errorsData.firstName = firstName === '' || !/^[a-zA-Z()]+$/.test(firstName);
    errorsData.lastName = lastName === '' || !/^[a-zA-Z()]+$/.test(lastName);
    errorsData.major = major === '' || major === null;
    errorsData.classYear = classYear === ''
      || classYear === null
      || Number.isNaN(Number(classYear));
    errorsData.username = username === ''
      || username < 6
      || username > 20;
    errorsData.email = email === '' || !email.endsWith('@ufl.edu');
    errorsData.password = password === '' || password < 6;
    errorsData.verifyPassword = verifyPassword === ''
      || verifyPassword !== password;

    let validRequest = true;
    Object.keys(errorsData).forEach((input) => {
      if (errorsData[input]) {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors: errorsData };
  };

  signupHandler = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        triedSubmitting: true,
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({
      triedSubmitting: true,
      errors: { arePresent: false, data: validRequest.errors },
    });

    const { setUser } = this.context;
    const {
      firstName, lastName, username, password, email,
    } = this.state;

    const createUserResponse = await UserApi.createUser(
      { first: firstName, last: lastName },
      username,
      password,
      email,
    );
    if (createUserResponse.error) {
      alert('Unable to sign up! Please try again later');
      console.log(createUserResponse.error);
      return;
    }
    console.log(`Successfully created user ${username}`);

    const authResponse = await AuthApi.authenticate(
      username,
      password,
    );
    if (authResponse.token) {
      setUser(authResponse.user);
      const { navigation } = this.props;
      await navigation.navigate('App');
    } else {
      console.log(authResponse.error);
    }
  };

  setFirstName = (name) => {
    this.setState({ firstName: name });
  };

  setLastName = (name) => {
    this.setState({ lastName: name });
  };

  setMajor = (major) => {
    this.setState({ major });
  };

  setYear = (year) => {
    this.setState({ classYear: year });
  };

  setEmail = (email) => {
    this.setState({ email });
  };

  setUserName = (username) => {
    this.setState({ username });
  };

  setPassWord = (password) => {
    this.setState({ password });
  };

  setConfirmPassword = (password) => {
    this.setState({ verifyPassword: password });
  };

  render() {
    const { triedSubmitting, errors } = this.state;
    return (
      <Form isCentered>
        <Text style={styles.header}>Sign Up</Text>
        {triedSubmitting && errors.data.firstName && (
        <Text style={styles.error}>Please enter a valid name</Text>
        )}
        <TextInputBox placeholder="First Name" setValue={this.setFirstName} />

        {triedSubmitting && errors.data.lastName && (
        <Text style={styles.error}>Please enter a valid name</Text>
        )}
        <TextInputBox placeholder="Last Name" setValue={this.setLastName} />

        {triedSubmitting && errors.data.major && (
        <Text style={styles.error}>Please select a major</Text>
        )}
        <NativePicker
          items={Majors}
          placeholder={{ label: 'Select major...' }}
          setValue={this.setMajor}
        />

        {triedSubmitting && errors.data.classYear && (
        <Text style={styles.error}>Please select your class year</Text>
        )}
        <NativePicker
          items={ClassYears}
          placeholder={{ label: 'Select year...' }}
          setValue={this.setYear}
        />

        {triedSubmitting && errors.data.email && (
        <Text style={styles.error}>Please enter a valid email</Text>
        )}
        <TextInputBox
          placeholder="UFL Email Address"
          setValue={this.setEmail}
        />

        {triedSubmitting && errors.data.username && (
        <Text style={styles.error}>
          Please enter a valid username (between 6 and 20 characters)
        </Text>
        )}
        <TextInputBox placeholder="Username" setValue={this.setUserName} />

        {triedSubmitting && errors.data.password && (
        <Text style={styles.error}>
          Please enter a valid password (at least 6 characters)
        </Text>
        )}
        <TextInputBox
          isHidden
          placeholder="Password"
          setValue={this.setPassWord}
        />

        {triedSubmitting
        && errors.data.verifyPassword && (
        <Text style={styles.error}>Passwords do not match</Text>
        )}
        <TextInputBox
          isHidden
          placeholder="Confirm Password"
          setValue={this.setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={this.signupHandler}
        >
          <Text style={styles.signupButtonTxt}>Sign Up</Text>
        </TouchableOpacity>
      </Form>
    );
  }
}
