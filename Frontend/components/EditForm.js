import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Picker,
  SafeAreaView,
  ScrollView
 
} from 'react-native'


const { width, height } = Dimensions.get('screen')
export default class But extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tnterest: 'Food',
      year: '',
      user: '',
      
    };

  }
    

    updateUser = (year) => {
        this.setState({ year: year })
     }
    updateInterest =  (itemValue, itemIndex) => {
     if (itemIndex !== 0) {
       this.setState({interest: itemValue})
     }
    }
  render() {
    
  
    return (
      <SafeAreaView style={styles.formVal}>
        <ScrollView>
     <Text style={styles.header}>Edit Profile</Text>

     
     <TextInput style={styles.textinput} placeholder="Major"  maxLength={30} underlineColorAndroid={'transparent'}/>

     <TextInput style={styles.textinput} placeholder="Email"  maxLength={30} underlineColorAndroid={'transparent'}/>
   
     <Picker
        selectedValue={this.state.interest}
        style={{height:height*0.35 , width: width}}
        prompt='Options'
        onValueChange={(itemValue, itemIndex) => {
          if (itemIndex !== 0) {
            this.setState({interest: itemValue})
          }}}>
          <Picker.Item label='Please select an option...' value='0' />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Arts & Crafts" value="arts" />
          <Picker.Item label="Technology" value="tech" />
          <Picker.Item label="Fitness" value="fitness" />
      </Picker>
      <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              style={styles.loginButton}
              
              backgroundColor={'#ACCBAC'}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

          </View>


        <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>Save Changes</Text>
        </TouchableOpacity>
     
        </ScrollView>
 
   </SafeAreaView>
      
    
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
  subHead:{
    alignSelf: 'center',
    height:40,
    marginBottom:30,
    color: '#636e72',
    fontSize: 13,
    paddingBottom:0
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
    marginBottom:50
  },
  btnText:{
    color:'#fff',
    fontWeight:'bold',
      
  },
  saveButton: {
    padding: 10,
    minWidth: width,
    backgroundColor: '#ACCBAC',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,


  },
  loginButtonText: {
    // flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    color: '#fff'
  }


})
