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
  ScrollView,
  StatusBar,
  KeyboardAvoidingView
 
} from 'react-native'


const { width, height } = Dimensions.get('screen')
export default class But extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interest: 'Food',
      year: '',
      user: '',
      classYear:'',
      major:'',
    

  }
}

    updateUser = (year) => {
        this.setState({ year: year })
     }
    updateYear =  (itemValue, itemIndex) => {
     if (itemIndex !== 0) {
       this.setState({year: itemValue})
     }
    }
    handleChangeMajor= (itemValue,itemIndex) =>{
      if (itemIndex !== 0) {
        this.setState({major: itemValue})
      }
    }

    saveHandler = () => {
    
      
    }
  
  render() {
    
  
    return (
      <SafeAreaView style={styles.formVal}>
        <ScrollView contentContainerStyle={{ flex: 1, display: 'flex' }}>
     <Text style={styles.header}>Edit Profile</Text>

     <KeyboardAvoidingView style={styles.formContainer} behavior='padding' keyboardVerticalOffset={50}>
    

     

     <View style={styles.inputPicker}>
              <Picker
                selectedValue={this.state.major}
                style={{ flex: 1 }}
                itemStyle={styles.pickerDropdown}
                mode={'dialog'}
                onValueChange={
                  this.handleChangeMajor
                }>
                 
               
                <Picker.Item label='Select Major to Change....' value='0' />
                <Picker.Item label="Computer Science" value="computer science" />
                <Picker.Item label="Business Administration" value="business administration" />
                <Picker.Item label="Mechanical Engineering" value="mech engineering" />
                <Picker.Item label="Architecture" value="architecture" />
                <Picker.Item label="Anthropology" value="anthropology" />
                <Picker.Item label="Chemical Engineering" value="chem engineering" />
              </Picker>
            </View>

     <View style={styles.inputPicker}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.state.classYear}
                itemStyle={styles.pickerDropdown}
                mode={'dialog'}
                onValueChange={this.updateYear}>
              
                <Picker.Item label='Select Year to Change....' value='0' />
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
              </Picker>
            </View>



            </KeyboardAvoidingView>
            <TouchableOpacity
            style={styles.saveButton}
            onPress={this.saveHandler}
          >
               <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>


        </ScrollView>
 
   </SafeAreaView>
      
    
    )
}
}
const txtFieldBgColor = "#F4F4F4";
const bgColor = "#FFF";

const styles = StyleSheet.create({
  formVal: {
    flex: 1,
    display: 'flex',
    padding: 20,
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    backgroundColor: bgColor,
    flexDirection: 'column',
   backgroundColor:txtFieldBgColor,
   width:width/1.5
   
  },
  header:{
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#636e72',
    flex: 1,
   
    alignSelf: "center"

  },
  formContainer: {
   
    marginVertical: 5,
    fontSize: 13,
    flex: 6
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
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignSelf: 'center',
    width:width/2

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
    minWidth:width/2,
    backgroundColor: '#ACCBAC',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
    alignSelf: 'center'
  },
  saveButtonText:{
    fontSize: 15,
    color: '#FFF',
    alignSelf: 'center',

  },
  
  inputPicker: {
    color: txtFieldBgColor,
    backgroundColor: txtFieldBgColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    margin: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flex:1,
    alignSelf: 'center',
    width:width/2
  },



})
