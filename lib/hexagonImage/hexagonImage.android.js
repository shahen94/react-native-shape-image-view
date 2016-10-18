import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  requireNativeComponent,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

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
    setDefaultSize: false,
  }

  constructor(props, context) {
    super(props, context);
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

    return (
      <RNHexagonImageView
        src={source.uri}
        borderWidth={borderWidth}
        borderColor={borderColor}
        {...props}
        {...defaultProps}
      >
        {children}
      </RNHexagonImageView>
    );
  }
}

const RNHexagonImageView = requireNativeComponent('RNHexagonImageView', HexagonImage);
