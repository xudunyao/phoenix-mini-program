/* eslint-disable */

import React from 'react';

import IconClose from './IconClose';
export { default as IconClose } from './IconClose';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'close':
      return <IconClose key="1" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
