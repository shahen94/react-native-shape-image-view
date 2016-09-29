import React, { PropTypes } from 'react';
import { View, Image, requireNativeComponent } from 'react-native';

const HexagonImage = ({
  src,
  borderWidth,
  borderColor,
  accessibilityLabel,
  children
}) => (
  <NativeRNShapeImageView
    src={src}
    borderWidth={borderWidth}
    borderColor={borderColor}
    accessibilityLabel={accessibilityLabel}
    testID={'hexagonImageView'}
  >
    {children}
  </NativeRNShapeImageView>
);

HexagonImage.propTypes = {
  src: PropTypes.string.isRequired,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  ...Image.propTypes
};

const NativeRNShapeImageView = requireNativeComponent('RNShapeImageView', HexagonImage);

export {
  HexagonImage
}
