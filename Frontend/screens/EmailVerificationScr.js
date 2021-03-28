import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Container, Content } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../util/colors';
import PrimaryButton from '../components/PrimaryButton';
import UserApi from '../api/UserApi';
import AuthApi from '../api/AuthApi';
import UserContext from '../util/UserContext';
import SlideDownNotification from '../components/SlideDownNotification';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    margin: '7%',
    flex: 1,
  },
  resentEmailNotificationContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '92%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.info,
    borderRadius: 10,
    backgroundColor: 'white',

    padding: 12,

    shadowColor: 'black',
    shadowOpacity: 0.15,
  },
  resentEmailNotificationText: {
    color: colors.info,
    marginLeft: 7,
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
  codeInputError: {
    borderWidth: 1,
    borderColor: colors.error,
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
      displayResentNotification: false,
    };
  }

  changeCode = (code) => {
    this.setState({ code, error: null });
  }

  login = async () => {
    const { navigation } = this.props;

    const email = navigation.getParam('email', '');
    const password = navigation.getParam('password', '');

    const authResponse = await AuthApi.authenticate(email, password);

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
      this.setState({ error: resp.error, code: '' });
      return;
    }

    this.setState({ error: null });

    await this.login();
  }

  hideResentNotification = () => {
    this.setState({ displayResentNotification: false });
  }

  resendEmail = async () => {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', '');
    const resp = await UserApi.resendEmailVerificationCode(userId);

    if (resp.ok) {
      this.setState({
        displayResentNotification: true,
      });
    }
  }

  goBackToSignUp = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  clearError = () => {
    this.setState({ error: null });
  }

  renderResendNotification = () => {
    const { displayResentNotification } = this.state;

    if (!displayResentNotification) {
      return null;
    }

    const component = (
      <View style={styles.resentEmailNotificationContainer}>
        <FontAwesome5 name="check-circle" size={18} color={colors.info} />
        <Text style={styles.resentEmailNotificationText}>EMAIL RESENT!</Text>
      </View>
    );

    return (
      <SlideDownNotification component={component} onAnimationFinish={this.hideResentNotification} />
    );
  }

  renderCodeInput = () => {
    const { error, code } = this.state;

    if (error) {
      return (
        <TextInput
          style={{ ...styles.codeInput, ...styles.codeInputError }}
          placeholder={error}
          placeholderTextColor={colors.error}
          keyboardType="number-pad"
          returnKeyType="done"
          value={code}
          onChangeText={this.changeCode}
          onFocus={this.clearError}
        />
      );
    }

    return (
      <TextInput
        style={styles.codeInput}
        placeholder="Code"
        placeholderTextColor={colors.grayScale7}
        keyboardType="number-pad"
        returnKeyType="done"
        value={code}
        onChangeText={this.changeCode}
      />
    );
  }

  render() {
    const { isProcessing } = this.state;
    const { navigation } = this.props;
    const email = navigation.getParam('email', '');

    return (
      <Container>
        {this.renderResendNotification()}
        <Content contentContainerStyle={styles.container}>
          <View>
            <Text style={styles.header}>
              Please verify your email address to finish signing up.
            </Text>
            <Text style={styles.body}>
              An email with a verification code has been sent to&nbsp;
              <Text style={styles.bold}>{email}</Text>
              &nbsp;Please confirm within 48 hours.
            </Text>

            {this.renderCodeInput()}

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
