/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconWarning = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 51.2a460.8 460.8 0 1 1 0 921.6 460.8 460.8 0 0 1 0-921.6z m0 54.2208a406.5792 406.5792 0 1 0 0 813.1584A406.5792 406.5792 0 0 0 512 105.472z"
        fill={getIconColor(color, 0, '#111111')}
      />
      <Path
        d="M516.864 620.8c-27.6992 0-41.5744-12.4928-41.5744-37.4784V284.8768c0-24.9856 13.824-37.4784 41.5744-37.4784 13.1584 0 23.3984 2.816 30.6688 8.4992 7.2704 5.6832 10.9056 15.8208 10.9056 30.3616v295.7312c0 14.5408-3.6352 24.6272-10.9056 30.3104-7.2704 5.632-17.5104 8.4992-30.6688 8.4992z m0 54.528c13.1584 0 24.1664 4.4032 33.024 13.312 8.8576 8.8576 13.312 19.8656 13.312 33.024a44.8512 44.8512 0 0 1-13.312 33.024 44.8512 44.8512 0 0 1-33.024 13.312 44.8512 44.8512 0 0 1-33.024-13.312 44.8512 44.8512 0 0 1-13.312-33.024c0-13.1584 4.4032-24.1664 13.312-33.024a44.8512 44.8512 0 0 1 33.024-13.312z"
        fill={getIconColor(color, 1, '#111111')}
      />
    </Svg>
  );
};

IconWarning.defaultProps = {
  size: 18,
};

IconWarning = React.memo ? React.memo(IconWarning) : IconWarning;

export default IconWarning;
