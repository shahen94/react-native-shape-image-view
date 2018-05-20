import { View, processColor, requireNativeComponent } from 'react-native';

import PropTypes from 'PropTypes';
import React from 'react';

export const HexagonView = ({
  children,
  borderWidth,
  borderColor,
  backgroundColor,
  size,
  cornerRadius,
  isHorizontal,
  ...props
}) => (
  <RNHexagonView
      {...props}
      borderColor={processColor(borderColor).toString()}
      borderWidth={borderWidth}
      background_Color={processColor(backgroundColor).toString()}
      isHorizontal={isHorizontal}
      size={size}
      cornerRadius={cornerRadius}
  >
          {children}
  </RNHexagonView>
);

HexagonView.propTypes = {
  ...View.propTypes,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  background_Color: PropTypes.string,
  size: PropTypes.number.isRequired,
  cornerRadius: PropTypes.number,
  isHorizontal: PropTypes.bool,
  prop: PropTypes.any
};
HexagonView.defaultProps = {
  isHorizontal: false,
  borderWidth: 0,
  borderColor: 'transparent',
  backgroundColor: 'white',
};

const RNHexagonView = requireNativeComponent('RNHexagonView', HexagonView);
