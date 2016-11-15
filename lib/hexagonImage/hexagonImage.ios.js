import React, { PropTypes } from 'react';
import { View, Image } from 'react-native';
import { HexagonView } from '../hexagonView';

export const HexagonImage = ({
  children,
  borderWidth,
  borderColor,
  backgroundColor,
  size,
  isHorizontal,
  src,
  cornerRadius,
  ...props
}) => {
  const delta = Math.sqrt(3) * size / 24;
  const imageStyle = isHorizontal ? { bottom: delta } : { right: delta };
  return (
    <HexagonView
      borderWidth={borderWidth}
      borderColor={borderColor}
      size={size}
      backgroundColor={backgroundColor}
      isHorizontal={isHorizontal}
      cornerRadius={cornerRadius}
    >
      <Image
        {...props}
        source={src}
        style={[{ height: size, width: size }, imageStyle]}
      >
        {children}
      </Image>
    </HexagonView>
  );
};

HexagonImage.propTypes = {
  ...View.propTypes,
  ...Image.propTypes,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  background_Color: PropTypes.string,
  size: PropTypes.number.isRequired,
  isHorizontal: PropTypes.bool,
  src: PropTypes.object,
  cornerRadius: PropTypes.number,
  prop: PropTypes.any
};
