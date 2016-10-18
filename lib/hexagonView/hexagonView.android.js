import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent } from 'react-native';


export const HexagonView = ({ children, ...props }) => (
  <RNHexagonView {...props}>
    {children}
  </RNHexagonView>
);

HexagonView.propTypes = {
  ...View.propTypes,
  isHorizontal: PropTypes.bool,
  props: PropTypes.any
};

const RNHexagonView = requireNativeComponent('RNHexagonView', HexagonView);
