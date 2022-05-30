/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTabsSelected = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 2048 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0h2048v1024H0z"
        fill={getIconColor(color, 0, '#D8D8D8')}
        fillOpacity="0"
      />
      <Path
        d="M1024 742.4c-294.4 0-588.8-89.6-844.8-256-64-38.4-76.8-115.2-38.4-179.2 38.4-64 115.2-76.8 179.2-38.4 422.4 281.6 972.8 281.6 1395.2 0 64-38.4 140.8-25.6 179.2 38.4 38.4 64 25.6 140.8-38.4 179.2-243.2 179.2-537.6 256-832 256z"
        fill={getIconColor(color, 1, '#80A2FF')}
      />
    </Svg>
  );
};

IconTabsSelected.defaultProps = {
  size: 18,
};

IconTabsSelected = React.memo ? React.memo(IconTabsSelected) : IconTabsSelected;

export default IconTabsSelected;
