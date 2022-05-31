/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconRight = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M426.688 256l-60.416 60.352L561.92 512l-195.648 195.648 60.416 60.352 256-256z"
        fill={getIconColor(color, 0, '#8F929D')}
      />
    </Svg>
  );
};

IconRight.defaultProps = {
  size: 18,
};

IconRight = React.memo ? React.memo(IconRight) : IconRight;

export default IconRight;
