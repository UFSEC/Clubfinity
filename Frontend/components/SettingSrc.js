import React from 'react'
import { StyleSheet, Text, View, Dimensions, Switch } from 'react-native'
const { width, height } = Dimensions.get('screen')

export default class SettingSrc extends React.Component {
  state = {
    profieViewSwitch: false
  }

  render() {
    return (
      <View style={styles.section}>
        <View>
          <View style={styles.option}>
            <Text style={styles.textStyle}>{this.props.text}</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.profieViewSwitch}
              onValueChange={value =>
                this.setState({ profieViewSwitch: value })
              }
            />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  section: {
    flexDirection: 'column',
    marginBottom: 14,
    paddingBottom: 2,
    marginTop: 20,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1
  },
  textStyle: {
    fontWeight: '500',
    paddingRight: 5
  },
  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})