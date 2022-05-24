/* eslint-disable */

import React from 'react';

import IconWarningCircleFill from './IconWarningCircleFill';
import IconClear from './IconClear';
import IconWarning from './IconWarning';
import IconClose from './IconClose';
export { default as IconWarningCircleFill } from './IconWarningCircleFill';
export { default as IconClear } from './IconClear';
export { default as IconWarning } from './IconWarning';
export { default as IconClose } from './IconClose';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'warning-circle-fill':
      return <IconWarningCircleFill key="1" {...rest} />;
    case 'clear':
      return <IconClear key="2" {...rest} />;
    case 'warning':
      return <IconWarning key="3" {...rest} />;
    case 'close':
      return <IconClose key="4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
