import React from 'react';
import {
  AsyncStorage,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default class SigninScr extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  // Currently logs user without credential auth or validation but will be connected to backend soon
  _signIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  changeUsername = (input) => {
    this.setState({
      username: input
    });
  }

  changePassword = (input) => {
    this.setState({
      password: input
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{display: 'flex', flex: 1, flexDirection: 'row', alignSelf: 'flex-end'}}>
          <Text>New here?</Text>
        </View>

        <View style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Clubfinity</Text>
        <TextInput 
        textAlign={'center'}
        style={styles.field}
        placeholderTextColor={'#8E8E93'}
        returnKeyType={"next"}
        onChangeText={this.changeUsername}
        autoCapitalize={'none'}
        value={this.state.username}
        placeholder="E-mail">
        </TextInput>
        <TextInput 
        textAlign={'center'}
        style={styles.field}
        secureTextEntry={true} 
        autoCapitalize={"none"}
        placeholderTextColor={'#8E8E93'}
        onChangeText={this.changePassword}
        value={this.state.password}
        placeholder="Password">
        </TextInput>

        <TouchableOpacity
        style={styles.button}
        onPress={this._signIn}
        backgroundColor={'#ACCBAC'}
        >
        <Text style={styles.buttonText}>
        Login
        </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const MAX_FIELD_WIDTH = Dimensions.get('screen').width * 3 / 4;


const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  title: {
    fontSize: 34,
    letterSpacing: 1,
    marginVertical: 30,
  },
  field: {
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    minWidth: MAX_FIELD_WIDTH,
    borderRadius: 6,
    borderColor: '#F4F4F4',
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  }, 
  button: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    backgroundColor: '#ACCBAC',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 30,
    elevation: 3,
  }, 
  buttonText: {
    // flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    color: '#fff'
  }
})