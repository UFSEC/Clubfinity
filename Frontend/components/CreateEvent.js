import React, { Component } from 'react';
import { Dimensions, TextInput, View, Modal, Button, Text, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            eventName: '',
            eventLocation: '',
            eventDescription: ''
        };
    }

    setModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    }
    handleCreateEvent = () => {
        // TODO: Ready to be sent to database!
        console.log('Event fields were successfully updated!');
        console.log('eventName: ' + this.state.eventName);
        console.log('eventLocation: ' + this.state.eventLocation);
        console.log('eventDescription: ' + this.state.eventDescription);
    }

    render() {
        return (
            <View>
                <View style={styles.createEventBtn}>
                    <FontAwesome.Button
                        style={{ borderWidth: 1, borderColor: 'green' }}
                        backgroundColor="transparent"
                        name="plus-circle"
                        color="green"
                        onPress={() => { this.setModalVisible(true) }}
                    >
                        Create Event
                    </FontAwesome.Button>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View>
                        <View style={styles.modalContainer}>
                            <View style={{ marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                                <Text style={styles.textTitle}>Create an Event</Text>
                            </View>
                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Event Name"
                                placeholderTextColor={'#8E8E93'}
                                value={this.state.eventName}
                                onChangeText={(text) => this.setState({ eventName: text })}
                            />
                            <TextInput
                                style={styles.modalTextInput}
                                placeholderTextColor={'#8E8E93'}
                                placeholder="Location"
                                value={this.state.eventLocation}
                                onChangeText={(text) => this.setState({ eventLocation: text })}
                            />
                            <TextInput
                                style={[styles.modalTextInput, {height: 100}]}
                                numberOfLines={5}
                                placeholderTextColor={'#8E8E93'}
                                placeholder="Description"
                                value={this.state.eventDescription}
                                onChangeText={(text) => this.setState({ eventDescription: text })}
                            />
                            <View style={styles.modalRow}>
                                <FontAwesome.Button
                                    name="remove"
                                    backgroundColor="gray"
                                    style={styles.modalButtons}
                                    onPress={() => { this.setModalVisible(false) }}
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
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    createEventBtn: {
        display: 'flex',
        // flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: '#fff',
        marginTop: Dimensions.get('window').height * 0.25,
        marginHorizontal: Dimensions.get('window').width * 0.05,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        borderWidth: 4,
        padding: 15,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 200
    },
    modalRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 20
    },
    modalButtons: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
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

export { CreateEvent };