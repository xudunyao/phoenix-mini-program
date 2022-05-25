/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconRadiounchecked = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c-282.76736 0-512 229.23264-512 512s229.23264 512 512 512 512-229.23264 512-512-229.23264-512-512-512zM512 896c-212.0704 0-384-171.9296-384-384s171.9296-384 384-384c212.0704 0 384 171.9296 384 384s-171.9296 384-384 384z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRadiounchecked.defaultProps = {
  size: 18,
};

IconRadiounchecked = React.memo ? React.memo(IconRadiounchecked) : IconRadiounchecked;

export default IconRadiounchecked;
