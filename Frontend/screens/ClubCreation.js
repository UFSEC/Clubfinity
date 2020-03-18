import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Form from '../components/Form/Form';
import TextInputBox from '../components/Form/TextInputBox';
import NativePicker from '../components/Form/NativePicker';

const { width } = Dimensions.get("screen");
export default class ClubCreation extends Component {
  static navigationOptions = {
    title: "Clubfinity",
    headerStyle: { backgroundColor: "#7e947f" },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 }
  };
  constructor(props) {
    super(props);
    this.state = {
      clubName: "",
      clubDescription: "",
      clubCategory: "",
      position: "",
      tags: "",
      facebookLink: ""
    };
  }

  createClub = () => {
      if (isClubInputValid()) {

      }
  };

  isClubInputValid = () => {

  }

  render() {
    return (
      <Form>
          <Text style={styles.header}>Create Club</Text>
          <TextInputBox
            placeholder={"Club name"}
            setValue={value => this.setState({ clubName: value })}
          />
          <Text style={styles.error}>Please select a club name</Text>
          <TextInputBox
            placeholder={"Position"}
            setValue={value => this.setState({ position: value })}
          />
          <Text style={styles.error}>Please select a position</Text>
          <TextInputBox
            placeholder={"Facebook link (optional)"}
            setValue={value => this.setState({ facebookLink: value })}
          />
          <Text style={styles.error}>Please select a facebook link</Text>
          <TextInputBox
            multiline={true}
            placeholder={"Description"}
            setValue={value => this.setState({ description: value })}
          />
          <Text style={styles.error}>Please select a description</Text>
          <NativePicker
            items={[
              { label: 'Computer Science', value: 'Computer Science' },
              { label: 'Finance', value: 'Finance' },
              { label: 'Industrial Engineering', value: 'Industrial Engineering' },
            ]}
            placeholder={{ label: '  Select category...' }}
            setValue={value => this.setState({ clubCategory: value })}
          />
          <TextInputBox
              multiline={true}
            placeholder={"Tags (separated by commas)"}
            setValue={value => this.setState({ tags: value })}
          />
          <TouchableOpacity
            style={styles.signupButton}
            onPress={this.createClub}
          >
          <Text style={styles.signupButtonTxt}>Create Club</Text>
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
