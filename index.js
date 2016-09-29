import React, { Component, PropTypes } from 'react';
import { View, Image, requireNativeComponent } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';


export class HexagonImage extends Component {
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    ...Image.propTypes
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
      ...props
    } = this.props;
    const source = resolveAssetSource(src);
    console.log(source);
    if (!source.uri) {
      console.warn('Wrong source value');
    }
    return (
      <NativeRNShapeImageView
        src={source.uri}
        width={source.width}
        height={source.height}
        borderWidth={borderWidth}
        borderColor={borderColor}
        {...props}
      >
        {children}
      </NativeRNShapeImageView>
    );
  }
}

const NativeRNShapeImageView = requireNativeComponent('RNShapeImageView', HexagonImage);
