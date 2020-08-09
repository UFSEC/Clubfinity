import React, { Component } from 'react';
import {
  Dimensions, View, Modal, Text, Alert, StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import Form from './Form/Form';
import TextInputBox from './Form/TextInputBox';

const styles = StyleSheet.create({
  createEventBtn: {
    display: 'flex',
    // flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginTop: Dimensions.get('window').height * 0.25,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 4,
    padding: 15,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 200,
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  modalButtons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    padding: 10,
    borderBottomWidth: 1,
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
    marginVertical: 10,
    height: 50,
    paddingHorizontal: 20,
  },
});

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      eventName: '',
      eventLocation: '',
      eventDescription: '',
      eventDate: new Date(),
    };
  }

    setModalVisible = () => {
      const { modalVisible } = this.state;

      this.setState({
        modalVisible: !modalVisible,
      });
    }

    handleDateChange = (date) => {
      this.setState({ eventDate: date });
    }

    handleCreateEvent = () => {
      const {
        eventName, eventLocation, eventDescription, eventDate,
      } = this.state;

      // TODO: Ready to be sent to database!
      console.log('Event fields were successfully updated');
      console.log(`eventName: ${eventName}`);
      console.log(`eventLocation: ${eventLocation}`);
      console.log(`eventDescription: ${eventDescription}`);
      console.log(`eventDate: ${eventDate}`);
    }

    setName = (text) => {
      this.setState({ eventName: text });
    }

    setLocation = (text) => {
      this.setState({ eventLocation: text });
    }

    setDescription = (text) => {
      this.setState({ eventDescription: text });
    }

    render() {
      const { modalVisible, eventDate } = this.state;

      return (
        <View>
          <View style={styles.createEventBtn}>
            <FontAwesome.Button
              style={{ borderWidth: 1, borderColor: 'green' }}
              backgroundColor="transparent"
              name="plus-circle"
              color="green"
              onPress={() => { this.setModalVisible(true); }}
            >
              Create Event
            </FontAwesome.Button>
          </View>
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >

            <Form isModal>
              <View style={{ marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                <Text style={styles.textTitle}>Create an Event</Text>
              </View>
              <TextInputBox
                placeholder="Event Name"
                setValue={this.setName}
              />
              <DatePicker
                style={{ width: 200 }}
                date={eventDate}
                mode="datetime"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={this.handleDateChange}
              />
              <TextInputBox
                placeholder="Location"
                setValue={this.setLocation}
              />
              {/* TODO: Make this multiline */}
              <TextInputBox
                placeholder="Description"
                setValue={this.setDescription}
                multiline
              />
              <View style={styles.modalRow}>
                <FontAwesome.Button
                  name="remove"
                  backgroundColor="gray"
                  style={styles.modalButtons}
                  onPress={() => { this.setModalVisible(false); }}
                >
                  Cancel
                </FontAwesome.Button>
                <FontAwesome.Button
                  name="check-square"
                  backgroundColor="green"
                  style={styles.modalButtons}
                  onPress={() => { this.setModalVisible(true); this.handleCreateEvent(); }}
                >
                  Create Event
                </FontAwesome.Button>
              </View>
            </Form>
          </Modal>
        </View>
      );
    }
}
