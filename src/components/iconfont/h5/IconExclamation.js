/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconExclamation = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M527.552 48.576a446.72 446.72 0 1 0 0 893.44 446.72 446.72 0 0 0 0-893.44z m0 742.208a56.96 56.96 0 1 1 0-113.92 56.96 56.96 0 0 1 0 113.92z m56.96-241.6a56.96 56.96 0 0 1-113.92 0V306.112a56.96 56.96 0 0 1 113.92 0v243.072z"
        fill={getIconColor(color, 0, '#FF5E5E')}
      />
    </svg>
  );
};

IconExclamation.defaultProps = {
  size: 18,
};

export default IconExclamation;
