/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconBack = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M393.408 512l347.904-336.32a49.6 49.6 0 0 0 0-71.808 53.824 53.824 0 0 0-74.24 0L281.984 476.16a49.6 49.6 0 0 0 0 71.68l385.088 372.288c10.24 9.92 23.68 14.848 37.12 14.848a53.12 53.12 0 0 0 37.12-14.912 49.536 49.536 0 0 0 0-71.68L393.408 512"
        fill={getIconColor(color, 0, '#061748')}
      />
    </Svg>
  );
};

IconBack.defaultProps = {
  size: 18,
};

IconBack = React.memo ? React.memo(IconBack) : IconBack;

export default IconBack;
