import React from 'react'
import { StyleSheet, Text, View, Dimensions, Switch } from 'react-native'
const { width, height } = Dimensions.get('screen')
import { primary,card } from '../assets/styles/stylesheet';

export default class SettingScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 }
  }
  constructor(props){
    super(props);
    this.state = {
      Name: 'Christian Sarmiento',
      Major: 'Computer Science',
      Interests: 'I love to code',
      Email: 'cs@gmail.com',
      Year: 'Senior'

      }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.Name}</Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Major:</Text> {this.state.Major}</Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Interest:</Text> {this.state.Interests} </Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Email:</Text> {this.state.Email}</Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Year:</Text> {this.state.Year}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    borderWidth: 4,
    elevation: 3
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginBottom: 15,
    paddingBottom: 20,
    marginTop: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2980b9'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontWeight: '500'
  },
  option: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSubheading: {
	alignSelf: 'flex-start',
	marginTop:20
  }
})
