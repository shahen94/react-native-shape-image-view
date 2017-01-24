import React, { PropTypes, Component } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import { isEqual } from 'lodash';
import { HexagonView } from '../hexagonView';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const normalSize = WINDOW_WIDTH / 2.5 - WINDOW_HEIGHT / 150;



const styles = StyleSheet.create({
  fillAbsolute: {
    ...StyleSheet.absoluteFillObject,
  },
  secondImageView: {
    flexGrow: 1,
  },
  bumpAtTop: {
    marginTop: -13
  },
  overlay: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  }
});

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
    transitionDuration: PropTypes.number,
    src: PropTypes.oneOfType([
      Image.propTypes.source,
      PropTypes.arrayOf(Image.propTypes.source)
    ]).isRequired,
    cornerRadius: PropTypes.number,
    animate: PropTypes.bool,
    prop: PropTypes.any,
    timingBetween: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  };
  static defaultProps = {
    animate: false,
    transitionDuration: 500,
    timingBetween: {
      min: 2000,
      max: 5000
    }
  };
  constructor(props, context) {
    super(props, context);
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
    this.getNextInvocationTimeout = this.getNextInvocationTimeout.bind(this);
    this.timeout = null;
    this._isMounted = false;
  }
  componentWillMount() {
    this._isMounted = true;
    if (
      !Array.isArray(this.props.src)
      || !this.props.animate
      || this.props.src.length < 2
    ) {
      return;
    }
    this.timeout = setTimeout(() => {
      this.animateViews();
    }, this.getNextInvocationTimeout());
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
      }, this.getNextInvocationTimeout());
    }
  }

  shouldComponentUpdate(nProps, nState) {
    const shouldUpdateProps = !isEqual(this.props, nProps);
    const shouldUpdateState = !isEqual(this.state, nState);

    return shouldUpdateState || shouldUpdateProps;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.clearTimeouts();
  }

  reset() {
    this.state.opacity.setValue(1);
    this.state.opacitySecond.setValue(0);

    this.frameShowedCount = 1;
    this.showFrontImage = true;

    this._isMounted && this.setState({
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
    const { src, animate, transitionDuration } = this.props;
    const { currImageIndex, nextImageIndex } = this.state;
    const shouldAnimate = typeof useAnimate !== 'undefined'
      ? useAnimate
      : animate;

    if (!Array.isArray(src) || !shouldAnimate || src.length < 2) {
      return;
    }

    this.clearTimeouts();

    const MAX_INDEX = src.length - 1;
    const nextInvocation = this.getNextInvocationTimeout();
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
        duration: transitionDuration
      }),
      Animated.timing(this.state.opacitySecond, {
        toValue: showFrontImage ? 0 : 1,
        duration: transitionDuration
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

      this._isMounted && this.setState(nextState);
    });
    this.timeout = setTimeout(() => this.animateViews(), nextInvocation);
  }

  getNextInvocationTimeout() {
    const { timingBetween } = this.props;
    const { min, max } = timingBetween;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
            resizeMode={'cover'}
            style={[
              styles.fillAbsolute,
              styles.secondImageView,
              { height: size, width: size },
              imageStyle,
              { opacity: opacitySecond },
            ]}
          />
        )}
        <View
          style={[
            styles.overlay,
            { height: size, width: size },
            imageStyle
          ]}
        >
          {children}
        </View>
      </HexagonView>
    );
  }
}
