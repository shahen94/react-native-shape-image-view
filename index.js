import React, { Component, PropTypes } from 'react';
import { View, Image, requireNativeComponent } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';


export class HexagonImage extends Component {
  static propTypes = {
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
    setDefaultSize: false
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { src } = this.props;
  }

  render() {
    const {
      children,
      src,
      borderWidth,
      borderColor,
      setDefaultSize,
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

    console.log(source, typeof src);

    return (
      <NativeRNShapeImageView
        src={source.uri}
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
