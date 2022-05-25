/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconBack = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M393.408 512l347.904-336.32a49.6 49.6 0 0 0 0-71.808 53.824 53.824 0 0 0-74.24 0L281.984 476.16a49.6 49.6 0 0 0 0 71.68l385.088 372.288c10.24 9.92 23.68 14.848 37.12 14.848a53.12 53.12 0 0 0 37.12-14.912 49.536 49.536 0 0 0 0-71.68L393.408 512"
        fill={getIconColor(color, 0, '#061748')}
      />
    </svg>
  );
};

IconBack.defaultProps = {
  size: 18,
};

export default IconBack;
