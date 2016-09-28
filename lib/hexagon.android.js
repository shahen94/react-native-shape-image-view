import React, { PropTypes } from 'react';
import { View, Image, requireNativeComponent } from 'react-native';

const HexagonImage = ({ src, style, ...props }) => (
  <NativeRNShapeImageView
    src={src}
    style={style}
    {...props}
  />
);

HexagonImage.propTypes = {
  src: PropTypes.string.isRequired,
  style: Image.propTypes.style,
  props: PropTypes.array
};
const NativeRNShapeImageView = requireNativeComponent('BlurView', BlurView);
export default HexagonImage
