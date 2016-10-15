import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  requireNativeComponent,
  DeviceEventEmitter
} from 'react-native';
import resolveAssetSource from 'resolveAssetSource';

const LOADED_EVENT = "RNShapeImageView:Loaded";
const emptyFunction = () => {};

export class HexagonImage extends Component {
  static propTypes = {
    onLoad: PropTypes.func,
    setDefaultSize: PropTypes.bool,
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
    ]).isRequired,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    ...Image.propTypes
  }

  static defaultProps = {
    setDefaultSize: false,
    onLoad: emptyFunction,
  }

  constructor(props, context) {
    super(props, context);

    this.onLoadListener = null;
  }

  componentWillMount() {
    const { src } = this.props;
    this.onLoadListener = DeviceEventEmitter
      .addListener(LOADED_EVENT, this.props.onLoad);
  }

  componentWillUnmount() {
    this.onLoadListener.remove();
    this.onLoadListener = null;
  }

  render() {
    const {
      children,
      src,
      borderWidth,
      borderColor,
      setDefaultSize,
      onLoad,
      ...props
    } = this.props;
    const source = resolveAssetSource(src);
    const defaultProps = {};
    if (!source.uri) {
      console.warn('Wrong source value');
    }

    if (setDefaultSize) {
      defaultProps.height = source.height;
      defaultProps.width = source.width;
    }

    return (
      <NativeRNShapeImageView
        src={source.uri}
        onLoad={onLoad}
        borderWidth={borderWidth}
        borderColor={borderColor}
        {...props}
        {...defaultProps}
      >
        {children}
      </NativeRNShapeImageView>
    );
  }
}

const NativeRNShapeImageView = requireNativeComponent('RNShapeImageView', HexagonImage);
