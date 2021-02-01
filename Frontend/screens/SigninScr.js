import React from 'react';
import {
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ClubfinityLogo from '../assets/images/ClubfinityLogo.png';

import AuthApi from '../api/AuthApi';
import ErrorText from '../components/ErrorText';
import UserContext from '../util/UserContext';
import Colors from '../util/colors';

const MAX_FIELD_WIDTH = (Dimensions.get('screen').width * 3) / 4;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: STATUS_BAR_HEIGHT,
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    letterSpacing: 1,
    marginVertical: 30,
  },
  field: {
    borderBottomColor: Colors.grayScale1,
    borderBottomWidth: 2,
    minWidth: MAX_FIELD_WIDTH,
    borderColor: Colors.grayScale1,
    margin: 8,
    paddingVertical: 9,
  },
  loginButton: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    backgroundColor: Colors.primary0,
    borderWidth: 1,
    borderColor: Colors.primary1,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
  },
  signupButton: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    borderWidth: 1,
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  signupButtonTxt: {
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.primary0,
  },
  loginButtonText: {
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.primary5,
  },
  textSignUpButtom: {
    color: Colors.primary0,
    height: 15,
  },
  signupLink: {
    marginBottom: -1,
    borderBottomColor: Colors.primary5,
    borderBottomWidth: 1,
  },
});

export default class SigninScr extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showError: false,
      errorMessage: '',
    };
  }

  // Make Auth request to backend and save token if correct credentials
  signIn = async (event) => {
    event.preventDefault();
    const { setUser } = this.context;
    const { username, password } = this.state;

    const authResponse = await AuthApi.authenticate(username, password);

    if (authResponse.token) {
      this.setState({
        showError: false,
        errorMessage: '',
      });
      if (authResponse.user) {
        setUser(authResponse.user);
      }
      const { navigation } = this.props;
      navigation.navigate('App');
    } else {
      this.setState({
        showError: true,
        errorMessage: authResponse.error,
      });
    }
  };

  signUp = async () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  changeUsername = (input) => {
    this.setState({
      username: input,
    });
  };

  changePassword = (input) => {
    this.setState({
      password: input,
    });
  };

  render() {
    const {
      username, password, errorMessage, showError,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
        scrollEnabled={false}
      >
        <SafeAreaView style={styles.mainContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                margin: 30,
                marginBottom: 50,
              }}
              source={ClubfinityLogo}
            />
            <View style={{ flex: 1 }}>
              <TextInput
                textAlign="left"
                style={styles.field}
                name="username"
                placeholderTextColor={Colors.primary5}
                returnKeyType="next"
                onChangeText={this.changeUsername}
                autoCapitalize="none"
                value={username}
                placeholder="Email"
              />
              <TextInput
                style={styles.field}
                name="password"
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor={Colors.primary5}
                onChangeText={this.changePassword}
                value={password}
                placeholder="Password"
              />
              {showError && <ErrorText errorMessage={errorMessage} />}
            </View>

            <View
              style={{
                bottom: 80, flex: 1, display: 'flex', justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.signIn}
                backgroundColor={Colors.primary0}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>

              <Text style={{ color: Colors.primary0, alignSelf: 'center' }}>
                <Text>Don&apos;t have an account yet? </Text>
                <TouchableOpacity
                  onPress={this.signUp}
                  style={styles.signupLink}
                >
                  <Text style={styles.textSignUpButtom}>Sign up</Text>
                </TouchableOpacity>
              </Text>

            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
