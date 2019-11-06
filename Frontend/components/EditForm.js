import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker
 
} from 'react-native'



export default class But extends React.Component {
  constructor(props){
    super(props);
    this.state = {year: ''};
  }
    

    updateUser = (year) => {
        this.setState({ year: year })
     }
   
  render() {
  
    return (
   <View styles={styles.formVal}>
     <Text style={styles.header}>Edit Profile</Text>

     
     <TextInput style={styles.textinput} placeholder="Major"  maxLength={30} underlineColorAndroid={'transparent'}/>

     <TextInput multiline style={styles.textinput} placeholder="Interest"  maxLength={250} underlineColorAndroid={'transparent'}/>

     <TextInput style={styles.textinput} placeholder="Email"  maxLength={30} underlineColorAndroid={'transparent'}/>

 

        <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>Save Changes</Text>
        </TouchableOpacity>
     

   </View>
    
      
    
    )
}
}
const styles = StyleSheet.create({
  formVal: {
   
   backgroundColor:'#F2F2F7'
   
  },
  header:{
    fontSize: 24,
    fontWeight: '500',
    margin: 10,
    alignSelf: 'center',
    color: '#636e72',
    paddingBottom:10,
    marginBottom:40,
    borderBottomColor:'#199187',
    borderBottomWidth: 5
  },
  textinput:{
      
    height:40,
    marginBottom:30,
    color: '#636e72',
    fontSize: 13,
    borderBottomColor:'#f8f8f8',
    borderBottomWidth:1
  },
  button:{
    alignItems:'center',
    padding:20,
    backgroundColor:'#59cbbd',
    marginTop:30
  },
  btnText:{
    color:'#fff',
    fontWeight:'bold',
      
  }
})
