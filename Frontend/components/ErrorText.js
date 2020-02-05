import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class ErrorText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={style.error}>{this.props.errorMessage}</Text>
    );
  }
}

const style = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 10,
  }
});