import React from 'react'
import { StyleSheet, Text, View, Dimensions, Switch } from 'react-native'
import { SearchBar } from 'react-native-elements'
const { width, height } = Dimensions.get('screen')

export default class App extends React.Component {
  state = {
    search: '',
    switchVal1: false,
    switchVal2: true,
    switchVal3: true,
    switchVal4: true,
    switchVal5: true,
    switchVal6: true,
    switchVal7: true,
    switchVal8: true
  }

  updateSearch = search => {
    this.setState({ search })
  }

  render() {
    const { search } = this.state

    return (
      <View style={styles.section}>
        <SearchBar
          autoCorrect={false}
          style={styles.option}
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
          round={true}
          ref={search => {
            this.searchBar = search
          }}
        />
        <View>
          <Text style={styles.title}>Privacy Settings</Text>
        </View>
        <View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>
              Allow students to view my profile
            </Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal1}
              onValueChange={value => this.setState({ switchVal1: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>
              Allow club members to view my profile
            </Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal2}
              onValueChange={value => this.setState({ switchVal2: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>Show only Free Spots</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal3}
              onValueChange={value => this.setState({ switchVal3: value })}
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View>
          <Text style={styles.title}>Notification Settings</Text>
        </View>
        <View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>Sounds</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal4}
              onValueChange={value => this.setState({ switchVal4: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>Notification Center</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal5}
              onValueChange={value => this.setState({ switchVal5: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>Badge Icons</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal6}
              onValueChange={value => this.setState({ switchVal6: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>Banners</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal7}
              onValueChange={value => this.setState({ switchVal7: value })}
            />
          </View>
          <View style={styles.option}>
            <Text style={{ fontWeight: '500' }}>Lock Screen</Text>
            <Switch
              ios_backgroundColor="#EAEAED"
              value={this.state.switchVal8}
              onValueChange={value => this.setState({ switchVal8: value })}
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
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    marginTop: 20,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1
  },
  title: {
    flexDirection: 'row',
    fontSize: 18,
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800'
  },

  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
