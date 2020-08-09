import React from 'react';
import {
  StyleSheet, Text, View, Switch,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flexDirection: 'column',
    marginBottom: 14,
    paddingBottom: 2,
    marginTop: 20,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  textStyle: {
    fontWeight: '500',
    paddingRight: 5,
  },
  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class SettingSrc extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profileViewSwitch: false,
    };
  }

  render() {
    const { profileViewSwitch } = this.state;
    const { text } = this.props;

    return (
      <View style={styles.section}>
        <View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>{text}</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={profileViewSwitch}
              onValueChange={(value) => this.setState({ profileViewSwitch: value })}
            />
          </View>
        </View>
      </View>
    );
  }
}
