import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Form extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (

            <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} contentContainerStyle={{justifyContent: 'center', display: 'flex', flex: 1, flexDirection: 'column'}}>
                <SafeAreaView style={styles.iOScontainer}>
                    {this.props.children}
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const bgColor = "#FFF";
const styles = StyleSheet.create({
  iOScontainer: {
    flex: 1,
    display: 'flex',
    marginTop: '20%',
    justifyContent: 'center',
    backgroundColor: bgColor,
    alignSelf: 'center',
    flexDirection: 'column',
  }
})