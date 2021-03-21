import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const HIDDEN_TOP_VALUE = -50;
const DISPLAYED_TOP_VALUE = 100;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: HIDDEN_TOP_VALUE,
    width: '100%',
  },
});

export default class SlideDownNotification extends React.Component {
  static propTypes = {
    component: PropTypes.element.isRequired,
    onAnimationFinish: PropTypes.func,
    duration: PropTypes.number,
  };

  static defaultProps = {
    onAnimationFinish: null,
    duration: 2000,
  };

  constructor(props) {
    super(props);

    this.state = {
      slideAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { slideAnimation } = this.state;
    const { onAnimationFinish, duration } = this.props;

    Animated.spring(
      slideAnimation,
      {
        toValue: DISPLAYED_TOP_VALUE,
        velocity: 4,
        tension: 2,
        friction: 8,
      },
    ).start();

    setTimeout(() => {
      Animated.spring(
        slideAnimation,
        {
          toValue: HIDDEN_TOP_VALUE,
          velocity: 4,
          tension: 2,
          friction: 8,
        },
      ).start(() => {
        if (onAnimationFinish) {
          onAnimationFinish();
        }
      });
    }, duration);
  }

  render() {
    const { slideAnimation } = this.state;
    const { component } = this.props;

    return (
      <Animated.View style={[styles.container, { transform: [{ translateY: slideAnimation }] }]}>
        {component}
      </Animated.View>
    );
  }
}
