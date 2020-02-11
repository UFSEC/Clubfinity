import React from 'react';
import {
  AsyncStorage,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import AuthApi from '../api/AuthApi';
import ErrorText from '../components/ErrorText';

export default class SigninScr extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showError: false,
      errorMessage: ''
    }
  }

  // Make Auth request to backend and save token if correct credentials
  signIn = async (event) => {
    event.preventDefault();

    let authResponse = await AuthApi.authenticate(this.state.username, this.state.password);
    if (authResponse.token) {
      await AsyncStorage.setItem('userToken', authResponse.token);
      this.setState({
        showError: false,
        errorMessage: ''
      });
      this.props.navigation.navigate('App');
    } else {
        this.setState({
          showError: true,
          errorMessage: authResponse.errors
        });
    }
  }

  signUp = async () => {
    this.props.navigation.navigate('SignUp')
  }

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

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Image
            style={{ width: 200, height: 200, margin: 30, marginBottom: 80 }}
            source={require('../assets/images/ClubfinityLogo.png')}
          />
          <View style={{ flex: 1 }}>
            <TextInput
              textAlign={'left'}
              style={styles.field}
              name='username'
              placeholderTextColor={'#8E8E93'}
              returnKeyType={"next"}
              onChangeText={this.changeUsername}
              autoCapitalize={'none'}
              value={this.state.username}
              placeholder="E-mail">
            </TextInput>
            <TextInput
              style={styles.field}
              name='password'
              secureTextEntry={true}
              autoCapitalize={"none"}
              placeholderTextColor={'#8E8E93'}
              onChangeText={this.changePassword}
              value={this.state.password}
              placeholder="Password">
            </TextInput>
            {this.state.showError && <ErrorText errorMessage={this.state.errorMessage} />}
          </View>

          <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={this.signIn}
              backgroundColor={'#ACCBAC'}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={this.signUp}
              backgroundColor={'#D4D4D4'}
            >
              <Text style={styles.signupButtonTxt}>
                New here? Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}

const MAX_FIELD_WIDTH = Dimensions.get('screen').width * 3 / 4;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: STATUS_BAR_HEIGHT,
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
  loginButton: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    backgroundColor: '#ACCBAC',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
  },
  signupButton: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ACCBAC',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,

  },
  signupButtonTxt: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#ACCBAC'
  },
  loginButtonText: {
    // flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    color: '#fff'
  }
})
