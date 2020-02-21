import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Form extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
                <View style={styles.iOScontainer}>
                    {this.props.children}
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const bgColor = "#FFF";
const styles = StyleSheet.create({
  iOScontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: bgColor,
    paddingHorizontal: '5%',
  }
})