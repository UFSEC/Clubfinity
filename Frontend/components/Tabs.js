import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    letterSpacing: 2,
  },
  container: {
    flex: 1,
  },
  tabContainerOuter: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 8,
  },
  tabOverlay: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#7e947f',
    color: 'white',
    borderRadius: 4,
  },
  tabOneView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Tabs extends React.Component {
  static propTypes = {
    tab1: PropTypes.element.isRequired,
    tab2: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: ['Preferences', 'Following'],
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,

      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),

      translateY: -1000,
    };
  }

  handleSlide = (type) => {
    const {
      active,
      translateX,
      translateXTabOne,

      translateXTabTwo,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: active === 1 ? 0 : -width * 2,
          duration: 100,
        }).start(),
      ]);
    }
  }

  render() {
    // Destructure State
    const {
      xTabOne,
      xTabTwo,
      active,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateY,
      title,
    } = this.state;
    const { tab1, tab2 } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.tabContainerOuter}>
          <View style={styles.tabContainerInner}>
            <Animated.View
              style={{
                ...styles.tabOverlay,
                ...{ transform: [{ translateX }] },
              }}
            />
            <TouchableOpacity
              style={{
                ...styles.tabStyle,
                ...{
                  borderRightWidth: 1,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRadius: 7,
                },
                ...{ backgroundColor: active === 1 ? '#b1caa9' : '#7e947f' },
              }}
              onLayout={(event) => this.setState({ xTabOne: event.nativeEvent.layout.x })}
              onPress={() => this.setState({ active: 0 }, () => this.handleSlide(xTabOne))}
            >
              <Text style={styles.textStyle}>
                {' '}
                {title[0]}
                {' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.tabStyle,
                ...{
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 3,
                  borderBottomRightRadius: 3,

                },
                ...{ backgroundColor: active === 1 ? '#7e947f' : '#b1caa9' },
              }}
              onLayout={(event) => this.setState({ xTabTwo: event.nativeEvent.layout.x })}
              onPress={() => this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))}
            >
              <Text style={styles.textStyle}>
                {' '}
                {title[1]}
                {' '}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Additional Screen Here */}
          <ScrollView>
            <Animated.View
              style={{
                ...styles.tabContent,
                ...{
                  transform: [
                    {
                      translateX: translateXTabOne,
                    },
                  ],
                },
              }}
              onLayout={(event) => this.setState({
                translateY: event.nativeEvent.layout.height,
              })}
            >
              {tab1}
            </Animated.View>
            <Animated.View
              style={{
                ...styles.tabContent,
                ...{
                  transform: [
                    {
                      translateX: translateXTabTwo,
                    },
                    {
                      translateY: -translateY,
                    },
                  ],
                },
              }}
            >
              {tab2}
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
