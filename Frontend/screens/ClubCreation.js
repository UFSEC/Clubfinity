import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Form from "../components/Form/Form";
import TextInputBox from "../components/Form/TextInputBox";
import NativePicker from "../components/Form/NativePicker";
import ClubsApi from "../api/ClubsApi";
import { AsyncStorage } from "react-native";

const { width } = Dimensions.get("screen");

const clubCategories = [
  { label: "Computer Science", value: "Computer Science" },
  { label: "Research", value: "Research" },
  { label: "Business", value: "Business" },
  { label: "Arts", value: "Arts" },
  { label: "Engineering", value: "Engineering" },
  { label: "Health", value: "Health" },
  { label: "Journalism", value: "Journalism" },
  { label: "Liberal Arts", value: "Liberal Arts" },
  { label: "Cultural", value: "Cultural" },
  { label: "Honor Society", value: "Honor Society" },
  { label: "Media", value: "Media" },
  { label: "Professional/Career", value: "Professional/Career" },
  { label: "Religious/Spiritual", value: "Religious/Spiritual" },
  { label: "Sport Clubs", value: "Sport Clubs" },
  { label: "Student Government", value: "Student Government" },
]

export default class ClubCreation extends Component {
    static navigationOptions = {
        title: 'Create a club',
        headerStyle: { backgroundColor: '#7e947f' },
        headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
    }
    constructor(props) {
        super(props);
        const errors = {
            clubName: false,
            clubDescription: false,
            clubCategory: false,
            position: false,
            tags: false,
            facebookLink: false
        };
        this.state = {
            clubName: "",
            clubDescription: "",
            clubCategory: "",
            position: "",
            tags: "",
            facebookLink: "",
            processingRequest: false,
            createdClub: false,
            createdClubError: false,
            errors: { arePresent: false, data: errors }
        };
    }

  createClub = async () => {
    const validRequest = this.isRequestValid();
    if (!validRequest.valid) {
      this.setState({
        errors: { arePresent: true, data: validRequest.errors }
      });
      return;
    }
    this.setState({
      processingRequest: true,
      errors: { arePresent: false, data: validRequest.errors }
    });
    const userToken = await AsyncStorage.getItem("userToken");
    let createClubResponse = await ClubsApi.createClub(
      userToken,
      this.state.clubName,
      this.state.clubCategory,
      this.state.clubDescription,
      this.state.tags,
      this.state.facebookLink
    );
    if (createClubResponse.successfulRequest) {
      this.setState({ createdClub: true, processingRequest: false });
    } else {
      console.log(createClubResponse.error);
      this.setState({ createdClubError: true, processingRequest: false });
    }
  };

  isRequestValid = () => {
    let errors = this.state.errors.data;
    errors["clubName"] =
      this.state.clubName == "" || this.state.clubName.length < 3;
    errors["clubDescription"] =
      this.state.clubDescription == "" || this.state.clubDescription.length < 3;
    errors["clubCategory"] =
      this.state.clubCategory == "" || this.state.clubCategory.length < 3;
    errors["facebookLink"] =
      !!this.state.facebookLink && !this.validURL(this.state.facebookLink);
    errors["position"] =
      !!this.state.position &&
      (this.state.position != "" || this.state.position.length < 3);
    errors["tags"] = this.state.tags == "";

    let validRequest = true;
    Object.keys(errors).forEach(function(input) {
      if (errors[input]) {
        validRequest = false;
      }
    });
    return { valid: validRequest, errors: errors };
  };

  validURL = str => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str) && str.toLowerCase().includes("facebook");
  };

  render() {
    if (this.state.createdClub) {
      return (
        // Add routing to admin club management screen
        <Text>Successfully created club!</Text>
      );
    }
    return (
      <Form>
        {this.state.createdClubError && (
          <Text style={styles.error}>
            Unable to create a club, try again later!
          </Text>
        )}
        <Text style={styles.header}>Create Club</Text>
        {this.state.errors.arePresent && this.state.errors.data["clubName"] && (
          <Text style={styles.error}>Please select a valid club name</Text>
        )}
        <TextInputBox
          placeholder={"Club name"}
          setValue={value => this.setState({ clubName: value })}
        />
        {this.state.errors.arePresent && this.state.errors.data["position"] && (
          <Text style={styles.error}>Please select a valid position</Text>
        )}
        <TextInputBox
          placeholder={"Position (optional)"}
          setValue={value => this.setState({ position: value })}
        />
        {this.state.errors.arePresent &&
          this.state.errors.data["facebookLink"] && (
            <Text style={styles.error}>
              Please select a valid facebook link
            </Text>
          )}
        <TextInputBox
          placeholder={"Facebook link (optional)"}
          setValue={value => this.setState({ facebookLink: value })}
        />
        {this.state.errors.arePresent &&
          this.state.errors.data["clubDescription"] && (
            <Text style={styles.error}>
              Please select a valid club description
            </Text>
          )}
        <TextInputBox
          multiline={true}
          placeholder={"Description"}
          setValue={value => this.setState({ clubDescription: value })}
        />
        {this.state.errors.arePresent &&
          this.state.errors.data["clubCategory"] && (
            <Text style={styles.error}>
              Please select a valid club category
            </Text>
          )}
        <NativePicker
          items={clubCategories}
          placeholder={{ label: "  Select category..." }}
          setValue={value => this.setState({ clubCategory: value })}
        />
        {this.state.errors.arePresent && this.state.errors.data["tags"] && (
          <Text style={styles.error}>
            Enter at least one tag or more (ex: 'sports,tennis')
          </Text>
        )}
        <TextInputBox
          multiline={false}
          placeholder={"Tags (separated by commas)"}
          setValue={value => this.setState({ tags: value })}
        />
        <TouchableOpacity style={styles.signupButton} onPress={this.createClub}>
          <Text style={styles.signupButtonTxt} onClick={this.createClub}>
            {this.state.processingRequest ? "creating..." : "Create Club"}
          </Text>
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
