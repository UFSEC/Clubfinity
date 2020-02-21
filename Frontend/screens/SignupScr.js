import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Picker,
  AsyncStorage,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    if (input == '' || !(/^[a-zA-Z()]+$/.test(input))) {
      return (
        <Text style={styles.error}>Please enter a valid name</Text>
      );
    }
  }

  // Validates username otherwise renders error
  errorEmail = () => {
    if (this.state.username == '' || !(this.state.username.endsWith('@ufl.edu'))) {
      return (
        <Text style={styles.error}>Please enter a valid username</Text>
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
    // await AsyncStorage.setItem('userToken', 'abc');
    // console.log("New user added");
    // this.props.navigation.navigate('App');
  }

  render() {
    return (
      <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} contentContainerStyle={{justifyContent: 'center', display: 'flex', flex: 1, flexDirection: 'column'}}>
        <View style={styles.container}>
          <Text style={styles.header}>Sign Up</Text>
          {/* First Name */}
          <TextInput
            style={styles.inputFieldText}
            placeholderTextColor={'#8E8E93'}
            placeholder="First Name"
            onChangeText={(text) => this.setState({ firstName: text })}
            value={this.state.firstName}
          ></TextInput>
          {this.state.triedSubmitting && this.errorName(this.state.firstName)}

          {/* Last Name */}
          <TextInput
            style={styles.inputFieldText}
            placeholderTextColor={'#8E8E93'}
            placeholder="Last Name"
            onChangeText={(text) => this.setState({ lastName: text })}
            value={this.state.lastName}
          ></TextInput>
          {this.state.triedSubmitting && this.errorName(this.state.lastName)}

          {/* Major */}
          <View style={styles.inputPicker}>
            <RNPickerSelect
              onValueChange={(value) => this.setState({ major: value })}
              items={[
                { label: 'Computer Science', value: 'Computer Science' },
                { label: 'Finance', value: 'Finance' },
                { label: 'Industrial Engineering', value: 'Industrial Engineering' },
              ]}
              placeholder={{ label: 'Select major...' }}
              style={{
                placeholder: { color: '#8E8E93' },
                inputIOS: { color: 'black', minHeight: 30 },
                inputAndroid: { color: 'black' },
              }}
            />
          </View>
          {this.state.triedSubmitting && this.errorMajor()}

          {/* Class Year */}
          <View style={styles.inputPicker}>
            <RNPickerSelect
              onValueChange={(value) => this.setState({ classYear: value })}
              items={[
                { label: '2023', value: '2023' },
                { label: '2022', value: '2022' },
                { label: '2021', value: '2021' },
                { label: '2020', value: '2020' },
              ]}
              placeholder={{ label: 'Select year...' }}
              style={{
                placeholder: { color: '#8E8E93' },
                inputIOS: { color: 'black', minHeight: 30 },
                inputAndroid: { color: 'black' },
              }}
            />
          </View>
          {this.state.triedSubmitting && this.errorYear()}

          {/* email */}
          <TextInput
            style={styles.inputFieldText}
            placeholderTextColor={'#8E8E93'}
            placeholder="UFL Email Address"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          ></TextInput>
          {this.state.triedSubmitting && this.errorEmail()}

          {/* username */}
          <TextInput
            style={styles.inputFieldText}
            placeholderTextColor={'#8E8E93'}
            placeholder="Username"
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
          ></TextInput>
          {this.state.triedSubmitting && this.errorName(this.state.username)}

          {/* password */}
          <TextInput
            style={styles.inputFieldText}
            secureTextEntry={true}
            placeholderTextColor={'#8E8E93'}
            placeholder="Password (minimum length 6)"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          ></TextInput>
          {this.state.triedSubmitting && this.errorPassword()}

          {/* double password */}
          <TextInput
            style={styles.inputFieldText}
            placeholderTextColor={'#8E8E93'}
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(text) => this.setState({ verifyPassword: text })}
            value={this.state.verifyPassword}
          ></TextInput>
          {this.state.triedSubmitting && this.errorPassword()}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={this.signupHandler}
          >
            <Text style={styles.signupButtonTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>


    );
  }
}

const MAX_FIELD_WIDTH = Dimensions.get('screen').width * 3 / 4;
const bgColor = "#FFF";
const txtFieldBgColor = "#F4F4F4";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    padding: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: bgColor,
    alignSelf: 'center',
    flexDirection: 'column',
    paddingTop: '25%',
    paddingBottom: '10%',
  },
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
    paddingVertical: 10,
    flex: 1
  },
  inputPicker: {
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    minHeight: 20,
    // paddingVertical: 11,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
