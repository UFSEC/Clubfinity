import React from "react";
import { Image, View, Platform } from "react-native";
import {
  Button,
  Text,
  Form,
  Item,
  Container,
  Content,
  Label,
  Picker,
  Input,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";
import colors from "../util/colors";
import Majors from "../data/Majors";
import ClassYears from "../data/ClassYears";
import UserContext from "../util/UserContext";
import ClubfinityLogo from "../assets/images/ClubfinityLogo.png";

export default class SignupScr extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static contextType = UserContext;

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
      processingRequest: false,
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
      errors,
      firstName,
      lastName,
      major,
      classYear,
      username,
      email,
      password,
      verifyPassword,
    } = this.state;
    const errorsData = { ...errors.data };
    errorsData.firstName = firstName === "" || !/^[a-z ,.-]+$/i.test(firstName);
    errorsData.lastName = lastName === "" || !/^[a-z ,.-]+$/i.test(lastName);
    errorsData.major = major === "" || major === null;
    errorsData.classYear =
      classYear === "" || classYear === null || Number.isNaN(Number(classYear));
    errorsData.username =
      username === "" ||
      !/^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/.test(username) ||
      username.length < 6 ||
      username.length > 20;
    errorsData.email = email === "" || !email.endsWith("@ufl.edu");
    errorsData.password = password === "" || password < 6;
    errorsData.verifyPassword =
      verifyPassword === "" || verifyPassword !== password;

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
        processingRequest: false,
        errors: { arePresent: true, data: validRequest.errors },
      });
      return;
    }
    this.setState({
      processingRequest: true,
      errors: { arePresent: false, data: validRequest.errors },
    });

    const { setUser } = this.context;
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      major,
      classYear,
    } = this.state;

    const createUserResponse = await UserApi.createUser(
      { first: firstName, last: lastName },
      major,
      classYear,
      username,
      password,
      email
    );

    if (createUserResponse.error) {
      alert("Unable to sign up! Please try again later");
      console.log(createUserResponse.error);
      this.setState({ processingRequest: false });
      return;
    }
    this.setState({ processingRequest: false });
    console.log(`Successfully created user ${username}`);

    const authResponse = await AuthApi.authenticate(username, password);
    if (authResponse.token) {
      setUser(authResponse.user);
      const { navigation } = this.props;
      await navigation.navigate("App");
    } else {
      console.log(authResponse.error);
    }
  };

  signIn = async () => {
    const { navigation } = this.props;
    navigation.navigate("SignIn");
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
    const { errors, major, classYear, processingRequest } = this.state;
    const majors = Majors.map((s) => (
      <Picker.Item value={s.value} label={s.label} />
    ));
    const classYears = ClassYears.map((s) => (
      <Picker.Item value={s.value} label={s.label} />
    ));
    return (
      <Container>
        <Content>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                margin: 30,
                marginBottom: 80,
              }}
              source={ClubfinityLogo}
            />
          </View>
          <Form isCentered>
            <Item
              fixedLabel
              style={{ width: "95%", height: 45, marginBottom: "5%" }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.email
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Email
              </Label>
              <Input
                onChangeText={(value) => this.setState({ email: value })}
                style={{ textAlign: "right" }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.email ? "Invalid Email" : ""
                }
              />
            </Item>

            <Item
              fixedLabel
              style={{ width: "95%", height: 45, marginBottom: "5%" }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.username
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Username
              </Label>
              <Input
                onChangeText={(value) => this.setState({ username: value })}
                style={{ textAlign: "right" }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.username
                    ? "Invalid Username"
                    : ""
                }
              />
            </Item>

            <Item
              fixedLabel
              style={{ width: "95%", height: 45, marginBottom: "5%" }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.firstName
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                First Name
              </Label>
              <Input
                onChangeText={(value) => this.setState({ firstName: value })}
                style={{ textAlign: "right" }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.firstName
                    ? "Invalid First Name"
                    : ""
                }
              />
            </Item>

            <Item
              fixedLabel
              style={{ width: "95%", height: 45, marginBottom: "5%" }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.lastName
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Last Name
              </Label>
              <Input
                onChangeText={(value) => this.setState({ lastName: value })}
                style={{ textAlign: "right" }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.lastName
                    ? "Invalid Last Name"
                    : ""
                }
              />
            </Item>

            <Item
              picker
              fixedLabel
              style={{ width: "95%", marginBottom: "5%" }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.major
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Major
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholderStyle={
                  errors.arePresent && errors.data.major
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder="Select major"
                selectedValue={major}
                onValueChange={(value) => this.setMajor(value)}
              >
                {majors}
              </Picker>
              {Platform.OS === "ios" ? (
                <Ionicons
                  name="md-arrow-dropdown"
                  size={20}
                  style={{ paddingTop: "1%" }}
                />
              ) : null}
            </Item>

            <Item
              picker
              fixedLabel
              style={{ width: "95%", marginBottom: "5%" }}
            >
              <Label
                style={
                  errors.arePresent && errors.data.classYear
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
              >
                Class Year
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholderStyle={
                  errors.arePresent && errors.data.classYear
                    ? { color: colors.error }
                    : { color: colors.grayScale10 }
                }
                placeholder="Select Class Year"
                selectedValue={classYear}
                onValueChange={(value) => this.setYear(value)}
              >
                {classYears}
              </Picker>
              {Platform.OS === "ios" ? (
                <Ionicons
                  name="md-arrow-dropdown"
                  size={20}
                  style={{ paddingTop: "1%" }}
                />
              ) : null}
            </Item>

            <Item
              fixedLabel
              style={{ width: "95%", height: 45, marginBottom: "5%" }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.password
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Password
              </Label>
              <Input
                secureTextEntry
                onChangeText={(value) => this.setState({ password: value })}
                style={{ textAlign: "right" }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.password
                    ? "Invalid Password"
                    : ""
                }
              />
            </Item>

            <Item
              fixedLabel
              style={{ width: "95%", height: 45, marginBottom: "5%" }}
            >
              <Label
                style={{
                  color:
                    errors.arePresent && errors.data.verifyPassword
                      ? colors.error
                      : colors.grayScale10,
                }}
              >
                Confirm Password
              </Label>
              <Input
                secureTextEntry
                onChangeText={(value) =>
                  this.setState({ verifyPassword: value })
                }
                style={{ textAlign: "right" }}
                placeholderTextColor={colors.error}
                placeholder={
                  errors.arePresent && errors.data.verifyPassword
                    ? "Invalid Confirm Password"
                    : ""
                }
              />
            </Item>
            <Button
              style={{
                alignSelf: "center",
                backgroundColor: colors.accent0,
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2%",
                marginTop: "5%",
              }}
              onPress={this.signupHandler}
            >
              <Text style={{ alignSelf: "center" }}>
                {processingRequest ? "Signing Up..." : "Sign Up"}
              </Text>
            </Button>
            <Text
              style={{ alignSelf: "center", opacity: 0.7, marginBottom: "5%" }}
            >
              Already have an account?{" "}
              <Text
                style={{ textDecorationLine: "underline" }}
                onPress={this.signIn}
              >
                Sign In
              </Text>
            </Text>
          </Form>
        </Content>
      </Container>
    );
  }
}
