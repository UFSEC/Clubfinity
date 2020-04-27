import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import ClubsFollowGrid from '../components/ClubsFollowGrid'

export default class ClubsFollowScr extends React.Component {
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
   maxWidth: 600,
   backgroundColor:'#F2F2F7'
   
  }
})
