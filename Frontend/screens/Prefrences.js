import React, { Component } from 'react'
import {TouchableOpacity,Text,View,StyleSheet,Dimensions} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

 class Prefrences extends Component {
   
    constructor(props){
		super(props)
		
	}
    render() {
       
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.innerContainer}
                onPress={() => {
                    this.props.navigation.navigate({ routeName: 'Edit' })
                  }}> 

                <FontAwesome size={24} name="edit"/>
                    <Text style={styles.textStyle}>
                    
                        Edit Profile
                    </Text>
                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerContainer}
                 onPress={() => {
                    this.props.navigation.navigate({ routeName: 'Setting' })
                  }}>
                <FontAwesome size={24} name="cog" />
                    <Text style={styles.textStyle}>
                    
                        Setting
                    </Text>
                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerContainer}>
                <FontAwesome size={24} name="flag" />
                    <Text style={styles.textStyle}>
                       Report a Problem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerContainer}
                onPress={() => {
                    this.props.navigation.navigate({ routeName: 'ClubCreationScr' })
                  }}>
                <FontAwesome size={24} name="plus" />
                    <Text style={styles.textStyle}>
                        Create a Club
                    </Text>
                </TouchableOpacity >
               
                <TouchableOpacity style={styles.innerContainer}>
                <FontAwesome size={24} name="sign-out" />
                    <Text style={styles.textStyle}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const { width} = Dimensions.get('screen')
const styles = StyleSheet.create({
    container:{
        width:width
    },
    innerContainer:{
        padding:20,
        paddingBottom:20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection:'row',
        fontSize: 30
    },
    textStyle: {
        marginLeft:20,
        fontSize:20,
        
    }
})
export default withNavigation(Prefrences);