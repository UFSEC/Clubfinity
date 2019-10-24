import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  FontAwesome, MaterialCommunityIcons, Entypo, MaterialIcons
} from '@expo/vector-icons';

import SignupButton from '../components/SignupButton';

export default class SignupScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      major: '',
      classYear: '',
      username: '',
      password: '',
      verifyPassword: ''
    }
  }

  submitButtonHandler = () => {
    console.log("New user added");
  }

  verifyFirstName = (input) => {
    // Implement data verification
    this.setState({
      firstName: input
    });
  }

  verifyLastName = (input) => {
    // Data validation
    this.setState({
      lastName: input
    });
  }

  verifyUsername = (input) => {
    // validation
    this.setState({
      username: input
    });
  }

  verifyPassword = (input) => {
    this.setState({
      password: input
    });
  }
  
  verify2ndPassword = (input) => {
    this.setState({
      password: input
    });
  }

  render() {
    return (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={10}  enabled>
          {/* <View style={styles.container}> */}
          <Text style={styles.header}>Sign Up</Text>
          <View style={styles.formContainer}>

            <View style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {/* First Name */}
            <View style={styles.inputField}>
              <FontAwesome style={styles.inputFieldIcon} name="user" color={'#2980b9'} size={20} />
              <TextInput
                style={styles.inputFieldText}
                placeholderTextColor={'#8E8E93'}
                placeholder="First Name"
                onChangeText={(text) => this.verifyFirstName(text)}
                value={this.state.firstName}
              ></TextInput>
            </View>

            {/* Last Name */}
            <View style={styles.inputField}>
              {/* <FontAwesome style={styles.inputFieldIcon} name="user" color={'#2980b9'} size={24} /> */}
              <TextInput
                style={styles.inputFieldText}
                placeholderTextColor={'#8E8E93'}
                placeholder="Last Name"
                onChangeText={(text) => this.verifyLastName(text)}
                value={this.state.lastName}
              ></TextInput>
            </View>
            </View>


            {/* Major */}
            <View style={styles.inputField}>
              <MaterialCommunityIcons style={styles.inputFieldIcon} name="notebook" color={'#2980b9'} size={20} />
              <Picker
                selectedValue={this.state.major}
                style={styles.inputFieldText}
                itemStyle={styles.pickerDropdown}
                mode={'dialog'}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ major: itemValue })
                }>
                {/* Need to replace this with a separate major select view */}
                <Picker.Item label="Computer Science" value="computer science" />
                <Picker.Item label="Business Administration" value="business administration" />
                <Picker.Item label="Mechanical Engineering" value="mech engineering" />
                <Picker.Item label="Architecture" value="architecture" />
                <Picker.Item label="Anthropology" value="anthropology" />
                <Picker.Item label="Chemical Engineering" value="chem engineering" />
              </Picker>
            </View>

            {/* Class Year */}
            <View style={styles.inputField}>
              <MaterialCommunityIcons style={styles.inputFieldIcon} name="school" color={'#2980b9'} size={20} />
              <Picker
                selectedValue={this.state.classYear}
                style={styles.inputFieldText}
                itemStyle={styles.pickerDropdown}
                mode={'dialog'}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ classYear: itemValue })
                }>
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
            <View style={styles.inputField}>
              <Entypo style={styles.inputFieldIcon} name="email" color={'#2980b9'} size={20} />
              <TextInput
                style={styles.inputFieldText}
                placeholderTextColor={'#8E8E93'}
                placeholder="Username (UF email)"
                onChangeText={(text) => this.verifyUsername(text)}
                value={this.state.username}
              ></TextInput>
            </View>

            {/* password */}
            <View style={styles.inputField}>
              <MaterialIcons style={styles.inputFieldIcon} name="vpn-key" color={'#2980b9'} size={20} />
              <TextInput
                style={styles.inputFieldText}
                placeholderTextColor={'#8E8E93'}
                placeholder="Password (minumum length 6)"
                onChangeText={(text) => this.verifyPassword(text)}
                value={this.state.password}
              ></TextInput>
            </View>

              {/* double password */}
              <View style={styles.inputField}>
              <MaterialIcons style={styles.inputFieldIcon} name="vpn-key" color={'#2980b9'} size={20} />
              <TextInput
                style={styles.inputFieldText}
                placeholderTextColor={'#8E8E93'}
                placeholder="Reenter Password"
                onChangeText={(text) => this.verify2ndPassword(text)}
                value={this.state.password}
              ></TextInput>
            </View>

            <View style={styles.button}>
              <SignupButton clickHandler={this.submitButtonHandler} />
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>

    );
  }
}

const bgColor = "#F2F2F7";
const fieldColor = "#e5e5ea";
const MINIMUM_FIELD_WIDTH = Dimensions.get('screen').width - 55;
const btnWidth = Dimensions.get('screen').width / 3;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: bgColor
  },
  pickerDropdown: {
    width: 200
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 0,
    color: '#636e72',
    flex: 1,
    alignSelf: "center"
  },
  formContainer: {
    paddingHorizontal: 10,
    minWidth: Dimensions.get('screen').width,
    fontSize: 13,
    flex: 10
  },
  inputField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E4EA',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E4EA',
    marginHorizontal: 5,
    marginVertical: 5,
    // maxHeight: 50,
    // minWidth: MINIMUM_FIELD_WIDTH,
    paddingHorizontal: 10,
    flex: 1
  },
  inputFieldText: {
    marginLeft: 7,
    flex: 10
  },
  inputFieldIcon: {
    flex: 2
  },
  button: {
    marginVertical: 15,
    marginHorizontal: 10,
    maxWidth: btnWidth,
    maxHeight: 100,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  }
});
