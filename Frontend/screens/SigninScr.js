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
import colors from '../util/colors';

const MAX_FIELD_WIDTH = (Dimensions.get('screen').width * 3) / 4;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    marginTop: STATUS_BAR_HEIGHT,
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    letterSpacing: 1,
    marginVertical: 30,
  },
  field: {
    borderBottomColor: colors.grayScale1,
    borderBottomWidth: 2,
    minWidth: MAX_FIELD_WIDTH,
    borderColor: colors.grayScale1,
    margin: 8,
    paddingVertical: 9,
  },
  loginButton: {
    padding: 10,
    minWidth: MAX_FIELD_WIDTH,
    backgroundColor: colors.primary0,
    borderColor: colors.primary1,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 12,
    minHeight: 42,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 15,
    alignSelf: 'center',
    color: colors.grayScale0,

  },

  signupLink: {
    borderBottomColor: colors.primary0,
    borderBottomWidth: 1,
    top: 5,
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
                marginBottom: 80,
              }}
              source={ClubfinityLogo}
            />
            <View style={{ flex: 1 }}>
              <TextInput
                textAlign="left"
                style={styles.field}
                name="username"
                placeholderTextColor={colors.grayScale8}
                returnKeyType="next"
                onChangeText={this.changeUsername}
                autoCapitalize="none"
                value={username}
                placeholder="E-mail"
              />
              <TextInput
                style={styles.field}
                name="password"
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor={colors.grayScale8}
                onChangeText={this.changePassword}
                value={password}
                placeholder="Password"
              />
              {showError && <ErrorText errorMessage={errorMessage} />}

              <View
                style={{
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={this.signIn}
                  backgroundColor={colors.primary0}
                >
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 13 }}>
                  <Text>Don&apos;t have an account yet? </Text>
                  <TouchableOpacity
                    onPress={this.signUp}
                    style={styles.signupLink}
                  >
                    <Text style={{ color: colors.info, fontSize: 13, top: 2 }}>Sign up</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
