import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Form from '../components/Form/Form';
import TextInputBox from '../components/Form/TextInputBox'
import NativePicker from '../components/Form/NativePicker'

export default class SignupScr extends React.Component {
  static navigationOptions = {
    header: null
  }

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
      triedSubmitting: false
    }
  }

  // Renders Error text if name field input is incorrect
  errorName = (input) => {
    console.log("---------------");
    console.log(input);
    if (input == '' || !(/^[a-zA-Z()]+$/.test(input))) {
      return (
        <Text style={styles.error}>Please enter a valid name</Text>
      );
    }
  }

  // Validates username otherwise renders error
  errorEmail = () => {
    if (this.state.email == '' || !(this.state.email.endsWith('@ufl.edu'))) {
      return (
        <Text style={styles.error}>Please enter a valid email address</Text>
      );
    }
  }

  // Validates password otherwise renders error
  errorPassword = () => {
    if (this.state.password == '' || this.state.password.length < 6) {
      return (
        <Text style={styles.error}>Please enter a valid password</Text>
      );
    } else if (this.state.password !== this.state.verifyPassword) {
      return (
        <Text style={styles.error}>Passwords don't match</Text>
      );
    }
  }

  // Validates picker menu otherwise renders error
  errorMajor = () => {
    if (this.state.major === '' || this.state.major === null) {
      return (
        <Text style={styles.error}>Please select a major</Text>
      )
    }
  }

  // Validates year picker
  errorYear = () => {
    if (this.state.classYear === '' || this.state.classYear === null) {
      return (
        <Text style={styles.error}>Please select your class year</Text>
      )
    }
  }

  signupHandler = async () => {
    this.setState({
      triedSubmitting: true
    });
  }

  setFirstName = (name) => {
    console.log(name);
    this.setState({ firstName: name });
  }

  setLastName = (name) => {
    console.log(name);
    this.setState({ lastName: name });
  }

  setMajor = (major) => {
    console.log(major);
    this.setState({ major: major });
  }

  setYear = (year) => {
    console.log(year);
    this.setState({ classYear: year });
  }

  setEmail = (email) => {
    console.log(email);
    this.setState({ email: email });
  }

  setUserName = (username) => {
    console.log(username);
    this.setState({ username: username })
  }

  setPassWord = (password) => {
    console.log(password);
    this.setState({ password: password })
  }

  setConfirmPassword = (password) => {
    console.log(password);
    this.setState({ verifyPassword: password })
  }

  render() {
    return (
      <Form>
        <Text style={styles.header}>Sign Up</Text>
        <TextInputBox
          placeholder={"First Name"}
          setValue={this.setFirstName}
        />
        {this.state.triedSubmitting && this.errorName(this.state.firstName)}

        <TextInputBox
          placeholder={"Last Name"}
          setValue={this.setLastName}
        />
        {this.state.triedSubmitting && this.errorName(this.state.lastName)}

        <NativePicker
          items={[
            { label: 'Computer Science', value: 'Computer Science' },
            { label: 'Finance', value: 'Finance' },
            { label: 'Industrial Engineering', value: 'Industrial Engineering' },
          ]}
          placeholder={{ label: 'Select major...' }}
          setValue={this.setMajor}
        />
        {this.state.triedSubmitting && this.errorMajor()}

        <NativePicker
          items={[
            { label: '2023', value: '2023' },
            { label: '2022', value: '2022' },
            { label: '2021', value: '2021' },
            { label: '2020', value: '2020' },
          ]}
          placeholder={{ label: 'Select year...' }}
          setValue={this.setYear}
        />
        {this.state.triedSubmitting && this.errorYear()}

        <TextInputBox
          placeholder={"UFL Email Address"}
          setValue={this.setEmail}
        />
        {this.state.triedSubmitting && this.errorEmail()}

        <TextInputBox
          placeholder={"Username"}
          setValue={this.setUserName}
        />
        {this.state.triedSubmitting && this.errorName(this.state.username)}

        <TextInputBox
          isHidden={true}
          placeholder={"Password"}
          setValue={this.setPassWord}
        />
        {this.state.triedSubmitting && this.errorPassword()}

        <TextInputBox
          isHidden={true}
          placeholder={"Confirm Password"}
          setValue={this.setConfirmPassword}
        />
        {this.state.triedSubmitting && this.errorPassword()}

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

const MAX_FIELD_WIDTH = Dimensions.get('screen').width * 3 / 4;
const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#636e72',
    alignSelf: "center"
  },
  formContainer: {
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 13,
    flex: 10
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
