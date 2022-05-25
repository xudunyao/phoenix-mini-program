/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconRadiounchecked = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 0c-282.76736 0-512 229.23264-512 512s229.23264 512 512 512 512-229.23264 512-512-229.23264-512-512-512zM512 896c-212.0704 0-384-171.9296-384-384s171.9296-384 384-384c212.0704 0 384 171.9296 384 384s-171.9296 384-384 384z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconRadiounchecked.defaultProps = {
  size: 18,
};

export default IconRadiounchecked;
