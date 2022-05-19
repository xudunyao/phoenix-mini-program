/* eslint-disable */

import React from 'react';
import IconClose from './IconClose';
export { default as IconClose } from './IconClose';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'close':
      return <IconClose {...rest} />;

  }

  return null;
};

export default IconFont;
