import React from 'react'
import { StyleSheet, Text, View, Dimensions, Switch } from 'react-native'
const { width, height } = Dimensions.get('screen')

export default class SettingScr extends React.Component {
  static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: '#ecf0f1', letterSpacing: 2 }
  }

  render() {
    return (
      <View style={styles.section}>
        <Text style={styles.textHeader}>Christian Sarmiento</Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Major:</Text> Computer Science</Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Interest:</Text> I love to code! </Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Email:</Text> cs@gmail.com</Text>
        <Text style={styles.textSubheading}><Text style={{fontWeight: "bold"}}>Year:</Text> Senior</Text>
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
    marginHorizontal: 10,
    marginBottom: 15,
    paddingBottom: 20,
    marginTop: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1
  },
  title: {
    flexDirection: 'row',
    fontSize: 18,
    marginVertical: 10,
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
  },textSubheading: {
	alignSelf: 'flex-start',
	marginLeft:20
  }
})
