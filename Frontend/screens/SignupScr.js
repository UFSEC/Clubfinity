import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Form from "../components/Form/Form";
import TextInputBox from "../components/Form/TextInputBox";
import NativePicker from "../components/Form/NativePicker";
import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";
import Majors from "../data/Majors"
import ClassYears from "../data/ClassYears"
import UserContext from "../util/UserContext";

export default class SignupScr extends React.Component {
  static navigationOptions = {
    header: null
  };

  static contextType = UserContext;

  // TODO
  // * Refactor backend User model to have:
  //    + major
  //    + classYear
  //    -dob
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      major: "",
      classYear: "",
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
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
          verifyPassword: false
        }
      }
    };
  }

  isRequestValid = () => {
    let errors = this.state.errors.data;
    errors["firstName"] =
      this.state.firstName === "" || !/^[a-zA-Z()]+$/.test(this.state.firstName);
    errors["lastName"] =
      this.state.lastName === "" || !/^[a-zA-Z()]+$/.test(this.state.lastName);
    errors["major"] = this.state.major === "" || this.state.major === null;
    errors["classYear"] =
      this.state.classYear === "" ||
      this.state.classYear === null ||
      isNaN(this.state.classYear);
    errors["username"] =
      this.state.username === "" ||
      this.state.username < 6 ||
      this.state.username > 20;
    errors["email"] =
      this.state.email === "" || !this.state.email.endsWith("@ufl.edu");
    errors["password"] = this.state.password === "" || this.state.password < 6;
    errors["verifyPassword"] =
      this.state.verifyPassword === "" ||
      this.state.verifyPassword !== this.state.password;

    let validRequest = true;
    Object.keys(errors).forEach(function(input) {
      if (errors[input]) {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors: errors };
  };

  signupHandler = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        triedSubmitting: true,
        errors: { arePresent: true, data: validRequest.errors }
      });
      return;
    }
    this.setState({
      triedSubmitting: true,
      errors: { arePresent: false, data: validRequest.errors }
    });

    const { setUser } = this.context;

    let createUserResponse = await UserApi.createUser(
      { first: this.state.firstName, last: this.state.lastName },
      this.state.username,
      this.state.password,
      this.state.email
    );
    if (createUserResponse.error) {
      alert("Unable to sign up! Please try again later")
      console.log(createUserResponse.error);
      return;
    } else {
      console.log("Successfully created user " + this.state.username);
    }
    let authResponse = await AuthApi.authenticate(
      this.state.username,
      this.state.password
    );
    if (authResponse.token) {
      setUser(authResponse.user);
      await this.props.navigation.navigate("App");
    } else {
      console.log(authResponse.error);
    }
  };

  setFirstName = name => {
    this.setState({ firstName: name });
  };

  setLastName = name => {
    this.setState({ lastName: name });
  };

  setMajor = major => {
    this.setState({ major: major });
  };

  setYear = year => {
    this.setState({ classYear: year });
  };

  setEmail = email => {
    this.setState({ email: email });
  };

  setUserName = username => {
    this.setState({ username: username });
  };

  setPassWord = password => {
    this.setState({ password: password });
  };

  setConfirmPassword = password => {
    this.setState({ verifyPassword: password });
  };

  render() {
    return (
      <Form isCentered={true}>
        <Text style={styles.header}>Sign Up</Text>
        {this.state.triedSubmitting && this.state.errors.data["firstName"] && (
            <Text style={styles.error}>Please enter a valid name</Text>
        )}
        <TextInputBox placeholder={"First Name"} setValue={this.setFirstName} />

        {this.state.triedSubmitting && this.state.errors.data["lastName"] && (
            <Text style={styles.error}>Please enter a valid name</Text>
        )}
        <TextInputBox placeholder={"Last Name"} setValue={this.setLastName} />

        {this.state.triedSubmitting && this.state.errors.data["major"] && (
            <Text style={styles.error}>Please select a major</Text>
        )}
        <NativePicker
          items={Majors}
          placeholder={{ label: "Select major..." }}
          setValue={this.setMajor}
        />

        {this.state.triedSubmitting && this.state.errors.data["classYear"] && (
            <Text style={styles.error}>Please select your class year</Text>
        )}
        <NativePicker
          items={ClassYears}
          placeholder={{ label: "Select year..." }}
          setValue={this.setYear}
        />

        {this.state.triedSubmitting && this.state.errors.data["email"] && (
            <Text style={styles.error}>Please enter a valid email</Text>
        )}
        <TextInputBox
          placeholder={"UFL Email Address"}
          setValue={this.setEmail}
        />

        {this.state.triedSubmitting && this.state.errors.data["username"] && (
            <Text style={styles.error}>
              Please enter a valid username (between 6 and 20 characters)
            </Text>
        )}
        <TextInputBox placeholder={"Username"} setValue={this.setUserName} />

        {this.state.triedSubmitting && this.state.errors.data["password"] && (
            <Text style={styles.error}>
              Please enter a valid password (at least 6 characters)
            </Text>
        )}
        <TextInputBox
          isHidden={true}
          placeholder={"Password"}
          setValue={this.setPassWord}
        />

        {this.state.triedSubmitting &&
        this.state.errors.data["verifyPassword"] && (
            <Text style={styles.error}>Passwords don't match</Text>
        )}
        <TextInputBox
          isHidden={true}
          placeholder={"Confirm Password"}
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

const MAX_FIELD_WIDTH = (Dimensions.get("screen").width * 3) / 4;
const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    paddingHorizontal: 10
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#636e72",
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
    backgroundColor: "#ACCBAC",
    borderWidth: 1,
    borderColor: "#ACCBAC",
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3
  },
  nameField: {
    marginLeft: 20
  },
  signupButtonTxt: {
    fontSize: 15,
    color: "#FFF",
    alignSelf: "center"
  }
});
