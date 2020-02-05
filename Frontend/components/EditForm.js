import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView,Dimensions,TouchableOpacity,TextInput,Picker } from 'react-native'
const { width, height } = Dimensions.get('screen')

export default class EditForm extends Component {
    static navigationOptions = {
		title: 'Edit Profile Information',
		headerStyle: { backgroundColor: '#7e947f' },
		headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
    }
    constructor(props){
        super(props)
        //You can prepopulate state with previous values the individual has
          this.state = {
            interest: '',
            year: '',
            user: '',
            classYear:'',
            major:''
          
      
        

    }
  }
    handleChangeMajor= (itemValue,itemIndex) =>{
        if (itemIndex !== 0) {
          this.setState({clubCategory: itemValue})
        }
      }
    saveHandler = () => {
      
        //Checks if data is retrieved and Resets state after its sent  
        console.log(this.state)
        this.setState({  
          interest: '',
          year: '',
          user: '',
          classYear:'',
          major:'',
            
        })
        //Checks that its empty
        console.log(this.state)
    }
    render() {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View >
          
                <TextInput
                    maxLength={20}
                    style={styles.modalTextInput}
                    placeholder="Major"
                    placeholderTextColor={'#8E8E93'}
                    value={this.state.clubName}
                    onChangeText={(text) => this.setState({ major: text })}
                />
                {/* <TextInput
                    maxLength={20}
                    style={styles.modalTextInput}
                    placeholderTextColor={'#8E8E93'}
                    placeholder="Position"
                    value={this.state.clubPosition}
                    onChangeText={(text) => this.setState({ clubPosition: text })}
                />
                    <TextInput
                    
                    maxLength={20}
                    style={styles.modalTextInput}
                    placeholderTextColor={'#8E8E93'}
                    placeholder="Location"
                    value={this.state.clubLocation}
                    onChangeText={(text) => this.setState({ clubLocation: text })}
                /> */}
                <TextInput
                    maxLength={120}
                    style={[styles.modalTextInput, {height: 200}]}
                    numberOfLines={5}
                    multiline={true}
                    placeholderTextColor={'#8E8E93'}
                    placeholder="Interest"
                    value={this.state.interest}
                    onChangeText={(text) => this.setState({ interest: text })}
                />
                <View style={styles.inputPicker}>
                  <Picker
                      selectedValue={this.state.clubCategory}
                      style={{ flex: 1,height:400 }}
                      itemStyle={styles.pickerDropdown}
                      mode={'dialog'}
                      onValueChange={
                      this.handleChangeMajor
                      }>
                          
                      
                          <Picker.Item label='Select a Year ' value='0' />
                        
                          <Picker.Item label="2020" value="2020" />
                          <Picker.Item label="2021" value="2021" />
                          <Picker.Item label="2022" value="2022" />
                          <Picker.Item label="2023" value="2023" />
                          <Picker.Item label="2024" value="2024" />
                          
                    </Picker>
                      </View>

                      <TouchableOpacity
                          style={styles.saveButton}
                          onPress={this.saveHandler}
                      >
                          <Text style={styles.saveButtonText}>
                              Save Changes
                          </Text>
                  </TouchableOpacity>
            

          </View>
        </ScrollView>
      )
        
        
    }

  

  }
const txtFieldBgColor = "#F4F4F4";
const bgColor = "#FFF";
const styles = StyleSheet.create({
    container: {
    flex:1,  
    alignItems:'center',
     backgroundColor: '#F2F2F7',
     paddingTop: '20%'
     
    },
    saveButtonText:{
        fontSize: 15,
        color: '#FFF',
        alignSelf: 'center',
    
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
      modalTextInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#E5E4EA',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E5E4EA',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 50,
        paddingHorizontal: 20,
    },
    inputPicker: {
      
       
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
      textTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        padding: 10,
        borderBottomWidth: 1,
    }
})