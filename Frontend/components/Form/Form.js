import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Platform, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get('window');

const bgColor = '#FFF';
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: bgColor,
  },
  contentContainerModal: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: height * 0.25,
    marginHorizontal: width * 0.05,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 4,
    padding: 15,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 200,
  },
  androidContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: bgColor,
  },
  androidContentContainerModal: {
    width: width * 0.90,
    height: height * 0.7,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: Dimensions.get('window').height * 0.15,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 4,
    padding: 15,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 200,
  },
  iOScontainerCentered: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColor,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  iOScontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColor,
    paddingHorizontal: '5%',
  },
  androidContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: bgColor,

  },
  androidContainerCentered: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: bgColor,
  },
});

export default class Form extends React.Component {
  static propTypes = {
    isModal: PropTypes.bool,
    isCentered: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isModal: false,
    isCentered: false,
  }

  render() {
    const { isModal, isCentered, children } = this.props;
    if (isModal) {
      return (
        <View
          style={Platform.OS === 'ios' ? styles.contentContainerModal : styles.androidContentContainerModal}
        >
          {Platform.OS === 'ios' ? (
            <SafeAreaView
              style={isCentered ? styles.iOScontainerCentered : styles.iOScontainer}
            >
              {children}
            </SafeAreaView>
          ) : (
            <View
              style={isCentered ? styles.androidContainerCentered : styles.androidContainer}
            >
              {children}
            </View>
          )}
        </View>
      );
    }

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Platform.OS === 'ios' ? styles.contentContainer : styles.androidContentContainer}
      >
        {Platform.OS === 'ios' ? (
          <SafeAreaView
            style={isCentered ? styles.iOScontainerCentered : styles.iOScontainer}
          >
            {children}
          </SafeAreaView>
        ) : (
          <View
            style={isCentered ? styles.androidContainerCentered : styles.androidContainer}
          >
            {children}
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}
