import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker
 
} from 'react-native'

import ClubsFollowGrid from '../components/ClubsFollowGrid'

export default class CLubsFollowScr extends React.Component {
  constructor(props){
    super(props);
   
  }

  render() {
  
    return (
   <View styles={styles.formVal}>
     
        <ClubsFollowGrid/>
   </View>
    
      
    
    )
}
}
const styles = StyleSheet.create({
  formVal: {
   
   backgroundColor:'#F2F2F7'
   
  }
})
