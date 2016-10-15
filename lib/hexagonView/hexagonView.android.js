import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent } from 'react-native';


export const HexagonView = ({ children, ...props }) => (
  <RNHexagonView {...props}>
    {children}
  </RNHexagonView>
);

HexagonView.propTypes = {
  ...View.propTypes,
  props: PropTypes.any
};

const RNHexagonView = requireNativeComponent('RNShapeView', HexagonView);
