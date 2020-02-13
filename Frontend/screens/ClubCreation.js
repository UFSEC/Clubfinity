import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView,Dimensions,TouchableOpacity,TextInput,Picker } from 'react-native'
const { width} = Dimensions.get('screen')
export default class ClubCreation extends Component {
static navigationOptions = {
    title: 'Clubfinity',
    headerStyle: { backgroundColor: '#7e947f' },
    headerTitleStyle: { color: "#ecf0f1", letterSpacing: 2 },
}
constructor(props){
    super(props)
    this.state = {
        clubName:'',
        clubLocation:'',
        clubDescription: '',
        clubPosition:'',
        clubCategory:'',
        admin:false
    }

}
handleChangeMajor= (itemValue,itemIndex) =>{
    if (itemIndex !== 0) {
        this.setState({clubCategory: itemValue})
    }
    }
saveHandler = () => {
    //Checks that all fields includes data
    //It could be more in depth but input needed
    if (this.state.clubName != '' && 
        this.state.clubPosition != '' && 
        this.state.clubCategory != '' &&
        this.state.clubLocation != '') {
        
            alert('Success')
        } else {
            alert('Please fill in all fields ');
        }
    //Checks if data is retrieved and Resets state after its sent  
    console.log(this.state)
    this.setState({  
        clubName:'',
        clubLocation:'',
        clubDescription: '',
        clubPosition:'',
        clubCategory:'',
        
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
                    placeholder="Club Name"
                    placeholderTextColor={'#8E8E93'}
                    value={this.state.clubName}
                    onChangeText={(text) => this.setState({ clubName: text })}
                />
                <TextInput
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
                />
                <TextInput
                    maxLength={120}
                    style={[styles.modalTextInput, {height: 100}]}
                    numberOfLines={5}
                    multiline={true}
                    placeholderTextColor={'#8E8E93'}
                    placeholder="Description"
                    value={this.state.clubDescription}
                    onChangeText={(text) => this.setState({ clubDescription: text })}
                />
                <View style={styles.inputPicker}>
                    <Picker
                        selectedValue={this.state.clubCategory}
                        style={{ flex: 1 }}
                        itemStyle={styles.pickerDropdown}
                        mode={'dialog'}
                        onValueChange={
                        this.handleChangeMajor
                        }>
                        
                    
                        <Picker.Item label='Choose Club Category' value='0' />
                        <Picker.Item label="Art" value="art" />
                        <Picker.Item label="Technology" value="technology" />
                        <Picker.Item label="Business" value="business" />
                        
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
const styles = StyleSheet.create({
container: {
flex:1,  
alignItems:'center',
    backgroundColor: '#F2F2F7',
    paddingTop: '10%'
    
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
    
    marginTop:40,
    display: 'flex',
    
    },
    modalTextInput: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E5E4EA',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E4EA',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 50,
    paddingHorizontal: 10,
},
inputPicker: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: txtFieldBgColor,
    paddingHorizontal: 5,
    flex:1,
    alignSelf: 'center',
    width:width/2
    }
})