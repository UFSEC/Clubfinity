import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

const txtFieldBgColor = '#F4F4F4';
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

  },
});

export default class NativePicker extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  }

  render() {
    const { items, placeholder, setValue } = this.props;

    return (
      <View style={Platform.OS === 'ios' ? styles.iOS : styles.android}>
        <RNPickerSelect
          onValueChange={(value) => setValue(value)}
          items={items}
          placeholder={placeholder}
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
