/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconRight = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M426.688 256l-60.416 60.352L561.92 512l-195.648 195.648 60.416 60.352 256-256z"
        fill={getIconColor(color, 0, '#8F929D')}
      />
    </svg>
  );
};

IconRight.defaultProps = {
  size: 18,
};

export default IconRight;
