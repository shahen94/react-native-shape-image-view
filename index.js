import React, { Component, PropTypes } from 'react';
import { View, Image, requireNativeComponent } from 'react-native';


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
    console.log(src);
  }

  render() {
    const {
      children,
      src,
      borderWidth,
      borderColor,
      ...props
    } = this.props;
    return (
      <NativeRNShapeImageView
        src={src}
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
