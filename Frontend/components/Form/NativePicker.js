import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class NativePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Platform.OS === "ios" ? styles.iOS : styles.android}>
        <RNPickerSelect
          onValueChange={(value) => this.props.setValue(value)}
          items={this.props.items}
          placeholder={this.props.placeholder}
          style={{
            placeholder: { color: '#8E8E93' },
            inputIOS: { color: 'black', minHeight: 30 },
            inputAndroid: { color: 'black' },
          }}
        />
      </View>
    );
  }
}

const txtFieldBgColor = "#F4F4F4";
const styles = StyleSheet.create({
  iOS: {
    flex: 1,
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    minHeight: 60,
    maxHeight: 60,
  },
  android: {
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    maxHeight: 50,

  }
})