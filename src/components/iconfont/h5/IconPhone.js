/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconPhone = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M723.2 76.8h-422.4c-32 0-51.2 19.2-51.2 51.2v768c0 25.6 25.6 51.2 51.2 51.2H729.6c25.6 0 51.2-25.6 51.2-51.2V128c-6.4-32-25.6-51.2-57.6-51.2z m-243.2 32h64c6.4 0 6.4 6.4 6.4 6.4s0 12.8-6.4 12.8h-64c-6.4 0-12.8-6.4-12.8-6.4s6.4-12.8 12.8-12.8zM512 908.8c-19.2 0-38.4-19.2-38.4-38.4s19.2-38.4 38.4-38.4 38.4 19.2 38.4 38.4c0 25.6-19.2 38.4-38.4 38.4z m204.8-115.2H307.2v-640h409.6v640z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </svg>
  );
};

IconPhone.defaultProps = {
  size: 18,
};

export default IconPhone;
