/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLocation = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0h1024v1024H0z"
        fill={getIconColor(color, 0, '#8F929D')}
        fillOpacity="0"
      />
      <Path
        d="M832 448c0-179.2-140.8-320-320-320S192 268.8 192 448c0 89.6 32 166.4 89.6 224l179.2 179.2c25.6 25.6 64 25.6 89.6 0l179.2-179.2C800 614.4 832 537.6 832 448z m-275.2 332.8c-44.8 44.8-44.8 44.8-89.6 0L326.4 633.6C275.2 588.8 243.2 518.4 243.2 448c0-147.2 121.6-268.8 268.8-268.8s268.8 121.6 268.8 268.8c0 70.4-32 140.8-76.8 185.6l-147.2 147.2zM512 288C422.4 288 352 358.4 352 448S422.4 608 512 608s160-70.4 160-160S601.6 288 512 288z m0 268.8c-57.6 0-108.8-51.2-108.8-108.8S454.4 339.2 512 339.2s108.8 51.2 108.8 108.8S569.6 556.8 512 556.8z"
        fill={getIconColor(color, 1, '#8F929D')}
      />
    </Svg>
  );
};

IconLocation.defaultProps = {
  size: 18,
};

IconLocation = React.memo ? React.memo(IconLocation) : IconLocation;

export default IconLocation;
