import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class TextInputBox extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <TextInput
                style={styles.iOS}
                placeholderTextColor={'#8E8E93'}
                placeholder={this.props.placeholder}
                onChangeText={(text) => this.props.setValue(text)}
                value={this.props.firstName}
            />
        );
    }
}

const txtFieldBgColor = "#F4F4F4";
const styles = StyleSheet.create({
    iOS: {
            backgroundColor: txtFieldBgColor,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: txtFieldBgColor,
            margin: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flex: 1,
    },
})