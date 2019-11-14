import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import EditForm from '../components/EditForm'

export default class EditProfile extends Component {
    static navigationOptions = {
		title: 'Clubfinity',
		headerStyle: { backgroundColor: '#7e947f' },
		headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
	}
    render() {
        return (
            <View style={styles.container}>
               <EditForm/>
            </View>
        )
    }

  

}
const styles = StyleSheet.create({
    container: {
    flex:1,  
    alignItems:'center',
     backgroundColor: '#F2F2F7'
     
    }
})