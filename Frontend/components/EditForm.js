import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';

const { width } = Dimensions.get('screen');

const txtFieldBgColor = '#F4F4F4';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingTop: '20%',
  },
  saveButtonText: {
    fontSize: 15,
    color: '#FFF',
    alignSelf: 'center',
  },
  saveButton: {
    padding: 10,
    minWidth: width / 2,
    backgroundColor: '#ACCBAC',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,

    elevation: 3,
    alignSelf: 'center',
  },
  modalTextInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E5E4EA',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E4EA',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  inputPicker: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    marginBottom: 40,

    paddingHorizontal: 10,

    flex: 1,
    alignSelf: 'center',
    width: width / 2,
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default class EditForm extends Component {
  static navigationOptions = {
    title: 'Edit Profile Information',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 },
  };

  constructor(props) {
    super(props);
    // You can prepopulate state with previous values the individual has
    this.state = {
      interest: '',
      year: '',
      user: '',
      classYear: '',
      major: '',
    };
  }

  handleChangeMajor = (itemValue, itemIndex) => {
    if (itemIndex !== 0) {
      this.setState({ clubCategory: itemValue });
    }
  };

  saveHandler = () => {
    // Checks if data is retrieved and Resets state after its sent
    console.log(this.state);
    this.setState({
      interest: '',
      year: '',
      user: '',
      classYear: '',
      major: '',
    });
    // Checks that its empty
    console.log(this.state);
  };

  render() {
    const { clubName, interest, clubCategory } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            maxLength={20}
            style={[styles.modalTextInput, { height: 50 }]}
            placeholder="Major"
            placeholderTextColor="#8E8E93"
            value={clubName}
            onChangeText={(text) => this.setState({ major: text })}
          />

          <TextInput
            maxLength={120}
            style={[styles.modalTextInput, { height: 135 }]}
            numberOfLines={5}
            multiline
            placeholderTextColor="#8E8E93"
            placeholder="Interest"
            value={interest}
            onChangeText={(text) => this.setState({ interest: text })}
          />
          <View style={styles.inputPicker}>
            <Picker
              selectedValue={clubCategory}
              style={{ flex: 1, height: 100 }}
              itemStyle={styles.pickerDropdown}
              mode="dialog"
              onValueChange={this.handleChangeMajor}
            >
              <Picker.Item label="Select a Year " value="0" />

              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.saveHandler}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
