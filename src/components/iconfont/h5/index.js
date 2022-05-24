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

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'warning-circle-fill':
      return <IconWarningCircleFill {...rest} />;
    case 'clear':
      return <IconClear {...rest} />;
    case 'warning':
      return <IconWarning {...rest} />;
    case 'close':
      return <IconClose {...rest} />;

  }

  return null;
};

export default IconFont;
