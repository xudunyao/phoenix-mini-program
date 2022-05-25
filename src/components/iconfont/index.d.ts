/* eslint-disable */
import React, { FunctionComponent } from 'react';

interface Props {
  name: 'warning-circle-fill' | 'clear' | 'warning' | 'close';
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
