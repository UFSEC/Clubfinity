import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

 class Preferences extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            admin:false
        }	
    }
    
    render() {
       
        return (
            <View style={styles.container} bounces={false}>
                <TouchableOpacity style={styles.innerContainer}
                onPress={() => {
                    this.props.navigation.navigate({ routeName: 'Edit' })
                  }}> 

                <FontAwesome color='#636e72' size={24} name="edit"/>
                    <Text style={styles.textStyle}>
                        Edit Profile
                    </Text>
                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerContainer}
                 onPress={() => {
                    this.props.navigation.navigate({ routeName: 'Setting' })
                  }}>
                <FontAwesome color='#636e72' size={24} name="cog" />
                    <Text style={styles.textStyle}>
                        Settings
                    </Text>
                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerContainer}>
                <FontAwesome color='#636e72' size={24} name="flag" />
                    <Text style={styles.textStyle}>
                       Report a Problem
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerContainer}
                onPress={() => {
                    this.props.navigation.navigate({ routeName: 'ClubCreationScr' })
                  }}>
                <FontAwesome color='#636e72' size={24} name="plus" />
                    <Text style={styles.textStyle}>
                        Create a Club
                    </Text>
                </TouchableOpacity >
               
                <TouchableOpacity style={styles.innerContainer} onPress={this.props.signOut}>
                <FontAwesome color='#636e72' size={24} name="sign-out" />
                    <Text style={styles.textStyle}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const {width} = Dimensions.get('screen')
const styles = StyleSheet.create({
    container:{
        width:width
    },
    innerContainer:{
        padding:12,
        //paddingBottom:10,
        borderBottomColor: '#636e72',
        borderBottomWidth: 1,
        flexDirection:'row',
        fontSize: 40,
    },
    textStyle: {
        marginLeft:20,
        fontSize:17,
        letterSpacing:2,
        color: '#636e72'
    }
})
export default withNavigation(Preferences);