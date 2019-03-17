import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class WillComponent extends Component{
    render(){
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello {this.props.text}!</Text>
            </View>
        );
    }
}
