import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

const txtFieldBgColor = '#F4F4F4';
const styles = StyleSheet.create({
  iOS: {
    flex: 1,
    backgroundColor: txtFieldBgColor,
    borderColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: 60,
  },
  android: {
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    flexGrow: 1,
    maxHeight: 50,
  },
});

export default class TextInputBox extends React.Component {
  static propTypes = {
    multiline: PropTypes.bool,
    isHidden: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  }

  static defaultProps = {
    multiline: false,
    isHidden: false,
  }

  render() {
    const {
      multiline, isHidden, placeholder, setValue,
    } = this.props;
    const isMultilineEnabled = !!multiline;
    return (
      <TextInput
        numberOfLines={isMultilineEnabled ? (Platform.OS === 'ios' ? null : 5) : null}
        minHeight={isMultilineEnabled ? (20 * 5) : null}
        multiline={isMultilineEnabled}
        secureTextEntry={isHidden}
        style={Platform.OS === 'ios' ? styles.iOS : styles.android}
        placeholderTextColor="#8E8E93"
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
      />
    );
  }
}
