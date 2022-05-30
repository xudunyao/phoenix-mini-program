/* eslint-disable */
import React, { FunctionComponent } from 'react';

interface Props {
  name: 'location' | 'tabs_selected' | 'radiounchecked' | 'radiochecked' | 'back' | 'warning-circle-fill' | 'clear' | 'warning' | 'close';
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
