import React from "react";
import {
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView,
  Picker,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";

export default class SignupScr extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      major: "",
      classYear: "",
      username: "",
      password: "",
      verifyPassword: "",
      triedSubmitting: false
    };
  }

  // Renders Error text if name field input is incorrect
  errorName = input => {
    if (input == "" || !/^[a-zA-Z()]+$/.test(input)) {
      return <Text style={styles.error}>Please enter a valid name</Text>;
    }
  };

  // Validates username otherwise renders error
  errorUsername = () => {
    if (
      this.state.username == "" ||
      !this.state.username.endsWith("@ufl.edu")
    ) {
      return <Text style={styles.error}>Please enter a valid username</Text>;
    }
  };

  // Validates password otherwise renders error
  errorPassword = () => {
    if (this.state.password == "" || this.state.password.length < 6) {
      return <Text style={styles.error}>Please enter a valid password</Text>;
    } else if (this.state.password !== this.state.verifyPassword) {
      return <Text style={styles.error}>Passwords don't match</Text>;
    }
  };

  signupHandler = async () => {
    this.setState({
      triedSubmitting: true
    });
    await UserApi.createUser(
      { first: this.state.firstName, last: this.state.lastName },
      this.state.username,
      this.state.password
    );
    let authResponse = await AuthApi.authenticate(
      this.state.username,
      this.state.password
    );
    if (authResponse.token) {
      await this.props.navigation.navigate("App");
    } else {
      console.log("Unable to add new user");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1, display: "flex" }}>
          <Text style={styles.header}>Sign Up</Text>
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior="padding"
            keyboardVerticalOffset={50}
          >
            {/* First Name */}
            <TextInput
              style={styles.inputFieldText}
              placeholderTextColor={"#8E8E93"}
              placeholder="First Name"
              onChangeText={text => this.setState({ firstName: text })}
              value={this.state.firstName}
            ></TextInput>
            {this.state.triedSubmitting && this.errorName(this.state.firstName)}

            {/* Last Name */}
            <TextInput
              style={styles.inputFieldText}
              placeholderTextColor={"#8E8E93"}
              placeholder="Last Name"
              onChangeText={text => this.setState({ lastName: text })}
              value={this.state.lastName}
            ></TextInput>
            {this.state.triedSubmitting && this.errorName(this.state.lastName)}

            {/* Major */}
            <View style={styles.inputPicker}>
              <Picker
                selectedValue={this.state.major}
                style={{ flex: 1 }}
                itemStyle={styles.pickerDropdown}
                mode={"dialog"}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ major: itemValue })
                }
              >
                {/* Need to replace this with a separate major select view */}
                <Picker.Item
                  label="Computer Science"
                  value="computer science"
                />
                <Picker.Item
                  label="Business Administration"
                  value="business administration"
                />
                <Picker.Item
                  label="Mechanical Engineering"
                  value="mech engineering"
                />
                <Picker.Item label="Architecture" value="architecture" />
                <Picker.Item label="Anthropology" value="anthropology" />
                <Picker.Item
                  label="Chemical Engineering"
                  value="chem engineering"
                />
              </Picker>
            </View>

            {/* Class Year */}
            <View style={styles.inputPicker}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.state.classYear}
                itemStyle={styles.pickerDropdown}
                mode={"dialog"}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ classYear: itemValue })
                }
              >
                {/* Need to change this so that years are calculated dynamically */}
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
              </Picker>
            </View>

            {/* username */}
            <TextInput
              style={styles.inputFieldText}
              placeholderTextColor={"#8E8E93"}
              placeholder="Username (UF email)"
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
            ></TextInput>
            {this.state.triedSubmitting && this.errorUsername()}

            {/* password */}
            <TextInput
              style={styles.inputFieldText}
              secureTextEntry={true}
              placeholderTextColor={"#8E8E93"}
              placeholder="Password (minimum length 6)"
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            ></TextInput>
            {this.state.triedSubmitting && this.errorPassword()}

            {/* double password */}
            <TextInput
              style={styles.inputFieldText}
              placeholderTextColor={"#8E8E93"}
              secureTextEntry={true}
              placeholder="Reenter Password"
              onChangeText={text => this.setState({ verifyPassword: text })}
              value={this.state.verifyPassword}
            ></TextInput>
            {this.state.triedSubmitting && this.errorPassword()}
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={this.signupHandler}
          >
            <Text style={styles.signupButtonTxt}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const MAX_FIELD_WIDTH = (Dimensions.get("screen").width * 3) / 4;
const bgColor = "#FFF";
const txtFieldBgColor = "#F4F4F4";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 20,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
    backgroundColor: bgColor,
    flexDirection: "column"
  },
  error: {
    color: "red",
    fontSize: 12,
    paddingHorizontal: 10
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#636e72",
    flex: 1,
    alignSelf: "center"
  },
  formContainer: {
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 13,
    flex: 10
  },
  inputFieldText: {
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 1
  },
  inputPicker: {
    color: txtFieldBgColor,
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flex: 1
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
