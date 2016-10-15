import React, { PropTypes } from 'react';
import { View } from 'react-native';

export const HexagonImage = (props) => (
  <View {...props} />
);

HexagonImage.propTypes = {
  ...View.propTypes
};
