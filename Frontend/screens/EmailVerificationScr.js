import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Container, Content } from 'native-base';

import colors from '../util/colors';
import PrimaryButton from '../components/PrimaryButton';
import ErrorText from '../components/ErrorText';
import UserApi from '../api/UserApi';
import AuthApi from '../api/AuthApi';
import UserContext from '../util/UserContext';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    margin: '7%',
    flex: 1,
  },
  header: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.grayScale9,
    textAlign: 'center',

    marginTop: '25%',
    marginBottom: 20,
  },
  body: {
    fontSize: 14,
    color: colors.grayScale9,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  codeInput: {
    borderRadius: 10,
    backgroundColor: colors.grayScale1,
    padding: 13,
    marginBottom: 20,
  },
  sendEmailAgainContainer: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.grayScale9,
  },
  sendEmailAgainLink: {
    fontSize: 14,
    top: 2,
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  signUpAgainContainer: {
    color: colors.grayScale9,
    fontSize: 14,
    textAlign: 'center',
  },
  signUpAgainLink: {
    textDecorationLine: 'underline',
  },
});

export default class EmailVerificationScr extends React.Component {
  static navigationOptions = {
    header: null,
  }

  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      code: '',
      error: null,
      isProcessing: false,
    };
  }

  changeCode = (code) => {
    this.setState({ code });
  }

  login = async () => {
    const { navigation } = this.props;

    const username = navigation.getParam('username', '');
    const password = navigation.getParam('password', '');

    const authResponse = await AuthApi.authenticate(username, password);

    if (authResponse.user) {
      const { setUser } = this.context;
      setUser(authResponse.user);
      navigation.navigate('App');
    } else {
      console.log(authResponse.error);
    }
  }

  validateCode = async () => {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', '');

    const { code } = this.state;

    this.setState({ isProcessing: true });
    const resp = await UserApi.verifyEmailCode(userId, code);
    this.setState({ isProcessing: false });

    if (!resp.ok) {
      this.setState({ error: resp.error });
      return;
    }

    this.setState({ error: null });

    await this.login();
  }

  resendEmail = async () => {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', '');
    await UserApi.resendEmailVerificationCode(userId);
  }

  goBackToSignUp = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  render() {
    const { code, error, isProcessing } = this.state;

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <View>
            <Text style={styles.header}>
              Please verify your email address to finish signing up.
            </Text>
            <Text style={styles.body}>
              An email with a verification code has been sent to&nbsp;
              <Text style={styles.bold}>email@email.com.</Text>
              &nbsp;Please confirm within 48 hours.
            </Text>

            {error && <ErrorText errorMessage={error} />}

            <TextInput
              style={styles.codeInput}
              placeholder="Code"
              keyboardType="number-pad"
              returnKeyType="done"
              value={code}
              onChangeText={this.changeCode}
            />
            <PrimaryButton
              text={isProcessing ? 'Verifying...' : 'Verify'}
              onPress={this.validateCode}
            />
            <Text style={styles.sendEmailAgainContainer}>
              Didn&apos;t receive the email?&nbsp;
              <Text style={styles.sendEmailAgainLink} onPress={this.resendEmail}>Send it again!</Text>
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.signUpAgainContainer}>
              Incorrect email?&nbsp;
              <Text style={styles.signUpAgainLink} onPress={this.goBackToSignUp}>Sign up again!</Text>
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
