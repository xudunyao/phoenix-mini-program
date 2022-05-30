/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconTabsSelected = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 2048 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M0 0h2048v1024H0z"
        fill={getIconColor(color, 0, '#D8D8D8')}
        fillOpacity="0"
      />
      <path
        d="M1024 742.4c-294.4 0-588.8-89.6-844.8-256-64-38.4-76.8-115.2-38.4-179.2 38.4-64 115.2-76.8 179.2-38.4 422.4 281.6 972.8 281.6 1395.2 0 64-38.4 140.8-25.6 179.2 38.4 38.4 64 25.6 140.8-38.4 179.2-243.2 179.2-537.6 256-832 256z"
        fill={getIconColor(color, 1, '#80A2FF')}
      />
    </svg>
  );
};

IconTabsSelected.defaultProps = {
  size: 18,
};

export default IconTabsSelected;
