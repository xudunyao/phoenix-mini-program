/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconShare = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M754.496 527.136a22.72 22.72 0 1 1 45.44 0v189.44A83.36 83.36 0 0 1 716.608 800H307.36A83.36 83.36 0 0 1 224 716.608V330.112A83.36 83.36 0 0 1 307.36 246.72h197.024a22.72 22.72 0 1 1 0 45.44H307.36c-20.928 0-37.888 16.96-37.888 37.92v386.496c0 20.896 16.96 37.888 37.888 37.888h409.216c20.928 0 37.92-16.96 37.92-37.888v-189.472z m-29.888-197.024L660.8 262.304a22.72 22.72 0 1 1 33.12-31.136l99.84 106.08a22.72 22.72 0 0 1-16.544 38.336h-114.112c-58.048 0-105.664 50.56-105.664 113.664v136.416a22.72 22.72 0 0 1-45.44 0v-136.416c0-87.616 67.328-159.136 151.104-159.136h61.504z"
        fill={getIconColor(color, 0, '#061748')}
      />
    </svg>
  );
};

IconShare.defaultProps = {
  size: 18,
};

export default IconShare;
