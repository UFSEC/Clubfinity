import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView
} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'

const { width, height } = Dimensions.get('screen')

export default class App extends React.Component {
  constructor (props) { 
    super(props); 
    this.state = { 
      title:['About','Clubs','Settings'],
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      xTabThree: 0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),
      translateXTabThree: new Animated.Value(width * 2),
      translateY: -1000 
    } 
  }

  handleSlide = type => {
    let {
      xTabOne,
      xTabTwo,
      xTabThree,
      active,
      translateX,
      translateXTabOne,
      translateXTabThree,
      translateXTabTwo
    } = this.state
    Animated.spring(translateX, {
      toValue: type,
      duration: 100
    }).start()
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width ,
          duration: 100
        }).start()
      ])
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: active === 1 ? 0 : -width * 2,
          duration: 100
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: active === 2 ? 0 : -width ,
          duration: 100
        }).start()
      ])
    }
  }

  render() {
    // Destructure State
    let {
      xTabOne,
      xTabTwo,
      xTabThree,
      active,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
      translateY
    } = this.state
    var val
    return (
      <View style={styles.container}>
        <View style={styles.tabContainerOuter}>
          <View style={styles.tabContainerInner}>
            <Animated.View
              style={{
                ...styles.tabOverlay,
                ...{ transform: [{ translateX }] }
              }}
            />
            <TouchableOpacity
              style={{
                ...styles.tabStyle,
                ...{
                    borderRightWidth: 1,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRadius:8
                }
              }}
              onLayout={event =>
                this.setState({ xTabOne: event.nativeEvent.layout.x })
              }
              onPress={() =>
                this.setState({ active: 0 }, () => this.handleSlide(xTabOne))
              }
            >
              <Text color={{ active: 0 ? '#fff' : '#007aff ' }}> {this.state.title[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.tabStyle,
                ...{
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                 
                }
              }}
              onLayout={event =>
                this.setState({ xTabTwo: event.nativeEvent.layout.x })
              }
              onPress={() =>
                this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))
              }
            >
              <Text Color={{ active: 1 ? '#fff' : '#007aff ' }}>
                {this.state.title[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                {
                    ...styles.tabStyle,
                    ...{
                        borderLeftWidth: 0,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderRadius:8
                    }
                  }
              }
              onLayout={event =>
                this.setState({ xTabThree: event.nativeEvent.layout.x })
              }
              onPress={() =>
                this.setState({ active: 2 }, () => this.handleSlide(xTabThree))
              }
            >
              <Text color={{ val: active === 2 ? '#fff' : '#007aff ' }}>
              {this.state.title[2]}
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
                      translateX: translateXTabOne
                    }
                  ]
                }
              }}
              onLayout={event =>
                this.setState({
                  translateY: event.nativeEvent.layout.height
                })
              }
            >
              {this.props.tab1}
            </Animated.View>

            <Animated.View
              style={{
                ...styles.tabContent,
                ...{
                  transform: [
                    {
                      translateX: translateXTabTwo
                    },
                    {
                      translateY: -translateY
                    }
                  ]
                }
              }}
            >
              {this.props.tab2}
            </Animated.View>
            <Animated.View
              style={{
                ...styles.tabContent,
                ...{
                  transform: [
                    {
                      translateX: translateXTabThree
                    },
                    {
                      translateY: -translateY * 10.5
                    }
                  ]
                }
              }}
            >
               {this.props.tab3}
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContainerOuter: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tabContainerInner: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    height: 36,
    position: 'relative'
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2980b9',
    padding: 8
  },
  tabOverlay: {
    position: 'absolute',
    width: '34%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#2980b9',
    color: 'white',
    borderRadius: 3
  },
  tabOneView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
