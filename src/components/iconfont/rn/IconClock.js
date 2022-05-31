/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconClock = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512.192 160a352.256 352.256 0 1 0 0.064 704.448 352.256 352.256 0 0 0 0-704.448z m209.024 561.28a293.76 293.76 0 0 1-209.024 86.464 293.568 293.568 0 0 1-209.024-86.528 293.568 293.568 0 0 1-86.528-209.024 293.568 293.568 0 0 1 86.528-209.024 293.568 293.568 0 0 1 209.024-86.528 293.568 293.568 0 0 1 209.024 86.528 293.568 293.568 0 0 1 86.528 209.024 293.568 293.568 0 0 1-86.528 209.024z"
        fill={getIconColor(color, 0, '#8F929D')}
      />
      <Path
        d="M539.968 500.416V299.136a28.288 28.288 0 1 0-56.576 0v212.608c0 5.632 1.6 11.008 4.48 15.36a27.84 27.84 0 0 0 4.48 5.76l150.272 150.336a28.288 28.288 0 1 0 40.064-40l-142.72-142.784z"
        fill={getIconColor(color, 1, '#8F929D')}
      />
    </Svg>
  );
};

IconClock.defaultProps = {
  size: 18,
};

IconClock = React.memo ? React.memo(IconClock) : IconClock;

export default IconClock;
