import React, { PropTypes, Component } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';
import { isEqual } from 'lodash';
import { HexagonView } from '../hexagonView';

const getNextInvocationTimeout = () => {
    return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
};

const styles = StyleSheet.create({
  secondImageStyle: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  }
})

export class HexagonImage extends Component {
  static propTypes = {
    ...View.propTypes,
    ...Image.propTypes,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    background_Color: PropTypes.string,
    size: PropTypes.number.isRequired,
    isHorizontal: PropTypes.bool,
    src: PropTypes.oneOfType([
      Image.propTypes.source,
      PropTypes.arrayOf(Image.propTypes.source)
    ]).isRequired,
    cornerRadius: PropTypes.number,
    animate: PropTypes.bool,
    prop: PropTypes.any
  }
  static defaultProps = {
    animate: false
  };
  constructor(...args) {
    super(...args);
    this.state = {
      opacity: new Animated.Value(1),
      opacitySecond: new Animated.Value(0),
      currImageIndex: 0,
      nextImageIndex: 1
    };
    this.frameShowedCount = 1;
    this.showFrontImage = true;
    this.animateViews = this.animateViews.bind(this);
    this.reset = this.reset.bind(this);
    this.timeout = null;
  }
  componentWillMount() {
    if (
      !Array.isArray(this.props.src)
      || !this.props.animate
      || this.props.src.length < 2
    ) {
      return;
    }
    this.timeout = setTimeout(() => {
      this.animateViews();
    }, getNextInvocationTimeout());
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.src, nextProps.src)) {
      this.reset();
    }
    if (
      nextProps.animate !== this.props.animate
      || !isEqual(this.props.src, nextProps.src)
    ) {
      this.clearTimeouts();
      this.timeout = setTimeout(() => {
        this.animateViews(nextProps.animate);
      }, getNextInvocationTimeout());
    }
  }

  shouldComponentUpdate(nProps, nState) {
    const shouldUpdateProps = !isEqual(this.props, nProps);
    const shouldUpdateState = !isEqual(this.state, nState);

    return shouldUpdateState || shouldUpdateProps;
  }

  reset() {
    this.state.opacity.setValue(1);
    this.state.opacitySecond.setValue(0);

    this.frameShowedCount = 1;
    this.showFrontImage = true;

    this.setState({
      currImageIndex: 0,
      nextImageIndex: 1
    });
  }

  clearTimeouts() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }

  animateViews(useAnimate) {
    const { src, animate } = this.props;
    const { currImageIndex, nextImageIndex } = this.state;
    const shouldAnimate = typeof useAnimate !== 'undefined'
      ? useAnimate
      : animate;

    if (!Array.isArray(src) || !shouldAnimate) {
      return;
    }

    this.clearTimeouts();

    const MAX_INDEX = src.length - 1;
    const nextInvocation = getNextInvocationTimeout();
    const showFrontImage = this.showFrontImage = !this.showFrontImage;

    let nextIndex = this.frameShowedCount === 1
      ? currImageIndex + 2
      : currImageIndex;

    let prepareIndex = this.frameShowedCount === 2
      ? nextImageIndex + 2
      : nextImageIndex;

    if (nextIndex > MAX_INDEX) {
      nextIndex -= MAX_INDEX;
      nextIndex--;
    }
    if (showFrontImage && prepareIndex > MAX_INDEX) {
      prepareIndex -= MAX_INDEX;
      prepareIndex--;
    }

    // console.debug(
    //   `max index: ${src.length - 1} \n`,
    //   `nextIndex: ${nextIndex} \n`,
    //   `prepareIndex: ${prepareIndex} \n`,
    //   `showFrontImage: ${showFrontImage} \n`,
    //   `showed image index: ${showFrontImage ? nextIndex : prepareIndex}`
    // );


    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: showFrontImage ? 1 : 0,
        duration: 300
      }),
      Animated.timing(this.state.opacitySecond, {
        toValue: showFrontImage ? 0 : 1,
        duration: 300
      }),
    ]).start(() => {
      const nextState = {
        currImageIndex: nextIndex,
        nextImageIndex: prepareIndex
      };
      if (this.frameShowedCount === 2) {
        this.frameShowedCount = 1;
      } else {
        this.frameShowedCount++;
      }

      this.setState(nextState);
    });
    this.timeout = setTimeout(() => this.animateViews(), nextInvocation);
  }
  render() {
    const {
      children,
      borderWidth,
      borderColor,
      backgroundColor,
      size,
      isHorizontal,
      src,
      cornerRadius,
      ...props
    } = this.props;
    const {
      currImageIndex,
      nextImageIndex,
      opacity,
      opacitySecond
    } = this.state;
    const sources = Array.isArray(src)
      ? src
      : [src];

    const delta = Math.sqrt(3) * size / 24;
    const imageStyle = isHorizontal
      ? { bottom: delta }
      : { right: delta };

    return (
      <HexagonView
        borderWidth={borderWidth}
        borderColor={borderColor}
        size={size}
        backgroundColor={backgroundColor}
        isHorizontal={isHorizontal}
        cornerRadius={cornerRadius}
      >
        <Animated.Image
          {...props}
          source={sources[currImageIndex]}
          style={[
            { height: size, width: size },
            imageStyle,
            { opacity }
          ]}
        />
        {src.length > 1 && (
          <Animated.Image
            {...props}
            source={sources[nextImageIndex]}
            style={[
              { height: size, width: size },
              imageStyle,
              styles.secondImageStyle,
              { opacity: opacitySecond },
            ]}
          />
        )}
        <View style={styles.overlay}>
          {children}
        </View>
      </HexagonView>
    );
  }
}
