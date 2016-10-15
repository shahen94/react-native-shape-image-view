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
	...props
}) => (
  <HexagonView
  	borderWidth={borderWidth}
  	borderColor={borderColor}
  	size={size}
  	backgroundColor={backgroundColor}
  	isHorizontal={isHorizontal}
  >
  	<Image
  		{...props}
  		source={src}
  		style={{ height: size, width: size }}  
  	>
  		{children}
  	</Image>
  </HexagonView>
);

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
  prop: PropTypes.any
};
