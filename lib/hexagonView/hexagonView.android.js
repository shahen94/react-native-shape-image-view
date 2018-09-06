import React, { Component } from 'react';
import { View, processColor, requireNativeComponent } from 'react-native';

import PropTypes from 'prop-types';

export const HexagonView = ({
    children,
    borderWidth,
    borderColor,
    ...props
}) => (
    <RNHexagonView
        {...props}
        strokeWidth={borderWidth}
        strokeColor={processColor(borderColor)}
    >
      {children}
    </RNHexagonView>
);

HexagonView.propTypes = {
  ...View.propTypes,
  props: PropTypes.any,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.number,
  isHorizontal: PropTypes.bool,
  cornerRadius: PropTypes.number,
};

HexagonView.defaultProps = {
  borderWidth: 0,
  cornerRadius: 0,
};

const RNHexagonView = requireNativeComponent('RNHexagonView', HexagonView);
